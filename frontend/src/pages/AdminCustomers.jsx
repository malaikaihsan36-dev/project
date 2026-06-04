import React, { useState, useEffect } from 'react';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://melodious-enchantment-production-cdb6.up.railway.app';

  const fetchCustomers = async () => {
    try {
      // Direct safe connection string bina kisi variable ya template quotes ki galti ke
      const response = await fetch('${API_BASE_URL}/api/admin/customers');
      const data = await response.json();
      // Ensure data is an array before setting state
      setCustomers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-white p-10 text-center font-sans">Loading Customers...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">All Customers</h2>
          <p className="text-[#94A3B8] text-sm mt-1">Manage and view your customer base</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#334155] p-6">
          <h3 className="text-lg font-bold text-white">List of all customers</h3>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">search</span>
            <input 
              className="w-full rounded-lg bg-[#334155] border-none py-2 pl-9 pr-4 text-xs text-white focus:ring-1 focus:ring-[#0df2a6] outline-none" 
              placeholder="Search by email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/50 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Customer Email</th>
                <th className="px-6 py-4 text-center">Total Orders</th>
                <th className="px-6 py-4">Last Order Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust, i) => (
                  <tr key={i} className="group transition-colors hover:bg-[#334155]/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0df2a6]/10 text-[#0df2a6] font-bold border border-[#0df2a6]/20">
                          {cust.email ? cust.email[0].toUpperCase() : '?'}
                        </div>
                        <span className="text-white font-medium">{cust.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center rounded-full bg-[#334155] px-3 py-1 text-xs font-bold text-white border border-[#475569]">
                        {cust.total_orders}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">
                      {cust.last_order_date ? new Date(cust.last_order_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedCustomer(cust)}
                        className="text-sm font-bold text-[#0df2a6] hover:underline transition-all"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-[#94A3B8]">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DETAILS DIALOG (MODAL) --- */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-[#1E293B] border border-[#334155] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#334155] p-6 bg-[#334155]/20">
              <div>
                <h3 className="text-xl font-bold text-white">Order History</h3>
                <p className="text-sm text-[#94A3B8]">{selectedCustomer.email}</p>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <table className="w-full text-left text-sm">
                <thead className="text-[#94A3B8] uppercase text-[10px] font-bold tracking-widest border-b border-[#334155]">
                  <tr>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#334155]">
                  {selectedCustomer.order_details && selectedCustomer.order_details.map((order, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-[#0df2a6]">#{order.id.toString().padStart(4, '0')}</td>
                      <td className="py-4 text-white font-medium">{order.title}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${
                          order.status === 'Completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-[#334155] text-[#94A3B8] border-[#475569]'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right text-[#94A3B8]">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#334155] p-4 bg-[#334155]/10 text-right">
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2 rounded-xl bg-[#334155] text-white text-xs font-bold hover:bg-[#475569] transition-all border border-[#475569]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;