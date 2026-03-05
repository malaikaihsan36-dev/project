import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple verification
    if (email === "admin@colourpix.com" && password === "admin123") {
      localStorage.setItem('adminAuth', 'true');
      window.location.href = "/admin"; // Page reload ho kar dashboard khul jaye ga
    } else {
      alert("Ghalat Email ya Password!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] font-sans">
      <div className="w-full max-w-md p-8 bg-[#1E293B] rounded-2xl border border-[#334155] shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Admin Access</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-[#94A3B8] text-sm mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-3 rounded-xl bg-[#334155] text-white border border-transparent focus:border-[#0df2a6] outline-none"
              placeholder="admin@colourpix.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] text-sm mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 rounded-xl bg-[#334155] text-white border border-transparent focus:border-[#0df2a6] outline-none"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#0df2a6] hover:bg-[#0bd995] text-[#0F172A] font-bold py-3 rounded-xl transition-all cursor-pointer mt-4"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;