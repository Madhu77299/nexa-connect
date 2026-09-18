import React from 'react';

export default function GpsGlobeBadge({ className = "h-4 w-4" }) {
  return (
    <div 
      className="inline-flex items-center justify-center relative group cursor-pointer"
      title="Locations: Head Office Vizag - Madhurawada | Branch Office Rajam, Srikakulam dist, AP"
    >
      {/* Subtle Ambient Pulse behind Google Maps Pin */}
      <span className="absolute -inset-1 rounded-full bg-[#EA4335]/20 animate-ping opacity-75" />

      {/* Official High-Resolution Google Maps Pin SVG */}
      <svg 
        className="h-4 w-4 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-200" 
        viewBox="0 0 24 24" 
        fill="none"
      >
        <defs>
          <linearGradient id="gmap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA4335" />
            <stop offset="35%" stopColor="#FF7769" />
            <stop offset="70%" stopColor="#FBBC04" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>
        </defs>

        {/* Google Maps Pin Path */}
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="url(#gmap-gradient)"
        />

        {/* Center Circular Hole */}
        <circle cx="12" cy="9" r="2.8" fill="#050B14" />
        
        {/* Glowing GPS Radar Point Inside Hole */}
        <circle cx="12" cy="9" r="1.4" fill="#00F2FE" />
      </svg>
    </div>
  );
}
