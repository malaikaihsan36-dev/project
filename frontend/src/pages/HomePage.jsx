import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AppBackground from '../layouts/AppBackground';
import NavBar from '../components/Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for real-time categories

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Products
        const prodRes = await fetch('http://localhost:5000/api/products');
        const prodData = await prodRes.json();
        const popular = prodData.filter(p => p.is_popular === 1 || p.is_popular === true);
        setPopularProducts(popular);

        // Fetch Categories
        const catRes = await fetch('http://localhost:5000/api/categories');
        const catData = await catRes.json();
        setCategories(catData.slice(0, 4)); // Pehli 4 categories dikhane ke liye
      } catch (err) {
        console.error(" Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <AppBackground showGrid={true}>
      <NavBar />

      <div className="text-text-light antialiased overflow-x-hidden selection:bg-primary selection:text-white font-sans min-h-screen relative text-left">
        
        {/* 2. HERO SECTION */}
        <main className="relative pt-32 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 animate-float drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Bring Your Visions to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-white">Life!</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-muted leading-relaxed font-light">
              Premium printing solutions for brands that demand excellence. From labels to packaging, we turn your creative vision into tangible reality.
            </p>
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => navigate('/catalog')}
                className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-red-500/20 hover:scale-105 transition-transform active:scale-95"
              >
                Start Designing Now
              </button>
            </div>
          </div>
        </main>

        {/* 3. QUICK CATEGORY CARDS (Real-time) */}
        <section className="relative z-10 -mt-6 mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              categories.map((cat, i) => (
                <div 
                  key={cat.id} 
                  onClick={() => navigate('/catalog')}
                  className="group relative rounded-2xl bg-[#141A3A]/40 backdrop-blur-sm overflow-hidden h-60 border border-white/5 hover:border-[#FF4D4D]/30 transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <img 
                    src={cat.image_url || `https://picsum.photos/seed/${cat.id}/400/600`} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF9F43] transition-colors">{cat.name}</h3>
                    <div className="h-1 w-12 bg-[#FF4D4D] mx-auto rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            ) : (
              // Fallback cards agar categories load na hon
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-60 rounded-2xl bg-[#141A3A]/40 animate-pulse border border-white/5" />
              ))
            )}
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="py-16 relative border-t border-white/5 font-sans text-left">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      {/* Upper gradient line changed to Orange Glow */}
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent mx-auto mb-8 opacity-60 shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
      
      <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
      <p className="text-[#B8C1EC]">Simple steps to get your perfect print</p>
    </div>
    
    <div className="relative">
      {/* Connecting Line - remains green for contrast, or you can change to orange if you prefer */}
      <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ffaa]/30 to-transparent -translate-y-1/2 z-0"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Step 1 - Orange Glow */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-20 h-20 rounded-2xl bg-[#1F2937] border border-orange-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-300">
            <span className="material-symbols-outlined text-4xl text-orange-400">upload_file</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">1. Choose Material</h3>
          <p className="text-sm text-[#B8C1EC] leading-relaxed">Select from our premium paper stocks and finishes.</p>
        </div>

        {/* Step 2 - Blue Glow */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-20 h-20 rounded-2xl bg-[#1F2937] border border-blue-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300">
            <span className="material-symbols-outlined text-4xl text-blue-400">style</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">2. Design Review</h3>
          <p className="text-sm text-[#B8C1EC] leading-relaxed">Submit your artwork or work with our designers.</p>
        </div>

        {/* Step 3 - Purple Glow */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-20 h-20 rounded-2xl bg-[#1F2937] border border-purple-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300">
            <span className="material-symbols-outlined text-4xl text-purple-400">print_connect</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">3. Printing</h3>
          <p className="text-sm text-[#B8C1EC] leading-relaxed">We use state-of-the-art tech for precise colors.</p>
        </div>

        {/* Step 4 - Green Glow */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-20 h-20 rounded-2xl bg-[#1F2937] border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300">
            <span className="material-symbols-outlined text-4xl text-green-400">local_shipping</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">4. Delivery</h3>
          <p className="text-sm text-[#B8C1EC] leading-relaxed">Fast and secure shipping to your doorstep.</p>
        </div>
        
      </div>
    </div>
  </div>
</section>

        {/* 5. POPULAR PRODUCTS */}
        <section className="py-16 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9F43] to-transparent mx-auto mb-8 opacity-50" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Products</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularProducts.length > 0 ? (
                popularProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    onCardClick={() => navigate(`/customize/${product.id}`)} 
                    title={product.name} 
                    imgUrl={product.image_url} 
                    badge="POPULAR" 
                    desc={product.description} 
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">No popular products found.</p>
              )}
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="py-16 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-8 opacity-50" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard name="John Doe" role="CEO, TechStart" initials="JD" color="from-[#FF4D4D] to-pink-600" text="The quality of the prints exceeded our expectations. Fast turnaround time!" />
              <TestimonialCard name="Sarah Smith" role="Director, Creative Agency" initials="AS" color="from-blue-500 to-teal-500" text="Colour Pix made the entire process seamless. Easy to use system." />
            </div>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="bg-[#050810] border-t border-white/5 pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-sm">C</div>
                  <span className="font-display font-bold text-xl text-white">Colour Pix</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Your trusted partner for premium printing solutions.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><button onClick={() => navigate('/')}>Home</button></li>
                  <li><button onClick={() => navigate('/catalog')}>Products</button></li>
                  <li><button>Portfolio</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-center gap-2">support@colourpix.com</li>
                  <li className="flex items-center gap-2">+1 (555) 123-4567</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
                
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-500">
              © 2026 Colour Pix. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </AppBackground>
  );
};

/* Helper Components */
const ProductCard = ({ title, imgUrl, desc, badge, onCardClick }) => (
  <div onClick={onCardClick} className="rounded-xl overflow-hidden bg-[#141A3A] border border-white/5 hover:shadow-[#FF4D4D]/20 hover:-translate-y-1 transition-all cursor-pointer group">
    <div className="h-64 overflow-hidden relative">
      <img 
        src={imgUrl || `https://picsum.photos/seed/placeholder/600/400`} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
      />
      {badge && <div className="absolute bottom-4 left-4 z-20"><span className="bg-[#FF4D4D]/90 text-white text-xs font-bold px-2 py-1 rounded">{badge}</span></div>}
    </div>
    <div className="p-6 text-left text-white">
      <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{desc}</p>
      <div className="flex items-center justify-end mt-4">
        <span className="text-[#FF9F43] flex items-center gap-1 text-sm font-semibold">View Details</span>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, initials, color, text }) => (
  <div className="bg-[#141A3A] border border-white/5 p-8 rounded-2xl relative text-left">
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white font-bold`}>{initials}</div>
      <div>
        <h4 className="text-white font-semibold">{name}</h4>
        <p className="text-gray-400 text-xs">{role}</p>
      </div>
    </div>
    <p className="text-gray-400 italic">"{text}"</p>
  </div>
);

export default HomePage;