const db = require('../config/db');

exports.saveOrder = async (req, res) => {
    try {
        const { orderId, productTitle, quantity, totalPrice, email, phone } = req.body;
        const sql = `INSERT INTO orders (order_id, product_title, quantity, total_price, customer_email, customer_phone) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [orderId, productTitle, quantity, totalPrice, email, phone]);
        res.status(201).json({ success: true, message: "Order saved successfully" });
    } catch (error) {
        console.error("❌ SQL ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updatePricing = async (req, res) => {
    try {
        const { id } = req.params;
        const { production, design, shipping, tax } = req.body;
        const sql = `UPDATE orders SET production_fee = ?, design_fee = ?, shipping_fee = ?, tax_fee = ? WHERE order_id = ?`;
        const [result] = await db.query(sql, [production, design, shipping, tax, id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        res.json({ message: 'Pricing updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Temp orders logic
exports.saveTempDesign = async (req, res) => {
    try {
        const { email, designData } = req.body;
        const orderCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 3);

        await db.query(
            "INSERT INTO temp_orders (email, order_code, design_data, expires_at) VALUES (?, ?, ?, ?)",
            [email, JSON.stringify(designData), orderCode, expiresAt]
        );
        res.json({ success: true, orderCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// admin order ka status update karne
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.query("UPDATE orders SET status = ? WHERE order_id = ?", [status, id]);
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- Admin order page management ---
exports.getAllOrders = async (req, res) => {
    try {
        // Database se saare orders fetch karna
        const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error("❌ Fetch Orders Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// 1. Chat fetch karne ke liye
exports.getChatMessages = async (req, res) => {
    try {
        const { orderId } = req.params;
        const [rows] = await db.query(
            "SELECT * FROM chat_messages WHERE order_id = ? ORDER BY created_at ASC",
            [orderId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Chat message save karne ke liye
exports.sendChatMessage = async (req, res) => {
    try {
        const { orderId, sender, message } = req.body;
        await db.query(
            "INSERT INTO chat_messages (order_id, sender, message) VALUES (?, ?, ?)",
            [orderId, sender, message]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

