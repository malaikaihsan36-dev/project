import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Star, Eye } from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();

  const projects = [
    { id: 1, title: "Tech Startup Hoodie", desc: "Premium cotton blend with high-density screen printing.", category: ["Apparel", "Screen Print"], rating: 5, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600", match: "99.8% Color Match" },
    { id: 2, title: "Artisan Ceramic Mug", desc: "Dishwasher safe, full-wrap sublimation printing.", category: ["Ceramics", "Sublimation"], rating: 5, img: "https://images.unsplash.com/photo-1517254456976-ee8682099819?w=600", match: "Durable Finish" },
    { id: 3, title: "Luxe Business Cards", desc: "Soft-touch matte finish with gold foil stamping.", category: ["Stationery", "Foil"], rating: 5, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600", match: "Premium Foil" },
    { id: 4, title: "Eco Canvas Tote", desc: "Organic cotton tote with water-based ink printing.", category: ["Apparel", "Eco"], rating: 5, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600", match: "Eco-Friendly Ink" },
    { id: 5, title: "Event Banner", desc: "Weather-resistant vinyl banner with reinforced grommets.", category: ["Large Format", "Outdoor"], rating: 4, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600", match: "High Resolution" },
    { id: 6, title: "Custom Packaging", desc: "Branded shipping boxes with internal printing.", category: ["Packaging", "Branding"], rating: 5, img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", match: "Perfect Fit" },
  ];

  return (
    <div className="bg-[#0B0F1E] font-sans text-white overflow-x-hidden min-h-screen flex flex-col relative text-left">
      
      {/* HEADER (Home Design) */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43] tracking-tight">Colour Pix</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Home</button>
                <button onClick={() => navigate('/catalog')} className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Products</button>
                <button onClick={() => navigate('/portfolio')} className="text-white px-3 py-2 text-sm font-medium transition-colors relative">
                  Portfolio
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span>
                </button>
                <button className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Contact</button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
               <button className="flex size-10 items-center justify-center rounded-full bg-[#1F2937] hover:bg-[#FF4D4D] transition-all duration-300"><Search size={18} /></button>
               <button className="flex size-10 items-center justify-center rounded-full bg-[#1F2937] hover:bg-[#FF4D4D] transition-all duration-300"><ShoppingCart size={18} /></button>
               <button className="flex size-10 items-center justify-center rounded-full bg-[#1F2937] hover:bg-[#FF4D4D] transition-all duration-300"><User size={18} /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* BODY */}
      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f302a] via-[#0f1715] to-[#000000] pt-32 pb-0">
        
        {/* Hero */}
        <section className="relative pb-12 px-4 md:px-10 text-center max-w-7xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00ffaa]/5 rounded-full blur-[120px] -z-10"></div>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4">Crafting Your Vision</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">Digital mockups meet stunning reality with pixel-perfect precision.</p>
        </section>

        {/* Sticky Filter Bar */}
        <div className="sticky top-20 z-40 bg-[#0f1715]/95 backdrop-blur-sm border-b border-[#39564c]">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex overflow-x-auto gap-8 no-scrollbar py-4">
            {['All Projects', 'Apparel', 'Mugs & Ceramics', 'Stationery', 'Large Format'].map((tab, i) => (
              <button key={tab} className={`text-sm font-bold whitespace-nowrap ${i===0 ? 'text-white border-b-2 border-[#FF7F50] pb-1' : 'text-[#9abcb0] hover:text-white'}`}>{tab}</button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item) => (
              <div key={item.id} className="group bg-[#1F2937] rounded-lg overflow-hidden border border-[#374151] hover:border-[#FF7F50]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,127,80,0.4)] flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <span className="text-[#00ffaa] text-sm font-medium mb-4">{item.match}</span>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors"><Eye size={20} /></button>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2 text-white">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <div className="flex text-yellow-400 gap-0.5"><Star size={14} fill="currentColor" /></div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="mt-auto flex gap-2">
                    {item.category.map(cat => (
                      <span key={cat} className="px-2 py-1 bg-gray-800 text-gray-300 text-[10px] uppercase font-bold rounded border border-gray-700 tracking-wider">{cat}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIGITAL TO PHYSICAL SECTION */}
        <section className="py-20 bg-[#1F2937]/30 border-t border-[#273a34]">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 w-full relative h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800" className="w-full h-full object-cover" alt="Case Study" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex items-center p-10">
                <div className="max-w-xs text-left">
                  <span className="bg-[#00ffaa] text-black text-[10px] font-black px-3 py-1 rounded-full mb-4 inline-block tracking-widest uppercase">CASE STUDY</span>
                  <h3 className="text-white text-3xl font-bold mb-2">Digital to Physical</h3>
                  <p className="text-gray-300 text-sm">Complex gradient transformation for TechFlow Inc.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-[#101816] p-8 rounded-2xl border border-[#39564c] relative text-left">
              <div className="flex text-yellow-400 mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-white text-xl font-medium italic mb-8 leading-relaxed">"The mockup was 100% accurate to what arrived at our door."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden border-2 border-[#00ffaa]"><img src="https://i.pravatar.cc/150?u=sarah" alt="User" /></div>
                <div><p className="text-white font-bold">Sarah Jenkins</p><p className="text-[#00ffaa] text-sm">Creative Director, TechFlow</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* READY TO PRINT SECTION */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1F2937] to-[#0B0F1E] rounded-3xl p-12 md:p-16 border border-[#39564c] relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to print your masterpiece?</h2>
            <p className="text-[#9abcb0] mb-10 max-w-2xl mx-auto">Guaranteed quality, every time.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/catalog')} className="px-10 py-4 bg-[#00ffaa] hover:bg-[#00e699] text-black font-black rounded-xl transition-all">Start Custom Order</button>
              <button className="px-10 py-4 bg-transparent border border-[#9abcb0] text-white hover:bg-white/5 font-bold rounded-xl transition-all">Request Sample Kit</button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (REWRITTEN TO MATCH HOME EXACTLY) */}
      <footer className="bg-[#0B0F1E] border-t border-white/5 py-12 px-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-lg">C</div>
              <h3 className="font-bold text-lg">COLOUR PIX</h3>
            </div>
            <p className="text-[#9abcb0] text-sm">Precision printing for the modern creator.</p>
          </div>
          
          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Products</h4>
            <ul className="space-y-2 text-[#9abcb0] text-sm">
              <li><button onClick={() => navigate('/catalog')} className="hover:text-[#FF4D4D] transition-colors">Apparel</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Drinkware</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Stationery</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Signage</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-2 text-[#9abcb0] text-sm">
              <li><button className="hover:text-[#FF4D4D] transition-colors">About Us</button></li>
              <li><button onClick={() => navigate('/portfolio')} className="hover:text-[#FF4D4D] transition-colors">Portfolio</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Contact</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Careers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-2 text-[#9abcb0] text-sm">
              <li><button className="hover:text-[#FF4D4D] transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-[#FF4D4D] transition-colors">Shipping Info</button></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 text-center text-[#5c7a6f] text-xs">
          © 2026 Colour Pix Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;