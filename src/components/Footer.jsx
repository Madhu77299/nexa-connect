import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { companyConfig, servicesData } from '../data/companyData';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#0a0f1d] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Large Logo Block */}
        <div className="pb-12 mb-12 border-b border-neutral-200 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter font-display leading-none">
              PMK NEXA
            </span>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
              Solutions Pvt. Ltd.
            </span>
          </div>
          <div className="flex space-x-6 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <a href={companyConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors">
              LinkedIn
            </a>
            <a href={companyConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors">
              X
            </a>
            <a href={companyConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors">
              Instagram
            </a>
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
                  <Link to="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors font-medium">
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
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 gap-4">
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
