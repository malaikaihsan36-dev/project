import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, FileText, BookOpen, CheckCircle2, ChevronRight, HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const ResourcesPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Technical Resources & Packaging Downloads | ColourPix";
  }, []);

  const faqs = [
    {
      q: "What is your typical turnaround time for bulk offset printing and packaging runs?",
      a: "Our standard production lead time is 7 to 10 working days following final CAD proof and artwork approval. Expedited emergency runs can be scheduled on our Heidelberg 6-color presses upon request."
    },
    {
      q: "Are you a direct packaging manufacturer or a print shop broker?",
      a: "ColourPix is 100% direct manufacturer. We own and operate our production facility in Lahore (LCCI Registered Member #1991-PK). There are zero third-party reseller markups or external print shop delays."
    },
    {
      q: "Can I receive physical 1:1 prototype samples before starting bulk manufacturing?",
      a: "Yes. We plot unprinted physical 1:1 CAD samples using our Kongsberg plotter for dimensional fit and load testing. Printed color press proofs can also be provided upon request."
    },
    {
      q: "What artwork file formats do your pre-press engineers accept?",
      a: "We accept Adobe Illustrator (.AI), Photoshop (.PSD), ArtiosCAD (.ARD), Vector PDF, and EPS files. All fonts must be outlined, and images embedded at minimum 300 DPI."
    },
    {
      q: "What paperboard GSM options do you stock?",
      a: "We stock 200–600 GSM duplex board, 250–450 GSM virgin Kraft, food-grade barrier boards, and 1000–2400 GSM heavy grey chipboards for luxury rigid setup boxes."
    }
  ];

  const handleDownloadProfile = () => {
    alert("Downloading ColourPix Corporate Profile PDF (LCCI Member #1991-PK)...");
  };

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Resources</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                PRE-PRESS & MATERIAL TECHNICAL DOCUMENTATION
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                TECHNICAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  PACKAGING
                </span> <br />
                RESOURCES.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Access pre-press dieline guidelines, paperboard GSM density matrices, Pantone color calibration standards, and corporate company documentation.
              </p>
              <button 
                onClick={handleDownloadProfile}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Corporate Profile (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADS & GUIDES GRID */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            <div className="luxury-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#2563EB] transition-all">
              <div>
                <FileText className="w-10 h-10 text-[#2563EB] mb-4" />
                <span className="text-[10px] font-mono text-[#2563EB] uppercase block font-bold mb-1">DOCUMENTATION</span>
                <h3 className="font-syne text-xl font-bold text-white mb-2">Company Profile 2026</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                  Official corporate profile detailing 35-year legacy, plant machinery roster, LCCI accreditation (#1991-PK), and client portfolio.
                </p>
              </div>
              <button 
                onClick={handleDownloadProfile}
                className="w-full bg-[#121215] border border-white/15 text-white py-3 rounded-xl text-xs font-mono uppercase hover:border-[#2563EB] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (4.2 MB)</span>
              </button>
            </div>

            <div className="luxury-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#2563EB] transition-all">
              <div>
                <BookOpen className="w-10 h-10 text-[#E11D48] mb-4" />
                <span className="text-[10px] font-mono text-[#E11D48] uppercase block font-bold mb-1">PRE-PRESS GUIDE</span>
                <h3 className="font-syne text-xl font-bold text-white mb-2">Dieline & Bleed Checklist</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                  Essential pre-press requirements for graphic designers: 3mm bleed allowance, vector outlining, and fold line scoring offsets.
                </p>
              </div>
              <Link 
                to="/blog" 
                className="w-full bg-[#121215] border border-white/15 text-white py-3 rounded-xl text-xs font-mono uppercase hover:border-[#2563EB] transition-colors flex items-center justify-center gap-2"
              >
                <span>Read Technical Guide</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="luxury-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#2563EB] transition-all">
              <div>
                <ShieldCheck className="w-10 h-10 text-white mb-4" />
                <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block font-bold mb-1">MATERIAL MATRIX</span>
                <h3 className="font-syne text-xl font-bold text-white mb-2">Paperboard GSM Selection</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                  Comprehensive guide matching duplex board weights (200-600 GSM) and rigid chipboard (1000-2400 GSM) to product load specs.
                </p>
              </div>
              <Link 
                to="/services" 
                className="w-full bg-[#121215] border border-white/15 text-white py-3 rounded-xl text-xs font-mono uppercase hover:border-[#2563EB] transition-colors flex items-center justify-center gap-2"
              >
                <span>View Capacity Matrix</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-2 block">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white">
                MANUFACTURING & ORDER FAQS
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#121215] border border-white/10 overflow-hidden transition-colors"
                >
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

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            NEED A CUSTOM TECHNICAL CONSULTATION?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Contact our senior pre-press team to review your packaging dielines and material options.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Contact Pre-Press Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
