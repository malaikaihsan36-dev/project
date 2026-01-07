import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Import
import HomePage from './pages/HomePage';
import BrowseCatalog from './pages/BrowseCatalog';
import CustomizeProduct from './pages/CustomizeProduct';
import DesignReview from './pages/DesignReview';
import FinalOrder from './pages/FinalOrder';
import Portfolio from './pages/Portfolio';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage'; // Naya Contact Page add kiya

// Aapki banayi hui Loading Screen
import Loading from './pages/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 5 seconds loading timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Agar loading true hai to sirf Loading screen dikhao
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Isko /catalog bhi rakha hai aur /products bhi taake links break na hon */}
        <Route path="/catalog" element={<BrowseCatalog />} />
        <Route path="/products" element={<BrowseCatalog />} />
        
        {/* Customizer & Orders */}
        <Route path="/customize" element={<CustomizeProduct />} />
        <Route path="/design-review" element={<DesignReview />} />
        <Route path="/final-order" element={<FinalOrder />} />
        
        {/* Info & Community */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Fallback for typos (Optional) */}
        <Route path="/support" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;