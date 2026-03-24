import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, UploadCloud, Tag, MessageSquare } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [subjects, setSubjects] = useState([]);
  const [newCatName, setNewCatName] = useState(''); 
  const [newSubName, setNewSubName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', img: '', tags: '', category: '' });

  const fetchData = async () => {
    try {
      const [projRes, catRes, subRes] = await Promise.all([
        axios.get('http://localhost:5000/api/projects'),
        axios.get('http://localhost:5000/api/portfolio-categories'),
        axios.get('http://localhost:5000/api/contact-subjects')
      ]);
      setProjects(projRes.data);
      setCategories(catRes.data);
      setSubjects(subRes.data);
      if (catRes.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: catRes.data[0].name }));
      }
    } catch (err) { console.error("Error fetching data:", err); }
  };

  useEffect(() => { fetchData(); }, []);

  const addSubject = async () => {
    if (!newSubName.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/contact-subjects', { name: newSubName });
      setNewSubName('');
      fetchData();
    } catch (err) { alert("Failed to add subject"); }
  };

  const deleteSubject = async (id) => {
    if (!window.confirm("Delete subject?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact-subjects/${id}`);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/portfolio-categories', { name: newCatName });
      setNewCatName('');
      fetchData(); 
    } catch (err) { alert("Failed to add category."); }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/portfolio-categories/${id}`);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  const onDrop = async (acceptedFiles) => {
    setIsUploading(true);
    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    data.append('upload_preset', 'my_portfolio_preset'); 
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dxduylcez/image/upload', data);
      setFormData({ ...formData, img: res.data.secure_url });
    } catch (err) { alert("Upload failed."); } finally { setIsUploading(false); }
  };

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    accept: {'image/*': []} 
  });

  const saveProject = async () => {
    try {
      const payload = {
        title: formData.title,
        desc: formData.desc,
        img: formData.img,
        category: formData.category,
        tags: formData.tags
      };

      if (editingId) {
        // UPDATE Logic
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, payload);
      } else {
        // CREATE Logic
        await axios.post('http://localhost:5000/api/projects', payload);
      }

      alert("Saved successfully!");
      fetchData();
      closeModal();
    } catch (err) { 
      console.error("Save Error:", err.response?.data || err.message);
      alert("Database save failed! Check console for details."); 
    }
  };

  const deleteProject = async (id) => {
    if(window.confirm("Delete this project?")) {
      try { 
        // id ko console mein check karein ke sahi pass ho rahi hai
        console.log("Deleting Project ID:", id);
        await axios.delete(`http://localhost:5000/api/projects/${id}`); 
        fetchData(); 
      } catch (err) { 
        console.error("Delete Error:", err.response?.data || err.message);
        alert("Delete failed! Check console."); 
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', desc: '', img: '', tags: '', category: categories[0]?.name || '' });
  };

  return (
    <div className="p-8 bg-[#0F172A] min-h-screen text-white text-left">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Portfolio</h2>
        <button 
  onClick={() => setIsModalOpen(true)} 
  className="relative h-[44px] px-6 rounded-xl font-bold overflow-hidden transition-all active:scale-95 group shadow-[0_0_15px_rgba(0,255,170,0.2)]"
>
  {/* Two-Tone Gradient (Cyan to Emerald) */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#00ffaa] to-[#00d4ff] transition-all duration-300 group-hover:opacity-90"></div>
  
  {/* Hover Glimmer Effect */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-25 bg-white transition-opacity duration-300"></div>

  {/* Button Content */}
  <div className="relative flex items-center justify-center gap-2 text-[#060A14]">
    <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500 ease-in-out" />
    <span className="tracking-wide">Add Project</span>
  </div>

  {/* Outer Glow on Hover */}
  <div className="absolute inset-0 rounded-xl group-hover:shadow-[0_0_25px_rgba(0,255,170,0.4)] transition-all pointer-events-none"></div>
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p => {
          // MySQL mein ID 'id' hoti hai, MongoDB mein '_id'
          const projectId = p.id || p._id;
          return (
            <div key={projectId} className="bg-[#1F2937] p-4 rounded-xl border border-gray-700">
              <img src={p.img || p.image_url} className="w-full h-40 object-cover rounded-lg mb-2" alt={p.title} />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <span className="text-[10px] bg-[#00ffaa]/10 text-[#00ffaa] px-2 py-0.5 rounded uppercase font-bold">{p.category}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { 
                    setEditingId(projectId); 
                    setFormData({
                      title: p.title, 
                      desc: p.description || p.desc, 
                      img: p.image_url || p.img, 
                      tags: p.tags, 
                      category: p.category
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
            <div {...getRootProps()} className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center mb-4 cursor-pointer hover:border-[#00ffaa]">
              <input {...getInputProps()} />
              {formData.img ? (
                <img src={formData.img} alt="preview" className="h-20 mx-auto mb-2 rounded" />
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