import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Building2, 
  ShieldCheck, 
  Factory, 
  CheckCircle2, 
  ChevronRight, 
  Award, 
  Clock, 
  Users, 
  Truck, 
  Sparkles, 
  HeartHandshake, 
  Target, 
  Flame, 
  Check,
  Download
} from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadBrochure } from '../components/pdfHelper';
import { useParallax, ScrollReveal } from '../components/animationHelper';

const WhyColourPixPage = () => {
  const parallaxRef = useParallax(0.12);

  useEffect(() => {
    document.title = "Why ColourPix — 35+ Years Manufacturing Excellence | ColourPix";
  }, []);

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative py-28 sm:py-36 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        {/* Background Image & Ambient Blur */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            ref={parallaxRef}
            src="https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=1600&auto=format&fit=crop" 
            alt="ColourPix Plant Floor" 
            className="w-full h-full object-cover filter contrast-125 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/90 to-[#09090B]"></div>
        </div>

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2563EB]/15 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Why ColourPix</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                TRUST, SCALE & CRAFTSMANSHIP SINCE 1991
              </span>
              <h1 className="font-syne text-6xl sm:text-8xl md:text-9xl font-extrabold uppercase text-white leading-[0.92] tracking-tight">
                WHY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  COLOURPIX
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-8">
                For over 35 years, ColourPix has helped businesses transform ideas into premium printing and packaging solutions through precision manufacturing, innovation, and unwavering commitment to quality.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center gap-2"
                >
                  <span>Request a Quotation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => downloadBrochure("Why ColourPix")}
                  className="bg-[#121215] hover:bg-black text-white border border-white/10 px-7 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Info Brochure</span>
                </button>
                <span className="text-xs font-mono text-[#A1A1AA]">LCCI MEMBER #1991-PK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 1: 35 YEARS OF EXCELLENCE */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] block">
                01 / HISTORICAL LEGACY
              </span>
              <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
                35 YEARS OF INDUSTRIAL EXCELLENCE
              </h2>
              
              <p className="text-white text-xl font-medium border-l-4 border-[#2563EB] pl-5 leading-relaxed">
                Industrial experience is not a passive statistic—it represents the critical difference between retail shelf presence and structural supply chain failure.
              </p>

              <p className="text-[#A1A1AA] text-base leading-relaxed">
                Founded in 1991 in Lahore, our operations were established on a core engineering principle: delivering absolute substrate and color fidelity. Over three decades of steady technological scaling, we have expanded our initial press room into a multi-division industrial plant specializing in high-performance printing, custom structural folding cartons, and luxury rigid box packaging.
              </p>

              <p className="text-[#A1A1AA] text-base leading-relaxed">
                Over 35 years of industrial experience empowers our engineering teams to anticipate complex physical variables—such as paperboard grain behavior, ink absorbency ratios, and thermal foil adhesion limits—before sheet feeding begins.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="luxury-card p-8 rounded-3xl border border-white/15 space-y-6">
                <span className="text-xs font-mono text-[#2563EB] uppercase block font-bold tracking-wider">
                  35-YEAR MILESTONE HIGHLIGHTS
                </span>

                <div className="space-y-6 font-mono text-xs">
                  <div className="flex gap-4 border-b border-white/10 pb-4">
                    <span className="font-syne text-2xl font-extrabold text-[#2563EB]">1991</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">Founding in Lahore</h4>
                      <p className="text-[#A1A1AA] text-xs">Established as a specialized offset printing plant focused on precision color matching.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 border-b border-white/10 pb-4">
                    <span className="font-syne text-2xl font-extrabold text-[#E11D48]">2002</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">LCCI Official Accreditation</h4>
                      <p className="text-[#A1A1AA] text-xs">Registered with Lahore Chamber of Commerce & Industry (Member #1991-PK).</p>
                    </div>
                  </div>

                  <div className="flex gap-4 border-b border-white/10 pb-4">
                    <span className="font-syne text-2xl font-extrabold text-white">2012</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">Luxury Rigid Box Plant Addition</h4>
                      <p className="text-[#A1A1AA] text-xs">Integrated automated rigid setup box lines for cosmetics, perfumes, and luxury gifts.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="font-syne text-2xl font-extrabold text-[#2563EB]">2026</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">Nationwide & Export Scale</h4>
                      <p className="text-[#A1A1AA] text-xs">Serving over 1,000+ national brands across Pakistan with 50M+ manufactured items.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: MANUFACTURING, NOT MIDDLEMEN */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-3 block">
              02 / DIRECT FACTORY ADVANTAGE
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              MANUFACTURING, NOT MIDDLEMEN
            </h2>
            <p className="text-[#A1A1AA] text-base">
              ColourPix is a direct factory manufacturer. We own, maintain, and operate our production plant in Lahore.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <Factory className="w-8 h-8 text-[#2563EB]" />
                  <h3 className="font-syne text-2xl font-bold text-white uppercase">100% Owned Production Plant</h3>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Unlike print brokers or packaging agencies who outsource production to third-party commercial vendors, ColourPix executes 100% of our offset press runs, precision hot foil stamping, heavy-duty die-cutting, and manual box assembly internally at our Lahore facility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-[#2563EB] uppercase font-bold block">PRICE BENEFIT</span>
                  <h4 className="font-syne text-base font-bold text-white uppercase">Zero Markup</h4>
                  <p className="text-xs text-[#A1A1AA]">Direct factory pricing without middleman commission fees.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-[#E11D48] uppercase font-bold block">QUALITY CONTROL</span>
                  <h4 className="font-syne text-base font-bold text-white uppercase">100% Traceability</h4>
                  <p className="text-xs text-[#A1A1AA]">Direct accountability for raw paperboard and ink density.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop" 
                  alt="ColourPix Production Floor" 
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#121215]/90 backdrop-blur-md border border-white/10 text-xs font-mono">
                  <span className="text-[#2563EB] font-bold block mb-1">EQUIPMENT ROSTER</span>
                  <span className="text-white font-bold">Heidelberg Speedmaster XL • Komori Lithrone • Bobst Foil Stamper • Kongsberg CAD</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: TRUSTED BY BUSINESSES */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] block">
                03 / CORPORATE RELIABILITY
              </span>
              <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
                TRUSTED BY BUSINESSES NATIONWIDE
              </h2>
              
              <p className="text-[#A1A1AA] text-base leading-relaxed">
                Over 1,000 corporate enterprises nationwide rely on ColourPix to secure their product packaging supply lines. Our logistics and production teams operate with absolute operational discipline, recognizing that any delay in packaging delivery directly halts primary manufacturing and commercial product launches.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: "Long-Term Client Relationships", desc: "Over 80% of our production volume comes from repeat corporate accounts who have worked with us for over a decade." },
                  { title: "On-Time Production Schedules", desc: "Strict adherence to agreed press schedules with 7 to 10 day standard turnarounds." },
                  { title: "Dedicated Engineering Support", desc: "Direct access to senior pre-press engineers to review artwork bleed and dieline structural integrity." }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#121215] border border-white/10 space-y-1">
                    <h4 className="font-syne text-base font-bold text-white uppercase flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed pl-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 space-y-6">
                <span className="text-xs font-mono text-[#E11D48] uppercase block font-bold tracking-wider">
                  CORPORATE PERFORMANCE STATS
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#09090B] border border-white/10">
                    <span className="font-syne text-4xl font-extrabold text-[#2563EB] block mb-1">99.4%</span>
                    <span className="text-xs font-mono text-[#A1A1AA] uppercase">On-Time Dispatch Rate</span>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl bg-[#09090B] border border-white/10">
                    <span className="font-syne text-4xl font-extrabold text-white block mb-1">1,000+</span>
                    <span className="text-xs font-mono text-[#A1A1AA] uppercase">Corporate Accounts</span>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl bg-[#09090B] border border-white/10">
                    <span className="font-syne text-4xl font-extrabold text-[#E11D48] block mb-1">AQL 1.0</span>
                    <span className="text-xs font-mono text-[#A1A1AA] uppercase">Zero Defect Inspection</span>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl bg-[#09090B] border border-white/10">
                    <span className="font-syne text-4xl font-extrabold text-[#2563EB] block mb-1">50M+</span>
                    <span className="text-xs font-mono text-[#A1A1AA] uppercase">Packaging Units Run</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: LCCI REGISTERED */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="p-10 sm:p-16 rounded-3xl bg-[#121215] border border-[#2563EB]/40 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1.5 rounded-full inline-block font-bold">
                  OFFICIAL CORPORATE ACCREDITATION
                </span>

                <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
                  LAHORE CHAMBER OF COMMERCE REGISTERED MEMBER (#1991-PK)
                </h2>

                <p className="text-[#A1A1AA] text-base leading-relaxed">
                  ColourPix is officially registered with the Lahore Chamber of Commerce & Industry (LCCI). This registration reflects our full legal compliance, financial integrity, and 35-year commitment to corporate manufacturing standards in Pakistan.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-white pt-2">
                  <div className="flex items-center gap-2 bg-[#09090B] px-4 py-2.5 rounded-xl border border-white/10">
                    <Building2 className="w-4 h-4 text-[#2563EB]" />
                    <span>LCCI Member #1991-PK</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#09090B] px-4 py-2.5 rounded-xl border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
                    <span>Tax Registered Corporate Mfg</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <div className="p-8 rounded-2xl bg-[#09090B] border border-white/15 inline-block text-left space-y-4">
                  <Award className="w-12 h-12 text-[#2563EB]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">OFFICIAL CERTIFICATION</span>
                    <span className="text-sm font-bold text-white block">LCCI Registered Member</span>
                    <span className="text-xs text-[#2563EB] font-mono font-bold">Member Code: 1991-PK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: QUALITY WITHOUT COMPROMISE */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              05 / UNCOMPROMISED STANDARDS
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              QUALITY WITHOUT COMPROMISE
            </h2>
            <p className="text-[#A1A1AA] text-base">
              Every production run passes through rigorous optical and manual inspection stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
              <span className="font-syne text-3xl font-extrabold text-[#2563EB]">01</span>
              <h3 className="font-syne text-xl font-bold text-white uppercase">Raw Paperboard Inspection</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Verifying GSM density, fiber grain orientation, moisture content, and burst strength before any sheet touches the press room.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
              <span className="font-syne text-3xl font-extrabold text-[#E11D48]">02</span>
              <h3 className="font-syne text-xl font-bold text-white uppercase">Spectro Color Density Control</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Automated inline spectro-densitometers measuring ink film thickness to guarantee Pantone Delta-E color variation remains under 1.5.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
              <span className="font-syne text-3xl font-extrabold text-white">03</span>
              <h3 className="font-syne text-xl font-bold text-white uppercase">AQL 1.0 Final Box Inspection</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Manual inspection testing fold creasing integrity, corner glue bonding, foil sharpness, and drop test impact safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: WHAT MAKES US DIFFERENT */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] mb-3 block">
              06 / COMPETITIVE ADVANTAGE
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              WHAT MAKES US DIFFERENT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "35+ Years Experience", desc: "Decades of pressroom mastery ensuring flawless production runs." },
              { title: "In-House Manufacturing", desc: "100% owned Lahore plant — zero reseller middleman markups." },
              { title: "Premium Finishing Line", desc: "Hot foil stamping, 3D tactile UV, velvet soft-touch & embossing." },
              { title: "Advanced Machinery", desc: "European Heidelberg XL offset & Bobst automatic die-cutters." },
              { title: "Dedicated Support", desc: "Direct consultation with senior pre-press packaging engineers." },
              { title: "Nationwide Delivery", desc: "Tracked freight dispatch across Karachi, Lahore, and Islamabad." },
              { title: "Customized Solutions", desc: "Bespoke CAD dieline plotting for unique box structural forms." },
              { title: "Reliable Turnaround", desc: "7 to 10 day standard production lead times with zero delays." }
            ].map((diff, idx) => (
              <div 
                key={idx}
                className="luxury-card p-6 rounded-2xl border border-white/10 hover:border-[#2563EB] transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-syne text-base font-bold text-white uppercase">{diff.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: OUR VALUES */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              07 / CORE GUIDING PRINCIPLES
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              OUR CORPORATE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { val: "Craftsmanship", desc: "Treating every print run as an artisanal creation requiring exact calibration." },
              { val: "Precision", desc: "Zero tolerance for loose creasing, foil flaking, or out-of-spec dimensions." },
              { val: "Integrity", desc: "Transparent pricing, honest lead times, and genuine paperboard GSM specifications." },
              { val: "Partnership", desc: "Collaborating with clients as long-term manufacturing partners, not vendor transactions." },
              { val: "Innovation", desc: "Continuously investing in modern UV curing, digital indigo press & CAD plotters." },
              { val: "Customer Success", desc: "Ensuring your product packaging drives unboxing delight and retail shelf success." }
            ].map((v, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-[#2563EB] uppercase font-bold block">VALUE 0{idx + 1}</span>
                <h3 className="font-syne text-2xl font-bold text-white uppercase">{v.val}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: OUR PROMISE */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="luxury-card p-10 sm:p-16 rounded-3xl border border-white/15 text-center max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] block font-bold">
              THE COLOURPIX PROMISE
            </span>

            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white leading-tight">
              "WE TREAT EVERY CLIENT'S BRAND AS IF IT WERE OUR OWN."
            </h2>

            <p className="text-[#A1A1AA] text-base leading-relaxed">
              Whether you are an established enterprise ordering 500,000 cartons or a growing brand ordering 1,000 custom rigid boxes, your order receives the exact same level of engineering care, paperboard quality, and pressroom precision.
            </p>

            <div className="pt-4 flex justify-center items-center gap-2 text-xs font-mono text-[#2563EB]">
              <ShieldCheck className="w-5 h-5" />
              <span>GUARANTEED BY COLOURPIX EXECUTIVE MANAGEMENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: FACTUAL STATISTICS */}
      {/* ========================================================= */}
      <section className="py-24 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 text-center space-y-2">
              <span className="font-syne text-3xl sm:text-6xl font-extrabold text-[#2563EB] block">35+</span>
              <span className="text-xs font-mono text-white uppercase font-bold block">Years of Excellence</span>
              <span className="text-[10px] text-[#A1A1AA] block">Continuous Mfg History</span>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 text-center space-y-2">
              <span className="font-syne text-3xl sm:text-6xl font-extrabold text-white block">LCCI</span>
              <span className="text-xs font-mono text-white uppercase font-bold block">Member #1991-PK</span>
              <span className="text-[10px] text-[#2563EB] font-mono block">Registered Chamber Co.</span>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 text-center space-y-2">
              <span className="font-syne text-3xl sm:text-6xl font-extrabold text-[#E11D48] block">100%</span>
              <span className="text-xs font-mono text-white uppercase font-bold block">Custom Solutions</span>
              <span className="text-[10px] text-[#A1A1AA] block">Bespoke CAD Dielines</span>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 text-center space-y-2">
              <span className="font-syne text-3xl sm:text-6xl font-extrabold text-[#2563EB] block">NATIONWIDE</span>
              <span className="text-xs font-mono text-white uppercase font-bold block">& Export Logistics</span>
              <span className="text-[10px] text-[#A1A1AA] block">Tracked Container Freight</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: FINAL CTA */}
      {/* ========================================================= */}
      <section className="py-28 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] block font-bold">
            START YOUR MANUFACTURING PARTNERSHIP
          </span>

          <h2 className="font-syne text-3xl sm:text-7xl font-extrabold uppercase text-white leading-tight">
            LET'S CREATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
              SOMETHING EXCEPTIONAL.
            </span>
          </h2>

          <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Whether you are scaling an established brand or launching a new luxury product line, ColourPix is ready to deliver precision printing and packaging backed by 35+ years of manufacturing excellence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-9 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link 
              to="/portfolio" 
              className="w-full sm:w-auto bg-[#121215] border border-white/15 text-white px-9 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all hover:border-white/30 flex items-center justify-center"
            >
              Explore Our Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyColourPixPage;
