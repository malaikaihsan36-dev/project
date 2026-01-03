import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-[#1e293b] bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="px-6 md:px-10 py-4 flex items-center justify-between max-w-[1400px] mx-auto w-full">
        {/* LOGO - Clicking this takes you Home */}
        <div 
          className="flex items-center gap-4 text-white cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="size-8 text-[#38BDF8]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-wider">COLOUR PIX</h2>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link to="/catalog" className="text-white/80 hover:text-[#38BDF8] transition-colors text-sm font-medium">Products</Link>
            <Link to="/customize" className="text-white/80 hover:text-[#38BDF8] transition-colors text-sm font-medium">Design Tool</Link>
            <Link to="/design-review" className="text-white/80 hover:text-[#38BDF8] transition-colors text-sm font-medium">My Orders</Link>
          </div>
          
          {/* ICONS */}
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg size-10 bg-[#1e293b] text-white hover:bg-[#38BDF8] hover:text-black transition-all">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            </button>
            <button className="flex items-center justify-center rounded-lg size-10 bg-[#1e293b] text-white hover:bg-[#38BDF8] hover:text-black transition-all">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;