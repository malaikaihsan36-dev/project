import React from "react";
import AppBackground from "../layouts/AppBackground";
import { Palette } from "lucide-react";

const Loading = () => {
  return (
    <AppBackground showGrid={true}>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-10 px-6 bg-[#09090B]">
        
        {/* Cinematic Logo Section */}
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="relative w-20 h-20 rounded-2xl bg-[#121215] border border-white/15 flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB] to-[#E11D48] opacity-25"></div>
            <span className="font-syne font-extrabold text-3xl text-white">C</span>
            
            {/* Ambient Accent Sparks */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2563EB] rounded-full blur-sm"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#E11D48] rounded-full blur-sm"></div>
          </div>

          <h1 className="font-syne text-2xl font-bold tracking-tight text-white mt-2">
            COLOUR<span className="text-[#2563EB]">PIX</span>
          </h1>
        </div>

        {/* Minimal Luxury Spinner */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
          
          {/* Outermost ring */}
          <div className="absolute inset-0 rounded-full border-2 border-t-[#2563EB] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          
          {/* Inner ring */}
          <div 
            className="absolute inset-1.5 rounded-full border-2 border-b-[#E11D48] border-l-transparent border-t-transparent border-r-transparent animate-spin" 
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          ></div>
        </div>

        {/* Premium Core Metadata */}
        <div className="text-center font-mono text-[10px] tracking-widest text-[#A1A1AA] uppercase space-y-1">
          <p className="text-white font-bold tracking-[0.2em]">DIRECT FACTORY PIPELINE</p>
          <p className="text-[#A1A1AA]/60">ESTABLISHED 1991 • LCCI MEMBER</p>
        </div>
      </div>
    </AppBackground>
  );
};

export default Loading;