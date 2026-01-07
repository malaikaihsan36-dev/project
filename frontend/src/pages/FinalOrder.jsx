import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinalOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // DesignReview page se bheja gaya data yahan receive ho raha hai
  const product = location.state?.product || {};
  const quantity = location.state?.quantity || 1;
  const subtotal = parseFloat(location.state?.totalPrice) || 0;

  // Invoice calculations
  const designFee = 5.00;
  const shipping = 4.50;
  const tax = subtotal * 0.05; // 5% Tax
  const grandTotal = subtotal + designFee + shipping + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
    // Agar koi direct is URL par aaye baghair data ke, to usay wapis bhej den
    if (!location.state) {
      console.warn("No order data found, redirecting...");
      navigate('/'); // Direct access par home bhej dena behtar hai
    }
  }, [location.state, navigate]);

  const handleWhatsAppOrder = () => {
    // 1. WhatsApp Message tayyar karna
    const message = `*NEW ORDER - COLOUR PIX*%0A` +
                    `--------------------------%0A` +
                    `*Product:* ${product.title}%0A` +
                    `*Quantity:* ${quantity}%0A` +
                    `*Subtotal:* $${subtotal.toFixed(2)}%0A` +
                    `*Tax (5%):* $${tax.toFixed(2)}%0A` +
                    `*Shipping:* $${shipping.toFixed(2)}%0A` +
                    `*TOTAL PAYABLE:* $${grandTotal.toFixed(2)}%0A` +
                    `--------------------------%0A` +
                    `*Status:* Design Approved & Ready`;
    
    // 2. WhatsApp window open karna
    window.open(`https://wa.me/923001234567?text=${message}`, '_blank');

    // 3. HOME PAGE PER WAPIS BHEJNA (Added this line)
    // Thoda sa delay ya direct redirect kar sakte hain
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0c1821] text-white font-['Space_Grotesk'] flex flex-col text-left">
      {/* HEADER */}
      <header className="w-full border-b border-[#1e293b] bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <div className="size-8 text-[#00ffaa]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-wider">COLOUR PIX</h2>
          </div>
        </div>
      </header>

      <main className="flex-grow flex justify-center py-10 px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Order Visual */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Final Review</h3>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
              <img src={product.img} alt="Final Design" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Invoice */}
          <div className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-between">
            <div>
              <h4 className="text-[#38BDF8] font-bold text-sm uppercase tracking-widest mb-6">Order Invoice</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{product.title || 'Product'} (x{quantity})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between"><span className="text-gray-400">Design Setup</span><span>${designFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Shipping</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Tax (5%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between text-xl font-bold"><span>Total</span><span className="text-[#38BDF8]">${grandTotal.toFixed(2)}</span></div>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppOrder}
              className="mt-10 w-full bg-[#38BDF8] py-4 rounded-xl text-black font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(56,189,248,0.2)]"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              Confirm & Pay via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalOrder;