import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { companyConfig } from '../data/companyData';
import { submitContactForm } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await submitContactForm(formData);
      setSuccess(res);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      {/* 1. Header Segment */}
      <section className="bg-neutral-50 dark:bg-neutral-900/10 py-24 border-b border-neutral-200/50 dark:border-neutral-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase">GET IN TOUCH</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-7xl max-w-2xl leading-none font-display">
            LET'S TALK.
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            Have a project, partnership, or candidate opportunity in mind? Write to us, and our operational managers will contact you within 24 hours.
          </p>
        </div>
      </section>

      {/* 2. Form & Info Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Corporate Offices</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                You can reach us through our official phone lines or write directly to our management support team.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-sm text-neutral-950 dark:text-white shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email Address</h4>
                  <p className="text-neutral-950 dark:text-neutral-200 font-bold mt-1 text-sm">
                    {companyConfig.contact.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-sm text-neutral-950 dark:text-white shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Phone Lines</h4>
                  <p className="text-neutral-950 dark:text-neutral-200 font-bold mt-1 text-sm">
                    {companyConfig.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-sm text-neutral-950 dark:text-white shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Office Address</h4>
                  <p className="text-neutral-950 dark:text-neutral-200 mt-1 text-sm leading-relaxed">
                    {companyConfig.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-950 p-8 border border-neutral-200/60 dark:border-neutral-900 rounded-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="flex items-start gap-2 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-4 rounded-sm text-sm border border-red-200 dark:border-red-950">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 p-4 rounded-sm text-sm border border-green-200 dark:border-green-950">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-bold">{success.message}</p>
                      <p className="text-[10px] text-green-600/80 dark:text-green-400/80 mt-1">Reference ID: {success.refId}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#1d4ed8] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-[#f97316]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3.5 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white disabled:opacity-50 transition-all shadow-sm cursor-pointer"
                  >
                    {loading ? 'Sending Request...' : 'Submit Message'}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
