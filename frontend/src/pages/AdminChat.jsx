import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminChat = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const cleanId = orderId ? orderId.replace('%23', '').replace('#', '').trim() : "";

  const [zoom, setZoom] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceData, setPriceData] = useState({ 
    production: 0, 
    design: 5.00, 
    shipping: 4.50, 
    tax: 0 
  });

  const messagesEndRef = useRef(null);

  // --- 1. REAL-TIME MESSAGES FETCHING ---
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/${cleanId}`);
      // Backend se aane wale data ko map karein (sender, message, created_at)
      const formatted = res.data.map(m => ({
        id: m.id,
        sender: m.sender, // 'admin' or 'customer'
        text: m.message,
        time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      setMessages(formatted);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Har 4 seconds baad naye messages check karein
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [cleanId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 2. SEND MESSAGE TO DATABASE ---
  const handleSend = async () => {
    if (inputValue.trim() !== "") {
      try {
        const payload = {
          orderId: cleanId,
          sender: 'admin',
          message: inputValue
        };
        
        // Optimistic UI update (foran dikhane ke liye)
        const tempMsg = {
          id: Date.now(),
          sender: 'admin',
          text: inputValue,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, tempMsg]);
        setInputValue("");

        await axios.post('http://localhost:5000/api/chat/send', payload);
      } catch (err) {
        console.error("Send Error:", err.message);
        alert("Message could not be sent.");
      }
    }
  };

  const handlePriceChange = (e) => {
    setPriceData({ ...priceData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleSaveFinal = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${cleanId}/pricing`, priceData);
      navigate('/final-order', { 
        state: { 
          orderId: cleanId,
          adminPrices: priceData,
          product: { title: "Custom Design", img: "https://via.placeholder.com/400" } 
        } 
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Pricing Error:", err.response?.data || err.message);
      alert("Database error: Could not save prices.");
    }
  };

  return (
    <div className="bg-[#1a1a2e] text-white font-sans h-screen flex flex-col relative text-left">
      
      {/* --- FINALIZE DIALOG BOX --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-left">
          <div className="bg-[#1f1f3a] border border-[#2e2e3f] p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 text-white">Finalize Order Pricing</h2>
            <div className="space-y-4">
              {['production', 'design', 'shipping', 'tax'].map((field) => (
                <div key={field}>
                  <label className="block text-[10px] text-[#b0b0b0] uppercase tracking-widest font-bold mb-1 ml-1">{field}</label>
                  <input
                    type="number"
                    name={field}
                    className="w-full bg-[#2e2e3f] text-white rounded-lg p-3 outline-none border border-white/5 focus:border-[#39ff14] transition-all"
                    onChange={handlePriceChange}
                    value={priceData[field]}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-lg bg-[#2e2e3f] text-white font-bold">Cancel</button>
              <button onClick={handleSaveFinal} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black font-bold">Save Final</button>
            </div>
          </div>
        </div>
      )}

      <header className="flex items-center justify-between border-b border-[#2e2e3f] bg-[#1a1a2e]/90 backdrop-blur-md px-6 py-3 shrink-0">
        <div className="flex items-center gap-4">
           <h2 className="text-white text-lg font-bold">COLOUR PIX</h2>
        </div>
        <div className="text-[#b0b0b0] text-sm">Order #{cleanId}</div>
      </header>

      <main className="flex flex-col lg:flex-row-reverse h-full overflow-hidden">
        <section className="relative flex flex-col w-full lg:w-1/2 h-[45vh] lg:h-full bg-[#242444] border-l border-[#2e2e3f] overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
             <img 
                alt="Design preview" 
                className="max-w-[80%] max-h-[60vh] object-contain mx-auto transition-transform duration-200" 
                src="https://via.placeholder.com/400" 
                style={{ transform: `scale(${zoom})` }}
              />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <div className="bg-black/40 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10">
              <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))} className="p-2 text-white"><span className="material-symbols-outlined">add</span></button>
              <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 text-white"><span className="material-symbols-outlined">remove</span></button>
            </div>
          </div>
        </section>

        <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1f1f3a] relative z-10">
          <div className="p-4 border-b border-[#2e2e3f] bg-[#1f1f3a]/95 backdrop-blur shrink-0">
            <h2 className="text-white font-bold text-xl">Chat: {cleanId}</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#1f1f3a]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'customer' ? 'flex-row-reverse' : ''}`}>
                <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-1 ${msg.sender === 'admin' ? 'bg-[#8a2be2]' : 'bg-[#2e2e3f]'}`}>
                  {msg.sender === 'admin' ? 'A' : 'C'}
                </div>
                <div className="max-w-[85%] space-y-1">
                  <div className={`px-4 py-3 rounded-2xl shadow-md ${msg.sender === 'admin' ? 'bg-[#8a2be2] rounded-tl-sm' : 'bg-[#2e2e3f] rounded-tr-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className={`text-[10px] text-gray-500 ${msg.sender === 'customer' ? 'text-right' : 'text-left'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="pb-[120px] lg:pb-[140px]"></div>

          <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-[#1f1f3a]/95 border-t border-[#2e2e3f]">
            <div className="p-4 flex items-center gap-3">
              <div className="relative flex-1">
                <input 
                  className="w-full bg-[#2e2e3f] text-white border-none rounded-full py-3 pl-5 pr-12 focus:outline-none" 
                  placeholder="Type a message..." 
                  value={inputValue}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleSend} className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 bg-[#1a1a2e] border-t border-[#2e2e3f] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="w-full rounded-xl bg-gradient-to-r from-[#39ff14] to-[#00ff7f] px-4 py-3 text-sm font-bold text-black uppercase tracking-tighter">Approve</button>
              <button className="w-full rounded-xl bg-[#2e2e3f] border border-[#39ff14]/30 px-4 py-3 text-sm font-bold text-white uppercase tracking-tighter">Place Order</button>
              <button onClick={() => setIsModalOpen(true)} className="w-full rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#6a1b9a] px-4 py-3 text-sm font-bold text-white uppercase tracking-tighter shadow-lg shadow-[#8a2be2]/20">Finalize</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminChat;