import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';

const DesignReview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product, totalPrice, quantity, orderId } = location.state || {
    product: { title: "Custom Neon Flex", price: "0.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLYK4Ef8YhGl-fF4zKp5RIYh5oYQdwodsZ1y8hWGWm1_jeBPWOy5kqYozHF7v1EobT9vGPsziJ5mHXPf3eqdi4TMwsP6SPKflx2RyK12WDEU53eSzVCvl59N6ERK9Uh7wYTFX03VgResjtOHCo70xh2K3UkhyTj5T8077nTHxhtWJ3k_T0QKa-nGRPW9xSZ8ypWcAqufL_SNPvx-zDybYtoP2r-hUwqg7nTk3m6_wS6lRYaFmIkCxv4vYyS5n1sxsZJC2IEiIxdC09" },
    totalPrice: "0.00",
    quantity: 1,
    orderId: "ABCD",
    userEmail: "Guest"
  };

  const [isApproved, setIsApproved] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const fileInputRef = useRef(null); // Ref for image browsing
  
  // ✅ Fixed First Message Constant
  const FIRST_MESSAGE = { 
    id: 'first-msg', 
    sender: 'Admin', 
    text: "Hi! I've confirmed your customization. How does this design layout look to you?", 
    time: '10:24 AM' 
  };

  const [messages, setMessages] = useState([FIRST_MESSAGE]);
  const chatEndRef = useRef(null);

  // --- Fetch Logic ---
  const fetchChat = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/${orderId}`);
      if (!response.ok) return;
      const data = await response.json();
      
      const dbMessages = data.map(m => ({
        id: m.id,
        sender: m.sender === 'customer' ? 'You' : 'Admin',
        text: m.message,
        time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));

      // ✅ Merge First Message with DB data
      setMessages([FIRST_MESSAGE, ...dbMessages]);
    } catch (err) {
      console.error("Chat load fail:", err);
    }
  }, [orderId]);

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 5000);
    return () => clearInterval(interval);
  }, [fetchChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Message Sending Logic ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          sender: 'customer', 
          message: inputMessage.trim() 
        })
      });

      if (response.ok) {
        setInputMessage(''); // Clear input
        await fetchChat(); // Instantly refresh
      }
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  // --- Image Browse Logic ---
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Yahan aap upload logic add kar sakte hain
      alert(`${file.name} selected. Image upload logic can be added here.`);
    }
  };

  return (
    <div className="bg-[#0f231c] text-white font-['Space_Grotesk'] overflow-hidden h-screen flex flex-col selection:bg-[#00ffaa] selection:text-black">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      <header className="flex items-center justify-between border-b border-[#273a34] bg-[#101816]/90 backdrop-blur-md px-6 py-3 z-50 shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
            <Palette size={24} />
          </div>
          <span className="text-xl font-bold text-white">Colour Pix</span>
        </div>
        <div className="flex items-center justify-end gap-4">
          <span className="text-[#9abcb0] text-sm hidden sm:block">Temporary Order ID : #{orderId}</span>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row h-full overflow-hidden bg-[#0f231c]">
        
        {/* LEFT SECTION: PREVIEW */}
        <section className="relative flex flex-col w-full lg:w-1/2 h-[50vh] lg:h-full bg-[#0F172A] border-r border-[#273a34] overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
              <span className="text-[140px] font-bold -rotate-12 whitespace-nowrap">Colour Pix</span>
            </div>
            <div className="relative z-0 transform transition-transform duration-200 ease-out" style={{ transform: `scale(${zoom})` }}>
              <img alt="Preview" src={product.img} className="max-w-[80%] max-h-[70vh] object-contain drop-shadow-2xl mx-auto" />
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <div className="bg-black/60 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
              <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} className="p-2 text-white hover:text-[#00ffaa] rounded-full hover:bg-white/5"><span className="material-symbols-outlined">add</span></button>
              <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 text-white hover:text-[#00ffaa] rounded-full hover:bg-white/5"><span className="material-symbols-outlined">remove</span></button>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <button onClick={() => setZoom(1)} className="p-2 text-white hover:text-[#00ffaa] rounded-full hover:bg-white/5"><span className="material-symbols-outlined">center_focus_strong</span></button>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: CHAT */}
        <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1F2937] relative z-10">
          
          <div className="p-4 border-b border-[#374151] bg-[#1F2937]/95 backdrop-blur shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
              <div className="text-left">
                <h2 className="text-white font-bold text-sm">Design Team</h2>
                <div className="flex items-center gap-1.5 text-[10px] text-green-400">
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${isApproved ? 'bg-green-500/20 border-green-500/30 text-green-500' : 'bg-amber-500/20 border-amber-500/30 text-amber-500'}`}>
              <span className="material-symbols-outlined text-[14px]">{isApproved ? 'check_circle' : 'hourglass_top'}</span>
              {isApproved ? 'Approved' : 'Waiting Approval'}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1F2937] scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={msg.id || index} className={`flex gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${msg.sender === 'You' ? 'bg-gray-600' : 'bg-blue-600'}`}>
                  {msg.sender[0]}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm text-left ${msg.sender === 'You' ? 'bg-[#374151] rounded-tr-none' : 'bg-blue-600 rounded-tl-none'}`}>
                  {msg.text}
                  <div className="text-[10px] mt-1 opacity-50">{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-[#1F2937] border-t border-[#374151]">
            <div className="relative flex items-center gap-2">
              {/* ✅ Image Browse Button Fixed */}
              <button 
                onClick={handleImageClick}
                className="p-2 text-gray-400 hover:text-[#00ffaa] transition-colors"
              >
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <input 
                className="w-full bg-[#111827] text-white border-none rounded-full py-3 px-4 focus:ring-1 focus:ring-[#00ffaa] outline-none text-sm" 
                placeholder="Type a message..." 
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage} 
                className="absolute right-2 p-1.5 bg-[#00ffaa] text-black rounded-full hover:bg-white transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
              </button>
            </div>
          </div>

          <div className="p-4 lg:p-6 bg-[#1F2937] border-t border-[#374151]">
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setIsApproved(!isApproved)} className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition-all ${isApproved ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg'}`}>
                <span className="material-symbols-outlined mr-2 text-[18px]">{isApproved ? 'undo' : 'thumb_up'}</span>
                {isApproved ? 'Reset' : 'Approve'}
              </button>

              <button disabled={!isApproved} onClick={() => navigate('/final-order', { state: { product, totalPrice, quantity, orderId } })} className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-all ${isApproved ? 'bg-[#00ffaa] text-black shadow-lg cursor-pointer' : 'bg-gray-700 text-gray-500 opacity-50 cursor-not-allowed'}`}>
                <span className="material-symbols-outlined mr-2 text-[18px]">shopping_cart_checkout</span>
                Finalize
              </button>
            </div>
            <button onClick={() => navigate(-1)} className="w-full mt-4 text-[10px] text-gray-500 hover:text-white transition-colors">← BACK TO CUSTOMIZE</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignReview;