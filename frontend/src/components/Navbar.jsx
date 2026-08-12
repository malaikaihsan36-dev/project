import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const companyLinks = [
    { name: 'About Us', path: '/about', desc: 'Direct manufacturer chronology & scale' },
    { name: 'Why ColourPix', path: '/why-colourpix', desc: 'Quality assurance, materials & factory rates' },
    { name: 'Plant Tour', path: '/manufacturing', desc: 'Production floor & heavy machinery roster' },
    { name: 'Trust Center', path: '/trust-center', desc: 'Standard operating compliance & credentials' }
  ];

  const capabilitiesLinks = [
    { name: 'Printing Services', path: '/services', desc: 'Commercial offset, UV, & digital press runs' },
    { name: 'Packaging Solutions', path: '/packaging', desc: 'Luxury rigid setup, food, and corrugated cartons' },
    { name: 'Premium Finishes', path: '/finishes', desc: 'Hot foil stamp, raised spot UV, velvet wraps' }
  ];

  const workLinks = [
    { name: 'Industries Served', path: '/industries', desc: 'FMCG, beauty, pharma, e-commerce supply lines' },
    { name: 'Production Portfolio', path: '/portfolio', desc: 'Audit verified case studies & custom runs' }
  ];

  const resourcesLinks = [
    { name: 'Knowledge Center', path: '/knowledge-center', desc: 'Corporate brochures, guides & documentation' },
    { name: 'Industrial Blog', path: '/blog', desc: 'Pre-press updates, paperboard trends & print news' }
  ];

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#050507] border-b border-white/10 h-8 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#2563EB] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block"></span>
              LCCI REGISTERED MEMBER #1991-PK
            </span>
            <span className="text-white/20">•</span>
            <span>EST. 1991 — 35+ YEARS OF MFG</span>
          </div>

          <div className="flex items-center gap-4 mx-auto md:mx-0">
            <a href="tel:+923704123327" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#2563EB]" />
              <span>+92 370 4123327</span>
            </a>
            <span className="text-white/20">•</span>
            <a href="mailto:colourpix.official@gmail.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#E11D48]" />
              <span>colourpix.official@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className={`sticky top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#09090B]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]' : 'bg-[#09090B]/80 backdrop-blur-md border-b border-white/5 shadow-none'}`}>
        <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-[#121215] border border-white/15 flex items-center justify-center text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB] to-[#E11D48] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <span className="font-syne font-extrabold text-lg text-white">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-syne text-lg font-bold tracking-tight text-white flex items-center gap-0.5 leading-none">
                COLOUR<span className="text-[#2563EB]">PIX</span>
                <span className="w-1.2 h-1.2 rounded-full bg-[#E11D48] inline-block ml-0.5 animate-pulse"></span>
              </span>
              <span className="text-[8px] font-mono tracking-widest text-[#A1A1AA] uppercase mt-0.5 leading-none">Direct Manufacturer • Est. 1991</span>
            </div>
          </div>

          {/* Desktop Mega Navigation */}
          <div className="hidden xl:flex items-center gap-7 relative select-none whitespace-nowrap flex-row flex-nowrap">
            <Link 
              to="/" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${location.pathname === '/' ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Home
            </Link>

            {/* Company Dropdown */}
            <div 
              className="relative py-6 group"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1.5 outline-none ${['/about', '/why-colourpix', '/manufacturing', '/trust-center'].includes(location.pathname) ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Company</span>
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {activeDropdown === 'company' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-1 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1 mb-1">
                    Corporate Registry
                  </div>
                  {companyLinks.map(c => (
                    <Link 
                      key={c.path} 
                      to={c.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{c.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{c.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Capabilities Dropdown */}
            <div 
              className="relative py-6 group"
              onMouseEnter={() => setActiveDropdown('capabilities')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1.5 outline-none ${['/services', '/packaging', '/finishes'].includes(location.pathname) || location.pathname.startsWith('/service') ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Capabilities</span>
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {activeDropdown === 'capabilities' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-1 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1 mb-1">
                    What We Do
                  </div>
                  {capabilitiesLinks.map(c => (
                    <Link 
                      key={c.path} 
                      to={c.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{c.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{c.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Work Dropdown */}
            <div 
              className="relative py-6 group"
              onMouseEnter={() => setActiveDropdown('work')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1.5 outline-none ${['/industries', '/portfolio'].includes(location.pathname) ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Work</span>
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {activeDropdown === 'work' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-1 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1 mb-1">
                    Proven Impact
                  </div>
                  {workLinks.map(w => (
                    <Link 
                      key={w.path} 
                      to={w.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{w.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{w.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative py-6 group"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`text-xs font-mono uppercase tracking-wider py-2 transition-all flex items-center gap-1.5 outline-none ${['/knowledge-center', '/blog', '/resources'].includes(location.pathname) ? 'text-[#2563EB] font-bold' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                <span>Resources</span>
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-1 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-mono text-[#2563EB] uppercase font-bold px-3 py-1 mb-1">
                    Industry Library
                  </div>
                  {resourcesLinks.map(r => (
                    <Link 
                      key={r.path} 
                      to={r.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 rounded-xl hover:bg-[#1C1C21] transition-colors group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-[#2563EB] block">{r.name}</span>
                      <span className="text-[10px] text-[#A1A1AA] block">{r.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Utility Links */}
            <Link 
              to="/estimator" 
              className={`text-xs font-mono uppercase tracking-wider py-2 transition-all ${['/estimator', '/cost-estimator'].includes(location.pathname) ? 'text-[#2563EB] font-bold border-b-2 border-[#2563EB]' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Estimator
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
              className="p-3 text-[#A1A1AA] hover:text-white transition-colors"
              title="Search Services & Products"
            >
              <Search size={18} />
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden xl:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-white transition-colors px-3 py-2 border border-white/10 rounded-lg"
            >
              <ShoppingCart size={15} />
              <span>Resume</span>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] inline-block"
            >
              Request Quote
            </button>

            <User 
              className="hidden sm:block text-gray-400 cursor-pointer hover:text-white transition-colors ml-1" 
              size={18} 
              onClick={() => window.open('/admin-login', '_blank')} 
              title="Admin Portal"
            />
            
            <button className="xl:hidden text-white p-3 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="xl:hidden bg-[#09090B] border-b border-white/10 text-left p-6 max-h-[80vh] overflow-y-auto space-y-6">
            {/* Company Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold tracking-wider">Company</span>
              <div className="grid grid-cols-2 gap-3">
                {companyLinks.map(c => (
                  <Link 
                    key={c.path} 
                    to={c.path} 
                    onClick={() => setIsOpen(false)} 
                    className="text-xs font-mono text-white uppercase py-3.5 px-2 rounded-xl bg-[#121215] border border-white/10 hover:text-[#2563EB] hover:bg-white/5 transition-colors block text-center truncate"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Capabilities Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold tracking-wider">Capabilities</span>
              <div className="grid grid-cols-2 gap-3">
                {capabilitiesLinks.map(c => (
                  <Link 
                    key={c.path} 
                    to={c.path} 
                    onClick={() => setIsOpen(false)} 
                    className="text-xs font-mono text-white uppercase py-3.5 px-2 rounded-xl bg-[#121215] border border-white/10 hover:text-[#2563EB] hover:bg-white/5 transition-colors block text-center truncate"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Work Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold tracking-wider">Work & Industries</span>
              <div className="grid grid-cols-2 gap-3">
                {workLinks.map(w => (
                  <Link 
                    key={w.path} 
                    to={w.path} 
                    onClick={() => setIsOpen(false)} 
                    className="text-xs font-mono text-white uppercase py-3.5 px-2 rounded-xl bg-[#121215] border border-white/10 hover:text-[#2563EB] hover:bg-white/5 transition-colors block text-center truncate"
                  >
                    {w.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold tracking-wider">Resources</span>
              <div className="grid grid-cols-2 gap-3">
                {resourcesLinks.map(r => (
                  <Link 
                    key={r.path} 
                    to={r.path} 
                    onClick={() => setIsOpen(false)} 
                    className="text-xs font-mono text-white uppercase py-3.5 px-2 rounded-xl bg-[#121215] border border-white/10 hover:text-[#2563EB] hover:bg-white/5 transition-colors block text-center truncate"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Utility Links */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link 
                to="/estimator" 
                onClick={() => setIsOpen(false)} 
                className="text-sm font-mono text-white uppercase font-bold py-3.5 px-4 rounded-xl bg-[#121215] border border-white/10 block text-center"
              >
                Estimator
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)} 
                className="text-sm font-mono text-white uppercase font-bold py-3.5 px-4 rounded-xl bg-[#2563EB] block text-center"
              >
                Contact Us
              </Link>
            </div>
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