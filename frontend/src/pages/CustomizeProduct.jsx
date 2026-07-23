import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
// Image optimization helper import kiya gaya hai
import { getOptimizedImage } from '../components/imageHelper'; 
import { 
  Bolt, 
  Droplets, 
  Ruler, 
  Hash, 
  Layers, 
  Mail, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  Palette,
  MessageCircle,
  Sparkles,
  CheckCircle2 
} from 'lucide-react';

const CustomizeProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1000); 
  const [size, setSize] = useState(''); 
  const [material, setMaterial] = useState(''); 
  const [selectedAddons, setSelectedAddons] = useState([]); 
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); 
  const [specialRequest, setSpecialRequest] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!product);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';

  const displayProduct = useMemo(() => {
    // Agar product null hai ya loading hai, to default empty arrays return karein
    if (!product) return { 
      title: "Loading...", 
      parsedSizes: [], 
      parsedMaterials: [], 
      parsedAddons: [], 
      type: 'Formal', 
      description: "" 
    };
    
    // Helper function to safely parse JSON or return array
    const safeParse = (data) => {
      if (Array.isArray(data)) return data;
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch (e) {
          return [];
        }
      }
      return [];
    };

    return {
      ...product,
      parsedSizes: safeParse(product.sizes),
      parsedMaterials: safeParse(product.gramages),
      parsedAddons: safeParse(product.addons)
    };
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      if (id) {
        try {
          // Direct fixed URL safe dynamic check k sath bina kisi variable issue k
          const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchProductDetails();
  }, [id]);

  const calculatePrices = () => {
    if (!product || !size || !material) return { unitPrice: "0.00", total: "0.00" };

    const selectedSizeObj = displayProduct.parsedSizes.find(s => s.label === size);
    const selectedGramageObj = displayProduct.parsedMaterials.find(g => g.label === material);
    
    const L = parseFloat(selectedSizeObj?.length) || 0;
    const W = parseFloat(selectedSizeObj?.width) || 0;
    const G = parseFloat(selectedGramageObj?.value) || 0;
    const kgRate = parseFloat(product.kg_rate) || 0;

    const cardPrice = ((L * W * G) / 1550) * kgRate * 10;
    let basePriceCalculated = 0;

    if (displayProduct.type === 'Formal') {
      basePriceCalculated = (cardPrice + 2400 + 2500 + 1000) * 1.35;
    } else {
      const dyeMaking = L * W * 8;
      const dyeCutting = 2000;
      let addonsTotal = 0;
      selectedAddons.forEach(addonLabel => {
        const addon = displayProduct.parsedAddons.find(a => a.label === addonLabel);
        if (addon && addon.value) {
          try {
            const equation = addon.value.toUpperCase().replace(/L/g, L).replace(/W/g, W);
            // eslint-disable-next-line no-eval
            addonsTotal += eval(equation); 
          } catch (e) {
            addonsTotal += parseFloat(addon.value) || 0;
          }
        }
      });
      basePriceCalculated = ((cardPrice + 5900 + dyeMaking + dyeCutting + addonsTotal) * 1.35)/1000;
    }

    const unit = basePriceCalculated;
    const total = unit * quantity;

    return {
      unitPrice: unit.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const { unitPrice, total: totalPrice } = calculatePrices();

  const toggleAddon = (addonLabel) => {
    setSelectedAddons(prev => 
      prev.includes(addonLabel) 
        ? prev.filter(a => a !== addonLabel) 
        : [...prev, addonLabel]
    );
  };

  const generateOrderID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) { 
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async () => {
    if (!email || !whatsapp || !size || !material) {
      alert("Please fill in required fields (Size, Material, Email, WhatsApp).");
      return;
    }

    setLoading(true);
    const orderId = generateOrderID();
    
    const orderData = { 
      orderId, 
      productTitle: displayProduct.title || displayProduct.name, 
      productId: id, 
      quantity, 
      size, 
      material, 
      selectedAddons, 
      totalPrice, 
      email, 
      whatsapp, 
      specialRequest: specialRequest 
    };

    try {
      // Direct post method URL set kiya bina kisi environment variable k complex load k
      const response = await fetch('${API_BASE_URL}/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        navigate('/design-review', { 
          state: { 
            product: displayProduct, 
            totalPrice, 
            quantity, 
            orderId, 
            userEmail: email, 
            whatsapp: whatsapp, 
            selectedSize: size, 
            selectedMaterial: material, 
            selectedAddons 
          } 
        });
      } else {
        const result = await response.json();
        alert("Failed to save order: " + result.error);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Backend server is not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0F1E] font-sans text-white min-h-screen flex flex-col selection:bg-[#00ffaa] selection:text-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#c813ec]/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00ffaa]/5 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-[#0B0F1E]/90 backdrop-blur-md border-b border-white/10">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
              <Palette size={24} />
            </div>
            <span className="text-xl font-bold text-white">Colour Pix</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-[#00ffaa] transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-gray-300 hover:text-[#00ffaa] transition-colors font-medium">Products</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 text-left">
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-[#1F2937] flex items-center justify-center">
              <img 
                src={getOptimizedImage(displayProduct.img || displayProduct.image_url, 1000)} 
                alt={displayProduct.title} 
                className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2">{displayProduct.title || displayProduct.name}</h1>
                <p className="text-gray-300 text-sm max-w-md">{displayProduct.type} Printing Solution.</p>
              </div>
            </div>
            
            {displayProduct.type === 'Packaging' ? (
              <>
                <div className="space-y-4">
                  <h3 className="text-[#00ffaa] font-bold text-lg flex items-center gap-2"><Sparkles size={20} /> Add on Textures</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {displayProduct.parsedAddons.length > 0 ? (
                      displayProduct.parsedAddons.map((addon, index) => (
                        <FeatureCard 
                          key={index} 
                          Icon={selectedAddons.includes(addon.label) ? CheckCircle2 : Sparkles} 
                          title={addon.label} 
                          desc={`Select to add texture`} 
                          isActive={selectedAddons.includes(addon.label)}
                          onClick={() => toggleAddon(addon.label)}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 p-4 rounded-xl bg-[#1F2937]/50 border border-white/5 text-gray-400 text-sm text-center italic">No Add-ons Available</div>
                    )}
                  </div>
                </div>
                <DescriptionCard description={displayProduct.description} />
              </>
            ) : (
              <DescriptionCard description={displayProduct.description} />
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <section>
              <SectionHeader number="1" title="Customization Panel" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">Size (WxH) *</label>
                  <div className="relative">
                    <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select 
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white appearance-none focus:border-[#00ffaa] outline-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Select Size</option>
                      {displayProduct.parsedSizes.map((s, idx) => (
                        <option key={idx} value={s.label}>{s.label} </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">Quantity (Min. 1000)</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                      onBlur={() => { if (quantity < 1000) setQuantity(1000); }}
                      className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffaa] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">Material / Grammage *</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select 
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white appearance-none focus:border-[#00ffaa] outline-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Select Option</option>
                      {displayProduct.parsedMaterials.map((m, idx) => (
                        <option key={idx} value={m.label}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionHeader number="2" title="Special Instructions" />
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-500" size={18} />
                  <textarea 
                    rows="3"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Describe your special requirements here..."
                    className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffaa] transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </section>

            <section>
              <SectionHeader number="3" title="Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Email Address *" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" Icon={Mail} />
                <InputGroup label="WhatsApp Number *" id="whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+92 300 0000000" Icon={MessageCircle} />
              </div>
            </section>

            <section className="mt-4">
              <div className="bg-[#0F172A] rounded-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ffaa]/10 rounded-full blur-[50px]"></div>
                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2"><FileText className="text-[#00ffaa]" size={20} /> Estimated Quotation</h3>
                <div className="space-y-4 mb-8">
                  <QuoteLine label={`Unit Price`} value={`$${unitPrice}`} />
                  <QuoteLine label="Quantity" value={`x ${quantity}`} />
                  <div className="h-px w-full bg-white/10 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Estimated Total</span>
                    <span className="text-[#00ffaa] text-3xl font-bold font-mono">${totalPrice}</span>
                  </div>
                </div>
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Submit for Design Review'} <ArrowRight size={20} />
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

/* Helper Components */
const FeatureCard = ({ Icon, title, desc, isActive, onClick }) => (
  <div onClick={onClick} className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 text-left group ${isActive ? 'bg-[#00ffaa]/10 border-[#00ffaa] shadow-[0_0_15px_rgba(0,255,170,0.2)]' : 'bg-[#1F2937]/50 border-white/5 hover:border-white/20'}`}>
    <Icon className={`transition-colors ${isActive ? 'text-[#00ffaa]' : 'text-gray-500 group-hover:text-white'}`} size={20} />
    <h4 className={`font-medium text-sm transition-colors ${isActive ? 'text-[#00ffaa]' : 'text-white'}`}>{title}</h4>
    <p className="text-gray-400 text-xs">{desc}</p>
  </div>
);

const DescriptionCard = ({ description }) => (
  <div className="p-6 rounded-2xl bg-[#1F2937]/30 border border-white/5 backdrop-blur-sm">
    <h3 className="text-[#00ffaa] font-bold text-lg mb-4 flex items-center gap-2"><FileText size={20} /> Product Description</h3>
    <div className="space-y-4 text-gray-400 text-sm leading-relaxed"><div className="whitespace-pre-wrap">{description || "Premium quality custom printed products."}</div></div>
  </div>
);

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3 text-left">
    <div className="size-8 rounded-full bg-[#00ffaa]/10 flex items-center justify-center text-[#00ffaa] font-bold border border-[#00ffaa]/20">{number}</div>
    <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
  </div>
);

const InputGroup = ({ label, id, Icon, ...props }) => (
  <div className="flex flex-col gap-2 text-left">
    <label className="text-gray-400 text-sm font-medium uppercase tracking-wider" htmlFor={id}>{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      <input id={id} className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffaa] transition-all" {...props} />
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