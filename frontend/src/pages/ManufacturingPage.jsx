import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Factory, ShieldCheck, ChevronRight, Cpu, Layers, RefreshCw } from 'lucide-react';
import NavBar from '../components/Navbar';

const ManufacturingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = "Manufacturing Plant & Production Pipeline | ColourPix";
  }, []);

  const manufacturingJourney = [
    { num: "01", title: "Consultation", phase: "Phase 1: Pre-Press & Strategy", desc: "Initial technical audit, volume estimation, substrate consultation, and structural feasibility review with our senior sales engineers.", qc: "Requirements audit & MOQ verification", equipment: "Engineering Consultation & CAD Desk", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
    { num: "02", title: "Design", phase: "Phase 1: Pre-Press & Strategy", desc: "CAD structural dieline engineering, graphic artwork layout, color separation, bleed verification, and 3D digital rendering.", qc: "Dieline accuracy & trap tolerance", equipment: "ArtiosCAD & Esko Pre-Press Workstation", image: "https://images.unsplash.com/photo-1542744094-3a3121699493?q=80&w=800&auto=format&fit=crop" },
    { num: "03", title: "Material Selection", phase: "Phase 1: Pre-Press & Strategy", desc: "Curating virgin Kraft, high-GSM duplex boards, rigid chipboards, velvet paperstocks, and eco-certified barrier substrates.", qc: "GSM density, burst test & grain direction", equipment: "Spectrophotometer & Caliper Testing", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
    { num: "04", title: "Prototype", phase: "Phase 1: Pre-Press & Strategy", desc: "Physical 1:1 unprinted CAD sample creation for dimensional fit testing, structural load testing, and client approval.", qc: "Structural fit & crease folding audit", equipment: "Kongsberg Automated Sample Plotter", image: "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?q=80&w=800&auto=format&fit=crop" },
    { num: "05", title: "Offset Printing", phase: "Phase 2: Production & Printing", desc: "High-volume commercial offset printing using multi-color Heidelberg & Komori presses with automated ink density control.", qc: "Pantone color matching (Delta E < 1.5)", equipment: "Heidelberg Speedmaster XL 6-Color Press", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
    { num: "06", title: "Digital Printing", phase: "Phase 2: Production & Printing", desc: "High-resolution digital print runs for rapid variable data, custom short-run batches, and personalized packaging collateral.", qc: "Dot alignment & resolution verification", equipment: "HP Indigo Industrial Digital Press", image: "https://images.unsplash.com/photo-1620987278429-ab178d6eb547?q=80&w=800&auto=format&fit=crop" },
    { num: "07", title: "UV Printing", phase: "Phase 2: Production & Printing", desc: "Curing specialized UV varnishes for selective high-gloss spot UV accents, chemical resistance, and rich tactile depth.", qc: "Gloss level & UV cure adhesion test", equipment: "Automated Spot UV Varnish Machine", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
    { num: "08", title: "Foiling", phase: "Phase 3: Finishing & Embellishment", desc: "Precision hot foil stamping in metallic gold, silver, bronze, holographic, and satin foil films.", qc: "Foil sharpness, flaking test & registration", equipment: "Bobst Automatic Hot Foil Stamper", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
    { num: "09", title: "Embossing", phase: "Phase 3: Finishing & Embellishment", desc: "Tactile multi-level 3D embossing & debossing for raised logos, micro-textures, and premium brand marks.", qc: "Emboss depth & substrate tear prevention", equipment: "Heavy Duty Hydraulic Embossing Press", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
    { num: "10", title: "Die Cutting", phase: "Phase 3: Finishing & Embellishment", desc: "High-speed computerized heavy die-cutting, scoring, creasing, perforation, and exact contour trim.", qc: "Clean edge cut & fold line creasing integrity", equipment: "Bobst High-Speed Automatic Die-Cutter", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
    { num: "11", title: "Quality Inspection", phase: "Phase 4: QA, Assembly & Logistics", desc: "100% manual and optical inspection of color registration, foil adhesion, glue strength, and structural integrity.", qc: "AQL 1.0 zero-defect sampling audit", equipment: "High-Speed Optical Defect Scanner", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
    { num: "12", title: "Packaging", phase: "Phase 4: QA, Assembly & Logistics", desc: "Automated rigid box assembly, corner gluing, tissue wrapping, shrink wrapping, and protective export bundling.", qc: "Drop test & moisture-barrier sealing", equipment: "Automated Box Folder & Gluer Line", image: "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?q=80&w=800&auto=format&fit=crop" },
    { num: "13", title: "Delivery", phase: "Phase 4: QA, Assembly & Logistics", desc: "Tracked nationwide logistics dispatch across Karachi, Lahore, Islamabad, and international export container shipping.", qc: "Transit protection & delivery confirmation", equipment: "Logistics Fleet & Freight Logistics", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" }
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
            <span className="text-white font-bold">Manufacturing</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                100% IN-HOUSE PLANT IN LAHORE
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                STATE-OF-THE-ART <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  MANUFACTURING
                </span> <br />
                FACILITY.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Step inside ColourPix's 100% owned production plant in Lahore. Take an in-depth interactive tour of our 13-stage manufacturing pipeline and advanced European and Japanese press infrastructure.
              </p>
              <Link 
                to="/contact" 
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Schedule a Plant Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 13-STEP PRODUCTION PIPELINE */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-3 block">
              PRECISION WORKFLOW
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              THE 13-STAGE PRODUCTION JOURNEY
            </h2>
            <p className="text-[#A1A1AA] text-base">
              Select any stage below to inspect our machinery, quality assurance checks, and execution standards.
            </p>
          </div>

          {/* ACTIVE STEP FEATURED CARD */}
          {manufacturingJourney[activeStep] && (
            <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 mb-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono uppercase text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full">
                      {manufacturingJourney[activeStep].phase}
                    </span>
                    <span className="font-syne text-3xl font-extrabold text-[#E11D48]">
                      {manufacturingJourney[activeStep].num} / 13
                    </span>
                  </div>

                  <h3 className="font-syne text-4xl font-extrabold text-white uppercase">
                    {manufacturingJourney[activeStep].num}. {manufacturingJourney[activeStep].title}
                  </h3>

                  <p className="text-[#E4E4E7] text-base sm:text-lg leading-relaxed">
                    {manufacturingJourney[activeStep].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                      <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-1">QUALITY CHECK</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                        {manufacturingJourney[activeStep].qc}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090B] border border-white/10">
                      <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-1">EQUIPMENT USED</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Factory className="w-4 h-4 text-[#E11D48]" />
                        {manufacturingJourney[activeStep].equipment}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 12))}
                      className="px-5 py-2.5 rounded-xl border border-white/15 bg-[#121215] text-xs font-mono uppercase text-white hover:border-[#2563EB]"
                    >
                      ← Previous
                    </button>
                    <button 
                      onClick={() => setActiveStep((prev) => (prev < 12 ? prev + 1 : 0))}
                      className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-xs font-mono uppercase text-white hover:bg-[#1D4ED8]"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                    <img 
                      src={manufacturingJourney[activeStep].image} 
                      alt={manufacturingJourney[activeStep].title} 
                      className="w-full h-full object-cover filter contrast-125 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 13-STEP GRID SELECTOR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {manufacturingJourney.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all h-28 flex flex-col justify-between ${
                  activeStep === idx 
                    ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105 z-10' 
                    : 'bg-[#121215] border-white/10 text-[#A1A1AA] hover:border-white/30 hover:text-white'
                }`}
              >
                <span className={`font-syne text-xl font-extrabold ${activeStep === idx ? 'text-white' : 'text-[#2563EB]'}`}>
                  {step.num}
                </span>
                <span className="font-syne text-xs font-bold truncate">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MACHINERY ROSTER */}
      <section className="py-24 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              EUROPEAN & JAPANESE MACHINERY
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              PLANT INFRASTRUCTURE ROSTER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10">
              <Cpu className="w-10 h-10 text-[#2563EB] mb-4" />
              <h3 className="font-syne text-xl font-bold text-white mb-2">Heidelberg Speedmaster XL</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                6-color heavy commercial offset printing press equipped with automated spectrophotometer ink density control.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10">
              <Layers className="w-10 h-10 text-[#E11D48] mb-4" />
              <h3 className="font-syne text-xl font-bold text-white mb-2">Bobst Automatic Foil Stamper</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                High-speed automatic foil stamping & die-cutting press delivering 0.1mm micro-registration accuracy.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10">
              <RefreshCw className="w-10 h-10 text-white mb-4" />
              <h3 className="font-syne text-xl font-bold text-white mb-2">Automated Rigid Box Folder</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Continuous high-speed rigid setup box folder-gluer line capable of 50,000 daily units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#09090B] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            REQUEST A FACTORY PLANT AUDIT
          </h2>
          <p className="text-[#A1A1AA] text-base">
            We invite corporate procurement officers and packaging managers to inspect our Lahore plant facility in person.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Book Plant Visit
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

export default ManufacturingPage;
