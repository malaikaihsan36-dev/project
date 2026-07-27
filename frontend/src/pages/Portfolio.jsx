import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  Download, 
  ChevronRight, 
  Grid, 
  FileText, 
  Settings, 
  Layers, 
  Sparkles, 
  Printer, 
  Briefcase 
} from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { getOptimizedImage } from '../components/imageHelper';
import { downloadBrochure } from '../components/pdfHelper';

// Curated local case study details matched to project titles/categories, serving as fallback/enhanced data
const CASE_STUDIES_FALLBACK = [
  {
    id: "cs-1",
    title: "Luxury Cosmetics Matte Rigid Box",
    category: "Luxury Packaging",
    image: "/images/case_luxury_cosmetic.svg",
    description: "Premium perfume and luxury skincare gift box set run utilizing soft-touch finishes and magnetic closures.",
    challenge: "An international luxury perfume brand required collapsible rigid packaging that could withstand cross-border container shipping logistics while retaining an ultra-luxurious velvet soft-touch shelf presence with zero scuffing.",
    objective: "Engineered a high-GSM collapsible magnetic-closure rigid box featuring precision custom dieline scoring, internal custom-molded velvet inserts, and multi-layered gold hot foil stamping.",
    materials: "1200 GSM Heavy Grey Chipboard, SBS Matte Laminate Liner, Velvet Soft-Touch Scratch-Resistant Film.",
    printing: "Heidelberg Speedmaster Offset 6-Color Press (Pantone spot alignment, Delta E < 1.2).",
    finishes: "Cylinder Hot Gold Foil Stamping, Raised Gloss Spot UV Varnish, Custom Die-Cut Magnetic flap.",
    result: "15,000 units manufactured and delivered on-schedule. Transit drop-testing verified a 100% glue seam reliability rate with zero structural collapses.",
    process: ["ArtiosCAD dieline layout proofing", "Sheet printing & inline soft-touch film application", "Hot foil embossing cylinder stamp", "Die-cutting & automatic folding-gluing assembly"],
    gallery: [
      "/images/cosmetic_packaging.png",
      "/images/clothing_packaging.png",
      "/images/corporate_packaging.png"
    ]
  },
  {
    id: "cs-2",
    title: "FDA-Certified Organic Food Cartons",
    category: "Food Packaging",
    image: "/images/case_organic_food.svg",
    description: "Biodegradable grease-resistant takeaway food packaging sleeves printed with organic soy inks.",
    challenge: "A fast-casual restaurant chain needed eco-friendly takeaway burger and fry cartons that could prevent grease leakage and lock in heat without causing the paperboard to become soggy.",
    objective: "Developed biodegradable folding food cartons using barrier duplex boards lined with a greaseproof inner layer and decorated using food-safe organic soy-based inks.",
    materials: "350 GSM Food-Grade Bleached Duplex Board, Biodegradable Greaseproof PLA Inner Layer.",
    printing: "Offset Printing with Food-Safe Organic Soy-Based Inks.",
    finishes: "Water-based Gloss Varnish, Custom Perforations, Corner Folding Glue lines.",
    result: "100,000 flat-packed units exported to regional hubs. Burst testing confirmed zero leakage after 45 minutes of contact with hot vegetable oils.",
    process: ["FDA barrier board technical audit", "Soy ink printing calibration run", "High-speed automatic folding-carton punch", "Flat-pack bundle export banding"],
    gallery: [
      "/images/food_packaging.png",
      "/images/ecommerce_packaging.png",
      "/images/corporate_packaging.png"
    ]
  },
  {
    id: "cs-3",
    title: "High Edge-Crush Corrugated Mailers",
    category: "Corrugated Boxes",
    image: "/images/case_edge_crush.svg",
    description: "Heavy-duty locking mailer boxes engineered for fragile retail items and logistics safety.",
    challenge: "A subscription brand faced high parcel-damage rates from conventional postal carrier handling, leading to broken product containers and customer complaints.",
    objective: "Custom designed a heavy-duty E-flute corrugated mailer box with secure folding locks, double-sidewalls, and high edge-crush properties.",
    materials: "175 GSM Testliner Outer, E-Flute Corrugated Fluting, 150 GSM Kraft Liner Inner.",
    printing: "Flexographic Printing using high-density carbon-pigment inks.",
    finishes: "Precision Creasing, Slot Punching, Matte Water-Resistant Coating.",
    result: "Reduced product shipping damages by 94% over a 3-month tracking period. Compression load testing verified safety up to 35 kg.",
    process: ["Edge-Crush-Test (ECT) weight evaluation", "CAD dieline folder locks strategy", "Inline rotary flexographic die-cut run", "Drop & vibration simulation test"],
    gallery: [
      "/images/ecommerce_packaging.png",
      "/images/pharma_packaging.png",
      "/images/clothing_packaging.png"
    ]
  },
  {
    id: "cs-4",
    title: "Serialized Pharmaceutical Packing Sleeves",
    category: "Pharmaceutical Packaging",
    image: "/images/case_pharma_sleeve.svg",
    description: "Reverse-tuck folding boxes printed with dynamic serialized barcodes for medicine tracking.",
    challenge: "A medical manufacturer required absolute text legibility and precise barcode printing matching international serialization scan verification standards.",
    objective: "Created lightweight folding cartons using bleached SBS board printed with high-resolution tracking layouts and dynamic QR serialization codes.",
    materials: "300 GSM Bleached SBS Cardboard, Anti-counterfeit micro-text fibers.",
    printing: "HP Indigo Digital Web Press (Delta E color tolerance < 1.0).",
    finishes: "Security Foil Stamping, Matte Water-based Coat.",
    result: "250,000 cartons shipped with 100% scanner readability of serialized barcodes. Zero bleed or offset defects found in compliance audit.",
    process: ["Pre-flight vector text outline verification", "HP Indigo digital variable run", "Quality scan tracking alignment check", "Reverse-tuck automatic fold-score"],
    gallery: [
      "/images/pharma_packaging.png",
      "/images/corporate_packaging.png",
      "/images/food_packaging.png"
    ]
  },
  {
    id: "cs-5",
    title: "Haute Couture Apparel Rigid Box",
    category: "Apparel & Fashion",
    image: "/images/case_haute_apparel.svg",
    description: "Heavy velvet garment apparel packaging boxes featuring embossed gold foiling and custom magnetic closures.",
    challenge: "A high-end retail fashion brand wanted luxury apparel packaging that could hold up to 5 kg of product weight without handle tear or glue failure at the bottom seams.",
    objective: "Constructed premium garment boxes using heavy chipboard with reinforced card inserts at the base, finished with dynamic gold foil stamping.",
    materials: "1200 GSM Heavy Chipboard, Satin Fabric Lining, 400 GSM Base Reinforcement Cards.",
    printing: "Heidelberg Offset printing + Hot Foil Cylinder Emboss.",
    finishes: "Hot Gold Foil Stamping, Logo Blind Embossing, Soft-Touch Velvet Outer Coating.",
    result: "Delivered 20,000 boxes. Structural testing verified handles could sustain up to 10 kg static weight load for 24 hours without tear.",
    process: ["Bag template dieline crease test", "Foil cylinder die engraving", "Rotary hot foil impression run", "Reinforced cardboard insert hand assembly"],
    gallery: [
      "/images/clothing_packaging.png",
      "/images/corporate_packaging.png",
      "/images/cosmetic_packaging.png"
    ]
  }
];

const Portfolio = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';
  const [activeTab, setActiveTab] = useState('All Projects');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.title = "Industrial Portfolio & Case Studies | ColourPix";
    
    const fetchData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/projects`),
          axios.get(`${API_BASE_URL}/api/portfolio-categories`)
        ]);
        
        // Merge API data with local rich details or use local default list if DB is empty
        const apiData = projRes.data;
        if (apiData && apiData.length > 0) {
          const merged = apiData.map(p => {
            const fallbackMatch = CASE_STUDIES_FALLBACK.find(c => 
              c.title.toLowerCase().trim() === p.title.toLowerCase().trim()
            );
            return {
              ...p,
              challenge: p.challenge || fallbackMatch?.challenge || "Standard client manufacturing specifications call for custom dielines, offset printing calibration, and quality-controlled finishes.",
              objective: p.objective || fallbackMatch?.objective || "Engineered a custom packaging solution focused on durability, premium branding, and exact structural requirements.",
              materials: p.materials || fallbackMatch?.materials || "Premium Duplex Board, SBS Paperboard, Eco-friendly adhesives.",
              printing: p.printing || fallbackMatch?.printing || "Commercial Heidelberg Multi-color press offset run.",
              finishes: p.finishes || fallbackMatch?.finishes || "Gloss spot varnish overlay, clean score folds, and precision die cutting.",
              result: p.result || fallbackMatch?.result || "Run successfully completed, checked via AQL 1.0 zero-defect audit, and dispatched to logistics centers.",
              process: p.process || fallbackMatch?.process || ["CAD layout proofing", "Sheet printing press run", "Automatic die-cutting", "AQL 1.0 packing checklist"],
              gallery: p.gallery || fallbackMatch?.gallery || [p.image_url || p.image, "/images/cad_dieline.png"]
            };
          });
          setProjects(merged);
        } else {
          setProjects(CASE_STUDIES_FALLBACK);
        }

        const dynamicTabs = ['All Projects', ...catRes.data.map(c => c.name)];
        setCategories(dynamicTabs.length > 1 ? dynamicTabs : ['All Projects', 'Luxury Packaging', 'Food Packaging', 'Corrugated Boxes', 'Pharmaceutical Packaging', 'Shopping Bags']);
      } catch (err) {
        console.error("Fetch Error, loading premium defaults:", err);
        setProjects(CASE_STUDIES_FALLBACK);
        setCategories(['All Projects', 'Luxury Packaging', 'Food Packaging', 'Corrugated Boxes', 'Pharmaceutical Packaging', 'Shopping Bags']);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  const filteredProjects = activeTab === 'All Projects' 
    ? projects 
    : projects.filter(p => {
        if (!p.category) return false;
        return p.category.trim().toLowerCase() === activeTab.trim().toLowerCase();
      });

  const handleSelectProject = (project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 300);
  };

  const handleCloseCaseStudy = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleDownloadPdf = () => {
    downloadBrochure("Portfolio Catalogue");
  };

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Portfolio</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                PRE-PRESS VERIFIED CASE STUDIES & PRODUCTION RUNS
              </span>
              <h1 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                PRODUCTION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  CASE STUDIES
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Review detailed manufacturing dossiers of our completed rigid packaging, corrugated logistics mailers, food takeover cartons, and roll labels.
              </p>
              <button 
                onClick={handleDownloadPdf}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Portfolio Catalog (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <section className="py-20 bg-[#09090B] border-b border-[#27272A]/50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {selectedProject ? (
              // =========================================================
              // EDITORIAL CASE STUDY DETAIL VIEW
              // =========================================================
              <div className="space-y-12">
                
                {/* Back button */}
                <button 
                  onClick={handleCloseCaseStudy}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-[#2563EB] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Portfolio Showcase</span>
                </button>

                {/* Case Study Title Header */}
                <div className="border-l-4 border-[#2563EB] pl-6 py-2">
                  <span className="text-xs font-mono uppercase text-[#2563EB] block font-bold tracking-widest mb-1">
                    {selectedProject.category || 'PACKAGING SOLUTION'} // VERIFIED RUN
                  </span>
                  <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight text-left">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Hero Image */}
                <div className="relative h-[450px] sm:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={getOptimizedImage(selectedProject.image_url || selectedProject.image)} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* Main Case Study Specs & Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left Column: Challenges & Results */}
                  <div className="lg:col-span-8 space-y-10 text-left">
                    <div className="space-y-4">
                      <h3 className="font-syne text-2xl font-bold text-white uppercase flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#2563EB]" />
                        The Challenge
                      </h3>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed font-normal">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-syne text-2xl font-bold text-white uppercase flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#E11D48]" />
                        The Objective
                      </h3>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed font-normal">
                        {selectedProject.objective}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-syne text-2xl font-bold text-white uppercase flex items-center gap-2">
                        <Layers className="w-5 h-5 text-white" />
                        Final Manufacturing Result
                      </h3>
                      <div className="p-6 rounded-2xl bg-[#121215] border border-white/10">
                        <p className="text-sm text-[#E4E4E7] leading-relaxed font-normal italic">
                          "{selectedProject.result}"
                        </p>
                      </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="space-y-6 pt-6">
                      <h3 className="font-syne text-2xl font-bold text-white uppercase">Product Angles & Detail</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {selectedProject.gallery?.map((imgUrl, i) => (
                          <div key={i} className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                            <img 
                              src={getOptimizedImage(imgUrl)} 
                              alt={`Angle ${i + 1}`}
                              className="w-full h-full object-cover filter contrast-115 brightness-90 hover:scale-102 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Specification Panel */}
                  <div className="lg:col-span-4 space-y-8">
                    
                    {/* Specifications Card */}
                    <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-6 text-left shadow-xl">
                      <h4 className="font-syne text-lg font-bold text-white border-b border-white/10 pb-4 uppercase tracking-wider flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#2563EB]" />
                        Technical Specs
                      </h4>

                      <div className="space-y-4 text-xs font-mono text-left">
                        <div>
                          <span className="text-[#A1A1AA] block mb-1">MATERIALS USED</span>
                          <span className="text-white text-sm font-sans font-bold">{selectedProject.materials}</span>
                        </div>
                        <div>
                          <span className="text-[#A1A1AA] block mb-1">PRINTING TECHNOLOGY</span>
                          <span className="text-white text-sm font-sans font-bold">{selectedProject.printing}</span>
                        </div>
                        <div>
                          <span className="text-[#A1A1AA] block mb-1">FINISHING TECHNIQUES</span>
                          <span className="text-white text-sm font-sans font-bold">{selectedProject.finishes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Manufacturing Flow Checklist Card */}
                    <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-6 text-left shadow-xl">
                      <h4 className="font-syne text-lg font-bold text-white border-b border-white/10 pb-4 uppercase tracking-wider flex items-center gap-2">
                        <Printer className="w-5 h-5 text-[#E11D48]" />
                        Manufacturing Pipeline
                      </h4>

                      <div className="space-y-4">
                        {selectedProject.process?.map((proc, index) => (
                          <div key={index} className="flex gap-3 text-left">
                            <span className="text-xs font-mono text-[#2563EB] font-bold">0{index + 1}</span>
                            <span className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-semibold">
                              {proc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct Project Inquiry Box */}
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1E3A8A]/30 to-[#9F1239]/20 border border-white/10 space-y-6 text-center shadow-2xl">
                      <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-extrabold block">INQUIRE ABOUT THIS SPEC</span>
                      <h4 className="font-syne text-xl font-extrabold text-white uppercase leading-tight">
                        Need Similar Packaging Run?
                      </h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        We construct prototypes, consult on paperboard substrates, and calculate wholesale volume rates.
                      </p>
                      
                      <div className="space-y-3">
                        <Link 
                          to={`/contact?inquiry=${encodeURIComponent(selectedProject.title)}`}
                          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <span>Inquire Custom Run</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        
                        <button 
                          onClick={handleDownloadPdf}
                          className="w-full bg-[#121215]/80 hover:bg-black text-white border border-white/15 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Get Specifications Sheet</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Related Projects Section */}
                <div className="pt-16 border-t border-white/10 space-y-8">
                  <h3 className="font-syne text-3xl font-extrabold uppercase text-white tracking-tight flex items-center gap-3">
                    <Grid className="w-6 h-6 text-[#2563EB]" />
                    Related Packaging Cases
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects
                      .filter(p => p.id !== selectedProject.id && (p.category === selectedProject.category || !selectedProject.category))
                      .slice(0, 3)
                      .map((p, idx) => (
                        <div 
                          key={p.id || idx}
                          onClick={() => handleSelectProject(p)}
                          className="group p-5 rounded-2xl bg-[#121215] border border-white/5 hover:border-[#2563EB] cursor-pointer transition-all duration-300 flex flex-col justify-between h-56"
                        >
                          <div className="text-left">
                            <span className="text-[9px] font-mono text-[#2563EB] uppercase block font-bold tracking-widest mb-2">{p.category || 'PACKAGING'}</span>
                            <h4 className="font-syne text-lg font-bold text-white group-hover:text-[#2563EB] transition-colors mb-2">{p.title}</h4>
                            <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed font-normal">{p.description || p.desc}</p>
                          </div>
                          
                          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#E4E4E7]">
                            <span className="text-[#2563EB]">VIEW TECHNICAL PROFILE</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB]" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            ) : (
              // =========================================================
              // HIGH-END PORTFOLIO GALLERY GRID VIEW
              // =========================================================
              <div>
                
                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-white/10 pb-6">
                  {categories.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                        activeTab === tab
                          ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                          : 'bg-[#121215] text-[#A1A1AA] border border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Projects Grid */}
                {loading ? (
                  <div className="text-center py-24 font-mono text-[#2563EB]">Loading Manufacturing Dossier...</div>
                ) : filteredProjects.length === 0 ? (
                  <div className="text-center py-24 text-gray-500 font-mono">
                    No packaging files found in "{activeTab}". Total in DB: {projects.length}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, idx) => (
                      <div 
                        key={project.id || idx}
                        onClick={() => handleSelectProject(project)}
                        className="group luxury-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#2563EB] cursor-pointer transition-all duration-500 shadow-xl bg-[#121215]"
                      >
                        <div className="relative h-72 overflow-hidden">
                          <img 
                            src={getOptimizedImage(project.image_url || project.image)} 
                            alt={project.title}
                            className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90"></div>
                          
                          <div className="absolute top-4 left-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                              {project.category || 'PACKAGING'}
                            </span>
                          </div>
                        </div>

                        <div className="p-7 bg-[#121215] flex-grow flex flex-col justify-between">
                          <div className="text-left">
                            <h2 className="font-syne text-2xl font-bold text-white mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                              {project.title}
                            </h2>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-normal line-clamp-3">
                              {project.description || project.desc}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E4E4E7]">
                            <span className="text-[#2563EB]">VIEW TECHNICAL PROFILE</span>
                            <div className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                              <span>CASE STUDY</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
            WANT CUSTOM PRODUCTION SAMPLES?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            We provide physical 1:1 CAD dieline samples and color proofs prior to bulk manufacturing.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Request Prototype Sample
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Portfolio;