import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ 
  className = "h-10 sm:h-12", 
  imgClassName,
  textClassName = "text-xl sm:text-2xl",
  subTextClassName = "text-[10px] sm:text-xs",
  showText = true,
  variant = "dark-nav" // 'dark-nav' | 'auto'
}) {
  const finalImgClass = imgClassName || className;
  const isDarkNav = variant === 'dark-nav';

  return (
    <Link to="/" className="flex items-center gap-3.5 group select-none">
      <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 sm:p-2 shadow-md border border-neutral-200/80 dark:border-white/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
        <img 
          src="/logo.png" 
          alt="PMK Nexa Solutions Logo" 
          className={`${finalImgClass} w-auto object-contain transition-all duration-300`}
          loading="eager"
        />
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`${textClassName} font-black tracking-tight font-display leading-none ${
            isDarkNav ? 'text-white' : 'text-neutral-900 dark:text-white'
          }`}>
            PMK{' '}
            <span className={
              isDarkNav 
                ? 'text-[#38BDF8] dark:text-[#20C9B5]' 
                : 'text-[#0066FF] dark:text-[#20C9B5]'
            }>
              NEXA
            </span>
          </span>
          <span className={`${subTextClassName} font-extrabold tracking-[0.22em] uppercase mt-1 ${
            isDarkNav 
              ? 'text-[#38BDF8] dark:text-[#20C9B5]' 
              : 'text-[#0066FF] dark:text-[#20C9B5]'
          }`}>
            Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
