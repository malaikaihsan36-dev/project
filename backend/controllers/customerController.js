
const db = require('../config/db');

/**
 * @route   GET /api/admin/customers
 * @desc    Get all customers with their aggregated order history (Admin Only)
 * @access  Private (Requires Admin Middleware on the route setup)
 */
exports.getAllCustomers = async (req, res) => {
    try {
        console.log("Customer API Hit!");

        const query = `
            SELECT 
                customer_email AS email,
                COUNT(*) AS total_orders,
                MAX(created_at) AS last_order_date,
                /* JSON_ARRAYAGG bina truncation ke pure objects ka array banata hai */
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
            LIMIT 1000; /* SECURITY & PERFORMANCE: Denial of Service (DoS) se bachne ke liye hard limit lagayi taake lakhon rows ek sath memory crash na karein */
        `;

        // Safe query execution (No dynamic concatenated inputs used -> 100% SQL Injection Safe)
        const [rows] = await db.query(query);
        console.log("Rows found:", rows.length);

        // Data Formatting & Sanitization
        const formattedData = rows.map(row => {
            let finalDetails = [];
            try {
                // Kuch Node-MySQL drivers JSON data ko string return karte hain aur kuch auto-parse karte hain
                if (typeof row.order_details === 'string') {
                    finalDetails = JSON.parse(row.order_details);
                } else {
                    finalDetails = row.order_details || [];
                }
            } catch (e) {
                // Defensively handling parsing exceptions to prevent app crashes
                console.error(`Critical JSON Parse Error for email: ${row.email}`, e.message);
                finalDetails = []; 
            }

            return {
                email: row.email,
                total_orders: row.total_orders,
                last_order_date: row.last_order_date,
                order_details: finalDetails
            };
        });

        // Response send karne se pehle status check 200 explicitly specify kiya
        return res.status(200).json(formattedData);

    } catch (error) {
        // SECURITY PRACTICE: Server ke internal errors (database credentials ya directory structures) 
        // direct client side par expose nahi hone chahiye. Isliye generic message ke sath block kiya.
        console.error("Backend Error Details:", error);
        return res.status(500).json({ 
            error: "Database Fetch Error", 
            message: "An internal server error occurred while processing customer records." 
        });
    }
};