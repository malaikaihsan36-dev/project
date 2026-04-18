import React, { useState, useEffect } from 'react';
import { Plus, Edit3 } from 'lucide-react'; 
// Optimization helper ko import kiya
import { getOptimizedImage } from '../components/imageHelper'; 

const AdminProducts = () => {
  // --- STATES ---
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isProdModalOpen, setIsProdModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingCatId, setEditingCatId] = useState(null); 

  // Category Form State
  const [catData, setCatData] = useState({ name: '', image: null });

  // Product Form State
  const [prodData, setProdData] = useState({
    name: '', kgRate: '', type: 'Formal', is_popular: false,
    sizes: [{ label: '', width: '', length: '' }],
    gramages: [{ label: '', value: '' }],
    addons: [{ label: '', value: '' }],
    description: '', previewImage: null
  });

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:5000/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  // --- CATEGORY OPERATIONS ---
  
  // Edit Button click handler
  const handleEditCategory = (e, cat) => {
    e.stopPropagation(); 
    setEditingCatId(cat.id);
    setCatData({ name: cat.name, image: cat.image_url });
    setIsCatModalOpen(true);
  };

  // Create or Update Category (Sends Base64 to Backend for Cloudinary)
  const saveCategory = async () => {
    const url = editingCatId 
      ? `http://localhost:5000/api/categories/${editingCatId}` 
      : 'http://localhost:5000/api/categories';
    
    const method = editingCatId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: catData.name, image_url: catData.image }),
        });

        if (response.ok) {
            setIsCatModalOpen(false);
            setEditingCatId(null);
            setCatData({ name: '', image: null });
            await fetchCategories();
            alert("Category saved successfully!");
        } else {
            const errorText = await response.text();
            alert("Server error: " + errorText);
        }
    } catch (err) {
        alert("Network error: Server is not responding");
    }
  };

  const closeCatModal = () => {
    setIsCatModalOpen(false);
    setEditingCatId(null);
    setCatData({ name: '', image: null });
  };

  const deleteCategory = async (e, id) => {
    e.stopPropagation(); 
    if (!window.confirm("Are you sure? This will PERMANENTLY delete this category and ALL its products.")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Category & Products Deleted!");
        fetchCategories();
        fetchProducts(); 
      }
    } catch (err) { console.error("Delete Category Error:", err); }
  };

  // --- PRODUCT OPERATIONS ---

  // Popular Toggle
  const togglePopular = async (product) => {
    try {
      const newStatus = !product.is_popular;
      const res = await fetch(`http://localhost:5000/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, is_popular: newStatus }),
      });
      if (res.ok) fetchProducts();
    } catch (err) { console.error("Toggle Popular Error:", err); }
  };

  const deleteProduct = async () => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${editingId}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Product Deleted!");
        closeModal();
        fetchProducts();
      }
    } catch (err) { console.error("Delete Product Error:", err); }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setSelectedCat({ id: product.category_id });
    
    // JSON parsing check for MySQL strings
    const parsedSizes = typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes;
    const parsedGrams = typeof product.gramages === 'string' ? JSON.parse(product.gramages) : product.gramages;
    const parsedAddons = typeof product.addons === 'string' ? JSON.parse(product.addons) : product.addons;

    setProdData({
      name: product.name, kgRate: product.kg_rate, type: product.type,
      is_popular: product.is_popular === 1 || product.is_popular === true,
      sizes: parsedSizes || [{ label: '', width: '', length: '' }],
      gramages: parsedGrams || [{ label: '', value: '' }],
      addons: parsedAddons || [{ label: '', value: '' }],
      description: product.description, previewImage: product.image_url
    });
    setIsProdModalOpen(true);
  };

  const closeModal = () => {
    setIsProdModalOpen(false);
    setEditingId(null);
    setProdData({
      name: '', kgRate: '', type: 'Formal', is_popular: false,
      sizes: [{ label: '', width: '', length: '' }],
      gramages: [{ label: '', value: '' }],
      addons: [{ label: '', value: '' }],
      description: '', previewImage: null
    });
  };

  // Save or Update Product
  const saveProduct = async () => {
    if (!prodData.name || !selectedCat) { alert("Please enter product name!"); return; }
    
    const payload = {
      category_id: selectedCat.id,
      name: prodData.name, kg_rate: prodData.kgRate, type: prodData.type,
      is_popular: prodData.is_popular,
      sizes: prodData.sizes.filter(s => s.label),
      gramages: prodData.gramages.filter(g => g.label),
      addons: prodData.type === 'Packaging' ? prodData.addons.filter(a => a.label) : [],
      description: prodData.description, image_url: prodData.previewImage
    };

    const url = editingId ? `http://localhost:5000/api/products/${editingId}` : 'http://localhost:5000/api/products';
    try {
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) { closeModal(); fetchProducts(); }
    } catch (err) { console.error("Save Error:", err); }
  };

  // --- FORM HELPERS ---
  const addSize = () => setProdData({...prodData, sizes: [...prodData.sizes, { label: '', width: '', length: '' }]});
  const updateSize = (idx, f, v) => { const n = [...prodData.sizes]; n[idx][f] = v; setProdData({...prodData, sizes: n}); };
  const removeSize = (idx) => { setProdData({...prodData, sizes: prodData.sizes.filter((_, i) => i !== idx)}) };
  const addGramage = () => setProdData({...prodData, gramages: [...prodData.gramages, { label: '', value: '' }]});
  const updateGramage = (idx, f, v) => { const n = [...prodData.gramages]; n[idx][f] = v; setProdData({...prodData, gramages: n}); };
  const removeGramage = (idx) => { setProdData({...prodData, gramages: prodData.gramages.filter((_, i) => i !== idx)}) };
  const addAddon = () => setProdData({...prodData, addons: [...prodData.addons, { label: '', value: '' }]});
  const updateAddon = (idx, f, v) => { const n = [...prodData.addons]; n[idx][f] = v; setProdData({...prodData, addons: n}); };
  const removeAddon = (idx) => { setProdData({...prodData, addons: prodData.addons.filter((_, i) => i !== idx)}) };

  // Image Upload Handlers (Converts to Base64)
  const handleProdImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProdData({...prodData, previewImage: reader.result});
      reader.readAsDataURL(file);
    }
  };

  const handleCatImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert("Image 2MB se kam select karein."); return; }
      const reader = new FileReader();
      reader.onloadend = () => setCatData({ ...catData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 text-left pb-10 font-sans text-white px-4">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0df2a6]"> Manage Inventory</h2>
          <p className="text-[#94A3B8] text-sm">Select a category to add products.</p>
        </div>
        <button onClick={() => setIsCatModalOpen(true)} className="relative h-[48px] px-6 rounded-xl font-bold overflow-hidden transition-all active:scale-95 group shadow-[0_0_15px_rgba(13,242,166,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0df2a6] to-[#00d4ff]"></div>
          <div className="relative flex items-center justify-center gap-2 text-[#0F172A]">
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="tracking-wide">Add Category</span>
          </div>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} onClick={() => { setSelectedCat(cat); setEditingId(null); setIsProdModalOpen(true); }} 
               className="cursor-pointer group bg-[#1E293B] border border-[#334155] rounded-2xl p-4 hover:border-[#0df2a6] transition-all relative shadow-lg">
            
            {/* ACTION BUTTONS (DELETE & EDIT) */}
            <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={(e) => handleEditCategory(e, cat)} className="bg-blue-500/10 text-blue-400 p-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                <Edit3 size={14} />
              </button>
              <button onClick={(e) => deleteCategory(e, cat.id)} className="bg-red-500/10 text-red-500 p-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all material-symbols-outlined text-sm">
                delete
              </button>
            </div>

            {/* Optimized Category Image */}
            <div 
              className="h-28 w-full rounded-xl bg-cover bg-center mb-4 border border-[#334155]" 
              style={{ backgroundImage: `url(${getOptimizedImage(cat.image_url, 400)})` }}
            ></div>
            <h3 className="font-bold text-center group-hover:text-[#0df2a6] transition-colors">{cat.name}</h3>
          </div>
        ))}
      </div>

      {/* Product Inventory Table */}
      <div className="rounded-2xl bg-[#1E293B] border border-[#334155] shadow-xl overflow-hidden">
        <div className="p-5 bg-[#334155]/20 border-b border-[#334155]"><h2 className="text-md font-bold text-white">Product Inventory</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#334155]/50 text-[#94A3B8] uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Popular</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[#334155]/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* Tiny Optimized Thumbnail for Table */}
                    <img 
                      src={getOptimizedImage(p.image_url, 50)} 
                      className="w-8 h-8 rounded bg-[#334155] object-cover" 
                      alt=""
                    />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8] text-xs">{p.category_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.type === 'Formal' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={p.is_popular === 1 || p.is_popular === true} onChange={() => togglePopular(p)} className="w-4 h-4 accent-[#0df2a6] cursor-pointer" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(p)} className="material-symbols-outlined text-[#94A3B8] hover:text-[#0df2a6] text-xl">edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CATEGORY MODAL */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#0df2a6] uppercase tracking-wider text-sm">{editingCatId ? 'Edit Category' : 'Add New Category'}</h3>
              <button onClick={closeCatModal} className="text-[#94A3B8] hover:text-white material-symbols-outlined">close</button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#94A3B8] uppercase">Category Name</label>
                <input type="text" className="w-full bg-[#334155] rounded-xl p-3 outline-none focus:ring-1 focus:ring-[#0df2a6] text-sm" placeholder="e.g. Business Cards" value={catData.name} onChange={(e) => setCatData({ ...catData, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#94A3B8] uppercase">Category Image</label>
                <div className="relative h-32 border-2 border-dashed border-[#334155] rounded-2xl flex items-center justify-center bg-[#334155]/10 overflow-hidden">
                  {catData.image ? <img src={catData.image} alt="preview" className="h-full w-full object-cover" /> : <span className="text-[10px] text-[#94A3B8]">CLICK TO UPLOAD</span>}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCatImage} />
                </div>
              </div>
            </div>
            <button onClick={saveCategory} className="w-full py-3 bg-[#0df2a6] text-[#0F172A] font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all uppercase text-xs tracking-widest">
              {editingCatId ? 'Update Category' : 'Save Category'}
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {isProdModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#1E293B] border border-[#334155] rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
            <div className="p-6 border-b border-[#334155] flex justify-between items-center">
              <h3 className="font-bold text-[#0df2a6] uppercase tracking-wider text-sm">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="text-[#94A3B8] hover:text-white material-symbols-outlined">close</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-left text-white">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold text-[#94A3B8] uppercase">Product Name</label>
                  <input type="text" className="w-full bg-[#334155] rounded-xl p-2.5 outline-none text-sm" value={prodData.name} onChange={(e)=>setProdData({...prodData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold text-[#94A3B8] uppercase">Kilogram Rate</label>
                  <input type="number" className="w-full bg-[#334155] rounded-xl p-2.5 outline-none text-sm" value={prodData.kgRate} onChange={(e)=>setProdData({...prodData, kgRate: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-3 p-4 bg-[#334155]/20 rounded-2xl border border-[#334155]">
                <div className="flex justify-between items-center"><h4 className="text-[13px] font-bold text-[#94A3B8] uppercase">Sizes</h4><button onClick={addSize} className="text-[10px] text-[#0df2a6] font-bold hover:underline">+ ADD</button></div>
                {prodData.sizes.map((s, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <input placeholder="Label" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none" value={s.label} onChange={(e)=>updateSize(idx, 'label', e.target.value)} />
                      <input placeholder="W" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none" value={s.width} onChange={(e)=>updateSize(idx, 'width', e.target.value)} />
                      <input placeholder="L" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none" value={s.length} onChange={(e)=>updateSize(idx, 'length', e.target.value)} />
                    </div>
                    {prodData.sizes.length > 1 && <button onClick={() => removeSize(idx)} className="text-red-400 material-symbols-outlined text-lg">delete</button>}
                  </div>
                ))}
              </div>

              <div className="space-y-3 p-4 bg-[#334155]/20 rounded-2xl border border-[#334155]">
                <div className="flex justify-between items-center"><h4 className="text-[13px] font-bold text-[#94A3B8] uppercase">Gramages</h4><button onClick={addGramage} className="text-[10px] text-[#0df2a6] font-bold hover:underline">+ ADD</button></div>
                {prodData.gramages.map((g, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <input placeholder="Label" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none" value={g.label} onChange={(e)=>updateGramage(idx, 'label', e.target.value)} />
                      <input placeholder="Value" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none" value={g.value} onChange={(e)=>updateGramage(idx, 'value', e.target.value)} />
                    </div>
                    {prodData.gramages.length > 1 && <button onClick={() => removeGramage(idx)} className="text-red-400 material-symbols-outlined text-lg">delete</button>}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs font-bold">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={prodData.type === 'Formal'} onChange={()=>setProdData({...prodData, type: 'Formal'})} className="accent-[#0df2a6]"/> Formal</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={prodData.type === 'Packaging'} onChange={()=>setProdData({...prodData, type: 'Packaging'})} className="accent-[#0df2a6]"/> Packaging</label>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-[#0df2a6] font-bold text-[11px] uppercase border border-[#0df2a6]/20 px-3 py-1.5 rounded-lg bg-[#0df2a6]/5">
                    <input type="checkbox" checked={prodData.is_popular} onChange={(e)=>setProdData({...prodData, is_popular: e.target.checked})} className="accent-[#0df2a6]"/>
                    Mark as Popular
                  </label>
                </div>

                {prodData.type === 'Packaging' && (
                  <div className="space-y-3 p-4 bg-purple-500/5 rounded-2xl border border-purple-500/20">
                    <div className="flex justify-between items-center"><h4 className="text-[10px] font-bold text-purple-400 uppercase">Add-ons</h4><button onClick={addAddon} className="text-[10px] text-purple-400 font-bold hover:underline">+ ADD</button></div>
                    {prodData.addons.map((a, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <input placeholder="Label" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none" value={a.label} onChange={(e)=>updateAddon(idx, 'label', e.target.value)} />
                          <input placeholder="Eq ((L*W)/144)*rate" className="bg-[#1E293B] p-2 rounded-lg text-xs outline-none font-mono" value={a.value} onChange={(e)=>updateAddon(idx, 'value', e.target.value)} />
                        </div>
                        {prodData.addons.length > 1 && <button onClick={() => removeAddon(idx)} className="text-red-400 material-symbols-outlined text-lg">delete</button>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <textarea rows="3" className="w-full bg-[#334155] rounded-xl p-3 outline-none text-xs text-white" placeholder="Description..." value={prodData.description} onChange={(e)=>setProdData({...prodData, description: e.target.value})}></textarea>
                <div className="relative h-24 border-2 border-dashed border-[#334155] rounded-xl flex items-center justify-center bg-[#334155]/10 overflow-hidden">
                  {prodData.previewImage ? <img src={prodData.previewImage} alt="preview" className="h-full w-full object-cover" /> : <span className="text-[10px] text-[#94A3B8]">UPLOAD IMAGE</span>}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleProdImage} />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#334155] flex justify-between items-center bg-[#334155]/10">
              <div>
                {editingId && (
                  <button onClick={deleteProduct} className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold rounded-lg text-[10px] uppercase transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span> Delete Product
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={closeModal} className="px-5 py-2 text-[#94A3B8] font-bold text-[10px] uppercase hover:text-white">Cancel</button>
                <button onClick={saveProduct} className="px-8 py-2.5 bg-[#0df2a6] text-[#0F172A] font-bold rounded-lg text-[10px] uppercase shadow-lg hover:scale-105 transition-all">{editingId ? 'Update' : 'Save'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;