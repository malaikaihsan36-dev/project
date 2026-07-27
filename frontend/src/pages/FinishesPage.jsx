import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, CheckCircle2, ChevronRight, Layers, Eye, Award, Download } from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadBrochure } from '../components/pdfHelper';

const FinishesPage = () => {
  useEffect(() => {
    document.title = "Premium Luxury Finishes & Embellishments | ColourPix";
  }, []);

  const finishesList = [
    {
      id: "foiling",
      title: "Metallic Hot Foil Stamping",
      tag: "LUXURY EMBELLISHMENT",
      purpose: "Adds high-contrast metallic brilliance and prestige to brand logos, borders, and typography.",
      visualEffect: "Opaque, mirror-like metallic shine in gold, silver, rose gold, bronze, or custom holographic films.",
      benefits: ["High-impact shelf reflection", "Tear-resistant metallic film", "Compatible with textured paperboards"],
      bestIndustries: "Perfumes, Cosmetics, Executive Gifts, Confectionery & Spirits",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "spot-uv",
      title: "Spot UV & 3D Tactile Coating",
      tag: "GLOSS CONTRAST",
      purpose: "Applies liquid UV varnish selectively over designated areas to create a dramatic gloss-vs-matte contrast.",
      visualEffect: "High-gloss glasslike sheen raised up to 100 microns for rich tactile depth.",
      benefits: ["Scratch & water resistance", "Highlights key brand elements", "Creates sensory unboxing touch"],
      bestIndustries: "Electronics, Book Covers, Rigid Setup Boxes & Retail Cartons",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "embossing",
      title: "Multi-Level 3D Embossing & Debossing",
      tag: "TACTILE STRUCTURE",
      purpose: "Uses male/female metal dies to press paperboard into raised (embossed) or recessed (debossed) 3D relief.",
      visualEffect: "Sculpted 3D paper elevation that catches ambient lighting and creates memorable hand-feel.",
      benefits: ["Adds physical dimension", "Refines brand crests & logos", "Zero ink requirement for blind emboss"],
      bestIndustries: "Pharma Seals, Luxury Retail Bags, Certificates & Brand Kits",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "soft-touch",
      title: "Velvet Soft-Touch Lamination",
      tag: "SURFACE PROTECTION",
      purpose: "Bonds an ultra-thin tactile velvet film onto paperboard for a peach-skin, non-reflective surface.",
      visualEffect: "Silky, glare-free deep matte texture with superior color saturation.",
      benefits: ["Anti-fingerprint coating", "Velvety hand-feel", "Ideal base for hot foil & spot UV"],
      bestIndustries: "High-End Beauty, Apparel Boxes, Rigid Gift Packaging & Books",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "matte-lamination",
      title: "Matte Film Lamination",
      tag: "CLASSIC SATIN",
      purpose: "Protects paperboard from scuffing and moisture while imparting a subtle, elegant satin finish.",
      visualEffect: "Clean, non-reflective matte finish that softens contrast and reduces glare.",
      benefits: ["Protects against moisture & handling", "Prevents crease cracking", "Economical luxury finish"],
      bestIndustries: "Corporate Brochures, Product Sleeves & FMCG Cartons",
      image: "https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "die-cutting",
      title: "Computerized Precision Die Cutting",
      tag: "STRUCTURAL FORMING",
      purpose: "High-speed steel rule die-cutting that punches out exact box shapes, display windows, and crease lines.",
      visualEffect: "Razor-sharp contour edges, intricate display cutouts, and 100% square folding geometry.",
      benefits: ["Automated folder-gluer compatibility", "Zero edge fraying", "Intricate window shapes"],
      bestIndustries: "Window Cartons, Retail Counter Displays & Custom Mailers",
      image: "https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=1000&auto=format&fit=crop"
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
            <span className="text-white font-bold">Premium Finishes</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                ARTISANAL LUXURY EMBELLISHMENT LINE
              </span>
              <h1 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                PREMIUM SURFACES <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  & EMBELLISHMENTS.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Transform ordinary paperboard into extraordinary tactile experiences. Explore our in-house hot foil stamping, 3D tactile UV varnish, velvet soft-touch laminations, and precision die-cutting.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/contact" 
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
                >
                  <span>Request Swatch Kit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => downloadBrochure("Premium Finishes")}
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

      {/* FINISHES DETAILED SHOWCASE */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {finishesList.map((finish, idx) => (
            <div 
              key={finish.id}
              className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:border-[#2563EB] transition-all duration-500 shadow-2xl"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full uppercase">
                    {finish.tag}
                  </span>
                  <span className="font-syne text-3xl font-extrabold text-[#E11D48]">0{idx + 1}</span>
                </div>

                <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white uppercase">{finish.title}</h2>
                
                <div className="space-y-4 text-xs font-mono text-[#E4E4E7]">
                  <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                    <span className="text-[10px] text-[#2563EB] uppercase block mb-1 font-bold">PURPOSE & APPLICATION</span>
                    <p className="text-sm font-sans text-white leading-relaxed">{finish.purpose}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                    <span className="text-[10px] text-[#E11D48] uppercase block mb-1 font-bold">VISUAL EFFECT</span>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{finish.visualEffect}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-2 font-bold">KEY ADVANTAGES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {finish.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5 text-xs text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                  <span>RECOMMENDED: <strong className="text-white">{finish.bestIndustries}</strong></span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                  <img 
                    src={finish.image} 
                    alt={finish.title} 
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
            REQUEST A PHYSICAL FINISHING SWATCH KIT
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Experience our gold foil stamping, spot UV, and velvet lamination textures in person before starting bulk manufacturing.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Order Sample Swatch Kit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FinishesPage;
