const db = require('../config/db'); 
const bcrypt = require('bcrypt');

// 1. Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const sql = "SELECT id, email FROM admins ORDER BY created_at DESC";
        // Promise-based query
        const [results] = await db.query(sql); 
        res.json(results);
    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// 2. Add New Admin
exports.addAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO admins (email, password) VALUES (?, ?)";
        
        await db.query(sql, [email, hashedPassword]);
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error("Add Error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists!" });
        }
        res.status(500).json({ error: err.message });
    }
};

// 3. Delete Admin
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        // Check count
        const [countResult] = await db.query("SELECT COUNT(*) as count FROM admins");
        if (countResult[0].count <= 1) {
            return res.status(400).json({ error: "Cannot delete the last admin!" });
        }

        const sql = "DELETE FROM admins WHERE id = ?";
        await db.query(sql, [id]);
        res.json({ message: "Admin removed successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// 4. Login Admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM admins WHERE email = ?";
        const [results] = await db.query(sql, [email]);

        if (results.length === 0) {
            return res.status(401).json({ error: "Email nahi mila!" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: "Password ghalat hai!" });
        }

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: err.message });
    }
};