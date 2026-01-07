import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Filter, Eye, Palette } from 'lucide-react';
import AppBackground from '../layouts/AppBackground';
import NavBar from '../components/Navbar';

// --- HELPER COMPONENTS (Aapka Original Design) ---

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

// --- MAIN COMPONENT ---

const BrowseCatalog = () => {
  const navigate = useNavigate();
  
  // States for Filtering
  const [selectedCategories, setSelectedCategories] = useState(['Apparel']);
  const [price, setPrice] = useState(250);
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesList = ['Apparel', 'Tech Accessories', 'Home & Living', 'Drinkware'];

  // Mock Data (In future, this can come from Admin Panel/API)
  const products = [
    { id: 1, title: "Cyber Hoodie X1", price: 45, category: 'Apparel', tag: "Best Seller", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 2, title: "Holo-Tumbler 500", price: 22, category: 'Drinkware', img: "https://images.unsplash.com/photo-1517254456976-ee8682099819?w=400" },
    { id: 3, title: "Prism RGB Mat", price: 35, category: 'Tech Accessories', tag: "New", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400" },
    { id: 4, title: "Gallery Canvas", price: 55, category: 'Home & Living', img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400" },
    { id: 5, title: "Urban Tote Bag", price: 15, category: 'Apparel', img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" },
    { id: 6, title: "Shield Case Pro", price: 28, category: 'Tech Accessories', img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400" },
  ];

  // Logic: Filters products based on UI selections
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = p.price <= price;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedCategories, price, searchQuery]);

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
    setSearchQuery("");
  };

  return (
    <AppBackground showGrid={false}>
      <NavBar />
      
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        {/* Header Content */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-white text-4xl font-bold">Product Catalog</h1>
            <p className="text-gray-400 mt-2">Browse our collection of premium goods.</p>
          </div>
          
          {/* Search Input (Functional) */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#1F2937] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FF4D4D] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTERS (Original Design) */}
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
                  {categoriesList.map((cat) => (
                    <label key={`filter-${cat}`} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)} 
                        onChange={() => toggleCategory(cat)} 
                        className="size-4 rounded border-gray-600 bg-gray-800 text-[#FF4D4D] focus:ring-[#FF4D4D]" 
                      />
                      <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Max Price</h4>
                  <span className="text-[#FF4D4D] text-sm font-bold">${price}</span>
                </div>
                <input 
                  type="range" min="0" max="500" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-[#FF4D4D]" 
                />
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID (Original Design) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                title={p.title} 
                price={p.price} 
                tag={p.tag} 
                img={p.img} 
                onBtnClick={() => navigate('/customize')} 
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                No products found matching your filters.
              </div>
            )}
          </div>
        </div>
      </main>
    </AppBackground>
  );
};

export default BrowseCatalog;