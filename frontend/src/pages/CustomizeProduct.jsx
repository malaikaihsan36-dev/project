import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added for connectivity
import { 
  Bolt, 
  Droplets, 
  Ruler, 
  Hash, 
  Layers, 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText, 
  ArrowRight,
} from 'lucide-react';

const CustomizeProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Getting dynamic data from Catalog
  const product = location.state?.product || {
    title: "Custom Neon Flex",
    img: "https://images.unsplash.com/photo-1563245332-692146974811?auto=format&fit=crop&q=80&w=800",
    price: "120.00"
  };

  return (
    <div className="bg-[#0B0F1E] font-sans text-white min-h-screen flex flex-col selection:bg-[#00ffaa] selection:text-black">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#c813ec]/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00ffaa]/5 rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#0B0F1E]/90 backdrop-blur-md border-b border-white/10">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 text-white cursor-pointer">
            <div className="size-8 text-[#00ffaa]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">COLOUR PIX</h2>
          </div>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-[#00ffaa] transition-colors text-sm font-medium">Home</button>
            <button onClick={() => navigate('/catalog')} className="text-[#00ffaa] transition-colors text-sm font-medium">Products</button>
            <button className="text-gray-400 hover:text-[#00ffaa] transition-colors text-sm font-medium">About Us</button>
            <button className="text-gray-400 hover:text-[#00ffaa] transition-colors text-sm font-medium">Contact</button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 text-left">
          
          {/* LEFT COLUMN: PRODUCT PREVIEW */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-[#1F2937]">
              <img 
                src={product.img} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00ffaa]/20 text-[#00ffaa] text-xs font-bold uppercase tracking-wider border border-[#00ffaa]/30 mb-2">
                  Best Seller
                </span>
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2">{product.title}</h1>
                <p className="text-gray-300 text-sm max-w-md">Weather-resistant, fully programmable LED. Perfect for high-impact branding.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FeatureCard Icon={Bolt} title="Energy Efficient" desc="Low voltage 12V DC" />
              <FeatureCard Icon={Droplets} title="Waterproof" desc="IP67 rated" />
            </div>
          </div>

          {/* RIGHT COLUMN: CUSTOMIZATION FORMS */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Step 1: Customization */}
            <section>
              <SectionHeader number="1" title="Customization Panel" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Size (WxH)" id="size" placeholder="e.g., 24x36 inches" Icon={Ruler} />
                <InputGroup label="Quantity" id="quantity" type="number" defaultValue="1" Icon={Hash} />
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">Backboard Material</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select className="w-full pl-11 pr-10 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffaa] appearance-none cursor-pointer transition-colors">
                      <option>Clear Acrylic (Standard)</option>
                      <option>Black Acrylic</option>
                      <option>Wood Grain Finish</option>
                      <option>Metallic Gold</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">Additional Notes</label>
                  <textarea className="w-full px-4 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffaa] min-h-[100px] transition-colors" placeholder="Specific color requirements..."></textarea>
                </div>
              </div>
            </section>

            {/* Step 2: Contact */}
            <section>
              <SectionHeader number="2" title="Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <InputGroup label="Email Address *" id="email" type="email" placeholder="you@company.com" Icon={Mail} />
                </div>
                <InputGroup label="Phone Number *" id="phone" type="tel" placeholder="+1 (555) 000-0000" Icon={Phone} />
                <InputGroup label="WhatsApp Number" id="whatsapp" type="tel" placeholder="Optional" Icon={MessageSquare} />
              </div>
            </section>

            {/* QUOTATION SUMMARY */}
            <section className="mt-4">
              <div className="bg-[#0F172A] rounded-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ffaa]/10 rounded-full blur-[50px]"></div>
                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                  <FileText className="text-[#00ffaa]" size={20} /> Estimated Quotation
                </h3>
                
                <div className="space-y-4 mb-8">
                  <QuoteLine label={`Base Price (${product.title})`} value={`$${product.price}`} />
                  <QuoteLine label="Customization Fee" value="$0.00" />
                  <div className="h-px w-full bg-white/10 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Estimated Total</span>
                    <span className="text-[#00ffaa] text-3xl font-bold font-mono">${product.price}</span>
                  </div>
                </div>

                <button 
  onClick={() => navigate('/design-review', { state: { product } })}
  className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 ..."
>
  Submit for Design Review <ArrowRight size={20} />
</button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#0B0F1E] text-center py-8 mt-auto">
        <p className="text-gray-500 text-sm">© 2026 COLOUR PIX. All rights reserved.</p>
      </footer>
    </div>
  );
};

/* HELPER COMPONENTS (No changes here, kept exactly as you sent) */
const FeatureCard = ({ Icon, title, desc }) => (
  <div className="p-4 rounded-xl bg-[#1F2937]/50 border border-white/5 flex flex-col gap-2">
    <Icon className="text-[#00ffaa]" size={20} />
    <h4 className="text-white font-medium text-sm">{title}</h4>
    <p className="text-gray-400 text-xs">{desc}</p>
  </div>
);

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
    <div className="size-8 rounded-full bg-[#00ffaa]/10 flex items-center justify-center text-[#00ffaa] font-bold border border-[#00ffaa]/20">{number}</div>
    <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
  </div>
);

const InputGroup = ({ label, id, Icon, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-400 text-sm font-medium uppercase tracking-wider" htmlFor={id}>{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      <input 
        id={id}
        className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffaa] transition-all"
        {...props}
      />
    </div>
  </div>
);

const QuoteLine = ({ label, value }) => (
  <div className="flex justify-between items-center text-gray-400 text-sm">
    <span>{label}</span>
    <span className="text-white font-mono">{value}</span>
  </div>
);

export default CustomizeProduct;