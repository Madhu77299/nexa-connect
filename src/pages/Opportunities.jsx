import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Send, Upload, FileText, CheckCircle2, AlertCircle, 
  Sparkles, ArrowRight, ShieldCheck, MapPin, Clock, Building2, 
  Users, Layers, Award, Star, Mail, Phone, ExternalLink, Loader2,
  GraduationCap, Check, Compass, Search, Filter
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import PartnerTicker from '../components/PartnerTicker';
import SuccessModal from '../components/SuccessModal';
import { useData } from '../context/DataContext';
import { opportunitiesData } from '../data/companyData';

export default function Opportunities() {
  const { company, logInquiry } = useData();
  
  // Program Type Filter: 'All', 'Full-Time', 'Internship'
  const [programType, setProgramType] = useState('All');
  // Specific Track Filter
  const [activeTrack, setActiveTrack] = useState('All');
  
  const [selectedRole, setSelectedRole] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Application Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleTitle: 'Full-Stack Web & Cloud Developer',
    programType: 'Full-Time',
    track: 'Full-Stack Development',
    experience: '1-3 Years',
    portfolio: '',
    resumeSummary: '',
    coverNote: ''
  });

  const [errors, setErrors] = useState({});

  // Domain Tracks based on PDF and User Request
  const domainTracks = [
    { id: 'All', label: 'All Domains & Tracks' },
    { id: 'Full-Stack Development', label: 'Full-Stack Development' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'Mobile App Development', label: 'Mobile App Development' },
    { id: 'Event Operations', label: 'Event Operations' },
    { id: 'Digital Marketing & Social Media', label: 'Digital Marketing & Social Media' },
    { id: 'Vendor Operations & Business Dev', label: 'Vendor Operations & Business Dev' }
  ];

  // Filtered Opportunities List
  const filteredOpportunities = opportunitiesData.filter((item) => {
    const matchesProgram = 
      programType === 'All' || 
      (programType === 'Full-Time' && item.programType === 'Full-Time') ||
      (programType === 'Internship' && item.programType === 'Internship');
    
    const matchesTrack = activeTrack === 'All' || item.track === activeTrack;
    return matchesProgram && matchesTrack;
  });

  // Handle Quick Role Select from card
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({
      ...prev,
      roleTitle: role.title,
      programType: role.programType,
      track: role.track
    }));
    const formEl = document.getElementById('resume-application-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resume File Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size exceeds 10MB limit.' }));
        return;
      }
      setResumeFile(file);
      setErrors(prev => ({ ...prev, resume: '' }));
      if (!formData.resumeSummary) {
        setFormData(prev => ({
          ...prev,
          resumeSummary: `Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
        }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = 'Valid phone number is required.';
    }
    if (!resumeFile && !formData.resumeSummary.trim()) {
      errs.resume = 'Please upload your Resume (PDF/DOCX) or provide a summary.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Application
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const ref = `PMK-RESUME-${Math.floor(100000 + Math.random() * 900000)}`;

    const applicationPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: `Applicant (${formData.track} - ${formData.programType})`,
      subject: `[RESUME APPLICATION] ${formData.roleTitle} - Ref: ${ref}`,
      message: `Applicant Name: ${formData.name}\nProgram: ${formData.programType}\nTrack / Domain: ${formData.track}\nRole: ${formData.roleTitle}\nExperience: ${formData.experience}\nPortfolio / LinkedIn / GitHub: ${formData.portfolio || 'N/A'}\nResume Attachment: ${resumeFile ? resumeFile.name : 'Text Provided'}\nResume Summary: ${formData.resumeSummary || 'Refer to uploaded document'}\nCover Note: ${formData.coverNote || 'N/A'}`
    };

    setTimeout(() => {
      logInquiry(applicationPayload);
      setReferenceId(ref);
      setIsSubmitting(false);
      setIsSuccessOpen(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        roleTitle: 'Full-Stack Web & Cloud Developer',
        programType: 'Full-Time',
        track: 'Full-Stack Development',
        experience: '1-3 Years',
        portfolio: '',
        resumeSummary: '',
        coverNote: ''
      });
      setResumeFile(null);
      setSelectedRole(null);
    }, 800);
  };

  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#0B0F17] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 antialiased">
        
        {/* ========================================================================= */}
        {/* 1. HERO BANNER: BESPOKE EXECUTIVE DARK PALETTE */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-20 overflow-hidden border-b border-neutral-200 dark:border-slate-800/80 bg-white dark:bg-[#0F141F] text-neutral-900 dark:text-white">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-600/10 dark:bg-blue-900/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 dark:bg-amber-600/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-slate-800/90 border border-neutral-200 dark:border-slate-700 text-xs font-bold tracking-wider text-amber-700 dark:text-amber-400 uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>PMK NEXA CAREERS // FULL-TIME &amp; INTERNSHIPS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-tight max-w-4xl text-neutral-900 dark:text-white">
              Build your future across our <span className="text-blue-600 dark:text-amber-400">connected enterprise network.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Explore rewarding full-time roles and high-impact internship opportunities in Full-Stack Web, Mobile Apps, Event Operations, Digital Marketing, and Vendor Sourcing.
            </p>

            {/* Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#151D2C] border border-neutral-200 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">HIRING STATUS</span>
                <span className="text-xl font-black text-neutral-900 dark:text-white">Active 2026</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#151D2C] border border-neutral-200 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">PROGRAMS</span>
                <span className="text-xl font-black text-neutral-900 dark:text-white">Full-Time &amp; Intern</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#151D2C] border border-neutral-200 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block">LOCATIONS</span>
                <span className="text-xl font-black text-neutral-900 dark:text-white">Hybrid / Hubs</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#151D2C] border border-neutral-200 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">INTERNSHIP PPO</span>
                <span className="text-xl font-black text-neutral-900 dark:text-white">Fast Absorption</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Ecosystem Partners Grid */}
        <PartnerTicker noScroll={true} />

        {/* ========================================================================= */}
        {/* 2. PROGRAM TYPE SWITCHER & DOMAIN FILTERS */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-neutral-200 dark:border-slate-800">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
                // EXPLORE OPENINGS
              </span>
              <h2 className="text-3xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
                Available Positions &amp; Internship Tracks
              </h2>
            </div>

            {/* 1. Main Program Type Switcher */}
            <div className="flex items-center p-1.5 rounded-2xl bg-neutral-200 dark:bg-slate-900 border border-neutral-300 dark:border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => setProgramType('All')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  programType === 'All'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md'
                    : 'text-neutral-600 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                All Openings ({opportunitiesData.length})
              </button>

              <button
                type="button"
                onClick={() => setProgramType('Full-Time')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  programType === 'Full-Time'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-neutral-600 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>Full-Time Roles</span>
              </button>

              <button
                type="button"
                onClick={() => setProgramType('Internship')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  programType === 'Internship'
                    ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-black shadow-md'
                    : 'text-neutral-600 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Internship Programs</span>
              </button>
            </div>
          </div>

          {/* Domain Track Filters */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider block">
              Filter by Domain Track:
            </span>

            <div className="flex flex-wrap gap-2.5">
              {domainTracks.map(track => {
                const isSelected = activeTrack === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => setActiveTrack(track.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950 border-neutral-900 dark:border-white shadow-md scale-105'
                        : 'bg-white dark:bg-slate-900/80 border-neutral-200 dark:border-slate-800 text-neutral-700 dark:text-slate-300 hover:border-neutral-400 dark:hover:border-slate-600'
                    }`}
                  >
                    {track.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opportunities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredOpportunities.map((opp) => (
              <motion.div
                key={opp.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200/80 dark:border-slate-800 hover:border-neutral-400 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full font-mono border ${
                      opp.programType === 'Internship'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/30'
                    }`}>
                      {opp.programType}
                    </span>

                    <span className="text-[11px] font-bold text-neutral-500 dark:text-slate-400 font-mono">
                      {opp.stipendOrSalary}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                    {opp.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-slate-400" />
                      {opp.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      {opp.experience}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {opp.skills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-slate-800/80 text-neutral-600 dark:text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleSelectRole(opp)}
                    className="w-full py-3 rounded-2xl bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-neutral-800 dark:hover:bg-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:scale-102"
                  >
                    <span>Apply with Resume</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. RESUME APPLICATION FORM */}
        {/* ========================================================================= */}
        <section id="resume-application-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-2xl space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-slate-800 text-blue-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
                <FileText className="h-3.5 w-3.5" />
                <span>DIRECT TALENT SUBMISSION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-neutral-900 dark:text-white">
                Submit Your Resume &amp; Profile
              </h2>
              <p className="text-xs text-neutral-500 dark:text-slate-400">
                Your application will be directly logged into the PMK Nexa executive recruitment desk and routed to <span className="font-mono text-blue-600 dark:text-amber-400">pmknexasolutions@gmail.com</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sundaram"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                  />
                  {errors.name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@example.com"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                  />
                  {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 86880 07523"
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                  />
                  {errors.phone && <span className="text-[11px] text-rose-500 mt-1 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                    Program Type *
                  </label>
                  <select
                    value={formData.programType}
                    onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                  >
                    <option value="Full-Time">Full-Time Role</option>
                    <option value="Internship">Internship Program (with PPO Conversion)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                    Domain / Specialized Track *
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                  >
                    <option value="Full-Stack Development">Full-Stack Development (React/Node/Cloud)</option>
                    <option value="Web Development">Web Development (Frontend UI/UX)</option>
                    <option value="Mobile App Development">Mobile App Development (iOS &amp; Android)</option>
                    <option value="Event Operations">Event Operations &amp; Production Logistics</option>
                    <option value="Digital Marketing & Social Media">Digital Marketing &amp; Social Media</option>
                    <option value="Vendor Operations & Business Dev">Vendor Operations &amp; Business Dev</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                    Portfolio / GitHub / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://github.com/... or https://linkedin.com/in/..."
                    className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Upload Resume File Dropzone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                  Attach Your Resume (PDF, DOCX, up to 10MB) *
                </label>

                <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-slate-700 bg-neutral-50 dark:bg-[#0B0F17]/60 flex flex-col items-center justify-center text-center space-y-2 relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 dark:bg-slate-800 text-blue-600 dark:text-amber-400 flex items-center justify-center">
                    <Upload className="h-5 w-5" />
                  </div>

                  {resumeFile ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-slate-200">
                        Click or drag your Resume document here
                      </p>
                      <p className="text-[11px] text-neutral-400">PDF, DOC, DOCX files accepted</p>
                    </div>
                  )}
                </div>
                {errors.resume && <span className="text-[11px] text-rose-500 mt-1 block">{errors.resume}</span>}
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1.5">
                  Resume Summary / Key Skills Statement
                </label>
                <textarea
                  rows="3"
                  value={formData.resumeSummary}
                  onChange={(e) => setFormData({ ...formData, resumeSummary: e.target.value })}
                  placeholder="Summarize your key achievements, tech stack proficiency, or past projects..."
                  className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-slate-950 hover:bg-neutral-800 dark:hover:bg-slate-100 text-xs font-black uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Transmitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Application &amp; Send to Recruiter</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </section>

        {/* Confirmation Modal */}
        <SuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          referenceId={referenceId}
          title="Resume Application Successfully Submitted!"
          message="Your application and resume have been directly logged into the PMK Nexa recruitment database and forwarded to pmknexasolutions@gmail.com. Our talent team will review your profile within 48 hours."
        />

      </div>
    </PageTransition>
  );
}
