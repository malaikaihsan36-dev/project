import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';
import io from 'socket.io-client';
import axios from 'axios';

const DesignReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const socketRef = useRef(null);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const { product, orderId } = location.state || {
        product: { title: "Custom Neon Flex", img: "https://via.placeholder.com/400" },
        orderId: "TEMP"
    };

    const cleanId = String(orderId || "").replace(/[%23#\s]/g, '').trim();

    const [isApproved, setIsApproved] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [inputMessage, setInputMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(product.img);
    const [messages, setMessages] = useState([{ id: 'first-msg', sender: 'admin', message: "Hi! How does this design layout look to you?", created_at: new Date().toISOString() }]);

    const [expiresAt, setExpiresAt] = useState(null);
    const [timeLeft, setTimeLeft] = useState("Loading...");
    const [isAdminPlaced, setIsAdminPlaced] = useState(false); // Glow logic for Finalize

    // 1. Fetch Initial Order Data
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/order/${cleanId}?t=${Date.now()}`);
                if (res.data) {
                    if (res.data.expires_at) setExpiresAt(new Date(res.data.expires_at));
                    if (res.data.product_img) setPreviewImage(res.data.product_img);
                }
            } catch (err) {
                console.error("Order Data Fetch Error:", err);
                setTimeLeft("00:00:00");
            }
        };
        if (cleanId && cleanId !== "TEMP") fetchOrderData();
    }, [cleanId]);

    // 2. Timer Logic
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

    const fetchChat = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/chat/${cleanId}?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [prev[0], ...data]);
            }
        } catch (err) { console.error("Chat load fail:", err); }
    }, [cleanId]);

    // 3. Socket Connection & Listeners
    useEffect(() => {
        fetchChat();
        const socket = io('http://localhost:5000', { transports: ['websocket'], reconnection: true });
        socketRef.current = socket;

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

        // Listen for Admin's "Place Order" signal
        socket.on('user_finalize_glow', (data) => {
            setIsAdminPlaced(data.placed);
        });

        return () => {
            socket.off('receive_message');
            socket.off('update_preview');
            socket.off('user_finalize_glow');
            socket.disconnect();
        };
    }, [cleanId, fetchChat]);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        socketRef.current.emit('send_message', { orderId: cleanId, sender: 'customer', message: inputMessage.trim(), type: 'text' });
        setInputMessage('');
    };

    const handleApproveToggle = () => {
        const nextState = !isApproved;
        setIsApproved(nextState);
        // Signal admin to glow their "User Approved" button
        socketRef.current.emit('user_approved', { orderId: cleanId, approved: nextState });
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

    return (
        <div className="bg-[#0f231c] text-white font-['Space_Grotesk'] overflow-hidden h-screen flex flex-col">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            
            <header className="flex items-center justify-between border-b border-[#273a34] bg-[#1f2937]/90 backdrop-blur-md px-6 py-3 z-50 shrink-0">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white"><Palette size={24} /></div>
                    <span className="text-xl font-bold">Colour Pix</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 uppercase font-black">Expires:</span>
                        <span className={`font-mono text-sm font-bold ${timeLeft === "EXPIRED" ? 'text-red-500' : 'text-[#FF4D4D]'}`}>{timeLeft}</span>
                    </div>
                    <span className="text-[#9abcb0] text-sm font-medium border-l border-white/10 pl-6">Order ID: #{orderId}</span>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row h-full overflow-hidden">
                <section className="relative flex flex-col w-full lg:w-1/2 h-[50vh] lg:h-full bg-[#0F172A] border-r border-[#273a34] overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]">
                        <img src={previewImage} className="max-w-[80%] max-h-[70vh] object-contain drop-shadow-2xl transition-transform duration-200" style={{ transform: `scale(${zoom})` }} alt="Preview" />
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        <div className="bg-black/60 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
                            <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-2 hover:text-[#00ffaa]"><span className="material-symbols-outlined">add</span></button>
                            <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 hover:text-[#00ffaa]"><span className="material-symbols-outlined">remove</span></button>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1F2937] relative">
                    <div className="p-4 border-b border-[#374151] flex items-center justify-between bg-[#1F2937]/95 backdrop-blur shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">A</div>
                            <div>
                                <h2 className="font-bold text-sm">Design Team</h2>
                                <div className="flex items-center gap-1.5 text-[10px] text-green-400">
                                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                                </div>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase flex items-center gap-2 ${isApproved ? 'bg-green-500/20 border-green-500/30 text-green-500' : 'bg-amber-500/20 border-amber-500/30 text-amber-500'}`}>
                            <span className="material-symbols-outlined text-[14px]">{isApproved ? 'check_circle' : 'hourglass_top'}</span>
                            {isApproved ? 'Approved' : 'Waiting Approval'}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-0.5 scrollbar-hide">
                        {messages.map((msg, i) => (
                            <div key={msg.id || i} className={`flex gap-3 ${msg.sender === 'customer' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1 ${msg.sender === 'customer' ? 'bg-gray-600' : 'bg-blue-600'}`}>
                                    {msg.sender === 'customer' ? 'U' : 'A'}
                                </div>
                                <div className={`max-w-[80%] space-y-1 ${msg.sender === 'customer' ? 'text-right' : 'text-left'}`}>
                                    <div className={`px-4 py-3 rounded-2xl shadow-md ${msg.sender === 'customer' ? 'bg-[#374151] rounded-tr-sm' : 'bg-blue-600 rounded-tl-sm'}`}>
                                        {(msg.imageUrl || msg.image_url) && <img src={msg.imageUrl || msg.image_url} className="rounded-lg mb-1 max-w-full cursor-pointer" onClick={() => window.open(msg.imageUrl || msg.image_url)} alt="Attached" />}
                                        {(msg.message || msg.text) && <p className="text-sm leading-relaxed">{msg.message || msg.text}</p>}
                                    </div>
                                    <p className="text-[10px] text-gray-500">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 border-t border-[#374151] bg-[#1F2937]">
                        <div className="relative flex items-center gap-2">
                            <button onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-[#00ffaa]"><span className="material-symbols-outlined">add_circle</span></button>
                            <input className="w-full bg-[#111827] text-white border-none rounded-full py-3 px-4 focus:ring-1 focus:ring-[#00ffaa] outline-none text-sm" placeholder="Type message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                            <button onClick={handleSendMessage} className="absolute right-2 p-1.5 bg-[#00ffaa] text-black rounded-full hover:bg-white shadow-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">arrow_upward</span></button>
                        </div>
                    </div>

                    <div className="p-4 lg:p-6 border-t border-[#374151] bg-[#1F2937]">
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handleApproveToggle} className={`flex items-center justify-center rounded-xl py-3 text-sm font-bold text-white transition-all ${isApproved ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg'}`}>
                                <span className="material-symbols-outlined mr-2">{isApproved ? 'undo' : 'thumb_up'}</span> {isApproved ? 'Reset' : 'Approve'}
                            </button>
                            <button 
                                disabled={!isAdminPlaced} 
                                onClick={() => navigate('/final-order', { state: { orderId, product } })} 
                                className={`flex items-center justify-center rounded-xl py-3 text-sm font-bold transition-all duration-500 
                                    ${isAdminPlaced ? 'bg-[#00ffaa] text-black shadow-[0_0_20px_#00ffaa/40] animate-pulse cursor-pointer' : 'bg-gray-700 text-gray-500 opacity-50 cursor-not-allowed'}`}
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