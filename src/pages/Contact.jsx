import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { companyConfig, socialLinks } from '../data/companyData';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setName('');
        setEmail('');
        setCompany('');
        setSubject('');
        setMessage('');
      }, 4000);
    }, 1500);
  };

  return (
    <PageTransition>
      {/* Dark Premium Layout */}
      <section className="min-h-[90vh] bg-[#08111f] text-white py-24 flex items-center transition-colors duration-300 relative">
        <div className="absolute top-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#3167ff]/10 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#20c9b5] tracking-widest uppercase block">// GET IN TOUCH</span>
              <h1 className="text-4xl font-black font-display uppercase tracking-tight leading-tight sm:text-5xl">
                Let's build<br />something meaningful.
              </h1>
              <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                Have an idea, partnership opportunity, operational requirement, or simply want to inquire about our scaling solutions? Connect with our domain consultants.
              </p>
            </div>

            {/* Direct contact items */}
            <div className="space-y-4 text-sm text-neutral-350">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-neutral-900 flex items-center justify-center text-[#3167ff]">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <span>{companyConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-neutral-900 flex items-center justify-center text-[#20c9b5]">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <span>{companyConfig.contact.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-neutral-900 flex items-center justify-center text-[#ff715b] shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <span className="leading-tight pt-1.5">{companyConfig.contact.address}</span>
              </div>
            </div>

            {/* Connect With Us */}
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest block">Connect With Us</span>
              <div className="flex space-x-4 text-neutral-500">
              <a href={socialLinks.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={socialLinks.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-all" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={socialLinks.facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={socialLinks.youtube || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-all" aria-label="YouTube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087C19.578 3.5 12 3.5 12 3.5s-7.578 0-9.413.576c-1.016.272-1.814 1.071-2.086 2.087C0 8.002 0 12 0 12s0 3.998.501 5.837c.272 1.016 1.07 1.814 2.086 2.086 1.835.577 9.413.577 9.413.577s7.578 0 9.413-.577c1.015-.272 1.813-1.07 2.085-2.086C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href={socialLinks.twitter || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-all" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            </div>
          </div>

          {/* Right Column Form inputs panel */}
          <div className="lg:col-span-7 bg-[#101c2f] border border-neutral-800 p-8 rounded-3xl shadow-lg relative">
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 bg-[#20c9b5]/10 rounded-full flex items-center justify-center mx-auto text-[#20c9b5] border border-[#20c9b5]/30">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Message Sent Successfully</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Your coordinates have been received. Our account development representative will follow up shortly to coordinate consultations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Madhu Sudhana" 
                      className="w-full bg-[#08111f] border-b border-neutral-700 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#3167ff] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Your Email</label>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="client@org.com" 
                      className="w-full bg-[#08111f] border-b border-neutral-700 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#3167ff] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Company / Org</label>
                    <input 
                      type="text" 
                      required 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)} 
                      placeholder="Enterprise Solutions" 
                      className="w-full bg-[#08111f] border-b border-neutral-700 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#3167ff] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Subject</label>
                    <input 
                      type="text" 
                      required 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      placeholder="Partnership Inquiries" 
                      className="w-full bg-[#08111f] border-b border-neutral-700 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#3167ff] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Your Message</label>
                  <textarea 
                    rows="4" 
                    required 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Briefly describe what your operations require..." 
                    className="w-full bg-[#08111f] border-b border-neutral-700 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#3167ff] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#3167ff] text-white py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#ff715b] transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Sending Coordinates...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>
    </PageTransition>
  );
}
