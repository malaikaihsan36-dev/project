import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [tempOrders, setTempOrders] = useState([]);

  useEffect(() => {
    const fetchTempOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/all-temp');
        setTempOrders(res.data);
      } catch (err) { console.error(err); }
    };
    fetchTempOrders();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 text-left">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155]">
          <p className="text-sm text-[#94A3B8]">Total Revenue</p>
          <h3 className="mt-2 text-3xl font-bold text-white">$124,500</h3>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155]">
          <p className="text-sm text-[#94A3B8]">Pending Orders</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{tempOrders.length}</h3>
        </div>
      </div>

      <div className="rounded-2xl bg-[#1E293B] p-10 border border-[#334155] text-center">
         <h2 className="text-2xl text-white font-bold">Welcome to Dashboard</h2>
         <p className="text-[#94A3B8]">Everything is running smoothly.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;