import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Palette, ArrowLeft, CheckCircle } from 'lucide-react';

const FinalOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  const orderId = location.state?.orderId;
  const cleanId = orderId ? orderId.replace(/[%23#\s]/g, '').trim() : "";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFinalDetails = async () => {
      if (!cleanId) {
        navigate('/');
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/order/${cleanId}`);
        if (res.data) setOrderData(res.data);
      } catch (err) {
        console.error("Error fetching final order data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFinalDetails();
  }, [cleanId, navigate]);

  if (loading) return <div className="min-h-screen bg-[#0c1821] flex items-center justify-center text-white">Loading Invoice...</div>;
  if (!orderData) return null;

  const productionFee = parseFloat(orderData.production_fee || 0);
  const designFee = parseFloat(orderData.design_fee || 0);
  const shipping = parseFloat(orderData.shipping_fee || 0);
  const tax = parseFloat(orderData.tax_fee || 0);
  const quantity = orderData.quantity || 1;
  const grandTotal = productionFee + designFee + shipping + tax;

  // --- LOGIC: Place & Confirm Order ---
  const handleFinalConfirm = async () => {
    setIsConfirming(true);
    try {
      // Body mein final_total_price bhej rahe hain kyunki ye orders table mein nahi hai
      const res = await axios.post(`http://localhost:5000/api/orders/finalize/${cleanId}`, {
        final_total_price: grandTotal
      });
      
      if (res.status === 200) {
        // WhatsApp Message for Admin
        const message = `*FINALIZED ORDER - COLOUR PIX*%0A` +
                        `*Order ID:* ${res.data.order_id}%0A` +
                        `*Customer:* ${orderData.customer_email}%0A` +
                        `*Product:* ${orderData.product_title}%0A` +
                        `*Total Paid:* $${grandTotal.toFixed(2)}`;
        
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
        
        // Success Redirect with Permanent ID
        navigate('/order-success', { state: { permanentId: res.data.order_id } });
      }
    } catch (err) {
      console.error("Confirmation Error:", err);
      alert("Confirmation failed. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1821] text-white font-['Space_Grotesk'] flex flex-col text-left">
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-4">
        
        <div className="max-w-4xl w-full mb-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Design Review</span>
          </button>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Design Preview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Final Artwork</h3>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 group relative">
                <img 
                    src={orderData.product_img || "https://via.placeholder.com/400"} 
                    alt="Final Design" 
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                />
            </div>
          </div>

          {/* Right: Invoice Card */}
          <div className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D4D] to-[#c813ec] flex items-center justify-center">
                  <Palette size={24} />
                </div>
                <span className="text-xl font-bold">Colour Pix</span>
              </div>

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
                
                <div className="h-px bg-white/10 my-4"></div>
                
                <div className="flex justify-between text-2xl font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-[#38BDF8]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

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