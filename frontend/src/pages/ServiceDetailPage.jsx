import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight, Factory, ShieldCheck, Printer, Cpu } from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const servicesData = {
  "offset-printing": {
    title: "Commercial Offset Printing",
    tag: "HEAVY PRESS DIVISION",
    headline: "HIGH-VOLUME MULTI-COLOR PRINT MANUFACTURING.",
    overview: "Our offset printing division operates state-of-the-art European Heidelberg Speedmaster and Japanese Komori 6-color presses. Equipped with inline varnish units and automated spectro-densitometers, we deliver unmatched color fidelity (Delta-E < 1.5) across millions of sheets.",
    equipment: "Heidelberg Speedmaster XL 6-Color Offset Press",
    specs: ["Max Sheet Size: 720 x 1020 mm", "Substrates: 200 - 600 GSM Duplex, Kraft, Velvet Board", "Color Calibration: Spectro-Densitometer Delta-E < 1.5", "Capacity: Over 500,000 sheets / day"],
    benefits: [
      "Lowest cost per unit on long high-volume press runs",
      "Exact Pantone Matching System (PMS) spot ink fidelity",
      "Inline aqueous varnish protection for instant drying",
      "Superior ink density and sharp halftone dot structure"
    ],
    applications: ["Rigid Box Wraps", "FMCG Cartons", "Product Sleeves", "High-Volume Brochures", "Corporate Catalogues"],
    image: "https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=1000&auto=format&fit=crop"
  },
  "digital-printing": {
    title: "High-Definition Digital Printing",
    tag: "DIGITAL DIVISION",
    headline: "RAPID SHORT-RUN & VARIABLE DATA PRINTING.",
    overview: "When speed, customization, or short-run agility is required, our HP Indigo industrial digital press delivers offset-matching liquid electro-ink quality without plate setup costs.",
    equipment: "HP Indigo Industrial Digital Press",
    specs: ["Zero Plate Setup Cost", "Variable Data & Serialized Barcode Printing", "Same-Day Proofing Runs", "Bespoke Packaging Labels"],
    benefits: [
      "Zero plate fees — ideal for short-run trial batches",
      "Personalized variable data (names, serial numbers, QR codes)",
      "Instant turn-around for marketing launch events",
      "Exact color consistency across small repeat orders"
    ],
    applications: ["Limited Edition Boxes", "Variable Data Labels", "Event Marketing Kits", "Personalized Collateral"],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
  },
  "uv-printing": {
    title: "Specialty UV & Spot UV Printing",
    tag: "GLOSS CONTRAST LINE",
    headline: "3D TACTILE GLOSS COATINGS & UV CURING.",
    overview: "Our automated spot UV coating line applies high-gloss liquid polymer varnishes cured instantly under high-intensity ultraviolet light. Available in flat spot UV or raised 3D tactile relief up to 100 microns.",
    equipment: "Automated Spot UV Varnish Machine",
    specs: ["Raised 3D Gloss up to 100 microns", "Chemical & Scratch Resistance", "Instant UV Light Polymerization Curing"],
    benefits: [
      "Dramatic tactile contrast when paired with velvet soft-touch film",
      "Protects brand logos from water and finger smudges",
      "Creates sensory unboxing experience for consumers"
    ],
    applications: ["Luxury Rigid Boxes", "Book & Catalogue Covers", "Perfume Cartons", "Premium Gift Packaging"],
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
  },
  "dtf-printing": {
    title: "Direct-to-Film (DTF) Fabric Printing",
    tag: "TEXTILE DIVISION",
    headline: "VIBRANT HIGH-DENSITY FABRIC & APPAREL PRINTING.",
    overview: "Our DTF textile division prints high-resolution pigment inks onto specialized PET transfer films, backed with hot-melt powder adhesive for crisp, stretchable garment decoration.",
    equipment: "Industrial Multi-Head DTF Transfer Printer",
    specs: ["High-Stretch Elasticity", "Multi-Color Pigment White Ink Base", "Wash-Fast Industrial Grade Adhesion"],
    benefits: [
      "Vibrant full-color prints on cotton, polyester, and dark fabrics",
      "Soft hand-feel with zero cracking after multiple washes",
      "No weeding required for intricate vector graphics"
    ],
    applications: ["Branded Corporate Apparel", "Custom Canvas Tote Bags", "Promotional Merchandise", "Uniforms"],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
  },
  "labels": {
    title: "Custom Product Labels & Stickers",
    tag: "LABEL MANUFACTURING",
    headline: "WATERPROOF, FOIL-STAMPED & DIE-CUT LABELS.",
    overview: "We manufacture high-performance adhesive product labels supplied on rolls or sheets for automated inline labeling machines or manual application.",
    equipment: "Rotary Die-Cut Label Press & Hot Stamper",
    specs: ["Waterproof Vinyl & Kraft Stocks", "Hot Foil Stamped Accents", "Roll & Sheet Supply Formats"],
    benefits: [
      "Oil & moisture resistant adhesive for food & cosmetic jars",
      "Custom die-cut shapes matching bottle contours",
      "Holographic anti-counterfeiting security foils"
    ],
    applications: ["Cosmetic Bottles", "Food & Sauce Jars", "Beverage Bottles", "Shipping Carton Labels"],
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1000&auto=format&fit=crop"
  },
  "catalogues": {
    title: "Corporate Catalogues & Publications",
    tag: "PUBLISHING DIVISION",
    headline: "EDITORIAL GRADE CATALOGUES & BRAND BOOKS.",
    overview: "From saddle-stitched product catalogues to hardbound luxury coffee table books, we deliver magazine-grade printing with velvet soft-touch covers and perfect binding.",
    equipment: "Heidelberg Press & Kolbus Perfect Binder",
    specs: ["Saddle Stitch & PUR Perfect Binding", "Soft-Touch Covers with Spot UV", "150-300 GSM Heavy Inner Pages"],
    benefits: [
      "Magazine-quality color vibrancy and registration",
      "Durable PUR glue binding that resists spine cracking",
      "Custom metallic foil cover accents for corporate impact"
    ],
    applications: ["Product Catalogues", "Annual Reports", "Brand Lookbooks", "Architectural Portfolios"],
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop"
  }
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesData[serviceId] || servicesData["offset-printing"];

  useEffect(() => {
    document.title = `${service.title} | ColourPix Services`;
  }, [service]);

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                {service.tag}
              </span>
              <h1 className="font-syne text-3xl sm:text-7xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                {service.title}
              </h1>
              <p className="font-syne text-xl text-[#2563EB] uppercase font-bold mt-4">
                {service.headline}
              </p>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base leading-relaxed font-normal mb-6">
                {service.overview}
              </p>
              <Link 
                to="/contact" 
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Request {service.title} Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CONTENT */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] block">
                TECHNICAL INFRASTRUCTURE
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white uppercase">
                EQUIPMENT & CAPABILITY SPECS
              </h2>
              
              <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 flex items-center gap-4">
                <Factory className="w-8 h-8 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">PRIMARY PRESS</span>
                  <span className="text-sm font-bold text-white">{service.equipment}</span>
                </div>
              </div>

              <div className="space-y-3">
                {service.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-[#121215] border border-white/10 text-xs font-mono text-white flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
              </div>
            </div>
          </div>

          {/* ADVANTAGES & APPLICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
              <h3 className="font-syne text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                KEY ADVANTAGES
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#E4E4E7]">
                {service.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
              <h3 className="font-syne text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                COMMON APPLICATIONS
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {service.applications.map((app, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            READY TO START YOUR {service.title.toUpperCase()} RUN?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Speak directly with our senior pre-press engineers to review your artwork, dielines, and paperboard options.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Get Service Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
