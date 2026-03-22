const db = require('../config/db');

// --- CATEGORY LOGIC ---
exports.getAllCategories = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM categories ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addCategory = async (req, res) => {
    const { name, image_url } = req.body;
    try {
        const [result] = await db.query("INSERT INTO categories (name, image_url) VALUES (?, ?)", [name, image_url]);
        res.json({ id: result.insertId, name, image_url });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteCategory = async (req, res) => {
    const catId = req.params.id;
    try {
        // Step 1: Delete all products linked to this category
        await db.query('DELETE FROM products WHERE category_id = ?', [catId]);
        
        // Step 2: Delete the category itself
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [catId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ success: true, message: "Category and linked products deleted." });
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Category Delete Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

// --- PRODUCT LOGIC ---
exports.getAllProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.*, c.name AS category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.id DESC`;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Add New Product
exports.createProduct = async (req, res) => {
    const { category_id, name, kg_rate, type, sizes, gramages, addons, description, image_url } = req.body;

    try {
        const query = `
            INSERT INTO products 
            (category_id, name, kg_rate, type, sizes, gramages, addons, description, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        // JSON objects ko stringify karna zaroori hai MySQL ke liye
        const values = [
            category_id, 
            name, 
            kg_rate, 
            type, 
            JSON.stringify(sizes), 
            JSON.stringify(gramages), 
            JSON.stringify(addons || []), 
            description, 
            image_url
        ];

        await db.query(query, values);
        res.status(201).json({ message: "Product saved successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Update existing product
exports.updateProduct = async (req, res) => {
    const { id } = req.params; // URL se ID nikalna
    const { category_id, name, kg_rate, type, sizes, gramages, addons, description, image_url } = req.body;

    try {
        const query = `
            UPDATE products 
            SET category_id = ?, name = ?, kg_rate = ?, type = ?, 
                sizes = ?, gramages = ?, addons = ?, description = ?, image_url = ?
            WHERE id = ?
        `;

        const values = [
            category_id,
            name,
            kg_rate,
            type,
            JSON.stringify(sizes),
            JSON.stringify(gramages),
            JSON.stringify(addons),
            description,
            image_url,
            id // WHERE clause ke liye
        ];

        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully!" });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        // Query to delete the product
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [productId]);

        if (result.affectedRows > 0) {
            console.log(`✅ Product #${productId} deleted successfully.`);
            return res.status(200).json({ 
                success: true, 
                message: "Product has been removed from inventory." 
            });
        } else {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found." 
            });
        }
    } catch (error) {
        console.error("Delete Product Error:", error);
        
        // Agar product kisi order ke sath linked hai (Foreign Key constraint)
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ 
                success: false, 
                message: "Cannot delete: This product is linked to existing orders." 
            });
        }

        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};