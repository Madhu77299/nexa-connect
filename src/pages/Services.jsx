import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, Phone, Clock, FileText, Send, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import { servicesData } from '../data/companyData';

export default function Services() {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  // Service Specific details
  const [targetMarket, setTargetMarket] = useState('B2B Corporate');
  const [estimatedBudget, setEstimatedBudget] = useState('Scale operations');
  const [logisticsScale, setLogisticsScale] = useState('Regional distribution');
  const [eventFormat, setEventFormat] = useState('Corporate Staging');
  const [platformFocus, setPlatformFocus] = useState('Full Stack SaaS Web App');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowInquiryForm(false);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 4000);
  };

  const getFormInputs = () => {
    switch (activeService.id) {
      case 'business-development':
        return (
          <>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Target Market Segment</label>
              <select 
                value={targetMarket} 
                onChange={(e) => setTargetMarket(e.target.value)} 
                className="w-full bg-[#f5f7fb] dark:bg-[#101c2f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
              >
                <option value="B2B Corporate">B2B Corporate Partners</option>
                <option value="SaaS/Startup">SaaS & Startups</option>
                <option value="Consumer Retail">Consumer Retail Networks</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Estimated Scale Budget</label>
              <select 
                value={estimatedBudget} 
                onChange={(e) => setEstimatedBudget(e.target.value)} 
                className="w-full bg-[#f5f7fb] dark:bg-[#101c2f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
              >
                <option value="Pilot validation">Pilot Validation Stage</option>
                <option value="Scale operations">Scale Operations</option>
                <option value="Enterprise integration">Enterprise Integration</option>
              </select>
            </div>
          </>
        );
      case 'vendor-network':
        return (
          <>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Logistics & Supply Scale</label>
              <select 
                value={logisticsScale} 
                onChange={(e) => setLogisticsScale(e.target.value)} 
                className="w-full bg-[#f5f7fb] dark:bg-[#101c2f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
              >
                <option value="Regional distribution">Regional Distribution</option>
                <option value="National supply network">National Supply Network</option>
                <option value="On-demand event logistics">On-Demand Event Logistics</option>
              </select>
            </div>
          </>
        );
      case 'event-operations':
        return (
          <>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Preferred Event Format</label>
              <select 
                value={eventFormat} 
                onChange={(e) => setEventFormat(e.target.value)} 
                className="w-full bg-[#f5f7fb] dark:bg-[#101c2f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
              >
                <option value="Corporate Staging">Corporate AGM / Staging</option>
                <option value="Tech Summit">Tech Summit / Exhibition</option>
                <option value="Brand Launch">Brand Launch & Visual Production</option>
              </select>
            </div>
          </>
        );
      case 'technical-services':
        return (
          <>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Target Technology Stack</label>
              <select 
                value={platformFocus} 
                onChange={(e) => setPlatformFocus(e.target.value)} 
                className="w-full bg-[#f5f7fb] dark:bg-[#101c2f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
              >
                <option value="Full Stack SaaS Web App">Full Stack SaaS Web App</option>
                <option value="Custom CRM Automation">Custom CRM Automation</option>
                <option value="Vendor Logistics API Sync">Vendor Logistics API Sync</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      {/* 1. Page Header Block */}
      <section className="bg-neutral-50 dark:bg-[#101c2f] py-20 border-b border-neutral-200/50 dark:border-neutral-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase">WHAT WE DELIVER</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-6xl max-w-3xl leading-tight">
            Comprehensive business operational coordination.
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            Eliminating intermediate management friction by consolidating procurement, staging, event coordination, coding, and campaign scale inside one dashboard.
          </p>
        </div>
      </section>

      {/* 2. Interactive Service Explorer Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel selector list */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">// CORE CAPABILITIES</h3>
            <div className="space-y-3">
              {servicesData.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => {
                    setActiveService(svc);
                    setShowInquiryForm(false);
                  }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex justify-between items-center ${
                    activeService.id === svc.id
                      ? 'bg-[#3167ff] text-white border-transparent shadow-md'
                      : 'bg-white dark:bg-[#101c2f] border-neutral-200/60 dark:border-neutral-800 text-neutral-800 dark:text-white hover:border-[#3167ff]/40'
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-wider">{svc.title}</span>
                  <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${
                    activeService.id === svc.id ? 'translate-x-1' : ''
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right panel details details */}
          <div className="lg:col-span-7 bg-white dark:bg-[#101c2f] border border-neutral-200/60 dark:border-neutral-800 p-8 rounded-3xl shadow-sm space-y-8 relative overflow-hidden">
            
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#3167ff] dark:text-[#20c9b5] uppercase tracking-widest bg-[#3167ff]/10 px-2 py-0.5 rounded">
                  Active Service Segment
                </span>
              </div>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white font-display leading-tight">
                {activeService.title}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {activeService.description}
              </p>
            </div>

            {/* Structured features checklist */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Key Deliverables</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeService.capabilities.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-start text-sm text-neutral-600 dark:text-neutral-350">
                    <CheckCircle className="h-4.5 w-4.5 text-[#20c9b5] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA terms summary */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#08111f]/60 text-xs text-neutral-550 space-y-2 border border-neutral-200/30 dark:border-neutral-800">
              <span className="font-bold text-[#ff715b] uppercase block">Operational Target SLA</span>
              <p className="leading-relaxed">
                All initiatives deployed in this track are subject to strict SLA validation pipelines: weekly client checkins, milestone tracking, and secure supplier contract boundaries.
              </p>
            </div>

            {/* Action buttons triggers */}
            {!showInquiryForm ? (
              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#3167ff] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow hover:bg-[#ff715b] transition-all"
                >
                  Explore {activeService.title} →
                </button>
              </div>
            ) : (
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#20c9b5]" />
                    Dynamic Inquiry Setup
                  </h3>
                  <button 
                    onClick={() => setShowInquiryForm(false)}
                    className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#20c9b5]/10 border border-[#20c9b5]/30 text-center space-y-3">
                    <CheckCircle className="h-10 w-10 text-[#20c9b5] mx-auto" />
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">Inquiry Received</h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Thank you. Your domain consultation specs have been mapped successfully. A PMK Nexa administrator will coordinate followups within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Madhu Sudhana" 
                          className="w-full bg-[#f5f7fb] dark:bg-[#08111f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Corporate Email</label>
                        <input 
                          type="email" 
                          required 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="client@company.com" 
                          className="w-full bg-[#f5f7fb] dark:bg-[#08111f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Company / Organization</label>
                        <input 
                          type="text" 
                          required 
                          value={company} 
                          onChange={(e) => setCompany(e.target.value)} 
                          placeholder="PMK Nexa Solutions" 
                          className="w-full bg-[#f5f7fb] dark:bg-[#08111f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
                        />
                      </div>
                      {getFormInputs()}
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 block mb-1">Requirements Details</label>
                      <textarea 
                        rows="3" 
                        required 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Briefly describe what your operations require..." 
                        className="w-full bg-[#f5f7fb] dark:bg-[#08111f] border border-neutral-300 dark:border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-[#3167ff] text-white py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#20c9b5]"
                    >
                      <Send className="h-4 w-4" />
                      Submit Consultation Specs
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

        </div>
      </section>
    </PageTransition>
  );
}
