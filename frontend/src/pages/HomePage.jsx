import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import AppBackground from '../layouts/AppBackground';
import NavBar from '../components/Navbar';
// Optimized image helper import kiya
import { getOptimizedImage } from '../components/imageHelper';

const HomePage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://melodious-enchantment-production-cdb6.up.railway.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Direct safe connection strings bina kisi variable ke
        const prodRes = await fetch('${API_BASE_URL}/api/products');
        const prodData = await prodRes.json();
        // Popular products filter (1 for true in MySQL)
        const popular = prodData.filter(p => p.is_popular === 1 || p.is_popular === true);
        setPopularProducts(popular);

        const catRes = await fetch('${API_BASE_URL}/api/categories');
        const catData = await catRes.json();
        setCategories(catData);
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
        
        {/* HERO SECTION */}
        <main className="relative pt-32 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 animate-float drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Bring Your Visions to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-white">Life!</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-muted leading-relaxed font-light">
              Premium printing solutions for brands that demand excellence. From labels to packaging, we turn your creative vision into tangible reality.
            </p>
            <div className="mt-10 flex justify-center">
              <Link 
                to="/catalog"
                className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-red-500/20 hover:scale-105 transition-transform active:scale-95 inline-block"
              >
                Start Designing Now
              </Link>
            </div>
          </div>
        </main>

        {/* QUICK CATEGORY CARDS */}
        <section className="relative z-10 -mt-6 mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                  className="group relative rounded-2xl bg-[#141A3A]/40 backdrop-blur-sm overflow-hidden h-60 border border-white/5 hover:border-[#FF4D4D]/30 transition-all hover:-translate-y-2 block"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  {/* Category Image: Optimized for 500px width as it's a small card */}
                  <img 
                    src={getOptimizedImage(cat.image_url, 500) || `https://picsum.photos/seed/${cat.id}/400/600`} 
                    alt={cat.name} 
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF9F43] transition-colors">{cat.name}</h3>
                    <div className="h-1 w-12 bg-[#FF4D4D] mx-auto rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-60 rounded-2xl bg-[#141A3A]/40 animate-pulse border border-white/5" />
              ))
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-2 relative border-t border-white/5 font-sans text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent mx-auto mb-8 opacity-60 shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-[#B8C1EC]">Simple steps to get your perfect print</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              <HowItWorksStep icon="upload_file" color="orange" step="1. Choose Material" desc="Select from our premium paper stocks and finishes." />
              <HowItWorksStep icon="style" color="blue" step="2. Design Review" desc="Submit your artwork or work with our designers." />
              <HowItWorksStep icon="print_connect" color="purple" step="3. Printing" desc="We use state-of-the-art tech for precise colors." />
              <HowItWorksStep icon="local_shipping" color="green" step="4. Delivery" desc="Fast and secure shipping to your doorstep." />
            </div>
          </div>
        </section>

        {/* POPULAR PRODUCTS */}
        <section className="py-20 relative border-t border-white/5">
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
                    to={`/customize/${product.id}`}
                    title={product.name} 
                    // Product Image: Optimized for 600px width
                    imgUrl={getOptimizedImage(product.image_url, 600)} 
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

        {/* TESTIMONIALS */}
        <section className="py-2 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
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

        {/* FOOTER */}
        <footer className="bg-[#050810] border-t border-white/5 pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-sm">C</div>
                  <span className="font-display font-bold text-xl text-white">Colour Pix</span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">Your trusted partner for premium printing solutions.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/catalog" className="hover:text-white transition-colors">Products</Link></li>
                  <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>colourpix.official@gmail.com</li>
                  <li>colourpix.socials@gmail.com</li>
                  <li>+92 370 4123327</li>
                  <li>+92 301 0144611</li>
                </ul>
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
const ProductCard = ({ title, imgUrl, desc, badge, to }) => (
  <Link to={to} className="rounded-xl overflow-hidden bg-[#141A3A] border border-white/5 hover:shadow-[#FF4D4D]/20 hover:-translate-y-1 transition-all block group">
    <div className="h-64 overflow-hidden relative">
      <img 
        src={imgUrl || `https://picsum.photos/seed/placeholder/600/400`} 
        alt={title} 
        loading="lazy"
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
  </Link>
);

const HowItWorksStep = ({ icon, color, step, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className={`w-20 h-20 rounded-2xl bg-[#1F2937] border border-${color}-500/20 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300`}>
      <span className={`material-symbols-outlined text-4xl text-${color}-400`}>{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{step}</h3>
    <p className="text-sm text-[#B8C1EC] leading-relaxed">{desc}</p>
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