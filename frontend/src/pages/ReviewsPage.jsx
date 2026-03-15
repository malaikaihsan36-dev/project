import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Send, ThumbsUp, Share2, User, CheckCircle, ChevronDown, RefreshCw } from 'lucide-react';
import NavBar from '../components/Navbar';

const ReviewsPage = () => {
  // States for Form
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Select a product...');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // States for Backend Data
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  // Fetch approved reviews from DB
  const fetchApprovedReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews/approved');
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product-list');
      setProductList(res.data);
    } catch (err) {
      console.error("Error fetching product list", err);
    }
  };
  fetchProducts();
  fetchApprovedReviews(); // Purana wala function
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !selectedRating || !comment || product === 'Select a product...') {
      alert("Please fill all fields and select a rating!");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/reviews', {
        customer_name: name,
        product_name: product,
        rating: selectedRating,
        review_text: comment
      });
      alert("Review submitted! Admin approval ke baad nazar aayega.");
      // Reset Form
      setName(''); setProduct('Select a product...'); setSelectedRating(0); setComment('');
    } catch (err) {
      alert("Submission failed!");
    }
  };

  // Helper for Initials (Your original logic)
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-[#0B0F1E] text-white min-h-screen font-sans selection:bg-[#FF4D4D] text-left">
      
      {/* --- FLOATING BACKGROUND GLIMMER EFFECT --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Glimmer */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF4D4D]/10 rounded-full blur-[120px] animate-pulse"></div>
        {/* Center Floating Glimmer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[150px]"></div>
        {/* Bottom Right Glimmer */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF9F43]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-16">
        
        {/* Stats Header (Original) */}
        <div className="mb-12 flex flex-col lg:flex-row gap-8 lg:items-end justify-between border-b border-white/5 pb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Customer Stories</h1>
            <p className="text-gray-400 text-lg max-w-xl">Real experiences from real creators. See what people are saying about COLOUR PIX gear.</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-center border-r border-white/10 pr-6">
              <div className="text-4xl font-black">4.8</div>
              <div className="flex text-yellow-500 gap-0.5 my-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Community Choice</p>
            </div>
            <div className="space-y-1.5">
              {[80, 12, 5].map((val, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="w-4 text-gray-400">{5-i}★</span>
                  <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400" style={{ width: `${val}%` }}></div>
                  </div>
                  <span className="text-gray-500">{val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR FORM (Original Design) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-[#141A3A]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold mb-1">Leave a Review</h3>
              <p className="text-gray-400 text-sm mb-6">Share your experience with your latest custom order.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm font-medium ml-1">Your Name</span>
                  <div className="flex items-center bg-black/30 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#FF4D4D] transition-all">
                    <User size={18} className="text-gray-500" />
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm ml-3 text-white outline-none" placeholder="e.g. Alex Doe" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
  <span className="text-gray-400 text-sm font-medium ml-1">Product</span>
  <div className="relative">
    <select 
      value={product} 
      onChange={(e) => setProduct(e.target.value)} 
      className="w-full bg-black/30 rounded-xl px-4 py-3 border border-white/10 text-white text-sm appearance-none outline-none focus:border-[#FF4D4D] transition-all"
    >
      <option className="bg-[#0B0F1E]">Select a product...</option>
      {productList.map((item) => (
        <option key={item.id} value={item.name} className="bg-[#0B0F1E]">
          {item.name}
        </option>
      ))}
    </select>
    <ChevronDown size={18} className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
  </div>
</div>

                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm font-medium ml-1">Rating</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button key={num} type="button" onMouseEnter={() => setHoverRating(num)} onMouseLeave={() => setHoverRating(0)} onClick={() => setSelectedRating(num)}>
                        <Star size={28} className={num <= (hoverRating || selectedRating) ? "text-yellow-500 fill-current" : "text-gray-700"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm font-medium ml-1">Review</span>
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-black/30 rounded-xl px-4 py-4 border border-white/10 text-white text-sm focus:border-[#FF4D4D] outline-none transition-all resize-none h-32" placeholder="Tell us what you liked..." />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all mt-2">
                  Submit Review <Send size={18} />
                </button>
              </form>
            </div>
          </aside>

          {/* REVIEWS LIST (Original Design Connected to DB) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {loading ? (
                <div className="flex justify-center py-20"><RefreshCw className="animate-spin text-[#FF4D4D]" /></div>
            ) : reviews.map((rev) => (
              <div key={rev.id} className="bg-[#141A3A]/30 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-full bg-gradient-to-br from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center font-bold text-lg`}>
                        {getInitials(rev.customer_name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">{rev.customer_name}</h4>
                        <span className="bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded text-[10px] font-black uppercase border border-sky-500/20 flex items-center gap-1"><CheckCircle size={10} /> Verified Buyer</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Purchased: {rev.product_name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{new Date(rev.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex text-yellow-500 gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} />)}
                </div>
                <h5 className="text-xl font-bold mb-3 text-white">Experience with {rev.product_name}</h5>
                <p className="text-gray-400 leading-relaxed">{rev.review_text}</p>
                
                <div className="flex gap-6 pt-6 border-t border-white/5 mt-6">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF4D4D] transition-colors"><ThumbsUp size={16} /> Helpful</button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"><Share2 size={16} /> Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewsPage;