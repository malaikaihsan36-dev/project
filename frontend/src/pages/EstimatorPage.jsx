import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import AppBackground from '../layouts/AppBackground';
import { ScrollReveal } from '../components/animationHelper';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Download, 
  Share2, 
  Save, 
  Check, 
  Sparkles, 
  Info,
  DollarSign,
  Package,
  Layers,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

// --- CONFIGURABLE PRICING ENGINE ---
const PRICING_RULES = {
  currencies: {
    Pakistan: { code: "PKR", symbol: "Rs.", rate: 1.0 },
    "United States": { code: "USD", symbol: "$", rate: 0.0036 },
    "United Kingdom": { code: "GBP", symbol: "£", rate: 0.0028 },
    Other: { code: "USD", symbol: "$", rate: 0.0036 }
  },
  products: {
    "Luxury Box": { base: 250, prepress: 15000, productionDays: 12 },
    "Food Packaging": { base: 45, prepress: 8000, productionDays: 8 },
    "Shopping Bag": { base: 90, prepress: 6000, productionDays: 10 },
    "Labels": { base: 12, prepress: 4000, productionDays: 5 },
    "Brochure": { base: 75, prepress: 7500, productionDays: 7 },
    "Business Cards": { base: 15, prepress: 3000, productionDays: 4 },
    "Custom Packaging": { base: 180, prepress: 12000, productionDays: 14 }
  },
  materials: {
    "SBS Paperboard (350 GSM)": { multiplier: 1.2, desc: "Premium thick solid bleached sulfate board, ideal for cosmetics." },
    "Kraft Cardstock (300 GSM)": { multiplier: 1.0, desc: "Organic eco-certified brown cardstock, strong build quality." },
    "Duplex Board (350 GSM)": { multiplier: 0.95, desc: "Standard double-layered cardstock, budget-friendly retail cartons." },
    "Rigid Chipboard (1500 GSM)": { multiplier: 2.2, desc: "Heavy rigid chipboard substrate for premium gift boxes." },
    "Corrugated Cardboard": { multiplier: 1.15, desc: "Multi-layered cardboard for shipping mailers." }
  },
  printing: {
    "Commercial Offset": { setupCost: 8000, perUnitCost: 20, desc: "High-volume Heidelberg offset prints, high fidelity." },
    "Digital Run": { setupCost: 1500, perUnitCost: 45, desc: "Rapid variable HP Indigo runs, zero setup delay." },
    "Flexographic": { setupCost: 12000, perUnitCost: 8, desc: "Best for super bulk packaging sleeves and brown Kraft boxes." },
    "Screen Printing": { setupCost: 3500, perUnitCost: 25, desc: "Thick direct inks on premade packaging sleeves." }
  },
  finishes: {
    "Hot Foil Stamping": { setupCost: 5000, perUnitCost: 15, desc: "Precision metallic gold / silver embossing." },
    "Spot UV": { setupCost: 4000, perUnitCost: 12, desc: "Selective raised high-gloss varnishing." },
    "Velvet Matte Laminate": { setupCost: 2500, perUnitCost: 8, desc: "Velvety outer texture coating for luxury feel." },
    "Embossing": { setupCost: 4500, perUnitCost: 10, desc: "Tactile raised multi-level logo detailing." },
    "Gloss Coating": { setupCost: 1500, perUnitCost: 4, desc: "Protective shiny varnish layer." }
  },
  delivery: {
    "Standard Ground": { costMultiplier: 0.05, minCost: 1500, days: 5 },
    "Express Air freight": { costMultiplier: 0.18, minCost: 6500, days: 2 },
    "Factory Pickup": { costMultiplier: 0, minCost: 0, days: 0 }
  }
};

const EstimatorPage = () => {
  const navigate = useNavigate();

  // Wizard Steps Configuration
  const steps = [
    { num: 1, label: "Market", desc: "Select delivery destination" },
    { num: 2, label: "Product", desc: "Select item architecture" },
    { num: 3, label: "Quantity", desc: "Set volume units" },
    { num: 4, label: "Dimensions", desc: "Enter structural sizes" },
    { num: 5, label: "Material", desc: "Select paperboard substrate" },
    { num: 6, label: "Printing", desc: "Select printing methodology" },
    { num: 7, label: "Finishing", desc: "Add surface coatings" },
    { num: 8, label: "Delivery", desc: "Select dispatch logistics" }
  ];

  const [activeStep, setActiveStep] = useState(1);

  // Form State
  const [selectedMarket, setSelectedMarket] = useState("Pakistan");
  const [selectedProduct, setSelectedProduct] = useState("Luxury Box");
  const [quantity, setQuantity] = useState(1000);
  const [dimensionUnit, setDimensionUnit] = useState("mm");
  const [dimensions, setDimensions] = useState({ length: 150, width: 100, height: 80 });
  const [selectedMaterial, setSelectedMaterial] = useState("SBS Paperboard (350 GSM)");
  const [selectedPrinting, setSelectedPrinting] = useState("Commercial Offset");
  const [selectedFinishes, setSelectedFinishes] = useState(["Velvet Matte Laminate"]);
  const [selectedDelivery, setSelectedDelivery] = useState("Standard Ground");

  // Dynamic Exchange Rates State
  const [currencies, setCurrencies] = useState({
    Pakistan: { code: "PKR", symbol: "Rs.", rate: 1.0 },
    "United States": { code: "USD", symbol: "$", rate: 0.0036 },
    "United Kingdom": { code: "GBP", symbol: "£", rate: 0.0028 },
    Europe: { code: "EUR", symbol: "€", rate: 0.0033 },
    Other: { code: "USD", symbol: "$", rate: 0.0036 }
  });

  // Auxiliary UI States
  const [copySuccess, setCopySuccess] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  // Auto-fill configuration from URL search query on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("market")) setSelectedMarket(params.get("market"));
    if (params.get("product")) setSelectedProduct(params.get("product"));
    if (params.get("qty")) setQuantity(parseInt(params.get("qty")) || 1000);
    if (params.get("unit")) setDimensionUnit(params.get("unit"));
    if (params.get("l")) setDimensions(prev => ({ ...prev, length: parseInt(params.get("l")) || prev.length }));
    if (params.get("w")) setDimensions(prev => ({ ...prev, width: parseInt(params.get("w")) || prev.width }));
    if (params.get("h")) setDimensions(prev => ({ ...prev, height: parseInt(params.get("h")) || prev.height }));
    if (params.get("mat")) setSelectedMaterial(params.get("mat"));
    if (params.get("print")) setSelectedPrinting(params.get("print"));
    if (params.get("delivery")) setSelectedDelivery(params.get("delivery"));
    
    const fins = params.get("finishes");
    if (fins) {
      try {
        setSelectedFinishes(JSON.parse(fins));
      } catch (e) {
        // Fallback if JSON fails
      }
    }
  }, []);

  // Fetch Exchange Rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          if (data.usd_rate && data.gbp_rate) {
            setCurrencies({
              Pakistan: { code: "PKR", symbol: "Rs.", rate: 1.0 },
              "United States": { code: "USD", symbol: "$", rate: parseFloat(data.usd_rate) || 0.0036 },
              "United Kingdom": { code: "GBP", symbol: "£", rate: parseFloat(data.gbp_rate) || 0.0028 },
              Europe: { code: "EUR", symbol: "€", rate: parseFloat(data.eur_rate) || 0.0033 },
              Other: { code: "USD", symbol: "$", rate: parseFloat(data.usd_rate) || 0.0036 }
            });
          }
        }
      } catch (e) {
        console.error("Error fetching live settings/rates:", e);
      }
    };
    fetchRates();
  }, []);

  // Update Page Title
  useEffect(() => {
    document.title = "Instant Packaging Cost Estimator | ColourPix";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  // --- MATHEMATICAL PRICING ENGINE ---
  const calculateEstimate = () => {
    const pData = PRICING_RULES.products[selectedProduct] || { base: 100, prepress: 10000, productionDays: 10 };
    const mData = PRICING_RULES.materials[selectedMaterial] || { multiplier: 1.0 };
    const prData = PRICING_RULES.printing[selectedPrinting] || { setupCost: 2000, perUnitCost: 20 };
    const dData = PRICING_RULES.delivery[selectedDelivery] || { costMultiplier: 0.05, minCost: 1500, days: 5 };
    const currency = currencies[selectedMarket] || { code: "PKR", symbol: "Rs.", rate: 1.0 };

    // 1. Base Carton Price
    const baseCartonPrice = pData.base * quantity;

    // 2. Material Substrate Multiplier
    const materialCost = baseCartonPrice * (mData.multiplier - 1);

    // 3. Printing Run Cost
    const printingSetup = prData.setupCost;
    const printingPerUnit = prData.perUnitCost * quantity;

    // 4. Custom Embellishments Run Cost
    let finishingSetup = 0;
    let finishingPerUnit = 0;
    selectedFinishes.forEach(fin => {
      const fData = PRICING_RULES.finishes[fin];
      if (fData) {
        finishingSetup += fData.setupCost;
        finishingPerUnit += fData.perUnitCost * quantity;
      }
    });

    // 5. Volume/Dimensions Factor (in mm equivalent volume)
    const lengthMM = dimensionUnit === "inch" ? dimensions.length * 25.4 : dimensions.length;
    const widthMM = dimensionUnit === "inch" ? dimensions.width * 25.4 : dimensions.width;
    const heightMM = dimensionUnit === "inch" ? dimensions.height * 25.4 : dimensions.height;
    const volumeIndex = (lengthMM * widthMM * heightMM) / 1000000; // in Litres
    const dimensionFactor = volumeIndex * 15 * quantity; // volumetric weight cost loading

    // 6. Pre-Press setup fees (one-off plate costs, CAD layout plotting)
    const setupFee = pData.prepress + printingSetup + finishingSetup;

    // Total raw subtotal
    const itemSubtotal = baseCartonPrice + materialCost + printingPerUnit + finishingPerUnit + dimensionFactor;

    // 7. Volumetric shipping cost calculation
    const shippingSubtotal = Math.max(dData.minCost, itemSubtotal * dData.costMultiplier);

    // Consolidated Raw Total in PKR base
    const rawTotalPKR = itemSubtotal + setupFee + shippingSubtotal;

    // 8. Bulk Discount Scaling
    let discountPercent = 0;
    if (quantity >= 50000) discountPercent = 0.35;
    else if (quantity >= 20000) discountPercent = 0.25;
    else if (quantity >= 10000) discountPercent = 0.18;
    else if (quantity >= 5000) discountPercent = 0.10;
    else if (quantity >= 2500) discountPercent = 0.05;

    const discountedTotalPKR = rawTotalPKR * (1 - discountPercent);

    // 9. Convert Currency
    const finalAmount = discountedTotalPKR * currency.rate;

    // 10. Estimated Price Ranges
    const rangeMin = Math.round(finalAmount * 0.93);
    const rangeMax = Math.round(finalAmount * 1.08);

    // Calculate Production Timelines
    const baseDays = pData.productionDays;
    const printingExtraDays = selectedPrinting === "Commercial Offset" ? 2 : 0;
    const finishExtraDays = selectedFinishes.length * 1.5;
    const deliveryDays = dData.days;
    const totalDaysMin = Math.round(baseDays + printingExtraDays + finishExtraDays);
    const totalDaysMax = Math.round(totalDaysMin + 3 + deliveryDays);

    return {
      minPrice: rangeMin,
      maxPrice: rangeMax,
      avgPerUnit: (finalAmount / quantity).toFixed(2),
      currencySymbol: currency.symbol,
      currencyCode: currency.code,
      daysMin: totalDaysMin,
      daysMax: totalDaysMax,
      prepressFee: Math.round(setupFee * currency.rate),
      bulkDiscountPercent: Math.round(discountPercent * 100)
    };
  };

  const est = calculateEstimate();

  // Wizard Nav Actions
  const handleNext = () => {
    if (activeStep < 8) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(9); // Result Screen
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetEstimator = () => {
    setActiveStep(1);
    setQuantity(1000);
    setDimensions({ length: 150, width: 100, height: 80 });
    setSelectedFinishes(["Velvet Matte Laminate"]);
    setSelectedDelivery("Standard Ground");
    setConfigSaved(false);
  };

  // Toggle multiple finishing coatings
  const handleFinishToggle = (fin) => {
    if (selectedFinishes.includes(fin)) {
      setSelectedFinishes(selectedFinishes.filter(f => f !== fin));
    } else {
      setSelectedFinishes([...selectedFinishes, fin]);
    }
  };

  // Action: Save configuration to LocalStorage
  const saveConfiguration = () => {
    const config = {
      market: selectedMarket,
      product: selectedProduct,
      qty: quantity,
      unit: dimensionUnit,
      dimensions,
      material: selectedMaterial,
      printing: selectedPrinting,
      finishes: selectedFinishes,
      delivery: selectedDelivery
    };
    localStorage.setItem('colourpix_estimator_config', JSON.stringify(config));
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  // Action: Generate Shareable Link to Clipboard
  const generateShareLink = () => {
    const query = new URLSearchParams({
      market: selectedMarket,
      product: selectedProduct,
      qty: quantity,
      unit: dimensionUnit,
      l: dimensions.length,
      w: dimensions.width,
      h: dimensions.height,
      mat: selectedMaterial,
      print: selectedPrinting,
      delivery: selectedDelivery,
      finishes: JSON.stringify(selectedFinishes)
    }).toString();

    const shareUrl = `${window.location.origin}/estimator?${query}`;
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Action: Download Estimate PDF Receipt
  const downloadEstimatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const w = 210;
    const h = 297;

    // Draw dark slate header bar
    doc.setFillColor(18, 18, 21);
    doc.rect(0, 0, w, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.text("COLOURPIX PACKAGING & PRINTING", 15, 16);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(161, 161, 170);
    doc.text("LCCI REGISTRATION #1991-PK | SECURE ESTIMATOR DIRECT", 15, 23);
    doc.text(`DATE OF ARCHIVE: ${new Date().toLocaleDateString()}`, 15, 28);

    // Decorative CMYK print marks
    const colors = [
      { r: 0, g: 163, b: 224 },
      { r: 236, g: 0, b: 140 },
      { r: 255, g: 242, b: 0 },
      { r: 35, g: 31, b: 32 }
    ];
    colors.forEach((col, idx) => {
      doc.setFillColor(col.r, col.g, col.b);
      doc.circle(180 + (idx * 6), 15, 2, 'F');
    });

    // Subtitle section
    doc.setTextColor(30, 41, 59);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text("INDUSTRIAL RUN ESTIMATION WORKSHEET", 15, 52);
    doc.line(15, 55, 195, 55);

    // Technical specifications grid
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    let curY = 65;

    const specs = [
      { label: "Target Market Location:", val: selectedMarket },
      { label: "Selected Packaging Model:", val: selectedProduct },
      { label: "Total Quantity (Units):", val: `${quantity} Pcs` },
      { label: "Structural Dimensions:", val: `${dimensions.length} x ${dimensions.width} x ${dimensions.height} ${dimensionUnit}` },
      { label: "Paperboard Substrate:", val: selectedMaterial },
      { label: "Printing Methodology:", val: selectedPrinting },
      { label: "Embellishment Coatings:", val: selectedFinishes.join(", ") || "None" },
      { label: "Dispatch Logistics Mode:", val: selectedDelivery }
    ];

    specs.forEach(item => {
      doc.setFont('Helvetica', 'bold');
      doc.text(item.label, 15, curY);
      doc.setFont('Helvetica', 'normal');
      
      const lines = doc.splitTextToSize(item.val, 110);
      doc.text(lines, 80, curY);
      curY += 6 + (lines.length - 1) * 4;
    });

    // Estimation Output Card Box
    doc.setFillColor(244, 244, 245);
    doc.setDrawColor(228, 228, 231);
    doc.rect(15, curY + 5, 180, 52, 'FD');

    doc.setTextColor(30, 41, 59);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("ESTIMATED PRICE SUMMARY", 22, curY + 13);
    doc.line(22, curY + 16, 188, curY + 16);

    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235); // Blue
    doc.text(`EST. RANGE: ${est.currencySymbol} ${est.minPrice.toLocaleString()} - ${est.currencySymbol} ${est.maxPrice.toLocaleString()} ${est.currencyCode}`, 22, curY + 26);

    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Estimated average cost per unit: ${est.currencySymbol} ${est.avgPerUnit}`, 22, curY + 34);
    doc.text(`Estimated setup/pre-press plates: ${est.currencySymbol} ${est.prepressFee.toLocaleString()}`, 22, curY + 39);
    doc.text(`Estimated factory production timeline: ${est.daysMin} - ${est.daysMax} working days`, 22, curY + 44);

    // Disclaimer footer
    doc.setTextColor(113, 113, 122);
    doc.setFontSize(7.5);
    const disclaimer = "*IMPORTANT ACCURACY STATEMENT: This sheet is a programmatic estimate built on standard material cost benchmarks. It does not represent a legally binding offer or guarantee of production capacity. Actual prices can vary based on artwork coverage parameters, freight changes, or supply chain factors. Please contact a sales engineer for an official quote.";
    const discLines = doc.splitTextToSize(disclaimer, 180);
    doc.text(discLines, 15, h - 35);

    // Corporate foot signatures
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text("COLOURPIX SHIELD VERIFICATION PIPELINE", 15, h - 18);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(113, 113, 122);
    doc.text("Valid for 14 days from calculation date.", 15, h - 13);
    doc.text("Page 1 of 1", 180, h - 13);

    const sanitName = selectedProduct.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    doc.save(`colourpix_cost_estimate_${sanitName}.pdf`);
  };

  return (
    <AppBackground>
      <NavBar />

      <div className="min-h-screen pt-28 pb-20 flex flex-col justify-between max-w-7xl mx-auto px-6 text-left">
        
        {/* HEADER SECTION */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-[#2563EB]/15 text-[#2563EB] rounded-xl">
              <Calculator className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-bold">
              ColourPix Pricing Desk
            </span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
            Instant Packaging Cost Estimator
          </h1>
          <p className="text-sm text-[#A1A1AA] max-w-2xl mt-3 leading-relaxed">
            Configure your custom dieline details, quantity brackets, and tactile finishes options to receive an immediate programmatic factory cost estimation.
          </p>
        </header>

        {/* WIZARD CARD WRAPPER */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-grow mb-12">
          
          {/* LEFT SIDE: STEPS STEER (Large screen only) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-2.5">
            {steps.map((st) => {
              const isActive = activeStep === st.num;
              const isCompleted = activeStep > st.num;
              
              return (
                <div 
                  key={st.num}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-[#2563EB]/10 border-[#2563EB]/40 text-white shadow-[0_0_15px_rgba(37,99,235,0.05)]" 
                      : isCompleted 
                        ? "bg-[#121215]/30 border-white/5 text-gray-500" 
                        : "bg-transparent border-transparent text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center border transition-all ${
                      isActive 
                        ? "bg-[#2563EB] border-[#2563EB] text-white" 
                        : isCompleted 
                          ? "bg-green-600/20 border-green-600/30 text-green-500" 
                          : "border-gray-700 text-gray-600"
                    }`}>
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : st.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                        {st.label}
                      </h4>
                      <p className="text-[9px] text-[#71717A] mt-0.5 leading-none">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </aside>

          {/* MAIN CARD STAGE */}
          <section className="lg:col-span-9">
            <div className="luxury-card p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#121215]/60 backdrop-blur-md relative min-h-[450px] flex flex-col justify-between">
              
              {/* TOP CONTAINER: HEADER & PROGRESS BAR */}
              <div>
                {/* Mobile / Tablet Progress Indicator */}
                <div className="lg:hidden flex items-center justify-between text-[10px] font-mono text-[#A1A1AA] uppercase mb-4">
                  <span>Step {activeStep} of 8</span>
                  <span className="text-[#2563EB] font-bold">{steps[activeStep - 1]?.label}</span>
                </div>

                {/* Progress bar line */}
                {activeStep <= 8 && (
                  <div className="w-full h-1 bg-[#27272A] rounded-full overflow-hidden mb-8">
                    <div 
                      className="h-full bg-[#2563EB] transition-all duration-300"
                      style={{ width: `${(activeStep / 8) * 100}%` }}
                    />
                  </div>
                )}

                {/* STEP CONTENT SWITCHBOARD */}
                {activeStep === 1 && (
                  <ScrollReveal className="space-y-6">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Select Target Market
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Pricing indexes, shipping rates, and delivery currencies dynamically adapt to your selected region.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {["Pakistan", "United States", "United Kingdom", "Europe", "Other"].map((mkt) => (
                        <button
                          key={mkt}
                          onClick={() => setSelectedMarket(mkt)}
                          className={`p-6 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all duration-300 ${
                            selectedMarket === mkt 
                              ? "bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.1)]" 
                              : "bg-[#09090B]/60 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedMarket === mkt ? "border-[#2563EB] bg-[#2563EB]" : "border-white/10"
                          }`}>
                            {selectedMarket === mkt && <Check className="w-3 h-3 text-white" />}
                          </span>
                          <div>
                            <span className="text-xs font-mono uppercase text-[#A1A1AA]">Market</span>
                            <h4 className="font-syne text-lg font-bold text-white mt-1">{mkt}</h4>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 2 && (
                  <ScrollReveal className="space-y-6">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Select Product Category
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Different categories drive unique pre-press setup requirements and base cost calculations.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {Object.keys(PRICING_RULES.products).map((prod) => (
                        <button
                          key={prod}
                          onClick={() => setSelectedProduct(prod)}
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                            selectedProduct === prod 
                              ? "bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                              : "bg-[#09090B]/40 border-white/5 hover:border-white/15"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedProduct === prod ? "border-[#2563EB] bg-[#2563EB]" : "border-white/10"
                          }`}>
                            {selectedProduct === prod && <Check className="w-2.5 h-2.5 text-white" />}
                          </span>
                          <h4 className="font-syne text-sm font-bold text-white">{prod}</h4>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 3 && (
                  <ScrollReveal className="space-y-8">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Select Order Volume (Quantity)
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        High volume runs receive significant bulk discounts due to press platemaking optimization limits.
                      </p>
                    </div>

                    {/* Numeric Input & Presets */}
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-[#09090B]/50 rounded-2xl border border-white/5">
                        <div className="w-full sm:w-auto text-left">
                          <label className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-1">Target Quantity</label>
                          <input 
                            type="number"
                            min="250"
                            max="100000"
                            className="bg-transparent border-b border-white/20 text-3xl font-syne font-bold text-white outline-none focus:border-[#2563EB] py-1 w-full sm:w-48 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          {[500, 1000, 2500, 5000, 10000, 25000].map(val => (
                            <button
                              key={val}
                              onClick={() => setQuantity(val)}
                              className={`px-4 py-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                                quantity === val 
                                  ? "bg-[#2563EB] border-[#2563EB] text-white" 
                                  : "bg-[#121215] border-white/10 text-[#A1A1AA] hover:border-white/20"
                              }`}
                            >
                              {val.toLocaleString()} Pcs
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slider Control */}
                      <div className="space-y-2">
                        <input 
                          type="range"
                          min="500"
                          max="50000"
                          step="500"
                          className="w-full h-1 bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                          value={quantity > 50000 ? 50000 : quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                        <div className="flex justify-between text-[9px] font-mono text-[#71717A]">
                          <span>MIN: 500 Pcs</span>
                          <span>MAX: 50,000+ Pcs</span>
                        </div>
                      </div>

                      {/* Bulk Notification Badge */}
                      {quantity >= 5000 && (
                        <div className="flex items-center gap-2 p-3 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 rounded-xl text-xs font-mono">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>Bulk Order discount unlocked! Volume scaling active.</span>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 4 && (
                  <ScrollReveal className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                          Enter Dimensions
                        </h3>
                        <p className="text-xs text-[#A1A1AA] mt-1">
                          Dimensions estimate flat dieline area requirements and box volumes.
                        </p>
                      </div>

                      {/* Unit Selector Toggle */}
                      <div className="bg-[#09090B] border border-white/10 p-1 rounded-xl flex">
                        {["mm", "inch"].map(unit => (
                          <button
                            key={unit}
                            onClick={() => setDimensionUnit(unit)}
                            className={`px-4 py-3 rounded-lg text-xs font-mono font-bold transition-all ${
                              dimensionUnit === unit 
                                ? "bg-[#2563EB] text-white" 
                                : "text-[#A1A1AA]"
                            }`}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { key: "length", label: "Length" },
                        { key: "width", label: "Width" },
                        { key: "height", label: "Height" }
                      ].map(item => (
                        <div key={item.key} className="p-5 bg-[#09090B]/50 border border-white/5 rounded-2xl text-left">
                          <label className="text-[10px] font-mono text-[#A1A1AA] uppercase block mb-2">{item.label}</label>
                          <div className="flex items-end gap-2">
                            <input 
                              type="number"
                              className="bg-transparent border-b border-white/15 text-2xl font-syne font-bold text-white outline-none focus:border-[#2563EB] py-1 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              value={dimensions[item.key]}
                              onChange={(e) => setDimensions({ ...dimensions, [item.key]: Math.max(1, parseInt(e.target.value) || 0) })}
                            />
                            <span className="text-xs font-mono text-[#71717A] mb-1.5 uppercase">{dimensionUnit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 5 && (
                  <ScrollReveal className="space-y-6">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Select Substrate Material
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Substrates differ by thickness calibrations (GSM index) and outer color tones.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(PRICING_RULES.materials).map((mat) => (
                        <button
                          key={mat}
                          onClick={() => setSelectedMaterial(mat)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-28 transition-all ${
                            selectedMaterial === mat 
                              ? "bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                              : "bg-[#09090B]/40 border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <h4 className="font-syne text-base font-bold text-white leading-tight">{mat}</h4>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              selectedMaterial === mat ? "border-[#2563EB] bg-[#2563EB]" : "border-white/10"
                            }`}>
                              {selectedMaterial === mat && <Check className="w-2.5 h-2.5 text-white" />}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed font-normal">
                            {PRICING_RULES.materials[mat].desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 6 && (
                  <ScrollReveal className="space-y-6">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Select Printing Method
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Different printing methodologies affect color accuracy and setup speed.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(PRICING_RULES.printing).map((print) => (
                        <button
                          key={print}
                          onClick={() => setSelectedPrinting(print)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-28 transition-all ${
                            selectedPrinting === print 
                              ? "bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                              : "bg-[#09090B]/40 border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <h4 className="font-syne text-base font-bold text-white leading-tight">{print}</h4>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              selectedPrinting === print ? "border-[#2563EB] bg-[#2563EB]" : "border-white/10"
                            }`}>
                              {selectedPrinting === print && <Check className="w-2.5 h-2.5 text-white" />}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed font-normal">
                            {PRICING_RULES.printing[print].desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 7 && (
                  <ScrollReveal className="space-y-6">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Tactile Embellishments & Coatings
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Choose one or more high-end tactile finish coatings to add luxury depth (Optional).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.keys(PRICING_RULES.finishes).map((fin) => {
                        const isSelected = selectedFinishes.includes(fin);
                        return (
                          <button
                            key={fin}
                            onClick={() => handleFinishToggle(fin)}
                            className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-28 transition-all ${
                              isSelected 
                                ? "bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                                : "bg-[#09090B]/40 border-white/5 hover:border-white/15"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <h4 className="font-syne text-sm font-bold text-white leading-tight">{fin}</h4>
                              <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-[#2563EB] bg-[#2563EB]" : "border-white/10"
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#A1A1AA] mt-2 leading-relaxed font-normal">
                              {PRICING_RULES.finishes[fin].desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollReveal>
                )}

                {activeStep === 8 && (
                  <ScrollReveal className="space-y-6">
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                        Select Delivery Logistics
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Dispatch logistics times are added to base plant production timelines.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.keys(PRICING_RULES.delivery).map((del) => (
                        <button
                          key={del}
                          onClick={() => setSelectedDelivery(del)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-28 transition-all ${
                            selectedDelivery === del 
                              ? "bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                              : "bg-[#09090B]/40 border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <h4 className="font-syne text-sm font-bold text-white leading-tight">{del}</h4>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              selectedDelivery === del ? "border-[#2563EB] bg-[#2563EB]" : "border-white/10"
                            }`}>
                              {selectedDelivery === del && <Check className="w-2.5 h-2.5 text-white" />}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#A1A1AA] mt-3 block">
                            Transit: +{PRICING_RULES.delivery[del].days} Days
                          </span>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {/* RESULTS CARD SCREEN */}
                {activeStep === 9 && (
                  <ScrollReveal className="space-y-8">
                    
                    {/* Upper layout: range metrics */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#121215] to-[#0A0A0C] relative overflow-hidden shadow-2xl">
                      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold bg-[#2563EB]/10 px-3 py-1 rounded-full border border-[#2563EB]/20 inline-block">
                            ESTIMATED PRICE RANGE
                          </span>
                          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-none tracking-tight">
                            {est.currencySymbol}{est.minPrice.toLocaleString()} - {est.currencySymbol}{est.maxPrice.toLocaleString()}
                          </h2>
                          <p className="text-xs text-[#A1A1AA] leading-relaxed">
                            Calculated for <span className="text-white font-bold">{quantity.toLocaleString()} Pcs</span> of <span className="text-white font-bold">{selectedProduct}</span>. Average rate per unit: <span className="text-white font-mono font-bold">{est.currencySymbol}{est.avgPerUnit}</span>.
                          </p>
                        </div>

                        {/* Production details */}
                        <div className="grid grid-cols-2 gap-4 p-5 bg-[#09090B]/60 border border-white/5 rounded-2xl font-mono text-[10px] text-[#A1A1AA]">
                          <div>
                            <span className="block text-gray-500 uppercase">Production Time</span>
                            <span className="text-white font-bold text-xs mt-1 block">{est.daysMin} - {est.daysMax} Days</span>
                          </div>
                          <div>
                            <span className="block text-gray-500 uppercase">Bulk Discount</span>
                            <span className="text-green-500 font-bold text-xs mt-1 block">-{est.bulkDiscountPercent}%</span>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-white/5">
                            <span className="block text-gray-500 uppercase">Setup & Tooling Fee</span>
                            <span className="text-white font-bold text-xs mt-1 block">{est.currencySymbol}{est.prepressFee.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle layout: detailed options confirmation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: Spec recap */}
                      <div className="p-6 rounded-2xl border border-white/5 bg-[#09090B]/30 space-y-4">
                        <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#2563EB]" /> Configuration Recap
                        </h4>

                        <div className="space-y-2.5 font-mono text-[10px] text-[#A1A1AA] divide-y divide-white/5">
                          <div className="flex justify-between py-1.5">
                            <span>Packaging Type:</span>
                            <span className="text-white font-bold">{selectedProduct}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span>Run Dimensions:</span>
                            <span className="text-white font-bold">{dimensions.length} x {dimensions.width} x {dimensions.height} {dimensionUnit}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span>Paper Substrate:</span>
                            <span className="text-white font-bold">{selectedMaterial}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span>Print Method:</span>
                            <span className="text-white font-bold">{selectedPrinting}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span>Finish Coatings:</span>
                            <span className="text-white font-bold max-w-[150px] text-right truncate">{selectedFinishes.join(", ") || "None"}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span>Logistics Type:</span>
                            <span className="text-white font-bold">{selectedDelivery}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical suggestions */}
                      <div className="p-6 rounded-2xl border border-white/5 bg-[#09090B]/30 space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                          <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#2563EB]" /> Pre-Press Recommendations
                          </h4>

                          <div className="space-y-3 text-xs leading-relaxed text-[#A1A1AA]">
                            <p>
                              We recommend utilizing <span className="text-white font-bold">{selectedPrinting}</span> for high graphic fidelity.
                            </p>
                            <p>
                              Recommended Substrate: <span className="text-white font-bold">{selectedMaterial}</span> based on packaging dimensional volume calculations.
                            </p>
                          </div>
                        </div>

                        {/* Technical Accuracy Stamp */}
                        <div className="flex items-start gap-2.5 p-3.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                          <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-yellow-500/90 leading-relaxed font-mono">
                            PROGRAMMATIC ESTIMATE ONLY: Does not represent a guaranteed production contract price.
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Lower layout: results actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                      
                      <div className="flex flex-wrap gap-2.5">
                        <button
                          onClick={downloadEstimatePDF}
                          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.25)] flex items-center gap-2"
                        >
                          <Download size={14} /> Download PDF
                        </button>
                        <button
                          onClick={saveConfiguration}
                          className="bg-transparent border border-white/10 text-white hover:border-white/20 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                        >
                          <Save size={14} /> {configSaved ? "Saved!" : "Save Config"}
                        </button>
                        <button
                          onClick={generateShareLink}
                          className="bg-transparent border border-white/10 text-white hover:border-white/20 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                        >
                          <Share2 size={14} /> {copySuccess ? "Copied!" : "Share Estimate"}
                        </button>
                      </div>

                      <button
                        onClick={() => navigate("/contact?type=quote&ref=estimator")}
                        className="bg-white hover:bg-gray-100 text-black px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-1.5"
                      >
                        Request Official Quote <ChevronRight size={14} />
                      </button>

                    </div>
                  </ScrollReveal>
                )}

              </div>

              {/* BOTTOM CONTAINER: BACK / NEXT ACTIONS */}
              {activeStep <= 8 && (
                <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-10">
                  <button
                    onClick={handleBack}
                    disabled={activeStep === 1}
                    className={`px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                      activeStep === 1 
                        ? "text-gray-600 border border-transparent cursor-not-allowed" 
                        : "text-white border border-white/10 hover:border-white/25"
                    }`}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
                  >
                    {activeStep === 8 ? "Calculate Estimate" : "Next"} <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {activeStep === 9 && (
                <div className="flex items-center justify-start pt-8 border-t border-white/10 mt-10">
                  <button
                    onClick={resetEstimator}
                    className="text-white border border-white/10 hover:border-white/20 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                  >
                    <RefreshCw size={14} /> Configure Another
                  </button>
                </div>
              )}

            </div>
          </section>

        </main>

        {/* ACCURACY & DISCLAIMER NOTE */}
        <footer className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-left">
            <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#A1A1AA] leading-relaxed max-w-2xl font-mono">
              <strong>ESTIMATE DISCLAIMER:</strong> All estimates are calculated programmatically using average bulk run averages and standard Lahore plant workloads. Pricing indices do not represent guaranteed quotes or formal manufacturing agreements. Platemaking setup and freight options vary. Request an official quote to receive locked pricing.
            </p>
          </div>
        </footer>

      </div>

      <Footer />
    </AppBackground>
  );
};

export default EstimatorPage;
