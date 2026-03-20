const db = require('../config/db');

// --- KEEPING YOUR PORTFOLIO CODE EXACTLY AS IS ---
exports.getAllProjects = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM projects');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.addProject = async (req, res) => {
    try {
        const { title, desc, img, category, tags } = req.body;
        const sql = "INSERT INTO projects (title, description, image_url, category, tags) VALUES (?, ?, ?, ?, ?)";
        await db.execute(sql, [title, desc, img, category, tags]);
        res.status(201).json({ message: 'Project added' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};
// 1. Update Project Function
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, desc, img, category, tags } = req.body;

    const saveProject = async () => {
    if (!formData.title || !formData.img) {
      alert("Please fill title and upload image!");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        desc: formData.desc,
        img: formData.img,
        category: formData.category,
        tags: formData.tags
      };

      if (editingId) {
        // UPDATE: Check if editingId exists
        console.log("Updating ID:", editingId);
        const res = await axios.put(`http://localhost:5000/api/projects/${editingId}`, payload);
        alert(res.data.message || "Updated successfully!");
      } else {
        // CREATE
        const res = await axios.post('http://localhost:5000/api/projects', payload);
        alert(res.data.message || "Saved successfully!");
      }

      fetchData();
      closeModal();
    } catch (err) { 
      console.error("Full Error Object:", err);
      alert("Error: " + (err.response?.data?.message || "Server connection failed")); 
    }
  };

  const deleteProject = async (id) => {
    if (!id) {
      alert("Error: Project ID is missing!");
      return;
    }

    if (window.confirm("Delete this project?")) {
      try { 
        console.log("Attempting to delete ID:", id);
        const res = await axios.delete(`http://localhost:5000/api/projects/${id}`); 
        alert(res.data.message || "Deleted successfully!");
        fetchData(); 
      } catch (err) { 
        console.error("Delete Error details:", err.response || err);
        alert("Delete failed: " + (err.response?.data?.message || "Check backend console")); 
      }
    }
  };

    // MySQL Query
    const query = `
        UPDATE projects 
        SET title = ?, \`description\` = ?, image_url = ?, category = ?, tags = ? 
        WHERE id = ?
    `;

    db.query(query, [title, desc, img, category, tags, id], (err, result) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).json({ error: "Database update failed" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully" });
    });
};

// 2. Delete Project Function
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    // MySQL Query
    const query = "DELETE FROM projects WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).json({ error: "Database delete failed" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully" });
    });
};

exports.getPortfolioCategories = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM portfolio_categories ORDER BY name ASC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.addPortfolioCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log("Attempting to add category:", name); // Check terminal
        
        const [result] = await db.execute('INSERT INTO portfolio_categories (name) VALUES (?)', [name]);
        
        res.status(201).json({ message: 'Category added', id: result.insertId });
    } catch (error) {
        console.error("CATEGORY ERROR:", error.message); // Terminal dekhein
        res.status(500).json({ error: error.message });
    }
};

exports.deletePortfolioCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM portfolio_categories WHERE id = ?', [id]);
        res.json({ message: 'Category deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// ----- Contact Subject ------

exports.getContactSubjects = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contact_subjects ORDER BY id ASC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.addContactSubject = async (req, res) => {
    try {
        const { name } = req.body;
        await db.execute('INSERT INTO contact_subjects (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Subject added' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteContactSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM contact_subjects WHERE id = ?', [id]);
        res.json({ message: 'Subject deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// --- NEW MODERATION & PRODUCT LIST FUNCTIONS ---

exports.getAllReviews = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM reviews ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateReviewStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.execute('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status updated' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getProductList = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM review_products ORDER BY name ASC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.addProductToList = async (req, res) => {
    try {
        const { name } = req.body;
        await db.execute('INSERT INTO review_products (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Product added to list' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteProductFromList = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM review_products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// User Side Functions
exports.getApprovedReviews = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM reviews WHERE status = "Approved" ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.submitReview = async (req, res) => {
    try {
        const { customer_name, product_name, rating, review_text } = req.body;
        const sql = "INSERT INTO reviews (customer_name, product_name, rating, review_text, status) VALUES (?, ?, ?, ?, 'Pending')";
        await db.execute(sql, [customer_name, product_name, rating, review_text || ""]);
        res.status(201).json({ message: 'Review submitted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};