// config/db.js (Aapka database connection file)
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // 🔥 LIVE AIVEN DB KE LIYE YE REJECT UNAUTHORIZED FALSE ZAROORI HAI
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool.promise(); // Agar async/await use kar rahi hain