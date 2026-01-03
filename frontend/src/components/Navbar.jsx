import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO - Clicking takes you to HomePage */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
            <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43] tracking-tight">Colour Pix</span>
          </div>

          {/* NAV LINKS - Updated with React Router Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-text-muted hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/catalog" className="text-text-muted hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/design-review" className="text-text-muted hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                My Orders
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="hidden md:block">
            <button 
              onClick={() => navigate('/catalog')}
              className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide shadow-[0_4px_15px_rgba(255,77,77,0.4)] hover:shadow-[0_0_25px_rgba(255,77,77,0.7)] transition-all active:scale-95"
            >
              Start Designing
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;