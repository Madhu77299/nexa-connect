import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = "h-9", showText = true, isDarkTheme = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 group select-none">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white/90 dark:bg-white/95 p-1.5 shadow-sm border border-neutral-200/60 dark:border-neutral-700/60 transition-transform duration-300 group-hover:scale-105">
        <img 
          src="/logo.png" 
          alt="PMK Nexa Solutions Logo" 
          className={`${className} w-auto object-contain transition-all duration-300`}
          loading="eager"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-base font-black tracking-tight text-neutral-900 dark:text-white font-display leading-tight">
            PMK <span className="text-[#3167ff] dark:text-[#20c9b5]">NEXA</span>
          </span>
          <span className="text-[9px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase -mt-0.5">
            Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
