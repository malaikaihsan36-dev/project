import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Palette, ArrowLeft, CheckCircle } from 'lucide-react';
// Step 1: Image optimization helper ko import kiya
import { getOptimizedImage } from '../components/imageHelper';

const FinalOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // States for data handling and UI feedback
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  // URL/State se Order ID nikalna aur clean karna
  const orderId = location.state?.orderId;
  const cleanId = orderId ? orderId.replace(/[%23#\s]/g, '').trim() : "";

  useEffect(() => {
    window.scrollTo(0, 0); // Page load par top par scroll karna
    const fetchFinalDetails = async () => {
      if (!cleanId) {
        navigate('/'); // Agar ID nahi hai to home bhej dena
        return;
      }
      try {
        // Backend se finalized order details mangwana (Direct Link Connection)
        const res = await axios.get(`process.env.REACT_APP_API_BASE_URL/api/order/${cleanId}`);
        if (res.data) setOrderData(res.data);
      } catch (err) {
        console.error("Error fetching final order data:", err);
      } finally {
        setLoading(false); // Loading state khatam
      }
    };
    fetchFinalDetails();
  }, [cleanId, navigate]);

  // Loading screen logic
  if (loading) return <div className="min-h-screen bg-[#0c1821] flex items-center justify-center text-white">Loading Invoice...</div>;
  if (!orderData) return null;

  // Pricing calculations (Parsing to ensure they are numbers)
  const productionFee = parseFloat(orderData.production_fee || 0);
  const designFee = parseFloat(orderData.design_fee || 0);
  const shipping = parseFloat(orderData.shipping_fee || 0);
  const tax = parseFloat(orderData.tax_fee || 0);
  const quantity = orderData.quantity || 1;
  const grandTotal = productionFee + designFee + shipping + tax;

  // --- LOGIC: Place & Confirm Order ---
  const handleFinalConfirm = async () => {
    setIsConfirming(true); // Button ko processing mode mein dalna
    try {
      // API hit karke order status update karna aur total price save karna (Direct Link Connection)
      const res = await axios.post(`process.env.REACT_APP_API_BASE_URL/api/orders/finalize/${cleanId}`, {
        final_total_price: grandTotal
      });
      
      if (res.status === 200) {
        // WhatsApp Message formatting for Admin notification
        const message = `*FINALIZED ORDER - COLOUR PIX*%0A` +
                        `*Order ID:* ${res.data.order_id}%0A` +
                        `*Customer:* ${orderData.customer_email}%0A` +
                        `*Product:* ${orderData.product_title}%0A` +
                        `*Total Paid:* $${grandTotal.toFixed(2)}`;
        
        // Admin ke WhatsApp par redirected opening
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
        
        // Success page par move karna unique ID ke saath
        navigate('/order-success', { state: { permanentId: res.data.order_id } });
      }
    } catch (err) {
      console.error("Confirmation Error:", err);
      alert("Confirmation failed. Please try again.");
    } finally {
      setIsConfirming(false); // Processing khatam
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1821] text-white font-['Space_Grotesk'] flex flex-col text-left">
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-4">
        
        {/* Navigation Section */}
        <div className="max-w-4xl w-full mb-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Design Review</span>
          </button>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Design Preview (Optimized Image Applied) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Final Artwork</h3>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 group relative">
                <img 
                    // Step 2: getOptimizedImage call ki width=800 ke saath
                    src={getOptimizedImage(orderData.product_img || "", 800)} 
                    alt="Final Design" 
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy" // Performance ke liye lazy load add kiya
                />
            </div>
          </div>

          {/* Right: Invoice Card */}
          <div className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Branding Header */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center">
                  <Palette size={24} />
                </div>
                <span className="text-xl font-bold">Colour Pix</span>
              </div>

              {/* Order Breakdown */}
              <h4 className="text-[#38BDF8] font-bold text-sm uppercase tracking-widest mb-6">Order Summary</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>{orderData.product_title} (x{quantity})</span>
                  <span>${productionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Design Setup</span>
                  <span>${designFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-xs italic">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {/* Visual Separator */}
                <div className="h-px bg-white/10 my-4"></div>
                
                {/* Total Display */}
                <div className="flex justify-between text-2xl font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-[#38BDF8]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Main Action Button */}
            <button 
              onClick={handleFinalConfirm}
              disabled={isConfirming}
              className="mt-10 w-full bg-[#0df2a6] py-4 rounded-xl text-black font-black text-lg hover:bg-white transition-all shadow-[0_10px_30px_rgba(13,242,166,0.2)] flex items-center justify-center gap-2"
            >
              {isConfirming ? "Processing..." : <><CheckCircle size={20}/> PLACE & CONFIRM ORDER</>}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalOrder;