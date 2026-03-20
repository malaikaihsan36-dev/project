const db = require('../config/db');

exports.getAllCustomers = async (req, res) => {
    try {
        console.log("Customer API Hit!");

        // 1. Limit barhane ki koshish (just in case)
        await db.query("SET SESSION group_concat_max_len = 1000000;");

        const query = `
            SELECT 
                customer_email AS email,
                COUNT(*) AS total_orders,
                MAX(created_at) AS last_order_date,
                /* JSON_ARRAYAGG use kar rahe hain jo truncation nahi karta */
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', order_id, 
                        'title', product_title, 
                        'status', status, 
                        'date', created_at
                    )
                ) AS order_details
            FROM (
                SELECT order_id, customer_email, product_title, status, created_at FROM orders
                UNION ALL
                SELECT temp_order_id as order_id, customer_email, product_title, status, created_at FROM confirmed_orders
            ) AS combined_orders
            WHERE customer_email IS NOT NULL AND customer_email != ''
            GROUP BY customer_email
            ORDER BY last_order_date DESC
        `;

        const [rows] = await db.query(query);
        console.log("Rows found:", rows.length);

        // 2. MySQL modern versions mein order_details pehle se hi object/array hota hai
        // Agar string aaye to parse karein, warna direct use karein.
        const formattedData = rows.map(row => {
            let finalDetails = [];
            try {
                if (typeof row.order_details === 'string') {
                    finalDetails = JSON.parse(row.order_details);
                } else {
                    finalDetails = row.order_details || [];
                }
            } catch (e) {
                console.error("Critical JSON Parse Error for:", row.email);
                finalDetails = []; 
            }

            return {
                email: row.email,
                total_orders: row.total_orders,
                last_order_date: row.last_order_date,
                order_details: finalDetails
            };
        });

        res.json(formattedData);
    } catch (error) {
        console.error("Backend Error Details:", error);
        res.status(500).json({ error: "Database Fetch Error", message: error.message });
    }
};