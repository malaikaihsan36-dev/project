import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const AdminChat = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const cleanId = orderId ? orderId.replace(/[%23#\s]/g, '').trim() : "";
    const socketRef = useRef(null);
    const fileInputChatRef = useRef(null);
    const fileInputPreviewRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [zoom, setZoom] = useState(1);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showUploadMenu, setShowUploadMenu] = useState(false);
    const [previewImage, setPreviewImage] = useState("https://via.placeholder.com/400");
    const [priceData, setPriceData] = useState({ production: 0, design: 5.00, shipping: 4.50, tax: 0 });
    
    const [expiresAt, setExpiresAt] = useState(null);
    const [timeLeft, setTimeLeft] = useState("Loading..."); 
    const [extendHours, setExtendHours] = useState("");
    const [isUserApproved, setIsUserApproved] = useState(false); // New: Glow logic for Approval

    // 1. Fetch Order Data
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/order/${cleanId}?t=${Date.now()}`);
                if (res.data) {
                    if (res.data.expires_at) setExpiresAt(new Date(res.data.expires_at));
                    if (res.data.product_img) setPreviewImage(res.data.product_img);
                }
            } catch (err) { console.error("Order Fetch Error:", err); setTimeLeft("00:00:00"); }
        };
        if (cleanId) fetchOrderData();
    }, [cleanId]);

    // 2. Timer Logic
    useEffect(() => {
        if (!expiresAt || isNaN(expiresAt.getTime())) return;
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = expiresAt.getTime() - now;
            if (distance <= 0) { setTimeLeft("EXPIRED"); return; }
            const h = Math.floor(distance / (1000 * 60 * 60)).toString().padStart(2, '0');
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const s = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            setTimeLeft(`${h}:${m}:${s}`);
        };
        const timerId = setInterval(updateTimer, 1000);
        updateTimer(); 
        return () => clearInterval(timerId);
    }, [expiresAt]);

    // 3. Socket Connection
    const fetchMessages = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/chat/${cleanId}?t=${Date.now()}`);
            setMessages(res.data.map(m => ({
                id: m.id, sender: m.sender, text: m.message, imageUrl: m.image_url,
                time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            })));
        } catch (err) { console.error("Fetch Error:", err.message); }
    }, [cleanId]);

    useEffect(() => {
        fetchMessages();
        const socket = io('http://localhost:5000', { transports: ['websocket'] });
        socketRef.current = socket;
        socket.on('connect', () => socket.emit('join_order', cleanId));

        socket.on('receive_message', (data) => {
            setMessages((prev) => {
                if (prev.some(m => m.id === data.id)) return prev;
                return [...prev, {
                    id: data.id, sender: data.sender, text: data.message, imageUrl: data.image_url || data.imageUrl,
                    time: new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }];
            });
        });

        // Listen for User Approval
        socket.on('admin_button_glow', (data) => {
            setIsUserApproved(data.approved);
        });

        return () => socket.disconnect();
    }, [cleanId, fetchMessages]);

    const handleSend = (text, imgUrl = null) => {
        if (!text && !imgUrl) return;
        socketRef.current.emit('send_message', { orderId: cleanId, sender: 'admin', message: text, imageUrl: imgUrl, type: imgUrl ? 'image' : 'text' });
        setInputValue("");
        setShowUploadMenu(false);
    };

    const handlePlaceOrder = () => {
        // Send signal to user side to activate Finalize button
        socketRef.current.emit('admin_placed_order', { orderId: cleanId });
        alert("Order signal sent to User!");
    };

    const handleFileSelect = async (e, mode) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_portfolio_preset");
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dxduylcez/image/upload", { method: "POST", body: formData });
            const data = await res.json();
            const secureUrl = data.secure_url; 
            if (mode === 'chat') {
                handleSend("Sent an image", secureUrl);
            } else {
                setPreviewImage(secureUrl);
                socketRef.current.emit('update_preview', { orderId: cleanId, imageUrl: secureUrl });
                await axios.post('http://localhost:5000/api/order/update-preview', { orderId: cleanId, imageUrl: secureUrl });
            }
        } catch (err) { alert("Upload failed."); }
        setShowUploadMenu(false);
    };

    return (
        <div className="bg-[#1a1a2e] text-white font-sans h-screen flex flex-col relative text-left">
            <input type="file" ref={fileInputChatRef} className="hidden" onChange={(e) => handleFileSelect(e, 'chat')} />
            <input type="file" ref={fileInputPreviewRef} className="hidden" onChange={(e) => handleFileSelect(e, 'preview')} />

            {/* Header and Pricing Modal Logic remains same... */}

            <main className="flex flex-col lg:flex-row-reverse h-full overflow-hidden">
                <section className="relative flex flex-col w-full lg:w-1/2 h-[45vh] lg:h-full bg-[#242444] border-l border-[#2e2e3f] overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <img alt="Design preview" className="max-w-[80%] max-h-[60vh] object-contain transition-transform" src={previewImage} style={{ transform: `scale(${zoom})` }} />
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        <div className="bg-black/40 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10">
                            <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))} className="p-2 hover:text-[#39ff14]"><span className="material-symbols-outlined">add</span></button>
                            <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 hover:text-[#39ff14]"><span className="material-symbols-outlined">remove</span></button>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1f1f3a] relative z-10">
                    <div className="p-4 border-b border-[#2e2e3f] flex items-center justify-between bg-[#1f1f3a]/95 shrink-0">
                        <h2 className="font-bold text-xl">Order Chat</h2>
                        <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Sync
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-0.5 pb-44 scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={msg.id || index} className={`flex gap-3 ${msg.sender === 'customer' ? '' : 'flex-row-reverse'}`}>
                                <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-1 ${msg.sender === 'admin' ? 'bg-[#8a2be2]' : 'bg-[#2e2e3f]'}`}>
                                    {msg.sender === 'admin' ? 'A' : 'C'}
                                </div>
                                <div className={`max-w-[85%] space-y-1 ${msg.sender === 'admin' ? 'text-right' : 'text-left'}`}>
                                    <div className={`px-4 py-3 rounded-2xl shadow-md ${msg.sender === 'admin' ? 'bg-[#8a2be2] rounded-tr-sm' : 'bg-[#2e2e3f] rounded-tl-sm'}`}>
                                        {msg.imageUrl ? <img src={msg.imageUrl} className="max-w-full rounded-lg cursor-pointer" alt="upload" onClick={() => window.open(msg.imageUrl, '_blank')} /> : <p className="text-sm">{msg.text}</p>}
                                    </div>
                                    <p className="text-[10px] text-gray-500">{msg.time}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-[#1f1f3a]/95 border-t border-[#2e2e3f] backdrop-blur">
                        <div className="p-4 flex items-center gap-3 relative">
                            <button onClick={() => setShowUploadMenu(!showUploadMenu)} className={`w-11 h-11 rounded-xl transition-all shadow-lg flex items-center justify-center ${showUploadMenu ? 'bg-[#39ff14] text-black' : 'bg-[#2e2e48] text-[#94a3b8]'}`}>
                                <span className={`material-symbols-outlined transition-transform duration-500 ${showUploadMenu ? 'rotate-[135deg]' : ''}`}>add</span>
                            </button>
                            <input className="w-full bg-[#111827] text-white border-none rounded-full py-3 px-4 outline-none text-sm" placeholder="Admin message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)} />
                            <button onClick={() => handleSend(inputValue)} className="absolute right-6 p-1.5 bg-[#39ff14] text-black rounded-full shadow-lg flex items-center justify-center"><span className="material-symbols-outlined">arrow_upward</span></button>
                        </div>
                        
                        <div className="p-4 lg:p-6 bg-[#1a1a2e] border-t border-[#2e2e3f] grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button className={`w-full rounded-xl px-4 py-3 text-sm font-bold uppercase transition-all duration-500 ${isUserApproved ? 'bg-[#00ffaa] text-black shadow-[0_0_15px_#00ffaa] animate-bounce' : 'bg-gray-800 text-gray-500 opacity-40 cursor-not-allowed'}`}>
                                {isUserApproved ? 'User Approved' : 'Waiting User'}
                            </button>
                            <button onClick={handlePlaceOrder} className="w-full rounded-xl bg-[#2e2e3f] border border-[#39ff14]/30 px-4 py-3 text-sm font-bold text-white uppercase hover:bg-[#39ff14] hover:text-black transition-all">
                                Place Order
                            </button>
                            <button onClick={() => setIsModalOpen(true)} className="w-full rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#6a1b9a] px-4 py-3 text-sm font-bold text-white uppercase shadow-lg">Pricing</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminChat;