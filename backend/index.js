const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection - Direct setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'KGFVY-7733B-8WCK9-KTG64-BC7D8', 
    database: 'portfolio_db'
});

// Foran check karne ke liye ke connect hua ya nahi
db.connect((err) => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err.message);
        return;
    }
    console.log('✅ Connected to MySQL Database successfully!');
});

// 1. GET: Fetch all projects
app.get('/api/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) {
            console.error("GET Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. POST: Add a new project
app.post('/api/projects', (req, res) => {
    const { title, desc, img, category, tags } = req.body;
    const sql = "INSERT INTO projects (title, description, image_url, category, tags) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [title, desc, img, category, tags], (err, result) => {
        if (err) {
            console.error("POST Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Project added successfully', id: result.insertId });
    });
});

// Route handlers wese hi rahenge (PUT, DELETE)...
app.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, desc, img, category, tags } = req.body;
    const sql = "UPDATE projects SET title = ?, description = ?, image_url = ?, category = ?, tags = ? WHERE id = ?";
    db.query(sql, [title, desc, img, category, tags, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Project updated' });
    });
});

app.delete('/api/projects/:id', (req, res) => {
    db.query("DELETE FROM projects WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted' });
    });
});

// 1. User Side: Fetch ONLY Approved Reviews
app.get('/api/reviews/approved', (req, res) => {
    const sql = 'SELECT * FROM reviews WHERE status = "Approved" ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Admin Side: Fetch ALL Reviews (For Moderation)
app.get('/api/reviews', (req, res) => {
    db.query('SELECT * FROM reviews ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 3. User Side: Submit a New Review (Default status: Pending)
app.post('/api/reviews', (req, res) => {
    const { customer_name, product_name, rating, review_text } = req.body;
    const sql = "INSERT INTO reviews (customer_name, product_name, rating, review_text, status) VALUES (?, ?, ?, ?, 'Pending')";
    
    db.query(sql, [customer_name, product_name, rating, review_text], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Review submitted for approval' });
    });
});

// 4. Admin Side: Update Status (Approve/Reject)
app.patch('/api/reviews/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query('UPDATE reviews SET status = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Status updated' });
    });
});

// --- Product List Routes ---

// GET: Check karein ye endpoint user aur admin dono ko chahiye
app.get('/api/product-list', (req, res) => {
    db.query('SELECT * FROM product_list', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST: Nayi product add karne ke liye
app.post('/api/product-list', (req, res) => {
    const { name } = req.body;
    
    // Agar name nahi mil raha toh yahan error dikhay ga
    if (!name) {
        return res.status(400).json({ error: "Name is empty in request body" });
    }

    const sql = "INSERT INTO product_list (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) {
            // YE LINE AAPKO TERMINAL MEIN ASLI WAJAH BATAYE GI
            console.error("DATABASE ERROR DETAILS:", err.sqlMessage); 
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ message: 'Added successfully', id: result.insertId });
    });
});

// DELETE: Product khatam karne ke liye
app.delete('/api/product-list/:id', (req, res) => {
    db.query('DELETE FROM product_list WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});