import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ 
  className = "h-9 sm:h-11", 
  imgClassName,
  textClassName = "text-xl sm:text-2xl",
  subTextClassName = "text-[10px] sm:text-xs",
  showText = false,
  variant = "auto" // 'auto' | 'dark-nav' | 'light'
}) {
  const finalImgClass = imgClassName || className;

  return (
    <Link to="/" className="flex items-center gap-3 group select-none" title="PMK Nexa Solutions">
      <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
        {/* Light Mode Logo */}
        <img 
          src="/logo.png" 
          alt="PMK Nexa Solutions" 
          className={`${finalImgClass} w-auto object-contain transition-all duration-300 block dark:hidden group-hover:drop-shadow-[0_0_14px_rgba(0,85,255,0.35)]`}
          loading="eager"
        />
        {/* Dark Mode Logo (High-Res with white Nexa Solutions and luminous cyan/emerald) */}
        <img 
          src="/logo-dark-hires.png" 
          alt="PMK Nexa Solutions" 
          className={`${finalImgClass} w-auto object-contain transition-all duration-300 hidden dark:block drop-shadow-[0_0_12px_rgba(0,210,255,0.3)] group-hover:drop-shadow-[0_0_18px_rgba(16,185,129,0.55)]`}
          loading="eager"
        />
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`${textClassName} font-black tracking-tight font-display leading-none text-neutral-900 dark:text-white`}>
            PMK{' '}
            <span className="text-[#0055FF] dark:text-[#00D2FF]">
              NEXA
            </span>
          </span>
          <span className={`${subTextClassName} font-extrabold tracking-[0.22em] uppercase mt-1 text-[#10B981] dark:text-[#22C55E]`}>
            Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
