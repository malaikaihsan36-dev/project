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

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// server.js mein ye lines dhoondein aur update karein
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Main Route
app.use('/api', apiRoutes);

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

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
        // Agar sender customer hai, toh poore server par signal bhej do
        if (sender === 'customer') {
            io.emit('new_notification_global', fullMessage);
        }

    } catch (e) { console.error(e); }
});
    // Backend Socket Listener
socket.on('update_preview', (data) => {
    // Room ID ko clean karein taake join_order wale room se match ho
    const room = data.orderId.replace(/[%23#\s]/g, '');
    
    console.log(`Broadcasting new preview to room: ${room}`);
    
    // Ab user ko foran mil jayega
    io.to(room).emit('update_preview', { imageUrl: data.imageUrl });
});

// 1. Jab user "Approve" button dabaye, to Admin ka button glow ho
socket.on('user_approved', (data) => {
    // data contains: { orderId: '123', approved: true }
    // Hum usi room (orderId) mein signal bhejenge
    io.to(data.orderId).emit('admin_button_glow', { 
        approved: data.approved 
    });
    console.log(`Order ${data.orderId} approval status: ${data.approved}`);
});

// 2. Jab admin "Place Order" dabaye, to User ka "Finalize" button active ho
socket.on('admin_placed_order', (data) => {
    // Ye line admin se aane wala 'placed' (true/false) user ko bhejti hai
    io.to(data.orderId).emit('user_finalize_glow', { 
        placed: data.placed 
    });
});
});

let onlineAdmins = new Set(); // Admin IDs track karne ke liye

io.on('connection', (socket) => {
    
    // 1. Jab Admin connect ho
    socket.on('admin_login', () => {
        socket.isAdmin = true;
        onlineAdmins.add(socket.id);
        // Sab ko batao ke Admin Online hai
        io.emit('global_admin_status', true);
    });

    // 2. Jab koi Customer pooche
    socket.on('check_global_admin', () => {
        socket.emit('global_admin_status', onlineAdmins.size > 0);
    });

    // 3. Jab Admin disconnect ho (Tab close kare)
    socket.on('disconnect', () => {
        if (socket.isAdmin) {
            onlineAdmins.delete(socket.id);
            // Agar koi bhi admin online nahi bacha
            if (onlineAdmins.size === 0) {
                io.emit('global_admin_status', false);
            }
        }
    });
});


server.listen(5000, () => console.log(`🚀 Server Ready on ${port}`));