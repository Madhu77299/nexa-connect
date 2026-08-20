import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { companyConfig } from '../data/companyData';

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
