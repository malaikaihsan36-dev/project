import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Box, CheckCircle2, ChevronRight, Layers, ShieldCheck, Download } from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadBrochure } from '../components/pdfHelper';

const PackagingPage = () => {
  useEffect(() => {
    document.title = "Custom Industrial Packaging Lines | ColourPix";
  }, []);

  const packagingCategories = [
    {
      id: "rigid-boxes",
      title: "Luxury Rigid & Setup Boxes",
      tag: "FLAGSHIP PACKAGING LINE",
      desc: "Handcrafted and automated setup boxes built from 1000-2400 GSM heavy grey chipboard, wrapped in velvet specialty papers with magnetic lid closures.",
      features: ["Custom Foam & Velvet Trays", "Friction Fit & Magnetic Closures", "Book-Style & Shoulder Box Formats"],
      materials: "1000-2400 GSM Grey Chipboard, Specialty Wrap Papers, Velvet",
      finishes: "Gold/Silver Hot Foil, Spot UV, Velvet Soft-Touch",
      image: "/images/clothing_packaging.png"
    },
    {
      id: "food-packaging",
      title: "FMCG & Food-Grade Packaging",
      tag: "FDA COMPLIANT",
      desc: "Food-safe virgin Kraft paperboards, greaseproof barrier liners, and automated folding cartons designed for shelf protection.",
      features: ["Grease & Moisture Barrier Liners", "High-Speed Automated Cartoning", "100% Recyclable Paperboard"],
      materials: "250-450 GSM Virgin Kraft, Poly-Coated Duplex, Food Board",
      finishes: "Aqueous Coating, Matte Lamination, Food-Safe Inks",
      image: "/images/food_packaging.png"
    },
    {
      id: "cosmetic-packaging",
      title: "Cosmetics & Luxury Beauty Boxes",
      tag: "PRESTIGE BEAUTY",
      desc: "Tactile velvet soft-touch cartons, gold foil stamped perfume boxes, and embossed cosmetic sleeves for prestige beauty brands.",
      features: ["Tactile Velvet Soft-Touch Film", "Multi-Level 3D Embossing", "Micro-Foil Registration"],
      materials: "300-450 GSM Bleached Kraft, Silver Metallized Board",
      finishes: "Hot Foil Stamping, Spot UV Varnish, 3D Relief Emboss",
      image: "/images/cosmetic_packaging.png"
    },
    {
      id: "pharmaceutical-packaging",
      title: "Pharmaceutical Cartons",
      tag: "STRICT QC STANDARDS",
      desc: "Tamper-evident pharmaceutical cartons, braille embossed medicine boxes, and strict Pantone color density controls.",
      features: ["Tamper-Evident Security Locks", "Braille & Micro-Text Embossing", "Delta-E Color Density Verification"],
      materials: "250-350 GSM Pharma Grade Folding Boxboard (FBB)",
      finishes: "Water-Based Varnish, Braille Emboss, Security Foils",
      image: "/images/pharma_packaging.png"
    },
    {
      id: "ecommerce-packaging",
      title: "E-Commerce Shipping Mailers",
      tag: "HIGH BURST STRENGTH",
      desc: "Self-sealing tear-strip e-commerce mailer boxes, heavy corrugated shipping cartons, and waterproof adhesive product labels.",
      features: ["Peel & Seal Adhesive Strips", "Flute E/B Corrugated Board", "Heavy Drop & Crush Resistance"],
      materials: "E-Flute & B-Flute Single Wall Corrugated Board",
      materials: "200-350 GSM Art Paper, Heavy Kraft Stock",
      finishes: "Matte/Gloss Lamination, Foil Stamped Logo",
      image: "/images/ecommerce_packaging.png"
    }
  ];

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Packaging</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                100% IN-HOUSE PACKAGING MANUFACTURING
              </span>
              <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                WORLD-CLASS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  PACKAGING
                </span> <br />
                SOLUTIONS.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Explore our full line of custom luxury rigid setup boxes, food-grade barrier cartons, cosmetics packaging, pharmaceutical folding boxes, and e-commerce mailers.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/catalog" 
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
                >
                  <span>Browse Catalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => downloadBrochure("Packaging Solutions")}
                  className="bg-[#121215] hover:bg-black text-white border border-white/10 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download brochure</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGING CATEGORIES GRID */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {packagingCategories.map((cat, idx) => (
            <div 
              key={cat.id}
              className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:border-[#2563EB] transition-all duration-500 shadow-2xl"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full uppercase">
                    {cat.tag}
                  </span>
                  <span className="font-syne text-3xl font-extrabold text-[#E11D48]">0{idx + 1}</span>
                </div>

                <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white uppercase">{cat.title}</h2>
                <p className="text-[#E4E4E7] text-base leading-relaxed">{cat.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                    <span className="text-[10px] font-mono text-[#2563EB] uppercase block mb-1">RECOMMENDED MATERIALS</span>
                    <span className="text-xs font-bold text-white">{cat.materials}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                    <span className="text-[10px] font-mono text-[#E11D48] uppercase block mb-1">PREMIUM FINISHES</span>
                    <span className="text-xs font-bold text-white">{cat.finishes}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-2 font-bold">KEY FEATURES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {cat.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link 
                    to="/contact" 
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2"
                  >
                    <span>Request Category Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            READY TO BUILD YOUR CUSTOM BOX DIELINE?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Work directly with our CAD engineers to plot unprinted prototype samples for dimensional fit and load testing.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Consult CAD Engineer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackagingPage;
