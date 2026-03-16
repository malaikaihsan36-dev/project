import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { Palette } from 'lucide-react'; 

const FinalOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- GETTING LIVE DATA FROM ADMIN ---
  const product = location.state?.product || {};
  const quantity = location.state?.quantity || 1;
  const adminData = location.state?.adminPrices; // Admin set prices

  // Fallback defaults if admin didn't set them yet
  // FinalOrder.jsx mein pricing calculation
const productionFee = adminData ? parseFloat(adminData.production) : (parseFloat(location.state?.totalPrice) || 0);
const designFee = adminData ? parseFloat(adminData.design) : 0.00;
const shipping = adminData ? parseFloat(adminData.shipping) : 0.00;
const tax = adminData ? parseFloat(adminData.tax) : (productionFee * 0.05);

const grandTotal = productionFee + designFee + shipping + tax;

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
                    `*Production:* $${productionFee.toFixed(2)}%0A` +
                    `*Design Setup:* $${designFee.toFixed(2)}%0A` +
                    `*Shipping:* $${shipping.toFixed(2)}%0A` +
                    `*Tax:* $${tax.toFixed(2)}%0A` +
                    `*TOTAL PAYABLE:* $${grandTotal.toFixed(2)}%0A` +
                    `--------------------------%0A` +
                    `*Status:* Approved & Live Order`;
    
    window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0c1821] text-white font-['Space_Grotesk'] flex flex-col text-left">
      <NavBar />
      <main className="flex-grow flex justify-center pt-32 pb-10 px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Final Review</h3>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
              <img src={product.img || "https://via.placeholder.com/400"} alt="Final Design" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center text-white">
                  <Palette size={24} />
                </div>
                <span className="text-xl font-bold text-white">Colour Pix</span>
              </div>

              <h4 className="text-[#38BDF8] font-bold text-sm uppercase tracking-widest mb-6">Order Invoice</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{product.title || 'Product'} (x{quantity})</span>
                  <span>${productionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Design Setup</span>
                  <span>${designFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#38BDF8]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button onClick={handleWhatsAppOrder} className="mt-10 w-full bg-[#38BDF8] py-4 rounded-xl text-black font-bold text-lg hover:bg-white transition-all shadow-[0_10px_20px_rgba(56,189,248,0.2)]">
              Place & Confirm via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalOrder;