import React, { useState, useEffect } from 'react';

const AppBackground = ({ children, showGrid = true }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gridStyle = {
    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
    backgroundSize: '40px 40px' 
  };

  return (
    <div className="relative min-h-screen w-full bg-[#09090B] overflow-x-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2563EB] opacity-10 rounded-full blur-[120px] animate-blob"></div>
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E11D48] opacity-10 rounded-full blur-[120px] animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Conditional Grid */}
      {showGrid && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
          style={gridStyle}
        ></div>
      )}

      {/* Content with global page transitions */}
      <div className={`relative z-10 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {children}
      </div>
    </div>
  );
};

export default AppBackground;