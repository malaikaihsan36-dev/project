import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, ChevronDown, Phone, Mail, Building2, Layers, Box, Sparkles, Factory, BookOpen } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [resumeEmail, setResumeEmail] = useState('');
  const [resumeCode, setResumeCode] = useState('');

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    const cleanCode = resumeCode.replace(/[#\s]/g, '').toUpperCase().trim();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders/resume-design`, { 
        email: resumeEmail.toLowerCase().trim(), 
        code: cleanCode 
      });

      if (response.data.success) {
        setIsModalOpen(false);
        navigate(`/design-review`, { 
          state: { 
            orderId: response.data.orderId, 
            product: response.data.productData 
          } 
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Email or Order ID!");
    }
  };

  const servicesLinks = [
    { name: 'Commercial Offset Printing', path: '/service/offset-printing', desc: 'Heavy press Heidelberg 6-color runs' },
    { name: 'Digital High-Definition', path: '/service/digital-printing', desc: 'Rapid short-run & variable data' },
    { name: 'Specialty UV & Spot UV', path: '/service/uv-printing', desc: 'High-gloss 3D tactile varnish' },
    { name: 'Direct-to-Film (DTF)', path: '/service/dtf-printing', desc: 'Fabric & textile garment prints' },
    { name: 'Product Labels & Stickers', path: '/service/labels', desc: 'Waterproof foil-stamped labels' },
    { name: 'Corporate Catalogues', path: '/service/catalogues', desc: 'Editorial publications & books' }
  ];

  const packagingLinks = [
    { name: 'Luxury Rigid Boxes', path: '/packaging', desc: 'Handcrafted setup boxes with magnetic lids' },
    { name: 'Food & FMCG Cartons', path: '/packaging', desc: 'FDA certified greaseproof barrier boards' },
    { name: 'Cosmetic Beauty Packaging', path: '/packaging', desc: 'Velvet soft-touch embossed cartons' },
    { name: 'Pharmaceutical Packaging', path: '/packaging', desc: 'Tamper-evident cartons with braille' },
    { name: 'E-Commerce Mailers', path: '/packaging', desc: 'Tear-strip high burst corrugated boxes' },
    { name: 'Retail Shopping Bags', path: '/packaging', desc: 'Reinforced paper bags with cotton rope' }
  ];

  const finishesLinks = [
    { name: 'Metallic Hot Foil Stamping', path: '/finishes', desc: 'Gold, silver, rose gold & hologram films' },
    { name: 'Spot UV & 3D Tactile', path: '/finishes', desc: 'Selective glass-like gloss contrast' },
    { name: '3D Embossing & Debossing', path: '/finishes', desc: 'Multi-level relief paper sculpturing' },
    { name: 'Velvet Soft-Touch Film', path: '/finishes', desc: 'Ultra-luxurious anti-scratch texture' },
    { name: 'Automated Die Cutting', path: '/finishes', desc: 'Precision steel rule contour trim' }
  ];

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#050507] border-b border-white/10">
        <div className="max-w-7xl mx-auto py-2.5 px-6 text-xs font-mono tracking-widest text-[#A1A1AA] uppercase flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#2563EB] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse inline-block"></span>
              LCCI REGISTERED MEMBER #1991-PK
            </span>
            <span className="text-white/20">•</span>
            <span>EST. 1991 — 35+ YEARS OF PRINT & PACKAGING MFG</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mx-auto md:mx-0">
            <a href="tel:+923704123327" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>+92 370 4123327</span>
            </a>
            <span className="hidden sm:inline text-white/20">•</span>
            <a href="mailto:colourpix.official@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>colourpix.official@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 left-0 w-full z-[100] bg-[#09090B]/95 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-[#121215] border border-white/15 flex items-center justify-center text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB] to-[#E11D48] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <span className="font-syne font-extrabold text-xl text-white">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-syne text-xl font-bold tracking-tight text-white flex items-center gap-0.5">
                COLOUR<span className="text-[#2563EB]">PIX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] inline-block ml-0.5"></span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#A1A1AA] uppercase">Direct Manufacturer • Est. 1991</span>
            </div>
          </div>

          {/* Desktop Mega Navigation */}
          <div className="hidden xl:flex items-center gap-6 relative">
            <Link 
              to="/" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/about' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              About
            </Link>

            <Link 
              to="/why-colourpix" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/why-colourpix' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Why Us
            </Link>

            <Link 
              to="/trust-center" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/trust-center' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Trust Center
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/services" 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1 ${location.pathname.startsWith('/service') ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Services</span>
                <ChevronDown className="w-3 h-3" />
              </Link>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-80 bg-[#121215] border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2 text-left z-50">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1">
                    MANUFACTURING DIVISIONS
                  </div>
                  {servicesLinks.map(s => (
                    <Link 
                      key={s.path} 
                      to={s.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{s.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{s.desc}</span>
                    </Link>
                  ))}
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-[#A1A1AA] px-3">
                    <span>LCCI MEMBER #1991-PK</span>
                    <span className="w-1 h-1 bg-[#2563EB] rounded-full"></span>
                    <span>100% DIRECT MFG</span>
                  </div>
                </div>
              )}
            </div>

            {/* Packaging Dropdown */}
            <div 
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('packaging')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/packaging" 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1 ${location.pathname === '/packaging' ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Packaging</span>
                <ChevronDown className="w-3 h-3" />
              </Link>

              {activeDropdown === 'packaging' && (
                <div className="absolute top-full left-0 w-80 bg-[#121215] border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2 text-left z-50">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1">
                    BOX & CARTON LINES
                  </div>
                  {packagingLinks.map(p => (
                    <Link 
                      key={p.name} 
                      to={p.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{p.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{p.desc}</span>
                    </Link>
                  ))}
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-[#A1A1AA] px-3">
                    <span>LCCI MEMBER #1991-PK</span>
                    <span className="w-1 h-1 bg-[#2563EB] rounded-full"></span>
                    <span>100% DIRECT MFG</span>
                  </div>
                </div>
              )}
            </div>

            {/* Finishes Dropdown */}
            <div 
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('finishes')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/finishes" 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1 ${location.pathname === '/finishes' ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Finishes</span>
                <ChevronDown className="w-3 h-3" />
              </Link>

              {activeDropdown === 'finishes' && (
                <div className="absolute top-full left-0 w-80 bg-[#121215] border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2 text-left z-50">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1">
                    SURFACE EMBELLISHMENTS
                  </div>
                  {finishesLinks.map(f => (
                    <Link 
                      key={f.name} 
                      to={f.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{f.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{f.desc}</span>
                    </Link>
                  ))}
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-[#A1A1AA] px-3">
                    <span>LCCI MEMBER #1991-PK</span>
                    <span className="w-1 h-1 bg-[#2563EB] rounded-full"></span>
                    <span>100% DIRECT MFG</span>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/industries" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/industries' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Industries
            </Link>

            <Link 
              to="/manufacturing" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/manufacturing' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Plant
            </Link>

            <Link 
              to="/portfolio" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/portfolio' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Portfolio
            </Link>

            <Link 
              to="/resources" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/resources' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Resources
            </Link>

            <Link 
              to="/blog" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/blog' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Blog
            </Link>

            <Link 
              to="/contact" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/contact' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Contact
            </Link>
          </div>

          {/* Action CTAs & Search */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#A1A1AA] hover:text-white transition-colors"
              title="Search Services & Products"
            >
              <Search size={18} />
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-white transition-colors px-3 py-2 border border-white/10 rounded-lg"
            >
              <ShoppingCart size={15} />
              <span>Resume</span>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] inline-block"
            >
              Request Quote
            </button>

            <User 
              className="hidden sm:block text-gray-400 cursor-pointer hover:text-white transition-colors ml-1" 
              size={18} 
              onClick={() => window.open('/admin-login', '_blank')} 
              title="Admin Portal"
            />
            
            <button className="xl:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden bg-[#09090B] p-6 flex flex-col gap-4 border-b border-white/10 text-left">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">About Us</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Services</Link>
            <Link to="/packaging" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Packaging</Link>
            <Link to="/finishes" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Finishes</Link>
            <Link to="/industries" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Industries</Link>
            <Link to="/manufacturing" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Plant</Link>
            <Link to="/portfolio" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Portfolio</Link>
            <Link to="/resources" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Resources</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="text-sm font-mono text-white uppercase">Blog</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-sm font-mono text-[#2563EB] uppercase font-bold pt-2 border-t border-white/10">Contact Us</Link>
          </div>
        )}
      </nav>

      {/* SEARCH MODAL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-md flex items-start justify-center pt-32 p-4">
          <div className="bg-[#121215] border border-white/15 rounded-3xl max-w-2xl w-full p-6 text-left shadow-2xl relative">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold mb-2">QUICK SEARCH</span>
            <input 
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, rigid boxes, foil stamping, paperboard..."
              className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB]"
            />
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-[#A1A1AA]">
              <span>QUICK LINKS:</span>
              <button onClick={() => { navigate('/packaging'); setIsSearchOpen(false); }} className="hover:text-white">#RigidBoxes</button>
              <button onClick={() => { navigate('/finishes'); setIsSearchOpen(false); }} className="hover:text-white">#HotFoil</button>
              <button onClick={() => { navigate('/services'); setIsSearchOpen(false); }} className="hover:text-white">#OffsetPrinting</button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-white/15 rounded-3xl max-w-md w-full p-8 text-left relative shadow-2xl space-y-6">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X size={20} />
            </button>

            <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold">RESUME DESIGN WORKSPACE</span>
            <h3 className="font-syne text-2xl font-extrabold text-white">Track Order / Design</h3>

            <form onSubmit={handleResumeSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-1">Your Email</label>
                <input 
                  type="email" required 
                  value={resumeEmail}
                  onChange={(e) => setResumeEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-xs outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-1">Order ID / Design Code</label>
                <input 
                  type="text" required 
                  value={resumeCode}
                  onChange={(e) => setResumeCode(e.target.value)}
                  placeholder="e.g. CP-9102"
                  className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-xs outline-none focus:border-[#2563EB]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-syne font-bold text-xs uppercase tracking-wider"
              >
                Access Design Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;