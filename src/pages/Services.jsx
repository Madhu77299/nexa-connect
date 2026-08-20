import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Briefcase, Network, Calendar, Cpu, TrendingUp, Check, ArrowRight, X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { servicesData } from '../data/companyData';

const iconMap = {
  Briefcase: Briefcase,
  Network: Network,
  Calendar: Calendar,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
};

export default function Services() {
  const { hash } = useLocation();
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Specific Form inputs state
  const [commonInputs, setCommonInputs] = useState({ name: '', email: '', company: '' });
  const [bdInputs, setBdInputs] = useState({ targetMarket: 'B2B Corporate', estimatedBudget: 'Mid-Tier' });
  const [vendorInputs, setVendorInputs] = useState({ categories: 'IT/Hardware', operationScale: 'Regional' });
  const [eventInputs, setEventInputs] = useState({ eventType: 'Tech Summit', headcount: '100-500' });
  const [techInputs, setTechInputs] = useState({ techStack: 'React / Node.js', platformType: 'Web Application' });
  const [marketingInputs, setMarketingInputs] = useState({ channel: 'Social Media Management', campaignGoal: 'Lead Generation' });

  const serviceImages = {
    "business-development": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    "vendor-network": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    "event-operations": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    "technical": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    "digital-marketing": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
  };

  useEffect(() => {
    if (hash) {
      const cleanHash = hash.replace('#', '');
      const found = servicesData.find(s => s.id === cleanHash);
      if (found) {
        setActiveServiceId(cleanHash);
      }
    }
  }, [hash]);

  // Reset form status when switching services
  useEffect(() => {
    setShowForm(false);
    setFormSubmitted(false);
  }, [activeServiceId]);

  const activeService = servicesData.find(s => s.id === activeServiceId) || servicesData[0];
  const Icon = iconMap[activeService.icon] || Briefcase;

  const handleCommonChange = (e) => {
    setCommonInputs({ ...commonInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <PageTransition>
      {/* Header Area */}
      <section className="bg-neutral-50 dark:bg-neutral-900/10 py-20 border-b border-neutral-200/50 dark:border-neutral-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase">OUR CAPABILITIES</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-7xl max-w-3xl leading-tight">
            Our Business Services
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            Switch between our core service pillars below to explore our dynamic operational capabilities.
          </p>
        </div>
      </section>

      {/* Dynamic Content Explorer */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Sidebar Navigator */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-4">// SELECT SERVICE</span>
            {servicesData.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setActiveServiceId(svc.id)}
                className={`w-full text-left py-4 px-6 rounded-sm border transition-all duration-300 flex justify-between items-center group ${
                  activeServiceId === svc.id
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white font-bold'
                    : 'bg-white text-neutral-600 border-neutral-200/60 dark:bg-neutral-950/40 dark:text-neutral-400 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs opacity-60 font-mono">{svc.number}</span>
                  <span className="text-base tracking-tight font-display">{svc.title}</span>
                </div>
                <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                  activeServiceId === svc.id ? 'translate-x-1 text-white dark:text-neutral-950' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-neutral-400'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Detail Pane with AnimatePresence */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white dark:bg-neutral-950/30 p-8 border border-neutral-200/60 dark:border-neutral-900 rounded-sm shadow-sm"
              >
                
                {/* Visual Pane */}
                <div className="md:col-span-5 relative group overflow-hidden border border-neutral-200 dark:border-neutral-900 rounded-sm bg-neutral-50 p-1">
                  <div className="relative pt-[100%] w-full overflow-hidden">
                    <img
                      src={serviceImages[activeService.id] || "https://images.unsplash.com/photo-1557804506-669a67965ba0"}
                      alt={activeService.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute top-4 left-4 text-6xl font-black text-white/50 drop-shadow-sm font-display">
                    {activeService.number}
                  </div>
                </div>

                {/* Details segment */}
                <div className="md:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-sm text-neutral-900 dark:text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1d4ed8] dark:text-[#f97316]">
                        SERVICE SEGMENT {activeService.number}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-neutral-900 dark:text-white leading-tight">
                      {activeService.title}
                    </h2>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {activeService.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">
                      Core Offerings & Deliverables:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {activeService.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                          <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[9px] font-bold">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => setShowForm(!showForm)}
                      className="inline-flex items-center gap-2 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white transition-colors duration-300 shadow-sm cursor-pointer"
                    >
                      {showForm ? 'Hide Inquiry Form' : `Explore ${activeService.title} →`}
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Service-Specific Inquiry Form Drawer */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white dark:bg-neutral-950 p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm shadow-md overflow-hidden"
                >
                  {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900 pb-4">
                        <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                          <Sparkles className="h-4.5 w-4.5 text-[#f97316]" />
                          <span className="text-base uppercase tracking-wider font-display">Inquire: {activeService.title}</span>
                        </div>
                        <button type="button" onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-neutral-700">
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Common Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Your Name *</label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={commonInputs.name}
                            onChange={handleCommonChange}
                            className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Email Address *</label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={commonInputs.email}
                            onChange={handleCommonChange}
                            className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Company Name</label>
                          <input
                            type="text"
                            name="company"
                            value={commonInputs.company}
                            onChange={handleCommonChange}
                            className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                          />
                        </div>
                      </div>

                      {/* Custom inputs according to activeService.id */}
                      {activeService.id === 'business-development' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900/30 p-4 rounded-sm border border-neutral-100 dark:border-neutral-900">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Target Market Segment</label>
                            <select
                              value={bdInputs.targetMarket}
                              onChange={(e) => setBdInputs({ ...bdInputs, targetMarket: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="B2B Corporate">B2B Corporate</option>
                              <option value="Consumer Retail">Consumer Retail</option>
                              <option value="SaaS & Cloud Services">SaaS & Cloud Services</option>
                              <option value="Goverment Contracts">Government/Institutional</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Projected Scale Budget</label>
                            <select
                              value={bdInputs.estimatedBudget}
                              onChange={(e) => setBdInputs({ ...bdInputs, estimatedBudget: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Launch Startup">Launch / Entry Level</option>
                              <option value="Mid-Tier">Mid-Tier Growth</option>
                              <option value="Enterprise Scale">Enterprise / Institutional Scale</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {activeService.id === 'vendor-network' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900/30 p-4 rounded-sm border border-neutral-100 dark:border-neutral-900">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Preferred Sourcing Category</label>
                            <select
                              value={vendorInputs.categories}
                              onChange={(e) => setVendorInputs({ ...vendorInputs, categories: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="IT/Hardware">IT & Hardware Procurement</option>
                              <option value="On-Ground Logistics">On-Ground Logistics & Fleet</option>
                              <option value="Catering & Hospitality">Catering & Event Hospitality</option>
                              <option value="Marketing Production">Print & Creative Production</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Operation Boundaries</label>
                            <select
                              value={vendorInputs.operationScale}
                              onChange={(e) => setVendorInputs({ ...vendorInputs, operationScale: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Regional">Regional Hub</option>
                              <option value="National Grid">National Grid Coverage</option>
                              <option value="International Channels">International Channels</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {activeService.id === 'event-operations' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900/30 p-4 rounded-sm border border-neutral-100 dark:border-neutral-900">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Target Event Format</label>
                            <select
                              value={eventInputs.eventType}
                              onChange={(e) => setEventInputs({ ...eventInputs, eventType: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Tech Summit">Tech Summit / Hackathon</option>
                              <option value="Corporate AGM">Corporate Conference / AGM</option>
                              <option value="Product Launch">Product Launch & Press Event</option>
                              <option value="Talent Exhibition">Talent & Career Exhibition</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Expected Attendance Headcount</label>
                            <select
                              value={eventInputs.headcount}
                              onChange={(e) => setEventInputs({ ...eventInputs, headcount: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Under 100">Under 100 Attendees</option>
                              <option value="100-500">100 - 500 Attendees</option>
                              <option value="500-2000">500 - 2,000 Attendees</option>
                              <option value="Over 2000">Over 2,000 Attendees</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {activeService.id === 'technical' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900/30 p-4 rounded-sm border border-neutral-100 dark:border-neutral-900">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Required Platform Type</label>
                            <select
                              value={techInputs.platformType}
                              onChange={(e) => setTechInputs({ ...techInputs, platformType: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Web Application">Custom Web Application</option>
                              <option value="E-Commerce Grid">E-Commerce & Payment Grid</option>
                              <option value="Business CRM">Internal Business CRM / Admin Panel</option>
                              <option value="Automation Pipeline">Workflow Automation / API Integrations</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Preferred Technology Stack</label>
                            <select
                              value={techInputs.techStack}
                              onChange={(e) => setTechInputs({ ...techInputs, techStack: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="React / Node.js">Fullstack React / Node.js</option>
                              <option value="Python / Django">Python Cloud (Django / FastAPI)</option>
                              <option value="Low-code/No-code">Low-Code / Out-of-box Integration</option>
                              <option value="Unsure">Consultation Needed</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {activeService.id === 'digital-marketing' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900/30 p-4 rounded-sm border border-neutral-100 dark:border-neutral-900">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase mb-2">Campaign Focus Channels</label>
                            <select
                              value={marketingInputs.channel}
                              onChange={(e) => setMarketingInputs({ ...marketingInputs, channel: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Social Media Management">Social Media Strategy & Mgmt</option>
                              <option value="SEO & Search Rankings">Search Engine Optimization (SEO)</option>
                              <option value="Paid Ad Campaigns">Paid Meta & Google Campaigns</option>
                              <option value="Visual Branding Setup">Brand Identity Systems & Design</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase mb-2">Primary Goal</label>
                            <select
                              value={marketingInputs.campaignGoal}
                              onChange={(e) => setMarketingInputs({ ...marketingInputs, campaignGoal: e.target.value })}
                              className="w-full rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                            >
                              <option value="Lead Generation">Lead & Client Acquisition</option>
                              <option value="Brand Authority">Brand Awareness & Engagement</option>
                              <option value="Product Launch Blitz">Product Launch Traffic Blitz</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div>
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white transition-colors duration-300 shadow-sm cursor-pointer w-full md:w-auto"
                        >
                          <Send className="h-3 w-3" />
                          Send Service Inquiry
                        </button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Inquiry Received Successfully</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                        Thank you, <strong className="text-neutral-800 dark:text-white">{commonInputs.name}</strong>. Our segment lead for <strong className="text-[#1d4ed8] dark:text-[#f97316]">{activeService.title}</strong> has received your parameters and will get in touch with you shortly.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setShowForm(false);
                          }}
                          className="px-5 py-2.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
