import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import BrowseCatalog from './pages/BrowseCatalog';
import CustomizeProduct from './pages/CustomizeProduct';
import DesignReview from './pages/DesignReview';
import FinalOrder from './pages/FinalOrder';
import Portfolio from './pages/Portfolio';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import Loading from './pages/Loading';
import AdminPortfolio from './pages/AdminPortfolio'; 

// Admin Components & Pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminCustomers from './pages/AdminCustomers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminChat from './pages/AdminChat';
import AdminLogin from './pages/AdminLogin';
import AdminReviews from './pages/AdminReviews'; // <--- Naya Import

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<BrowseCatalog />} />
        <Route path="/products" element={<BrowseCatalog />} />
        <Route path="/customize" element={<CustomizeProduct />} />
        <Route path="/design-review" element={<DesignReview />} />
        <Route path="/final-order" element={<FinalOrder />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* --- ADMIN AUTH --- */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* --- PROTECTED ADMIN PANEL --- */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="portfolio" element={<AdminPortfolio />} /> 
          <Route path="reviews" element={<AdminReviews />} /> {/* <--- Naya Route added inside AdminLayout */}
        </Route>

        <Route path="/admin/chat/:orderId" element={<ProtectedRoute><AdminChat /></ProtectedRoute>} />
        
        {/* --- FALLBACK --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;