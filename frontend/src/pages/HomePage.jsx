import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBackground from '../layouts/AppBackground';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageTransition, ScrollReveal, useCountUp, useMagnetic } from '../components/animationHelper';
import { downloadBrochure } from '../components/pdfHelper';
import { 
  Building2, 
  ChevronDown,
  PhoneCall,
  Mail,
  ArrowUpRight, 
  Factory,
  CheckCircle2,
  Download,
  Eye,
  BookOpen
} from 'lucide-react';

const StatNumber = ({ endValue, suffix = "", colorClass = "text-[#2563EB]" }) => {
  const ref = useRef(null);
  const count = useCountUp(endValue, 2000, ref);
  return (
    <span ref={ref} className={`font-syne text-4xl sm:text-5xl font-extrabold block mb-1 ${colorClass}`}>
      {count}{suffix}
    </span>
  );
};
const HomePage = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';
  const navigate = useNavigate();
  const quoteBtnRef = useMagnetic(0.15);
  const catalogBtnRef = useMagnetic(0.15);

  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [capabilityFilter, setCapabilityFilter] = useState('ALL');

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    packagingType: 'Rigid Boxes',
    quantity: '1000',
    message: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    document.title = "ColourPix — Industrial Packaging & Printing Manufacturer (LCCI #1991-PK)";
    const fetchData = async () => {
      try {
        // Direct safe connection strings bina kisi variable ke
        const prodRes = await fetch(`${API_BASE_URL}/api/products`);
        const prodData = await prodRes.json();
        const popular = prodData.filter(p => p.is_popular === 1 || p.is_popular === true);
        setPopularProducts(popular);

        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        const catData = await catRes.json();
        setCategories(catData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endpoint call or success state
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: quoteForm.name,
          customer_email: quoteForm.email,
          customer_phone: quoteForm.phone,
          company: quoteForm.company,
          product_name: `Quote Request: ${quoteForm.packagingType}`,
          quantity: quoteForm.quantity,
          details: quoteForm.message,
          order_type: 'Quote Inquiry'
        })
      });
      setQuoteSubmitted(true);
      setTimeout(() => setQuoteSubmitted(false), 5000);
    } catch (error) {
      alert("Quote request submitted! Our team will contact you shortly.");
      setQuoteSubmitted(true);
    }
  };

  const trustIndicators = [
    { title: "35+ Years Experience", desc: "Crafting precision packaging since 1991" },
    { title: "Trusted Pakistani Manufacturer", desc: "State-of-the-art local industrial plant" },
    { title: "LCCI Registered", desc: "Lahore Chamber of Commerce & Industry" },
    { title: "Premium Quality Standards", desc: "Rigorous quality inspection & testing" },
    { title: "Custom Manufacturing", desc: "Bespoke dimensions, substrates & finishes" },
    { title: "Nationwide & International", desc: "Reliable bulk supply chain logistics" },
  ];

  const allCapabilitiesList = [
    { num: "01", title: "Offset Printing", category: "HEAVY PRINTING", desc: "Heidelberg & Komori multi-color commercial offset press runs with automated ink density calibration.", image: "/images/plant_press.png" },
    { num: "02", title: "Digital Printing", category: "HEAVY PRINTING", desc: "High-resolution digital print runs for rapid variable data, custom short-run batches, and instant proofs.", image: "/images/labels_stickers.png" },
    { num: "03", title: "UV Printing", category: "HEAVY PRINTING", desc: "Curing specialized UV inks and applying selective high-gloss spot UV varnish for rich visual depth.", image: "/images/foil_emboss.png" },
    { num: "04", title: "DTF Printing", category: "HEAVY PRINTING", desc: "Direct-to-Film high-density apparel, canvas, and industrial fabric transfer printing.", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop" },
    { num: "05", title: "Luxury Packaging", category: "PACKAGING & BOXES", desc: "Bespoke high-end retail packaging with magnetic closures, velvet inserts, and gold leaf accents.", image: "/images/foil_emboss.png" },
    { num: "06", title: "Food Packaging", category: "PACKAGING & BOXES", desc: "Food-grade barrier boards, greaseproof linings, and FDA-certified protective takeaway cartons.", image: "/images/food_packaging.png" },
    { num: "07", title: "Rigid Boxes", category: "PACKAGING & BOXES", desc: "Heavy-chipboard setup boxes for luxury cosmetics, perfumes, electronics, and executive gifts.", image: "/images/foil_emboss.png" },
    { num: "08", title: "Shopping Bags", category: "PACKAGING & BOXES", desc: "Custom paper shopping bags with reinforced handles, foil stamped logos, and heavy kraft stocks.", image: "/images/cad_dieline.png" },
    { num: "09", title: "Labels", category: "PACKAGING & BOXES", desc: "High-definition roll and sheet labels with waterproof, oil-resistant, and metallic foil finishes.", image: "/images/labels_stickers.png" },
    { num: "10", title: "Catalogues", category: "COMMERCIAL & BRANDING", desc: "Hardcover & softcover corporate product catalogues, saddle-stitched or perfect-bound.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" },
    { num: "11", title: "Brochures", category: "COMMERCIAL & BRANDING", desc: "Tri-fold, z-fold, and gate-fold marketing collateral printed on premium silk cardstocks.", image: "/images/commercial_printing.png" },
    { num: "12", title: "Corporate Printing", category: "COMMERCIAL & BRANDING", desc: "Executive letterheads, embossed business cards, presentation folders, and corporate brand kits.", image: "/images/commercial_printing.png" },
    { num: "13", title: "Retail Packaging", category: "PACKAGING & BOXES", desc: "Folding cartons, blister pack cards, product sleeves, and point-of-sale counter display boxes.", image: "/images/ecommerce_packaging.png" },
    { num: "14", title: "Promotional Material", category: "COMMERCIAL & BRANDING", desc: "Event banners, acrylic displays, customized corporate calendars, and merch kit packaging.", image: "/images/rigid_manufacturing.png" },
    { num: "15", title: "Luxury Finishes", category: "LUXURY FINISHING", desc: "Specialty surface treatments combining multiple metallic foils, raised varnishes, and micro-textures.", image: "/images/ecommerce_packaging.png" },
    { num: "16", title: "Foiling", category: "LUXURY FINISHING", desc: "Precision hot foil stamping in gold, silver, rose gold, holographic, and satin metallic films.", image: "/images/ecommerce_packaging.png" },
    { num: "17", title: "Embossing", category: "LUXURY FINISHING", desc: "Multi-level 3D raised embossing and debossing for tactile depth on logos, borders, and emblems.", image: "/images/foil_emboss.png" },
    { num: "18", title: "Spot UV", category: "LUXURY FINISHING", desc: "High-gloss raised spot UV varnish applied selectively over matte-laminated paperboard substrates.", image: "/images/foil_emboss.png" },
    { num: "19", title: "Soft Touch Lamination", category: "LUXURY FINISHING", desc: "Ultra-luxurious velvet soft-touch film lamination providing anti-scratch tactile elegance.", image: "/images/cad_dieline.png" },
    { num: "20", title: "Die Cutting", category: "PACKAGING & BOXES", desc: "Computerized structural die-cutting, scoring, creasing, perforation, and complex window cutouts.", image: "/images/plant_press.png" }
  ];

  const featuredPackaging = [
    { 
      title: "Luxury Rigid Boxes", 
      desc: "Designed for premium cosmetics, perfume, electronics, and executive corporate gifting.",
      tags: ["Collapsible", "Magnetic Closure", "Velvet Insert"],
      image: "/images/cosmetic_packaging.png"
    },
    { 
      title: "Custom Corrugated Mailers", 
      desc: "Heavy-duty eco-friendly e-commerce shipping boxes engineered for maximum protection.",
      tags: ["E-Commerce", "High Crash Resistance", "Custom Print"],
      image: "/images/ecommerce_packaging.png"
    },
    { 
      title: "Clinical Medicine & Pharma Packaging", 
      desc: "Tamper-evident, serialized medical boxes for pharmaceuticals, bottles, and health supplements.",
      tags: ["Pharma Grade", "Foil Stamped", "Clinical"],
      image: "/images/pharma_packaging.png"
    },
    { 
      title: "Gourmet Food & Confectionery Cartons", 
      desc: "FDA-certified food-grade paperboard packaging with greaseproof PLA inner lining.",
      tags: ["Food Safe", "Gold Embossed", "Eco Kraft"],
      image: "/images/food_packaging.png"
    }
  ];

  const luxuryFinishes = [
    { title: "Gold & Silver Metallic Foiling", desc: "Refined hot stamp foil accents that make your brand stand out on shelves." },
    { title: "Spot UV & 3D Tactile Coating", desc: "High-gloss selective varnish contrast overlaid on silky matte substrates." },
    { title: "Velvet Soft-Touch Lamination", desc: "Ultra-premium tactile velvet texture that conveys high luxury quality." },
    { title: "Precision Structural Die-Cutting", desc: "Complex custom cutouts, display windows, and exact dimensional folding." },
  ];

  const manufacturingJourney = [
    {
      num: "01",
      title: "Consultation",
      phase: "Phase 1: Pre-Press & Strategy",
      desc: "Initial technical audit, volume estimation, substrate consultation, and structural feasibility review with our senior sales engineers.",
      qc: "Requirements audit & MOQ verification",
      equipment: "Engineering Consultation & CAD Desk",
      image: "/images/plant_press.png"
    },
    {
      num: "02",
      title: "Design",
      phase: "Phase 1: Pre-Press & Strategy",
      desc: "CAD structural dieline engineering, graphic artwork layout, color separation, bleed verification, and 3D digital rendering.",
      qc: "Dieline accuracy & trap tolerance",
      equipment: "ArtiosCAD & Esko Pre-Press Workstation",
      image: "/images/corporate_packaging.png"
    },
    {
      num: "03",
      title: "Material Selection",
      phase: "Phase 1: Pre-Press & Strategy",
      desc: "Curating virgin Kraft, high-GSM duplex boards, rigid chipboards, velvet paperstocks, and eco-certified barrier substrates.",
      qc: "GSM density, burst test & grain direction",
      equipment: "Spectrophotometer & Caliper Testing",
      image: "/images/ecommerce_packaging.png"
    },
    {
      num: "04",
      title: "Prototype",
      phase: "Phase 1: Pre-Press & Strategy",
      desc: "Physical 1:1 unprinted CAD sample creation for dimensional fit testing, structural load testing, and client approval.",
      qc: "Structural fit & crease folding audit",
      equipment: "Kongsberg Automated Sample Plotter",
      image: "/images/cad_dieline.png"
    },
    {
      num: "05",
      title: "Offset Printing",
      phase: "Phase 2: Production & Printing",
      desc: "High-volume commercial offset printing using multi-color Heidelberg & Komori presses with automated ink density control.",
      qc: "Pantone color matching (Delta E < 1.5)",
      equipment: "Heidelberg Speedmaster XL 6-Color Press",
      image: "/images/plant_press.png"
    },
    {
      num: "06",
      title: "Digital Printing",
      phase: "Phase 2: Production & Printing",
      desc: "High-resolution digital print runs for rapid variable data, custom short-run batches, and personalized packaging collateral.",
      qc: "Dot alignment & resolution verification",
      equipment: "HP Indigo Industrial Digital Press",
      image: "/images/labels_stickers.png"
    },
    {
      num: "07",
      title: "UV Printing",
      phase: "Phase 2: Production & Printing",
      desc: "Curing specialized UV varnishes for selective high-gloss spot UV accents, chemical resistance, and rich tactile depth.",
      qc: "Gloss level & UV cure adhesion test",
      equipment: "Automated Spot UV Varnish Machine",
      image: "/images/foil_emboss.png"
    },
    {
      num: "08",
      title: "Foiling",
      phase: "Phase 3: Finishing & Embellishment",
      desc: "Precision hot foil stamping in metallic gold, silver, bronze, holographic, and satin foil films.",
      qc: "Foil sharpness, flaking test & registration",
      equipment: "Bobst Automatic Hot Foil Stamper",
      image: "/images/ecommerce_packaging.png"
    },
    {
      num: "09",
      title: "Embossing",
      phase: "Phase 3: Finishing & Embellishment",
      desc: "Tactile multi-level 3D embossing & debossing for raised logos, micro-textures, and premium brand marks.",
      qc: "Emboss depth & substrate tear prevention",
      equipment: "Heavy Duty Hydraulic Embossing Press",
      image: "/images/foil_emboss.png"
    },
    {
      num: "10",
      title: "Die Cutting",
      phase: "Phase 3: Finishing & Embellishment",
      desc: "High-speed computerized heavy die-cutting, scoring, creasing, perforation, and exact contour trim.",
      qc: "Clean edge cut & fold line creasing integrity",
      equipment: "Bobst High-Speed Automatic Die-Cutter",
      image: "/images/plant_press.png"
    },
    {
      num: "11",
      title: "Quality Inspection",
      phase: "Phase 4: QA, Assembly & Logistics",
      desc: "100% manual and optical inspection of color registration, foil adhesion, glue strength, and structural integrity.",
      qc: "AQL 1.0 zero-defect sampling audit",
      equipment: "High-Speed Optical Defect Scanner",
      image: "/images/plant_press.png"
    },
    {
      num: "12",
      title: "Packaging",
      phase: "Phase 4: QA, Assembly & Logistics",
      desc: "Automated rigid box assembly, corner gluing, tissue wrapping, shrink wrapping, and protective export bundling.",
      qc: "Drop test & moisture-barrier sealing",
      equipment: "Automated Box Folder & Gluer Line",
      image: "/images/cad_dieline.png"
    },
    {
      num: "13",
      title: "Delivery",
      phase: "Phase 4: QA, Assembly & Logistics",
      desc: "Tracked nationwide logistics dispatch across Karachi, Lahore, Islamabad, and international export container shipping.",
      qc: "Transit protection & delivery confirmation",
      equipment: "Logistics Fleet & Freight Logistics",
      image: "/images/ecommerce_packaging.png"
    }
  ];

  const industriesList = [
    { name: "FMCG & Food Packaging", count: "15+ Years Partnering" },
    { name: "Cosmetics & Beauty", count: "Luxury Grade Finish" },
    { name: "Pharmaceuticals", count: "Strict QC Standards" },
    { name: "Retail & Apparel", count: "Bespoke Brand Kits" },
    { name: "Electronics & Tech", count: "Protective Packaging" },
    { name: "E-Commerce & Logistics", count: "High-Volume Supply" },
  ];

  const faqs = [
    { 
      q: "Is ColourPix an official registered company in Pakistan?", 
      a: "Yes. ColourPix is an officially registered industrial manufacturer with the Lahore Chamber of Commerce & Industry (LCCI) with over 35 years of active manufacturing history." 
    },
    { 
      q: "What packaging products do you manufacture?", 
      a: "We manufacture luxury rigid boxes, corrugated shipping mailers, folding cartons, product packaging labels, luxury shopping bags, commercial marketing collateral, and custom corporate merchandise." 
    },
    { 
      q: "What is the typical minimum order quantity (MOQ)?", 
      a: "As a industrial manufacturer, our typical custom packaging production runs start from 500 to 1,000 units depending on the box structure and finishing requirements." 
    },
    { 
      q: "Do you offer pre-production physical samples?", 
      a: "Yes. We provide structural unprinted CAD mockups as well as full digital color proofs for client approval prior to initiating full bulk production." 
    },
    { 
      q: "Do you deliver packaging outside Lahore?", 
      a: "Absolutely. We manage nationwide distribution across Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and international freight dispatch for export clients." 
    }
  ];

  return (
    <AppBackground showGrid={false}>
      <NavBar />
      <div className="bg-[#09090B] text-[#FAFAFA] antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen relative text-left">
        
        {/* ========================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================= */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b border-[#27272A]/50">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#2563EB]/15 to-[#E11D48]/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Top Micro Header */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="trust-badge">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                ESTABLISHED 1991
              </div>
              <div className="trust-badge border-[#2563EB]/40 text-[#3B82F6]">
                OFFICIALLY LCCI REGISTERED
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              {/* Left Column: Massive Editorial Headline */}
              <div className="lg:col-span-8">
                <h1 className="font-syne text-4xl sm:text-8xl md:text-[6.5rem] lg:text-[7.5rem] font-extrabold uppercase tracking-tight text-white leading-[0.9] mb-8">
                  PRINTING <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E4E4E7] to-[#2563EB]">
                    THAT BUILDS
                  </span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E4E4E7] to-[#E11D48]">
                    BRANDS.
                  </span>
                </h1>
              </div>

              {/* Right Column: Subheading & CTAs */}
              <div className="lg:col-span-4 lg:pb-4">
                <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed font-normal mb-8 border-l-2 border-[#2563EB] pl-4">
                  For over <strong className="text-white">35 years</strong>, ColourPix has empowered corporate enterprises to manifest brand value through precision manufacturing. As a direct industrial plant, we deliver vertically integrated packaging substrates and commercial print editions characterized by structural complexity, material integrity, and direct factory-gate cost optimization.
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                  <a 
                    ref={quoteBtnRef}
                    href="#contact"
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-center px-8 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group btn-magnetic"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <Link 
                    ref={catalogBtnRef}
                    to="/catalog"
                    className="bg-[#121215] hover:bg-[#18181B] text-white text-center border border-white/15 px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all hover:border-white/30 flex items-center justify-center gap-2 btn-magnetic"
                  >
                    <span>Explore Our Work</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION: BUILT ON TRUST — WORLD-CLASS CREDIBILITY */}
        {/* ========================================================= */}
        <section id="trust" className="py-28 relative border-b border-[#27272A]/50 bg-[#0C0C0E]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Tag & Massive Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  OFFICIAL INSTITUTIONAL ACCREDITATION & RELIABILITY
                </span>
                <h2 className="font-syne text-3xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                  BUILT <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                    ON
                  </span> <br />
                  TRUST.
                </h2>
              </div>

              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-[#A1A1AA] text-base leading-relaxed font-normal mb-6">
                  For over three decades, ColourPix has earned the trust of Pakistan's leading enterprises through transparent manufacturing, legal chamber registration, and absolute quality integrity.
                </p>

                <div className="flex items-center gap-2 font-mono text-xs text-[#E4E4E7]">
                  <span className="text-[#2563EB] font-bold">LCCI MEMBER #1991-PK</span>
                  <span>•</span>
                  <span>100% IN-HOUSE PLANT</span>
                </div>
              </div>
            </div>

            {/* Factual Metrics Counter Strip */}
            <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[#121215] border border-white/10 mb-16 shadow-2xl">
              <div className="sm:border-r border-white/10 pr-6">
                <StatNumber endValue={35} suffix="+" colorClass="text-[#2563EB]" />
                <span className="text-xs font-mono text-white uppercase block font-bold">YEARS EXPERIENCE</span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Continuous operation since 1991</span>
              </div>

              <div className="md:border-r border-white/10 pr-6 pl-0 sm:pl-4">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-white block mb-1">
                  LCCI
                </span>
                <span className="text-xs font-mono text-white uppercase block font-bold">OFFICIAL REGISTERED</span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Member #1991-PK (Lahore)</span>
              </div>

              <div className="sm:border-r border-white/10 pr-6 pl-0 sm:pl-4">
                <StatNumber endValue={1000} suffix="+" colorClass="text-[#E11D48]" />
                <span className="text-xs font-mono text-white uppercase block font-bold">ENTERPRISE CLIENTS</span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Trusted across all 4 provinces</span>
              </div>

              <div className="pl-0 sm:pl-4">
                <StatNumber endValue={100} suffix="%" colorClass="text-[#2563EB]" />
                <span className="text-xs font-mono text-white uppercase block font-bold">IN-HOUSE PLANT</span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Zero reseller/broker margin</span>
              </div>
            </ScrollReveal>

            {/* 9 Trust Signal Pillars Grid */}
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "35+ Years of Experience",
                  desc: "Three decades of continuous industrial printing and packaging manufacturing in Lahore since 1991, offering deep material expertise."
                },
                {
                  title: "LCCI Registration Member",
                  desc: "Officially registered and accredited with the Lahore Chamber of Commerce & Industry (LCCI Member #1991-PK) for absolute contract safety."
                },
                {
                  title: "Trusted Pakistani Manufacturer",
                  desc: "100% direct owner-operated manufacturing facility in Lahore, eliminating middleman broker markups and external delays."
                },
                {
                  title: "Premium Manufacturing",
                  desc: "State-of-the-art plant equipped with European Heidelberg offset presses and advanced automated rigid box assembly lines."
                },
                {
                  title: "Quality Assurance Standard",
                  desc: "Enforcing strict AQL 1.0 zero-defect checks, burst-strength substrate testing, and Delta-E color density controls < 1.5."
                },
                {
                  title: "Custom Packaging Solutions",
                  desc: "In-house CAD dieline engineers mapping custom packaging structures and plotting physical 1:1 samples using Kongsberg cutters."
                },
                {
                  title: "Dedicated Account Support",
                  desc: "Personalized corporate relationship managers with a guaranteed 2-hour response time for structural audits and order progress."
                },
                {
                  title: "Nationwide Tracked Delivery",
                  desc: "Heavy-duty tracked bulk logistics providing reliable transit and shipping to Karachi, Lahore, Islamabad, Faisalabad, and nationwide."
                },
                {
                  title: "Direct Factory Pricing",
                  desc: "Transparent open-book factory quotes offering competitive pricing with direct access to physical swatches and sample kits."
                }
              ].map((pillar, pIdx) => (
                <div 
                  key={pIdx}
                  className="luxury-card p-8 rounded-2xl border border-white/10 hover:border-[#2563EB] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono text-[#2563EB] uppercase block mb-3 font-bold tracking-wider">
                      TRUST SIGNAL 0{pIdx + 1}
                    </span>
                    <h3 className="font-syne text-xl font-bold text-white mb-3 group-hover:text-[#2563EB] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span>VERIFIED PILLAR</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                  </div>
                </div>
              ))}
            </ScrollReveal>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: ABOUT COLOURPIX — A 35-YEAR STORY OF CRAFTSMANSHIP */}
        {/* ========================================================= */}
        <section id="about" className="py-28 relative border-b border-[#27272A]/50 bg-gradient-to-b from-[#09090B] via-[#0D0D0F] to-[#09090B]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Tag */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] block">
                OUR LEGACY & NARRATIVE
              </span>
              <span className="text-white/20">•</span>
              <span className="trust-badge border-[#2563EB]/40 text-[#3B82F6] text-[10px]">
                MANUFACTURER — NOT A RESELLER
              </span>
            </div>

            {/* Massive Headline */}
            <h2 className="font-syne text-3xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold uppercase text-white leading-[0.95] mb-12 tracking-tight">
              35 YEARS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                CRAFTSMANSHIP.
              </span>
            </h2>

            {/* Narrative Editorial Layout (2-Column Split) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
              
              {/* Story Column 1 */}
              <div className="lg:col-span-6 space-y-6 text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal">
                <p className="text-white text-xl font-medium leading-relaxed border-l-4 border-[#2563EB] pl-5">
                  We are not middle-men, brokers, or print shop vendors. ColourPix is a direct industrial manufacturer — owning and operating our own production plant in Lahore for over three decades.
                </p>
                <p>
                  Established in 1991 and officially registered with the <strong className="text-white">Lahore Chamber of Commerce & Industry (LCCI)</strong>, our journey began with a singular obsession: elevating printing from a commodity into an art form.
                </p>
                <p>
                  Because we manufacture everything in-house, we maintain 100% control over every square inch of paperboard, ink formulation, structural fold, and foil embellishment. Our clients never gamble with third-party print quality.
                </p>
              </div>

              {/* Story Column 2 */}
              <div className="lg:col-span-6 space-y-6 text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  Over 35 years, we have continuously invested in advanced European and Japanese offset printing presses alongside specialized luxury finishing lines. From automated rigid setup boxes to precision die-cutting and 3D tactile foiling, our facility bridges industrial scale with hand-crafted finesse.
                </p>
                <p>
                  Our customer-first philosophy means every brand receives dedicated structural engineering, rapid prototype sampling, and guaranteed production timelines. Trusted by over 1,000 corporate enterprises across Pakistan, ColourPix builds the physical touchpoints that define industry leaders.
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#27272A] font-mono text-center">
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/5">
                    <div className="font-syne text-2xl md:text-3xl font-extrabold text-[#2563EB]">1991</div>
                    <div className="text-[10px] text-[#A1A1AA] uppercase mt-1">FOUNDED</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/5">
                    <div className="font-syne text-2xl md:text-3xl font-extrabold text-white">100%</div>
                    <div className="text-[10px] text-[#A1A1AA] uppercase mt-1">OWNED PLANT</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/5">
                    <div className="font-syne text-2xl md:text-3xl font-extrabold text-[#E11D48]">LCCI</div>
                    <div className="text-[10px] text-[#A1A1AA] uppercase mt-1">REGISTERED</div>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* HISTORICAL MILESTONE TIMELINE */}
            {/* ========================================================= */}
            <div className="mt-20 pt-16 border-t border-[#27272A]/80">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-2 block">
                    CHRONOLOGY OF EXCELLENCE
                  </span>
                  <h3 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-white">
                    MAJOR MILESTONES (1991 – PRESENT)
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#A1A1AA] mt-2 md:mt-0">
                  35+ YEARS OF CONTINUOUS INDUSTRIAL INNOVATION
                </p>
              </div>

              <ScrollReveal className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  {
                    year: "1991",
                    title: "FOUNDING IN LAHORE",
                    desc: "Established as a single-press commercial printing house focused on precision color fidelity."
                  },
                  {
                    year: "2002",
                    title: "LCCI ACCREDITATION",
                    desc: "Expanded plant capacity, added multi-color offset presses, and received official LCCI registration."
                  },
                  {
                    year: "2012",
                    title: "RIGID BOX DIVISION",
                    desc: "Launched automated rigid box packaging lines for luxury cosmetics, electronics, and gifts."
                  },
                  {
                    year: "2018",
                    title: "SPECIALTY FINISHING",
                    desc: "Integrated computerized hot foil stamping, 3D tactile UV, and velvet soft-touch lamination lines."
                  },
                  {
                    year: "2026",
                    title: "35+ YEAR MILESTONE",
                    desc: "Serving 1,000+ national & international brands with over 50 million units manufactured."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="luxury-card p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between group hover:border-[#2563EB]">
                    <div>
                      <div className="font-syne text-3xl font-extrabold text-[#2563EB] mb-3 flex items-center justify-between">
                        <span>{item.year}</span>
                        <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                      </div>
                      <h4 className="font-syne text-sm font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal">{item.desc}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-white/40 group-hover:text-white/80 transition-colors">
                      MILESTONE 0{idx + 1}
                    </div>
                  </div>
                ))}
              </ScrollReveal>
            </div>

            {/* Factory Visual Showcase Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
                <img 
                  src="/images/plant_press.png" 
                  alt="Industrial Offset Press Facility" 
                  className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121215]/80 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] font-mono text-[#2563EB] uppercase block">DIRECT MANUFACTURER</span>
                  <span className="text-xs font-bold text-white">100% In-House Production Plant</span>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
                <img 
                  src="/images/ecommerce_packaging.png" 
                  alt="Luxury Packaging Finishing" 
                  className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121215]/80 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] font-mono text-[#E11D48] uppercase block">ARTISANAL CRAFTSMANSHIP</span>
                  <span className="text-xs font-bold text-white">Precision Foil Stamping & Finishing</span>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
                <img 
                  src="/images/foil_emboss.png" 
                  alt="LCCI Certified Production" 
                  className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121215]/80 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] font-mono text-[#3B82F6] uppercase block">LCCI REGISTERED</span>
                  <span className="text-xs font-bold text-white">Verified Lahore Industrial Facility</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: WORLD-CLASS CAPABILITIES — WHAT WE BUILD */}
        {/* ========================================================= */}
        <section id="capabilities" className="py-28 relative border-b border-[#27272A]/50 bg-[#0C0C0E]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Tag & Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  INDUSTRIAL PRODUCTION PORTFOLIO
                </span>
                <h2 className="font-syne text-3xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                  WHAT <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                    WE
                  </span> <br />
                  BUILD.
                </h2>
              </div>

              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-[#A1A1AA] text-base leading-relaxed font-normal mb-6">
                  From heavy offset printing to handcrafted luxury rigid boxes and specialty hot foiling — our plant manufactures 20 distinct industrial product categories under one roof.
                </p>

                <div className="flex items-center gap-2 font-mono text-xs text-[#E4E4E7]">
                  <span className="text-[#2563EB] font-bold">20 CAPABILITIES</span>
                  <span>•</span>
                  <span>PHOTOGRAPHY GALLERY</span>
                </div>
              </div>
            </div>

            {/* Filter Category Navigation Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6">
              {[
                { id: 'ALL', label: 'ALL CAPABILITIES (20)' },
                { id: 'PACKAGING & BOXES', label: 'PACKAGING & BOXES' },
                { id: 'HEAVY PRINTING', label: 'HEAVY PRINTING' },
                { id: 'LUXURY FINISHING', label: 'LUXURY FINISHING' },
                { id: 'COMMERCIAL & BRANDING', label: 'COMMERCIAL & BRANDING' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCapabilityFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    capabilityFilter === tab.id
                      ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                      : 'bg-[#121215] text-[#A1A1AA] border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Large Photography Cards Grid (No Generic Icons) */}
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCapabilitiesList
                .filter(item => capabilityFilter === 'ALL' || item.category === capabilityFilter)
                .map((item, idx) => (
                  <div 
                    key={idx}
                    className="group luxury-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#2563EB] transition-all duration-500 shadow-xl"
                  >
                    {/* Large Photography Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-black/20 to-transparent opacity-90"></div>
                      
                      {/* Top Badge Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                          {item.category}
                        </span>
                        <span className="font-syne font-extrabold text-xl text-[#2563EB]">
                          {item.num}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Footer */}
                    <div className="p-7 relative bg-[#121215] flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-syne text-2xl font-bold text-white mb-2 group-hover:text-[#2563EB] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-normal">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#E4E4E7]">
                        <span className="text-[#2563EB]">INDUSTRIAL GRADE</span>
                        <Link to="/catalog" className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                          <span>REQUEST SPEC SHEET</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </ScrollReveal>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: FEATURED PACKAGING */}
        {/* ========================================================= */}
        <section className="py-24 relative border-b border-[#27272A]/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-3 block">
                FEATURED PACKAGING SOLUTIONS
              </span>
              <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
                CRAFTED FOR LUXURY BRANDS
              </h2>
              <p className="text-[#A1A1AA] text-base font-normal">
                Explore our signature lines of rigid boxes, corrugated shipping mailers, precision labels, and bespoke retail packaging.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPackaging.map((item, idx) => (
                <div key={idx} className="group luxury-card luxury-card-red rounded-3xl overflow-hidden flex flex-col justify-between">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90"></div>
                  </div>
                  
                  <div className="p-8 relative -mt-12 bg-[#121215] border-t border-white/10 rounded-b-3xl">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono uppercase tracking-wider text-[#E4E4E7] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-syne text-2xl font-bold text-white mb-2 group-hover:text-[#E11D48] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>

                    <Link 
                      to="/catalog" 
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#E11D48] transition-colors"
                    >
                      <span>View Specifications</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: LUXURY FINISHING */}
        {/* ========================================================= */}
        <section id="luxury-finishing" className="py-24 relative border-b border-[#27272A]/50 bg-[#0D0D0F]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
                  SPECIALTY CRAFTSMANSHIP
                </span>
                <h2 className="font-syne text-4xl sm:text-5xl font-extrabold uppercase text-white mb-6 leading-tight">
                  LUXURY FINISHING & EMBELLISHMENTS
                </h2>
                <p className="text-[#A1A1AA] text-base leading-relaxed mb-8 font-normal">
                  Elevate your packaging with tactile and visual embellishments that command attention on retail shelves and unboxing experiences.
                </p>

                <div className="space-y-6">
                  {luxuryFinishes.map((finish, fIdx) => (
                    <div key={fIdx} className="p-5 rounded-xl bg-[#121215] border border-white/5 flex gap-4 items-start hover:border-[#2563EB]/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] font-mono font-bold text-xs shrink-0">
                        0{fIdx + 1}
                      </div>
                      <div>
                        <h4 className="font-syne font-bold text-white text-base mb-1">{finish.title}</h4>
                        <p className="text-xs text-[#A1A1AA] font-normal leading-relaxed">{finish.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img 
                      src="/images/ecommerce_packaging.png" 
                      alt="Gold Foil Stamping" 
                      className="rounded-2xl border border-white/10 h-64 w-full object-cover filter contrast-125"
                    />
                    <img 
                      src="/images/foil_emboss.png" 
                      alt="3D Embossed Detail" 
                      className="rounded-2xl border border-white/10 h-80 w-full object-cover filter contrast-125"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src="/images/cad_dieline.png" 
                      alt="Velvet Touch Lamination" 
                      className="rounded-2xl border border-white/10 h-80 w-full object-cover filter contrast-125"
                    />
                    <img 
                      src="/images/labels_stickers.png" 
                      alt="Precision Die Cut Box" 
                      className="rounded-2xl border border-white/10 h-64 w-full object-cover filter contrast-125"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: INDUSTRIES SERVED */}
        {/* ========================================================= */}
        <section className="py-24 relative border-b border-[#27272A]/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
                SECTORS & MARKET SEGMENTS
              </span>
              <h2 className="font-syne text-4xl sm:text-5xl font-extrabold uppercase text-white">
                INDUSTRIES SERVED
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industriesList.map((ind, iIdx) => (
                <div key={iIdx} className="luxury-card p-8 rounded-2xl border border-white/10 hover:border-[#2563EB] transition-all">
                  <span className="text-xs font-mono text-[#2563EB] uppercase block mb-2">SECTOR 0{iIdx + 1}</span>
                  <h3 className="font-syne text-2xl font-bold text-white mb-2">{ind.name}</h3>
                  <p className="text-xs text-[#A1A1AA] font-mono">{ind.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: INTERACTIVE MANUFACTURING PROCESS */}
        {/* ========================================================= */}
        <section id="process" className="py-28 relative border-b border-[#27272A]/50 bg-[#0C0C0E]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Tag & Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  INTERACTIVE INDUSTRIAL PRODUCTION JOURNEY
                </span>
                <h2 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                  FROM <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                    IDEA
                  </span> <br />
                  TO DELIVERY.
                </h2>
              </div>

              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-[#A1A1AA] text-base leading-relaxed font-normal mb-6">
                  Explore our complete 13-stage manufacturing pipeline. Select any stage to view precision quality control standards, technical equipment, and process specifications.
                </p>

                <div className="flex items-center gap-2 font-mono text-xs text-[#E4E4E7]">
                  <span className="text-[#2563EB] font-bold">13 STEPS</span>
                  <span>•</span>
                  <span>100% IN-HOUSE CONTROL</span>
                  <span>•</span>
                  <span className="text-[#E11D48]">AQL 1.0 QC</span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* ACTIVE STEP FEATURED SHOWCASE CARD */}
            {/* ========================================================= */}
            {manufacturingJourney[activeProcessStep] && (
              <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 mb-16 relative overflow-hidden transition-all duration-500 shadow-2xl">
                
                {/* Background Ambient Glow */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                  
                  {/* Left Column: Technical Details */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Phase Badge & Step Counter */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full">
                        {manufacturingJourney[activeProcessStep].phase}
                      </span>
                      <span className="font-syne text-3xl font-extrabold text-[#E11D48]">
                        {manufacturingJourney[activeProcessStep].num} / 13
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="font-syne text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
                      {manufacturingJourney[activeProcessStep].num}. {manufacturingJourney[activeProcessStep].title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#E4E4E7] text-base sm:text-lg leading-relaxed font-normal">
                      {manufacturingJourney[activeProcessStep].desc}
                    </p>

                    {/* QC & Machinery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">
                          QUALITY ASSURANCE CHECK
                        </span>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                          {manufacturingJourney[activeProcessStep].qc}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">
                          INDUSTRIAL EQUIPMENT
                        </span>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Factory className="w-4 h-4 text-[#E11D48]" />
                          {manufacturingJourney[activeProcessStep].equipment}
                        </span>
                      </div>
                    </div>

                    {/* Prev / Next Step Controls */}
                    <div className="flex items-center gap-4 pt-4">
                      <button 
                        onClick={() => setActiveProcessStep((prev) => (prev > 0 ? prev - 1 : 12))}
                        className="px-5 py-2.5 rounded-xl border border-white/15 bg-[#121215] text-xs font-mono uppercase tracking-wider text-white hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                      >
                        ← Previous Step
                      </button>

                      <button 
                        onClick={() => setActiveProcessStep((prev) => (prev < 12 ? prev + 1 : 0))}
                        className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono uppercase tracking-wider text-white transition-colors flex items-center gap-1"
                      >
                        <span>Next Step</span>
                        <span>→</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Industrial Step Image */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                      <img 
                        src={manufacturingJourney[activeProcessStep].image} 
                        alt={manufacturingJourney[activeProcessStep].title} 
                        className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                      
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121215]/90 backdrop-blur-md border border-white/10">
                        <span className="text-[10px] font-mono text-[#2563EB] uppercase block">STAGE {manufacturingJourney[activeProcessStep].num} VERIFIED</span>
                        <span className="text-xs font-bold text-white">{manufacturingJourney[activeProcessStep].title} Execution</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* 13-STEP GRID SELECTOR */}
            {/* ========================================================= */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                  SELECT ANY STEP TO EXPLORE (13 STAGES):
                </span>
                <span className="text-xs font-mono text-[#2563EB] font-bold">
                  STEP {activeProcessStep + 1} ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {manufacturingJourney.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveProcessStep(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between h-28 ${
                      activeProcessStep === idx 
                        ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105 z-10' 
                        : 'bg-[#121215] border-white/10 text-[#A1A1AA] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span className={`font-syne text-xl font-extrabold ${activeProcessStep === idx ? 'text-white' : 'text-[#2563EB]'}`}>
                      {step.num}
                    </span>
                    <div>
                      <span className="font-syne text-xs font-bold block truncate">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION: WHY CHOOSE COLOURPIX — THE DIRECT MANUFACTURING ADVANTAGE */}
        {/* ========================================================= */}
        <section id="why-choose-us" className="py-28 relative border-b border-[#27272A]/50 bg-gradient-to-b from-[#09090B] via-[#0D0D0F] to-[#09090B]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Tag & Editorial Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-4 block flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                  STRATEGIC ADVANTAGES OVER PRINT BROKERS & SHOP VENDORS
                </span>
                <h2 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                  THE DIRECT <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                    MANUFACTURING
                  </span> <br />
                  ADVANTAGE.
                </h2>
              </div>

              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-[#A1A1AA] text-base leading-relaxed font-normal mb-6">
                  In an industry filled with print brokers and third-party resellers, ColourPix stands apart as a direct owner-operated manufacturing facility. Every project benefits from absolute quality control, direct factory pricing, and guaranteed delivery.
                </p>

                <div className="flex items-center gap-2 font-mono text-xs text-[#E4E4E7]">
                  <span className="text-[#2563EB] font-bold">10 COMPETITIVE EDGES</span>
                  <span>•</span>
                  <span>ZERO BROKER MARKUP</span>
                </div>
              </div>
            </div>

            {/* Editorial 2-Column Split Index List (No Generic Cards / Icons) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 border-t border-[#27272A] pt-12">
              {[
                {
                  num: "01",
                  title: "35+ Years Industrial Legacy",
                  advantage: "Deep material and mechanical expertise built over three decades eliminates production trial-and-error, guaranteeing flawless structural execution from your first order."
                },
                {
                  num: "02",
                  title: "LCCI Registered & Accredited Company",
                  advantage: "Officially registered with the Lahore Chamber of Commerce & Industry (LCCI Member #1991-PK), providing corporate buyers with absolute contractual and financial peace of mind."
                },
                {
                  num: "03",
                  title: "Trusted Across Enterprise Pakistan",
                  advantage: "Serving 1,000+ top FMCG, pharmaceutical, cosmetic, and retail enterprises across Karachi, Lahore, Islamabad, and Faisalabad with high-capacity bulk production."
                },
                {
                  num: "04",
                  title: "State-of-the-Art In-House Machinery",
                  advantage: "Directly owned European and Japanese multi-color offset presses, automated rigid box folder-gluers, and high-speed die-cutters — eliminating middleman markups and delays."
                },
                {
                  num: "05",
                  title: "Bespoke Structural Packaging Solutions",
                  advantage: "In-house CAD dieline engineering tailored to your exact product dimensions, weight tolerances, transit durability specs, and unboxing aesthetics."
                },
                {
                  num: "06",
                  title: "Artisanal Luxury Finishing Line",
                  advantage: "Precision hot foil stamping, multi-level 3D tactile embossing, selective spot UV, and velvet soft-touch laminations executed under strict in-house tolerances."
                },
                {
                  num: "07",
                  title: "AQL 1.0 Zero-Defect Quality Assurance",
                  advantage: "Multi-stage optical and manual inspection protocols validating Pantone color density, fold creasing integrity, and glue adhesion prior to dispatch."
                },
                {
                  num: "08",
                  title: "Dedicated Pre-Press & Engineering Support",
                  advantage: "Direct access to senior pre-press engineers and technical account managers who guide your project from paperboard selection to final delivery."
                },
                {
                  num: "09",
                  title: "Guaranteed Delivery & Supply Chain Logistics",
                  advantage: "Streamlined production scheduling backed by tracked nationwide logistics to ensure on-time delivery for product launches, marketing campaigns, and retail restocks."
                },
                {
                  num: "10",
                  title: "Consistent Manufacturing & Color Repeatability",
                  advantage: "Spectrophotometer ink density and structural CAD profiles archived per client order, ensuring 100% color and dimensional accuracy on reorders years later."
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="group py-6 border-b border-[#27272A] hover:border-[#2563EB] transition-colors flex flex-col sm:flex-row sm:items-start gap-6"
                >
                  <span className="font-syne text-3xl font-extrabold text-[#2563EB] group-hover:text-[#E11D48] transition-colors shrink-0">
                    {item.num}
                  </span>
                  
                  <div>
                    <h3 className="font-syne text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed font-normal">
                      {item.advantage}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================= */}
        <section className="py-24 relative border-b border-[#27272A]/50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
                COMMON INQUIRIES
              </span>
              <h2 className="font-syne text-4xl sm:text-5xl font-extrabold uppercase text-white mb-4">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl bg-[#121215] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-syne font-bold text-lg text-white">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#2563EB] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-sm text-[#A1A1AA] leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7.5: FEATURED PUBLICATIONS SHOWCASE */}
        {/* ========================================================= */}
        <section className="relative py-24 border-b border-[#27272A]/50 bg-[#0C0C0E]">
          <div className="max-w-7xl mx-auto px-6 text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-2 block font-bold">
                  PUBLICATION LIBRARY & INSIGHTS
                </span>
                <h2 className="font-syne text-4xl sm:text-5xl font-extrabold uppercase text-white leading-tight">
                  Featured Publications
                </h2>
              </div>
              
              <Link 
                to="/knowledge-center"
                className="bg-[#121215] border border-white/10 text-white hover:border-white/20 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all inline-flex items-center gap-2"
              >
                <span>Explore Knowledge Center</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Publication: ColourPix Magazine */}
            <ScrollReveal>
              <div className="luxury-card p-8 md:p-12 rounded-3xl border border-white/15 bg-[#121215]/80 backdrop-blur-md mb-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-[#2563EB]/5 to-transparent blur-3xl pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left Column: Visual Cover */}
                  <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 bg-[#09090B] aspect-[4/3] flex items-center justify-center">
                    <img 
                      src="/images/corporate_packaging.png" 
                      alt="ColourPix Magazine Cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => navigate("/read/cp-mag-01")}
                        className="bg-white/15 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Metadata & CTAs */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                        ColourPix Magazine
                      </span>
                      <span className="text-[10px] font-mono text-white bg-[#E11D48] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                        Issue #01
                      </span>
                    </div>

                    <h3 className="font-syne text-3xl sm:text-4xl font-extrabold text-white uppercase leading-tight tracking-tight">
                      The Future of Premium Packaging
                    </h3>

                    <p className="text-[#A1A1AA] text-base leading-relaxed">
                      Explore the latest trends in luxury rigid packaging, Heidelberg offset press calibrations, and sustainability metrics in folding carton production.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <button 
                        onClick={() => navigate("/read/cp-mag-01")}
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

            {/* Showcase three additional resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Company Profile & Plant Roster",
                  category: "Corporate Documents",
                  desc: "Corporate handbook detailing our 35-year chronology, Lahore facility layout, and list of production equipment.",
                  downloadName: "Company Profile",
                  image: "/images/corporate_packaging.png"
                },
                {
                  title: "Material & Substrates Spec Guide",
                  category: "Industry Guides",
                  desc: "An engineer's handbook outlining duplex paperboard calibrations, Kraft card options, and greyboard density matrices.",
                  downloadName: "Packaging Solutions",
                  image: "/images/clothing_packaging.png"
                },
                {
                  title: "Packaging Solutions Catalogue",
                  category: "Catalogues",
                  desc: "Complete catalog of luxury rigid setup boxes, corrugated mailers, folding cartons, labels, and food packaging.",
                  downloadName: "Packaging Solutions",
                  image: "/images/ecommerce_packaging.png"
                }
              ].map((res, idx) => (
                <ScrollReveal key={idx}>
                  <div className="group rounded-2xl border border-white/10 overflow-hidden bg-[#121215]/60 backdrop-blur-sm flex flex-col h-full hover:border-[#2563EB]/40 hover:-translate-y-1.5 transition-all duration-500 justify-between">
                    <div className="relative h-44 overflow-hidden bg-[#09090B] border-b border-white/10">
                      <img 
                        src={res.image} 
                        alt={res.title} 
                        className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700" 
                      />
                      <span className="absolute top-3 left-3 z-10 text-[8px] font-mono uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-2 py-0.5 rounded-full font-bold backdrop-blur-md">
                        {res.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <h4 className="font-syne text-base font-bold text-white group-hover:text-[#2563EB] transition-colors leading-tight">
                          {res.title}
                        </h4>
                        <p className="text-[11px] text-[#A1A1AA] leading-relaxed line-clamp-3">
                          {res.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button 
                          onClick={() => downloadBrochure(res.downloadName)}
                          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 rounded-lg text-[9px] font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)] flex items-center justify-center gap-1"
                        >
                          <Download size={10} /> Download
                        </button>
                        <button 
                          onClick={() => downloadBrochure(res.downloadName)}
                          className="bg-transparent border border-white/10 text-white hover:border-white/20 py-2.5 rounded-lg text-[9px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1"
                        >
                          <Eye size={10} /> Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: FINAL CALL TO ACTION / REQUEST QUOTE FORM */}
        {/* ========================================================= */}
        <section id="contact" className="py-24 relative border-b border-[#27272A]/50 bg-gradient-to-b from-[#09090B] to-[#121215]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Direct Callout */}
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
                  INITIATE PRODUCTION
                </span>
                <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-6 leading-tight">
                  READY TO ELEVATE YOUR BRAND'S PACKAGING?
                </h2>
                <p className="text-[#A1A1AA] text-base leading-relaxed mb-8 font-normal">
                  Connect directly with our engineering and estimation team. Receive instant structural guidance, substrate samples, and bulk production quotes.
                </p>

                <div className="space-y-4 font-mono text-xs text-[#E4E4E7]">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#2563EB]" />
                    <span>colourpix.official@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#2563EB]" />
                    <span>+92 370 4123327 / +92 301 0144611</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Lahore Chamber of Commerce & Industry (LCCI) Registered</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Quote Form */}
              <div className="lg:col-span-7">
                <div className="luxury-card p-8 md:p-10 rounded-3xl border border-white/15">
                  <h3 className="font-syne text-2xl font-bold text-white mb-2">Request an Industrial Quote</h3>
                  <p className="text-xs font-mono text-[#A1A1AA] mb-6">Fill in your specifications for a custom bulk quotation.</p>

                  {quoteSubmitted && (
                    <div className="mb-6 p-4 rounded-xl bg-[#2563EB]/20 border border-[#2563EB] text-white text-sm font-medium">
                      ✓ Thank you! Your quote request has been received. Our sales engineer will reach out within 2 hours.
                    </div>
                  )}

                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Your Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Ali Khan" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Company / Brand Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Apex Consumer Goods" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                          value={quoteForm.company}
                          onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="name@company.com" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Phone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+92 300 1234567" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Packaging Type</label>
                        <select 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                          value={quoteForm.packagingType}
                          onChange={(e) => setQuoteForm({...quoteForm, packagingType: e.target.value})}
                        >
                          <option value="Rigid Boxes">Luxury Rigid Boxes</option>
                          <option value="Corrugated Boxes">Corrugated E-Commerce Boxes</option>
                          <option value="Product Labels">Product Labels & Stickers</option>
                          <option value="Retail Bags">Retail Shopping Bags</option>
                          <option value="Commercial Print">Commercial Offset Printing</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Estimated Quantity</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 2,500 units" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                          value={quoteForm.quantity}
                          onChange={(e) => setQuoteForm({...quoteForm, quantity: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">Project Details & Dimensions</label>
                      <textarea 
                        rows="3" 
                        placeholder="Mention box size, foil stamping requirements, or material preference..." 
                        className="w-full bg-[#09090B] border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#2563EB] transition-colors resize-none"
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-xl font-syne font-bold text-base tracking-wide uppercase shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
                    >
                      Submit Quote Request
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FOOTER */}
        {/* ========================================================= */}
      <Footer />
      </div>
    </AppBackground>
  );
};

export default HomePage;