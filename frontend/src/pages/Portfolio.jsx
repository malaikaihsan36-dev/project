import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import NavBar from '../components/Navbar'; 
import axios from 'axios'; 

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Projects');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state add ki hai

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        console.log("Full Data from DB:", res.data); 
        setProjects(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter logic (Case-insensitive check for safety)
const filteredProjects = activeTab === 'All Projects' 
  ? projects 
  : projects.filter(p => {
      // Agar category null hai to ignore karein
      if (!p.category) return false;
      
      // Dono side se spaces khatam karke match karein
      return p.category.trim().toLowerCase() === activeTab.trim().toLowerCase();
    });
  const tabs = ['All Projects', 'Apparel', 'Mugs & Ceramics', 'Stationery', 'Large Format'];

  return (
    <div className="bg-[#0B0F1E] font-sans text-white overflow-x-hidden min-h-screen flex flex-col relative text-left">
      <NavBar />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f302a] via-[#0f1715] to-[#000000] pt-32 pb-0">
        
        <section className="relative pb-12 px-4 md:px-10 text-center max-w-7xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-black mb-4">Crafting Your Vision</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Real-world examples of pixel-perfect production.</p>
        </section>

        {/* Filter Bar */}
        <div className="sticky top-20 z-40 bg-[#0f1715]/95 backdrop-blur-sm border-b border-[#39564c]">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex overflow-x-auto gap-8 no-scrollbar py-4">
            {tabs.map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeTab === tab ? 'text-white border-b-2 border-[#FF7F50] pb-1' : 'text-[#9abcb0] hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
          {loading ? (
            <div className="text-center py-20 text-[#00ffaa] font-mono">Loading Projects...</div>
          ) : filteredProjects.length === 0 ? (
  <div className="text-center py-20">
    <p className="text-gray-500">No projects found in "{activeTab}"</p>
    <p className="text-xs text-gray-700">Total projects in DB: {projects.length}</p>
  </div>
) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((item) => (
                <div key={item.id} className="group bg-[#1F2937] rounded-lg overflow-hidden border border-[#374151] hover:border-[#FF7F50]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,127,80,0.2)] flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden bg-gray-800">
                    <img 
                      src={item.image_url || item.img || 'https://via.placeholder.com/400x300?text=No+Image'} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Error+Loading+Image' }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                      <span className="text-[#00ffaa] text-sm font-medium mb-4 font-mono">Premium Quality</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h3>
                      <div className="flex text-yellow-400 gap-0.5"><Star size={14} fill="currentColor" /></div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {item.description || item.desc || "High-quality custom production for our clients."}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.tags && (typeof item.tags === 'string' ? item.tags.split(',') : item.tags).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-[#0f1715] text-[#9abcb0] text-[10px] uppercase font-black rounded border border-[#39564c] tracking-widest">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

                
        {/* Case Study Section - Same design */}
        <section className="py-20 bg-[#1F2937]/30 border-t border-[#273a34]">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-12 items-center text-left">
            <div className="flex-1 w-full relative h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800" className="w-full h-full object-cover" alt="Case Study" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 flex items-center p-10">
                <div>
                  <span className="bg-[#00ffaa] text-black text-[10px] font-black px-3 py-1 rounded-full mb-4 inline-block tracking-widest uppercase">Success Story</span>
                  <h3 className="text-white text-3xl font-bold mb-2">Digital to Physical</h3>
                  <p className="text-gray-300 text-sm">Perfect color reproduction for TechFlow hoodie line.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-[#101816] p-8 rounded-2xl border border-[#39564c]">
              <div className="flex text-yellow-400 mb-4 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-white text-xl font-medium italic mb-6">"The precision of the mockup vs final product is unbelievable."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full border-2 border-[#00ffaa] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?u=1" alt="Sarah" />
                </div>
                <div><p className="text-white font-bold">Sarah Jenkins</p><p className="text-[#00ffaa] text-xs font-bold uppercase">TechFlow Inc.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Same design */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1F2937] to-[#0B0F1E] rounded-3xl p-12 border border-[#39564c]">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start your own masterpiece?</h2>
            <p className="text-gray-400 text-lg mb-10">
              Join thousands of creators who trust COLOUR PIX for their custom merchandise. Guaranteed quality, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="px-10 py-4 bg-[#00ffaa] hover:bg-white text-black font-black rounded-xl transition-all">Start Custom Order</button>
              <button onClick={() => navigate('/catalog')} className="px-10 py-4 border border-gray-600 text-white hover:bg-white/5 font-bold rounded-xl transition-all">Request Sample Kit</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;