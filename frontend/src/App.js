import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhyColourPixPage from './pages/WhyColourPixPage';
import TrustCenterPage from './pages/TrustCenterPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PackagingPage from './pages/PackagingPage';
import FinishesPage from './pages/FinishesPage';
import IndustriesPage from './pages/IndustriesPage';
import ManufacturingPage from './pages/ManufacturingPage';
import Portfolio from './pages/Portfolio';
import KnowledgeCenterPage from './pages/KnowledgeCenterPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import BrowseCatalog from './pages/BrowseCatalog';
import CustomizeProduct from './pages/CustomizeProduct';
import DesignReview from './pages/DesignReview';
import FinalOrder from './pages/FinalOrder';
import ReviewsPage from './pages/ReviewsPage';
import Loading from './pages/Loading';
import MagazineViewer from './pages/MagazineViewer';
import EstimatorPage from './pages/EstimatorPage';

// Admin Components & Pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminCustomers from './pages/AdminCustomers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminLogin from './pages/AdminLogin';
import AdminReviews from './pages/AdminReviews';
import AdminSettings from './pages/AdminSettings';
import AdminChat from './pages/AdminChat';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* --- PUBLIC CORPORATE MULTI-PAGE ROUTES --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/why-colourpix" element={<WhyColourPixPage />} />
        <Route path="/why-choose-us" element={<WhyColourPixPage />} />
        <Route path="/trust-center" element={<TrustCenterPage />} />
        <Route path="/trust" element={<TrustCenterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/packaging" element={<PackagingPage />} />
        <Route path="/finishes" element={<FinishesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/manufacturing" element={<ManufacturingPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/resources" element={<KnowledgeCenterPage />} />
        <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/cost-estimator" element={<EstimatorPage />} />
        
        {/* E-COMMERCE & CATALOG ROUTES */}
        <Route path="/catalog" element={<BrowseCatalog />} />
        <Route path="/products" element={<BrowseCatalog />} />
        <Route path="/customize/:id" element={<CustomizeProduct />} />
        <Route path="/customize" element={<CustomizeProduct />} />
        <Route path="/order/:orderId" element={<DesignReview />} />
        <Route path="/design-page/:orderId" element={<DesignReview />} />
        <Route path="/design-review" element={<DesignReview />} />
        <Route path="/design-review/:orderId" element={<DesignReview />} />
        <Route path="/chat" element={<DesignReview />} />
        <Route path="/final-order/:orderId" element={<FinalOrder />} />
        <Route path="/final-order" element={<FinalOrder />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/read/:id" element={<MagazineViewer />} />
        <Route path="/magazine/:id" element={<MagazineViewer />} />

        {/* --- ADMIN AUTH & PANEL --- */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="portfolio" element={<AdminPortfolio />} /> 
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/admin/order-review/:orderId" element={<ProtectedRoute><AdminChat /></ProtectedRoute>} />
        <Route path="/admin/chat/:orderId" element={<ProtectedRoute><AdminChat /></ProtectedRoute>} />
        
        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;