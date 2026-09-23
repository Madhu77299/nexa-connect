import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoiEstimator() {
  const [selectedServices, setSelectedServices] = useState(['Event Operations', 'Technical Services']);
  const [teamScale, setTeamScale] = useState('Medium Enterprise');
  const [timeline, setTimeline] = useState('Quarterly (3 Months)');

  const serviceOptions = [
    { name: 'Business Development', estSavings: '25-35% Sourcing Time' },
    { name: 'Vendor Network Support', estSavings: '15-20% Procurement Cost' },
    { name: 'Event Operations', estSavings: '100% SLA Guarantee' },
    { name: 'Technical Services', estSavings: '2.5x Dev Velocity' },
    { name: 'Digital Marketing', estSavings: '140%+ Lead Expansion' }
  ];

  const toggleService = (name) => {
    setSelectedServices(prev => 
      prev.includes(name) 
        ? prev.filter(s => s !== name) 
        : [...prev, name]
    );
  };

  return (
    <section className="py-6 bg-white dark:bg-[#0c1524] transition-colors duration-300 relative border-t border-neutral-200/60 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-5 space-y-6">

            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white font-display tracking-tight leading-tight">
              Model Your Enterprise Scope &amp; Efficiency Gains.
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Select the service channels and organizational footprint you want to streamline. See how PMK Nexa coordinates deliverables with SLA rigor.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-[#3167ff] dark:text-[#20c9b5]" />
                <span>Single Point of Contact (SPOC) Governance</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <Zap className="h-4 w-4 text-[#3167ff] dark:text-[#20c9b5]" />
                <span>On-Demand Resource &amp; Supply Chain Scaling</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <Layers className="h-4 w-4 text-[#3167ff] dark:text-[#20c9b5]" />
                <span>Synchronized Multi-Vendor Invoicing &amp; Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Estimator Box */}
          <div className="lg:col-span-7 rounded-3xl bg-neutral-50 dark:bg-[#101c2f] border border-neutral-200/80 dark:border-neutral-800/80 p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Step 1: Services selection */}
            <div>
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-3">
                1. Select Operations Channels ({selectedServices.length} Selected)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceOptions.map((svc) => {
                  const isChecked = selectedServices.includes(svc.name);
                  return (
                    <button
                      key={svc.name}
                      type="button"
                      onClick={() => toggleService(svc.name)}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                        isChecked 
                          ? 'border-[#3167ff] bg-[#3167ff]/10 dark:bg-[#3167ff]/15 dark:border-[#3167ff]' 
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#08111f] hover:border-neutral-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                          {svc.name}
                        </span>
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          {svc.estSavings}
                        </span>
                      </div>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isChecked ? 'bg-[#3167ff] border-[#3167ff] text-white' : 'border-neutral-400'
                      }`}>
                        {isChecked && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-2">
                  2. Organization Scale
                </label>
                <select
                  value={teamScale}
                  onChange={(e) => setTeamScale(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-[#08111f] border border-neutral-200 dark:border-neutral-800 py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
                >
                  <option>Early Growth / Startup (&lt; 20 Team)</option>
                  <option>Medium Enterprise (20-100 Team)</option>
                  <option>Large Institutional (&gt; 100 Team)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-2">
                  3. Engagement Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-[#08111f] border border-neutral-200 dark:border-neutral-800 py-2.5 px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#3167ff]"
                >
                  <option>Pilot / Single Milestone (1 Month)</option>
                  <option>Quarterly (3 Months)</option>
                  <option>Annual Strategic Retainer (12 Months)</option>
                </select>
              </div>
            </div>

            {/* Estimated Output Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#08111f] border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#20c9b5] block">
                  ESTIMATED OPERATIONAL BENEFIT
                </span>
                <div className="text-xl font-black text-neutral-900 dark:text-white font-display mt-0.5">
                  {selectedServices.length > 0 ? `${selectedServices.length} Synced Hubs · ~35% Overhead Cut` : 'Select at least 1 service'}
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#3167ff] hover:bg-[#2552d4] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all shrink-0"
              >
                <span>Request Proposal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
