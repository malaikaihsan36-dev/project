import React, { useState, useRef, useEffect } from 'react';

const AdminOrders = () => {
  const designRef = useRef(null);
  const printingRef = useRef(null);
  const completedRef = useRef(null);

  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch Orders from Database ---
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/all-orders');
      const data = await response.json();
      
      // Data ko backend structure se frontend structure mein map karna
      const formattedOrders = data.map(order => ({
        id: order.order_id,
        customer: order.customer_email,
        product: order.product_title,
        status: order.status,
        // Logic to determine UI section (type)
        type: ["Printing", "Packaging"].includes(order.status) ? "printing" : 
              order.status === "Completed" ? "completed" : "design",
        date: new Date(order.created_at).toLocaleDateString(),
        estDate: "TBD" // Aap database mein est_delivery column bhi add kar sakte hain
      }));

      setAllOrders(formattedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Real-time updates ke liye har 30 seconds baad refresh
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. Update Status in Database ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Backend API call to update status
      const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // UI ko update karna
        let newType = "design";
        if (["Printing", "Packaging"].includes(newStatus)) newType = "printing";
        if (newStatus === "Completed") newType = "completed";

        setAllOrders(prev => prev.map(order => 
          order.id === id ? { ...order, status: newStatus, type: newType } : order
        ));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status in database.");
    }
  };

  const openChatInNewTab = (orderId) => {
    window.open(`/admin/chat/${orderId}`, '_blank', 'noopener,noreferrer');
  };

  const handleScroll = (e) => {
    const val = e.target.value;
    if (val === "Design") designRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (val === "Printing") printingRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (val === "Completed") completedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="text-white p-10 text-center">Loading production pipeline...</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-10 animate-in fade-in duration-500 text-left pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Orders Management</h2>
          <p className="text-[#94A3B8] mt-1 font-medium">Track and manage every stage of your production pipeline.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchOrders} className="p-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-white transition-colors">
            <span className="material-symbols-outlined">refresh</span>
          </button>
          <div className="relative">
            <select onChange={handleScroll} className="appearance-none rounded-xl bg-[#1E293B] border border-[#334155] py-2.5 pl-4 pr-10 text-sm text-[#94A3B8] outline-none focus:border-[#0df2a6] cursor-pointer">
              <option value="All">All Orders</option>
              <option value="Design">Design</option>
              <option value="Printing">Printing</option>
              <option value="Completed">Completed</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-lg">expand_more</span>
          </div>
        </div>
      </div>

      {/* --- SECTION 1: DESIGN PHASE --- */}
      <div ref={designRef} className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden scroll-mt-10">
        <div className="border-b border-[#334155] p-6 flex items-center justify-between bg-[#1E293B]/50">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-500"><span className="material-symbols-outlined">brush</span></div>
            <h3 className="text-lg font-bold text-white">Design & Revisions</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {allOrders.filter(o => o.type === 'design').map((order) => (
                <tr key={order.id} className="hover:bg-[#334155]/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">#{order.id}</p>
                    <p className="text-xs text-[#94A3B8]">{order.customer} • {order.product}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border bg-transparent outline-none cursor-pointer ${order.status === 'Revision Needed' ? 'text-red-400 border-red-500/20 bg-red-500/10' : 'text-amber-400 border-amber-500/20 bg-amber-500/10'}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Design">In Design</option>
                      <option value="Revision Needed">Revision Needed</option>
                      <option value="Printing">Printing</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      type="button"
                      onClick={() => openChatInNewTab(order.id)}
                      className="text-[#94A3B8] hover:text-[#0df2a6]"
                    >
                      <span className="material-symbols-outlined">forum</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECTION 2: PRINTING & PRODUCTION --- */}
      <div ref={printingRef} className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden scroll-mt-10">
        <div className="border-b border-[#334155] p-6 flex items-center gap-4 bg-[#1E293B]/50">
          <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500"><span className="material-symbols-outlined">print</span></div>
          <h3 className="text-lg font-bold text-white">Approved & Printing</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Production Status</th>
                <th className="px-6 py-4 text-right">Order Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {allOrders.filter(o => o.type === 'printing').map((order) => (
                <tr key={order.id} className="hover:bg-[#334155]/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">#{order.id}</p>
                    <p className="text-xs text-[#94A3B8]">{order.customer} • {order.product}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase border bg-blue-500/10 text-blue-400 border-blue-500/20 bg-transparent outline-none cursor-pointer"
                    >
                      <option value="Printing">Printing</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-white font-medium text-right">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECTION 3: COMPLETED --- */}
      <div ref={completedRef} className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden scroll-mt-10">
        <div className="border-b border-[#334155] p-6 flex items-center gap-4 bg-[#1E293B]/50">
          <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500"><span className="material-symbols-outlined">task_alt</span></div>
          <h3 className="text-lg font-bold text-white">Completed Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Completion Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {allOrders.filter(o => o.type === 'completed').map((order) => (
                <tr key={order.id} className="hover:bg-emerald-500/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">#{order.id}</td>
                  <td className="px-6 py-4 text-emerald-400 text-xs font-bold uppercase">Completed</td>
                  <td className="px-6 py-4 text-[#94A3B8] text-right">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;