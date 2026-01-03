import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Filter, Eye, Palette } from 'lucide-react';

const BrowseCatalog = () => {
  const navigate = useNavigate();
  
  // States for filters (Original logic)
  const [selectedCategories, setSelectedCategories] = useState(['Apparel']);
  const [price, setPrice] = useState(250);

  const categories = ['Apparel', 'Tech Accessories', 'Home & Living', 'Drinkware'];

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(item => item !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPrice(250);
  };

  return (
    <div className="bg-[#0B0F1E] font-sans text-white overflow-x-hidden min-h-screen flex flex-col relative selection:bg-orange-500 text-left">
      {/* Background Glows (Original Catalog Page Glows) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF4D6D] rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#FF9F43] rounded-full blur-[130px] opacity-10"></div>
      </div>

      {/* 1. NEW HEADER (Exact Copy of HomePage Layout & Color) */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo from Home */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43] tracking-tight">Colour Pix</span>
            </div>
            
            {/* Nav from Home */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => navigate('/')} className="text-text-muted hover:text-white px-3 py-2 text-sm font-medium transition-colors">Home</button>
                <button onClick={() => navigate('/catalog')} className="text-white px-3 py-2 text-sm font-medium transition-colors relative">
                  Products
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span>
                </button>
                <button className="text-text-muted hover:text-white px-3 py-2 text-sm font-medium transition-colors">Portfolio</button>
                <button className="text-text-muted hover:text-white px-3 py-2 text-sm font-medium transition-colors">Contact</button>
              </div>
            </div>

            {/* Icons from Catalog merged into Home design style */}
            <div className="flex items-center gap-4">
               <HeaderIconButton Icon={Search} className="hidden sm:flex" />
               <HeaderIconButton Icon={ShoppingCart} />
               <HeaderIconButton Icon={User} />
            </div>
          </div>
        </div>
      </nav>

      {/* 2. CATALOG BODY (Original Body - Colors preserved) */}
      <main className="relative z-10 flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold">Product Catalog</h1>
          <p className="text-gray-400 mt-2">Browse our collection of premium goods.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTERS (Original Grey #1F2937 Color) */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-[#1F2937]/50 backdrop-blur-md rounded-xl p-6 border border-white/5 sticky top-28">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Filter size={18} className="text-[#FF4D4D]" /> Filters
                </h3>
                <button onClick={resetFilters} className="text-xs font-bold text-[#FF9F43] uppercase hover:text-white transition-colors">Reset</button>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="size-4 rounded border-gray-600 bg-gray-800 text-[#FF4D4D] focus:ring-[#FF4D4D]" />
                      <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Max Price: ${price}</h4>
                <input type="range" min="0" max="500" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-[#FF4D4D]" />
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID (Original Dark #111827 Cards & Emerald Button) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard title="Cyber Hoodie X1" price="45.00" tag="Best Seller" img="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" onBtnClick={() => navigate('/customize')} />
            <ProductCard title="Holo-Tumbler 500" price="22.00" img="https://images.unsplash.com/photo-1517254456976-ee8682099819?w=400" onBtnClick={() => navigate('/customize')} />
            <ProductCard title="Prism RGB Mat" price="35.00" tag="New" img="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400" onBtnClick={() => navigate('/customize')} />
            <ProductCard title="Gallery Canvas" price="55.00" img="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400" onBtnClick={() => navigate('/customize')} />
            <ProductCard title="Urban Tote" price="15.00" img="https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" onBtnClick={() => navigate('/customize')} />
            <ProductCard title="Shield Case Pro" price="28.00" img="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400" onBtnClick={() => navigate('/customize')} />
          </div>
        </div>
      </main>
    </div>
  );
};

/* Helper Components - (Original Design Kept Exactly) */
const HeaderIconButton = ({ Icon, className = "" }) => (
  <button className={`flex size-10 items-center justify-center rounded-full bg-[#1F2937] text-white hover:bg-[#FF4D4D] transition-all duration-300 ${className}`}>
    <Icon size={18} />
  </button>
);

const ProductCard = ({ title, price, tag, img, onBtnClick }) => (
  <div className="group bg-[#111827] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF9F43]/50 transition-all duration-300 flex flex-col h-full">
    <div className="aspect-[4/3] relative overflow-hidden bg-[#1a2333]">
      {tag && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
          {tag}
        </div>
      )}
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors">
          <Eye size={20} />
        </button>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-white text-lg font-bold group-hover:text-[#FF9F43] transition-colors">{title}</h3>
      <div className="mt-auto pt-4 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Starting at</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-xl font-bold">${price}</span>
        </div>
        {/* Original Emerald Button Color */}
        <button 
          onClick={onBtnClick}
          className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-[#00ffaa] text-black font-bold text-xs uppercase tracking-wide hover:shadow-[0_0_15px_rgba(0,255,170,0.5)] transition-all flex items-center justify-center gap-2"
        >
          <Palette size={14} /> Customize
        </button>
      </div>
    </div>
  </div>
);

export default BrowseCatalog;