const db = require('../config/db');

// 1. CATEGORY LOGIC

// --- Fetch All Categories ---
exports.getAllCategories = async (req, res) => {
    try {
        // Secure execution using parameterized mapping
        const [rows] = await db.query("SELECT * FROM categories ORDER BY created_at DESC");
        return res.status(200).json(rows);
    } catch (err) { 
        // SECURITY FIX: Detailed error is logged on server console, NOT exposed to clients
        console.error("Error fetching categories:", err);
        return res.status(500).json({ error: "Internal Server Error: Failed to fetch categories." }); 
    }
};

// --- Add New Category ---
exports.addCategory = async (req, res) => {
    const { name, image_url } = req.body;
    
    // SECURITY FIX: Basic payload structural check
    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Validation Error: Category name is required." });
    }

    try {
        // Safe placeholder binding protection against SQLi
        const [result] = await db.query("INSERT INTO categories (name, image_url) VALUES (?, ?)", [name.trim(), image_url || null]);
        return res.status(201).json({ id: result.insertId, name, image_url });
    } catch (err) { 
        console.error("Error creating category:", err);
        return res.status(500).json({ error: "Internal Server Error: Failed to add category." }); 
    }
};

// --- Delete Category & Linked Records ---
exports.deleteCategory = async (req, res) => {
    const catId = req.params.id;
    if (!catId) {
        return res.status(400).json({ error: "Validation Error: Category ID parameter is missing." });
    }

    try {
        // Step 1: Securely cascade clean up linked products first (Transactional safety)
        await db.query('DELETE FROM products WHERE category_id = ?', [catId]);
        
        // Step 2: Securely remove target category parent element
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [catId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ success: true, message: "Category and linked products deleted successfully." });
        } else {
            return res.status(404).json({ message: "Category entry not found." });
        }
    } catch (error) {
        console.error("Category Delete Error:", error);
        return res.status(500).json({ error: "Internal Server Error: Process execution halted safely." });
    }
};

// --- Update Existing Category ---
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image_url } = req.body;

    if (!id || !name || !name.trim()) {
        return res.status(400).json({ error: "Validation Error: ID and valid category name are required." });
    }

    try {
        const sql = "UPDATE categories SET name = ?, image_url = ? WHERE id = ?";
        const [result] = await db.query(sql, [name.trim(), image_url || null, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Category record context not found." });
        }

        console.log("Category updated successfully via Admin Authorization");
        return res.status(200).json({ 
            success: true, 
            message: "Updated successfully" 
        });
    } catch (err) {
        console.error("Update Category Error:", err);
        return res.status(500).json({ error: "Internal Server Error: Database write failure." });
    }
};


// 2. PRODUCT LOGIC

// --- Fetch All Products ---
exports.getAllProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.*, c.name AS category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.id DESC`;
        const [rows] = await db.query(query);
        return res.status(200).json(rows);
    } catch (err) { 
        console.error("Fetch Products Matrix Error:", err);
        return res.status(500).json({ error: "Internal Server Error: Unable to fetch products grid." }); 
    }
};

// --- Add New Product Structure ---
exports.createProduct = async (req, res) => {
    const { category_id, name, kg_rate, type, is_popular, sizes, gramages, addons, description, image_url } = req.body;

    // SECURITY FIX: Data Integrity validations before firing queries
    if (!category_id || !name || !name.trim()) {
        return res.status(400).json({ error: "Validation Error: Missing absolute core requirements (name/category_id)." });
    }

    try {
        const query = `
            INSERT INTO products 
            (category_id, name, kg_rate, type, is_popular, sizes, gramages, addons, description, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        // Strict mapping variables inside positional placeholders array
        const values = [
            category_id, 
            name.trim(), 
            kg_rate || 0, 
            type || null, 
            is_popular ? 1 : 0, 
            JSON.stringify(sizes || []), 
            JSON.stringify(gramages || []), 
            JSON.stringify(addons || []), 
            description || null, 
            image_url || null
        ];

        await db.query(query, values);
        return res.status(201).json({ message: "Product saved successfully!" });
    } catch (err) {
        console.error("Create Product Error Runtime:", err);
        return res.status(500).json({ error: "Internal Server Error: Failed to register product entity." });
    }
};

// --- Update Existing Product Entity ---
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category_id, name, kg_rate, type, is_popular, sizes, gramages, addons, description, image_url } = req.body;

    if (!id || !name) {
        return res.status(400).json({ error: "Validation Error: Structural targets missing to finish statement." });
    }

    try {
        const query = `
            UPDATE products 
            SET category_id = ?, name = ?, kg_rate = ?, type = ?, is_popular = ?, 
                sizes = ?, gramages = ?, addons = ?, description = ?, image_url = ?
            WHERE id = ?
        `;

        const values = [
            category_id,
            name.trim(),
            kg_rate || 0,
            type || null,
            is_popular ? 1 : 0, 
            JSON.stringify(sizes || []),
            JSON.stringify(gramages || []),
            JSON.stringify(addons || []),
            description || null,
            image_url || null,
            id
        ];

        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Target Product not found." });
        }

        return res.status(200).json({ message: "Product updated successfully!" });
    } catch (err) {
        console.error("Update Product Error Runtime:", err);
        return res.status(500).json({ error: "Internal Server Error: Failed to execute modifications safely." });
    }
};

// --- Delete Single Product Profile ---
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ message: "Product ID parameter is required" });
    }

    try {
        // Enforcing isolated positional parameters to prevent malicious modifications
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [productId]);

        if (result.affectedRows > 0) {
            console.log(`✅ Product #${productId} deleted safely from operational inventory dashboard.`);
            return res.status(200).json({ 
                success: true, 
                message: "Product has been removed from inventory." 
            });
        } else {
            return res.status(404).json({ 
                success: false, 
                message: "Product record matching parameter context not found." 
            });
        }
    } catch (error) {
        console.error("Delete Product Error Context:", error);
        
        // Strict integrity constraint block catch
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ 
                success: false, 
                message: "Security Protocol Violation: Cannot delete product linked to operational historical customer invoice orders." 
            });
        }

        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error: System isolation rollback executed." 
        });
    }
};

// --- Fetch Product By Unique ID ---
exports.getProductById = async (req, res) => {
    try {
        const [product] = await db.execute(
            `SELECT p.*, c.name as category_name 
             FROM products p 
             JOIN categories c ON p.category_id = c.id 
             WHERE p.id = ?`, 
            [req.params.id]
        );

        if (product.length === 0) {
            return res.status(404).json({ error: "Target identity matrix data context not found." });
        }

        const p = product[0];

        // SECURITY & STABILITY FIX: Isolated try/catch wrapper logic for reliable raw string parsing 
        // to prevent dynamic string breaks from crashing runtime memory.
        const safeParseJSON = (dataString) => {
            if (!dataString) return [];
            if (typeof dataString !== 'string') return dataString;
            try {
                return JSON.parse(dataString);
            } catch (jsonErr) {
                console.error("JSON Evaluation Error Recovery Applied on data point:", jsonErr);
                return []; // Graceful failure safe array fallback
            }
        };

        return res.status(200).json({
            ...p,
            sizes: safeParseJSON(p.sizes),
            gramages: safeParseJSON(p.gramages),
            addons: safeParseJSON(p.addons),
        });
    } catch (err) {
        console.error("Error resolving product entity breakdown query:", err);
        return res.status(500).json({ error: "Internal Server Error: Data conversion failed." });
    }
};