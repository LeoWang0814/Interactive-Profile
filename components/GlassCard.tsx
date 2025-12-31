
import React, { useState, useMemo } from 'react';
import { PROFILE, PHILOSOPHICAL_QUOTES } from '../constants';

interface GlassCardProps {
  isDark: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ isDark }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const quote = useMemo(() => {
    return PHILOSOPHICAL_QUOTES[Math.floor(Math.random() * PHILOSOPHICAL_QUOTES.length)];
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 1.2, y: -y * 1.2 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const textColor = isDark ? 'text-blue-100' : 'text-white';
  const subTextColor = isDark ? 'text-blue-400' : 'text-blue-200/60';
  const bodyTextColor = isDark ? 'text-slate-300' : 'text-blue-100/80';
  const borderColor = isDark ? 'border-blue-400/20' : 'border-white/10';
  const bgColor = isDark ? 'bg-black/30' : 'bg-white/5';
  
  // Professional smooth shadow falloff to prevent "disconnected" look
  const shadowStyle = isDark 
    ? 'shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]' 
    : 'shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)]';

  return (
    <div 
      className="relative z-10 w-full max-w-[420px] transition-transform duration-700 ease-out flex flex-col items-center select-none"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`w-full backdrop-blur-[40px] rounded-[28px] md:rounded-[40px] p-8 md:p-12 border transition-all duration-1000 relative overflow-hidden group 
        ${bgColor} ${borderColor} ${shadowStyle}`}
      >
        <div className={`absolute top-0 left-0 w-6 h-6 border-l border-t transition-colors duration-1000 ${isDark ? 'border-blue-400/30' : 'border-white/10'}`} />
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-r border-b transition-colors duration-1000 ${isDark ? 'border-blue-400/30' : 'border-white/10'}`} />

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative mb-6 md:mb-8">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border p-0.5 bg-black/10 backdrop-blur-xl transition-all duration-1000 group-hover:scale-105 
              ${isDark ? 'border-blue-400/30' : 'border-white/20'}`}
            >
               <img 
                 src={PROFILE.profileImg} 
                 alt={PROFILE.mainName} 
                 className={`w-full h-full rounded-full object-cover transition-all duration-1000 ${isDark ? 'opacity-80 contrast-110' : 'opacity-100'}`}
               />
            </div>
            <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] animate-[spin_60s_linear_infinite] pointer-events-none opacity-[0.15]">
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" className={isDark ? 'text-blue-400' : 'text-blue-300'} />
            </svg>
          </div>

          <h1 className={`text-2xl md:text-4xl font-bold tracking-tight mb-2 transition-colors duration-1000 ${textColor}`}>
            {PROFILE.mainName}
          </h1>
          <p className={`text-[8px] md:text-[10px] font-bold tracking-[0.5em] md:tracking-[0.8em] uppercase mb-6 md:mb-8 transition-colors duration-1000 ${subTextColor}`}>
            {PROFILE.subName}
          </p>
          
          <div className={`h-[1px] w-8 md:w-10 mb-6 md:mb-8 transition-colors duration-1000 ${isDark ? 'bg-blue-400/20' : 'bg-white/10'}`} />
          
          <p className={`text-[11px] md:text-[14px] leading-relaxed mb-8 md:mb-10 font-light max-w-[300px] tracking-wide transition-colors duration-1000 italic ${bodyTextColor}`}>
            "{quote}"
          </p>

          <div className="w-full space-y-3 mb-6 md:mb-8">
            <a 
              href={PROFILE.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn relative w-full py-3.5 border rounded-xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden
                ${isDark 
                  ? 'bg-blue-400/10 border-blue-400/30 hover:bg-blue-400/20 text-blue-300' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span className="font-semibold tracking-[0.3em] text-[9px] uppercase whitespace-nowrap">My Blog</span>
            </a>

            <a 
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn relative w-full py-3.5 border rounded-xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden
                ${isDark 
                  ? 'bg-blue-400/10 border-blue-400/30 hover:bg-blue-400/20 text-blue-300' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold tracking-[0.3em] text-[9px] uppercase whitespace-nowrap">Source Repository</span>
            </a>
          </div>

          {/* Interaction status with refined English instructions */}
          <div className={`flex flex-col items-center gap-1.5 transition-opacity duration-1000 ${isDark ? 'opacity-50' : 'opacity-40'}`}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
              <span className={`text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-mono ${isDark ? 'text-blue-400' : 'text-blue-100'}`}>
                Interactive Physical Mesh Engine
              </span>
              <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
            </div>
            <span className={`text-[6px] md:text-[7px] uppercase tracking-[0.15em] font-mono opacity-80 ${isDark ? 'text-blue-300' : 'text-blue-200'}`}>
              Click and drag to slice the simulation
            </span>
          </div>
        </div>
      </div>
      
      {/* Refined Footer Status */}
      <div className={`mt-5 md:mt-8 flex items-center gap-6 transition-all duration-1000 ${isDark ? 'opacity-30 text-blue-400' : 'opacity-20 text-blue-100'}`}>
        <span className="text-[6px] md:text-[7px] uppercase tracking-[0.6em]">System_Stable</span>
        <span className="text-[6px] md:text-[7px] uppercase tracking-[0.6em]">Leo_Wang.ID</span>
      </div>
    </div>
  );
};

export default GlassCard;
