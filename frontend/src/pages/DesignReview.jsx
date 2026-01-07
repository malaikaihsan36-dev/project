import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DesignReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // States for logic
  const [isApproved, setIsApproved] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', text: "Hi! I've confirmed your customization. How does this design layout look to you?", time: '10:24 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Data receive karna from Customize Page
  const { product, totalPrice, quantity } = location.state || {
    product: { title: "Custom Neon Flex", price: "0.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLYK4Ef8YhGl-fF4zKp5RIYh5oYQdwodsZ1y8hWGWm1_jeBPWOy5kqYozHF7v1EobT9vGPsziJ5mHXPf3eqdi4TMwsP6SPKflx2RyK12WDEU53eSzVCvl59N6ERK9Uh7wYTFX03VgResjtOHCo70xh2K3UkhyTj5T8077nTHxhtWJ3k_T0QKa-nGRPW9xSZ8ypWcAqufL_SNPvx-zDybYtoP2r-hUwqg7nTk3m6_wS6lRYaFmIkCxv4vYyS5n1sxsZJC2IEiIxdC09" },
    totalPrice: "0.00",
    quantity: 1
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <div className="bg-[#0f231c] text-white font-['Space_Grotesk'] overflow-hidden h-screen flex flex-col selection:bg-[#00ffaa] selection:text-black">
      
      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-[#273a34] bg-[#101816]/90 backdrop-blur-md px-6 py-3 z-50 shrink-0">
        <div className="flex items-center gap-4 text-white cursor-pointer" onClick={() => navigate('/')}>
          <div className="size-8 text-[#00ffaa]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">COLOUR PIX</h2>
        </div>
        <div className="flex items-center justify-end gap-4">
          <span className="text-[#9abcb0] text-sm hidden sm:block">Temporary Order ID : #4429</span>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#273a34]" style={{backgroundImage: 'url("https://i.pravatar.cc/100")'}}></div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row h-full overflow-hidden bg-[#0f231c]">
        
        {/* LEFT SECTION: INTERACTIVE PREVIEW */}
        <section className="relative flex flex-col w-full lg:w-1/2 h-[50vh] lg:h-full bg-[#0F172A] border-r border-[#273a34] overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-6 pointer-events-none">
            <div className="pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="bg-[#00ffaa]/20 text-[#00ffaa] p-1 rounded">
                <span className="material-symbols-outlined text-[18px]">layers</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]">
            <div className="absolute inset-0 z-10 pointer-events-none opacity-30" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBjx7hQ39bmjEQuj4bJ65Bpe2HfvM2pPv82w4umdTjfSPzwn5qPnj_F4lNFi7xcY_5qsyPoIzTCjGbZKsvUs5n8wjWneuMmpaMQixio20EkX8gwXtbqfMvoyiwS3---LX38ExD4OwdTGFe28JhWI74cC630KySY0_UnBY5EuSQTZ5BdEBjeeYx16kE-tnSVOpZPz348FqbZijXZhsAqX9M3rfUjhqiW-zQzZE8K30KYm-PdJdv3LrJjuSRlpFXa5hfnIB2Nv1aYAUzc)', backgroundRepeat: 'repeat'}}></div>
            <div 
              className="relative z-0 transform transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoom})` }}
            >
              <img alt="Preview" src={product.img} className="max-w-[80%] max-h-[70vh] object-contain drop-shadow-2xl mx-auto" />
            </div>
          </div>

          {/* ZOOM TOOLBAR */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <div className="bg-black/60 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
              <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} className="p-2 text-white hover:text-[#00ffaa] transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">add</span>
              </button>
              <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 text-white hover:text-[#00ffaa] transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">remove</span>
              </button>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <button onClick={() => setZoom(1)} className="p-2 text-white hover:text-[#00ffaa] transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">center_focus_strong</span>
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: CHAT & ACTIONS */}
        <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1F2937] relative z-10">
          
          {/* Support Header */}
          <div className="p-4 border-b border-[#374151] bg-[#1F2937]/95 backdrop-blur shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
              <div className="text-left">
                <h2 className="text-white font-bold text-sm">Alex from Design Team</h2>
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

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#1F2937]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
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

          {/* CHAT INPUT BAR */}
          <div className="p-4 bg-[#1F2937] border-t border-[#374151] shrink-0">
            <div className="relative flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">add_circle</span></button>
              <input 
                className="w-full bg-[#111827] text-white border-none rounded-full py-3 px-4 focus:ring-1 focus:ring-[#00ffaa] outline-none text-sm" 
                placeholder="Type a message..." 
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="absolute right-2 p-1.5 bg-[#00ffaa] text-black rounded-full hover:bg-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS (Fully Connected to FinalOrder) */}
          <div className="p-4 lg:p-6 bg-[#1F2937] border-t border-[#374151] shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsApproved(!isApproved)}
                className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition-all duration-300
                ${isApproved ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg shadow-purple-900/20'}`}
              >
                <span className="material-symbols-outlined mr-2 text-[18px]">{isApproved ? 'undo' : 'thumb_up'}</span>
                {isApproved ? 'Reset' : 'Approve'}
              </button>

              <button 
                disabled={!isApproved}
                onClick={() => navigate('/final-order', { state: { product, totalPrice, quantity } })}
                className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300
                ${isApproved ? 'bg-[#00ffaa] text-black shadow-lg shadow-[#00ffaa]/20 cursor-pointer' : 'bg-gray-700 text-gray-500 grayscale opacity-50 cursor-not-allowed'}`}
              >
                <span className="material-symbols-outlined mr-2 text-[18px]">shopping_cart_checkout</span>
                Place Order
              </button>
            </div>
            <button onClick={() => navigate(-1)} className="w-full mt-4 text-[10px] text-gray-500 hover:text-white transition-colors">
                ← BACK TO CUSTOMIZE
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignReview;