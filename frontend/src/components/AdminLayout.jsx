import React from 'react';
// 1. 'Link' aur 'useLocation' ko hata diya gaya hai kyunki NavLink khud handle kar raha hai
import { Outlet, useNavigate, NavLink } from 'react-router-dom';

const AdminLayout = () => {
  // 2. 'location' wali line delete kar di hai
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  // Common classes for cleaner code
  const navLinkClass = ({ isActive }) => 
    `group flex items-center gap-3 rounded-full px-4 py-3 transition-all border ${
      isActive 
        ? "bg-[#334155] text-[#0df2a6] border-[#0df2a6]/20 shadow-lg shadow-[#0df2a6]/5" 
        : "text-[#94A3B8] hover:bg-[#334155] hover:text-white border-transparent"
    }`;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0F172A] text-white font-['Space_Grotesk'] text-left">
      {/* SIDEBAR */}
      <aside className="hidden w-72 flex-col border-r border-[#334155] bg-[#0F172A] lg:flex shrink-0">
        <div className="flex h-20 items-center gap-3 border-b border-[#334155] px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0df2a6] to-emerald-600 text-[#0F172A]">
            <span className="material-symbols-outlined">palette</span>
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide">COLOUR PIX</h1>
            <p className="text-xs text-[#0df2a6] font-medium tracking-wider">ADMIN PANEL</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {/* Dashboard */}
          <NavLink to="/admin" end className={navLinkClass}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </NavLink>

          {/* Orders */}
          <NavLink to="/admin/orders" className={navLinkClass}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="font-medium">Orders</span>
          </NavLink>

          {/* Portfolio */}
          <NavLink to="/admin/portfolio" className={navLinkClass}>
            <span className="material-symbols-outlined">photo_library</span>
            <span className="font-medium">Portfolio</span>
          </NavLink>

          {/* Reviews - NEW LINK ADDED */}
          <NavLink to="/admin/reviews" className={navLinkClass}>
            <span className="material-symbols-outlined">reviews</span>
            <span className="font-medium">Reviews</span>
          </NavLink>

          {/* Customers */}
          <NavLink to="/admin/customers" className={navLinkClass}>
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium">Customers</span>
          </NavLink>

          {/* Analytics */}
          <NavLink to="/admin/analytics" className={navLinkClass}>
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="font-medium">Analytics</span>
          </NavLink>
          
          <div className="my-4 border-t border-[#334155]/50"></div>
          <p className="px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Settings</p>
          
          <button className="w-full group flex items-center gap-3 rounded-full px-4 py-3 text-[#94A3B8] hover:bg-[#334155] hover:text-white transition-all text-left">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">General Settings</span>
          </button>
        </nav>

        {/* PROFILE / LOGOUT */}
        <div className="border-t border-[#334155] p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#334155] p-3">
            <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center">
               <span className="material-symbols-outlined text-white">person</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-white">Alex Morgan</p>
              <p className="truncate text-xs text-[#94A3B8]">Super Admin</p>
            </div>
            <button onClick={handleLogout} className="text-[#94A3B8] hover:text-red-400 transition-colors" title="Logout">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between border-b border-[#334155] bg-[#0F172A]/80 px-8 backdrop-blur-md sticky top-0 z-20">
          <div className="hidden max-w-md flex-1 lg:block">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">search</span>
              <input className="w-full rounded-full bg-[#334155] border-none py-2.5 pl-10 pr-4 text-sm text-white placeholder-text-muted focus:ring-1 focus:ring-[#0df2a6]" placeholder="Search database..." type="text"/>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-xs text-[#94A3B8] font-medium hidden md:block">System Status: <span className="text-[#0df2a6]">Online</span></span>
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