import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, UploadCloud, Tag, MessageSquare, ExternalLink } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// Image optimization helper ko import kiya
import { getOptimizedImage } from '../components/imageHelper'; 

const AdminPortfolio = () => {
  // --- States ---
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [subjects, setSubjects] = useState([]);
  const [newCatName, setNewCatName] = useState(''); 
  const [newSubName, setNewSubName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // formData state mein project_url field add kiya
  const [formData, setFormData] = useState({ title: '', desc: '', img: '', tags: '', category: '', project_url: '' });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://melodious-enchantment-production-cdb6.up.railway.app';

  // --- Data Fetching Logic ---
  const fetchData = async () => {
    try {
      // Direct safe connection strings bina kisi variable configuration issue ke
      const [projRes, catRes, subRes] = await Promise.all([
        axios.get('${API_BASE_URL}/api/projects'),
        axios.get('${API_BASE_URL}/api/portfolio-categories'),
        axios.get('${API_BASE_URL}/api/contact-subjects')
      ]);
      setProjects(projRes.data);
      setCategories(catRes.data);
      setSubjects(subRes.data);
      
      // Agar koi category select nahi hai toh pehli category default set kardi
      if (catRes.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: catRes.data[0].name }));
      }
    } catch (err) { 
      console.error("Error fetching data:", err); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // --- Subject Management ---
  const addSubject = async () => {
    if (!newSubName.trim()) return;
    try {
      await axios.post('${API_BASE_URL}/api/contact-subjects', { name: newSubName });
      setNewSubName('');
      fetchData();
    } catch (err) { alert("Failed to add subject"); }
  };

  const deleteSubject = async (id) => {
    if (!window.confirm("Delete subject?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/contact-subjects/${id}`);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  // --- Category Management ---
  const addCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await axios.post('${API_BASE_URL}/api/portfolio-categories', { name: newCatName });
      setNewCatName('');
      fetchData(); 
    } catch (err) { alert("Failed to add category."); }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete category?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/portfolio-categories/${id}`);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  // --- Cloudinary Image Upload ---
  const onDrop = async (acceptedFiles) => {
    setIsUploading(true);
    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    data.append('upload_preset', 'my_portfolio_preset'); 
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dxduylcez/image/upload', data);
      setFormData({ ...formData, img: res.data.secure_url });
    } catch (err) { 
      alert("Upload failed."); 
    } finally { 
      setIsUploading(false); 
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    accept: {'image/*': []} 
  });

  // --- Save / Update Project Logic (Frontend AdminPortfolio.jsx) ---
const saveProject = async () => {
  // Title aur image validation
  if (!formData.title.trim()) {
    alert("Please enter a project title.");
    return;
  }
  if (!formData.img) {
    alert("Please upload an image first.");
    return;
  }

  try {
    // Payload mein backend ke mutabiq perfect mapping
    const payload = {
      title: formData.title,
      desc: formData.desc,
      img: formData.img,
      category: formData.category,
      tags: formData.tags,
      project_url: formData.project_url // Yeh backend controller mein req.body se pick hoga
    };

    if (editingId) {
      console.log("Updating ID:", editingId);
      const res = await axios.put(`${API_BASE_URL}/api/projects/${editingId}`, payload);
      alert(res.data.message || "Updated successfully!");
    } else {
      const res = await axios.post('${API_BASE_URL}/api/projects', payload);
      alert(res.data.message || "Saved successfully!");
    }

    fetchData(); // Grid refresh karega
    closeModal(); // Modal band aur form clean karega
  } catch (err) { 
    console.error("Full Error Object:", err);
    alert("Error: " + (err.response?.data?.message || err.message || "Server connection failed")); 
  }
};

  // --- Delete Project ---
  const deleteProject = async (id) => {
    if(window.confirm("Delete this project?")) {
      try { 
        await axios.delete(`${API_BASE_URL}/api/projects/${id}`); 
        fetchData(); 
      } catch (err) { 
        console.error("Delete Error:", err.response?.data || err.message);
        alert("Delete failed!"); 
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', desc: '', img: '', tags: '', category: categories[0]?.name || '', project_url: '' });
  };

  return (
    <div className="p-8 bg-[#0F172A] min-h-screen text-white text-left">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Portfolio</h2>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="relative h-[44px] px-6 rounded-xl font-bold overflow-hidden transition-all active:scale-95 group shadow-[0_0_15px_rgba(0,255,170,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ffaa] to-[#00d4ff] transition-all duration-300 group-hover:opacity-90"></div>
          <div className="relative flex items-center justify-center gap-2 text-[#060A14]">
            <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="tracking-wide">Add Project</span>
          </div>
        </button>
      </div>

      {/* Subject Manager Section */}
      <section className="mb-8 bg-[#1E293B] p-6 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 mb-4 text-[#34D399]">
          <MessageSquare size={20} />
          <h3 className="font-bold">Contact Page Subjects</h3>
        </div>
        <div className="flex gap-4 mb-4">
          <input 
            value={newSubName} 
            onChange={e => setNewSubName(e.target.value)}
            className="bg-black/30 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:border-[#34D399] flex-1"
            placeholder="New Subject..."
          />
          <button onClick={addSubject} className="bg-white/10 hover:bg-white/20 px-6 rounded-lg font-bold transition-all">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(sub => (
            <div key={sub.id} className="bg-black/20 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              {sub.name}
              <button onClick={() => deleteSubject(sub.id)} className="text-red-400 hover:text-red-500"><X size={14}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* Category Manager Section */}
      <section className="mb-12 bg-[#1E293B] p-6 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 mb-4 text-[#00ffaa]">
          <Tag size={20} />
          <h3 className="font-bold">Portfolio Filter Categories</h3>
        </div>
        <div className="flex gap-4 mb-4">
          <input 
            value={newCatName} 
            onChange={e => setNewCatName(e.target.value)}
            className="bg-black/30 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:border-[#00ffaa] flex-1"
            placeholder="New Category Name..."
          />
          <button onClick={addCategory} className="bg-white/10 hover:bg-white/20 px-6 rounded-lg font-bold transition-all">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <div key={cat.id} className="bg-black/20 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              {cat.name}
              <button onClick={() => deleteCategory(cat.id)} className="text-red-400 hover:text-red-500"><X size={14}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid (Optimized with getOptimizedImage) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p => {
          const projectId = p.id || p._id;
          return (
            <div key={projectId} className="bg-[#1F2937] p-4 rounded-xl border border-gray-700">
              <img 
                // Optimized image call for admin grid (400px width is enough)
                src={getOptimizedImage(p.img || p.image_url, 400)} 
                className="w-full h-40 object-cover rounded-lg mb-2" 
                alt={p.title} 
                loading="lazy" 
              />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <span className="text-[10px] bg-[#00ffaa]/10 text-[#00ffaa] px-2 py-0.5 rounded uppercase font-bold">{p.category}</span>
                  {p.project_url && (
                    <a href={p.project_url} target="_blank" rel="noreferrer" className="block text-xs text-blue-400 hover:underline mt-1 flex items-center gap-1">
                      <ExternalLink size={12} /> View Link
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { 
                    setEditingId(projectId); 
                    setFormData({
                      title: p.title, 
                      desc: p.description || p.desc, 
                      img: p.image_url || p.img, 
                      tags: p.tags, 
                      category: p.category,
                      project_url: p.project_url || '' // Edit mode mein link extract ho raha hai
                    }); 
                    setIsModalOpen(true); 
                  }} className="text-blue-400 p-1 hover:bg-blue-400/10 rounded"><Edit2 size={16} /></button>
                  <button onClick={() => deleteProject(projectId)} className="text-red-400 p-1 hover:bg-red-400/10 rounded"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1F2937] p-6 rounded-2xl w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
            <h2 className="text-xl mb-4 font-bold">Project Details</h2>
            
            {/* Dropzone for Image Upload */}
            <div {...getRootProps()} className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center mb-4 cursor-pointer hover:border-[#00ffaa]">
              <input {...getInputProps()} />
              {formData.img ? (
                // Preview Optimized (Small size for modal preview)
                <img src={getOptimizedImage(formData.img, 200)} alt="preview" className="h-20 mx-auto mb-2 rounded" />
              ) : (
                <UploadCloud className="mx-auto mb-2 text-gray-400" />
              )}
              <p className="text-sm text-gray-400">{isUploading ? "Uploading..." : "Click to upload image"}</p>
            </div>

            <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white outline-none focus:border-[#00ffaa]" />
            <textarea placeholder="Description" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white h-24 outline-none focus:border-[#00ffaa]" />
            
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white outline-none focus:border-[#00ffaa]">
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select>
            
            <input placeholder="Tags" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white outline-none focus:border-[#00ffaa]" />
            
            {/* Project URL / Link Input Field */}
            <input placeholder="Project URL / Link (e.g., https://example.com)" value={formData.project_url} onChange={e => setFormData({...formData, project_url: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white outline-none focus:border-[#00ffaa]" />

            <button onClick={saveProject} disabled={isUploading} className="bg-[#00ffaa] text-black w-full py-3 font-bold rounded-lg mt-4 disabled:bg-gray-600 transition-colors">
              {editingId ? "Update Project" : "Save Project"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;