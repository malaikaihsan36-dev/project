import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import HomePage from './pages/HomePage';
import BrowseCatalog from './pages/BrowseCatalog';
import CustomizeProduct from './pages/CustomizeProduct';
import DesignReview from './pages/DesignReview';
import FinalOrder from './pages/FinalOrder';
import Portfolio from './pages/Portfolio';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';

// Admin Components & Pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminCustomers from './pages/AdminCustomers';
import AdminAnalytics from './pages/AdminAnalytics'; // Naya Page Import
import AdminLogin from './pages/AdminLogin';

// Loading Screen
import Loading from './pages/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Auth State
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  useEffect(() => {
    // 5 seconds loading timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* --- 1. PUBLIC ROUTES (Unchanged) --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<BrowseCatalog />} />
        <Route path="/products" element={<BrowseCatalog />} />
        <Route path="/customize" element={<CustomizeProduct />} />
        <Route path="/design-page" element={<DesignReview />} /> 
        <Route path="/design-review" element={<DesignReview />} />
        <Route path="/final-order" element={<FinalOrder />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<ContactPage />} />

        {/* --- 2. ADMIN LOGIN PAGE --- */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* --- 3. PROTECTED ADMIN PANEL (NESTED ROUTES) --- */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminLayout /> : <Navigate to="/admin-login" replace />}
        >
          {/* Dashboard (Home for admin) */}
          <Route index element={<AdminDashboard />} /> 
          
          {/* Other Admin Sub-pages */}
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} /> {/* Analytics Route Added */}
        </Route>

        {/* --- 4. REDIRECTS & FALLBACKS --- */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;