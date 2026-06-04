import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({ totalProductSold: 0, totalOrders: 0, conversionRate: 0, avgOrderValue: 0 });
  const [chartData, setChartData] = useState(new Array(12).fill(0));
  const [inventoryCategories, setInventoryCategories] = useState([]); 
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIndex = new Date().getMonth();

  const fetchDatabaseMetrics = async () => {
    try {
      // Direct hardcoded paths lagaye bina kisi environment variable ke lafde ke
      const [ordersRes, catsRes, productsRes] = await Promise.all([
        axios.get(`process.env.REACT_APP_API_BASE_URL/api/admin/all-orders?nocache=${Date.now()}`),
        axios.get(`process.env.REACT_APP_API_BASE_URL/api/categories`),
        axios.get(`process.env.REACT_APP_API_BASE_URL/api/products`) 
      ]);

      const allOrders = ordersRes.data;
      const allDbCategories = catsRes.data;
      const allDbProducts = productsRes.data;

      const totalProductsCount = allDbProducts.length;
      
      const mappedInventory = allDbCategories.map((cat, index) => {
        const productsInCategory = allDbProducts.filter(p => p.category_id === cat.id).length;
        const percentage = totalProductsCount > 0 
          ? Math.round((productsInCategory / totalProductsCount) * 100) 
          : 0;

        return {
          id: cat.id,
          name: cat.name,
          percentage: percentage,
          color: ["bg-[#0df2a6]", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"][index % 5]
        };
      });

      setInventoryCategories(mappedInventory);

      const completed = allOrders.filter(o => o.status === "Completed");
      setStats({
        totalOrders: allOrders.length,
        totalProductSold: completed.length,
        conversionRate: allOrders.filter(o => o.status !== "Completed" && o.status !== "Printing").length,
        avgOrderValue: allOrders.length > 0 ? (allOrders.length / 2).toFixed(1) : 0
      });

      const performanceMap = {};
      allOrders.forEach(order => {
        const pName = order.product_title || "Unknown";
        if (!performanceMap[pName]) performanceMap[pName] = { name: pName, sold: 0 };
        if (order.status === "Completed") performanceMap[pName].sold += 1;
      });
      setTableData(Object.values(performanceMap).sort((a, b) => b.sold - a.sold).slice(0, 8));

      const monthlyCounts = new Array(12).fill(0);
      allOrders.forEach(o => { if(o.created_at) monthlyCounts[new Date(o.created_at).getMonth()] += 1; });
      setChartData(monthlyCounts);

      setLoading(false);
    } catch (error) {
      console.error("SQL Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseMetrics();
    const interval = setInterval(fetchDatabaseMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-10 text-[#0df2a6] font-['Space_Grotesk'] text-center">Calculating Inventory %...</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500 pb-10 font-['Space_Grotesk'] text-left text-white">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Sold", val: stats.totalProductSold, sub: "Completed", icon: "task_alt", color: "text-[#0df2a6]", bg: "bg-[#0df2a6]/10" },
          { title: "Total Orders", val: stats.totalOrders, sub: "Database", icon: "database", color: "text-blue-400", bg: "bg-blue-500/10" },
          { title: "In Design", val: stats.conversionRate, sub: "Pending", icon: "brush", color: "text-purple-400", bg: "bg-purple-500/10" },
          { title: "Avg. Value", val: stats.avgOrderValue, sub: "Calculated", icon: "payments", color: "text-orange-400", bg: "bg-orange-500/10" }
        ].map((item, i) => (
          <div key={i} className="group rounded-2xl bg-[#1E293B] p-6 border border-[#334155] hover:border-[#0df2a6]/30 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#94A3B8]">{item.title}</p>
                <h3 className="mt-2 text-4xl font-bold">{item.val}</h3>
                <p className="text-[10px] text-[#64748B] mt-1 font-bold uppercase">{item.sub}</p>
              </div>
              <div className={`rounded-xl ${item.bg} p-2 ${item.color}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Annual Growth with Tooltip */}
        <div className="lg:col-span-2 rounded-2xl bg-[#1E293B] p-6 border border-[#334155]">
          <h3 className="text-lg font-bold mb-6">Annual Order Growth</h3>
          <div className="relative h-72 flex items-end justify-between gap-1.5 px-2">
            {chartData.map((count, i) => (
              <div key={i} className="group relative flex h-full w-full flex-col justify-end items-center gap-2 pb-6">
                {/* TOOLTIP: Nazar aayega cursor le jane par */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[#0df2a6] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold border border-[#0df2a6]/30 z-10">
                  {count} Orders
                </div>
                
                <div 
                  className={`w-full max-w-[24px] rounded-t-md transition-all duration-700 ${i === currentMonthIndex ? 'bg-[#0df2a6] shadow-[0_0_15px_rgba(13,242,166,0.3)]' : 'bg-[#334155] hover:bg-[#0df2a6]'}`} 
                  style={{ height: `${(count / 150) * 100}%`, minHeight: '4px' }}
                />
                <span className={`text-[10px] font-medium ${i === currentMonthIndex ? 'text-[#0df2a6]' : 'text-[#94A3B8]'}`}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Share */}
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155]">
          <h3 className="text-lg font-bold mb-6">Inventory Share</h3>
          <div className="space-y-6 mt-10">
            {inventoryCategories.map((cat) => (
              <div key={cat.id} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8] font-bold uppercase text-[11px] tracking-widest">{cat.name}</span>
                  <span className="font-bold text-white">{cat.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#334155] rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} transition-all duration-1000`} style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#1E293B] border border-[#334155] overflow-hidden">
        <div className="p-6 border-b border-[#334155]">
          <h3 className="text-lg font-bold">Live Product Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4 font-medium text-left">Product Name</th>
                <th className="px-6 py-4 font-medium text-right">Units Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-[#334155]/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-white text-left">{row.name}</td>
                  <td className="px-6 py-4 text-right text-[#0df2a6] font-bold tabular-nums text-lg">
                    {row.sold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;