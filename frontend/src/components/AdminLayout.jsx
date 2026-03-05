import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  const activeClass = "bg-[#334155] text-[#0df2a6] border border-[#0df2a6]/20 shadow-lg shadow-[#0df2a6]/5";
  const inactiveClass = "text-[#94A3B8] hover:bg-[#334155] hover:text-white border border-transparent";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0F172A] text-white font-['Space_Grotesk']">
      {/* SIDEBAR */}
      <aside className="hidden w-72 flex-col border-r border-[#334155] bg-[#0F172A] lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-[#334155] px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0df2a6] to-emerald-600 text-[#0F172A]">
            <span className="material-symbols-outlined">palette</span>
          </div>
          <div className="text-left">
            <h1 className="font-bold text-white tracking-wide">COLOUR PIX</h1>
            <p className="text-xs text-[#0df2a6] font-medium tracking-wider">ADMIN PANEL</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <Link to="/admin" className={`group flex items-center gap-3 rounded-full px-4 py-3 transition-all ${isActive('/admin') ? activeClass : inactiveClass}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link to="/admin/orders" className={`group flex items-center gap-3 rounded-full px-4 py-3 transition-all ${isActive('/admin/orders') ? activeClass : inactiveClass}`}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="font-medium">Orders</span>
          </Link>

          <Link to="/admin/products" className={`group flex items-center gap-3 rounded-full px-4 py-3 transition-all ${isActive('/admin/products') ? activeClass : inactiveClass}`}>
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-medium">Products</span>
          </Link>

          <Link to="/admin/customers" className={`group flex items-center gap-3 rounded-full px-4 py-3 transition-all ${isActive('/admin/customers') ? activeClass : inactiveClass}`}>
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium">Customers</span>
          </Link>

          {/* Analytics Link - NEW */}
          <Link to="/admin/analytics" className={`group flex items-center gap-3 rounded-full px-4 py-3 transition-all ${isActive('/admin/analytics') ? activeClass : inactiveClass}`}>
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="font-medium">Analytics</span>
          </Link>
          
          <div className="my-4 border-t border-[#334155]/50"></div>
          <p className="px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 text-left">Settings</p>
          
          <button className="w-full group flex items-center gap-3 rounded-full px-4 py-3 text-[#94A3B8] hover:bg-[#334155] hover:text-white transition-all text-left">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium ml-3">Settings</span>
          </button>
        </nav>

        <div className="border-t border-[#334155] p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#334155] p-3">
            <div className="h-10 w-10 rounded-full bg-slate-600"></div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-white text-left">Alex Morgan</p>
              <p className="truncate text-xs text-[#94A3B8] text-left">alex@colourpix.com</p>
            </div>
            <button onClick={handleLogout} className="text-[#94A3B8] hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between border-b border-[#334155] bg-[#0F172A]/80 px-8 backdrop-blur-md sticky top-0 z-20">
          <div className="hidden max-w-md flex-1 lg:block text-left">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">search</span>
              <input className="w-full rounded-full bg-[#334155] border-none py-2.5 pl-10 pr-4 text-sm text-white placeholder-text-muted focus:ring-1 focus:ring-[#0df2a6]" placeholder="Search..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/admin/products" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0df2a6] to-emerald-500 px-4 py-2 text-sm font-bold text-[#0F172A] shadow-lg shadow-[#0df2a6]/20 hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">New Product</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0F172A]">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;