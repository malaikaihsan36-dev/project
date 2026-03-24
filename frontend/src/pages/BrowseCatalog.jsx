import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Palette } from 'lucide-react';
import AppBackground from '../layouts/AppBackground';
import NavBar from '../components/Navbar';

// --- HELPER COMPONENTS ---

const ProductCard = ({ title, tag, img, onBtnClick }) => (
  <div className="group bg-[#111827] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF9F43]/50 transition-all duration-300 flex flex-col h-full">
    <div className="aspect-[4/3] relative overflow-hidden bg-[#1a2333]">
      {tag && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
          {tag}
        </div>
      )}
      <img src={img || `https://picsum.photos/seed/print/400/300`} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button onClick={onBtnClick} className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors">
          <Eye size={20} />
        </button>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1 text-left">
      <h3 className="text-white text-lg font-bold group-hover:text-[#FF9F43] transition-colors">{title}</h3>
      <div className="mt-auto pt-4 flex flex-col gap-3">
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
  
  // Real-time States
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Data from API
  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        setLoading(true);
        // Fetch Products
        const prodRes = await fetch('http://localhost:5000/api/products');
        const prodData = await prodRes.json();
        setProducts(prodData);

        // Fetch Categories for Sidebar
        const catRes = await fetch('http://localhost:5000/api/categories');
        const catData = await catRes.json();
        setCategoriesList(catData);
      } catch (err) {
        console.error("Error fetching catalog data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogData();
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Check if product's category matches selected filters
      // Note: Backend might return category_id or category name, adjust 'p.category_name' accordingly
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category_name || p.category);
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, searchQuery, products]);

  const toggleCategory = (catName) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter(item => item !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  return (
    <AppBackground showGrid={false}>
      <NavBar />
      
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-left">
            <h1 className="text-white text-4xl font-bold">Product Catalog</h1>
            <p className="text-gray-400 mt-2">Browse our collection of premium goods.</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-[#1F2937] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FF4D4D] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* DYNAMIC SIDEBAR FILTERS */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-[#1F2937]/50 backdrop-blur-md rounded-xl p-6 border border-white/5 sticky top-28">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Filter size={18} className="text-[#FF4D4D]" /> Filters
                </h3>
                <button onClick={resetFilters} className="text-xs font-bold text-[#FF9F43] uppercase hover:text-white transition-colors">Reset</button>
              </div>

              <div className="space-y-4">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest text-left">Categories</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                  {categoriesList.length > 0 ? (
                    categoriesList.map((cat) => (
                      <label key={`filter-${cat.id}`} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(cat.name)} 
                          onChange={() => toggleCategory(cat.name)} 
                          className="size-4 rounded border-gray-600 bg-gray-800 text-[#FF4D4D] focus:ring-[#FF4D4D]" 
                        />
                        <span className={`text-sm transition-colors ${selectedCategories.includes(cat.name) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
                          {cat.name}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-600 text-xs italic">Loading categories...</p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* DYNAMIC PRODUCT GRID */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              // Simple Loading Skeleton
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-[#111827] rounded-2xl animate-pulse border border-white/5" />
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
  <ProductCard 
    key={p.id} 
    title={p.name} 
    tag={p.is_popular ? "Popular" : p.tag} 
    img={p.image_url} 
    // State pass karte waqt bhi ensure karein product object sahi ja raha hai
    onBtnClick={() => navigate(`/customize/${p.id}`, { state: { product: p } })} 
  />
))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      </main>
    </AppBackground>
  );
};

export default BrowseCatalog;