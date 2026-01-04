import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Palette } from 'lucide-react';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/catalog' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Support', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#0B0F1E]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
            <Palette size={24} />
          </div>
          <span className="text-xl font-bold text-white">Colour Pix</span>
        </div>

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

        <div className="flex items-center gap-4">
          <ShoppingCart className="text-gray-400 cursor-pointer hover:text-white" size={20} />
          <User className="hidden sm:block text-gray-400 cursor-pointer hover:text-white" size={20} />
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
  );
};

export default NavBar;