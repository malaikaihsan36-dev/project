import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, Send, MessageCircle, ChevronDown, CheckCircle, Search } from 'lucide-react';

const ContactPage = () => {
  const navigate = useNavigate();
  
  // Form Logic
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#0B0F1E] text-white antialiased overflow-x-hidden selection:bg-[#10B981] selection:text-white font-sans min-h-screen relative text-left">
      
      {/* Background Green Glows */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#10B981]/5 to-transparent"></div>
        <div className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] bg-[#10B981]/10 blur-[120px] rounded-full"></div>
      </div>

      {/* 1. EXACT ORIGINAL HEADER */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="size-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43]">Colour Pix</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'Products', 'Portfolio'].map((item) => (
                <button key={item} onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)} 
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors">{item}</button>
              ))}
              <button onClick={() => navigate('/reviews')} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Reviews</button>
              <button className="text-white text-sm font-bold relative">
                Contact
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <Search size={18} className="text-gray-500" />
                <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-gray-600 outline-none" placeholder="Search..." />
              </div>
              <button className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] px-6 py-2 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT - EXACT LAYOUT RETAINED */}
      <main className="relative pt-32 pb-16 px-4 max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-white">
            Get in Touch with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#34D399]">COLOUR PIX</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Need help with your customization? We are here to assist. Fill out the form or chat with us instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section - Original Col Span 7 */}
          <div className="lg:col-span-7 bg-[#141A3A]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <div className="size-20 bg-[#10B981]/20 text-[#10B981] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">Message Sent!</h3>
                <p className="text-gray-400">We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-8 text-white">Send us a message</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-[#0B0F1E]/50 h-14 px-6 focus:border-[#10B981] outline-none transition-all" placeholder="John Doe" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input required name="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-[#0B0F1E]/50 h-14 px-6 focus:border-[#10B981] outline-none transition-all" placeholder="hello@example.com" type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                    <div className="relative">
                      <select name="subject" value={formData.subject} onChange={handleChange} className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0F1E]/50 h-14 px-6 focus:border-[#10B981] outline-none transition-all cursor-pointer">
                        <option className="bg-[#0B0F1E]">General Inquiry</option>
                        <option className="bg-[#0B0F1E]">Order Support</option>
                        <option className="bg-[#0B0F1E]">Customization Help</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-[#0B0F1E]/50 min-h-[160px] p-6 focus:border-[#10B981] outline-none transition-all resize-none" placeholder="Tell us how we can help..."></textarea>
                  </div>
                  <button type="submit" className="w-full md:w-auto px-10 h-14 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-[#060A14] font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95">
                    Send Message <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info Section - Original Col Span 5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#141A3A] rounded-3xl overflow-hidden h-64 relative group border border-white/5">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800" alt="Map" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <div className="flex items-center gap-2 text-[#10B981] mb-1">
                  <MapPin size={18} />
                  <span className="font-bold text-xs uppercase tracking-widest">Headquarters</span>
                </div>
                <p className="text-white font-medium">123 Pixel Avenue, NY 10012</p>
              </div>
            </div>

            <div className="space-y-4">
              <ContactInfoCard icon={<Clock className="text-[#10B981]" />} title="Working Hours" info="Mon-Fri, 9am - 6pm EST" />
              <ContactInfoCard icon={<Mail className="text-[#10B981]" />} title="Email Support" info="support@colourpix.com" isLink link="mailto:support@colourpix.com" />
              <ContactInfoCard icon={<Phone className="text-[#10B981]" />} title="Phone Support" info="+1 (555) 123-4567" isLink link="tel:+1234567890" />
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/123" target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-4 pr-6 rounded-full shadow-lg hover:-translate-y-1 transition-all">
        <div className="bg-white/20 p-2 rounded-full"><MessageCircle size={24} /></div>
        <div className="flex flex-col items-start text-left leading-none">
          <span className="text-[10px] opacity-80 mb-1 font-medium">Need help?</span>
          <span className="font-bold text-sm">WhatsApp Chat</span>
        </div>
      </a>
    </div>
  );
};

// Sub-component RETAINED
const ContactInfoCard = ({ icon, title, info, isLink, link }) => {
  const content = (
    <div className="bg-[#141A3A]/40 border border-white/5 p-6 rounded-2xl flex items-center gap-5 hover:border-[#10B981]/30 transition-all group">
      <div className="size-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">{icon}</div>
      <div className="text-left">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-white text-lg font-bold">{info}</p>
      </div>
    </div>
  );
  return isLink ? <a href={link} className="block no-underline">{content}</a> : <div>{content}</div>;
};

export default ContactPage;