import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
// Palette ko import karna zaroori hai error khatam karne ke liye
import { Palette } from 'lucide-react'; 

const FinalOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product || {};
  const quantity = location.state?.quantity || 1;
  const subtotal = parseFloat(location.state?.totalPrice) || 0;

  const designFee = 5.00;
  const shipping = 4.50;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + designFee + shipping + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleWhatsAppOrder = () => {
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
    
    window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0c1821] text-white font-['Space_Grotesk'] flex flex-col text-left">
      <NavBar />

      <main className="flex-grow flex justify-center pt-32 pb-10 px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side: Product Preview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Final Review</h3>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
              <img src={product.img} alt="Final Design" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Side: Invoice */}
          <div className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-between">
            <div>
              {/* NEW LOGO ADDED HERE */}
              <div className="flex items-center gap-2 cursor-pointer mb-8" onClick={() => navigate('/')}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
                  <Palette size={24} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Colour Pix</span>
              </div>

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
              Confirm & Pay via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalOrder;