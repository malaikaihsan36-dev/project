import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import HomePage from './pages/HomePage';
// Baaki pages ko bhi yahan import karein jab wo ban jayein
// import Catalog from './pages/Catalog';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3 seconds ke liye loading dikhayega
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/catalog" element={<Catalog />} /> */}
      </Routes>
    </Router>
  );
}

export default App;