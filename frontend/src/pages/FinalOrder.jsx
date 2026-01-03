import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinalOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Price ko safely number mein convert karna
  const product = location.state?.product || {};
  const basePrice = Number(product.price) || 24.00; // Agar price na mile toh 24 default
  const productImg = product.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPNupThTkNEuysjN3PaIUTuPF8xq52UOjnADVm8ByPjw_MJuVZMxDvOfrrv0jCkoF6zlYenABPZ23FvoKF5ZAtUFRiPaKqkA49er_zLAm2nDyBxaRYMnF0DJutEypU6b7heTCt57sYnM7Yp9ktkjI2C7xURa1PlS8jleCSIbkYiyWYafhS5VJoJUDjam_54XhgIx8gE0T4ucYY5szQ6uqXvtXcmwbP7Bb1nXoW43GQtol9t0LtfT0dPCsZWISafJmLVam5YPVkwt1";
  const productTitle = product.title || "Premium Cotton Tee";

  const designFee = 5.00;
  const shipping = 4.50;
  const tax = 2.68;
  const total = basePrice + designFee + shipping + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c1821] text-white font-['Space_Grotesk'] flex flex-col text-left">
      {/* HEADER */}
      <header className="w-full border-b border-[#1e293b] bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 text-white cursor-pointer" onClick={() => navigate('/')}>
            <div className="size-8 text-[#38BDF8]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-wider">COLOUR PIX</h2>
          </div>
        </div>
      </header>

      <main className="flex-grow flex justify-center py-6 px-4 md:px-10 lg:px-40">
        <div className="flex flex-col max-w-[1200px] w-full gap-8">
          <nav className="flex gap-2 text-sm">
            <span className="text-[#94a3b8]">Review</span>
            <span className="text-[#94a3b8]">/</span>
            <span className="text-[#38BDF8] font-bold">Payment</span>
          </nav>

          <div className="w-full bg-[#38BDF8]/10 border border-[#38BDF8]/40 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-[#38BDF8]/20 p-2 rounded-full text-[#38BDF8]">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <div>
              <h3 className="text-[#38BDF8] font-bold text-lg">Ready to Order</h3>
              <p className="text-white/80 text-sm">Your design is locked and ready for production.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: PREVIEW */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-[#1e293b] border border-[#334155] shadow-2xl">
                <div className="w-full aspect-[4/3] bg-center bg-cover" style={{backgroundImage: `url(${productImg})`}}>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </div>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 shadow-2xl">
                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#38BDF8]">receipt_long</span>
                  ORDER SUMMARY
                </h3>
                
                <div className="flex gap-4 mb-6 border-b border-white/10 pb-6">
                  <div className="size-16 rounded-lg bg-white/5 bg-cover bg-center" style={{backgroundImage: `url(${productImg})`}}></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white font-bold text-lg">{productTitle}</p>
                    <p className="text-[#94a3b8] text-sm">Custom Order</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Item Price</span>
                    <span className="text-white">${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Design Fee</span>
                    <span className="text-white">${designFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Shipping</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Tax</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full mb-6"></div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-white text-lg">Total</span>
                  <span className="text-[#38BDF8] text-4xl font-bold">${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => alert("Success! Order Placed.")}
                  className="w-full rounded-xl bg-[#38BDF8] p-4 text-black font-black text-lg uppercase tracking-wider hover:scale-[1.02] transition-transform"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalOrder;