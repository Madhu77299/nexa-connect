import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { companyConfig, servicesData, socialLinks } from '../data/companyData';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#101c2f] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Large Logo Block */}
        <div className="pb-12 mb-12 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter font-display leading-none">
              PMK NEXA
            </span>
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
              Solutions Pvt. Ltd.
            </span>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2.5">
            <span className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">FOLLOW PMK NEXA</span>
            <div className="flex space-x-4 text-neutral-500">
              <a href={socialLinks.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] hover:scale-110 transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={socialLinks.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] hover:scale-110 transition-all" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={socialLinks.facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] hover:scale-110 transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={socialLinks.youtube || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] hover:scale-110 transition-all" aria-label="YouTube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087C19.578 3.5 12 3.5 12 3.5s-7.578 0-9.413.576c-1.016.272-1.814 1.071-2.086 2.087C0 8.002 0 12 0 12s0 3.998.501 5.837c.272 1.016 1.07 1.814 2.086 2.086 1.835.577 9.413.577 9.413.577s7.578 0 9.413-.577c1.015-.272 1.813-1.07 2.085-2.086C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href={socialLinks.twitter || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] hover:scale-110 transition-all" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand description column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">// THE CONNECTED ECOSYSTEM</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              We connect business development strategies, vendor networks, logistics execution, high-performance web development, and digital marketing reach into a single execution layer.
            </p>
          </div>

          {/* Quick Services navigation */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-4">Capabilities</h3>
            <ul className="space-y-2">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link to="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-colors font-medium">
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and address block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest">Connect</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
                <span className="truncate">{companyConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
                <span>{companyConfig.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-neutral-400" />
                <span className="leading-tight">{companyConfig.contact.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Rights, terms and footer bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} PMK Nexa Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6 font-semibold">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
