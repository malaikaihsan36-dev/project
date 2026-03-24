const db = require('../config/db');

// 1. Save New Order
exports.saveOrder = async (req, res) => {
    try {
        const { 
            orderId, // CamelCase use karein (Frontend se yahi aayega)
            productTitle, quantity, totalPrice, 
            email, whatsapp, size, material, selectedAddons,
            specialRequest, productId 
        } = req.body;
        
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 72);

        // SQL Query mein variable orderId use karein
        const orderSql = `INSERT INTO orders 
            (order_id, product_title, quantity, total_price, customer_email, customer_phone, expires_at, is_approved, is_placed) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)`;
        
        await db.query(orderSql, [orderId, productTitle, quantity, totalPrice, email, whatsapp, expiresAt]);

        const chatSql = `INSERT INTO chat_messages (order_id, sender, message, type) VALUES (?, ?, ?, ?)`;

        if (productId === 'CONTACT_FORM') {
            const contactSummary = `📩 Contact Inquiry\n` +
                `• Subject: ${productTitle.replace('Inquiry: ', '')}\n` +
                `• Email: ${email}\n` +
                `• Phone: ${whatsapp}`;

            await db.query(chatSql, [orderId, 'customer', contactSummary, 'text']);

            if (specialRequest && specialRequest.trim() !== "") {
                const instructionsMessage = `📝 Message Details:\n${specialRequest.trim()}`;
                await db.query(chatSql, [orderId, 'customer', instructionsMessage, 'text']);
            }

            const adminContactMessage = `Welcome to Colour Pix Support!\n\n` +
                `Your Order ID is displayed in the top-right corner—please keep it save/secure for future reference. To resume your design and chat later, simply enter the same email address along with your Order ID via the cart icon in the homepage navigation bar.\n\n` +
                `Hi! Thank you for reaching out. I’ve received your inquiry. How can I assist you further?`;

            await db.query(chatSql, [orderId, 'admin', adminContactMessage, 'text']);

        } else {
            const addonsText = (selectedAddons && selectedAddons.length > 0) ? selectedAddons.join(', ') : 'None';
            const summaryMessage = `📦 Order Details\n• Product: ${productTitle}\n• Size: ${size || 'Standard'}\n• Material: ${material || 'Standard'}\n• Quantity: ${quantity}\n• Add-ons: ${addonsText}\n• Total Price: $${totalPrice} • Email: ${email}\n +• Phone: ${whatsapp}`;

            await db.query(chatSql, [orderId, 'customer', summaryMessage, 'text']);

            if (specialRequest && specialRequest.trim() !== "") {
                const instructionsMessage = `📝 Special Instructions:\n${specialRequest.trim()}`;
                await db.query(chatSql, [orderId, 'customer', instructionsMessage, 'text']);
            }

            const adminWelcomeMessage = `Welcome to Colour Pix!\n\nYour Order ID is displayed in the top-right corner—please keep it save/secure for future reference. To resume your design and chat later, simply enter the same email address along with your Order ID via the cart icon in the homepage navigation bar.\n\nHi! I’ve reviewed your design request. How does this layout look to you? Feel free to share your ideas—let’s refine it together and turn your vision into reality.`;

            await db.query(chatSql, [orderId, 'admin', adminWelcomeMessage, 'text']);
        }
        
        res.status(201).json({ success: true, orderId: orderId });

    } catch (error) {
        console.error("Order Save Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// 2. Update Pricing (Line 9 Fix)
exports.updatePricing = async (req, res) => {
    try {
        const { id } = req.params; // Order ID
        const { production, design, shipping, tax } = req.body;
        
        const sql = `UPDATE orders SET production_fee = ?, design_fee = ?, shipping_fee = ?, tax_fee = ? WHERE order_id = ?`;
        
        await db.execute(sql, [production, design, shipping, tax, id]);
        res.json({ success: true, message: 'Pricing updated successfully' });
    } catch (error) {
        console.error("Pricing Update Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 3. Update Status
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // 1. Pehle 'orders' table mein update karne ki koshish karein
        const [result1] = await db.query(
            "UPDATE orders SET status = ? WHERE order_id = ?", 
            [status, id]
        );

        // 2. Agar 'orders' mein row nahi mili (affectedRows === 0), 
        // to 'confirmed_orders' mein update karein
        if (result1.affectedRows === 0) {
            await db.query(
                "UPDATE confirmed_orders SET status = ? WHERE temp_order_id = ?", 
                [status, id]
            );
        }

        console.log(`Status updated to ${status} for ID: ${id}`);
        res.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Iska naam getAllOrders hi rakha hai taake frontend change na karna paray
exports.getAllOrders = async (req, res) => {
    try {
        const query = `
            SELECT 
                order_id, 
                customer_email, 
                product_title, 
                status, 
                is_approved, 
                expires_at,
                created_at, 
                NULL AS is_confirmed_flag 
            FROM orders
            
            UNION ALL
            
            SELECT 
                temp_order_id AS order_id, 
                customer_email, 
                product_title, 
                status, 
                1 AS is_approved, 
                NULL AS expires_at,
                approved_date AS created_at, 
                id AS is_confirmed_flag 
            FROM confirmed_orders
            
            ORDER BY created_at DESC
        `;
        
        const [rows] = await db.query(query);
        
        // Console log taake aap terminal mein dekh saken data aa raha hai
        console.log(`Fetched ${rows.length} combined orders.`); 
        
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error in getAllOrders (Combined):", err);
        res.status(500).json({ error: err.message });
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

exports.cleanupExpiredOrder = async (req, res) => {
    const orderId = req.params.id;
    
    // YAHAN SAHI NAAM LIKHEIN (Jo SHOW TABLES mein nazar aaye)
    const CHAT_TABLE_NAME = 'chat_messages'; 

    try {
        // Step 1: Delete Chat
        await db.query(`DELETE FROM ${CHAT_TABLE_NAME} WHERE order_id = ?`, [orderId]);
        
        // Step 2: Delete Order
        const [result] = await db.query('DELETE FROM orders WHERE order_id = ?', [orderId]);

        if (result.affectedRows > 0) {
            console.log(`✅ Automated Cleanup: Order #${orderId} removed.`);
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ message: "Already cleaned up" });
        }
    } catch (error) {
        console.error("❌ Cleanup Query Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

// 4. Update Persistence Status (is_approved / is_placed) - FIX FOR 404
exports.updateOrderStatus = async (req, res) => {
    const { orderId, field, value } = req.body;
    
    // Sirf is_approved ya is_placed ko update karne ki ijazat dein
    const allowedFields = ['is_approved', 'is_placed'];
    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: "Invalid field name" });
    }

    try {
        const sql = `UPDATE orders SET ${field} = ? WHERE order_id = ?`;
        // value ? 1 : 0 ensures boolean convert to tinyint
        const [result] = await db.execute(sql, [value ? 1 : 0, orderId]);

        if (result.affectedRows > 0) {
            console.log(`Successfully updated ${field} for order ${orderId}`);
            return res.json({ success: true });
        } else {
            console.log(`Order ID ${orderId} not found in database`);
            return res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        console.error("DATABASE ERROR:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

// Function to finalize order
exports.finalizeOrder = async (req, res) => {
    const { temp_order_id } = req.params;
    const { final_total_price } = req.body;

    try {
        // 1. Fetch data before deleting
        const [orderRow] = await db.query(
            "SELECT * FROM orders WHERE order_id = ?", 
            [temp_order_id]
        );

        if (!orderRow || orderRow.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        const o = orderRow[0];

        // 2. Insert into confirmed_orders (Permanent Storage)
        const insertQuery = `
            INSERT INTO confirmed_orders 
            (temp_order_id, customer_email, product_title, product_img, final_total_price, status) 
            VALUES (?, ?, ?, ?, ?, 'Printing')
        `;

        const [insertResult] = await db.query(insertQuery, [
            temp_order_id, 
            o.customer_email, 
            o.product_title, 
            o.product_img, 
            final_total_price
        ]);

        // 3. DELETE from temporary 'orders' table
        // Is se wo Section 1 (Design) se gaib ho jayega
        await db.query("DELETE FROM orders WHERE order_id = ?", [temp_order_id]);
        
        // Agar aapki chat table alag hai to usay bhi delete karein:
        // await db.query("DELETE FROM messages WHERE order_id = ?", [temp_order_id]);

        const newPermanentId = insertResult.insertId.toString().padStart(4, '0');
        
        res.status(200).json({ 
            message: "Order Finalized & Temporary Data Cleared!", 
            order_id: newPermanentId 
        });

    } catch (err) {
        console.error("Finalization Error:", err.message);
        res.status(500).json({ error: "Database error" });
    }
};

