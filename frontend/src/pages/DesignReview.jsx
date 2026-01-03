import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DesignReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Action logic state for Approval and Navigation
  const [isApproved, setIsApproved] = useState(false);

  // Get data from previous customization page
  const product = location.state?.product || {
    title: "Custom Design",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLYK4Ef8YhGl-fF4zKp5RIYh5oYQdwodsZ1y8hWGWm1_jeBPWOy5kqYozHF7v1EobT9vGPsziJ5mHXPf3eqdi4TMwsP6SPKflx2RyK12WDEU53eSzVCvl59N6ERK9Uh7wYTFX03VgResjtOHCo70xh2K3UkhyTj5T8077nTHxhtWJ3k_T0QKa-nGRPW9xSZ8ypWcAqufL_SNPvx-zDybYtoP2r-hUwqg7nTk3m6_wS6lRYaFmIkCxv4vYyS5n1sxsZJC2IEiIxdC09",
    orderId: "4429"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0f231c] text-white font-['Space_Grotesk'] overflow-hidden h-screen flex flex-col text-left">
      {/* HEADER */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-[#273a34] bg-[#101816]/90 backdrop-blur-md px-6 py-3 z-50 shrink-0">
        <div className="flex items-center gap-4 text-white cursor-pointer" onClick={() => navigate('/')}>
          <div className="size-8 text-[#00ffaa]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">COLOUR PIX</h2>
        </div>
        <div className="flex items-center justify-end gap-4">
          <span className="text-[#9abcb0] text-sm hidden sm:block">Order #{product.orderId || '4429'}</span>
          <div className="relative">
            <button className="flex items-center justify-center rounded-lg size-10 bg-[#273a34] text-white hover:bg-[#00ffaa]/20 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="absolute top-1 right-2 size-2 bg-red-500 rounded-full border border-[#101816]"></div>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#273a34]" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCqp_rj5M-XmvHc1oAs3-YYOTw26G14OK5IG5TLBheH-AG0hrrXHcoKFjMohMZcwOk-kpeYn3n4mZMBXyVi753w8qgUsN9ApOXUPnlzFCt4U90kzum8Cilz-JBA3catkrsUj7cFI-OzTfa2EFmqF46yV4ij_OtEOordRIGsnRWAic55yatwkxhy-Mx28eCu8wwx6-dphd3T4cJ0N8J5bIgBJ0K0mzW2GGza_qQG5YYQiV8uY_i862c-3PjSXvVRFuukAPOl7JGXCb8")'}}></div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row h-full overflow-hidden bg-[#0f231c]">
        {/* LEFT SECTION: DESIGN PREVIEW */}
        <section className="relative flex flex-col w-full lg:w-1/2 h-[45vh] lg:h-full bg-[#0F172A] border-r border-[#273a34] overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-6 pointer-events-none">
            <div className="pointer-events-auto">
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3 shadow-lg">
                <div className="bg-[#00ffaa]/20 text-[#00ffaa] p-1 rounded">
                  <span className="material-symbols-outlined text-[18px]">layers</span>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm leading-tight">{product.title} Preview</h3>
                  <p className="text-[#9abcb0] text-xs">v1.0 • Just now</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBjx7hQ39bmjEQuj4bJ65Bpe2HfvM2pPv82w4umdTjfSPzwn5qPnj_F4lNFi7xcY_5qsyPoIzTCjGbZKsvUs5n8wjWneuMmpaMQixio20EkX8gwXtbqfMvoyiwS3---LX38ExD4OwdTGFe28JhWI74cC630KySY0_UnBY5EuSQTZ5BdEBjeeYx16kE-tnSVOpZPz348FqbZijXZhsAqX9M3rfUjhqiW-zQzZE8K30KYm-PdJdv3LrJjuSRlpFXa5hfnIB2Nv1aYAUzc)', backgroundRepeat: 'repeat'}}></div>
            <div className="relative z-0 transform transition-transform duration-500 hover:scale-105">
              <img src={product.img} alt="Design preview" className="max-w-[85%] max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(0,255,170,0.3)] mx-auto"/>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <div className="bg-black/60 backdrop-blur-md rounded-full p-1 flex items-center border border-white/10 shadow-xl">
              <button className="p-2 text-white hover:text-[#00ffaa] rounded-full"><span className="material-symbols-outlined">add</span></button>
              <span className="text-xs font-mono text-gray-300 w-12 text-center">100%</span>
              <button className="p-2 text-white hover:text-[#00ffaa] rounded-full"><span className="material-symbols-outlined">remove</span></button>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: CHAT & ACTIONS */}
        <section className="flex flex-col w-full lg:w-1/2 h-full bg-[#1F2937] relative z-10 text-left">
          <div className="p-4 border-b border-[#374151] bg-[#1F2937]/95 backdrop-blur shadow-sm shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 p-0.5">
                  <div className="size-full rounded-full bg-[#1F2937] flex items-center justify-center overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuANHopIDZZPw5Aj2rwgDUssFBDQTDJ3oM2oCjUy6lmIHP5isZ-HpT1Qh8n41gRF5mQO3nL8XlF63l6HBp4cPYKbVm1kzt_sgj1UsGRWG05NOHfMc90cII9gI4_pQlTeDwAwbai7gF_2aUXa6-unsUrrIU8JKek3T-JOGgAqmc6a--EN4C8RaYFCsmQu80ve91V17Q72egP91Y5vIQ8dRGia4OjnvRV3cPdE77eWThNRogALREap0IfuSNfZyCKiiTWcoassd9CUKes5" className="size-full object-cover" alt="Admin"/>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-[#1F2937] rounded-full"></div>
              </div>
              <div>
                <h2 className="text-white font-bold text-base">Alex from Design Team</h2>
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs text-gray-400">Online & Reviewing</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${isApproved ? 'bg-green-500/20 border-green-500/30 text-green-500' : 'bg-amber-500/20 border-amber-500/30 text-amber-500'}`}>
               {isApproved ? 'Design Approved' : 'Waiting for Approval'}
            </div>
          </div>

          {/* CHAT MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-[#1F2937]">
            <div className="flex justify-center"><span className="text-xs text-gray-500 bg-[#374151] px-3 py-1 rounded-full">Today</span></div>
            
            <div className="flex gap-3 text-left">
              <div className="size-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">A</div>
              <div className="max-w-[80%] space-y-1">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-md">
                  <p className="text-sm">Hi! I've prepared the first draft of your <b>{product.title}</b>. Does the placement look okay to you?</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse text-right">
              <div className="size-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">You</div>
              <div className="max-w-[80%] space-y-1">
                <div className="bg-[#374151] text-gray-100 px-4 py-3 rounded-2xl rounded-tr-sm">
                  <p className="text-sm">Thanks! It looks great. Let me double check the details.</p>
                </div>
              </div>
            </div>

            {isApproved && (
              <div className="flex gap-3 text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="size-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">A</div>
                <div className="max-w-[80%] space-y-1">
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-md">
                    <p className="text-sm">Perfect! I've marked it as approved. You can now proceed to place your order. 🚀</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CHAT INPUT */}
          <div className="p-4 bg-[#1F2937] border-t border-[#374151] shrink-0">
            <div className="relative flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">add_circle</span></button>
              <input className="w-full bg-[#111827] text-white border-none rounded-full py-3 px-4 focus:ring-1 focus:ring-[#00ffaa] focus:outline-none placeholder-gray-500" placeholder="Type a message..." type="text"/>
              <button className="absolute right-2 p-1.5 bg-[#00ffaa] text-black rounded-full"><span className="material-symbols-outlined text-[20px]">arrow_upward</span></button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="p-4 lg:p-6 bg-[#1F2937] border-t border-[#374151] shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsApproved(true)}
                disabled={isApproved}
                className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition-all duration-500 ${isApproved ? 'bg-green-600 opacity-80 cursor-default scale-95' : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-purple-500/30 active:scale-95'}`}
              >
                <span className="material-symbols-outlined mr-2 text-[18px]">{isApproved ? 'done_all' : 'thumb_up'}</span> 
                {isApproved ? 'Design Approved' : 'Approve Design'}
              </button>

              <button 
  disabled={!isApproved}
  onClick={() => navigate('/final-order', { state: { product: { ...product, price: 24.00 } } })}
  className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-all duration-500 ${isApproved ? 'bg-[#00ffaa] text-black shadow-[0_0_20px_rgba(0,255,170,0.4)] hover:bg-white animate-pulse cursor-pointer' : 'bg-gray-700/50 text-white/50 cursor-not-allowed border border-white/5'}`}
>
  <span className="material-symbols-outlined mr-2 text-[18px]">shopping_cart_checkout</span> Place Order
</button>
            </div>
            <p className="text-[10px] text-center text-gray-500 mt-2">
              {isApproved ? 'Click above to finalize your order.' : 'Place Order will be enabled after design approval.'}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignReview;