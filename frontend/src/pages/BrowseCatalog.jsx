import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search, Filter, Eye, Palette } from 'lucide-react';
import AppBackground from '../layouts/AppBackground';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { getOptimizedImage } from '../components/imageHelper';

// --- HELPER COMPONENTS ---

const ProductCard = ({ title, tag, img, id }) => (
  <Link 
    to={`/customize/${id}`} 
    className="group bg-[#121215] rounded-3xl overflow-hidden border border-white/10 hover:border-[#2563EB] transition-all duration-500 flex flex-col h-full block shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-1"
  >
    <div className="aspect-[4/3] relative overflow-hidden bg-[#18181b]">
      {tag && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#2563EB] to-[#E11D48] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {tag}
        </div>
      )}
      <img 
        src={img ? getOptimizedImage(img, 400) : `https://picsum.photos/seed/print/400/300`} 
        alt={title} 
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110 brightness-95" 
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-[#121215]/80 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors">
          <Eye size={18} />
        </div>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1 text-left justify-between space-y-4">
      <h3 className="font-syne text-lg font-bold text-white group-hover:text-[#2563EB] transition-colors">{title}</h3>
      <div className="mt-auto pt-2">
        <div className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2">
          <Palette size={14} /> <span>Customize Options</span>
        </div>
      </div>
    </div>
  </Link>
);

// --- MAIN COMPONENT ---

const BrowseCatalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';

  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        setLoading(true);
        const prodRes = await fetch(`${API_BASE_URL}/api/products`);
        const prodData = await prodRes.json();
        setProducts(prodData);

        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        const catData = await catRes.json();
        setCategoriesList(catData);

        const queryParams = new URLSearchParams(location.search);
        const categoryFromUrl = queryParams.get('category');

        if (categoryFromUrl) {
          setSelectedCategories([categoryFromUrl]);
        } 
        else if (location.state && location.state.filterCategory) {
          setSelectedCategories([location.state.filterCategory]);
        }
      } catch (err) {
        console.error("Error fetching catalog data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogData();
  }, [location.search, location.state]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const pCat = p.category_name || p.category;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(pCat);
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
    navigate('/catalog', { replace: true });
  };

  return (
    <AppBackground showGrid={false}>
      <NavBar />
      
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-2 block">
              COLOURPIX INDUSTRIAL CATALOG
            </span>
            <h1 className="font-syne text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">Interactive Catalog</h1>
            <p className="text-[#A1A1AA] text-sm mt-1">Browse our collection of premium custom goods.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-[#121215] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-[#121215]/80 backdrop-blur-md rounded-3xl p-8 border border-white/10 sticky top-28 text-left shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="text-white font-syne font-bold flex items-center gap-2">
                  <Filter size={16} className="text-[#2563EB]" /> Filters
                </h3>
                <button 
                  onClick={resetFilters} 
                  className="text-[10px] font-mono font-bold text-[#E11D48] uppercase hover:text-white transition-colors"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-4 text-left">
                <h4 className="text-gray-400 text-[10px] font-mono font-bold uppercase tracking-widest">Categories</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                  {categoriesList.length > 0 ? (
                    categoriesList.map((cat) => (
                      <label key={`filter-${cat.id}`} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(cat.name)} 
                          onChange={() => toggleCategory(cat.name)} 
                          className="size-4 rounded border-white/10 bg-[#09090B] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-[#121215]" 
                        />
                        <span className={`text-xs font-mono transition-colors ${selectedCategories.includes(cat.name) ? 'text-[#2563EB] font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>
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

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-[#121215] rounded-3xl animate-pulse border border-white/10" />
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  id={p.id}
                  title={p.name} 
                  tag={p.is_popular ? "Popular" : p.tag} 
                  img={p.image_url} 
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-mono text-xs">
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </AppBackground>
  );
};

export default BrowseCatalog;