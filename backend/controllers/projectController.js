const db = require('../config/db');

// Projects
exports.getAllProjects = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.addProject = async (req, res) => {
    try {
        const { title, desc, img, category, tags } = req.body;
        await db.query("INSERT INTO projects (title, description, image_url, category, tags) VALUES (?, ?, ?, ?, ?)", 
        [title, desc, img, category, tags]);
        res.status(201).json({ message: 'Project added' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// Reviews
exports.getApprovedReviews = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reviews WHERE status = "Approved" ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.submitReview = async (req, res) => {
    try {
        const { customer_name, product_name, rating, review_text } = req.body;
        await db.query("INSERT INTO reviews (customer_name, product_name, rating, review_text, status) VALUES (?, ?, ?, ?, 'Pending')", 
        [customer_name, product_name, rating, review_text]);
        res.status(201).json({ message: 'Review submitted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};