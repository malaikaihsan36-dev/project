const db = require('../config/db');

exports.getChatHistory = async (req, res) => {
    try {
        const { orderId } = req.params;
        const [results] = await db.query("SELECT * FROM chat_messages WHERE order_id = ? ORDER BY created_at ASC", [orderId]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        // SELECT * se saare columns (is_approved, is_placed) aa jayenge
        const [rows] = await db.execute("SELECT * FROM orders WHERE order_id = ?", [orderId]);
        
        if (rows.length > 0) {
            res.json(rows[0]); 
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.extendExpiry = async (req, res) => {
    try {
        const { orderId, hours } = req.body;
        const sql = "UPDATE orders SET expires_at = DATE_ADD(expires_at, INTERVAL ? HOUR) WHERE order_id = ?";
        const [result] = await db.query(sql, [parseInt(hours), orderId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};