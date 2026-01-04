import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, Send, MessageCircle, ChevronDown } from 'lucide-react';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B0F1E] text-white antialiased overflow-x-hidden selection:bg-[#FF4D4D] selection:text-white font-sans min-h-screen relative text-left">
      
      {/* Background Glows */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#FF4D4D]/5 to-transparent"></div>
        <div className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] bg-[#FF4D4D]/10 blur-[120px] rounded-full"></div>
        <div className="absolute right-0 top-[10%] w-[30%] h-[30%] bg-[#FF9F43]/10 blur-[100px] rounded-full"></div>
      </div>

      {/* 1. NAVIGATION (Consistent with Home/Catalog) */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="size-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43] tracking-tight">Colour Pix</span>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button key="c-home" onClick={() => navigate('/')} className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Home</button>
                <button key="c-catalog" onClick={() => navigate('/catalog')} className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Products</button>
                <button key="c-portfolio" onClick={() => navigate('/portfolio')} className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Portfolio</button>
                <button key="c-contact" className="text-white px-3 py-2 text-sm font-medium transition-colors relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span>
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <button onClick={() => navigate('/catalog')} className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95">
                Start Designing
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="relative pt-32 pb-16 px-4 max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-white">
            Get in Touch with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]">COLOUR PIX</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Need help with your customization? We are here to assist. Fill out the form or chat with us instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7 bg-[#141A3A]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                  <input className="w-full rounded-xl border border-white/10 bg-[#0B0F1E]/50 h-14 px-6 focus:border-[#FF4D4D] outline-none transition-all" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input className="w-full rounded-xl border border-white/10 bg-[#0B0F1E]/50 h-14 px-6 focus:border-[#FF4D4D] outline-none transition-all" placeholder="hello@example.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0F1E]/50 h-14 px-6 focus:border-[#FF4D4D] outline-none transition-all cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Customization Help</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea className="w-full rounded-2xl border border-white/10 bg-[#0B0F1E]/50 min-h-[160px] p-6 focus:border-[#FF4D4D] outline-none transition-all resize-none" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button className="w-full md:w-auto px-10 h-14 rounded-xl bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,77,77,0.4)] transition-all active:scale-95">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-[#141A3A] rounded-3xl overflow-hidden h-64 relative group border border-white/5">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800" alt="Map" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 text-[#FF9F43] mb-1">
                  <MapPin size={18} />
                  <span className="font-bold text-xs uppercase tracking-widest">Headquarters</span>
                </div>
                <p className="text-white font-medium">123 Pixel Avenue, Design District, NY 10012</p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <ContactInfoCard icon={<Clock className="text-[#FF4D4D]" />} title="Working Hours" info="Mon-Fri, 9am - 6pm EST" />
              <ContactInfoCard icon={<Mail className="text-[#FF4D4D]" />} title="Email Support" info="support@colourpix.com" isLink link="mailto:support@colourpix.com" />
              <ContactInfoCard icon={<Phone className="text-[#FF4D4D]" />} title="Phone Support" info="+1 (555) 123-4567" isLink link="tel:+1234567890" />
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp */}
      <button className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-4 pr-6 rounded-full shadow-lg hover:-translate-y-1 transition-all">
        <div className="bg-white/20 p-2 rounded-full">
          <MessageCircle size={24} />
        </div>
        <div className="flex flex-col items-start text-left leading-none">
          <span className="text-[10px] opacity-80 mb-1 font-medium">Need help?</span>
          <span className="font-bold text-sm">WhatsApp Chat</span>
        </div>
      </button>
    </div>
  );
};

// Sub-component for Info Cards to keep code clean and prevent warnings
const ContactInfoCard = ({ icon, title, info, isLink, link }) => {
  const content = (
    <div className="bg-[#141A3A]/40 border border-white/5 p-6 rounded-2xl flex items-center gap-5 hover:border-white/10 transition-all group">
      <div className="size-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF4D4D]/20 transition-colors">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-white text-lg font-bold">{info}</p>
      </div>
    </div>
  );

  return isLink ? <a href={link} className="block">{content}</a> : <div>{content}</div>;
};

export default ContactPage;