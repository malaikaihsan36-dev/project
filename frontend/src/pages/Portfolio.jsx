import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import NavBar from '../components/Navbar';
import axios from 'axios';
import { getOptimizedImage } from '../components/imageHelper';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All Projects');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Industrial Portfolio & Case Studies | ColourPix";
    
    const fetchData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/portfolio-categories')
        ]);
        setProjects(projRes.data);
        const dynamicTabs = ['All Projects', ...catRes.data.map(c => c.name)];
        setCategories(dynamicTabs);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = activeTab === 'All Projects' 
    ? projects 
    : projects.filter(p => {
        if (!p.category) return false;
        return p.category.trim().toLowerCase() === activeTab.trim().toLowerCase();
      });

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Portfolio</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                MANUFACTURING PROOF & CASE STUDIES
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                CRAFTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  BRAND
                </span> <br />
                EXCELLENCE.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Explore real-world examples of our luxury rigid boxes, offset commercial printing, hot foil stamped cartons, and enterprise packaging supply across Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR & PROJECTS GRID */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Dynamic Categories Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                    : 'bg-[#121215] text-[#A1A1AA] border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Gallery Grid */}
          {loading ? (
            <div className="text-center py-24 font-mono text-[#2563EB]">Loading Manufacturing Projects...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24 text-gray-500 font-mono">
              No production items found in "{activeTab}". Total in DB: {projects.length}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <div 
                  key={project.id || idx}
                  className="group luxury-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#2563EB] transition-all duration-500 shadow-xl"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={getOptimizedImage(project.image_url || project.image)} 
                      alt={project.title}
                      className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        {project.category || 'PACKAGING'}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 bg-[#121215] flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="font-syne text-2xl font-bold text-white mb-2 group-hover:text-[#2563EB] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-normal">
                        {project.description || project.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E4E4E7]">
                      <span className="text-[#2563EB]">MANUFACTURING VERIFIED</span>
                      <Link to="/contact" className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                        <span>INQUIRE RUN</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            WANT CUSTOM PRODUCTION SAMPLES?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            We provide physical 1:1 CAD dieline samples and color proofs prior to bulk manufacturing.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Request Prototype Sample
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050507] border-t border-[#27272A] py-12 text-center text-xs font-mono text-[#A1A1AA]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© 1991 – 2026 COLOURPIX PACKAGING & PRINTING MFG. ALL RIGHTS RESERVED.</span>
          <span className="text-[#2563EB]">LCCI REGISTERED MEMBER #1991-PK</span>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;