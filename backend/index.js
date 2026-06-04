const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const apiRoutes = require('./routes/apiRoutes');
const db = require('./config/db');
const cron = require('node-cron');
const dbPassword = process.env.DB_PASSWORD;
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// ==========================================
// 🚀 COMMERCIAL PRODUCTION CORS CONFIGURATION
// ==========================================
const allowedOrigins = [
    'https://colourpix.pk',         // Aapki main production domain[cite: 1]
    'https://www.colourpix.pk',     // www wali variant domain[cite: 1]
    'http://localhost:3000'         // Local computer testing ke liye
];

app.use(cors({
    origin: function (origin, callback) {
        // Agar request local browser ya hamari approved domains se ho to allow karein
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by Commercial CORS Security Layer'));
        }
    },
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Main Route
app.use('/api', apiRoutes);

// ==========================================
// 🚀 PRODUCTION SOCKET.IO CONFIGURATION
// ==========================================
const io = new Server(server, { 
    cors: { 
        origin: allowedOrigins, // Ab sockets bhi live aur local dono par chalenge
        methods: ["GET", "POST"]
    } 
});

io.on('connection', (socket) => {
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

            // A. Room mein bhejo (Taake chat window update ho)
            io.to(room).emit('receive_message', fullMessage);

            // B. ✅ GLOBAL SIGNAL (Taake AdminLayout ko notification mile)
            if (sender === 'customer') {
                io.emit('new_notification_global', fullMessage);
            }

        } catch (e) { console.error(e); }
    });

    // Backend Socket Listener
    socket.on('update_preview', (data) => {
        const room = data.orderId.replace(/[%23#\s]/g, '');
        console.log(`Broadcasting new preview to room: ${room}`);
        io.to(room).emit('update_preview', { imageUrl: data.imageUrl });
    });

    // 1. Jab user "Approve" button dabaye, to Admin ka button glow ho
    socket.on('user_approved', (data) => {
        io.to(data.orderId).emit('admin_button_glow', { approved: data.approved });
        console.log(`Order ${data.orderId} approval status: ${data.approved}`);
    });

    // 2. Jab admin "Place Order" dabaye, to User ka "Finalize" button active ho
    socket.on('admin_placed_order', (data) => {
        io.to(data.orderId).emit('user_finalize_glow', { placed: data.placed });
    });
});

let onlineAdmins = new Set(); // Admin IDs track karne ke liye

io.on('connection', (socket) => {
    // 1. Jab Admin connect ho
    socket.on('admin_login', () => {
        socket.isAdmin = true;
        onlineAdmins.add(socket.id);
        io.emit('global_admin_status', true);
    });

    // 2. Jab koi Customer pooche
    socket.on('check_global_admin', () => {
        socket.emit('global_admin_status', onlineAdmins.size > 0);
    });

    // 3. Jab Admin disconnect ho
    socket.on('disconnect', () => {
        if (socket.isAdmin) {
            onlineAdmins.delete(socket.id);
            if (onlineAdmins.size === 0) {
                io.emit('global_admin_status', false);
            }
        }
    });
});

// Port configuration listen handler
server.listen(port, () => console.log(`🚀 Server Ready on port ${port}`));