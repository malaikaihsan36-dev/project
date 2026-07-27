import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Building2, 
  Factory, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ArrowUpRight, 
  Download, 
  Cpu, 
  Layers, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  Star,
  Users,
  Check
} from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadBrochure } from '../components/pdfHelper';

const TrustCenterPage = () => {
  const [activeTab, setActiveTab] = useState('machinery');
  const [faqCategory, setFaqCategory] = useState('orders');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "ColourPix Trust Center — Corporate Credibility & Quality Standards";
  }, []);

  const machineryRoster = [
    {
      id: "heidelberg",
      name: "Heidelberg Speedmaster XL 6-Color Offset Press",
      origin: "Germany",
      type: "Offset Press",
      specs: ["Max Sheet Size: 720 x 1020 mm", "Speed: 18,000 sheets/hour", "Delta-E Color Tolerance < 1.5", "Inline Water-Based Coating Unit"],
      precision: "0.01 mm Dot Registration",
      benefits: "Unmatched color density across long high-volume packaging press runs.",
      image: "/images/plant_press.png"
    },
    {
      id: "komori",
      name: "Komori Lithrone Commercial Press",
      origin: "Japan",
      type: "Offset Press",
      specs: ["5-Color + Varnish Tower", "Automated Spectrophotometer", "200-600 GSM Paperboard Capacity"],
      precision: "Ultra-Fine Raster Resolution",
      benefits: "Rapid setup changeover for corporate catalogues, brochures, and food cartons.",
      image: "/images/corporate_packaging.png"
    },
    {
      id: "indigo",
      name: "HP Indigo Industrial Digital Press",
      origin: "United States",
      type: "Digital Press",
      specs: ["Zero Plate Setup Fees", "Variable Data & Barcode Engine", "Same-Day Proofing Turnaround"],
      precision: "Liquid ElectroInk Offset Match",
      benefits: "Short-run customization and trial packaging batches without plate fees.",
      image: "/images/labels_stickers.png"
    },
    {
      id: "bobst",
      name: "Bobst Automatic Hot Foil Stamper & Die-Cutter",
      origin: "Switzerland",
      type: "Finishing Press",
      specs: ["High Thermal Pressure Transfer", "0.1mm Foil Registration Accuracy", "Clean Edge Steel Rule Die-Cut"],
      precision: "Micro-Foil Stamping Detail",
      benefits: "Prestige metallic gold, silver, holographic foil stamping and 3D embossing.",
      image: "/images/ecommerce_packaging.png"
    },
    {
      id: "kongsberg",
      name: "Kongsberg Automated CAD Plotter",
      origin: "Norway",
      type: "Structural CAD Engine",
      specs: ["1:1 Physical Sample Plotting", "ArtiosCAD 3D File Integration", "24-Hour Prototype Turnaround"],
      precision: "Exact Cut & Crease Score Geometry",
      benefits: "Rapid unprinted prototype creation for structural fit and load testing.",
      image: "/images/cad_dieline.png"
    }
  ];

  const qualityCheckpoints = [
    { num: "01", title: "Raw Material Verification", desc: "Inspecting GSM weight, caliper thickness, fiber grain direction, and burst strength of virgin Kraft & duplex paperboards before printing." },
    { num: "02", title: "Spectro Color Accuracy", desc: "Automated inline spectro-densitometers verifying ink film density to keep Pantone Delta-E variance strictly under 1.5." },
    { num: "03", title: "Press Run Consistency", desc: "Continuous sampling every 500 sheets checking trap alignment, ink drying rate, and varnish coverage across press runs." },
    { num: "04", title: "Finishing & Foil Audit", desc: "Inspecting hot foil stamping sharpness, flaking resistance, velvet soft-touch film lamination adhesion, and crease scoring." },
    { num: "05", title: "AQL 1.0 Final Drop & Load Check", desc: "AQL 1.0 sampling audit subjecting finished packaging to corner drop tests, compression stacking tests, and shipping seal checks." }
  ];

  const caseStudies = [
    {
      client: "Prestige Beauty Brand",
      category: "LUXURY RIGID PACKAGING",
      challenge: "Required a rigid setup box with a velvet soft-touch wrap and gold foil stamped logo that could withstand international freight without scuffing.",
      solution: "Engineered a 1400 GSM grey chipboard structure wrapped in 150 GSM soft-touch film with thermal foil stamping and high-density EVA foam inserts.",
      result: "Delivered 25,000 flawless rigid box units with 0% defect rate across export retail stores.",
      image: "/images/foil_emboss.png"
    },
    {
      client: "National FMCG Confectionery",
      category: "FOOD-GRADE PACKAGING",
      challenge: "Needed greaseproof barrier folding cartons compliant with food safety regulations for high-speed automated cartoning lines.",
      solution: "Manufactured virgin Kraft paperboard cartons with water-based dispersion barrier coating printed on our Heidelberg XL press.",
      result: "Achieved 100% FDA compliance and seamless integration with 120 carton/min automated packing machinery.",
      image: "/images/food_packaging.png"
    }
  ];

  const testimonials = [
    { name: "Tariq Mahmood", role: "Procurement Director", company: "FMCG Brand Network", quote: "ColourPix has been our primary packaging manufacturer for over 12 years. Their color consistency across millions of duplex cartons is unmatched in Pakistan." },
    { name: "Sadaf Chaudhry", role: "Brand Experience Manager", company: "Prestige Cosmetics", quote: "The luxury rigid setup boxes ColourPix engineered for our perfume launch received incredible feedback. The gold foil and velvet soft-touch finish are international grade." },
    { name: "Hamza Malik", role: "Supply Chain Manager", company: "Pharma Labs Ltd.", quote: "Their official LCCI registration and AQL 1.0 zero-defect quality control make procurement audits seamless. Delivery lead times are always respected." }
  ];

  const faqData = {
    orders: [
      { q: "What is your typical production lead time?", a: "Standard production lead time is 7 to 10 working days following artwork and physical CAD prototype approval. Expedited runs can be scheduled." },
      { q: "What is your Minimum Order Quantity (MOQ)?", a: "Custom packaging runs typically start from 500 to 1,000 units depending on box geometry and finishing complexity." }
    ],
    packaging: [
      { q: "Do you manufacture custom rigid boxes in-house?", a: "Yes. We operate our own automated rigid setup box lines in Lahore for luxury cosmetics, gifts, and apparel." },
      { q: "Can you provide unprinted physical prototype samples?", a: "Yes. We plot unprinted 1:1 physical CAD samples using our Kongsberg plotter for dimensional fit and load testing." }
    ],
    printing: [
      { q: "What printing presses do you operate?", a: "We operate European Heidelberg Speedmaster XL 6-color offset presses, Japanese Komori presses, and HP Indigo digital units." },
      { q: "How do you guarantee Pantone color matching?", a: "We utilize automated spectro-densitometers to measure ink film density and maintain Delta-E color variation strictly under 1.5." }
    ],
    materials: [
      { q: "What paperboard grades do you stock?", a: "We stock 200–600 GSM duplex board, 250–450 GSM virgin Kraft, food-grade barrier boards, and 1000–2400 GSM heavy grey chipboard." }
    ]
  };

  const handleDownloadProfile = () => {
    downloadBrochure("Trust Center");
  };

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* ========================================================= */}
      {/* TRUST CENTER HERO */}
      {/* ========================================================= */}
      <section className="relative py-28 sm:py-36 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/images/plant_press.png" 
            alt="ColourPix Plant Floor" 
            className="w-full h-full object-cover filter contrast-125 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/90 to-[#09090B]"></div>
        </div>

        <div className="absolute -top-32 left-1/3 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Trust Center</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                COLOURPIX CORPORATE TRUST & CREDIBILITY HUB
              </span>
              <h1 className="font-syne text-3xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                THE HEART OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  MANUFACTURING
                </span> <br />
                INTEGRITY.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Discover our 35-year legacy, LCCI registration (#1991-PK), European & Japanese machinery rosters, AQL 1.0 zero-defect quality control, and client case studies.
              </p>
              <button 
                onClick={handleDownloadProfile}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all inline-flex items-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                <Download className="w-4 h-4" />
                <span>Download Trust Profile (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* QUICK JUMP TABS */}
      {/* ========================================================= */}
      <section className="sticky top-20 z-40 bg-[#09090B]/90 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 overflow-x-auto no-scrollbar text-xs font-mono uppercase">
          <a href="#why-colourpix" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">Why ColourPix</a>
          <span>•</span>
          <a href="#machinery" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">Machinery Roster</a>
          <span>•</span>
          <a href="#quality-assurance" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">Quality Checkpoints</a>
          <span>•</span>
          <a href="#lcci" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">LCCI Certification</a>
          <span>•</span>
          <a href="#case-studies" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">Case Studies</a>
          <span>•</span>
          <a href="#testimonials" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">Testimonials</a>
          <span>•</span>
          <a href="#faq" className="hover:text-[#2563EB] text-[#A1A1AA] whitespace-nowrap">FAQ Hub</a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 1: WHY COLOURPIX */}
      {/* ========================================================= */}
      <section id="why-colourpix" className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] block">
                DIRECT MANUFACTURING CREDIBILITY
              </span>
              <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
                BUILT ON CRAFTSMANSHIP & INNOVATION
              </h2>
              
              <p className="text-white text-lg font-medium border-l-4 border-[#2563EB] pl-5 leading-relaxed">
                Unlike print resellers or third-party agencies who outsource contract fulfillment, ColourPix maintains complete vertical ownership of our physical production facility in Lahore.
              </p>

              <p className="text-[#A1A1AA] text-base leading-relaxed">
                Since 1991, ColourPix has established a proven track record as a trusted industrial print partner. By integrating CAD structural engineering, multi-color Heidelberg offset press lines, and Swiss Bobst embellishment technology under a single roof, we ensure absolute supply security and material compliance.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 sm:p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2">
                  <span className="font-syne text-4xl font-extrabold text-[#2563EB]">35+</span>
                  <h4 className="font-syne text-sm font-bold text-white uppercase">Years Experience</h4>
                  <p className="text-xs text-[#A1A1AA]">Continuous pressroom operations since 1991.</p>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2">
                  <span className="font-syne text-4xl font-extrabold text-white">#1991-PK</span>
                  <h4 className="font-syne text-sm font-bold text-white uppercase">LCCI Registered</h4>
                  <p className="text-xs text-[#A1A1AA]">Lahore Chamber of Commerce Member.</p>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2">
                  <span className="font-syne text-4xl font-extrabold text-[#E11D48]">100%</span>
                  <h4 className="font-syne text-sm font-bold text-white uppercase">In-House Plant</h4>
                  <p className="text-xs text-[#A1A1AA]">Direct manufacturing without brokers.</p>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2">
                  <span className="font-syne text-4xl font-extrabold text-[#2563EB]">AQL 1.0</span>
                  <h4 className="font-syne text-sm font-bold text-white uppercase">Zero Defect QC</h4>
                  <p className="text-xs text-[#A1A1AA]">Multi-stage quality inspection audit.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: OUR MACHINERY ROSTER */}
      {/* ========================================================= */}
      <section id="machinery" className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-3 block">
              EUROPEAN & JAPANESE PRESS INFRASTRUCTURE
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              OUR MACHINERY ROSTER
            </h2>
            <p className="text-[#A1A1AA] text-base">
              Inspect our high-speed Heidelberg offset presses, Bobst foil stampers, and Esko CAD plotters.
            </p>
          </div>

          <div className="space-y-12">
            {machineryRoster.map((mac, idx) => (
              <div 
                key={mac.id}
                className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:border-[#2563EB] transition-all shadow-2xl"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full uppercase">
                      ORIGIN: {mac.origin} • {mac.type}
                    </span>
                    <span className="font-syne text-3xl font-extrabold text-[#E11D48]">0{idx + 1}</span>
                  </div>

                  <h3 className="font-syne text-3xl font-extrabold text-white uppercase">{mac.name}</h3>

                  <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                    <span className="text-[10px] font-mono text-[#2563EB] uppercase block mb-1">PRECISION LEVEL</span>
                    <span className="text-sm font-bold text-white">{mac.precision}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block font-bold">CAPABILITY SPECIFICATIONS</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mac.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed pt-2 border-t border-white/10">
                    <strong className="text-white">PRIMARY BENEFIT:</strong> {mac.benefits}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                    <img 
                      src={mac.image} 
                      alt={mac.name} 
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

      {/* ========================================================= */}
      {/* SECTION 3: QUALITY ASSURANCE CHECKPOINTS */}
      {/* ========================================================= */}
      <section id="quality-assurance" className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              ZERO-DEFECT AQL 1.0 PROTOCOL
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              5-STAGE QUALITY CHECKPOINTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {qualityCheckpoints.map((qc, idx) => (
              <div key={idx} className="luxury-card p-6 rounded-2xl border border-white/10 space-y-4 hover:border-[#2563EB] transition-all">
                <span className="font-syne text-3xl font-extrabold text-[#2563EB] block">{qc.num}</span>
                <h3 className="font-syne text-base font-bold text-white uppercase">{qc.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{qc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: LCCI REGISTRATION */}
      {/* ========================================================= */}
      <section id="lcci" className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="p-10 sm:p-16 rounded-3xl bg-[#121215] border border-[#2563EB]/40 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1.5 rounded-full inline-block font-bold">
                  OFFICIAL CHAMBER REGISTRATION
                </span>

                <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
                  LAHORE CHAMBER OF COMMERCE MEMBER (#1991-PK)
                </h2>

                <p className="text-[#A1A1AA] text-base leading-relaxed">
                  ColourPix is an officially registered industrial company with the Lahore Chamber of Commerce & Industry. Registration #1991-PK provides corporate procurement officers with complete verification of our 35-year legal compliance, tax standing, and ethical manufacturing practices.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-white pt-2">
                  <div className="flex items-center gap-2 bg-[#09090B] px-4 py-2.5 rounded-xl border border-white/10">
                    <Building2 className="w-4 h-4 text-[#2563EB]" />
                    <span>LCCI Member #1991-PK</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#09090B] px-4 py-2.5 rounded-xl border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
                    <span>Verified Corporate Entity</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 text-center">
                <div className="p-8 rounded-2xl bg-[#09090B] border border-white/15 inline-block text-left space-y-4 shadow-xl">
                  <Award className="w-12 h-12 text-[#2563EB]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">OFFICIAL CERTIFICATION</span>
                    <span className="text-sm font-bold text-white block">LCCI Registered Member</span>
                    <span className="text-xs text-[#2563EB] font-mono font-bold">Registration Code: 1991-PK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: CASE STUDIES */}
      {/* ========================================================= */}
      <section id="case-studies" className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              REAL-WORLD MANUFACTURING PROOF
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              ENTERPRISE CASE STUDIES
            </h2>
          </div>

          <div className="space-y-16">
            {caseStudies.map((cs, idx) => (
              <div 
                key={idx}
                className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-[#2563EB] uppercase font-bold">{cs.category}</span>
                    <span className="text-xs font-mono text-[#A1A1AA]">{cs.client}</span>
                  </div>

                  <h3 className="font-syne text-3xl font-extrabold text-white uppercase">{cs.client} Case Study</h3>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                      <span className="text-[10px] text-[#E11D48] uppercase block font-bold mb-1">THE CHALLENGE</span>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">{cs.challenge}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                      <span className="text-[10px] text-[#2563EB] uppercase block font-bold mb-1">OUR MANUFACTURING SOLUTION</span>
                      <p className="text-xs text-white leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono text-white">
                    <strong className="text-[#2563EB]">MEASURABLE RESULT:</strong> {cs.result}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                    <img 
                      src={cs.image} 
                      alt={cs.client} 
                      className="w-full h-full object-cover filter contrast-125 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: CLIENT TESTIMONIALS */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              CLIENT TESTIMONIALS & REVIEWS
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              WHAT OUR CLIENTS SAY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="luxury-card p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#2563EB]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#2563EB]" />)}
                  </div>
                  <p className="text-xs text-[#E4E4E7] leading-relaxed italic">"{t.quote}"</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-syne text-sm font-bold text-white">{t.name}</h4>
                  <span className="text-[10px] font-mono text-[#2563EB] block">{t.role} • {t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: CATEGORIZED FAQ HUB */}
      {/* ========================================================= */}
      <section id="faq" className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-2 block">
              TRUST & CREDIBILITY FAQS
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {['orders', 'packaging', 'printing', 'materials'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  faqCategory === cat 
                    ? 'bg-[#2563EB] text-white font-bold' 
                    : 'bg-[#121215] text-[#A1A1AA] border border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {(faqData[faqCategory] || faqData.orders).map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-[#121215] border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-syne text-base font-bold text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#2563EB] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs text-[#A1A1AA] leading-relaxed border-t border-white/10 pt-4 font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FINAL CTA */}
      {/* ========================================================= */}
      <section className="py-28 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] block font-bold">
            TRUSTED BY 1,000+ CORPORATE ACCOUNTS
          </span>

          <h2 className="font-syne text-3xl sm:text-7xl font-extrabold uppercase text-white leading-tight">
            READY TO PARTNER WITH COLOURPIX?
          </h2>

          <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Request a bulk quotation, schedule a factory audit in Lahore, or order a physical CAD sample kit today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-9 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button 
              onClick={handleDownloadProfile}
              className="w-full sm:w-auto bg-[#121215] border border-white/15 text-white px-9 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all hover:border-white/30 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Trust Profile (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrustCenterPage;
