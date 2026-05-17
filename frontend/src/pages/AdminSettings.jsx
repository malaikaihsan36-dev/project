import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Trash2, 
  ShieldCheck, 
  Mail, 
  Lock, 
  AlertCircle,
  Loader2,
  UserCheck,
  Eye,      // Naya icon
  EyeOff    // Naya icon
} from 'lucide-react';
import axios from 'axios';

const AdminSettings = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 1. Fetch Admins
  const fetchAdmins = async () => {
    try {
      // Direct connection string setup ki bina kisi external changes ke
      const res = await axios.get('http://localhost:5000/api/admin-list');
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 2. Add Admin
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    console.log("Submitting New Admin:", formData.email);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Direct connection string setup ki bina kisi external changes ke
      const res = await axios.post('http://localhost:5000/api/admin/add', {
        email: formData.email,
        password: formData.password
      });
      
      if (res.status === 201) {
        alert("New admin added successfully!");
        setFormData({ email: '', password: '', confirmPassword: '' });
        fetchAdmins();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add admin");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Admin
  const handleDeleteAdmin = async (id, email) => {
    if (admins.length <= 1) {
      alert("At least one admin must remain.");
      return;
    }

    if (window.confirm(`Are you sure you want to remove ${email}?`)) {
      try {
        // Direct connection string setup ki bina kisi external changes ke
        await axios.delete(`http://localhost:5000/api/admin/${id}`);
        setAdmins(admins.filter(admin => admin.id !== id));
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete admin");
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#0B0F1E] min-h-screen text-white text-left font-sans">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-3">
          <ShieldCheck className="text-[#00ffaa]" size={32} />
          General Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage admin access and login credentials.</p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* TOP: Add Admin Form */}
        <section>
          <div className="bg-[#141A3A]/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserPlus className="text-[#00ffaa]" size={20} />
              Add New Admin
            </h2>
            
            <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#0B0F1E] border border-white/10 rounded-xl h-12 pl-12 pr-4 focus:border-[#00ffaa] outline-none transition-all"
                    placeholder="admin@colourpix.com"
                  />
                </div>
              </div>

              {/* Password Field with Eye Icon */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-[#0B0F1E] border border-white/10 rounded-xl h-12 pl-12 pr-12 focus:border-[#00ffaa] outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00ffaa] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field with Eye Icon */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full bg-[#0B0F1E] border border-white/10 rounded-xl h-12 pl-12 pr-12 focus:border-[#00ffaa] outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00ffaa] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-[#00ffaa] to-[#00d4ff] text-[#060A14] font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,170,0.3)] transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Register Admin"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* BOTTOM: Admin List */}
        <section>
          <div className="bg-[#141A3A]/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserCheck className="text-[#00ffaa]" size={20} />
              Current Administrators
            </h2>

            {fetchLoading ? (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#00ffaa]" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 text-sm uppercase">
                      <th className="pb-4 font-medium">Admin Email</th>
                      <th className="pb-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="group">
                        <td className="py-4 text-gray-200">{admin.email}</td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-3">
              <AlertCircle className="text-orange-500 shrink-0" size={20} />
              <p className="text-xs text-orange-200/70 leading-relaxed">
                Be careful! Removing an admin will instantly revoke their access to the dashboard. You cannot remove the last remaining admin.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;