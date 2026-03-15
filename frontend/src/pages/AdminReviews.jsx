import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Trash2, Plus, Star, Package, MessageSquare } from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [productList, setProductList] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [loading, setLoading] = useState(true);

  // --- Fetch Data Functions ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const [reviewsRes, productsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/reviews'),
        axios.get('http://localhost:5000/api/product-list')
      ]);
      setReviews(reviewsRes.data);
      setProductList(productsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Review Moderation Logic ---
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/reviews/${id}/status`, { status: newStatus });
      fetchData(); // Refresh list
    } catch (err) {
      alert("Status Update Failed");
    }
  };

  // --- Product List Management Logic ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/product-list', { name: newProductName });
      setNewProductName('');
      fetchData(); // Refresh list to show new product
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure? This will remove it from the User's dropdown.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/product-list/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-[#FF4D4D] font-bold">
      Loading Admin Panel...
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-[#0f172a] min-h-screen text-white text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* SECTION 1: MANAGE PRODUCT DROPDOWN */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-[#FF4D4D]" />
            <h2 className="text-2xl font-bold">Manage Review Products</h2>
          </div>
          
          <div className="bg-[#1e293b] p-6 rounded-3xl border border-white/5 shadow-xl">
            <form onSubmit={handleAddProduct} className="flex gap-4 mb-8">
              <input 
                value={newProductName} 
                onChange={(e) => setNewProductName(e.target.value)}
                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#FF4D4D] transition-all"
                placeholder="Add new product name (e.g. Stickers, Posters...)"
              />
              <button type="submit" className="bg-[#FF4D4D] hover:bg-[#ff3535] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                <Plus size={18} /> Add Product
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              {productList.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No products in list. Add one above.</p>
              ) : (
                productList.map((product) => (
                  <div key={product.id} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 group hover:border-[#FF4D4D]/50 transition-all">
                    <span className="text-sm font-medium">{product.name}</span>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: REVIEW MODERATION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-[#FF4D4D]" />
            <h2 className="text-2xl font-bold">Review Moderation</h2>
          </div>

          <div className="bg-[#1e293b] rounded-3xl overflow-hidden border border-white/5 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="p-5">Customer / Product</th>
                    <th className="p-5">Review Content</th>
                    <th className="p-5">Rating</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reviews.map(rev => (
                    <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5">
                        <div className="font-bold text-white">{rev.customer_name}</div>
                        <div className="text-[10px] text-[#FF4D4D] font-bold uppercase">{rev.product_name}</div>
                      </td>
                      <td className="p-5">
                        <p className="text-sm text-gray-400 max-w-xs line-clamp-2">{rev.review_text}</p>
                        <span className="text-[10px] text-gray-600 italic">{new Date(rev.created_at).toLocaleDateString()}</span>
                      </td>
                      <td className="p-5">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-gray-700"} />
                          ))}
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          rev.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                          rev.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {rev.status}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => updateStatus(rev.id, 'Approved')} 
                            className="p-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-lg transition-all"
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(rev.id, 'Rejected')} 
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                            title="Reject"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {reviews.length === 0 && (
                <div className="p-10 text-center text-gray-500">No reviews found in database.</div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminReviews;