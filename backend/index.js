const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Use Routes
app.use('/api', apiRoutes);

// Root Route
app.get('/', (req, res) => res.send('Colour Pix API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});