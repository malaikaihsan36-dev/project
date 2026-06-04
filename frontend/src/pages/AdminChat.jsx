import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
// Image Optimization helper import kiya
import { getOptimizedImage } from '../components/imageHelper'; 

const AdminChat = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    // Order ID ko clean karne ka logic (special characters remove karta hai)
    const cleanId = orderId ? orderId.replace(/[%23#\s]/g, '').trim() : "";
    
    const socketRef = useRef(null);
    const fileInputChatRef = useRef(null);
    const fileInputPreviewRef = useRef(null);
    const messagesEndRef = useRef(null);

    // --- States ---
    const [zoom, setZoom] = useState(1);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showUploadMenu, setShowUploadMenu] = useState(false);
    const [previewImage, setPreviewImage] = useState("https://via.placeholder.com/400");
    const [priceData, setPriceData] = useState({ production: 0, design: 0.00, shipping: 0.00, tax: 0 });
    const [isUploading, setIsUploading] = useState(false);

    // --- Timer & Status States ---
    const [expiresAt, setExpiresAt] = useState(null);
    const [timeLeft, setTimeLeft] = useState("Loading..."); 
    const [extendHours, setExtendHours] = useState("");
    const [isUserApproved, setIsUserApproved] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://melodious-enchantment-production-cdb6.up.railway.app';

    // 1. Initial Load: Order details fetch karna aur messages ko "Read" mark karna
    useEffect(() => {
        const fetchAndMarkRead = async () => {
            if (!cleanId) return;
            try {
                const res = await axios.get(`${API_BASE_URL}/api/order/${cleanId}`);
                if (res.data) {
                    if (res.data.expires_at) setExpiresAt(new Date(res.data.expires_at));
                    if (res.data.product_img) setPreviewImage(res.data.product_img);
                    setIsUserApproved(!!res.data.is_approved);
                    setIsOrderPlaced(!!res.data.is_placed);
                    if (res.data.total_price) {
                        setPriceData(prev => ({ ...prev, production: parseFloat(res.data.total_price) || 0 }));
                    }
                }
                // Admin page par aate hi notification count zero karne ke liye
                await axios.post('${API_BASE_URL}/api/mark-read', { orderId: cleanId });
            } catch (err) {
                console.error("Initial Load Error:", err);
            }
        };
        fetchAndMarkRead();
    }, [cleanId]);

    // 2. Countdown Timer Logic: Link expire hone ka time dikhata hai
    useEffect(() => {
        if (!expiresAt || isNaN(expiresAt.getTime())) return;
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = expiresAt.getTime() - now;
            if (distance <= 0) { setTimeLeft("EXPIRED"); return; }
            const h = Math.floor(distance / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        };
        const timerId = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(timerId);
    }, [expiresAt]);

    // 3. Messages Fetching: Database se purani chat load karna
    const fetchMessages = useCallback(async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/chat/${cleanId}?t=${Date.now()}`);
            setMessages(res.data.map(m => ({
                id: m.id, sender: m.sender, text: m.message, imageUrl: m.image_url,
                time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            })));
        } catch (err) { console.error("Fetch Messages Error:", err.message); }
    }, [cleanId]);

    // 4. Socket Connection: Real-time messaging aur live updates
    useEffect(() => {
        fetchMessages();
        const socket = io('${API_BASE_URL} ', { transports: ['websocket'] });
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
            // Agar customer message kare aur admin live hai, toh auto mark-read
            if(data.sender === 'customer') {
                axios.post('${API_BASE_URL}/api/mark-read', { orderId: cleanId }).catch(e => {});
            }
        });

        socket.on('admin_button_glow', (data) => setIsUserApproved(data.approved));

        return () => socket.disconnect();
    }, [cleanId, fetchMessages]);

    // Chat auto-scroll to bottom
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    // --- Event Handlers ---

    // Message bhejne ka function
    const handleSend = (text, imgUrl = null) => {
        if (!text && !imgUrl) return;
        socketRef.current.emit('send_message', { 
            orderId: cleanId, sender: 'admin', message: text, 
            imageUrl: imgUrl, type: imgUrl ? 'image' : 'text' 
        });
        setInputValue("");
        setShowUploadMenu(false);
    };

    // Order status change (Place Order Toggle)
    const handlePlaceOrderToggle = async () => {
        const nextState = !isOrderPlaced;
        try {
            setIsOrderPlaced(nextState);
            await axios.post('${API_BASE_URL}/api/order/update-status', { 
                orderId: cleanId, field: 'is_placed', value: nextState 
            });
            if (socketRef.current) {
                socketRef.current.emit('admin_placed_order', { orderId: cleanId, placed: nextState });
            }
        } catch (err) {
            console.error("Status Update Error:", err);
            setIsOrderPlaced(!nextState);
        }
    };

    // Link ki expiry extend karne ka logic
    const handleExtend = async () => {
        if (!extendHours || isNaN(extendHours)) return;
        try {
            await axios.post('${API_BASE_URL}/api/order/extend-expiry', { orderId: cleanId, hours: parseInt(extendHours) });
            setExpiresAt(prev => new Date((prev ? prev.getTime() : new Date().getTime()) + parseInt(extendHours) * 60 * 60 * 1000));
            setExtendHours("");
        } catch (err) { alert("Extension failed"); }
    };

    // Final Pricing update karna
    const handleSavePricing = async () => {
        try {
            await axios.patch(`${API_BASE_URL}/api/orders/${cleanId}/pricing`, priceData);
            setIsModalOpen(false);
            alert("Pricing Saved!");
        } catch (err) { alert("Error saving pricing"); }
    };

    // Cloudinary Image Upload (Chat aur Preview dono ke liye)
    const handleFileSelect = async (e, mode) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("Image size is too large (Max 10MB allowed)");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_portfolio_preset");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dxduylcez/image/upload", { method: "POST", body: formData });
            const data = await res.json();
            
            if (mode === 'chat') {
                handleSend("Sent an image", data.secure_url);
            } else {
                setPreviewImage(data.secure_url);
                socketRef.current.emit('update_preview', { orderId: cleanId, imageUrl: data.secure_url });
                await axios.post('${API_BASE_URL}/api/order/update-preview', { orderId: cleanId, imageUrl: data.secure_url });
            }
        } catch (err) { 
            alert("Upload failed"); 
        } finally {
            setIsUploading(false);
            setShowUploadMenu(false);
        }
    };

    return (
        <div className="bg-[#1a1a2e] text-white font-sans h-screen flex flex-col relative text-left">
            <input type="file" ref={fileInputChatRef} className="hidden" onChange={(e) => handleFileSelect(e, 'chat')} />
            <input type="file" ref={fileInputPreviewRef} className="hidden" onChange={(e) => handleFileSelect(e, 'preview')} />

            {/* Pricing Modal Section */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#1f1f3a] border border-[#2e2e3f] p-6 rounded-2xl w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Finalize Order Pricing</h2>
                        <div className="space-y-4">
                            {['production', 'design', 'shipping', 'tax'].map((field) => (
                                <div key={field}>
                                    <label className="block text-[10px] text-[#b0b0b0] uppercase tracking-widest font-bold mb-1 ml-1">{field}</label>
                                    <input type="number" className="w-full bg-[#2e2e3f] text-white rounded-lg p-3 outline-none border border-white/5 focus:border-[#39ff14]" 
                                    value={priceData[field]} onChange={(e) => setPriceData({ ...priceData, [field]: parseFloat(e.target.value) || 0 })} />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-lg bg-[#2e2e3f]">Cancel</button>
                            <button onClick={handleSavePricing} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black font-bold">Save Final</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <header className="flex items-center justify-between border-b border-[#2e2e3f] bg-[#1a1a2e]/90 backdrop-blur-md px-6 py-3 shrink-0">
                <div className="flex items-center gap-6">
                    <h2 className="text-white text-lg font-bold">COLOUR PIX</h2>
                    <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-xl border border-[#ff4d4d]/20 shadow-lg">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-gray-500 uppercase font-black">Link Expiry</span>
                            <span className={`font-mono text-lg font-bold ${timeLeft === "EXPIRED" ? 'text-red-600' : 'text-[#ff4d4d]'}`}>{timeLeft}</span>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-700 mx-1"></div>
                        <div className="flex items-center gap-1">
                            <input type="number" placeholder="+Hrs" className="w-14 bg-[#1f1f3a] border border-gray-700 rounded px-2 py-1 text-xs text-white outline-none focus:border-[#ff4d4d]" value={extendHours} onChange={(e) => setExtendHours(e.target.value)} />
                            <button onClick={handleExtend} className="bg-[#ff4d4d] text-white text-[9px] font-bold px-2 py-1.5 rounded uppercase">Extend</button>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[#b0b0b0] text-[10px] uppercase font-bold">Order ID</div>
                    <div className="text-white font-mono text-sm">#{cleanId}</div>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row-reverse h-full overflow-hidden">
                {/* Right Side: Image Preview with Zoom */}
                <section className="relative flex flex-col w-full lg:w-1/2 h-[45vh] lg:h-full bg-[#242444] border-l border-[#2e2e3f] overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            alt="Design preview" 
                            className="max-w-[80%] max-h-[60vh] object-contain transition-transform duration-200" 
                            src={getOptimizedImage(previewImage, 1000)} // Optimized preview image
                            style={{ transform: `scale(${zoom})` }} 
                        />
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#39ff14]"></div>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        <div className="bg-black/40 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
                            <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))} className="p-2 text-white hover:text-[#39ff14]"><span className="material-symbols-outlined">add</span></button>
                            <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 text-white hover:text-[#39ff14]"><span className="material-symbols-outlined">remove</span></button>
                        </div>
                    </div>
                </section>

                {/* Left Side: Chat Section */}
                <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1f1f3a] relative z-10">
                    <div className="p-2.5 border-b border-[#2e2e3f] shrink-0">
                        <div className="flex items-center justify-between">
                            <h2 className="text-white font-bold text-xl">Order Chat</h2>
                            <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Sync
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1f1f3a] scrollbar-hide pb-48">
                        {messages.map((msg, index) => (
                            <div key={msg.id || index} className={`flex gap-3 ${msg.sender === 'customer' ? '' : 'flex-row-reverse'}`}>
                                <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-1 ${msg.sender === 'admin' ? 'bg-[#8a2be2]' : 'bg-[#2e2e3f]'}`}>
                                    {msg.sender === 'admin' ? 'A' : 'C'}
                                </div>
                                <div className={`max-w-[85%] space-y-1 ${msg.sender === 'admin' ? 'text-right' : 'text-left'}`}>
                                    <div className={`px-4 py-3 rounded-2xl shadow-md break-words ${msg.sender === 'admin' ? 'bg-[#8a2be2] text-white rounded-tr-sm' : 'bg-[#2e2e3f] text-white rounded-tl-sm'}`}>
                                        {msg.imageUrl ? (
                                            <img 
                                                src={getOptimizedImage(msg.imageUrl, 500)} // Optimized chat images
                                                className="max-w-full rounded-lg cursor-pointer hover:opacity-90" 
                                                alt="upload" 
                                                onClick={() => window.open(msg.imageUrl, '_blank')} 
                                            />
                                        ) : (
                                            <div className="text-sm whitespace-pre-wrap text-left leading-relaxed">
                                                {msg.text || msg.message}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-500">{msg.time}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input & Controls Bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-[#1f1f3a]/95 border-t border-[#2e2e3f] backdrop-blur">
                        <div className="p-4 flex items-center gap-3 relative">
                            <button onClick={() => setShowUploadMenu(!showUploadMenu)} className="p-2 text-gray-400 hover:text-[#39ff14]">
                                <span className={`material-symbols-outlined text-[28px] transition-transform ${showUploadMenu ? 'rotate-45 text-[#39ff14]' : ''}`}>add_circle</span>
                            </button>
                            {/* Upload Menu */}
                            {showUploadMenu && (
                                <div className="absolute bottom-14 left-0 bg-[#2e2e3f] border border-[#39ff14]/20 rounded-xl overflow-hidden shadow-2xl w-40 z-50">
                                    <button onClick={() => fileInputChatRef.current.click()} className="w-full px-4 py-3 text-[10px] font-bold text-left hover:bg-[#39ff14] hover:text-black flex items-center gap-2 uppercase tracking-widest text-white border-b border-white/5">
                                        <span className="material-symbols-outlined text-sm">chat</span> Send Image
                                    </button>
                                    <button onClick={() => fileInputPreviewRef.current.click()} className="w-full px-4 py-3 text-[10px] font-bold text-left hover:bg-[#39ff14] hover:text-black flex items-center gap-2 uppercase tracking-widest text-white">
                                        <span className="material-symbols-outlined text-sm">tv</span> Update Preview
                                    </button>
                                </div>
                            )}
                            <div className="relative flex-1">
                                <input className="w-full bg-[#2e2e3f] text-white border-none rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-1 focus:ring-[#39ff14]" 
                                placeholder="Type as Admin..." value={inputValue} onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)} onChange={(e) => setInputValue(e.target.value)} />
                                <button onClick={() => handleSend(inputValue)} className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black"><span className="material-symbols-outlined text-[20px]">send</span></button>
                            </div>
                        </div>

                        {/* Status & Action Buttons */}
                        <div className="p-4 lg:p-6 bg-[#1a1a2e] border-t border-[#2e2e3f] grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button disabled className={`w-full rounded-xl px-4 py-3 text-sm font-bold uppercase transition-all duration-500 
                                ${isUserApproved ? 'bg-[#00ffaa] text-black shadow-[0_0_20px_#00ffaa] animate-bounce' : 'bg-gray-800 text-gray-500 opacity-40'}`}>
                                {isUserApproved ? '✓ User Approved' : 'Waiting User'}
                            </button>

                            <button onClick={handlePlaceOrderToggle} className={`w-full rounded-xl px-4 py-3 text-sm font-bold uppercase transition-all 
                                ${isOrderPlaced ? 'bg-red-600/20 border border-red-500 text-red-500' : 'bg-[#2e2e3f] border border-[#39ff14]/30 text-white hover:bg-[#39ff14] hover:text-black'}`}>
                                {isOrderPlaced ? 'Reset Order' : 'Place Order'}
                            </button>

                            <button onClick={() => setIsModalOpen(true)} className="w-full rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#6a1b9a] px-4 py-3 text-sm font-bold text-white uppercase shadow-lg hover:opacity-90">
                                Pricing
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminChat;