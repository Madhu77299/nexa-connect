import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Globe, Building2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo from './Logo';

export default function Footer() {
  const { company, services, socialProfiles, footerSettings } = useData();

  // True Dynamic Visitor Counter State (via API)
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('https://countapi.mileshilliard.com/api/v1/hit/pmk_nexa_solutions_live_visitors_v1');
        const data = await response.json();
        if (data && data.value) {
          setVisitors(data.value); // Starting fresh count
        }
      } catch (error) {
        console.error("Failed to fetch dynamic visitor count:", error);
      }
    };
    fetchVisitorCount();
  }, []);

  // Helper to render platform SVG / icon
  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'linkedin':
        return (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087C19.578 3.5 12 3.5 12 3.5s-7.578 0-9.413.576c-1.016.272-1.814 1.071-2.086 2.087C0 8.002 0 12 0 12s0 3.998.501 5.837c.272 1.016 1.07 1.814 2.086 2.086 1.835.577 9.413.577 9.413.577s7.578 0 9.413-.577c1.015-.272 1.813-1.07 2.085-2.086C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      default:
        return <Globe className="h-4 w-4 text-neutral-400" />;
    }
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#070D18] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Large Logo & Social Follow Block */}
        <div className="pb-12 mb-12 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <Logo className="h-11 sm:h-12" variant="auto" />
          </div>

          <div className="flex flex-col items-start md:items-end gap-2.5">
            <span className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">
              OFFICIAL CONNECT &amp; SOCIAL HUBS
            </span>

            {/* Dynamic Social Links with Automatic Icon detection */}
            <div className="flex items-center gap-3 flex-wrap">
              {(socialProfiles || []).map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.platform}
                  className="h-9 w-9 rounded-xl bg-neutral-100 dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] hover:scale-110 shadow-xs transition-all duration-300"
                  title={soc.platform}
                >
                  {renderSocialIcon(soc.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Column Footer Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand description column */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-[#0066FF] dark:text-[#00F2FE] uppercase tracking-widest">
              {footerSettings?.ecosystemHeader || "// THE CONNECTED ECOSYSTEM"}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {company?.tagline || footerSettings?.tagline || "Your Growth. Our Network."}
            </p>
            <div className="text-xs text-neutral-400 space-y-1">
              <div>Founder: <strong className="text-neutral-900 dark:text-white">{company?.founder || "Prasanna Korikana"}</strong></div>
              <div>Incorporated: <span className="font-mono">{company?.incorporationDate || "April 20, 2026"}</span></div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <Link to="/" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
                  Our Work &amp; Process
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
                  Blogs &amp; Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest">
              Capabilities
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              {(services || []).slice(0, 5).map((svc) => (
                <li key={svc.id}>
                  <Link to="/services" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest">
              Connect
            </h3>
            <ul className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#0066FF] dark:text-[#00F2FE]" />
                <a href="mailto:pmknexasolutions@gmail.com" className="hover:underline truncate">
                  {company?.contact?.email || "pmknexasolutions@gmail.com"}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#0066FF] dark:text-[#00F2FE]" />
                <span>{company?.contact?.phone || "+91 86880 07523"}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Building2 className="h-4 w-4 shrink-0 mt-0.5 text-[#0066FF] dark:text-[#00F2FE]" />
                <div className="leading-tight">
                  <span className="block text-neutral-900 dark:text-white font-semibold">Head Office:</span>
                  <span>Vizag - Madhurawada, AP</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#0066FF] dark:text-[#00F2FE]" />
                <div className="leading-tight">
                  <span className="block text-neutral-900 dark:text-white font-semibold">Branch Office:</span>
                  <span>Krishna Complex (1st Floor), Palakonda Rd, Rajam, Srikakulam dist - 532127</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright & Policy */}
        <div className="pt-8 mt-12 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div>
              {footerSettings?.copyrightText || `© 2026 ${company?.name || "PMK NEXA SOLUTIONS PRIVATE LIMITED"}. All rights reserved.`}
            </div>
            {/* Dynamic Visitor Counter */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800" title="Live Visitor Count">
              <span className="font-semibold text-neutral-600 dark:text-neutral-400">Visitors:</span>
              <span className="font-mono text-sm font-bold text-[#0066FF] dark:text-[#00F2FE] bg-white dark:bg-black px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 shadow-inner">
                {visitors !== null ? visitors.toLocaleString() : '...'}
              </span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link to="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Contact Desk
            </Link>
            <Link to="/careers" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Careers
            </Link>
            <Link to="/admin" className="hover:text-[#0066FF] dark:hover:text-[#00F2FE] transition-colors">
              CMS Admin
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
