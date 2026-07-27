import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Printer, Box, Sparkles, Layers, Zap, Package, ChevronRight, CheckCircle2, Download } from 'lucide-react';
import NavBar from '../components/Navbar';
import { downloadBrochure } from '../components/pdfHelper';

const ServicesPage = () => {
  useEffect(() => {
    document.title = "Manufacturing Services | ColourPix Packaging & Printing";
  }, []);

  const servicesList = [
    {
      num: "01",
      title: "Commercial Offset Printing",
      tag: "HEAVY PRESS DIVISION",
      desc: "High-volume multi-color printing using European Heidelberg and Japanese Komori offset presses with automated spectro-densitometer ink controls.",
      specs: ["Up to 6-Color + Inline Varnish", "Pantone Matching (Delta-E < 1.5)", "200 to 600 GSM Paperboard"],
      image: "/images/service_offset_press.svg"
    },
    {
      num: "02",
      title: "Luxury Rigid Box Assembly",
      tag: "PACKAGING DIVISION",
      desc: "Handcrafted and automated setup boxes built from heavy-duty rigid chipboard, wrapped in premium specialty papers, velvet linings, and magnetic closures.",
      specs: ["Magnetic & Ribbon Closures", "Custom Foam & Velvet Trays", "Book-Style & Neck-Box Formats"],
      image: "/images/service_custom_packaging.svg"
    },
    {
      num: "03",
      title: "Specialty Hot Foil Stamping",
      tag: "EMBELLISHMENT LINE",
      desc: "Computerized metallic hot foil stamping in gold, silver, rose gold, bronze, holographic, and satin films applied under high thermal pressure.",
      specs: ["Micro-Detail Foil Registration", "Holographic Anti-Counterfeit Foils", "Multi-Level Embossed Foiling"],
      image: "/images/service_luxury_finishes.svg"
    },
    {
      num: "04",
      title: "Structural CAD & Prototype Engineering",
      tag: "PRE-PRESS DIVISION",
      desc: "Custom box structural dieline engineering, ArtiosCAD 3D modeling, load-bearing weight testing, and unprinted 1:1 physical CAD sample plotting.",
      specs: ["Kongsberg Plotter CAD Sampling", "ArtiosCAD 3D Dieline Files", "Fit & Drop Test Verification"],
      image: "/images/service_corporate_collateral.svg"
    },
    {
      num: "05",
      title: "High-Definition Digital Printing",
      tag: "DIGITAL DIVISION",
      desc: "Rapid variable data, personalized short-run batches, and high-definition marketing collateral printed with zero plate setup costs.",
      specs: ["Variable Data & Barcode Printing", "Same-Day Proofing Runs", "Bespoke Packaging Labels"],
      image: "/images/service_product_labels.svg"
    },
    {
      num: "06",
      title: "Automated Die-Cutting & Creasing",
      tag: "FINISHING DIVISION",
      desc: "High-speed computerized heavy die-cutting, crease scoring, micro-perforation, window cutouts, and exact contour trim.",
      specs: ["Bobst Automatic Die-Cutters", "Clean Edge Cut Integrity", "Precise Window Patching"],
      image: "/images/service_cad_engineering.svg"
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
            <span className="text-white font-bold">Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                IN-HOUSE INDUSTRIAL MANUFACTURING DIVISIONS
              </span>
              <h1 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                END-TO-END <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  MANUFACTURING
                </span> <br />
                SERVICES.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                From structural CAD sample plotting to multi-color offset runs, artisanal hot foil stamping, and automated rigid box assembly — explore our comprehensive in-house manufacturing capabilities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/catalog" 
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
                >
                  <span>View Packaging Lines</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => downloadBrochure("Printing Solutions")}
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

      {/* CORE SERVICES GRID */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {servicesList.map((service, idx) => (
              <div 
                key={idx}
                className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:border-[#2563EB] transition-all duration-500"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full uppercase">
                      {service.tag}
                    </span>
                    <span className="font-syne text-3xl font-extrabold text-[#E11D48]">{service.num}</span>
                  </div>

                  <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white uppercase">{service.title}</h2>
                  <p className="text-[#E4E4E7] text-base leading-relaxed">{service.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                    {service.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL CAPACITY MATRIX */}
      <section className="py-24 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              FACTORY CAPACITY MATRIX
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              TECHNICAL SPECIFICATIONS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-[#E4E4E7] border-collapse">
              <thead>
                <tr className="border-b border-white/15 bg-[#121215] text-[#2563EB]">
                  <th className="p-4 font-bold uppercase">SERVICE PARAMETER</th>
                  <th className="p-4 font-bold uppercase">MAX SHEET / BOX CAPACITY</th>
                  <th className="p-4 font-bold uppercase">SUBSTRATES HANDLED</th>
                  <th className="p-4 font-bold uppercase">QUALITY CONTROL ACCURACY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-4 font-bold text-white">Commercial Offset Press</td>
                  <td className="p-4">720 x 1020 mm Sheet Size</td>
                  <td className="p-4">200-600 GSM Duplex, Kraft, Velvet Board</td>
                  <td className="p-4 text-[#2563EB]">Delta-E &lt; 1.5 Spectro Density</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Rigid Setup Box Line</td>
                  <td className="p-4">50,000 Units / Day Batch</td>
                  <td className="p-4">1000-2400 GSM Heavy Grey Chipboard</td>
                  <td className="p-4 text-[#2563EB]">Zero Corner Warp Tolerance</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Hot Foil Stamping</td>
                  <td className="p-4">High Thermal Speed Press</td>
                  <td className="p-4">Metallic Foil, Hologram, Satin Films</td>
                  <td className="p-4 text-[#2563EB]">0.1mm Registration Precision</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Structural CAD Plotter</td>
                  <td className="p-4">24-Hour Prototype Turnaround</td>
                  <td className="p-4">Corrugated Flute E/B/C, Chipboard</td>
                  <td className="p-4 text-[#2563EB]">100% Fit & Load Test Guarantee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#09090B] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            NEED CUSTOM TECHNICAL SERVICE SPECS?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Speak directly with our senior pre-press engineers to review your artwork, dielines, and material preferences.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Consult an Engineer
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

export default ServicesPage;
