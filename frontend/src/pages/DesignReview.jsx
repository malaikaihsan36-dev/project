import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';
import io from 'socket.io-client';
import axios from 'axios';
// Import optimized image helper
import { getOptimizedImage } from '../components/imageHelper'; 

const DesignReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId: urlOrderId } = useParams();
    const socketRef = useRef(null);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // ID cleaning logic to prevent URL encoding issues
    const initialOrderId = location.state?.orderId || urlOrderId || "TEMP";
    const cleanId = String(initialOrderId).replace(/[%23#\s]/g, '').trim();

    // State management for order status and UI
    const [isApproved, setIsApproved] = useState(false);
    const [isAdminPlaced, setIsAdminPlaced] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [inputMessage, setInputMessage] = useState('');
    const [isAdminOnline, setIsAdminOnline] = useState(false);
    
    // Product and dynamic preview state
    const [product, setProduct] = useState(location.state?.product || { title: "Loading...", img: "https://via.placeholder.com/400" });
    const [previewImage, setPreviewImage] = useState(product.img);
    const [messages, setMessages] = useState([]);
    const [expiresAt, setExpiresAt] = useState(null);
    const [timeLeft, setTimeLeft] = useState("Loading...");

    // Image Pan/Drag state for zoomed view
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    // 1. SOCKET: Global Admin Online/Offline Status
    useEffect(() => {
        const socket = io('http://localhost:5000', { transports: ['websocket'] });
        socketRef.current = socket;

        socket.on('global_admin_status', (status) => {
            setIsAdminOnline(status);
        });

        socket.emit('check_global_admin');

        return () => socket.disconnect();
    }, []);

    // 2. DATA: Initial Fetch for Order, Expiry, and Approval status
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/order/${cleanId}?t=${Date.now()}`);
                if (res.data) {
                    setProduct({
                        title: res.data.product_title || "Custom Order",
                        img: res.data.product_img
                    });
                    if (res.data.expires_at) setExpiresAt(new Date(res.data.expires_at));
                    if (res.data.product_img) setPreviewImage(res.data.product_img);
                    setIsApproved(!!res.data.is_approved);
                    setIsAdminPlaced(!!res.data.is_placed);
                }
            } catch (err) {
                console.error("Order Data Fetch Error:", err);
                setTimeLeft("00:00:00");
            }
        };
        if (cleanId && cleanId !== "TEMP") fetchOrderData();
    }, [cleanId]);

    // 3. CHAT: Fetch historical messages
    const fetchChat = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/chat/${cleanId}?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (err) { console.error("Chat load fail:", err); }
    }, [cleanId]);

    // 4. SOCKET: Real-time Chat and Design Update listeners
    useEffect(() => {
        fetchChat();
        const socket = socketRef.current;
        if (!socket) return;

        socket.on('connect', () => {
            socket.emit('join_order', cleanId);
        });

        socket.on('receive_message', (msg) => {
            setMessages((prev) => {
                if (prev.some(m => m.id === msg.id)) return prev;
                return [...prev, { ...msg, image_url: msg.image_url || msg.imageUrl }];
            });
        });

        socket.on('update_preview', (data) => {
            if (data.imageUrl) setPreviewImage(data.imageUrl);
        });

        socket.on('user_finalize_glow', (data) => {
            setIsAdminPlaced(data.placed);
        });
    }, [cleanId, fetchChat]);

    // 5. TIMER: Countdown logic for link expiry
    useEffect(() => {
        if (!expiresAt || isNaN(expiresAt.getTime())) return;
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = expiresAt.getTime() - now;
            if (distance <= 0) {
                setTimeLeft("EXPIRED");
                return;
            }
            const h = Math.floor(distance / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        };
        const timerId = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(timerId);
    }, [expiresAt]);

    // Auto-scroll chat to bottom
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    // 6. ACTIONS: Send Message, Approve Design, and File Upload
    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        socketRef.current.emit('send_message', { orderId: cleanId, sender: 'customer', message: inputMessage.trim(), type: 'text' });
        setInputMessage('');
    };

    const handleApproveToggle = async () => {
        const nextState = !isApproved;
        setIsApproved(nextState);
        try {
            await axios.post('http://localhost:5000/api/order/update-status', { 
                orderId: cleanId, 
                field: 'is_approved', 
                value: nextState 
            });
            socketRef.current.emit('user_approved', { orderId: cleanId, approved: nextState });
        } catch (err) { console.error("Update failed", err); }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "my_portfolio_preset");
            const res = await fetch("https://api.cloudinary.com/v1_1/dxduylcez/image/upload", { method: "POST", body: formData });
            const imageData = await res.json();
            socketRef.current.emit('send_message', {
                orderId: cleanId, sender: 'customer', message: "Sent an image", imageUrl: imageData.secure_url, type: 'image'
            });
        } catch (err) { alert("Upload failed."); }
    };

    // 7. INTERACTION: Pan and Zoom Logic for Main Preview
    const handleMouseDown = (e) => {
        if (zoom <= 1) return; 
        setIsDragging(true);
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Reset image position when zoom returns to normal
    useEffect(() => {
        if (zoom <= 1) setPosition({ x: 0, y: 0 });
    }, [zoom]);

    return (
        <div className="bg-[#0f231c] text-white font-['Space_Grotesk'] overflow-hidden h-screen flex flex-col">
    {/* Hidden file input */}
    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
    
    {/* TOP HEADER */}
    <header className="flex items-center justify-between border-b border-[#273a34] bg-[#1f2937]/90 backdrop-blur-md px-6 py-3 z-50 shrink-0 text-left">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
                <Palette size={24} />
            </div>
            <span className="text-xl font-bold">Colour Pix</span>
        </div>
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase font-black">Expires:</span>
                <span className={`font-mono text-sm font-bold ${timeLeft === "EXPIRED" ? 'text-red-500' : 'text-[#FF4D4D]'}`}>
                    {timeLeft}
                </span>
            </div>
            <span className="text-[#9abcb0] text-sm font-medium border-l border-white/10 pl-6">Order ID: #{cleanId}</span>
        </div>
    </header>

    <main className="flex flex-col lg:flex-row h-full overflow-hidden">
        
        {/* LEFT PANEL: Design Preview with Zoom & Pan */}
        <section 
            className="relative flex flex-col w-full lg:w-1/2 h-[50vh] lg:h-full bg-[#0F172A] border-r border-[#273a34] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div 
                className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]"
                onMouseDown={handleMouseDown}
                style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
                {/* Optimized Preview Image (Width 1200 for high quality detail) */}
                <img 
                    src={getOptimizedImage(previewImage, 1200)} 
                    className="max-w-[80vw] max-h-[70vh] object-contain drop-shadow-2xl transition-transform duration-200 ease-out select-none" 
                    style={{ 
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        pointerEvents: 'none' 
                    }} 
                    alt="Preview" 
                />
            </div>

            {/* FIXED WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden select-none">
                <span 
                    className="text-white/10 text-4xl md:text-7xl font-black uppercase tracking-[0.2em] whitespace-nowrap rotate-[-45deg] scale-[1]"
                    style={{ 
                        WebkitTextStroke: '1px rgba(0,0,0,0.3)', 
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                        border: '4px solid rgba(255,255,255,0.1)',
                        padding: '1.5rem 4rem'
                    }}
                >
                    Colour Pix
                </span>
            </div>

            {/* ZOOM CONTROLS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                <div className="bg-black/60 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
                    <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-2 hover:text-[#00ffaa]">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 hover:text-[#00ffaa]">
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                </div>
            </div>
        </section>

        {/* RIGHT PANEL: Chat System */}
        <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1F2937] relative text-left">
            
            {/* Design Team Status */}
            <div className="p-4 border-b border-[#374151] flex items-center justify-between bg-[#1F2937]/95 backdrop-blur shrink-0">
                <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-full flex items-center justify-center font-bold transition-colors bg-blue-600`}>A</div>
                    <div>
                        <h2 className="font-bold text-sm">Design Team</h2>
                        <div className={`flex items-center gap-1.5 text-[10px] ${isAdminOnline ? 'text-green-400' : 'text-gray-500'}`}>
                            <span className={`size-1.5 rounded-full ${isAdminOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span> 
                            {isAdminOnline ? "Online" : "Offline"}
                        </div>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase flex items-center gap-2 ${isApproved ? 'bg-green-500/20 border-green-500/30 text-green-500' : 'bg-amber-500/20 border-amber-500/30 text-amber-500'}`}>
                    <span className="material-symbols-outlined text-[14px]">{isApproved ? 'check_circle' : 'hourglass_top'}</span>
                    {isApproved ? 'Approved' : 'Waiting Approval'}
                </div>
            </div>

            {/* CHAT MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg, i) => (
                    <div key={msg.id || i} className={`flex gap-3 ${msg.sender === 'customer' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1 ${msg.sender === 'customer' ? 'bg-gray-600' : 'bg-blue-600'}`}>
                            {msg.sender === 'customer' ? 'U' : 'A'}
                        </div>
                        <div className={`max-w-[80%] space-y-1 ${msg.sender === 'customer' ? 'text-right' : 'text-left'}`}>
                            <div className={`px-4 py-3 rounded-2xl shadow-md ${msg.sender === 'customer' ? 'bg-[#374151] rounded-tr-sm' : 'bg-blue-600 rounded-tl-sm'}`}>
                                {/* Optimized Chat Images (Width 600 for performance) */}
                                {(msg.imageUrl || msg.image_url) && (
                                    <img 
                                        src={getOptimizedImage(msg.imageUrl || msg.image_url, 600)} 
                                        className="rounded-lg mb-1 max-w-full cursor-pointer hover:opacity-90 transition-opacity" 
                                        onClick={() => window.open(msg.imageUrl || msg.image_url)} 
                                        alt="Attached" 
                                        loading="lazy"
                                    />
                                )}
                                {(msg.message || msg.text) && (
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {msg.message || msg.text}
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-500">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* MESSAGE INPUT */}
            <div className="p-4 border-t border-[#374151] bg-[#1F2937]">
                <div className="relative flex items-center gap-2">
                    <button onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-[#00ffaa]">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <input className="w-full bg-[#111827] text-white border-none rounded-full py-3 px-4 focus:ring-1 focus:ring-[#00ffaa] outline-none text-sm" placeholder="Type message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <button onClick={handleSendMessage} className="absolute right-2 p-1.5 bg-[#00ffaa] text-black rounded-full hover:bg-white shadow-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                    </button>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="p-4 lg:p-6 border-t border-[#374151] bg-[#1F2937]">
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleApproveToggle} className={`flex items-center justify-center rounded-xl py-3 text-sm font-bold text-white transition-all 
                        ${isApproved ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-purple-800'}`}>
                        {isApproved ? 'Reset' : 'Approve'}
                    </button>
                    <button 
                        disabled={!isAdminPlaced} 
                        onClick={() => navigate(`/final-order/${cleanId}`, { state: { orderId: cleanId, product } })} 
                        className={`flex items-center justify-center rounded-xl py-3 text-sm font-bold transition-all duration-500 
                            ${isAdminPlaced ? 'bg-[#00ffaa] text-black shadow-[0_0_25px_#00ffaa] animate-bounce cursor-pointer' : 'bg-gray-700 text-gray-500 opacity-50 cursor-not-allowed'}`}
                    >
                        <span className="material-symbols-outlined mr-2">shopping_cart_checkout</span> Finalize
                    </button>
                </div>
            </div>
        </section>
    </main>
</div>
    );
};

export default DesignReview;