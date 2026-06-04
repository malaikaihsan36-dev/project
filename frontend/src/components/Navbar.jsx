import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Palette } from 'lucide-react';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Resume Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeEmail, setResumeEmail] = useState('');
  const [resumeCode, setResumeCode] = useState('');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/catalog' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Support', path: '/contact' },
  ];

  // --- UPDATED: RESUME LOGIC (With Input Sanitization) ---
  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    
    // Clean code: remove '#' and extra spaces so it matches DB format
    const cleanCode = resumeCode.replace(/[#\s]/g, '').toUpperCase().trim();
    // NavBar.jsx mein handleResumeSubmit ke andar ye console log lagayen
    console.log("Sending to Server:", { email: resumeEmail, code: resumeCode });
    try {
      // Direct safe connection string use ki bina kisi break hone wale variable ke
      const response = await axios.post('process.env.REACT_APP_API_BASE_URL/api/orders/resume-design', { 
        email: resumeEmail.toLowerCase().trim(), 
        code: cleanCode 
      });

      if (response.data.success) {
        setIsModalOpen(false);
        // Navigate with full order data
        navigate(`/design-review`, { 
          state: { 
            orderId: response.data.orderId, 
            product: response.data.productData 
          } 
        });
      }
    } catch (error) {
      // Show specific backend message if available
      alert(error.response?.data?.message || "Invalid Email or Order ID!");
    }
  };

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0B0F1E]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
              <Palette size={24} />
            </div>
            <span className="text-xl font-bold text-white">Colour Pix</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm transition-all py-2 ${location.pathname === link.path ? 'text-white border-b-2 border-[#FF4D4D]' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <ShoppingCart 
              className="text-gray-400 cursor-pointer hover:text-white transition-colors" 
              size={20} 
              onClick={() => setIsModalOpen(true)} 
            />
            <User 
              className="hidden sm:block text-gray-400 cursor-pointer hover:text-white transition-colors" 
              size={20} 
              // UPDATED: window.open use kiya hai new tab ke liye
              onClick={() => window.open('/admin-login', '_blank')} 
            />
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#0B0F1E] p-6 flex flex-col gap-4 border-b border-white/5">
            {navLinks.map((link) => (
              <button key={link.path} onClick={() => { navigate(link.path); setIsOpen(false); }} className="text-white text-left">
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] w-full h-full flex items-center justify-center bg-black/90 backdrop-blur-sm overflow-y-auto px-4">
          <div className="relative bg-[#0F172A] border border-white/10 p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl my-auto">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
            
            <div className="text-left mt-2">
              <h2 className="text-2xl font-bold text-white mb-2">Resume Design</h2>
              <p className="text-gray-400 text-sm mb-6">Enter details to continue your work.</p>
            </div>
            
            <form onSubmit={handleResumeSubmit} className="space-y-5">
              <div className="text-left">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" required placeholder="example@mail.com" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#FF4D4D] transition-all"
                  value={resumeEmail}
                  onChange={(e) => setResumeEmail(e.target.value)}
                />
              </div>
              <div className="text-left">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Order ID / Code</label>
                <input 
                  type="text" required placeholder="Order ID" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#FF4D4D] uppercase text-center text-xl font-bold"
                  value={resumeCode}
                  onChange={(e) => setResumeCode(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#FF4D4D] to-[#c813ec] py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-[#FF4D4D]/20 transition-all mt-2">
                Verify & Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;