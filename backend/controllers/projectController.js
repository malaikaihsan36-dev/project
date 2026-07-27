// Database configuration ko import kiya
const db = require('../config/db');

// Self-healing: Ensure all required tables for portfolio and reviews exist and are seeded
async function ensureDatabaseTables() {
  try {
    // Check projects
    await db.query('SELECT 1 FROM projects LIMIT 1').catch(async (err) => {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('Creating projects table...');
        await db.query(`
          CREATE TABLE projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url VARCHAR(255) NOT NULL,
            category VARCHAR(100),
            tags VARCHAR(255),
            project_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        // Seed initial industry projects
        await db.query(`
          INSERT INTO projects (title, description, image_url, category, tags) VALUES 
          ('Artisanal Gourmet Food Box', 'Custom printed organic food & confectionery packaging with gold foil embossed logo.', '/images/food_packaging.png', 'Gourmet Food', 'Food, Gold Foil, Eco'),
          ('Clinical Pharmaceutical Carton', 'Sleek medicine & supplement packaging carton with metallic silver foil and tamper-evident seal.', '/images/pharma_packaging.png', 'Pharmaceuticals', 'Medicine, Silver Foil, Clinical'),
          ('Haute Couture Apparel Rigid Box', 'Luxury velvet-wrapped garment gift box with custom gold foil stamping for apparel & fashion.', '/images/clothing_packaging.png', 'Apparel & Fashion', 'Clothing, Rigid Box, Luxury'),
          ('Executive Corporate Presentation Suite', 'Custom branded corporate presentation set and executive stationery gift box with metallic copper foil.', '/images/corporate_packaging.png', 'Corporate & Enterprise', 'Corporate, Executive, Stationery'),
          ('Emerald Velvet Cosmetic Rigid Box', 'High-end cosmetic & skincare dropper box with soft-touch lamination and rose gold embellishments.', '/images/cosmetic_packaging.png', 'Cosmetics & Skincare', 'Beauty, Cosmetic, Rose Gold'),
          ('Vibrant E-Commerce Shipping Mailer', 'Heavy-duty eco-friendly corrugated mailer box with electric blue internal flexo printing.', '/images/ecommerce_packaging.png', 'E-Commerce Mailers', 'Corrugated, E-Commerce, Custom Print')
        `);
      } else throw err;
    });

    // Check portfolio_categories
    await db.query('SELECT 1 FROM portfolio_categories LIMIT 1').catch(async (err) => {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('Creating portfolio_categories table...');
        await db.query(`
          CREATE TABLE portfolio_categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
          )
        `);
        // Seed default categories
        await db.query(`
          INSERT IGNORE INTO portfolio_categories (name) VALUES 
          ('Luxury Rigid Boxes'), ('Corrugated Mailers'), ('Retail Cartons'), ('Labels & Stickers')
        `);
      } else throw err;
    });

    // Check reviews
    await db.query('SELECT 1 FROM reviews LIMIT 1').catch(async (err) => {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('Creating reviews table...');
        await db.query(`
          CREATE TABLE reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_name VARCHAR(100) NOT NULL,
            product_name VARCHAR(100) NOT NULL,
            rating INT NOT NULL,
            review_text TEXT,
            status VARCHAR(20) DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        // Seed some demo approved reviews
        await db.query(`
          INSERT INTO reviews (customer_name, product_name, rating, review_text, status) VALUES 
          ('Mian Muhammad Asif', 'Luxury Rigid Boxes', 5, 'Exceptional quality rigid packaging. The gold hot stamping was extremely sharp and aligned perfectly with our brand guides. Highly recommended for premium retailers in Lahore!', 'Approved'),
          ('Sarah Jenkins', 'Corrugated Mailers', 5, 'Great structural design and thick board choice. Kept our export cosmetics safe during shipping. Will buy again!', 'Approved')
        `);
      } else throw err;
    });

    // Check review_products
    await db.query('SELECT 1 FROM review_products LIMIT 1').catch(async (err) => {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('Creating review_products table...');
        await db.query(`
          CREATE TABLE review_products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
          )
        `);
        // Seed default products
        await db.query(`
          INSERT IGNORE INTO review_products (name) VALUES 
          ('Luxury Rigid Boxes'), ('Corrugated Mailers'), ('Premium Retail Cartons'), ('Product Labels')
        `);
      } else throw err;
    });

  } catch (err) {
    console.error('Error ensuring portfolio/reviews tables:', err);
  }
}

// Execute self-healing migration asynchronously on startup
ensureDatabaseTables();

// ========== PORTFOLIO FUNCTIONS =============


// --- 1. Get All Projects ---
exports.getAllProjects = async (req, res) => {
    try {
        // Safe parameterized query to fetch all projects
        const [rows] = await db.execute('SELECT * FROM projects');
        res.json(rows);
    } catch (error) { 
        console.error("Error in getAllProjects:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- 2. Add Project ---
exports.addProject = async (req, res) => {
    try {
        const { title, desc, img, category, tags, project_url } = req.body;
        
        // Security Check: Basic validation to prevent empty data entries
        if (!title || !img) {
            return res.status(400).json({ message: "Title and image are required fields." });
        }

        // Safe SQL Injection protected query using placeholders (?)
        const sql = "INSERT INTO projects (title, description, image_url, category, tags, project_url) VALUES (?, ?, ?, ?, ?, ?)";
        await db.execute(sql, [title, desc || null, img, category || null, tags || null, project_url || null]);
        
        res.status(201).json({ message: 'Project added successfully!' });
    } catch (error) { 
        console.error("Error in addProject:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- 3. Update Project ---
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, img, category, tags, project_url } = req.body;

        // Security Check: Validate required updates
        if (!title || !img) {
            return res.status(400).json({ message: "Title and image cannot be empty during update." });
        }

        const sql = `
            UPDATE projects 
            SET title = ?, description = ?, image_url = ?, category = ?, tags = ?, project_url = ? 
            WHERE id = ?
        `;

        // Executing safe query with mapped parameters
        const [result] = await db.execute(sql, [title, desc || null, img, category || null, tags || null, project_url || null, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully!" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// --- 4. Delete Project (FIXED SECURITY & SYNTAX) ---
// Purane callback syntax ko hata kar modern async/await aur safe parameterized execute lagaya
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM projects WHERE id = ?";

        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Database delete failed" });
    }
};


// ============= CATEGORY MANAGEMENT =================


// --- Get Portfolio Categories ---
exports.getPortfolioCategories = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM portfolio_categories ORDER BY name ASC');
        res.json(rows);
    } catch (error) { 
        console.error("Error in getPortfolioCategories:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Add Portfolio Category ---
exports.addPortfolioCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Security Check: Ensure category name is not empty or malicious spacing
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Category name cannot be empty." });
        }
        
        const [result] = await db.execute('INSERT INTO portfolio_categories (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Category added successfully!', id: result.insertId });
    } catch (error) {
        console.error("CATEGORY ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// --- Delete Portfolio Category ---
exports.deletePortfolioCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute('DELETE FROM portfolio_categories WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found or already deleted." });
        }
        
        res.json({ message: 'Category deleted successfully!' });
    } catch (error) { 
        console.error("Error in deletePortfolioCategory:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// ============== CONTACT SUBJECTS =============

// --- Get Contact Subjects ---
exports.getContactSubjects = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contact_subjects ORDER BY id ASC');
        res.json(rows);
    } catch (error) { 
        console.error("Error in getContactSubjects:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Add Contact Subject ---
exports.addContactSubject = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Security Check: Validate subject string data
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Subject name cannot be empty." });
        }

        await db.execute('INSERT INTO contact_subjects (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Subject added successfully!' });
    } catch (error) { 
        console.error("Error in addContactSubject:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Delete Contact Subject ---
exports.deleteContactSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute('DELETE FROM contact_subjects WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Subject not found." });
        }

        res.json({ message: 'Subject deleted successfully!' });
    } catch (error) { 
        console.error("Error in deleteContactSubject:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// ======= REVIEWS & MODERATION LOGIC ===========

// --- Get All Reviews (Admin Side) ---
exports.getAllReviews = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM reviews ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) { 
        console.error("Error in getAllReviews:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Update Review Status (Approved/Pending/Rejected) ---
exports.updateReviewStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Security Check: Allow only genuine status options to avoid database corruption
        const allowedStatuses = ['Pending', 'Approved', 'Rejected'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value provided." });
        }

        const [result] = await db.execute('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Review record not found." });
        }

        res.json({ message: 'Review status updated successfully!' });
    } catch (error) { 
        console.error("Error in updateReviewStatus:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Get Product List (For Review Dropdown) ---
exports.getProductList = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM review_products ORDER BY name ASC');
        res.json(rows);
    } catch (error) { 
        console.error("Error in getProductList:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Add Product To Review Options List ---
exports.addProductToList = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Security Check: Validate product name
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Product name cannot be empty." });
        }

        await db.execute('INSERT INTO review_products (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Product added to list successfully!' });
    } catch (error) { 
        console.error("Error in addProductToList:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Delete Product From Review Options List ---
exports.deleteProductFromList = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute('DELETE FROM review_products WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product choice not found." });
        }

        res.json({ message: 'Product deleted from list successfully!' });
    } catch (error) { 
        console.error("Error in deleteProductFromList:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Get Approved Reviews Only (Public/User Side) ---
exports.getApprovedReviews = async (req, res) => {
    try {
        // Enforced strict server-side status check for security consistency
        const [rows] = await db.execute('SELECT * FROM reviews WHERE status = "Approved" ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) { 
        console.error("Error in getApprovedReviews:", error);
        res.status(500).json({ error: error.message }); 
    }
};

// --- Submit Public Review ---
exports.submitReview = async (req, res) => {
    try {
        const { customer_name, product_name, rating, review_text } = req.body;
        
        // Security Check: Prevent empty spam or automated null data submissions
        if (!customer_name || !product_name || !rating) {
            return res.status(400).json({ message: "Required inputs (Name, Product, Rating) are missing." });
        }

        // Default review forced to 'Pending' via hardcoded query structure for ultimate safety
        const sql = "INSERT INTO reviews (customer_name, product_name, rating, review_text, status) VALUES (?, ?, ?, ?, 'Pending')";
        await db.execute(sql, [customer_name.trim(), product_name, rating, review_text || ""]);
        
        res.status(201).json({ message: 'Review submitted successfully and is awaiting moderation!' });
    } catch (error) { 
        console.error("Error in submitReview:", error);
        res.status(500).json({ error: error.message }); 
    }
};