const db = require('../config/db');

// 1. Save New Order
exports.saveOrder = async (req, res) => {
    try {
        const { orderId, productTitle, quantity, totalPrice, email, phone } = req.body;
        
        // --- FIX: 72 HOURS DEFAULT TIMER ---
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 72); // 3 din ka time

        const sql = `INSERT INTO orders (order_id, product_title, quantity, total_price, customer_email, customer_phone, expires_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        await db.query(sql, [orderId, productTitle, quantity, totalPrice, email, phone, expiresAt]);
        res.status(201).json({ success: true, message: "Order saved with 72h expiry" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Update Pricing (Line 9 Fix)
exports.updatePricing = async (req, res) => {
    try {
        const { id } = req.params;
        const { production, design, shipping, tax } = req.body;
        const sql = `UPDATE orders SET production_fee = ?, design_fee = ?, shipping_fee = ?, tax_fee = ? WHERE order_id = ?`;
        await db.query(sql, [production, design, shipping, tax, id]);
        res.json({ message: 'Pricing updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Update Status
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.query("UPDATE orders SET status = ? WHERE order_id = ?", [status, id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Save Temp Design
exports.saveTempDesign = async (req, res) => {
    try {
        const { email, designData } = req.body;
        const orderCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 3);
        await db.query("INSERT INTO temp_orders (email, order_code, design_data, expires_at) VALUES (?, ?, ?, ?)", [email, JSON.stringify(designData), orderCode, expiresAt]);
        res.json({ success: true, orderCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User header sy design resume krna
exports.resumeOrderDesign = async (req, res) => {
    // User jo enter kar raha hai usay trim karein (extra spaces khatam karne ke liye)
    const email = req.body.email ? req.body.email.trim() : "";
    const code = req.body.code ? req.body.code.trim().replace(/#/g, '') : "";

    console.log("--- Login Attempt ---");
    console.log("Email from User:", email);
    console.log("Order ID from User:", code);

    try {
        // Query mein 'LIKE' use karein taake agar thora sa farq ho to bhi match ho jaye
        const [rows] = await db.execute(
            "SELECT * FROM orders WHERE customer_email = ? AND order_id = ?",
            [email, code]
        );

        console.log("Database Results:", rows);

        if (rows.length > 0) {
            const order = rows[0];
            return res.json({
                success: true,
                orderId: order.order_id,
                productData: {
                    // Yahan check karein ke aapke table mein product columns ke kya naam hain
                    title: order.product_title || "Custom Order", 
                    img: order.product_img || "https://via.placeholder.com/400"
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No record found. Please check your Email and Order ID."
            });
        }
    } catch (error) {
        console.error("SQL Error:", error.message);
        return res.status(500).json({ success: false, message: "Database connection failed." });
    }
};

// Order ki preview image permanent update karne ke liye
// orderController.js
exports.updateOrderPreview = async (req, res) => {
    const { orderId, imageUrl } = req.body;
    
    // Debugging ke liye console log
    console.log("Updating Preview for Order:", orderId, "with URL:", imageUrl);

    try {
        // SQL Query: Check karein column name 'product_img' hi hai na?
        const [result] = await db.execute(
            "UPDATE orders SET product_img = ? WHERE order_id = ?",
            [imageUrl, orderId]
        );

        if (result.affectedRows > 0) {
            return res.json({ success: true, message: "DB Updated Successfully" });
        } else {
            return res.status(404).json({ success: false, message: "Order not found in DB" });
        }
    } catch (error) {
        console.error("Database Update Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};