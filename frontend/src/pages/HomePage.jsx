import React from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation ke liye import

const HomePage = () => {
  const navigate = useNavigate(); // Navigation function initialize kiya

  return (
    <div className="bg-background-dark text-text-light antialiased overflow-x-hidden selection:bg-primary selection:text-white font-sans min-h-screen relative text-left">
      {/* Background Glow Effect (No Change) */}
      <div className="fixed inset-0 z-[-1] bg-[#0B0F1E] bg-[radial-gradient(circle_at_15%_20%,rgba(108,99,255,0.35)_0%,transparent_45%),radial-gradient(circle_at_85%_25%,rgba(255,77,109,0.3)_0%,transparent_45%),radial-gradient(circle_at_5%_75%,rgba(255,159,67,0.25)_0%,transparent_40%),radial-gradient(circle_at_90%_85%,rgba(108,99,255,0.3)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(255,77,109,0.15)_0%,transparent_55%),radial-gradient(circle_at_35%_90%,rgba(255,159,67,0.2)_0%,transparent_35%)] bg-no-repeat bg-fixed" />

      {/* 1. NAVIGATION (Functional Links added) */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background-dark/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo: Click karne se refresh ya Home par aayega */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43] tracking-tight">Colour Pix</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => navigate('/')} className="text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group">
                  Home
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span>
                </button>
                {/* Products Link connected to Catalog */}
                <button onClick={() => navigate('/catalog')} className="text-text-muted hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group">
                  Products
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
                {['Portfolio', 'Reviews', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-text-muted hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group">
                    {item}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <button onClick={() => navigate('/catalog')} className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide shadow-[0_4px_15px_rgba(255,77,77,0.4)] hover:shadow-[0_0_25px_rgba(255,77,77,0.7)] transition-all active:scale-95">
                Start Designing
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <main className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 animate-float drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Bring Your Visions to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-white">Life!</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-muted leading-relaxed font-light">
            Premium printing solutions for brands that demand excellence. From labels to packaging, we turn your creative vision into tangible reality.
          </p>
          <div className="mt-10 flex justify-center">
            {/* HERO BUTTON: Catalog par bhejega */}
            <button 
              onClick={() => navigate('/catalog')}
              className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-red-500/20 animate-pulse-glow hover:scale-105 transition-transform active:scale-95"
            >
              Start Designing Now
            </button>
          </div>
        </div>
      </main>

      {/* 3. QUICK CATEGORY CARDS (No design change) */}
      <section className="relative z-10 -mt-10 mb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Labels', 'Flyers', 'Packaging', 'Cards'].map((cat, i) => (
            <div 
              key={cat} 
              onClick={() => navigate('/catalog')}
              className="group relative rounded-2xl bg-[#141A3A]/40 backdrop-blur-sm overflow-hidden h-64 border border-white/5 hover:border-[#FF4D4D]/30 transition-all hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <img src={`https://picsum.photos/seed/print${i}/400/600`} alt={cat} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
                <h3 className="text-xl font-bold text-white group-hover:text-[#FF9F43] transition-colors">{cat}</h3>
                <div className="h-1 w-12 bg-[#FF4D4D] mx-auto rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR PRODUCTS (Using helper component below) */}
      <section className="py-20 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9F43] to-transparent mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard onCardClick={() => navigate('/catalog')} title="Premium Business Cards" price="29.99" imgId="7" badge="BEST SELLER" desc="High-quality cardstock with various finishes like matte, gloss, and spot UV." />
            <ProductCard onCardClick={() => navigate('/catalog')} title="Custom Packaging" price="99.00" imgId="8" desc="Durable and stylish boxes to elevate your brand's unboxing experience." />
            <ProductCard onCardClick={() => navigate('/catalog')} title="Promotional Stickers" price="15.50" imgId="9" desc="Vinyl stickers cut to any shape, perfect for giveaways and branding." />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & 6. FOOTER (Design untouched, navigation added to footer links) */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard name="John Doe" role="CEO, TechStart" initials="JD" color="from-[#FF4D4D] to-pink-600" text="The quality of the prints exceeded our expectations. The colors were vibrant and the turnaround time was incredibly fast." />
            <TestimonialCard name="Sarah Smith" role="Director, Creative Agency" initials="AS" color="from-blue-500 to-teal-500" text="Colour Pix made the entire process seamless. The online quote system is easy to use." />
          </div>
        </div>
      </section>

      <footer className="bg-[#050810] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-sm">C</div>
                <span className="font-display font-bold text-xl text-white">Colour Pix</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">Your trusted partner for premium printing solutions. Bringing colors to life since 2010.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><button onClick={() => navigate('/')} className="hover:text-[#FF4D4D]">Home</button></li>
                <li><button onClick={() => navigate('/catalog')} className="hover:text-[#FF4D4D]">Products</button></li>
                <li><button className="hover:text-[#FF4D4D]">Portfolio</button></li>
                <li><button className="hover:text-[#FF4D4D]">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-center gap-2"><span className="material-icons text-base text-[#FF4D4D]">email</span>support@colourpix.com</li>
                <li className="flex items-center gap-2"><span className="material-icons text-base text-[#FF4D4D]">phone</span>+1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
              <div className="flex space-x-4 mb-6">
                <SocialIcon icon="chat" color="text-green-400" />
                <SocialIcon icon="mail" color="text-blue-400" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
            <p>© 2023 Colour Pix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Helper Components (No change to logic, just props for navigation) */
const ProductCard = ({ title, price, imgId, desc, badge, onCardClick }) => (
  <div onClick={onCardClick} className="rounded-xl overflow-hidden bg-[#141A3A] border border-white/5 hover:shadow-[#FF4D4D]/20 hover:-translate-y-1 transition-all cursor-pointer group">
    <div className="h-64 overflow-hidden relative">
      <img src={`https://picsum.photos/seed/${imgId}/600/400`} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      {badge && <div className="absolute bottom-4 left-4 z-20"><span className="bg-[#FF4D4D]/90 text-white text-xs font-bold px-2 py-1 rounded">{badge}</span></div>}
    </div>
    <div className="p-6 text-left">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-text-muted text-sm mb-4">{desc}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-white font-medium">From ${price}</span>
        <span className="text-[#FF9F43] hover:text-white transition-colors flex items-center gap-1 text-sm font-semibold">
          View Details <span className="material-icons text-sm">arrow_forward</span>
        </span>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, initials, color, text }) => (
  <div className="bg-[#141A3A] border border-white/5 p-8 rounded-2xl relative text-left">
    <span className="material-icons absolute top-6 right-6 text-4xl text-white/10">format_quote</span>
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white font-bold`}>{initials}</div>
      <div>
        <h4 className="text-white font-semibold">{name}</h4>
        <p className="text-text-muted text-xs">{role}</p>
      </div>
    </div>
    <p className="text-text-muted italic">"{text}"</p>
  </div>
);

const SocialIcon = ({ icon, color }) => (
  <a href="#s" className="w-10 h-10 rounded-full bg-[#141A3A] flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 group">
    <span className={`material-icons ${color} group-hover:text-white`}>{icon}</span>
  </a>
);

export default HomePage;