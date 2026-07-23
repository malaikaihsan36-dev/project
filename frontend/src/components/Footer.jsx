import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Building2, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#050507] border-t border-[#27272A] pt-20 pb-12 text-[#A1A1AA] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Newsletter & LCCI Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090B] border border-white/10 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold block">
              SUBSCRIBE TO INDUSTRIAL INSIGHTS
            </span>
            <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white uppercase">
              Stay Ahead in Packaging & Printing
            </h3>
            <p className="text-xs text-[#A1A1AA] font-normal max-w-md">
              Receive quarterly technical material guides, paperboard GSM trends, and pre-press dieline tips from senior engineers.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#2563EB]/20 border border-[#2563EB] text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                <span>Thank you! You've been subscribed to ColourPix Industrial Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email address..."
                  className="flex-1 bg-[#121215] border border-white/10 rounded-xl px-4 py-3.5 text-white text-xs outline-none focus:border-[#2563EB] transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl font-syne font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Subtle Horizontal Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 border-b border-white/10 pb-10 mb-10 text-left">
          {[
            { label: "ESTABLISHED 1991", val: "35+ Years Experience" },
            { label: "LCCI ACCREDITATION", val: "Member #1991-PK" },
            { label: "DIRECT MFG PLANT", val: "Lahore In-House Plant" },
            { label: "QUALITY STANDARDS", val: "AQL 1.0 QC Audits" },
            { label: "BULK LOGISTICS", val: "Nationwide Delivery" },
            { label: "CORPORATE SUPPORT", val: "2-Hour Response" }
          ].map((item, index) => (
            <div key={index} className="p-4 rounded-2xl bg-[#09090B] border border-white/5 flex flex-col justify-between hover:border-[#2563EB] transition-colors duration-300">
              <span className="text-[9px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1">{item.label}</span>
              <span className="text-xs font-bold text-white uppercase block">{item.val}</span>
            </div>
          ))}
        </div>

        {/* 4-Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#121215] border border-white/15 flex items-center justify-center text-white font-syne font-extrabold text-xl">
                C
              </div>
              <span className="font-syne text-2xl font-extrabold tracking-tight text-white">
                COLOUR<span className="text-[#2563EB]">PIX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] inline-block ml-0.5"></span>
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal max-w-sm">
              ColourPix is a trusted Pakistani packaging and printing manufacturer with over 35 years of industrial experience. We own and operate our production plant in Lahore — delivering uncompromised quality, structural precision, and direct factory transparency.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-white font-mono">
                <Building2 className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[#2563EB] font-bold">LCCI REGISTERED MEMBER #1991-PK</span>
              </div>
              <div className="flex items-center gap-2 text-[#A1A1AA]">
                <MapPin className="w-4 h-4 text-[#E11D48]" />
                <span>Lahore Industrial Plant, Punjab, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              CORPORATE
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/manufacturing" className="hover:text-white transition-colors">Manufacturing Plant</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio & Work</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Capabilities & Finishes */}
          <div>
            <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              DIVISIONS
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Luxury Rigid Boxes</Link></li>
              <li><Link to="/finishes" className="hover:text-white transition-colors">Hot Foil Stamping</Link></li>
              <li><Link to="/finishes" className="hover:text-white transition-colors">Spot UV & 3D Coating</Link></li>
              <li><Link to="/finishes" className="hover:text-white transition-colors">Velvet Soft-Touch</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Commercial Offset</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Digital Printing</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">DTF Fabric Printing</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources & Support */}
          <div>
            <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              RESOURCES
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/knowledge-center" className="hover:text-white transition-colors">Packaging Guide</Link></li>
              <li><Link to="/knowledge-center" className="hover:text-white transition-colors">Paperboard GSM Guide</Link></li>
              <li><Link to="/knowledge-center" className="hover:text-white transition-colors">Dieline Bleed Checklist</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Insights</Link></li>
              <li><Link to="/knowledge-center" className="hover:text-white transition-colors">Download Company Profile</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Request Sample Kit</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Accreditation Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[#A1A1AA]">
            <span>© 1991 – 2026 COLOURPIX PACKAGING & PRINTING MFG. ALL RIGHTS RESERVED.</span>
          </div>
          
          <div className="flex items-center gap-6 font-mono text-[10px]">
            <span className="text-[#2563EB] font-bold">LCCI MEMBER #1991-PK</span>
            <span>•</span>
            <span className="text-[#E11D48]">AQL 1.0 ZERO DEFECT QC</span>
            <span>•</span>
            <Link to="/admin-login" className="hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
