import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, Send, MessageCircle, ChevronDown, CheckCircle2, ChevronRight, Building2, ArrowUpRight } from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const ContactPage = () => {
  const navigate = useNavigate(); 
  const [subjects, setSubjects] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    subject: 'Luxury Rigid Boxes',
    message: '',
    artworkName: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';

  useEffect(() => {
    document.title = "Contact & Quotation Inquiry | ColourPix";
    
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/contact-subjects`);
        if (res.data && res.data.length > 0) {
          setSubjects(res.data);
          setFormData(prev => ({ ...prev, subject: res.data[0].name }));
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  const generateOrderID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const orderId = generateOrderID(); 
    
    const contactData = {
      orderId,
      productTitle: `Inquiry: ${formData.subject}`,
      productId: 'CONTACT_FORM', 
      quantity: 1000,
      totalPrice: "0.00",
      email: formData.email,
      whatsapp: formData.phone,
      size: 'N/A',
      material: 'N/A',
      selectedAddons: [],
      specialRequest: `Name: ${formData.name} | Company: ${formData.company} | Country: ${formData.country} | Artwork: ${formData.artworkName || 'None'} | Details: ${formData.message}` 
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders`, contactData);

      if (response.status === 201 || response.status === 200) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          navigate('/design-review', { 
            state: { 
              orderId,
              userEmail: formData.email,
              isFromContact: true
            } 
          });
        }, 3000);
      }
    } catch (error) {
      alert("Connection failed. Please contact us directly via phone or email.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen relative">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Contact</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                2-HOUR RESPONSE TIME • LCCI MEMBER #1991-PK
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                TALK TO OUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  ENGINEERING
                </span> <br />
                TEAM.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Have a packaging project or commercial print inquiry? Reach out to our senior sales engineers and pre-press specialists for direct factory quotes and dieline samples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 luxury-card p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(37,99,235,0.2)] animate-pulse">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="font-syne text-4xl font-extrabold text-white tracking-tight uppercase">Inquiry Transmitted</h3>
                  <p className="text-[#A1A1AA] text-sm max-w-md mx-auto leading-relaxed">
                    Your packaging brief has been registered. Redirecting to your secure live design review and dieline workspace dashboard...
                  </p>
                  <div className="w-12 h-1 bg-[#2563EB] mx-auto rounded-full animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="text-xs font-mono text-[#2563EB] uppercase block font-bold tracking-wider mb-1">
                      DIRECT QUOTATION FORM
                    </span>
                    <h2 className="font-syne text-3xl font-extrabold text-white uppercase">Request a Bulk Quote</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Your Full Name *</label>
                        <input 
                          type="text" required 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Ali Khan" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Company Name *</label>
                        <input 
                          type="text" required 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Apex Consumer Goods" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Email Address *</label>
                        <input 
                          type="email" required 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Phone / WhatsApp *</label>
                        <input 
                          type="tel" required 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+92 300 1234567" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Country *</label>
                        <input 
                          type="text" required 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="e.g. Pakistan" 
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Project Type *</label>
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors"
                        >
                          {subjects.length > 0 ? (
                            subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)
                          ) : (
                            <>
                              <option value="Luxury Rigid Boxes">Luxury Rigid Boxes</option>
                              <option value="Corrugated Mailers">Corrugated E-Commerce Mailers</option>
                              <option value="Product Labels">Product Labels & Stickers</option>
                              <option value="Retail Bags">Retail Shopping Bags</option>
                              <option value="Commercial Print">Commercial Offset Printing</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Project Details *</label>
                      <textarea 
                        required 
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mention box sizes, substrate requirements, or print finishing expectations..." 
                        className="w-full bg-[#09090B] border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#2563EB] transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Attach Dieline / Artwork File (Optional)</label>
                      <div className="border-2 border-dashed border-white/15 hover:border-[#2563EB] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#09090B]">
                        <input 
                          type="file" 
                          id="file-upload"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFormData(prev => ({ ...prev, artworkName: e.target.files[0].name }));
                            }
                          }}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                          <span className="text-xs font-mono text-[#2563EB] uppercase font-bold block">
                            {formData.artworkName ? `Attached: ${formData.artworkName}` : "+ Drag & Drop or Click to Upload Dieline (.AI, .PDF, .ARD)"}
                          </span>
                          <span className="text-[10px] text-[#A1A1AA] block">Supports PDF, AI, PSD, ARD up to 50MB</span>
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-xl font-syne font-bold text-base tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>{loading ? 'Submitting...' : 'Submit Quotation Request'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Right Column: Contact Cards & Map */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 space-y-6">
                <span className="text-xs font-mono text-[#2563EB] uppercase block font-bold tracking-wider">
                  DIRECT CONTACT INFORMATION
                </span>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">Official Email Support</span>
                    <span className="text-sm font-bold text-white block">colourpix.official@gmail.com</span>
                    <span className="text-xs text-[#A1A1AA]">colourpix.socials@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/30 flex items-center justify-center text-[#E11D48] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">Direct Phone & WhatsApp</span>
                    <span className="text-sm font-bold text-white block">+92 370 4123327</span>
                    <span className="text-xs text-[#A1A1AA]">+92 301 0144611</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <Building2 className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">Lahore Industrial Plant</span>
                    <span className="text-sm font-bold text-white block">Lahore, Punjab, Pakistan</span>
                    <span className="text-xs text-[#2563EB] font-mono font-bold">LCCI Member #1991-PK</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block">Plant Operating Hours</span>
                    <span className="text-xs font-bold text-white">Monday – Saturday: 9:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Map Embed Card */}
              <div className="rounded-3xl overflow-hidden border border-white/10 h-56 relative group">
                <iframe 
                  title="ColourPix Lahore Industrial Plant Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435514.481926685!2d74.00472288330752!3d31.483103657313886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23fad61091b45ad!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  className="w-full h-full filter invert contrast-125 grayscale"
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* WhatsApp Quick Action Button */}
              <a 
                href="https://wa.me/923704123327" 
                target="_blank" 
                rel="noreferrer" 
                className="p-6 rounded-2xl bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/40 flex items-center justify-between text-white hover:border-[#25D366] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#25D366] uppercase block font-bold">INSTANT RESPONSE</span>
                    <span className="text-sm font-bold">Chat Live via WhatsApp</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#25D366] group-hover:translate-x-1 transition-transform" />
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <a 
        href="https://wa.me/923704123327" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-[#09090B] p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-white/10"
        title="Chat Live on WhatsApp"
      >
        <MessageCircle size={28} className="text-[#09090B] fill-current" />
      </a>

      <Footer />
    </div>
  );
};

export default ContactPage;