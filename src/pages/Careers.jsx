import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Clock, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import { jobsData } from '../data/companyData';

export default function Careers() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Internship', 'Full Time'];

  const filteredJobs = jobsData.filter((job) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Internship') return job.type.toLowerCase().includes('internship');
    if (activeFilter === 'Full Time') return job.type.toLowerCase().includes('full time') || job.type.toLowerCase().includes('full-time');
    return true;
  });

  return (
    <PageTransition>
      {/* 1. Header Hero Area */}
      <section className="bg-neutral-50 dark:bg-[#101c2f] py-20 border-b border-neutral-200/50 dark:border-neutral-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase">TALENT PLATFORM</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-6xl max-w-3xl leading-tight">
            Build what's next with us.
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            We are looking for creative directors, operations specialists, full-stack engineers, and business development leads to deploy connected solutions.
          </p>
        </div>
      </section>

      {/* 2. Content, Filters, and Openings list */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300">
        <div className="space-y-12">
          
          {/* Section labels */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">// DEPLOYMENT POSITIONS</h3>
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white font-display">Current Openings</h2>
            </div>

            {/* Filter buttons pills */}
            <div className="flex flex-wrap md:flex-nowrap gap-2 max-w-full overflow-x-auto no-scrollbar pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all shrink-0 cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[#3167ff] text-white border-transparent'
                      : 'bg-white dark:bg-[#101c2f] border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-350 hover:border-[#3167ff]/40 shadow-sm'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Job List */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-[#101c2f] border border-neutral-200/60 dark:border-neutral-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#3167ff]/40 shadow-sm transition-all group"
                  data-cursor="open"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-[#3167ff] dark:text-[#20c9b5] bg-[#3167ff]/10 px-2 py-0.5 rounded uppercase">
                        {job.department}
                      </span>
                      <span className="text-xs text-neutral-450 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.type}
                      </span>
                    </div>
                    <Link to={`/careers/${job.id}`}>
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5] transition-colors">
                        {job.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <Link
                    to={`/careers/${job.id}`}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5]"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-12 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-500">No active postings match the selected filter query. Check back shortly.</span>
              </div>
            )}
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
