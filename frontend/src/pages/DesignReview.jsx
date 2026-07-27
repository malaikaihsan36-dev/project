import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Palette, ArrowLeft, ArrowUpRight, Send, CheckCircle2, ShoppingCart, MessageSquare, PlusCircle } from 'lucide-react';
import io from 'socket.io-client';
import axios from 'axios';
import { getOptimizedImage } from '../components/imageHelper'; 

const DesignReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId: urlOrderId } = useParams();
    const socketRef = useRef(null);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const initialOrderId = location.state?.orderId || urlOrderId || "TEMP";
    const cleanId = String(initialOrderId).replace(/[%23#\s]/g, '').trim();

    const [isApproved, setIsApproved] = useState(false);
    const [isAdminPlaced, setIsAdminPlaced] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [inputMessage, setInputMessage] = useState('');
    const [isAdminOnline, setIsAdminOnline] = useState(false);
    
    const [product, setProduct] = useState(location.state?.product || { title: "Loading...", img: "/images/foil_emboss.png" });
    const [previewImage, setPreviewImage] = useState(product.img);
    const [messages, setMessages] = useState([]);
    const [expiresAt, setExpiresAt] = useState(null);
    const [timeLeft, setTimeLeft] = useState("Loading...");

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';

    useEffect(() => {
        const socket = io("https://colourpix.pk", {
            path: "/api/socket.io",
            transports: ["polling", "websocket"],
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000
        });
        socketRef.current = socket;

        socket.on('global_admin_status', (status) => {
            setIsAdminOnline(status);
        });

        socket.emit('check_global_admin');

        return () => socket.disconnect();
    }, [API_BASE_URL]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/order/${cleanId}?t=${Date.now()}`);
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
    }, [cleanId, API_BASE_URL]);

    useEffect(() => {
        if (product && product.title) {
            document.title = `Design Review: ${product.title} | ColourPix`;
        } else {
            document.title = "Design Review Workspace | ColourPix";
        }
    }, [product]);

    const fetchChat = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/chat/${cleanId}?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (err) { console.error("Chat load fail:", err); }
    }, [cleanId, API_BASE_URL]);

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

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        socketRef.current.emit('send_message', { orderId: cleanId, sender: 'customer', message: inputMessage.trim(), type: 'text' });
        setInputMessage('');
    };

    const handleApproveToggle = async () => {
        const nextState = !isApproved;
        setIsApproved(nextState);
        try {
            await axios.post(`${API_BASE_URL}/api/order/update-status`, { 
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
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
            const imageData = await res.json();
            socketRef.current.emit('send_message', {
                orderId: cleanId, sender: 'customer', message: "Sent an image", imageUrl: imageData.secure_url, type: 'image'
            });
        } catch (err) { alert("Upload failed."); }
    };

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

    useEffect(() => {
        if (zoom <= 1) setPosition({ x: 0, y: 0 });
    }, [zoom]);

    return (
        <div className="bg-[#09090B] text-white font-sans overflow-hidden h-screen flex flex-col antialiased">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            
            {/* BRANDING HEADER */}
            <header className="flex items-center justify-between border-b border-white/10 bg-[#121215]/90 backdrop-blur-md px-6 py-4 z-50 shrink-0 text-left">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-xl bg-[#121215] border border-white/15 flex items-center justify-center text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB] to-[#E11D48] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <span className="font-syne font-extrabold text-xl text-white">C</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-syne text-xl font-bold tracking-tight text-white flex items-center gap-0.5">
                            COLOUR<span className="text-[#2563EB]">PIX</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] inline-block ml-0.5"></span>
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-[#A1A1AA] uppercase">Design Review Workspace</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider font-bold">Link Expiry:</span>
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 ${timeLeft === "EXPIRED" ? 'text-[#E11D48]' : 'text-[#2563EB]'}`}>
                            {timeLeft}
                        </span>
                    </div>
                    <span className="text-gray-400 font-mono text-xs border-l border-white/10 pl-6">Review ID: #{cleanId}</span>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row h-full overflow-hidden">
                
                {/* LEFT PANEL: Zoom & Pan CAD Preview */}
                <section 
                    className="relative flex flex-col w-full lg:w-1/2 h-[50vh] lg:h-full bg-[#121215]/40 border-r border-white/10 overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div 
                        className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#18181b_0%,_#09090b_100%)]"
                        onMouseDown={handleMouseDown}
                        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                    >
                        <img 
                            src={getOptimizedImage(previewImage, 1200)} 
                            className="max-w-[80vw] max-h-[70vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-200 ease-out select-none" 
                            style={{ 
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                pointerEvents: 'none' 
                            }} 
                            alt="CAD Review Preview" 
                        />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden select-none">
                        <span 
                            className="text-white/[0.03] text-4xl md:text-8xl font-black uppercase tracking-[0.25em] whitespace-nowrap rotate-[-45deg] scale-[1]"
                            style={{ 
                                WebkitTextStroke: '1px rgba(255,255,255,0.02)', 
                                padding: '2rem 5rem'
                            }}
                        >
                            COLOURPIX LABS
                        </span>
                    </div>

                    {/* ZOOM BUTTONS */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        <div className="bg-[#121215]/90 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center border border-white/10 shadow-2xl font-mono text-[10px]">
                            <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-1 hover:text-[#2563EB] transition-colors text-xs font-bold font-mono">
                                +
                            </button>
                            <span className="w-16 text-center text-gray-300 font-bold">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-1 hover:text-[#2563EB] transition-colors text-xs font-bold font-mono">
                                -
                            </button>
                        </div>
                    </div>
                </section>

                {/* RIGHT PANEL: Chat System */}
                <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#121215] relative text-left">
                    
                    {/* Design Status Info Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#121215]/95 backdrop-blur shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl flex items-center justify-center font-syne font-extrabold text-white bg-[#2563EB] shadow-lg">
                                A
                            </div>
                            <div>
                                <h2 className="font-syne font-bold text-sm">Pre-Press Engineer</h2>
                                <div className={`flex items-center gap-1.5 text-[9px] font-mono ${isAdminOnline ? 'text-green-400' : 'text-gray-500'}`}>
                                    <span className={`size-1.5 rounded-full ${isAdminOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span> 
                                    {isAdminOnline ? "ONLINE SUPPORT ACTIVE" : "ENGINEER AWAY"}
                                </div>
                            </div>
                        </div>
                        
                        <div className={`px-4 py-1.5 rounded-full border text-[9px] font-mono font-bold uppercase flex items-center gap-2 ${isApproved ? 'bg-[#2563EB]/10 border-[#2563EB]/30 text-[#2563EB]' : 'bg-[#E11D48]/10 border-[#E11D48]/30 text-[#E11D48]'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                            {isApproved ? 'Dieline Approved' : 'Review In Progress'}
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pr-4">
                        {messages.map((msg, i) => (
                            <div key={msg.id || i} className={`flex gap-3.5 ${msg.sender === 'customer' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`size-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-1 ${msg.sender === 'customer' ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-[#2563EB] text-white shadow-md'}`}>
                                    {msg.sender === 'customer' ? 'U' : 'A'}
                                </div>
                                <div className={`max-w-[75%] space-y-1 ${msg.sender === 'customer' ? 'text-right' : 'text-left'}`}>
                                    <div className={`px-5 py-3.5 rounded-2xl shadow-md ${msg.sender === 'customer' ? 'bg-[#18181b] border border-white/10 text-[#E4E4E7]' : 'bg-[#2563EB] text-white'}`}>
                                        {(msg.imageUrl || msg.image_url) && (
                                            <img 
                                                src={getOptimizedImage(msg.imageUrl || msg.image_url, 600)} 
                                                className="rounded-xl mb-2.5 max-w-full cursor-pointer hover:opacity-95 border border-white/5 transition-opacity" 
                                                onClick={() => window.open(msg.imageUrl || msg.image_url)} 
                                                alt="Markup Attachment" 
                                                loading="lazy"
                                            />
                                        )}
                                        {(msg.message || msg.text) && (
                                            <div className="text-xs leading-relaxed font-sans font-normal whitespace-pre-wrap">
                                                {msg.message || msg.text}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[9px] font-mono text-gray-500 px-1">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Chat Text Input */}
                    <div className="p-4 border-t border-white/10 bg-[#121215] shrink-0">
                        <div className="relative flex items-center gap-2">
                            <button 
                                onClick={() => fileInputRef.current.click()} 
                                className="p-2 text-gray-400 hover:text-[#2563EB] transition-colors"
                                title="Attach screenshot or CAD model"
                            >
                                <PlusCircle size={20} />
                            </button>
                            <input 
                                className="w-full bg-[#09090B] text-white border border-white/10 rounded-full py-3.5 pl-4 pr-12 focus:outline-none focus:border-[#2563EB] text-xs font-mono transition-colors" 
                                placeholder="Discuss dielines, layout alignment, Pantone colors..." 
                                value={inputMessage} 
                                onChange={(e) => setInputMessage(e.target.value)} 
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                            />
                            <button 
                                onClick={handleSendMessage} 
                                className="absolute right-2 p-2 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] transition-colors flex items-center justify-center shadow-lg"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Client Action CTA Console */}
                    <div className="p-4 lg:p-6 border-t border-white/10 bg-[#121215] shrink-0">
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={handleApproveToggle} 
                                className={`flex items-center justify-center rounded-xl py-3.5 text-xs font-mono font-bold text-white transition-all duration-300 border border-white/10
                                    ${isApproved ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-[#E11D48] hover:bg-[#BE123C] hover:shadow-[0_0_20px_rgba(225,29,72,0.3)]'}`}
                            >
                                <span>{isApproved ? 'Revoke Approval' : 'Approve Structure'}</span>
                            </button>
                            
                            <button 
                                disabled={!isAdminPlaced} 
                                onClick={() => navigate(`/final-order/${cleanId}`, { state: { orderId: cleanId, product } })} 
                                className={`flex items-center justify-center rounded-xl py-3.5 text-xs font-mono font-bold transition-all duration-500 
                                    ${isAdminPlaced ? 'bg-[#2563EB] text-white shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:bg-[#1D4ED8] cursor-pointer' : 'bg-white/5 text-gray-500 border border-white/5 opacity-40 cursor-not-allowed'}`}
                            >
                                <ShoppingCart size={14} className="mr-2" />
                                <span>Proceed to Production</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DesignReview;