import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
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
  CheckCircle2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import AppBackground from '../layouts/AppBackground';

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
    if (!product) return { 
      title: "Loading...", 
      parsedSizes: [], 
      parsedMaterials: [], 
      parsedAddons: [], 
      type: 'Formal', 
      description: "" 
    };
    
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
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
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
    <AppBackground showGrid={false}>
      <NavBar />

      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 py-28 text-left">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
          <Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-white font-bold">{displayProduct.title || displayProduct.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* Left Column: Image and Description */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#121215] flex items-center justify-center group">
              <img 
                src={getOptimizedImage(displayProduct.img || displayProduct.image_url, 1000)} 
                alt={displayProduct.title} 
                className="max-w-full max-h-full object-contain p-4 transition-transform duration-700 group-hover:scale-102" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-left">
                <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest block mb-2 font-bold">PREMIUM SUBSTRATE</span>
                <h1 className="font-syne text-white text-3xl font-extrabold uppercase leading-tight mb-2">{displayProduct.title || displayProduct.name}</h1>
                <p className="text-[#A1A1AA] text-xs font-mono uppercase">{displayProduct.type} Printing Specification.</p>
              </div>
            </div>
            
            {displayProduct.type === 'Packaging' && (
              <div className="space-y-4">
                <h3 className="text-white font-syne font-bold text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-[#2563EB]" /> Add-on Textures & Finishes
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {displayProduct.parsedAddons.length > 0 ? (
                    displayProduct.parsedAddons.map((addon, index) => (
                      <FeatureCard 
                        key={index} 
                        Icon={selectedAddons.includes(addon.label) ? CheckCircle2 : Sparkles} 
                        title={addon.label} 
                        desc={`Configure specialty texture`} 
                        isActive={selectedAddons.includes(addon.label)}
                        onClick={() => toggleAddon(addon.label)}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 p-6 rounded-2xl bg-[#121215] border border-white/10 text-gray-500 text-xs text-center italic font-mono">No Add-ons Available</div>
                  )}
                </div>
              </div>
            )}

            <DescriptionCard description={displayProduct.description} />
          </div>

          {/* Right Column: Customization Panel */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <section className="space-y-6">
              <SectionHeader number="01" title="Substrate & Dimensions" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Select Size (WxH) *</label>
                  <div className="relative">
                    <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <select 
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full pl-11 pr-10 py-3.5 bg-[#121215] border border-white/10 rounded-xl text-xs font-mono text-white appearance-none focus:border-[#2563EB] outline-none cursor-pointer transition-colors"
                    >
                      <option value="" disabled hidden>Select Size</option>
                      {displayProduct.parsedSizes.map((s, idx) => (
                        <option key={idx} value={s.label}>{s.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Quantity (Min. 1000)</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                      onBlur={() => { if (quantity < 1000) setQuantity(1000); }}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#121215] border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Substrate Grammage & Grade *</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <select 
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full pl-11 pr-10 py-3.5 bg-[#121215] border border-white/10 rounded-xl text-xs font-mono text-white appearance-none focus:border-[#2563EB] outline-none cursor-pointer transition-colors"
                    >
                      <option value="" disabled hidden>Select Substrate Option</option>
                      {displayProduct.parsedMaterials.map((m, idx) => (
                        <option key={idx} value={m.label}>{m.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeader number="02" title="Pre-Press Instructions" />
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Special Requests</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-500" size={16} />
                  <textarea 
                    rows="3"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Describe print coatings, window patching, load specs or custom finishing dielines..."
                    className="w-full pl-11 pr-4 py-3.5 bg-[#121215] border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#2563EB] transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeader number="03" title="Corporate Contact Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Corporate Email *" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="purchasing@company.com" Icon={Mail} />
                <InputGroup label="WhatsApp / Phone *" id="whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+92 300 0000000" Icon={MessageCircle} />
              </div>
            </section>

            <section className="mt-4">
              <div className="bg-[#121215] rounded-3xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#2563EB]/5 rounded-full blur-[50px]"></div>
                <h3 className="text-white text-lg font-syne font-bold mb-6 flex items-center gap-2">
                  <FileText className="text-[#2563EB]" size={18} /> Direct Factory Quote Estimate
                </h3>
                <div className="space-y-4 mb-8 font-mono text-xs text-left">
                  <QuoteLine label="Calculated Unit Cost" value={`$${unitPrice}`} />
                  <QuoteLine label="Order Production Quantity" value={`x ${quantity}`} />
                  <div className="h-px w-full bg-white/10 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Estimated Bulk Price</span>
                    <span className="text-[#2563EB] text-3xl font-bold font-syne">${totalPrice}</span>
                  </div>
                </div>
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{loading ? 'Generating Review ID...' : 'Initiate Free Design Review'}</span> 
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </AppBackground>
  );
};

/* Helper Components */
const FeatureCard = ({ Icon, title, desc, isActive, onClick }) => (
  <div 
    onClick={onClick} 
    className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col gap-2.5 text-left group ${isActive ? 'bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.15)]' : 'bg-[#121215]/80 border-white/10 hover:border-white/20'}`}
  >
    <Icon className={`transition-colors duration-300 ${isActive ? 'text-[#2563EB]' : 'text-gray-500 group-hover:text-white'}`} size={18} />
    <h4 className={`font-syne font-bold text-sm transition-colors duration-300 ${isActive ? 'text-[#2563EB]' : 'text-white'}`}>{title}</h4>
    <p className="text-gray-400 text-xs">{desc}</p>
  </div>
);

const DescriptionCard = ({ description }) => (
  <div className="p-6 sm:p-8 rounded-3xl bg-[#121215]/50 border border-white/10 backdrop-blur-sm text-left">
    <h3 className="text-white font-syne font-bold text-lg mb-4 flex items-center gap-2">
      <FileText className="text-[#2563EB]" size={18} /> Product Description
    </h3>
    <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
      {description || "Premium quality custom printed packaging substrate."}
    </div>
  </div>
);

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 text-left">
    <div className="size-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] font-mono text-xs font-bold border border-[#2563EB]/25">{number}</div>
    <h3 className="text-white font-syne text-xl font-bold tracking-tight uppercase">{title}</h3>
  </div>
);

const InputGroup = ({ label, id, Icon, ...props }) => (
  <div className="flex flex-col gap-2 text-left">
    <label className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold" htmlFor={id}>{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
      <input 
        id={id} 
        className="w-full pl-11 pr-4 py-3.5 bg-[#121215] border border-white/10 rounded-xl text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] transition-all" 
        {...props} 
      />
    </div>
  </div>
);

const QuoteLine = ({ label, value }) => (
  <div className="flex justify-between items-center text-gray-400">
    <span>{label}</span>
    <span className="text-white font-bold">{value}</span>
  </div>
);

export default CustomizeProduct;