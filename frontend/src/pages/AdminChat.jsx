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
    const [priceData, setPriceData] = useState({ production: 0, design: 0.00, shipping: 0.00, tax: 0 });
    
    
    // Timer States
    const [expiresAt, setExpiresAt] = useState(null);
    const [timeLeft, setTimeLeft] = useState("Loading..."); 
    const [extendHours, setExtendHours] = useState("");

    // NEW: Sync States for Buttons
    const [isUserApproved, setIsUserApproved] = useState(false); // User side approval status
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);   // Admin's own place order status

    // Sirf ye EK logic rakhein initial load ke liye
useEffect(() => {
    const fetchInitialData = async () => {
        if (!cleanId) return;
        try {
            // Order details fetch karein (expiry, image etc)
            const res = await axios.get(`http://localhost:5000/api/order/${cleanId}`);
            if (res.data) {
                if (res.data.expires_at) setExpiresAt(new Date(res.data.expires_at));
                if (res.data.product_img) setPreviewImage(res.data.product_img);
                
                // Persistence: DB se status load karein
                setIsUserApproved(!!res.data.is_approved);
                setIsOrderPlaced(!!res.data.is_placed);
            }
        } catch (err) {
            console.error("Initial Fetch Error:", err);
        }
    };
    fetchInitialData();
}, [cleanId]);

    // 2. Timer Logic
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

    // 3. Socket Connection & Events
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

        // Listen for User side "Approve" button toggle
        socket.on('admin_button_glow', (data) => {
            setIsUserApproved(data.approved);
        });

        return () => socket.disconnect();
    }, [cleanId, fetchMessages]);


    useEffect(() => {
        const socket = io('http://localhost:5000');
        socketRef.current = socket;
        socket.emit('join_order', cleanId);

        socket.on('admin_button_glow', (data) => setIsUserApproved(data.approved));
        return () => socket.disconnect();
    }, [cleanId]);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    // 4. Handlers
    const handleSend = (text, imgUrl = null) => {
        if (!text && !imgUrl) return;
        socketRef.current.emit('send_message', { orderId: cleanId, sender: 'admin', message: text, imageUrl: imgUrl, type: imgUrl ? 'image' : 'text' });
        setInputValue("");
        setShowUploadMenu(false);
    };

    // Place Order Toggle (Add/Reset)
    const handlePlaceOrderToggle = async () => {
    const nextState = !isOrderPlaced; // Toggle current state
    
    try {
        // 1. UI Update
        setIsOrderPlaced(nextState);

        // 2. Database Update
        await axios.post('http://localhost:5000/api/order/update-status', { 
            orderId: cleanId, 
            field: 'is_placed', 
            value: nextState 
        });

        // 3. Socket Signal (Sabse important)
        if (socketRef.current) {
            // Hum 'nextState' bhej rahe hain (jo true bhi ho sakti hai aur false bhi)
            socketRef.current.emit('admin_placed_order', { 
                orderId: cleanId, 
                placed: nextState 
            });
        }
    } catch (err) {
        console.error("Error:", err);
        setIsOrderPlaced(!nextState); // Rollback on error
    }
};

    const handleExtend = async () => {
        if (!extendHours || isNaN(extendHours)) return;
        try {
            await axios.post('http://localhost:5000/api/order/extend-expiry', { orderId: cleanId, hours: parseInt(extendHours) });
            setExpiresAt(prev => new Date((prev ? prev.getTime() : new Date().getTime()) + parseInt(extendHours) * 60 * 60 * 1000));
            setExtendHours("");
        } catch (err) { alert("Extension failed"); }
    };

    const handleSavePricing = async () => {
    try {
        await axios.patch(`http://localhost:5000/api/orders/${cleanId}/pricing`, priceData);
        setIsModalOpen(false);
        alert("Pricing Saved Successfully!");
    } catch (err) {
        console.error("Failed to save pricing:", err);
        alert("Error saving pricing");
    }
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
            if (mode === 'chat') {
                handleSend("Sent an image", data.secure_url);
            } else {
                setPreviewImage(data.secure_url);
                socketRef.current.emit('update_preview', { orderId: cleanId, imageUrl: data.secure_url });
                await axios.post('http://localhost:5000/api/order/update-preview', { orderId: cleanId, imageUrl: data.secure_url });
            }
        } catch (err) { alert("Upload failed"); }
        setShowUploadMenu(false);
    };

    return (
        <div className="bg-[#1a1a2e] text-white font-sans h-screen flex flex-col relative text-left">
            <input type="file" ref={fileInputChatRef} className="hidden" onChange={(e) => handleFileSelect(e, 'chat')} />
            <input type="file" ref={fileInputPreviewRef} className="hidden" onChange={(e) => handleFileSelect(e, 'preview')} />

            {/* Pricing Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-left">
                    <div className="bg-[#1f1f3a] border border-[#2e2e3f] p-6 rounded-2xl w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4 text-white">Finalize Order Pricing</h2>
                        <div className="space-y-4">
                            {['production', 'design', 'shipping', 'tax'].map((field) => (
                                <div key={field}>
                                    <label className="block text-[10px] text-[#b0b0b0] uppercase tracking-widest font-bold mb-1 ml-1">{field}</label>
                                    <input type="number" className="w-full bg-[#2e2e3f] text-white rounded-lg p-3 outline-none border border-white/5 focus:border-[#39ff14]" value={priceData[field]} onChange={(e) => setPriceData({ ...priceData, [field]: parseFloat(e.target.value) || 0 })} />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-lg bg-[#2e2e3f] text-white font-bold">Cancel</button>
                            <button onClick={handleSavePricing} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black font-bold">   Save Final  </button>
                        </div>
                    </div>
                </div>
            )}

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
                            <button onClick={handleExtend} className="bg-[#ff4d4d] text-white text-[9px] font-bold px-2 py-1.5 rounded hover:bg-white hover:text-black transition-colors">EXTEND</button>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[#b0b0b0] text-[10px] uppercase font-bold">Order ID</div>
                    <div className="text-white font-mono text-sm">#{cleanId}</div>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row-reverse h-full overflow-hidden">
                {/* Preview Section */}
                <section className="relative flex flex-col w-full lg:w-1/2 h-[45vh] lg:h-full bg-[#242444] border-l border-[#2e2e3f] overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <img alt="Design preview" className="max-w-[80%] max-h-[60vh] object-contain mx-auto transition-transform duration-200" src={previewImage} style={{ transform: `scale(${zoom})` }} />
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        <div className="bg-black/40 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
                            <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))} className="p-2 text-white hover:text-[#39ff14]"><span className="material-symbols-outlined">add</span></button>
                            <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 text-white hover:text-[#39ff14]"><span className="material-symbols-outlined">remove</span></button>
                        </div>
                    </div>
                </section>

                {/* Chat Section */}
                <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1f1f3a] relative z-10">
                    <div className="p-2.5 border-b border-[#2e2e3f] bg-[#1f1f3a]/95 backdrop-blur shrink-0">
                        <div className="flex items-center justify-between">
                            <h2 className="text-white font-bold text-xl">Order Chat</h2>
                            <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Sync
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-[#1f1f3a] scrollbar-hide pb-44">
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

                    {/* Bottom Input & Action Buttons */}
                    <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-[#1f1f3a]/95 border-t border-[#2e2e3f] backdrop-blur">
                        <div className="p-4 flex items-center gap-3 relative">
                            <button onClick={() => setShowUploadMenu(!showUploadMenu)} className="p-2 text-gray-400 hover:text-[#39ff14]">
                                <span className={`material-symbols-outlined text-[28px] transition-transform ${showUploadMenu ? 'rotate-45 text-[#39ff14]' : ''}`}>add_circle</span>
                            </button>
                            {showUploadMenu && (
                                <div className="absolute bottom-14 left-0 bg-[#2e2e3f] border border-[#39ff14]/20 rounded-xl overflow-hidden shadow-2xl w-36 z-50">
                                    <button onClick={() => fileInputChatRef.current.click()} className="w-full px-4 py-3 text-[10px] font-bold text-left hover:bg-[#39ff14] hover:text-black border-b border-white/5 flex items-center gap-2 uppercase tracking-widest text-white">
                                        <span className="material-symbols-outlined text-sm">chat</span> On Chat
                                    </button>
                                    <button onClick={() => fileInputPreviewRef.current.click()} className="w-full px-4 py-3 text-[10px] font-bold text-left hover:bg-[#39ff14] hover:text-black flex items-center gap-2 uppercase tracking-widest text-white">
                                        <span className="material-symbols-outlined text-sm">tv</span> On Preview
                                    </button>
                                </div>
                            )}
                            <div className="relative flex-1">
                                <input className="w-full bg-[#2e2e3f] text-white border-none rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-1 focus:ring-[#39ff14]" placeholder="Type as Admin..." value={inputValue} onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)} onChange={(e) => setInputValue(e.target.value)} />
                                <button onClick={() => handleSend(inputValue)} className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black"><span className="material-symbols-outlined text-[20px]">send</span></button>
                            </div>
                        </div>

                        {/* Updated Action Buttons */}
                        <div className="p-4 lg:p-6 bg-[#1a1a2e] border-t border-[#2e2e3f] grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* User Status Button (Glows Green when User Approves) */}
                            {/* 1. Admin Approved (Bouncing & Glow) */}
            <button disabled className={`w-full rounded-xl px-4 py-3 text-sm font-bold uppercase transition-all duration-500 
                ${isUserApproved ? 'bg-[#00ffaa] text-black shadow-[0_0_20px_#00ffaa] animate-bounce' : 'bg-gray-800 text-gray-500 opacity-40'}`}>
                {isUserApproved ? '✓ User Approved' : 'Waiting User'}
            </button>

            {/* 2. Place Order / Reset */}
            <button onClick={handlePlaceOrderToggle} className={`w-full rounded-xl px-4 py-3 text-sm font-bold uppercase transition-all 
                ${isOrderPlaced ? 'bg-red-600/20 border border-red-500 text-red-500' : 'bg-[#2e2e3f] border border-[#39ff14]/30 text-white hover:bg-[#39ff14] hover:text-black'}`}>
                {isOrderPlaced ? 'Reset Order' : 'Place Order'}
            </button>

                            {/* Finalize/Pricing Button */}
                            <button onClick={() => setIsModalOpen(true)} className="w-full rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#6a1b9a] px-4 py-3 text-sm font-bold text-white uppercase shadow-lg shadow-[#8a2be2]/20 hover:opacity-90">
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