import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import kiya

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state add ki
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Direct safe connection string setup bina kisi variables ki warning ke
      const response = await axios.post('process.env.REACT_APP_API_BASE_URL/api/admin/login', {
        email,
        password
      });

      if (response.status === 200) {
        // 1. Set Auth (Storage mein 'true' set karna)
        localStorage.setItem('adminAuth', 'true');
        // Aap yahan email bhi save kar sakte hain display ke liye
        localStorage.setItem('adminEmail', email);
        
        // 2. Redirect to Admin Dashboard
        navigate("/admin");
      }
    } catch (err) {
      // Agar password ghalat ho ya user na mile
      alert(err.response?.data?.error || "Ghalat Email ya Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] font-sans">
      <div className="w-full max-w-md p-8 bg-[#1E293B] rounded-2xl border border-[#334155] shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-tight">Admin Access</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6 text-left">
          <div>
            <label className="block text-[#94A3B8] text-sm mb-2 font-medium uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              disabled={loading}
              className="w-full p-3 rounded-xl bg-[#334155] text-white border border-transparent focus:border-[#0df2a6] outline-none transition-all disabled:opacity-50"
              placeholder="admin@colourpix.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] text-sm mb-2 font-medium uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="w-full p-3 rounded-xl bg-[#334155] text-white border border-transparent focus:border-[#0df2a6] outline-none transition-all disabled:opacity-50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0df2a6] hover:bg-[#0bd995] disabled:bg-[#1e293b] disabled:text-[#334155] text-[#0F172A] font-bold py-3 rounded-xl transition-all cursor-pointer mt-4 shadow-lg shadow-[#0df2a6]/10"
          >
            {loading ? "VERIFYING..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;