import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalOrders: 0, pending: 0, customers: 0, sold: 0 });
    const [chartData, setChartData] = useState(new Array(12).fill(0));
    const [allOrders, setAllOrders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = new Date().getMonth();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://colourpix.pk';

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchData = async () => {
        try {
            // Hardcoded connection link ko secure connection string mein badal diya bina kuch badle
            const res = await axios.get(`${API_BASE_URL}/api/admin/all-orders?nocache=${Date.now()}`);
            const data = res.data;

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
                    id: isConfirmed ? order.is_confirmed_flag.toString().padStart(4, '0') : (order.display_id || order.order_id),
                    db_id: order.order_id, 
                    customer: order.customer_email,
                    product: order.product_title,
                    status: displayStatus,
                    expiresAt: order.expires_at ? new Date(order.expires_at) : null,
                    type: phase,
                    created_at: order.created_at
                };
            });

            setAllOrders(formattedOrders);

            setStats({
                totalOrders: data.length, // Total orders in database
                pending: formattedOrders.filter(o => o.type === 'design').length,
                customers: [...new Set(data.map(o => o.customer_email))].length,
                sold: data.filter(o => o.status === "Completed").length
            });

            const monthlyCounts = new Array(12).fill(0);
            data.forEach(o => {
                if (o.created_at) {
                    const month = new Date(o.created_at).getMonth();
                    monthlyCounts[month] += 1;
                }
            });
            setChartData(monthlyCounts);
            setLoading(false);
        } catch (error) {
            console.error("Dashboard Sync Error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const dbInterval = setInterval(fetchData, 30000);
        return () => clearInterval(dbInterval);
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

    if (loading) return <div className="p-10 text-center text-primary font-bold">Loading Live Data...</div>;

    return (
        <div className="mx-auto max-w-7xl space-y-8 p-8 sm:p-8">
            
            {/* Stats Grid - Total Orders Updated */}
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Orders", val: stats.totalOrders, icon: "reorder", color: "text-primary", bg: "bg-primary/10" },
                    { label: "Pending Orders", val: stats.pending, icon: "pending_actions", color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Active Customers", val: stats.customers, icon: "group", color: "text-purple-400", bg: "bg-purple-500/10" },
                    { label: "Products Sold", val: stats.sold, icon: "inventory", color: "text-orange-400", bg: "bg-orange-500/10" }
                ].map((card, i) => (
                    <div key={i} className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-[#94A3B8]">{card.label}</p>
                                <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{card.val}</h3>
                            </div>
                            <div className={`rounded-xl ${card.bg} p-2 ${card.color}`}>
                                <span className="material-symbols-outlined">{card.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Growth Chart - Bar Height set to 200 orders max */}
            <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] shadow-xl">
                <h3 className="text-lg font-bold text-white mb-10">Annual Order Growth </h3>
                <div className="relative h-64 flex items-end justify-between gap-2 px-2">
                    {chartData.map((count, i) => {
                        const barHeight = Math.min((count / 200) * 100, 100);
                        return (
                            <div key={i} className="group relative flex h-full w-full flex-col justify-end items-center gap-2 pb-6">
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-primary text-[11px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-primary/30 z-30 whitespace-nowrap">
                                    {count} Orders
                                </div>
                                <div 
                                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-700 ${i === currentMonthIndex ? 'bg-primary shadow-[0_0_20px_rgba(13,242,166,0.4)]' : 'bg-[#334155]'}`} 
                                    style={{ height: `${Math.max(barHeight, 4)}%` }}
                                />
                                <span className={`text-[10px] font-bold ${i === currentMonthIndex ? 'text-primary' : 'text-[#94A3B8]'}`}>{months[i]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Design & Revisions Table */}
            <div className="overflow-hidden rounded-2xl bg-[#1E293B] border border-[#334155] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#334155] p-6 bg-[#1E293B]/50">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Sync</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#334155]/50 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Time Left</th>
                                <th className="px-6 py-4 text-right">Current Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#334155]">
                            {allOrders.filter(o => o.type === 'design').length > 0 ? (
                                allOrders.filter(o => o.type === 'design').map((order) => (
                                    <tr key={order.db_id} className="hover:bg-[#334155]/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-white">#{order.id}</p>
                                            <p className="text-xs text-[#94A3B8]">{order.customer} • {order.product}</p>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-[#0df2a6]">
                                            {getTimeLeft(order.expiresAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {order.status === 'DESIGN REVIEW' ? (
                                                <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30">DESIGN REVIEW</span>
                                            ) : (
                                                <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">IN DESIGN</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-10 text-center text-[#94A3B8]">No active designs found</td>
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