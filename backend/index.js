const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const apiRoutes = require('./routes/apiRoutes');
const db = require('./config/db');
const cron = require('node-cron');

const dbPassword = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// ==========================================
// 🚀 COMMERCIAL PRODUCTION CORS CONFIGURATION
// ==========================================
const allowedOrigins = [
    'https://colourpix.pk',         // Aapki main production domain[cite: 1]
    'https://www.colourpix.pk'     // www wali variant domain[cite: 1]
];

const corsOptions = {
    origin: function (origin, callback) {
        // Inbound request ki domain validation criteria handle karna
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by Commercial CORS Security Layer'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200 // Preflight requests (OPTIONS) ko status 200 return karne ke liye
};

// Application middleware layers allocation
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Main API Routing Gateway
app.use('/api', apiRoutes);

// ==========================================
// 🚀 PRODUCTION SOCKET.IO CONFIGURATION
// ==========================================
const io = new Server(server, { 
    cors: { 
        origin: allowedOrigins, // Transmissions layer authentication protocols[cite: 1]
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    },
    transports: ['websocket', 'polling'] // Connection fallback optimization strategy
});

// Admin tracking mechanism instance
let onlineAdmins = new Set(); 

// MASTER SINGLE CONNECTION BLOCK (Taake listeners clean aur scalable rahein)
io.on('connection', (socket) => {
    
    // --- 📦 SECTION A: ORDER & CHAT LISTENERS ---
    socket.on('join_order', (id) => socket.join(id.replace(/[%23#\s]/g, '')));
    
    socket.on('send_message', async (data) => {
        const { orderId, sender, message, imageUrl, type } = data;
        const room = orderId.replace(/[%23#\s]/g, '');
        try {
            const [res] = await db.query(
                "INSERT INTO chat_messages (order_id, sender, message, image_url, type) VALUES (?,?,?,?,?)", 
                [room, sender, message, imageUrl, type]
            );

            const fullMessage = { id: res.insertId, ...data, created_at: new Date() };

            // Chat module screen refresh relay routing
            io.to(room).emit('receive_message', fullMessage);

            // Global signal dispatch for admin popups
            if (sender === 'customer') {
                io.emit('new_notification_global', fullMessage);
            }

        } catch (e) { 
            console.error("Database insert telemetry error inside socket instance:", e); 
        }
    });

    socket.on('update_preview', (data) => {
        const room = data.orderId.replace(/[%23#\s]/g, '');
        console.log(`Broadcasting new preview to room: ${room}`);
        io.to(room).emit('update_preview', { imageUrl: data.imageUrl });
    });

    // Customer visual status updates handler
    socket.on('user_approved', (data) => {
        io.to(data.orderId).emit('admin_button_glow', { approved: data.approved });
        console.log(`Order ${data.orderId} approval status: ${data.approved}`);
    });

    // Admin visual status updates handler
    socket.on('admin_placed_order', (data) => {
        io.to(data.orderId).emit('user_finalize_glow', { placed: data.placed });
    });

    // --- 👑 SECTION B: ADMINISTRATIVE TRACKING & TELEMETRY ---
    // 1. Admin login verification trigger
    socket.on('admin_login', () => {
        socket.isAdmin = true;
        onlineAdmins.add(socket.id);
        io.emit('global_admin_status', true);
        console.log(`Administrative account verified on socket ID: ${socket.id}`);
    });

    // 2. Client interface checking script
    socket.on('check_global_admin', () => {
        socket.emit('global_admin_status', onlineAdmins.size > 0);
    });

    // 3. Disconnection clean-up lifecycle phase hooks
    socket.on('disconnect', () => {
        if (socket.isAdmin) {
            onlineAdmins.delete(socket.id);
            if (onlineAdmins.size === 0) {
                io.emit('global_admin_status', false);
            }
            console.log(`Administrative account disconnected from socket ID: ${socket.id}`);
        }
    });
});

// Port configuration initialization listen handler
server.listen(PORT, () => console.log(`🚀 Production Server Ready on port ${port}`));