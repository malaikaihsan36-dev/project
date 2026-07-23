import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize,
  HelpCircle,
  FileText
} from 'lucide-react';
import { downloadBrochure } from '../components/pdfHelper';

const MAGAZINE_PAGES = [
  // Page 1: Cover
  {
    type: "cover",
    bg: "bg-[#0C0C0E]",
    title: "COLOURPIX",
    subtitle: "MAGAZINE",
    issue: "ISSUE #01 — Q3 2026",
    tagline: "Industrial Printing, Structural Engineering, & Supply Chain Masterclass",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
  },
  // Page 2: Editorial Intro
  {
    type: "editorial",
    title: "Editor's Note",
    author: "M. Ihsan, Production Director",
    text: "At ColourPix, we believe packaging is the physical manifest of a brand’s promise. In this inaugural issue, our engineering and design teams share key insights on achieving zero-defect packaging at scale, calibrating Heidelberg offset presses for high-fidelity color consistency, and choosing optimal greyboard densities for luxury rigid boxes.",
    accent: "EST. 1991 • LAHORE PLANT",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop"
  },
  // Page 3: Heidelberg Precision
  {
    type: "feature",
    title: "Heidelberg Press Runs",
    subtitle: "01 / PRESSROOM ENG",
    text: "Our pressrooms in Lahore run state-of-the-art Heidelberg Speedmaster multi-color presses. Operating at speeds up to 15,000 sheets per hour, these machines feature inline spectrophotometers that verify color density on every impression, keeping Delta-E variance below 1.5.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop"
  },
  // Page 4: Rigid Setup Boxes
  {
    type: "feature",
    title: "Luxury Rigid Boxes",
    subtitle: "02 / STRUCTURAL GEOMETRY",
    text: "Handcrafted luxury packaging demands structural rigidity. We combine automated V-grooving on 1200–2400 GSM greyboard with precision corner taping and hand-wrapped art papers to produce setup boxes that protect and elevate premium cosmetic and perfume brands.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop"
  },
  // Page 5: Substrates Specification
  {
    type: "spec",
    title: "Material Specifications",
    subtitle: "03 / BOARDS & DENSITIES",
    specs: [
      { name: "Virgin Kraft Paperboard", range: "250 – 450 GSM", usage: "Eco-commerce mailers, structural folding boxes" },
      { name: "Duplex Paperboard", range: "200 – 600 GSM", usage: "Standard retail packaging, retail card boxes" },
      { name: "Luxury Greyboard / Strawboard", range: "1000 – 2400 GSM", usage: "Base structure for rigid cosmetic setup boxes" },
      { name: "Solid Bleached Sulfate (SBS)", range: "250 – 400 GSM", usage: "High-end pharmaceutical and perfume folding cartons" }
    ]
  },
  // Page 6: Embellishments
  {
    type: "feature",
    title: "Swiss Hot Foil Stamping",
    subtitle: "04 / TACTILE FINISHES",
    text: "Our finishing lines leverage Swiss Bobst automatic foil stampers. Under extreme thermal pressure, metallic foil films are transferred onto paperboards with 0.1mm alignment accuracy, yielding reflective gold, silver, and holographic logos.",
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800&auto=format&fit=crop"
  },
  // Page 7: Quality Inspection (AQL 1.0)
  {
    type: "editorial",
    title: "Zero-Defect Quality Control",
    author: "Quality Assurance Division",
    text: "We adhere strictly to AQL 1.0 inspection standards. Our automated quality scanners and manual inspection tables test finished packages for adhesive peel strength, score line folding resistance, corner drop stability, and shipping stacking compression, ensuring every single unit delivered meets contract requirements.",
    accent: "AQL 1.0 ACCREDITED",
    image: "https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=800&auto=format&fit=crop"
  },
  // Page 8: Back Cover
  {
    type: "back",
    bg: "bg-[#0C0C0E]",
    title: "COLOURPIX",
    subtitle: "PACKAGING & PRINTING MANUFACTURING",
    accreditation: "LCCI REGISTERED MEMBER #1991-PK",
    phone: "+92 370 4123327",
    email: "colourpix.official@gmail.com",
    address: "Lahore, Punjab, Pakistan"
  }
];

const MagazineViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Navigation states
  const [currentPage, setCurrentPage] = useState(0); // 0 to 7
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 2
  const [loading, setLoading] = useState(true);
  
  // DOM references
  const viewerRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    document.title = "ColourPix Magazine — Immersive Reader | ColourPix";
    
    // Simulate loading animation
    const timer = setTimeout(() => setLoading(false), 1200);
    
    // Keyboard listener
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') navigate('/knowledge-center');
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.log(err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.log(err));
    }
  };

  // Share link trigger
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "ColourPix Magazine - Issue #01",
        text: "Explore the latest insights in industrial printing and packaging.",
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Magazine link copied to clipboard!");
    }
  };

  // Flip controllers
  const handleNext = () => {
    if (currentPage < MAGAZINE_PAGES.length - 2) {
      setCurrentPage(prev => prev + 2);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 2);
    }
  };

  // Zoom controllers
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const resetZoom = () => setZoomLevel(1);

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext(); // swipe left
    if (diff < -50) handlePrev(); // swipe right
  };

  // Rendering individual page contents
  const renderPageContent = (page, isRight) => {
    if (!page) return null;

    return (
      <div className={`w-full h-full p-8 sm:p-12 flex flex-col justify-between overflow-y-auto select-none bg-[#121215] text-white border-white/5 relative ${isRight ? 'border-l' : ''}`}>
        
        {/* Header Indicator */}
        <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-[#A1A1AA] uppercase border-b border-white/10 pb-3 mb-6">
          <span>COLOURPIX MAGAZINE</span>
          <span>ISSUE #01</span>
        </div>

        {/* Dynamic Inner Layouts */}
        <div className="flex-grow flex flex-col justify-center">
          {page.type === 'cover' && (
            <div className="space-y-6 text-center py-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-bold block">{page.issue}</span>
              <h1 className="font-syne text-5xl sm:text-6xl font-extrabold uppercase leading-[0.9] tracking-tight">{page.title}</h1>
              <span className="font-syne text-xl text-[#A1A1AA] tracking-widest block">{page.subtitle}</span>
              
              <div className="h-56 rounded-2xl overflow-hidden border border-white/15 my-6 max-w-sm mx-auto">
                <img src={page.image} alt="Cover Preview" className="w-full h-full object-cover filter contrast-125 brightness-90" />
              </div>
              
              <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto leading-relaxed uppercase font-mono tracking-wider">
                {page.tagline}
              </p>
            </div>
          )}

          {page.type === 'editorial' && (
            <div className="space-y-6 text-left">
              <span className="text-[9px] font-mono text-[#E11D48] uppercase tracking-widest block font-bold">{page.accent}</span>
              <h2 className="font-syne text-3xl font-extrabold uppercase text-white leading-tight">{page.title}</h2>
              <p className="text-sm text-[#E4E4E7] leading-relaxed font-serif italic border-l-2 border-[#2563EB] pl-4">
                "{page.text}"
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono font-bold block text-white">{page.author}</span>
                <span className="text-[9px] font-mono text-gray-500">ColourPix Editorial Panel</span>
              </div>
            </div>
          )}

          {page.type === 'feature' && (
            <div className="space-y-5 text-left">
              <span className="text-[9px] font-mono text-[#2563EB] uppercase tracking-widest block font-bold">{page.subtitle}</span>
              <h2 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase text-white leading-tight">{page.title}</h2>
              
              <div className="h-40 rounded-xl overflow-hidden border border-white/10">
                <img src={page.image} alt={page.title} className="w-full h-full object-cover" />
              </div>
              
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {page.text}
              </p>
            </div>
          )}

          {page.type === 'spec' && (
            <div className="space-y-6 text-left">
              <span className="text-[9px] font-mono text-[#2563EB] uppercase tracking-widest block font-bold">{page.subtitle}</span>
              <h2 className="font-syne text-2xl font-extrabold uppercase text-white leading-tight">{page.title}</h2>
              
              <div className="space-y-4">
                {page.specs.map((s, idx) => (
                  <div key={idx} className="p-3 bg-[#09090B] border border-white/10 rounded-xl font-mono text-[9px] space-y-1">
                    <div className="flex justify-between text-white font-bold">
                      <span>{s.name}</span>
                      <span className="text-[#2563EB]">{s.range}</span>
                    </div>
                    <p className="text-gray-500">{s.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page.type === 'back' && (
            <div className="space-y-8 text-center py-6 font-mono text-[10px]">
              <span className="text-xs font-syne font-extrabold text-white block uppercase tracking-widest">{page.title}</span>
              <span className="text-[8px] text-[#A1A1AA] block tracking-widest uppercase">{page.subtitle}</span>
              
              <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center border border-white/15 my-6">
                {/* QR Code Placeholder Graphic */}
                <div className="w-full h-full bg-black flex flex-wrap items-center justify-center p-0.5">
                  <div className="w-4 h-4 bg-white" />
                  <div className="w-4 h-4 bg-transparent" />
                  <div className="w-4 h-4 bg-white" />
                  <div className="w-4 h-4 bg-white" />
                </div>
              </div>

              <div className="space-y-2 text-[#A1A1AA]">
                <span className="text-[#2563EB] font-bold block">{page.accreditation}</span>
                <span className="block">Tel: {page.phone}</span>
                <span className="block">Email: {page.email}</span>
                <span className="block text-gray-600">{page.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Page Number */}
        <div className="text-center text-[9px] font-mono text-gray-500 pt-4 mt-4 border-t border-white/5 uppercase">
          PAGE {isRight ? currentPage + 2 : currentPage + 1}
        </div>

      </div>
    );
  };

  return (
    <div 
      ref={viewerRef}
      className="fixed inset-0 bg-[#09090B] z-[300] flex flex-col justify-between select-none overflow-hidden"
    >
      
      {/* 1. TOP INTERACTIVE TOOLBAR */}
      <header className="h-16 px-6 bg-[#0C0C0E] border-b border-white/10 flex items-center justify-between text-white shrink-0">
        
        {/* Left Back Controls */}
        <button 
          onClick={() => navigate('/knowledge-center')}
          className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Library</span>
        </button>

        {/* Center Title */}
        <div className="text-center font-syne font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#2563EB]" />
          <span>ColourPix Magazine - Issue #01</span>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-[#A1A1AA]">
          <button onClick={zoomOut} className="p-2 hover:text-white" title="Zoom Out"><ZoomOut size={16} /></button>
          <button onClick={resetZoom} className="p-2 hover:text-white font-mono text-[10px] hidden sm:block" title="Reset Zoom">{(zoomLevel * 100).toFixed(0)}%</button>
          <button onClick={zoomIn} className="p-2 hover:text-white" title="Zoom In"><ZoomIn size={16} /></button>
          
          <span className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <button onClick={handleShare} className="p-2 hover:text-white" title="Share Link"><Share2 size={16} /></button>
          <button onClick={() => downloadBrochure('Company Profile')} className="p-2 hover:text-white" title="Download PDF"><Download size={16} /></button>
          
          <button onClick={toggleFullscreen} className="p-2 hover:text-white ml-1">
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* 2. LOADING SPIN PLACEHOLDER */}
      {loading ? (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4 text-white">
          <div className="w-12 h-12 rounded-full border-4 border-t-[#2563EB] border-white/10 animate-spin" />
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">Rendering Immersive Spread Layouts...</span>
        </div>
      ) : (
        /* 3. DYNAMIC SPREAD READER VIEWPORT */
        <div 
          className="flex-grow flex items-center justify-center p-6 relative overflow-hidden bg-radial-gradient"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Turn Left Arrow */}
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`absolute left-6 z-50 p-4 rounded-full bg-[#121215]/80 border border-white/10 text-white hover:border-white/30 hover:bg-black transition-all ${currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-105 shadow-xl'}`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Immersive Spread Page-Flip Sheet */}
          <div 
            className="w-full max-w-5xl aspect-[1.45/1] rounded-3xl overflow-hidden border border-white/15 bg-[#121215] shadow-2xl relative transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* The page layouts split */}
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              
              {/* Left Page content */}
              <div className="w-full h-full hidden md:block">
                {renderPageContent(MAGAZINE_PAGES[currentPage], false)}
              </div>

              {/* Center Gutter Fold Shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-transparent to-black/25 z-40 pointer-events-none hidden md:block" />

              {/* Right Page content */}
              <div className="w-full h-full">
                {renderPageContent(MAGAZINE_PAGES[currentPage + 1] || MAGAZINE_PAGES[currentPage], true)}
              </div>

            </div>
          </div>

          {/* Turn Right Arrow */}
          <button 
            onClick={handleNext}
            disabled={currentPage >= MAGAZINE_PAGES.length - 2}
            className={`absolute right-6 z-50 p-4 rounded-full bg-[#121215]/80 border border-white/10 text-white hover:border-white/30 hover:bg-black transition-all ${currentPage >= MAGAZINE_PAGES.length - 2 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-105 shadow-xl'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 4. BOTTOM THUMBNAIL TRACKBAR */}
      <footer className="h-28 px-6 bg-[#0C0C0E] border-t border-white/10 flex items-center justify-between text-white shrink-0 overflow-x-auto gap-8">
        
        {/* Current Spread Label */}
        <div className="text-left font-mono text-[10px] text-[#A1A1AA] uppercase shrink-0">
          <span>Spread Indicator</span>
          <span className="block text-white font-bold text-xs mt-0.5">
            {currentPage + 1} – {currentPage + 2} of {MAGAZINE_PAGES.length}
          </span>
        </div>

        {/* Thumbnail Items Row */}
        <div className="flex items-center gap-3 py-2 overflow-x-auto scrollbar-thin">
          {Array.from({ length: MAGAZINE_PAGES.length / 2 }).map((_, spreadIdx) => {
            const pageLeft = spreadIdx * 2;
            const isActive = currentPage === pageLeft;
            
            return (
              <button 
                key={spreadIdx}
                onClick={() => setCurrentPage(pageLeft)}
                className={`p-1 rounded-lg border transition-all shrink-0 flex items-center gap-0.5 bg-[#121215] ${isActive ? 'border-[#2563EB] scale-105 shadow-lg' : 'border-white/15 hover:border-white/30'}`}
              >
                {/* Visual Thumbnail */}
                <div className="w-10 h-12 bg-zinc-800 rounded overflow-hidden flex items-center justify-center text-[7px] font-mono font-bold border border-white/5">
                  <span className="text-white">{pageLeft + 1}</span>
                </div>
                <div className="w-10 h-12 bg-zinc-800 rounded overflow-hidden flex items-center justify-center text-[7px] font-mono font-bold border border-white/5">
                  <span className="text-white">{pageLeft + 2}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Escape Tip */}
        <div className="text-right font-mono text-[9px] text-[#A1A1AA] uppercase hidden sm:block shrink-0">
          <span>Navigation Assist</span>
          <span className="block text-white font-bold mt-0.5">
            ← / → keys • Esc to Exit
          </span>
        </div>
      </footer>

    </div>
  );
};

export default MagazineViewer;
