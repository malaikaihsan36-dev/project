import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminChat = () => {
  const { orderId } = useParams();

  // --- LOGIC STATES ---
  const [zoom, setZoom] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'admin', text: `Hi! Updated the logo placement for order ${orderId}. How does it look?`, time: "10:24 AM" },
    { id: 2, sender: 'user', text: "Looks perfect! Ready to approve.", time: "10:28 AM" }
  ]);
  const [inputValue, setInputValue] = useState("");
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceData, setPriceData] = useState({ production: '', design: '', shipping: '', tax: '' });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      const newMsg = {
        id: Date.now(),
        sender: 'admin',
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setInputValue("");
    }
  };

  // Price Modal Handler
  const handlePriceChange = (e) => {
    setPriceData({ ...priceData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#1a1a2e] text-white font-sans h-screen flex flex-col relative">
      
      {/* --- FINALIZE DIALOG BOX --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1f1f3a] border border-[#2e2e3f] p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 text-white">Finalize Order Pricing</h2>
            <div className="space-y-4">
              {['production', 'design', 'shipping', 'tax'].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-[#b0b0b0] capitalize mb-1">{field}</label>
                  <input
                    type="number"
                    name={field}
                    placeholder={`Enter ${field} cost`}
                    className="w-full bg-[#2e2e3f] text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#39ff14]"
                    onChange={handlePriceChange}
                    value={priceData[field]}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-lg bg-[#2e2e3f] text-white font-bold">Cancel</button>
              <button onClick={() => { console.log(priceData); setIsModalOpen(false); }} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black font-bold">Save Final</button>
            </div>
          </div>
        </div>
      )}

      <header className="flex items-center justify-between border-b border-[#2e2e3f] bg-[#1a1a2e]/90 backdrop-blur-md px-6 py-3 shrink-0">
        <div className="flex items-center gap-4">
           <h2 className="text-white text-lg font-bold">COLOUR PIX</h2>
        </div>
        <div className="text-[#b0b0b0] text-sm">Order #{orderId}</div>
      </header>

      <main className="flex flex-col lg:flex-row-reverse h-full overflow-hidden">
        
        <section className="relative flex flex-col w-full lg:w-1/2 h-[45vh] lg:h-full bg-[#242444] border-l border-[#2e2e3f] overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.3)]">
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
              <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))} className="p-2 text-white hover:text-[#39ff14]"><span className="material-symbols-outlined">add</span></button>
              <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="p-2 text-white hover:text-[#39ff14]"><span className="material-symbols-outlined">remove</span></button>
            </div>
          </div>
        </section>

        <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1f1f3a] relative z-10">
          <div className="p-4 border-b border-[#2e2e3f] bg-[#1f1f3a]/95 backdrop-blur shrink-0 flex items-center justify-between">
            <h2 className="text-white font-bold text-xl">Chat: {orderId}</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-[#1f1f3a]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-1 ${msg.sender === 'admin' ? 'bg-[#8a2be2]' : 'bg-[#2e2e3f]'}`}>
                  {msg.sender === 'admin' ? 'A' : 'Y'}
                </div>
                <div className="max-w-[85%] space-y-1">
                  <div className={`px-4 py-3 rounded-2xl shadow-md ${msg.sender === 'admin' ? 'bg-[#8a2be2] rounded-tl-sm' : 'bg-[#2e2e3f] rounded-tr-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-[#1f1f3a]/95 backdrop-blur border-t border-[#2e2e3f]">
            <div className="p-4 flex items-center gap-3">
              <button className="text-[#39ff14] hover:text-[#00ff7f] p-2 rounded-full"><span className="material-symbols-outlined">attach_file</span></button>
              <div className="relative flex-1">
                <input 
                  className="w-full bg-[#2e2e3f] text-white border-none rounded-full py-3 pl-5 pr-12 focus:outline-none" 
                  placeholder="Type a message..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-gradient-to-r from-[#39ff14] to-[#00ff7f] text-black">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 bg-[#1a1a2e] border-t border-[#2e2e3f] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="w-full rounded-xl bg-gradient-to-r from-[#39ff14] to-[#00ff7f] shadow-lg shadow-[#39ff14]/20 px-4 py-3 text-sm font-bold text-black flex items-center justify-center">
                Approve
              </button>
              <button className="w-full rounded-xl bg-[#2e2e3f] border border-[#39ff14]/30 px-4 py-3 text-sm font-bold text-white flex items-center justify-center">
                Place Order
              </button>
              {/* Triggering Modal */}
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="w-full rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#6a1b9a] shadow-lg shadow-[#8a2be2]/20 px-4 py-3 text-sm font-bold text-white flex items-center justify-center"
              >
                Finalize
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminChat;