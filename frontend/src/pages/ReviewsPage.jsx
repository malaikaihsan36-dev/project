import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send, RefreshCw, ThumbsUp, Share2, User, CheckCircle, Search, ChevronDown } from 'lucide-react';

const ReviewsPage = () => {
  const navigate = useNavigate();
  
  // States for Form
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Select a product...');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // States for Reviews List
  const [allReviews, setAllReviews] = useState([
    {
      id: 1,
      name: "Sarah Jenkins",
      initials: "SJ",
      date: "2 days ago",
      product: "Custom Hoodie (Black, M)",
      rating: 5,
      title: "Print quality is insane!",
      content: "I was a bit skeptical about how the gradient in my design would print on fabric, but COLOUR PIX absolutely nailed it. The colors are vibrant and exactly what I saw on screen.",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      helpful: 12,
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      name: "Marcus Ray",
      initials: "MR",
      date: "5 days ago",
      product: "Canvas Print (24x36)",
      rating: 4,
      title: "Great product, slightly slow shipping",
      content: "The canvas itself is stunning. High resolution and the frame is sturdy. It took about 2 weeks to arrive which was a bit longer than expected.",
      image: null,
      helpful: 4,
      color: "from-blue-400 to-cyan-300"
    },
    {
      id: 3,
      name: "David K.",
      initials: "DK",
      date: "1 week ago",
      product: "Custom Phone Case",
      rating: 5,
      title: "Fits perfectly!",
      content: "I love how the matte finish feels in hand. The print wraps around the edges seamlessly. Really elevated the look of my phone.",
      image: "https://images.unsplash.com/photo-1586810165616-94c631fc2f79?w=400",
      helpful: 28,
      color: "from-emerald-500 to-teal-600"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedRating || !comment || product === 'Select a product...') {
      alert("Please fill all fields and select a rating!");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name,
      initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      date: "Just now",
      product: product,
      rating: selectedRating,
      title: "My Experience",
      content: comment,
      image: null,
      helpful: 0,
      color: "from-[#FF4D4D] to-[#FF9F43]",
      verified: true
    };

    setAllReviews([newReview, ...allReviews]);
    setName('');
    setProduct('Select a product...');
    setSelectedRating(0);
    setComment('');
  };

  return (
    <div className="bg-[#0B0F1E] text-white min-h-screen font-sans selection:bg-[#FF4D4D] text-left">
      
      {/* SHARED HEADER */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="size-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43]">Colour Pix</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'Products', 'Portfolio', 'Contact'].map((item) => (
                <button key={item} onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">{item}</button>
              ))}
              <button className="text-white text-sm font-bold relative">Reviews <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span></button>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <Search size={18} className="text-gray-500" />
                <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-gray-600 outline-none" placeholder="Search reviews..." />
              </div>
              <button className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] px-6 py-2 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-16">
        
        {/* Stats Header */}
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
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">120 Reviews</p>
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
          {/* SIDEBAR FORM */}
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
                    <select value={product} onChange={(e) => setProduct(e.target.value)} className="w-full bg-black/30 rounded-xl px-4 py-3 border border-white/10 text-white text-sm appearance-none outline-none focus:border-[#FF4D4D] transition-all">
                      <option className="bg-[#0B0F1E]">Select a product...</option>
                      <option className="bg-[#0B0F1E]">Custom T-Shirt</option>
                      <option className="bg-[#0B0F1E]">Canvas Print</option>
                      <option className="bg-[#0B0F1E]">Phone Case</option>
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

          {/* REVIEWS LIST */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {allReviews.map((rev) => (
              <div key={rev.id} className="bg-[#141A3A]/30 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-full bg-gradient-to-br ${rev.color} flex items-center justify-center font-bold text-lg`}>{rev.initials}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">{rev.name}</h4>
                        <span className="bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded text-[10px] font-black uppercase border border-sky-500/20 flex items-center gap-1"><CheckCircle size={10} /> Verified Buyer</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Purchased: {rev.product}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{rev.date}</span>
                </div>
                <div className="flex text-yellow-500 gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} />)}
                </div>
                <h5 className="text-xl font-bold mb-3 text-white">{rev.title}</h5>
                <p className="text-gray-400 leading-relaxed">{rev.content}</p>
                {rev.image && <img src={rev.image} className="mt-6 h-56 w-72 rounded-2xl object-cover border border-white/10" alt="review" />}
                <div className="flex gap-6 pt-6 border-t border-white/5 mt-6">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF4D4D] transition-colors"><ThumbsUp size={16} /> Helpful ({rev.helpful})</button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"><Share2 size={16} /> Share</button>
                </div>
              </div>
            ))}
            
            {/* Using RefreshCw here to solve the warning */}
            <button className="w-full py-5 rounded-2xl border border-white/5 hover:bg-white/5 flex items-center justify-center gap-2 font-bold transition-all text-gray-400 hover:text-white">
              <RefreshCw size={18} /> Load More Reviews
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewsPage;