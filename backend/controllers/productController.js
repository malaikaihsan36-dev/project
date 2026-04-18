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


// productController.js mein updateCategory
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image_url } = req.body;

    try {
        const sql = "UPDATE categories SET name = ?, image_url = ? WHERE id = ?";
        // Use [result] with await, not a callback
        const [result] = await db.query(sql, [name, image_url, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        console.log("Category updated successfully");
        return res.status(200).json({ 
            success: true, 
            message: "Updated successfully" 
        });
    } catch (err) {
        console.error("Update Category Error:", err);
        return res.status(500).json({ error: "Database error: " + err.message });
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
    // 1. is_popular yahan add karein
    const { category_id, name, kg_rate, type, is_popular, sizes, gramages, addons, description, image_url } = req.body;

    try {
        const query = `
            INSERT INTO products 
            (category_id, name, kg_rate, type, is_popular, sizes, gramages, addons, description, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            category_id, 
            name, 
            kg_rate, 
            type, 
            is_popular ? 1 : 0, // 2. Convert boolean to 1/0
            JSON.stringify(sizes), 
            JSON.stringify(gramages), 
            JSON.stringify(addons || []), 
            description, 
            image_url
        ];

        await db.query(query, values);
        res.status(201).json({ message: "Product saved successfully!" });
    } catch (err) {
        console.error("Create Product Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Update existing product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    // 1. req.body se is_popular nikalna hai
    const { category_id, name, kg_rate, type, is_popular, sizes, gramages, addons, description, image_url } = req.body;

    try {
        const query = `
            UPDATE products 
            SET category_id = ?, name = ?, kg_rate = ?, type = ?, is_popular = ?, 
                sizes = ?, gramages = ?, addons = ?, description = ?, image_url = ?
            WHERE id = ?
        `;

        const values = [
            category_id,
            name,
            kg_rate,
            type,
            is_popular ? 1 : 0, // 2. Boolean ko 1 ya 0 mein convert karna
            JSON.stringify(sizes),
            JSON.stringify(gramages),
            JSON.stringify(addons),
            description,
            image_url,
            id
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

// Backend Controller (productController.js)
// Example: getProductById in productController.js
exports.getProductById = async (req, res) => {
    try {
        const [product] = await db.execute(
            `SELECT p.*, c.name as category_name 
             FROM products p 
             JOIN categories c ON p.category_id = c.id 
             WHERE p.id = ?`, 
            [req.params.id]
        );

        if (product.length === 0) return res.status(404).json({ error: "Not found" });

        // Frontend ko JSON bhejne se pehle parse karne ki zaroorat nahi agar 
        // aapne database mein JSON type rakha hai, warna yahan parse karein:
        const p = product[0];
        res.json({
            ...p,
            sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes,
            gramages: typeof p.gramages === 'string' ? JSON.parse(p.gramages) : p.gramages,
            addons: typeof p.addons === 'string' ? JSON.parse(p.addons) : p.addons,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ek utility file mein ye function bana lein
export const getOptimizedImage = (url) => {
  if (!url) return "";
  // Agar image Cloudinary ki hai, toh transformations add karein
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
  }
  return url;
};