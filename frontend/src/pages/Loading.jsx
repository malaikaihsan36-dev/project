import React from "react";
import AppBackground from "../layouts/AppBackground";
import { Palette } from "lucide-react";

const Loading = () => {
  return (
    <AppBackground showGrid={true}>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-10 px-6">

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl shadow-primary/20">
            {/* Palette Icon with Glow */}
            <Palette 
              size={48} 
              className="text-white drop-shadow-[0_0_15px_rgba(200,19,236,0.6)]" 
            />
            
            {/* Decorative Glow Dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full blur-md"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full blur-md"></div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Colour <span className="text-primary">Pix</span>
          </h1>
        </div>

        {/* Modern Spinner */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
          
          {/* Top Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          
          {/* Inner Ring (Reverse) */}
          <div 
            className="absolute inset-2 rounded-full border-4 border-b-primary border-l-transparent border-t-transparent border-r-transparent animate-spin-slow" 
            style={{ animationDirection: "reverse" }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-white animate-pulse">
            Let the pixel dance...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Unleashing creativity
          </p>
        </div>
      </div>
    </AppBackground>
  );
};

export default Loading;