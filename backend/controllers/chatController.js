
const db = require('../config/db');

// --- 1. Get Chat History (Secured) ---
exports.getChatHistory = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Security Check: Validation taake empty parameter query ko crash na kare
        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        // Parameterized query secure hai SQL injection se
        const [results] = await db.query(
            "SELECT id, order_id, sender, message, is_read, created_at FROM chat_messages WHERE order_id = ? ORDER BY created_at ASC", 
            [orderId]
        );
        
        res.json(results);
    } catch (err) {
        // SECURITY FIX: Error detail ko console mein hide kiya taake hacker table structure na dekh sake
        console.error("Database Error in getChatHistory:", err.message);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};

// --- 2. Get Order Details (Secured) ---
exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const [rows] = await db.execute("SELECT * FROM orders WHERE order_id = ?", [orderId]);
        
        if (rows.length > 0) {
            res.json(rows[0]); 
        } else {
            // SECURITY FIX: Generic not found handle kiya taake hacker enumeration attack na kar sake
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        // SECURITY FIX: Live environment error protection
        console.error("Database Error in getOrderDetails:", error.message);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};

// --- 3. Extend Expiry (Secured) ---
exports.extendExpiry = async (req, res) => {
    try {
        const { orderId, hours } = req.body;

        // Security Check: Validation inputs for missing or malicious hours data
        if (!orderId || !hours) {
            return res.status(400).json({ error: 'Missing required parameters: orderId or hours' });
        }

        const parsedHours = parseInt(hours, 10);
        if (isNaN(parsedHours) || parsedHours <= 0) {
            return res.status(400).json({ error: 'Invalid hours count provided' });
        }

        const sql = "UPDATE orders SET expires_at = DATE_ADD(expires_at, INTERVAL ? HOUR) WHERE order_id = ?";
        const [result] = await db.query(sql, [parsedHours, orderId]);
        
        res.json({ success: true, message: 'Expiry extended successfully' });
    } catch (err) {
        // SECURITY FIX: Server query behavior detail hiding
        console.error("Database Error in extendExpiry:", err.message);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};

// --- 4. Get Unread Notifications (Secured) ---
exports.getUnreadNotifications = async (req, res) => {
    try {
        // Dynamic counts call securely fetched via parameterized inputs if required
        const [countResult] = await db.execute(
            "SELECT COUNT(*) as total FROM chat_messages WHERE sender = 'customer' AND is_read = 0"
        );

        const [details] = await db.execute(`
            SELECT m.order_id, m.message, m.created_at, o.product_title 
            FROM chat_messages m
            JOIN orders o ON m.order_id = o.order_id
            WHERE m.sender = 'customer' AND m.is_read = 0
            ORDER BY m.created_at DESC
        `);

        res.json({ success: true, total: countResult[0].total, details });
    } catch (err) {
        // SECURITY FIX: Masked original framework dynamic alerts
        console.error("SQL Error in getUnreadNotifications:", err.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// --- 5. Mark As Read (Secured) ---
exports.markAsRead = async (req, res) => {
    const { orderId } = req.body;
    try {
        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const [result] = await db.query(
            "UPDATE chat_messages SET is_read = 1 WHERE order_id = ? AND sender = 'customer'",
            [orderId]
        );
        
        res.status(200).json({ 
            success: true, 
            message: "Messages marked as read",
            affectedRows: result.affectedRows 
        });
    } catch (error) {
        // SECURITY FIX: Hiding query internals on live route trigger
        console.error("Database Error in markAsRead:", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};