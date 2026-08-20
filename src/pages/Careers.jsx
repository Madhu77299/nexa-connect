import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { jobsData } from '../data/companyData';

export default function Careers() {
  const [filterType, setFilterType] = useState('All');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  // Filter listings
  const filteredJobs = jobsData.filter((job) => {
    const matchType = filterType === 'All' || job.type === filterType;
    const matchDomain = filterDomain === 'All' || job.domain === filterDomain;
    
    let matchLocation = true;
    if (filterLocation !== 'All') {
      if (filterLocation === 'Remote') {
        matchLocation = job.location.toLowerCase().includes('remote');
      } else if (filterLocation === 'Hybrid') {
        matchLocation = job.location.toLowerCase().includes('hybrid');
      } else if (filterLocation === 'On-site') {
        matchLocation = job.location.toLowerCase().includes('on-site');
      }
    }

    return matchType && matchDomain && matchLocation;
  });

  return (
    <PageTransition>
      {/* 1. Editorial Header */}
      <section className="bg-neutral-50 dark:bg-neutral-900/10 py-24 border-b border-neutral-200/50 dark:border-neutral-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase">JOIN THE NEXA NETWORK</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-7xl max-w-3xl leading-tight">
            Find Your Place At PMK Nexa.
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            We're building a growing network of creators, engineers, logistics professionals, and operations stars. Explore our current sample openings below.
          </p>
        </div>
      </section>

      {/* 2. Listing and Filtering */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        
        {/* Horizontal Filters Bar */}
        <div className="flex flex-wrap gap-8 items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            <Filter className="h-4 w-4" />
            <span>Filter Positions</span>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Type Selector */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-sm border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            >
              <option value="All">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>

            {/* Domain Selector */}
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="rounded-sm border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            >
              <option value="All">All Domains</option>
              <option value="Technical">Technical</option>
              <option value="Non-Technical">Non-Technical</option>
            </select>

            {/* Work Mode Selector */}
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="rounded-sm border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            >
              <option value="All">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>

        {/* Premium List Design */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-sm">
            <p className="text-neutral-500">No positions matched your active filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="border-b border-neutral-200 dark:border-neutral-900 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-all duration-300"
                data-cursor="open"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                    <span>{job.domain}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                  <Link to={`/careers/${job.id}`}>
                    <h3 className="text-2xl font-black text-neutral-900 dark:text-white group-hover:text-[#1d4ed8] dark:group-hover:text-[#f97316] transition-colors leading-tight">
                      {job.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <Link
                    to={`/careers/${job.id}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 group-hover:bg-[#1d4ed8] dark:group-hover:bg-[#f97316] group-hover:text-white transition-all"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>
    </PageTransition>
  );
}
