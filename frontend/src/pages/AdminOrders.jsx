import React, { useState, useRef, useEffect } from 'react';

const AdminOrders = () => {
  const designRef = useRef(null);
  const printingRef = useRef(null);
  const completedRef = useRef(null);

  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/all-orders?nocache=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      const data = await response.json();
      
      const formattedOrders = data.map(order => {
        const isConfirmed = order.is_confirmed_flag !== null && order.is_confirmed_flag !== undefined;
        
        let phase = "design"; 
        let displayStatus = order.status;

        if (order.status === "Completed") {
          phase = "completed";
        } else if (order.status === "Printing" || order.status === "Packaging" || isConfirmed) {
          phase = "printing";
          displayStatus = order.status || "Printing";
        } else {
          phase = "design";
          displayStatus = order.is_approved === 1 ? "DESIGN REVIEW" : "IN DESIGN";
        }

        return {
          id: isConfirmed 
            ? order.is_confirmed_flag.toString().padStart(4, '0') 
            : (order.display_id || order.order_id),
          db_id: order.order_id, 
          customer: order.customer_email,
          product: order.product_title,
          status: displayStatus,
          isApproved: order.is_approved,
          expiresAt: order.expires_at ? new Date(order.expires_at) : null,
          type: phase,
          date: new Date(order.created_at).toLocaleDateString()
        };
      });

      setAllOrders(formattedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  // --- AUTO CLEANUP FUNCTION FOR EXPIRED ORDERS ---
  const cleanupExpiredOrder = async (db_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/cleanup-expired-order/${db_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchOrders(); // Refresh list after deletion
      }
    } catch (error) {
      console.error("Cleanup error:", error);
    }
  };

  const updateStatus = async (db_id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${db_id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchOrders(); 
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTimeLeft = (expiryDate) => {
  if (!expiryDate || isNaN(expiryDate.getTime())) return "--:--";
  const diff = expiryDate - currentTime;
  if (diff <= 0) return "EXPIRED";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Naya useEffect jo expired orders ko detect karke delete karega
useEffect(() => {
  const expiredOrders = allOrders.filter(o => 
    o.expiresAt && (o.expiresAt - currentTime <= 0) && o.status !== "Completed"
  );

  expiredOrders.forEach(order => {
    cleanupExpiredOrder(order.db_id);
  });
}, [currentTime, allOrders]);

  const openChatInNewTab = (orderId) => {
    window.open(`/admin/chat/${orderId}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <div className="text-white p-10 text-center font-sans">Loading production pipeline...</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-10 text-left pb-10 font-sans bg-[#0F172A]">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-10 px-4 md:px-0">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Orders Management</h2>
          <p className="text-[#94A3B8] mt-1 font-medium">Tracking Design Approval & Printing Status</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <button onClick={() => scrollToSection(designRef)} className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-xl text-[11px] font-bold transition-all uppercase tracking-wider">
            Design ({allOrders.filter(o => o.type === 'design').length})
          </button>
          <button onClick={() => scrollToSection(printingRef)} className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded-xl text-[11px] font-bold transition-all uppercase tracking-wider">
            Approved ({allOrders.filter(o => o.type === 'printing').length})
          </button>
          <button onClick={() => scrollToSection(completedRef)} className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 rounded-xl text-[11px] font-bold transition-all uppercase tracking-wider">
            Completed ({allOrders.filter(o => o.type === 'completed').length})
          </button>
        </div>
      </div>

      <div ref={designRef} className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden scroll-mt-24">
        <div className="border-b border-[#334155] p-4 flex items-center gap-4 bg-[#1E293B]/50">
          <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-500"><span className="material-symbols-outlined">brush</span></div>
          <h3 className="text-lg font-bold text-white">Design & Revisions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-3">Order Details</th>
                <th className="px-6 py-3">Time Left</th>
                <th className="px-6 py-3">Current Status</th>
                <th className="px-6 py-3 text-right">Live Chat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {allOrders.filter(o => o.type === 'design').map((order) => (
                <tr key={order.id} className="hover:bg-[#334155]/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">#{order.id}</p>
                    <p className="text-xs text-[#94A3B8]">{order.customer} • {order.product}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#0df2a6]">
                    {getTimeLeft(order.expiresAt, order.db_id)}
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'DESIGN REVIEW' ? (
                      <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30">DESIGN REVIEW</span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">IN DESIGN</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openChatInNewTab(order.db_id)} className="text-[#94A3B8] hover:text-[#0df2a6]">
                      <span className="material-symbols-outlined">forum</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div ref={printingRef} className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden scroll-mt-24">
        <div className="border-b border-[#334155] p-4 flex items-center gap-4 bg-[#1E293B]/50">
          <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500"><span className="material-symbols-outlined">print</span></div>
          <h3 className="text-lg font-bold text-white">Approved & Printing</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-3">Product Info</th>
                <th className="px-6 py-3">Production Status</th>
                <th className="px-6 py-3 text-right">Order Date</th>
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
                      onChange={(e) => updateStatus(order.db_id, e.target.value)}
                      className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase rounded-lg px-2 py-1.5 outline-none cursor-pointer hover:bg-blue-500/40 transition-all"
                    >
                      <option value="Printing" className="bg-[#1E293B]">Printing</option>
                      <option value="Packaging" className="bg-[#1E293B]">Packaging</option>
                      <option value="Completed" className="bg-[#1E293B]">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8] text-right">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div ref={completedRef} className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden scroll-mt-24">
        <div className="border-b border-[#334155] p-4 flex items-center gap-4 bg-[#1E293B]/50">
          <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500"><span className="material-symbols-outlined">task_alt</span></div>
          <h3 className="text-lg font-bold text-white">Completed Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-3">Order Details</th>
                <th className="px-6 py-3">Final Status</th>
                <th className="px-6 py-3 text-right">Completion Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {allOrders.filter(o => o.type === 'completed').map((order) => (
                <tr key={order.id} className="hover:bg-emerald-500/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">Order #{order.id}</p>
                    <p className="text-xs text-[#94A3B8]">{order.customer} • {order.product}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Completed</span>
                  </td>
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