import React, { useState } from 'react';

const AdminProducts = () => {
  // Demo Data State
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Hoodie", sku: "HD-2023-BK", category: "Apparel", material: "Cotton Blend", size: "S, M, L, XL", price: "$85.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRdWKlSF_2z_965Dkk-47IbpyQHG4ZarO-SxF_HlZgkMSP-GxKE1Nj6ukxSKNAtiVK6kRIui8TAqK01NODyGJfV_7nVgNXzRnHnZpRSVMeJDsYeCX8B9rVJGLhYDueArOcMyNBHNUOsotm0OszQ9KmZy6pvOgZP90wvdRFPTyrXY75X6Ff4mbJpBGrPmup8Ldxr6HNlDi4HLg8rNIvPvVh863ERa5VyAbiY0HRNWvUBB8dwn4U-MunfhJhi_3_EhlTnTHv7a4CRda0", materialColor: "bg-purple-400" },
    { id: 2, name: "Ceramic Mug", sku: "MG-STD-WHT", category: "Drinkware", material: "Ceramic", size: "11oz, 15oz", price: "$22.50", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJU0PdIeRnbatqclqOO0Zi8aEMx6N4Qis4cWUqLv9k5C7WQxEt8A7JWZbWXeuxFXPvjcc2Xt_qMFYNdAWKnSBYHz7hQIxUEmiTZZgtJy4LH0pi3_GUMmLbahOTVdPZUikJDasx7fv_Gaj-NwlsUDnQJ7naOY4chLdtuEwKtZdiQk__e1mhihKsia3UDkHgh2gy9l76VzKKD_td_HXyClVEbYVA_nVmdKGU-vXDWgu9KtkggXEmLV1tfiXzBZjaX7-Bu5LDg3F-fQUH", materialColor: "bg-orange-400" },
    { id: 3, name: "Galaxy Case", sku: "PH-S23-GAL", category: "Accessories", material: "Polycarbonate", size: "Samsung S23", price: "$35.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHKadq2zWGu3CTePHQO0HdFDDGO7Jxtrrr3piSSPOYR7-tTL0fs8Tkkzy8toBVrKyTzKLDqr3emhC6c9xX3ANTnsOHBeJf0-uNAbLiHMQMJP-PB9Y_wyppnR0CeMeb3gIvDovpf7wXyzzxwzsEVaFOw73nGzc1TgGr9gwCVcsoEnuoSfeJ68TMxEL6SbK4h8QQEqhpZgVm2NscKodOgQnTE0n1uEfRphER530ToadCc-mva7Dq689N3UouQiMZAmqkJ3hqkbbYbDN", materialColor: "bg-pink-400" },
    { id: 4, name: "Custom Tee", sku: "TS-BASIC-001", category: "Apparel", material: "100% Cotton", size: "XS - XXL", price: "$45.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO0TDeoVCS49MH-ez7YO_VVaxrqvrVvYDj-Gg_T4esn8rVWc_fRbGO_HP6z9lmNy8MVIWfzNOB44AJAR8mBXsZp-PsGNONpyY1BQHNhPMNd4utvJGAey1GmRBA6-BkB3wHQSCP_3uSLCTkUVb273mzc7SAXc357dNn2rgkjjDK4Fr_RrB4byS_ogag095Pg_Uvi3VEdgsrzmc8hTbhOqv92mwpmAmpqXROMkJlHF0ZgnHfjOyHG1Tj14Vi0b1COClhxI7OHfUyRtAm", materialColor: "bg-blue-400" },
  ]);

  return (
    <div className="mx-auto max-w-8xl space-y-8 animate-in fade-in duration-500 text-left pb-10">
      
      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#1E293B] p-4 border border-[#334155]">
          <p className="text-xs font-medium text-[#94A3B8]">Total Products</p>
          <p className="text-xl font-bold text-white mt-1">1,432</p>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-4 border border-[#334155]">
          <p className="text-xs font-medium text-[#94A3B8]">Low Stock</p>
          <p className="text-xl font-bold text-orange-400 mt-1">12</p>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-4 border border-[#334155]">
          <p className="text-xs font-medium text-[#94A3B8]">Out of Stock</p>
          <p className="text-xl font-bold text-red-400 mt-1">5</p>
        </div>
        <div className="rounded-2xl bg-[#1E293B] p-4 border border-[#334155]">
          <p className="text-xs font-medium text-[#94A3B8]">Categories</p>
          <p className="text-xl font-bold text-blue-400 mt-1">8</p>
        </div>
      </div>

      {/* --- PRODUCT INVENTORY TABLE --- */}
      <div className="rounded-2xl bg-[#1E293B] border border-[#334155] flex flex-col shadow-xl overflow-hidden">
        <div className="p-6 border-b border-[#334155] flex justify-between items-center bg-[#1E293B]/50">
          <h2 className="text-lg font-bold text-white">Product Inventory</h2>
          <div className="flex gap-2">
            <button className="p-2 text-[#94A3B8] hover:text-white transition-colors"><span className="material-symbols-outlined">filter_list</span></button>
            <button className="p-2 text-[#94A3B8] hover:text-white transition-colors"><span className="material-symbols-outlined">sort</span></button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/50 text-[#94A3B8] uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-[#334155]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-cover bg-center border border-[#334155]" style={{ backgroundImage: `url(${product.img})` }}></div>
                      <div>
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-xs text-[#94A3B8]">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <span className={`w-2 h-2 rounded-full ${product.materialColor}`}></span> {product.material}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#94A3B8]">{product.size}</td>
                  <td className="px-6 py-4 font-bold text-white">{product.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="h-8 w-8 rounded-full hover:bg-[#0df2a6] hover:text-[#0F172A] text-[#94A3B8] transition-colors inline-flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#334155] flex justify-center">
          <button className="text-xs text-[#0df2a6] font-bold hover:underline">View All 1,432 Products</button>
        </div>
      </div>

      {/* --- ADD NEW PRODUCT FORM --- */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Add New Product</h2>
            <p className="text-sm text-[#94A3B8]">Create a new item in your inventory.</p>
          </div>
          <div className="hidden sm:block px-3 py-1 rounded-full border border-[#334155] text-xs text-[#94A3B8] bg-[#334155]/20">
            Draft Mode
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            <div className="space-y-1 lg:col-span-6 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Product Name</label>
              <input className="w-full rounded-lg bg-[#334155] border-transparent py-3 px-4 text-white placeholder-[#94A3B8]/50 focus:border-[#0df2a6] focus:ring-0 text-sm transition-all" placeholder="e.g. Neon Sign Custom" type="text" />
            </div>
            <div className="space-y-1 lg:col-span-3 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Category</label>
              <div className="relative">
                <select className="w-full rounded-lg bg-[#334155] border-transparent py-3 px-4 text-white focus:border-[#0df2a6] focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option>Apparel</option>
                  <option>Drinkware</option>
                  <option>Tech</option>
                  <option>Stationery</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-sm">expand_more</span>
              </div>
            </div>
            <div className="space-y-1 lg:col-span-3 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Price ($)</label>
              <input className="w-full rounded-lg bg-[#334155] border-transparent py-3 px-4 text-white placeholder-[#94A3B8]/50 focus:border-[#0df2a6] focus:ring-0 text-sm transition-all" placeholder="0.00" type="number" />
            </div>
            <div className="space-y-1 lg:col-span-6 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Material</label>
              <input className="w-full rounded-lg bg-[#334155] border-transparent py-3 px-4 text-white placeholder-[#94A3B8]/50 focus:border-[#0df2a6] focus:ring-0 text-sm transition-all" placeholder="e.g. Cotton" type="text" />
            </div>
            <div className="space-y-1 lg:col-span-6 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Size Options</label>
              <input className="w-full rounded-lg bg-[#334155] border-transparent py-3 px-4 text-white placeholder-[#94A3B8]/50 focus:border-[#0df2a6] focus:ring-0 text-sm transition-all" placeholder="e.g. S, M, L" type="text" />
            </div>
            <div className="space-y-1 lg:col-span-12 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Description</label>
              <textarea className="w-full rounded-lg bg-[#334155] border-transparent py-3 px-4 text-white placeholder-[#94A3B8]/50 focus:border-[#0df2a6] focus:ring-0 text-sm transition-all min-h-[120px] resize-y" placeholder="Product details..."></textarea>
            </div>
            <div className="space-y-2 lg:col-span-12 text-left">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider ml-1">Product Images</label>
              <div className="w-full border-2 border-dashed border-[#334155] hover:border-[#0df2a6]/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#334155]/20 group">
                <div className="h-12 w-12 rounded-full bg-[#334155] flex items-center justify-center group-hover:bg-[#0df2a6] group-hover:text-[#0F172A] transition-colors mb-3">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <p className="text-sm font-medium text-white mb-1">Click or drag images here</p>
                <p className="text-xs text-[#94A3B8]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-[#334155] mt-6">
            <button className="px-6 rounded-full py-3 text-sm font-bold text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors" type="button">
              Save Draft
            </button>
            <button className="px-8 rounded-full bg-gradient-to-r from-[#0df2a6] to-emerald-500 py-3 text-sm font-bold text-[#0F172A] shadow-lg shadow-[#0df2a6]/25 hover:shadow-[#0df2a6]/40 hover:scale-[1.02] transition-all duration-300" type="button">
              Save / Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;