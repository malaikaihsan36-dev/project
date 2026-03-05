import React from 'react';

const AdminAnalytics = () => {
  const tableData = [
    { name: "Premium Hoodie", cat: "Apparel", sold: "1,204", rev: "$45,200", growth: "+12%", color: "text-[#0df2a6]" },
    { name: "Logo Mug", cat: "Drinkware", sold: "854", rev: "$12,810", growth: "+5%", color: "text-[#0df2a6]" },
    { name: "Galaxy Case", cat: "Accessories", sold: "643", rev: "$22,505", growth: "-2.4%", color: "text-red-500" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
          <p className="text-[#94A3B8] text-sm mt-1">Track your business performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1E293B] rounded-xl p-1 border border-[#334155]">
          <button className="px-4 py-2 text-xs font-medium rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors">7 Days</button>
          <button className="px-4 py-2 text-xs font-medium rounded-lg bg-[#334155] text-white shadow-md">30 Days</button>
          <button className="px-4 py-2 text-xs font-medium rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors">Year</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", val: "$84,320", icon: "payments", color: "text-[#0df2a6]", bg: "bg-[#0df2a6]/10", trend: "+12.5%", bar: "70%", barCol: "bg-[#0df2a6]" },
          { title: "Total Orders", val: "1,452", icon: "shopping_bag", color: "text-blue-400", bg: "bg-blue-500/10", trend: "+8.1%", bar: "55%", barCol: "bg-blue-500" },
          { title: "Conversion Rate", val: "3.24%", icon: "percent", color: "text-purple-400", bg: "bg-purple-500/10", trend: "-0.8%", bar: "45%", barCol: "bg-purple-500" },
          { title: "Avg. Order Value", val: "$58.00", icon: "receipt_long", color: "text-orange-400", bg: "bg-orange-500/10", trend: "+2.3%", bar: "65%", barCol: "bg-orange-500" }
        ].map((item, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl bg-[#1E293B] p-6 border border-[#334155] hover:border-[#334155]/80 transition-all">
            <div className="flex items-start justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-[#94A3B8]">{item.title}</p>
                <h3 className="mt-2 text-3xl font-bold text-white transition-colors">{item.val}</h3>
              </div>
              <div className={`rounded-xl ${item.bg} p-2 ${item.color}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-[#0df2a6]' : 'text-red-500'}`}>{item.trend}</span>
              <div className="h-1.5 flex-1 rounded-full bg-[#334155] overflow-hidden">
                <div className={`h-full ${item.barCol} rounded-full transition-all duration-1000`} style={{ width: item.bar }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Simple Bar Chart Mockup */}
        <div className="lg:col-span-2 rounded-2xl bg-[#1E293B] p-6 border border-[#334155]">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">Revenue & Order Trends</h3>
              <p className="text-xs text-[#94A3B8]">Monthly performance overview</p>
            </div>
            <div className="flex gap-4 text-[10px] uppercase tracking-wider font-bold">
               <div className="flex items-center gap-1.5 text-[#0df2a6]"><span className="h-2 w-2 rounded-full bg-[#0df2a6]"></span> Revenue</div>
               <div className="flex items-center gap-1.5 text-[#94A3B8]"><span className="h-2 w-2 rounded-full bg-[#334155]"></span> Projection</div>
            </div>
          </div>
          <div className="relative h-64 flex items-end justify-between gap-2 px-2 border-b border-[#334155]">
             {[30, 45, 35, 60, 50, 75, 85, 65, 55, 70, 40, 90].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                 <div className="w-full max-w-[32px] bg-[#0df2a6]/20 group-hover:bg-[#0df2a6] transition-all rounded-t-md relative" style={{height: `${h}%`}}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">${h}k</div>
                 </div>
                 <span className="text-[10px] text-[#94A3B8] mb-[-24px]">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Categories Circle */}
        <div className="rounded-2xl bg-[#1E293B] p-6 border border-[#334155] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 text-left">Sales by Category</h3>
          <div className="flex-1 flex items-center justify-center relative py-4">
            {/* CSS Only Pie Chart Representation */}
            <div className="w-40 h-40 rounded-full border-[14px] border-[#334155] border-t-blue-500 border-r-[#0df2a6] border-l-purple-500 rotate-45"></div>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-white">4.2k</span>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest">Total Sales</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
                { label: "Apparel", val: "40%", col: "bg-blue-500" },
                { label: "Accessories", val: "28%", col: "bg-[#0df2a6]" },
                { label: "Drinkware", val: "16%", col: "bg-purple-500" }
            ].map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${cat.col}`}></span>
                        <span className="text-[#94A3B8]">{cat.label}</span>
                    </div>
                    <span className="text-white font-bold">{cat.val}</span>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Performance Table */}
      <div className="rounded-2xl bg-[#1E293B] border border-[#334155] overflow-hidden">
        <div className="p-6 border-b border-[#334155] text-left">
          <h3 className="text-lg font-bold text-white">Product Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/30 text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Sold</th>
                <th className="px-6 py-4 font-medium">Revenue</th>
                <th className="px-6 py-4 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-[#334155]/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                  <td className="px-6 py-4 text-[#94A3B8]">{row.cat}</td>
                  <td className="px-6 py-4 text-white">{row.sold}</td>
                  <td className="px-6 py-4 text-white font-bold">{row.rev}</td>
                  <td className={`px-6 py-4 font-bold ${row.color}`}>{row.growth}</td>
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