import React from 'react';

const AdminCustomers = () => {
  const customers = [
    { name: "Emma Wilson", email: "emma.w@example.com", orders: 12, date: "Oct 25, 2023", initial: "EW", color: "text-purple-400", bg: "bg-purple-500/20" },
    { name: "Liam Johnson", email: "liam.j@example.com", orders: 5, date: "Oct 24, 2023", initial: "LJ", color: "text-blue-400", bg: "bg-blue-500/20" },
    { name: "Noah Williams", email: "noah.will@example.com", orders: 23, date: "Oct 20, 2023", initial: "NW", color: "text-orange-400", bg: "bg-orange-500/20" },
    { name: "Olivia Brown", email: "olivia.b@example.com", orders: 8, date: "Oct 19, 2023", initial: "OB", color: "text-pink-400", bg: "bg-pink-500/20" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">All Customers</h2>
          <p className="text-[#94A3B8] text-sm mt-1">Manage and view your customer base</p>
        </div>
        
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#334155] p-6">
          <h3 className="text-lg font-bold text-white">List of all customers</h3>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">search</span>
            <input className="w-full rounded-lg bg-[#334155] border-none py-2 pl-9 pr-4 text-xs text-white focus:ring-1 focus:ring-[#0df2a6]" placeholder="Search customers..." />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/50 text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Total Orders</th>
                <th className="px-6 py-4 font-medium">Last Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {customers.map((cust, i) => (
                <tr key={i} className="group transition-colors hover:bg-[#334155]/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${cust.bg} ${cust.color} font-bold border border-white/5`}>
                        {cust.initial}
                      </div>
                      <span className="text-white font-medium">{cust.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{cust.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-[#334155] px-3 py-1 text-xs font-bold text-white">{cust.orders}</span>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{cust.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-[#0df2a6] hover:underline">View details</button>
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

export default AdminCustomers;