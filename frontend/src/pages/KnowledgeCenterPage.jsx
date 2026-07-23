import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Search, 
  Filter, 
  FileText, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  Sparkles,
  ArrowUpRight,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import AppBackground from '../layouts/AppBackground';
import { downloadBrochure } from '../components/pdfHelper';
import { getOptimizedImage } from '../components/imageHelper';
import { ScrollReveal, useMagnetic } from '../components/animationHelper';

// --- DATA LAYER ---
const PUBLICATIONS_DATA = [
  {
    id: "cp-mag-01",
    title: "ColourPix Magazine - Issue #01",
    desc: "A deep dive into 2026 luxury rigid packaging trends, Heidelberg offset press calibrations, and sustainability metrics in pharmaceutical folding cartons.",
    category: "Magazine",
    pages: 64,
    fileSize: "8.5 MB",
    lastUpdated: "July 2026",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    downloadName: "Company Profile", 
    keywords: ["magazine", "trends", "rigid box", "heidelberg", "offset"]
  },
  {
    id: "company-profile",
    title: "Company Profile & Plant Roster",
    desc: "Official corporate handbook detailing our 35-year manufacturing chronology, Lahore facility layout, and list of production equipment.",
    category: "Corporate",
    pages: 18,
    fileSize: "4.2 MB",
    lastUpdated: "June 2026",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
    downloadName: "Company Profile",
    keywords: ["profile", "lcci", "lahore", "factory", "machinery"]
  },
  {
    id: "why-colourpix",
    title: "Why ColourPix Capabilities Brochure",
    desc: "Detailed spec guide highlighting our AQL 1.0 zero-defect quality control standards and vertically integrated manufacturing pipeline.",
    category: "Brochure",
    pages: 12,
    fileSize: "2.8 MB",
    lastUpdated: "May 2026",
    image: "https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=800&auto=format&fit=crop",
    downloadName: "Why ColourPix",
    keywords: ["why us", "capabilities", "trust", "accreditation"]
  },
  {
    id: "printing-solutions",
    title: "Commercial Printing Solutions Catalog",
    desc: "High-resolution product specification sheets for commercial brochures, catalog binding, book prints, and variable digital runs.",
    category: "Catalogue",
    pages: 32,
    fileSize: "6.1 MB",
    lastUpdated: "April 2026",
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800&auto=format&fit=crop",
    downloadName: "Printing Solutions",
    keywords: ["catalog", "printing", "offset", "books", "labels"]
  },
  {
    id: "packaging-solutions",
    title: "Custom Packaging Substrates Guide",
    desc: "Design specifications, structural diagrams, and paperboard grade matrices (GSM density ranges) for luxury rigid folding boxes.",
    category: "Guide",
    pages: 24,
    fileSize: "5.4 MB",
    lastUpdated: "March 2026",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
    downloadName: "Packaging Solutions",
    keywords: ["packaging", "rigid box", "duplex board", "kraft", "cartons"]
  },
  {
    id: "premium-finishes",
    title: "Tactile Embellishments & Premium Finishes Spec",
    desc: "Swiss hot foil stamping guidelines, 3D spot UV heights, matte gloss film laminations.",
    category: "Guide",
    pages: 16,
    fileSize: "3.7 MB",
    lastUpdated: "February 2026",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    downloadName: "Premium Finishes",
    keywords: ["finishes", "foil", "uv", "embossing", "die cutting"]
  }
];

const KnowledgeCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Magnetic CTAs setup
  const magReadRef = useMagnetic(0.15);
  const magBrowseRef = useMagnetic(0.15);

  useEffect(() => {
    document.title = "Knowledge Center & Digital Library | ColourPix";
    window.scrollTo(0, 0);
  }, []);

  // Filter Categories list
  const categoriesList = ['ALL', 'Featured Publications', 'Corporate Documents', 'Catalogues', 'Industry Guides', 'Resources'];

  // Map user categories list to card labels
  const getCategoryMatch = (tabName, cardCat) => {
    if (tabName === 'ALL') return true;
    if (tabName === 'Featured Publications' && cardCat === 'Magazine') return true;
    if (tabName === 'Corporate Documents' && cardCat === 'Corporate') return true;
    if (tabName === 'Catalogues' && cardCat === 'Catalogue') return true;
    if (tabName === 'Industry Guides' && cardCat === 'Guide') return true;
    if (tabName === 'Resources' && (cardCat === 'Brochure' || cardCat === 'Guide')) return true;
    return false;
  };

  // Search and filter memo
  const filteredResources = useMemo(() => {
    return PUBLICATIONS_DATA.filter(pub => {
      const matchCat = getCategoryMatch(selectedCategory, pub.category);
      
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' || 
        pub.title.toLowerCase().includes(q) || 
        pub.desc.toLowerCase().includes(q) || 
        pub.keywords.some(kw => kw.toLowerCase().includes(q)) || 
        pub.category.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <AppBackground showGrid={false}>
      <NavBar />

      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 pt-32 pb-24 text-left">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-white font-bold">Knowledge Center</span>
        </div>

        {/* HERO SECTION */}
        <section className="relative mb-20 border-b border-white/10 pb-16 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#2563EB]/10 to-[#E11D48]/5 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                Developed through more than 35 years of manufacturing excellence
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                KNOWLEDGE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  CENTER.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base leading-relaxed font-normal mb-8 border-l-2 border-[#2563EB] pl-4">
                Explore ColourPix publications, guides, catalogues, company resources, and industry insights developed through more than 35 years of manufacturing excellence.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  ref={magReadRef}
                  onClick={() => downloadBrochure("Company Profile")}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] btn-magnetic"
                >
                  Read Latest Magazine
                </button>
                <a 
                  ref={magBrowseRef}
                  href="#library"
                  className="bg-[#121215] hover:bg-black text-white border border-white/10 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all btn-magnetic"
                >
                  Browse Resources
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PUBLICATION */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="text-left mb-8">
              <span className="text-xs font-mono text-[#E11D48] uppercase tracking-widest block font-bold mb-1">RECOMMENDED LITERATURE</span>
              <h2 className="font-syne text-3xl font-extrabold text-white uppercase">Featured Publication</h2>
            </div>

            {/* Featured Layout Card */}
            <div className="luxury-card rounded-3xl border border-white/15 p-8 sm:p-12 bg-[#121215]/80 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-[#2563EB]/5 to-transparent blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Visual Cover Column */}
                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 bg-[#09090B] aspect-[4/3] flex items-center justify-center">
                  <img 
                    src={getOptimizedImage("https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop", 600)} 
                    alt="Featured Magazine Cover" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => downloadBrochure("Company Profile")}
                      className="bg-white/15 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Text Metadata Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      ColourPix Magazine
                    </span>
                    <span className="text-[10px] font-mono text-white bg-[#E11D48] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      Issue #01
                    </span>
                  </div>

                  <h3 className="font-syne text-4xl sm:text-5xl font-extrabold text-white uppercase leading-tight tracking-tight">
                    THE FUTURE OF PREMIUM PACKAGING
                  </h3>

                  <p className="text-[#E4E4E7] text-base leading-relaxed">
                    A deep dive into 2026 luxury rigid packaging trends, Heidelberg offset press calibrations, and sustainability metrics in pharmaceutical folding cartons. Learn how to configure tactile varnishes and bleed parameters for absolute pressroom efficiency.
                  </p>

                  {/* Metadata Indicators Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10 font-mono text-[10px] text-[#A1A1AA]">
                    <div>
                      <span className="block text-gray-500 uppercase">Issue</span>
                      <span className="text-white font-bold text-sm">#01 / Q3 2026</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 uppercase">Released</span>
                      <span className="text-white font-bold text-sm">July 2026</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 uppercase">Length</span>
                      <span className="text-white font-bold text-sm">64 Pages</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 uppercase">Reading Time</span>
                      <span className="text-white font-bold text-sm">15 min read</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => downloadBrochure("Company Profile")}
                      className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2"
                    >
                      <Eye size={14} /> Read Online
                    </button>
                    
                    <button 
                      onClick={() => downloadBrochure("Company Profile")}
                      className="bg-transparent border border-white/15 text-white hover:border-white/30 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                    >
                      <Download size={14} /> Download PDF (8.5 MB)
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* LIBRARY FILTER BAR */}
        <section id="library" className="mb-12 border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="text-left">
              <span className="text-xs font-mono text-[#2563EB] uppercase block font-bold tracking-wider mb-1">
                PUBLICATIONS DATABASE
              </span>
              <h2 className="font-syne text-3xl font-extrabold text-white uppercase">Browse Library</h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search by title, keyword, category..." 
                className="w-full bg-[#121215] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Tab Scroll */}
          <div className="flex flex-wrap items-center gap-2.5 border-b border-white/10 pb-6">
            {categoriesList.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-5 py-3 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === tab
                    ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                    : 'bg-[#121215]/80 text-[#A1A1AA] border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* RESOURCE CARDS GRID */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.length > 0 ? (
              filteredResources.map((res) => (
                <ScrollReveal key={res.id}>
                  <div className="group luxury-card rounded-3xl border border-white/10 overflow-hidden bg-[#121215]/50 flex flex-col h-full hover:border-[#2563EB] transition-all duration-500 shadow-xl justify-between">
                    
                    {/* Cover Preview Image */}
                    <div className="relative h-56 overflow-hidden bg-[#09090B] border-b border-white/10">
                      <img 
                        src={getOptimizedImage(res.image, 400)} 
                        alt={res.title} 
                        className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-103 transition-transform duration-700" 
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 z-10 text-[9px] font-mono uppercase tracking-widest text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                        {res.category}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-2">
                        <h3 className="font-syne text-lg font-bold text-white group-hover:text-[#2563EB] transition-colors leading-tight">
                          {res.title}
                        </h3>
                        <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-3">
                          {res.desc}
                        </p>
                      </div>

                      {/* Technical Specs Strip */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 font-mono text-[9px] text-[#A1A1AA] text-center bg-[#09090B]/30 rounded-xl">
                        <div>
                          <span className="block text-gray-500 uppercase">Pages</span>
                          <span className="text-white font-bold">{res.pages} Pages</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 uppercase">Size</span>
                          <span className="text-white font-bold">{res.fileSize}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 uppercase">Updated</span>
                          <span className="text-white font-bold">{res.lastUpdated}</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button 
                          onClick={() => downloadBrochure(res.downloadName)}
                          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.25)] flex items-center justify-center gap-1.5"
                        >
                          <Download size={12} /> Download
                        </button>
                        
                        <button 
                          onClick={() => downloadBrochure(res.downloadName)}
                          className="bg-transparent border border-white/10 text-white hover:border-white/20 py-3.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Eye size={12} /> Preview
                        </button>
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-mono text-xs">
                No publications or resources matching your search options.
              </div>
            )}
          </div>
        </section>

        {/* QA FAQ FOOTER */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-2 block">
                TECHNICAL ASSISTANCE
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white">
                Dielines & Bleed Specifications
              </h2>
            </div>
            
            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 text-left space-y-6">
              <h3 className="font-syne text-lg font-bold text-white uppercase flex items-center gap-2">
                <Layers className="text-[#2563EB]" size={18} /> Artwork Preparation Checklist
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Our pre-press teams analyze all vector designs using high-performance ArtiosCAD systems prior to sheet plating. To prevent delays in print queueing, please ensure:
              </p>
              <ul className="space-y-2 text-xs text-[#A1A1AA] font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>Dielines placed on a separate dedicated layer labeled "Dielines"</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>Extend artwork bleed allowance to minimum 3.0mm (0.125 inches)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                  <span>Convert all text objects to outlines to prevent font rendering mismatches</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>Color profiles must be set to CMYK with exact spot Pantone tags</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-24 bg-[#0C0C0E] text-center border-t border-white/10 rounded-3xl mt-12">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
              NEED A CUSTOM TECHNICAL AUDIT?
            </h2>
            <p className="text-[#A1A1AA] text-base">
              Connect directly with our senior pre-press engineers in Lahore to review your custom structural dielines.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link 
                to="/contact" 
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-2"
              >
                <span>Contact Engineering Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </AppBackground>
  );
};

export default KnowledgeCenterPage;
