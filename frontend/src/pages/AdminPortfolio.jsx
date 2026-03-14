import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '', tags: '', category: 'Apparel' });

  // 1. Fetch data from MySQL on load
  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onDrop = async (acceptedFiles) => {
    setIsUploading(true);
    const file = acceptedFiles[0];
    const data = new FormData();
    data.append('file', file);
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'image/*': []}, noClick: true });

  // 2. Save to MySQL
  const saveProject = async () => {
  try {
    // Console check taake humein pata chale hum bhej kya rahy hain
    console.log("Sending to Backend:", formData);

    const payload = {
      title: formData.title,
      desc: formData.desc || formData.description, // Ensure this isn't empty
      img: formData.img || formData.image_url,    // Ensure this isn't empty
      category: formData.category,
      tags: formData.tags
    };

    const url = editingId 
      ? `http://localhost:5000/api/projects/${editingId}` 
      : 'http://localhost:5000/api/projects';
    
    const method = editingId ? 'put' : 'post';
    const res = await axios[method](url, payload);
    
    console.log("Server Response:", res.data);
    alert("Saved to Database successfully!");
    
    fetchProjects(); 
    closeModal();
  } catch (err) {
    // Agar error aaye to details check karein
    console.error("Save Error Details:", err.response?.data || err.message);
    alert("Database save failed! Check terminal for SQL errors.");
  }
};

  // 3. Delete from MySQL
  const deleteProject = async (id) => {
    if(window.confirm("Delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', desc: '', img: '', tags: '', category: 'Apparel' });
  };

  return (
    <div className="p-8 bg-[#0F172A] min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Portfolio</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#00ffaa] text-black px-6 py-2 font-bold rounded-lg flex items-center gap-2">
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-[#1F2937] p-4 rounded-xl border border-gray-700">
            <img src={p.img || p.image_url} className="w-full h-40 object-cover rounded-lg mb-2" alt={p.title} />
            <h3 className="font-bold text-lg">{p.title}</h3>
            <div className="flex gap-2 mt-4">
              <button onClick={() => { 
                setEditingId(p.id); 
                setFormData({title: p.title, desc: p.description || p.desc, img: p.image_url || p.img, tags: p.tags, category: p.category}); 
                setIsModalOpen(true); 
              }} className="text-blue-400"><Edit2 size={16} /></button>
              <button onClick={() => deleteProject(p.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

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
            
            <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white" />
            <textarea placeholder="Description" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white h-24" />
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white">
                <option value="Apparel">Apparel</option>
                <option value="Mugs & Ceramics">Mugs & Ceramics</option>
                <option value="Stationery">Stationery</option>
                <option value="Large Format">Large Format</option>
            </select>
            <input placeholder="Tags (e.g. Print, Cotton)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full p-2 bg-black/50 border border-gray-700 rounded mb-2 text-white" />
            
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