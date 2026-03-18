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
    try {
        const { orderId } = req.params;
        const [result] = await db.query("SELECT expires_at, product_img FROM orders WHERE order_id = ?", [orderId]);
        if (result.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
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