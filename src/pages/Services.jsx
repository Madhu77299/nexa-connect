import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Network, Calendar, Cpu, TrendingUp, ArrowRight, 
  CheckCircle2, ShieldCheck, Sparkles, Send, Loader2, Award, 
  Zap, Users, FileText, Check, Camera, Sun, Home, Layers, Plane 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import SuccessModal from '../components/SuccessModal';
import NeuralBackground from '../components/NeuralBackground';
import { servicesData, companyConfig } from '../data/companyData';
import { useData } from '../context/DataContext';

export default function Services() {
  const { services, logInquiry } = useData();
  const activeServicesList = services && services.length > 0 ? services : servicesData;
  
  const location = useLocation();
  const initialId = location.state?.activeId || activeServicesList[0]?.id || 'business-development';
  const [activeTabId, setActiveTabId] = useState(initialId);
  
  useEffect(() => {
    if (location.state?.activeId) {
      setActiveTabId(location.state.activeId);
      window.scrollTo(0, 0);
    }
  }, [location.state]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    requirement: ''
  });

  const selectedService = activeServicesList.find(s => s.id === activeTabId) || activeServicesList[0];

  const getServiceIcon = (id) => {
    switch (id) {
      case 'business-development':
        return <Briefcase className="h-5 w-5" />;
      case 'vendor-network':
        return <Network className="h-5 w-5" />;
      case 'event-operations':
        return <Calendar className="h-5 w-5" />;
      case 'technical':
        return <Cpu className="h-5 w-5" />;
      case 'digital-growth':
      case 'digital-marketing':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const trackingId = logInquiry({
        name: inquiryForm.name,
        company: inquiryForm.companyName || 'Enterprise Partner',
        phone: inquiryForm.phone,
        email: inquiryForm.email,
        subject: `[CAPABILITY INQUIRY] ${selectedService.title}`,
        message: `Requested Service: ${selectedService.title}\nCompany: ${inquiryForm.companyName}\nPhone: ${inquiryForm.phone}\nRequirement:\n${inquiryForm.requirement}`
      });
      setReferenceId(trackingId);
      setIsModalOpen(true);
      setInquiryForm({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        requirement: ''
      });
    }, 800);
  };

  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#060B16] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 antialiased">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER: 5 CORE CAPABILITIES */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-14 overflow-hidden border-b border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-[#080E1B] text-neutral-900 dark:text-white">
          <NeuralBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs font-bold text-[#0055FF] dark:text-[#00D2FF] uppercase tracking-wider mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ECOSYSTEM ARCHITECTURE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto">
              Our Core{' '}
              <span className="bg-gradient-to-r from-[#0055FF] via-[#00D2FF] to-[#10B981] bg-clip-text text-transparent">
                Capabilities
              </span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Engineered across five operational pillars to deliver synchronized vendor coordination, event management, cloud tech, and commercial growth.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CORE CAPABILITIES INTERACTIVE SHOWCASE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Top Capability Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {activeServicesList.map((svc) => {
              const isCurrent = svc.id === activeTabId;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActiveTabId(svc.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3.5 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] border-transparent text-white shadow-xl shadow-blue-500/20 scale-102'
                      : 'bg-white dark:bg-[#0A1224] border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-slate-300 hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                      isCurrent ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-slate-800 text-[#0055FF] dark:text-[#10B981]'
                    }`}>
                      {svc.number || "01"}
                    </span>
                    <div className={isCurrent ? 'text-white' : 'text-[#0055FF] dark:text-[#10B981]'}>
                      {getServiceIcon(svc.id)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-black font-display leading-snug">
                      {svc.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Capability Deep-Dive Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0A1224] border border-neutral-200 dark:border-white/[0.08] shadow-2xl space-y-10">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-neutral-200 dark:border-white/[0.08]">
              <div className="space-y-2 max-w-3xl">
                <span className="text-xs font-mono font-bold text-[#0055FF] dark:text-[#10B981] uppercase tracking-wider block">
                  CAPABILITY SCOPE
                </span>
                <h2 className="text-2xl sm:text-4xl font-black font-display text-neutral-900 dark:text-white">
                  {selectedService.title}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed pt-1">
                  {selectedService.description}
                </p>
              </div>

              <a
                href="#scope-requirement-form"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-emerald-500/35 hover:scale-[1.02] transition-all shrink-0 cursor-pointer"
              >
                <span>Request This Capability →</span>
              </a>
            </div>

            {/* Feature Deliverables */}
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 dark:text-slate-400 block">
                CORE DELIVERABLES &amp; INTEGRATIONS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Array.isArray(selectedService.capabilities) ? selectedService.capabilities : selectedService.features || []).map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200/80 dark:border-white/[0.06] flex items-start gap-3 hover:border-blue-500/30 dark:hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="h-6 w-6 rounded-lg bg-[#10B981]/15 text-[#10B981] dark:bg-[#10B981]/20 dark:text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-neutral-800 dark:text-slate-200 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Onboarding Diagram */}
            {selectedService.id === 'vendor-network' && (
              <div className="pt-8 border-t border-neutral-200 dark:border-white/[0.08] space-y-8">
                
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0055FF] dark:text-[#10B981] block">
                    STRUCTURED SUPPLIER PROTOCOL
                  </span>
                  <h3 className="text-2xl font-black font-display text-neutral-900 dark:text-white">
                    Vendor Onboarding Process
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-slate-400">
                    A streamlined, transparent 6-step lifecycle connecting quality vendors with enterprise demand.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                  {[
                    { num: '01', title: 'Submit Profile', desc: 'Send your professional portfolio & credentials.' },
                    { num: '02', title: 'Fill Registration Form', desc: 'Complete the supplier application form.' },
                    { num: '03', title: 'Profile Verification', desc: 'Our team reviews & validates your details.' },
                    { num: '04', title: 'Pay Registration Fee & Sign Agreement', desc: 'Complete payment & sign master SLA contract.' },
                    { num: '05', title: 'Access to Leads', desc: 'Receive high-quality, verified corporate project leads.' },
                    { num: '06', title: 'Commission Payment', desc: 'Earn lucrative revenue on successful project conversions.' }
                  ].map((st, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200 dark:border-white/[0.06] flex flex-col justify-between space-y-3 relative group hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/40 transition-all hover:-translate-y-1"
                    >
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#0055FF] to-[#10B981] text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                        {st.num}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-neutral-900 dark:text-white font-display">
                          {st.title}
                        </h4>
                        <p className="text-[11px] text-neutral-500 dark:text-slate-400 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Guarantee Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0038A8] via-[#0055FF] to-[#060D1E] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border border-blue-500/30">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#34D399] block font-mono">
                      VERIFIED VENDOR ASSURANCE
                    </span>
                    <h4 className="text-lg font-black font-display text-white">
                      No Conversions in 6 Months? Get Extra 6 Months of Free Leads!
                    </h4>
                  </div>

                  <Link
                    to="/contact"
                    className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md shrink-0 hover:scale-105 active:scale-95"
                  >
                    <span>Register as Vendor →</span>
                  </Link>
                </div>

              </div>
            )}

          </div>

          {/* Network Solutions Statement - Only for Vendor Network Solutions */}
          {selectedService.id === 'vendor-network' && (
            <div className="p-8 sm:p-10 rounded-3xl bg-[#060B16] text-white border border-white/[0.08] shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>UNIFIED NETWORK REACH</span>
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                Connected Professional Network
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
                Through our network, we connect clients with the right vendors, professionals and specialised service providers based on their requirements. Any additional specialised services are represented as solutions available through our network.
              </p>
            </div>
          )}

          {/* Scoping Form */}
          <div id="scope-requirement-form" className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0A1224] border border-neutral-200 dark:border-white/[0.08] shadow-2xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#0055FF] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
                <span>DIRECT ENGAGEMENT</span>
              </div>
              <h3 className="text-2xl font-black font-display text-neutral-900 dark:text-white">
                Submit Requirement for: {selectedService.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-slate-400">
                Our operations team will structure the execution plan and connect verified network resources within 24 hours.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200 dark:border-white/[0.1] py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#0055FF] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#0055FF]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={inquiryForm.companyName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, companyName: e.target.value })}
                    placeholder="e.g. TechSolutions India"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200 dark:border-white/[0.1] py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#0055FF] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#0055FF]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="ramesh@techsolutions.com"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200 dark:border-white/[0.1] py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#0055FF] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#0055FF]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    placeholder="+91 86880 07523"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200 dark:border-white/[0.1] py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#0055FF] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#0055FF]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                  Describe Your Requirement
                </label>
                <textarea
                  rows="3"
                  value={inquiryForm.requirement}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, requirement: e.target.value })}
                  placeholder="Outline your timeline, deliverables, target scale, and operational requirements..."
                  className="w-full rounded-xl bg-neutral-50 dark:bg-[#0E1830] border border-neutral-200 dark:border-white/[0.1] py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#0055FF] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#0055FF]/30"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white text-xs font-black uppercase tracking-wider shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Requirement...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Requirement &amp; Get Consultation</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </section>

        {/* Success Modal */}
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          referenceId={referenceId}
          title="Capability Requirement Received!"
          message="Your requirement has been routed to our specialized operations team. We will review your project parameters and contact you within 24 hours."
        />

      </div>
    </PageTransition>
  );
}
