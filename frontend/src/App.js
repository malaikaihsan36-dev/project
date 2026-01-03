import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import HomePage from './pages/HomePage';
import BrowseCatalog from './pages/BrowseCatalog';
import Portfolio from './pages/Portfolio'; // Naya Portfolio page
import CustomizeProduct from './pages/CustomizeProduct';
import DesignReview from './pages/DesignReview';
import FinalOrder from './pages/FinalOrder';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Home Page - Jahan se journey start hoti hai */}
        <Route path="/" element={<HomePage />} />

        {/* 2. Catalog Page - Jahan products browse hote hain */}
        <Route path="/catalog" element={<BrowseCatalog />} />

        {/* 3. Portfolio Page - Jahan purana kaam dikhaya gaya hai */}
        <Route path="/portfolio" element={<Portfolio />} />

        {/* 4. Customization Stage - User apna design banata hai */}
        <Route path="/customize" element={<CustomizeProduct />} />

        {/* 5. Review Stage - Admin ke saath design final hota hai */}
        <Route path="/design-review" element={<DesignReview />} />

        {/* 6. Checkout Stage - Final payment aur order confirmation */}
        <Route path="/final-order" element={<FinalOrder />} />

        {/* Safety Route - Agar user galat URL likhe toh Home par redirect ho jaye */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;