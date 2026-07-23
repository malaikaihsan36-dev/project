import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, ShieldCheck, Factory, Building2, CheckCircle2, ChevronRight } from 'lucide-react';
import NavBar from '../components/Navbar';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us — 35 Years of Craftsmanship | ColourPix";
  }, []);

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* ========================================================= */}
      {/* CINEMATIC HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        {/* Background Image & Vignette */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=1600&auto=format&fit=crop" 
            alt="ColourPix Plant Floor" 
            className="w-full h-full object-cover filter contrast-125 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/90 to-[#09090B]"></div>
        </div>

        {/* Ambient Blur */}
        <div className="absolute -top-32 left-1/3 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                ESTABLISHED 1991 • LCCI MEMBER #1991-PK
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                35 YEARS OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  CRAFTSMANSHIP
                </span> <br />
                & INNOVATION.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                ColourPix is a trusted Pakistani printing and packaging manufacturer with over 35 years of industry experience. We own and operate our production facility in Lahore — delivering uncompromised quality, structural precision, and zero-broker transparency.
              </p>

              <div className="flex items-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2"
                >
                  <span>Work With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <span className="text-xs font-mono text-[#E4E4E7]">LCCI ACCREDITED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* NARRATIVE & CORPORATE ORIGIN */}
      {/* ========================================================= */}
      <section className="py-24 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] block">
                DIRECT MANUFACTURER — NOT A RESELLER
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white leading-tight">
                OUR STORY & PHILOSOPHY
              </h2>
              <p className="text-white text-xl font-medium border-l-4 border-[#2563EB] pl-5">
                We are not print brokers or shop vendors. ColourPix is a direct industrial manufacturer — owning and operating our multi-division production plant in Lahore.
              </p>
              <p>
                Founded in 1991, ColourPix was built on a single commitment: elevating commercial printing and custom packaging into strategic assets for brands. Over three decades, we have evolved from a specialized offset press room into an integrated packaging manufacturer serving over 1,000 corporate clients across Pakistan.
              </p>
              <p>
                Because we manufacture everything under one roof, our clients benefit from 100% material traceability, exact Pantone color consistency, and direct factory pricing with zero reseller markups.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop" 
                  alt="Engineering Consultation" 
                  className="w-full h-96 sm:h-[450px] object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#121215]/90 backdrop-blur-md border border-white/10">
                  <span className="text-xs font-mono text-[#2563EB] uppercase block font-bold mb-1">LAHORE INDUSTRIAL FACILITY</span>
                  <span className="text-sm font-bold text-white">Over 35 years of continuous manufacturing operations</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 35-YEAR HISTORICAL MILESTONES */}
      {/* ========================================================= */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-3 block">
              CHRONOLOGY OF EXCELLENCE
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white mb-4">
              HISTORICAL MILESTONES
            </h2>
            <p className="text-[#A1A1AA] text-base">
              A 35-year timeline of continuous machinery investments, facility expansion, and industrial mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { year: "1991", title: "FOUNDING IN LAHORE", desc: "Established as a commercial printing facility focused on color fidelity." },
              { year: "2002", title: "LCCI REGISTRATION", desc: "Expanded offset press capacity and received official LCCI accreditation (#1991-PK)." },
              { year: "2012", title: "RIGID BOX DIVISION", desc: "Launched automated rigid setup box production line for luxury cosmetics and gifts." },
              { year: "2018", title: "SPECIALTY FINISHING", desc: "Integrated computerized hot foil stamping, 3D tactile UV, and velvet soft-touch laminations." },
              { year: "2026", title: "35+ YEAR SCALE", desc: "Serving 1,000+ national and export brands with over 50 million manufactured units." }
            ].map((m, idx) => (
              <div key={idx} className="luxury-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#2563EB] transition-all">
                <div>
                  <span className="font-syne text-3xl font-extrabold text-[#2563EB] block mb-3">{m.year}</span>
                  <h3 className="font-syne text-sm font-bold text-white mb-2 uppercase">{m.title}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{m.desc}</p>
                </div>
                <span className="mt-6 text-[10px] font-mono text-[#A1A1AA] uppercase">STAGE 0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ACCREDITATION & CERTIFICATIONS */}
      {/* ========================================================= */}
      <section className="py-24 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 flex items-start gap-4">
              <Building2 className="w-10 h-10 text-[#2563EB] shrink-0" />
              <div>
                <h3 className="font-syne text-xl font-bold text-white mb-2">LCCI Member #1991-PK</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Officially registered with the Lahore Chamber of Commerce & Industry, offering complete corporate & legal compliance.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 flex items-start gap-4">
              <ShieldCheck className="w-10 h-10 text-[#E11D48] shrink-0" />
              <div>
                <h3 className="font-syne text-xl font-bold text-white mb-2">AQL 1.0 Zero-Defect Standard</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Multi-stage optical and manual inspection protocols verifying color density, fold creasing, and glue adhesion.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 flex items-start gap-4">
              <Factory className="w-10 h-10 text-white shrink-0" />
              <div>
                <h3 className="font-syne text-xl font-bold text-white mb-2">100% In-House Production</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  All offset printing, die-cutting, foiling, and box assembly performed in our Lahore plant without middleman delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA BANNER */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            READY TO WORK WITH A DIRECT MANUFACTURER?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Contact our engineering team today to receive CAD dielines, paperboard samples, or custom bulk quotations.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Request a Quotation
            </Link>
            <Link 
              to="/catalog" 
              className="bg-[#121215] border border-white/15 text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all hover:border-white/30"
            >
              Explore Packaging
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

export default AboutPage;
