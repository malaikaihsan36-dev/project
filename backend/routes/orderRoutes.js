const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/save-design', orderController.saveDesign);
router.post('/resume-design', orderController.resumeDesign);

module.exports = router;

// Saare temporary orders dekhne ke liye (Admin dashboard ke liye)
router.get('/all-temp', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT email, order_code, expires_at FROM temp_orders WHERE is_active = TRUE ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Expiry barhane ke liye
router.post('/extend-order', async (req, res) => {
    try {
        const { order_code } = req.body;
        await db.query("UPDATE temp_orders SET expires_at = DATE_ADD(expires_at, INTERVAL 3 DAY) WHERE order_code = ?", [order_code]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});