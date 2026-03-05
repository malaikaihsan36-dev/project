import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [tempOrders, setTempOrders] = useState([]);

  useEffect(() => {
    fetchTempOrders();
  }, []);

  const fetchTempOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/all-temp');
      setTempOrders(res.data);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
  };

  const extendExpiry = async (code) => {
    try {
      await axios.post('http://localhost:5000/api/orders/extend-order', { order_code: code });
      fetchTempOrders();
      alert("Expiry extended successfully!");
    } catch (err) { 
      alert("Failed to extend expiry"); 
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* 4 STAT CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] text-left">
          <div className="flex items-start justify-between">
              <div><p className="text-sm font-medium text-[#94A3B8]">Total Revenue</p><h3 className="mt-2 text-3xl font-bold text-white">$124,500</h3></div>
              <div className="rounded-xl bg-[#0df2a6]/10 p-2 text-[#0df2a6]"><span className="material-symbols-outlined">payments</span></div>
          </div>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] text-left">
          <div className="flex items-start justify-between">
              <div><p className="text-sm font-medium text-[#94A3B8]">Pending Orders</p><h3 className="mt-2 text-3xl font-bold text-white">{tempOrders.length}</h3></div>
              <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400"><span className="material-symbols-outlined">pending_actions</span></div>
          </div>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] text-left">
          <div className="flex items-start justify-between">
              <div><p className="text-sm font-medium text-[#94A3B8]">Active Users</p><h3 className="mt-2 text-3xl font-bold text-white">1,200</h3></div>
              <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400"><span className="material-symbols-outlined">group</span></div>
          </div>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] text-left">
          <div className="flex items-start justify-between">
              <div><p className="text-sm font-medium text-[#94A3B8]">Products Sold</p><h3 className="mt-2 text-3xl font-bold text-white">8,540</h3></div>
              <div className="rounded-xl bg-orange-500/10 p-2 text-orange-400"><span className="material-symbols-outlined">inventory</span></div>
          </div>
        </div>
      </div>

      {/* REVENUE GRAPH */}
      <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] text-left">
        <h3 className="text-lg font-bold text-white mb-6">Revenue Overview</h3>
        <div className="relative h-48 w-full flex items-end justify-between gap-2 px-2">
          {[35, 65, 45, 85, 55, 95, 100, 80, 70, 90, 85, 95].map((height, i) => (
            <div key={i} className="flex flex-col items-center flex-1 group">
              <div 
                style={{ height: `${height}%` }} 
                className="w-full bg-[#0df2a6]/20 border-t-2 border-[#0df2a6] rounded-t-sm group-hover:bg-[#0df2a6]/40 transition-all cursor-pointer"
              ></div>
              <span className="text-[10px] text-[#94A3B8] mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TEMPORARY CODES TABLE */}
      <div className="overflow-hidden rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl text-left">
        <div className="flex items-center justify-between border-b border-[#334155] p-6">
          <h3 className="text-lg font-bold text-white">Temporary Design Sessions</h3>
          <button className="text-sm font-medium text-[#0df2a6] hover:underline" onClick={fetchTempOrders}>Refresh List</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/50 text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Email</th>
                <th className="px-6 py-4 font-medium">Temporary Code</th>
                <th className="px-6 py-4 font-medium">Expiry Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {tempOrders.length > 0 ? tempOrders.map((order) => (
                <tr key={order.order_code} className="group transition-colors hover:bg-[#334155]/30">
                  <td className="px-6 py-4 text-white font-medium">{order.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-[#0df2a6]/10 text-[#0df2a6] px-3 py-1 rounded-md font-bold border border-[#0df2a6]/20">
                      {order.order_code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8] text-xs">
                    {new Date(order.expires_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => extendExpiry(order.order_code)} 
                      className="bg-gradient-to-r from-[#0df2a6] to-emerald-500 text-[#0F172A] px-4 py-1.5 rounded-full font-bold text-[11px] shadow-lg shadow-[#0df2a6]/10 hover:scale-105 transition-all"
                    >
                      EXTEND +3D
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-[#94A3B8]">No active sessions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;