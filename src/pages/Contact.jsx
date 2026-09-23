import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, AlertCircle, Loader2, MessageSquare, ArrowRight, Building2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SuccessModal from '../components/SuccessModal';
import NeuralBackground from '../components/NeuralBackground';
import { useData } from '../context/DataContext';

export default function Contact() {
  const { company, logInquiry } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    selectedCapability: 'Business Development support',
    requirementDescription: ''
  });

  const [errors, setErrors] = useState({});

  const capabilityOptions = [
    "Business Development support",
    "Vendor Network Solutions",
    "Event Operations",
    "Technical Solutions",
    "Digital Marketing"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required.';
    }
    if (!formData.requirementDescription.trim()) {
      errs.requirementDescription = 'Please describe your requirement.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const trackingId = logInquiry({
        name: formData.name,
        company: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        subject: `[REQUIREMENT] ${formData.selectedCapability}`,
        message: `Capability: ${formData.selectedCapability}\nCompany: ${formData.companyName}\nPhone: ${formData.phone}\nRequirement Details:\n${formData.requirementDescription}`
      });
      setReferenceId(trackingId);
      setIsModalOpen(true);

      setFormData({
        name: '',
        companyName: '',
        phone: '',
        email: '',
        selectedCapability: 'Business Development support',
        requirementDescription: ''
      });
      setErrors({});
    }, 800);
  };

  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#0B0F17] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 antialiased">
        
        {/* Header Hero Section */}
        <section className="relative pt-12 pb-12 overflow-hidden border-b border-neutral-200 dark:border-slate-800/80 bg-white dark:bg-[#0F141F] text-neutral-900 dark:text-white">
          <NeuralBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">


            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto">
              Tell Us What You Need.<br />
              <span className="text-blue-600 dark:text-amber-400">
                We'll Help You Connect.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              PMK NEXA SOLUTIONS PRIVATE LIMITED connects your business with the right vendors, technical solutions, and growth opportunities.
            </p>
          </div>
        </section>

        {/* Main Form & Direct Channels */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Quick Contact Options */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-xl space-y-6">
                <div>

                  <h3 className="text-xl font-black font-display text-neutral-900 dark:text-white">
                    Contact Options
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
                    Connect directly via WhatsApp, direct phone call, or email.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Us */}
                  <a
                    href="https://wa.me/918688007523"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block">WhatsApp Us</span>
                        <strong className="text-sm text-neutral-900 dark:text-white font-mono">8688007523</strong>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Call Us */}
                  <a
                    href="tel:+918688007523"
                    className="flex items-center justify-between p-4 rounded-2xl bg-blue-600/10 border border-blue-600/30 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block">Call Us Directly</span>
                        <strong className="text-sm text-neutral-900 dark:text-white font-mono">+91 86880 07523</strong>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Corporate Email */}
                  <a
                    href="mailto:pmknexasolutions@gmail.com"
                    className="flex items-center justify-between p-4 rounded-2xl bg-neutral-100 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-800 text-neutral-700 dark:text-slate-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-700 text-white flex items-center justify-center shadow-md">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block">Official Email</span>
                        <strong className="text-xs text-neutral-900 dark:text-white">pmknexasolutions@gmail.com</strong>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Office Locations */}
                <div className="pt-5 border-t border-neutral-100 dark:border-slate-800 space-y-4">
                  <div>

                    <h4 className="text-sm font-black text-neutral-900 dark:text-white font-display">
                      Head Office &amp; Branch Office
                    </h4>
                  </div>

                  {/* Head Office Card */}
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200/80 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 dark:bg-amber-400/10 dark:text-amber-400">
                        <Building2 className="h-3 w-3" />
                        Head Office
                      </span>
                      <span className="text-[11px] font-bold text-neutral-500 dark:text-slate-400">Visakhapatnam</span>
                    </div>
                    <div className="text-xs font-black text-neutral-900 dark:text-white">
                      Vizag - Madhurawada
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-slate-400 leading-relaxed">
                      Madhurawada, Visakhapatnam, Andhra Pradesh, India
                    </p>
                  </div>

                  {/* Branch Office Card */}
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200/80 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                        <MapPin className="h-3 w-3" />
                        Branch Office
                      </span>
                      <span className="text-[11px] font-bold text-neutral-500 dark:text-slate-400">Rajam</span>
                    </div>
                    <div className="text-xs font-black text-neutral-900 dark:text-white">
                      Krishna Complex (First Floor)
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-slate-300 font-medium">
                      Palakonda Road
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-slate-400 leading-relaxed">
                      Rajam, Srikakulam district, Andhra Pradesh, 532127
                    </p>
                  </div>

                  {/* Corporate Registration Note */}
                  <div className="text-[11px] text-neutral-400 dark:text-slate-500 pt-1">
                    Corporate Entity: <strong className="text-neutral-700 dark:text-slate-300">{company.name || "PMK NEXA SOLUTIONS PRIVATE LIMITED"}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-2xl space-y-6">
                <div>

                  <h3 className="text-2xl font-black font-display text-neutral-900 dark:text-white">
                    Submit Your Requirement
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-slate-400">
                    Fill in your project specifications and our strategic team will connect with you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                      />
                      {errors.name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Organization or business name"
                        className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                      />
                      {errors.companyName && <span className="text-[11px] text-rose-500 mt-1 block">{errors.companyName}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
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
                      <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                      />
                      {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                      Select Capability *
                    </label>
                    <select
                      value={formData.selectedCapability}
                      onChange={(e) => setFormData({ ...formData, selectedCapability: e.target.value })}
                      className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                    >
                      {capabilityOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                      Describe Your Requirement *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.requirementDescription}
                      onChange={(e) => setFormData({ ...formData, requirementDescription: e.target.value })}
                      placeholder="Please specify timeline, scale, deliverables, and service expectations..."
                      className="w-full rounded-xl bg-neutral-50 dark:bg-[#0B0F17] border border-neutral-200 dark:border-slate-700 py-3 px-4 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-amber-400"
                    />
                    {errors.requirementDescription && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.requirementDescription}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-2xl bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-neutral-800 dark:hover:bg-white text-xs font-black uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Transmitting Requirement...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Your Requirement</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Confirmation Modal */}
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          referenceId={referenceId}
          title="Requirement Successfully Submitted!"
          message="Your requirement has been logged into the PMK Nexa corporate desk. Our operations lead will reach out to you via WhatsApp / Phone within 24 hours."
        />

      </div>
    </PageTransition>
  );
}
