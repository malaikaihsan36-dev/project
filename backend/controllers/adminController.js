const db = require('../config/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // SECURITY FIX: Token generation ke liye import kiya


// 1. Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const sql = "SELECT id, email FROM admins ORDER BY created_at DESC";
        const [results] = await db.query(sql); 
        res.json(results);
    } catch (err) {
        // SECURITY FIX: Detailed database errors ko user se chhupa diya taake system details leak na hon
        console.error("Fetch Error:", err);
        res.status(500).json({ error: "Internal server error occurred." });
    }
};

// 2. Add New Admin
exports.addAdmin = async (req, res) => {
    let { email, password } = req.body;
    
    // SECURITY FIX: Basic input validation aur dynamic whitespace trimming
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // SECURITY FIX: Email formatting case-sensitivity fix taake duplicate entry bypass na ho
        const normalizedEmail = email.trim().toLowerCase();

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO admins (email, password) VALUES (?, ?)";
        
        await db.query(sql, [normalizedEmail, hashedPassword]);
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error("Add Error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists!" });
        }
        // SECURITY FIX: Error messages sanitized
        res.status(500).json({ error: "Failed to register admin." });
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
        // SECURITY FIX: Error messages sanitized
        res.status(500).json({ error: "Failed to delete admin." });
    }
};

// 4. Login Admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        
        const sql = "SELECT * FROM admins WHERE email = ?";
        const [results] = await db.query(sql, [normalizedEmail]);

        // SECURITY FIX: User enumerated error ko generic bnaya taake hackers ko ye pata na chale k kis email ka account exist karta hai
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        // SECURITY FIX: Backend par state secure rakhne ke liye signed JWT Token issue kiya
        // Is token ko dashboard routes protect karne ke liye middleware mein verify kiya jaye ga
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key_for_dev',
            { expiresIn: '24h' } // Token 24 ghante baad expire ho jaye ga
        );

        res.json({ 
            message: "Login successful", 
            token: token,
            admin: { id: user.id, email: user.email }
        });

    } catch (err) {
        console.error("Login Error:", err);
        // SECURITY FIX: Error messages sanitized
        res.status(500).json({ error: "An error occurred during verification." });
    }
};