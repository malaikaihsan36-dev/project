const AppBackground = ({ children, showGrid = true }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background-dark transition-colors duration-500 font-display text-white">

      {/* Animated Background Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Primary Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-blob"></div>

        {/* Cyan Blob */}
        <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob animation-delay-2000"></div>

        {/* Yellow Blob */}
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-yellow-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

        {/* Optional Grid */}
        {showGrid && (
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://placeholder.pics/svg/20')] bg-repeat"></div>
        )}
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AppBackground;
