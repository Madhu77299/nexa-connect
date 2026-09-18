import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, 
  Sparkles, ExternalLink, Briefcase, Network, Calendar, Cpu, 
  TrendingUp, Phone, MessageSquare, Check, Clock, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import PartnerTicker from '../components/PartnerTicker';
import { useData } from '../context/DataContext';
import { howWeWorkData } from '../data/companyData';

export default function OurWork() {
  const { projects } = useData();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Business Growth Projects',
    'Network Collaborations',
    'Event Operations',
    'Technical Projects',
    'Digital Marketing Campaigns'
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#0B0F17] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 antialiased">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER: EXECUTIVE DARK PALETTE */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-20 overflow-hidden border-b border-neutral-200 dark:border-slate-800/80 bg-white dark:bg-[#0F141F] text-neutral-900 dark:text-white">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-600/10 dark:bg-blue-900/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 dark:bg-amber-600/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-slate-800/90 border border-neutral-200 dark:border-slate-700 text-xs font-bold tracking-wider text-amber-700 dark:text-amber-400 uppercase shadow-sm mx-auto">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>COMPLETED PROJECTS &amp; EXECUTION METHODOLOGY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-tight">
              Our Work
            </h1>

            <p className="text-sm sm:text-lg text-neutral-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover our completed commercial engagements and case studies across enterprise growth, vendor networks, high-stakes events, technical platforms, and digital campaigns—delivered through our structured 4-stage execution methodology.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href="#projects-grid"
                className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                <span>Explore Our Work ↓</span>
              </a>
              <a
                href="#how-we-work-process"
                className="px-7 py-3.5 rounded-2xl bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 text-neutral-800 dark:text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer hover:bg-neutral-200 dark:hover:bg-slate-700"
              >
                <span>How We Work ↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Strategic Ecosystem Partners Grid */}
        <PartnerTicker noScroll={true} />

        {/* ========================================================================= */}
        {/* 2. SECTION 1: OUR WORK & EXPERIENCE (PROJECTS & CASE STUDIES FIRST) */}
        {/* ========================================================================= */}
        <section id="projects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-neutral-200 dark:border-slate-800">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
                // COMPLETED ENGAGEMENTS &amp; CASE STUDIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-neutral-900 dark:text-white">
                Our Work &amp; Experience
              </h2>
              <p className="text-xs text-neutral-500 dark:text-slate-400">
                Explore real results across our core experience categories.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-md'
                      : 'bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 text-neutral-700 dark:text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md font-mono">
                        {project.category}
                      </span>

                      <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-neutral-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Details Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400">
                        <span>Client: {project.client || "Enterprise"}</span>
                        <span className="font-mono">{project.year || "2026"}</span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors leading-snug font-display">
                        {project.name}
                      </h3>

                      <p className="text-xs text-neutral-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Metrics badge */}
                      {project.metrics && (
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {project.metrics}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Deliverables Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                      {(Array.isArray(project.deliverables) ? project.deliverables : []).slice(0, 3).map((del, dIdx) => (
                        <span 
                          key={dIdx} 
                          className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-slate-800/80 text-neutral-700 dark:text-slate-300 font-mono"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </section>


        {/* ========================================================================= */}
        {/* 3. SECTION 2: HOW WE WORK (4-STAGE METHODOLOGY SECOND) */}
        {/* ========================================================================= */}
        <section id="how-we-work-process" className="py-20 border-t border-neutral-200 dark:border-slate-800/80 bg-neutral-100 dark:bg-[#0B0F17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
                // EXECUTION METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-neutral-900 dark:text-white">
                How We Work
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400">
                A disciplined, end-to-end framework turning requirements into seamless reality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howWeWorkData.map((item) => (
                <div
                  key={item.step}
                  className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-md hover:border-slate-600 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black px-3.5 py-1.5 rounded-full bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-md">
                      {item.step}
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-400 dark:text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black font-display text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 5. CONSULTATION CTA BANNER */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 dark:bg-[#121824] text-white border border-neutral-800 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block font-mono">
                // TELL US WHAT YOU NEED
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                Ready to initiate your next project with PMK Nexa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with our operational leads to structure the optimal vendor and technical solution.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="https://wa.me/918688007523"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp 8688007523</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all"
              >
                <span>Submit Requirement →</span>
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#121824] rounded-3xl p-8 shadow-2xl border border-neutral-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-amber-400 uppercase tracking-widest block font-mono">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white font-display">
                  {selectedProject.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-neutral-100 dark:bg-slate-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="h-64 w-full rounded-2xl overflow-hidden bg-neutral-900">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.name} 
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs text-neutral-500 font-bold border-b border-neutral-100 dark:border-slate-800 pb-3">
                <span>Client: <strong className="text-neutral-900 dark:text-white">{selectedProject.client}</strong></span>
                <span>Year: <strong className="text-neutral-900 dark:text-white">{selectedProject.year}</strong></span>
                <span>Metric: <strong className="text-emerald-500">{selectedProject.metrics}</strong></span>
              </div>

              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Key Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Array.isArray(selectedProject.deliverables) ? selectedProject.deliverables : []).map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-slate-300 bg-neutral-100 dark:bg-slate-800/60 p-2.5 rounded-xl font-mono">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-amber-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
