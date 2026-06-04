import React, { useEffect, useState, useRef } from 'react'; 
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const AdminLayout = () => {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  
  // Notification States
  const [notifications, setNotifications] = useState({ total: 0, details: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://melodious-enchantment-production-cdb6.up.railway.app';

  // Function to fetch notifications from backend
  const loadNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/notifications`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        // Ek random parameter add karne se browser cache bypass ho jata hai
        params: { _t: Date.now() } 
      });
      
      if (res.data.success) {
        setNotifications({ total: res.data.total, details: res.data.details });
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  };

  useEffect(() => {
    const socket = io(API_BASE_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.emit('admin_login');
    loadNotifications();

    // ✅ Naya Global Listener
    socket.on('new_notification_global', (data) => {
        console.log("Real-time notification received!", data);
        // Foran notifications reload karo
        loadNotifications();
    });

    // Backup ke liye purana wala bhi rehne dein
    socket.on('receive_message', (msg) => {
        if (msg.sender === 'customer') {
            loadNotifications();
        }
    });

    return () => socket.disconnect();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  const navLinkClass = ({ isActive }) => 
    `group flex items-center gap-3 rounded-full px-4 py-3 transition-all border ${
      isActive 
        ? "bg-[#334155] text-[#0df2a6] border-[#0df2a6]/20 shadow-lg shadow-[#0df2a6]/5" 
        : "text-[#94A3B8] hover:bg-[#334155] hover:text-white border-transparent"
    }`;

  const handleNotificationClick = async (orderId) => {
    try {
      // 1. Backend API call takay is_read = 1 ho jaye
      await axios.post(`${API_BASE_URL}/api/mark-read`, { orderId });
      
      // 2. Dropdown band karein
      setShowDropdown(false);
      
      // 3. Page redirect karein (AdminLayout ke andar hai isliye /admin/ lagaeyn)
      window.open(`/admin/order-review/${orderId}`, '_blank', 'noopener,noreferrer');
      
      // 4. Notifications dobara load karein takay count update ho jaye
      loadNotifications(); 
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

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
          <NavLink to="/admin" end className={navLinkClass}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClass}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="font-medium">Orders</span>
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClass}>
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-medium">Products</span>
          </NavLink>
          <NavLink to="/admin/portfolio" className={navLinkClass}>
            <span className="material-symbols-outlined">photo_library</span>
            <span className="font-medium">Portfolio</span>
          </NavLink>
          <NavLink to="/admin/reviews" className={navLinkClass}>
            <span className="material-symbols-outlined">reviews</span>
            <span className="font-medium">Reviews</span>
          </NavLink>
          <NavLink to="/admin/customers" className={navLinkClass}>
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium">Customers</span>
          </NavLink>
          <NavLink to="/admin/analytics" className={navLinkClass}>
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="font-medium">Analytics</span>
          </NavLink>
          <div className="my-4 border-t border-[#334155]/50"></div>
          <p className="px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Settings</p>
          <NavLink to="/admin/settings" className={navLinkClass}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">General Settings</span>
          </NavLink>
        </nav>

        <div className="border-t border-[#334155] p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#334155] p-3">
            <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-white">
               <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-red-400">Logout</p>
              <p className="truncate text-xs text-[#94A3B8]">Super Admin</p>
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
          <div className="hidden max-w-md flex-1 lg:block">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">search</span>
              <input className="w-full rounded-full bg-[#334155] border-none py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#94A3B8] focus:ring-1 focus:ring-[#0df2a6]" placeholder="Search database..." type="text"/>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Notification Bell Logic */}
            <div className="relative flex items-center">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative flex items-center justify-center p-2 text-[#94A3B8] hover:text-[#0df2a6] transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">notifications</span>
                {notifications.total > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-[#0F172A]">
                    {notifications.total}
                  </span>
                )}
              </button>

              {/* Dropdown Card */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-[#334155] bg-[#1E293B] shadow-2xl z-[60] overflow-hidden">
                  <div className="bg-[#0F172A] p-4 border-b border-[#334155] flex justify-between items-center">
                    <span className="text-sm font-bold">Unread Messages</span>
                    <span className="text-[10px] bg-[#0df2a6]/20 text-[#0df2a6] px-2 py-0.5 rounded-full">{notifications.total} New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.details.length > 0 ? (
                      notifications.details.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 border-b border-[#334155] hover:bg-[#334155] cursor-pointer transition-colors"
                          onClick={() => handleNotificationClick(item.order_id)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-[#0df2a6]">ID: #{item.order_id}</span>
                            <span className="text-[9px] text-[#94A3B8]">{new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <p className="text-xs text-white line-clamp-2">{item.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500 text-xs">No new notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

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