import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Send, RefreshCw, ThumbsUp, Share2, User, CheckCircle, ChevronDown } from 'lucide-react';

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const reviews = [
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
      helpful: 4,
      color: "from-blue-400 to-cyan-300"
    }
  ];

  return (
    <div className="bg-[#0B0F1E] text-white min-h-screen font-sans selection:bg-[#FF4D4D] text-left">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1E]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="size-10 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#FF9F43] flex items-center justify-center text-white font-bold text-xl">C</div>
              <span className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-[#FF9F43]">Colour Pix</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'Products', 'Portfolio', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              <button className="text-white text-sm font-bold relative">
                Reviews
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43]"></span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <Search size={18} className="text-gray-500" />
                <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-gray-600" placeholder="Search reviews..." />
              </div>
              <button className="bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] px-6 py-2 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-16">
        
        {/* Header Stats */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-end border-b border-white/5 pb-12 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">Customer Stories</h1>
            <p className="text-gray-400 text-lg max-w-xl">Real experiences from real creators. See what people are saying about COLOUR PIX gear.</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center gap-8">
            <div className="text-center border-r border-white/10 pr-8">
              <div className="text-5xl font-black">4.8</div>
              <div className="flex text-yellow-500 gap-1 my-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">120 Reviews</div>
            </div>
            <div className="space-y-2">
              {[80, 12, 5].map((val, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-bold">
                  <span className="w-4 text-gray-400">{5-i}★</span>
                  <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400" style={{ width: `${val}%` }}></div>
                  </div>
                  <span className="text-gray-500">{val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar: Leave Review */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-[#141A3A]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-2">Leave a Review</h3>
              <p className="text-gray-400 text-sm mb-8">Share your experience with the world.</p>
              
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Your Name</label>
                  <div className="flex items-center bg-black/20 rounded-xl border border-white/10 px-4 h-14">
                    <User size={18} className="text-gray-600" />
                    <input className="bg-transparent border-none focus:ring-0 w-full text-sm ml-3" placeholder="e.g. Alex Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onMouseEnter={() => setHoverRating(num)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setSelectedRating(num)}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          size={32} 
                          className={num <= (hoverRating || selectedRating) ? "text-yellow-500 fill-current" : "text-gray-700"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Review</label>
                  <textarea className="w-full bg-black/20 rounded-2xl border border-white/10 p-4 h-32 focus:border-[#FF4D4D] outline-none transition-all resize-none text-sm" placeholder="Tell us what you liked..." />
                </div>

                <button className="w-full bg-gradient-to-r from-[#FF4D4D] to-[#FF9F43] h-14 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-[#FF4D4D]/20 transition-all active:scale-95">
                  Submit Review <Send size={18} />
                </button>
              </form>
            </div>
          </aside>

          {/* Feed: Reviews List */}
          <div className="lg:col-span-8 space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold">All Reviews</button>
              <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:border-[#FF4D4D] transition-all">Verified Buyers</button>
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                <span>Sort by:</span>
                <select className="bg-transparent border-none font-bold text-white focus:ring-0 cursor-pointer">
                  <option className="bg-[#0B0F1E]">Most Recent</option>
                  <option className="bg-[#0B0F1E]">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* Review Cards */}
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-full bg-gradient-to-br ${rev.color} flex items-center justify-center font-bold text-lg shadow-lg`}>
                      {rev.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold">{rev.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">
                          <CheckCircle size={10} /> Verified Buyer
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Purchased: {rev.product}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{rev.date}</span>
                </div>

                <div className="flex text-yellow-500 gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} />)}
                </div>
                <h5 className="text-xl font-bold mb-3">{rev.title}</h5>
                <p className="text-gray-400 leading-relaxed mb-6">{rev.content}</p>

                {rev.image && (
                  <div className="mb-6 h-64 w-full md:w-80 rounded-2xl overflow-hidden border border-white/10">
                    <img src={rev.image} alt="Review" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}

                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF4D4D] transition-colors">
                    <ThumbsUp size={16} /> Helpful ({rev.helpful})
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            ))}

            <button className="w-full py-4 rounded-2xl border border-white/5 hover:bg-white/5 flex items-center justify-center gap-2 font-bold transition-all text-gray-400 hover:text-white">
              <RefreshCw size={18} /> Load More Reviews
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewsPage;