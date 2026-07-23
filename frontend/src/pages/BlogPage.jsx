import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock, User, ChevronRight, X, BookOpen } from 'lucide-react';
import NavBar from '../components/Navbar';

const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    document.title = "Industrial Packaging & Print Blog | ColourPix";
  }, []);

  const articles = [
    {
      id: 1,
      title: "Rigid Box vs. Folding Carton: Choosing the Right Packaging Geometry for Luxury Retail",
      category: "PACKAGING DESIGN",
      date: "JULY 15, 2026",
      readTime: "6 MIN READ",
      author: "Chief Structural Engineer",
      excerpt: "An in-depth technical analysis comparing heavy-chipboard rigid setup boxes against folding duplex cartons across durability, unboxing aesthetics, shipping weight, and per-unit production cost.",
      content: `When designing packaging for luxury consumer goods, selecting between a Rigid Setup Box and a Folding Carton dictates not only your brand's shelf presence but also your supply chain economics.

### 1. Structural Chipboard Density vs. Duplex Board
Rigid boxes are constructed using heavy 1000 to 2400 GSM grey chipboards wrapped in fine specialty paper or velvet laminates. Unlike folding cartons, rigid boxes do not collapse or flatten during transit, offering maximum compression resistance and structural protection.

Folding cartons, on the other hand, utilize 250 to 500 GSM duplex or virgin Kraft paperboard. They are die-cut and shipped flat, significantly reducing warehousing footprint and initial freight costs.

### 2. Unboxing Aesthetics & Consumer Perception
For luxury cosmetics, perfumes, jewelry, and high-end electronics, rigid boxes provide a premium "slow reveal" friction fit or magnetic closure unboxing experience that consumers associated with high value.

### 3. Recommendation Matrix
- **Choose Rigid Boxes** when unit margin is high, product weight requires heavy support, or gifting unboxing is a key marketing driver.
- **Choose Folding Cartons** for high-volume retail shelf goods, FMCG packaging, or e-commerce subscription boxes where shipping efficiency is paramount.`,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Hot Foil Stamping vs. Cold Foiling: Technical Differences, Tolerances & Cost Factors",
      category: "PRINT TECHNOLOGY",
      date: "JUNE 28, 2026",
      readTime: "8 MIN READ",
      author: "Pre-Press Specialist",
      excerpt: "Understanding how thermal heat registration in hot foil stamping creates crisp 3D metallic edges compared to inline cold foil application for complex metallic gradients.",
      content: `Metallic embellishment is one of the most effective surface treatments for capturing consumer attention on crowded retail shelves. However, print buyers frequently confuse hot foil stamping with inline cold foiling.

### 1. Hot Foil Stamping (Thermal Pressure Registration)
Hot foil stamping utilizes a magnesium or brass die heated to 100°C–150°C to transfer metallic foil film onto paperboard under heavy mechanical pressure. 

**Advantages:**
- Unmatched metallic brilliance, opacity, and sharp 3D edge definition.
- Compatible with heavy textured stocks, velvet laminates, and rigid chipboards.
- Can be combined with embossing for multi-level tactile brand logos.

### 2. Cold Foiling (UV Adhesive Transfer)
Cold foiling applies a UV-curable adhesive to the sheet via an offset printing plate, passes through a foil nip roller, and cures inline before overprinting with process inks.

**Advantages:**
- Allows multi-color metallic gradients by printing CMYK ink directly on top of silver foil.
- Highly cost-effective for large-area foil coverage on long offset runs.`,
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Understanding Paperboard GSM: How Substrate Density & Grain Direction Impact Box Strength",
      category: "MATERIAL SCIENCE",
      date: "MAY 19, 2026",
      readTime: "5 MIN READ",
      author: "Material Quality Inspector",
      excerpt: "Grammage per Square Meter (GSM) is only half the story. Learn how grain direction, burst testing, and moisture content prevent carton warping and corner bursting.",
      content: `Selecting paperboard for custom packaging requires evaluating structural metrics beyond simple GSM thickness.

### 1. Grain Direction & Crease Integrity
Paper fibers align parallel to the paper machine during manufacturing. Folding a box parallel to the fiber grain results in smooth, clean folds without cracking. Folding perpendicular to the grain without proper crease scoring risks surface cracking.

### 2. Burst Strength & Compression Resistance
Bursting strength (measured in Mullen test units or kPa) determines how much hydraulic pressure a carton wall can withstand before bursting. For heavy industrial shipping cartons, specifying high burst strength virgin Kraft prevents stacking collapse in logistics warehouses.`,
      image: "https://images.unsplash.com/photo-1616070829579-ec19d0772e2a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Pantone (PMS) vs. CMYK: Achieving 100% Brand Color Matching in Commercial Offset Press Runs",
      category: "PRINT TECHNOLOGY",
      date: "APRIL 10, 2026",
      readTime: "7 MIN READ",
      author: "Senior Colorist",
      excerpt: "Why corporate logos require dedicated Pantone spot inks rather than 4-color process simulations to ensure color consistency across paperboard batches.",
      content: `Brand color consistency is non-negotiable. A corporate logo printed in Lahore must match the exact shade printed in Karachi or Dubai.

### 1. CMYK 4-Color Process Limitations
CMYK blends cyan, magenta, yellow, and black dots to simulate colors. Slight variations in ink film thickness or paperboard absorbency can shift a brand's signature blue or red shade.

### 2. Pantone Matching System (PMS) Spot Inks
Pantone spot inks are pre-mixed ink formulations mixed according to strict chemical formulas. Running dedicated 5th or 6th spot ink stations on Heidelberg offset presses guarantees Delta-E color variance under 1.5.`,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Sustainable Packaging in Pakistan: Eco-Friendly Substrates, Recyclable Barriers & Soy Inks",
      category: "MATERIAL SCIENCE",
      date: "MARCH 22, 2026",
      readTime: "6 MIN READ",
      author: "Sustainability Lead",
      excerpt: "Exploring biodegradable barrier coatings, FSC-certified recycled paperboards, and vegetable-based inks transforming eco-conscious packaging.",
      content: `Global retail brands and Pakistani exporters face increasing pressure to eliminate single-use plastics from packaging.

### 1. Biodegradable Barrier Coatings
Traditional poly-laminated food cartons utilize plastic coatings that impede paper recycling. Water-based dispersion coatings provide oil and moisture resistance while allowing 100% repulpability in standard paper recycling mills.

### 2. Soy & Vegetable-Based Inks
Substituting petroleum-based solvent inks with soy-based ink formulations reduces volatile organic compound (VOC) emissions during printing while yielding deeper, more vibrant color pigments.`,
      image: "https://images.unsplash.com/photo-1628149455678-16f37bc392f4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Designing Dielines in ArtiosCAD: Avoiding Common Pre-Press Bleed & Crease Errors",
      category: "PACKAGING DESIGN",
      date: "FEBRUARY 14, 2026",
      readTime: "9 MIN READ",
      author: "CAD Dieline Engineer",
      excerpt: "A practical guide for graphic designers on setting proper bleed margins, fold allowances, and glue flap clearances to ensure seamless die-cutting.",
      content: `Converting a 2D graphic design into a 3D folded package requires precise dieline geometry.

### 1. Bleed Margins & Cut Line Clearance
Artwork background fills must extend at least 3mm past the cut line to prevent unprinted white paper edges if slight sheet registration movement occurs during die-cutting.

### 2. Crease Scoring & Paperboard Allowance
Every fold consumes a fraction of paperboard thickness. CAD dieline engineers automatically offset crease lines based on substrate GSM to guarantee tight, square box corners.`,
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const filteredArticles = categoryFilter === 'ALL'
    ? articles
    : articles.filter(a => a.category === categoryFilter);

  return (
    <div className="bg-[#09090B] text-white antialiased selection:bg-[#2563EB] selection:text-white font-sans min-h-screen">
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 border-b border-[#27272A]/50 bg-[#0C0C0E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-white font-bold">Blog & Insights</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] mb-4 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                TECHNICAL PACKAGING & PRINTING KNOWLEDGE
              </span>
              <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                KNOWLEDGE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-white to-[#E11D48]">
                  THAT SHAPES
                </span> <br />
                BRANDS.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-normal mb-6">
                Expert articles, technical guides, material trends, and packaging strategy written by senior print engineers and packaging designers at ColourPix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER & ARTICLES GRID */}
      <section className="py-28 border-b border-[#27272A]/50 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6">
            {['ALL', 'PACKAGING DESIGN', 'PRINT TECHNOLOGY', 'MATERIAL SCIENCE'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                    : 'bg-[#121215] text-[#A1A1AA] border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article 
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group luxury-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#2563EB] transition-all duration-500 cursor-pointer shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-7 bg-[#121215] flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-[#A1A1AA] mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#2563EB]" />{art.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#E11D48]" />{art.readTime}</span>
                    </div>

                    <h2 className="font-syne text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors leading-snug">
                      {art.title}
                    </h2>
                    
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3 line-clamp-3 font-normal">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#2563EB]">
                    <span>READ ARTICLE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-[#0F172A] border border-white/15 rounded-3xl max-w-3xl w-full p-8 md:p-12 my-8 text-left shadow-2xl space-y-6">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-mono uppercase text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-full inline-block">
              {selectedArticle.category}
            </span>

            <h1 className="font-syne text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-[#A1A1AA] border-b border-white/10 pb-4">
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <div className="prose prose-invert max-w-none text-[#E4E4E7] text-sm sm:text-base leading-relaxed space-y-4 font-normal">
              {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={pIdx} className="font-syne text-xl font-bold text-white pt-4">{paragraph.replace('### ', '')}</h3>;
                }
                return <p key={pIdx}>{paragraph}</p>;
              })}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#A1A1AA]">COLOURPIX INDUSTRIAL PUBLICATION</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0C0C0E] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white">
            HAVE A CUSTOM TECHNICAL PACKAGING QUESTION?
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Our structural engineers and material specialists are available to provide technical advice for your next packaging project.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Ask an Engineer
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

export default BlogPage;
