import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, CheckCircle2, ChevronRight, Building, Download } from 'lucide-react';
import NavBar from '../components/Navbar';
import { downloadBrochure } from '../components/pdfHelper';

const IndustriesPage = () => {
  useEffect(() => {
    document.title = "Industries Served | ColourPix Packaging Manufacturer";
  }, []);

  const industriesList = [
    {
      num: "01",
      name: "FMCG & Food Packaging",
      tag: "HIGH VOLUME SUPPLY",
      desc: "FDA-certified food-grade paperboards, greaseproof barrier liners, and custom folding cartons designed for shelf appeal and food safety.",
      features: ["Food-Grade Virgin Kraft", "Grease & Moisture Barrier Coatings", "High-Speed Automated Cartoning"],
      image: "/images/ind_fmcg_food.svg"
    },
    {
      num: "02",
      name: "Cosmetics & Beauty",
      tag: "LUXURY GRADE FINISH",
      desc: "Tactile velvet soft-touch rigid setup boxes, gold foil stamped perfume cartons, and embossed cosmetic sleeves for prestige beauty brands.",
      features: ["Velvet Soft-Touch Lamination", "Precision Metallic Foil Stamping", "Custom Molded Velvet Inserts"],
      image: "/images/ind_cosmetics_beauty.svg"
    },
    {
      num: "03",
      name: "Pharmaceuticals & Healthcare",
      tag: "STRICT QC STANDARDS",
      desc: "Tamper-evident pharmaceutical cartons, braille embossed medicine boxes, and strict Pantone color density controls for healthcare compliance.",
      features: ["Tamper-Evident Safety Locks", "Braille & Micro-Text Embossing", "Delta-E Color Tolerance Verification"],
      image: "/images/ind_pharma_health.svg"
    },
    {
      num: "04",
      name: "Retail & Apparel",
      tag: "BESPOKE BRAND KITS",
      desc: "Heavy cardstock garment packaging, branded clothing boxes, and custom embossed retail gift tags.",
      features: ["Reinforced Bottom Garment Boxes", "Foil Stamped Apparel Gift Boxes", "Bespoke Woven Tag Cards"],
      image: "/images/ind_retail_apparel.svg"
    },
    {
      num: "05",
      name: "Corporate & Enterprise",
      tag: "EXECUTIVE BRAND SUITE",
      desc: "Executive presentation gift sets, custom metallic foiled corporate portfolios, and branded stationery for enterprise accounts.",
      features: ["Metallic Silver & Copper Foiling", "Custom Presentation Trays", "Executive Matte Box Finishing"],
      image: "/images/ind_corporate_exec.svg"
    },
    {
      num: "06",
      name: "E-Commerce & Logistics",
      tag: "NATIONWIDE LOGISTICS",
      desc: "Tear-strip self-sealing e-commerce mailer boxes, heavy corrugated shipping cartons, and waterproof adhesive product labels.",
      features: ["Self-Sealing Peel & Seal Strips", "Flute E/B Corrugated Board", "Heavy Shipping Protection"],
      image: "/images/ind_ecommerce_logistics.svg"
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
            <span className="text-white font-bold">Industries</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                ENTERPRISE MARKET DIVISIONS
              </span>
              <h1 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                PACKAGING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  TAILORED FOR
                </span> <br />
                INDUSTRY LEADERS.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                We manufacture specialized packaging and commercial printing for FMCG, pharmaceuticals, luxury beauty, apparel, electronics, and e-commerce brands across Pakistan and export markets.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/contact" 
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
                >
                  <span>Discuss Specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => downloadBrochure("Industries We Serve")}
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

      {/* INDUSTRIES GRID */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industriesList.map((ind, idx) => (
              <div 
                key={idx}
                className="luxury-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#2563EB] transition-all duration-500 shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={ind.image} 
                    alt={ind.name}
                    className="w-full h-full object-cover filter contrast-125 brightness-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#2563EB] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
                      {ind.tag}
                    </span>
                    <span className="font-syne text-2xl font-extrabold text-[#E11D48]">{ind.num}</span>
                  </div>
                </div>

                <div className="p-8 bg-[#121215] flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-syne text-2xl font-bold text-white mb-3">{ind.name}</h2>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">{ind.desc}</p>
                    
                    <div className="space-y-2 mb-6">
                      {ind.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-mono text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A1A1AA]">BULK CAPACITY READY</span>
                    <Link to="/contact" className="text-[#2563EB] hover:text-white flex items-center gap-1">
                      <span>INQUIRE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            CUSTOM PACKAGING FOR YOUR SECTOR
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Our packaging engineers will work directly with your supply chain team to optimize dielines, substrate weight, and shipping efficiency.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Get Sector Quote
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050507] border-t border-[#27272A] py-12 text-center text-xs font-mono text-[#A1A1AA]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© 1991 – 2026 COLOURPIX PACKAGING & PRINTING MFG. ALL RIGHTS RESERVED.</span>
          <span className="text-[#2563EB]">LCCI REGISTERED MEMBER #1991-PK</span>
        </div>
      </footer>
    </div>
  );
};

export default IndustriesPage;
