import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, Sparkles, CheckCircle2, Layers, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProjectsShowcase() {
  const { projects } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Business Growth Projects',
    'Network Collaborations',
    'Event Operations',
    'Technical Projects',
    'Digital Growth Campaigns'
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-white dark:bg-[#0B0F17] transition-colors duration-300 relative border-t border-neutral-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-slate-800 text-xs font-black text-blue-600 dark:text-amber-400 uppercase tracking-widest font-mono">
              <Layers className="h-3.5 w-3.5" />
              OUR WORK &amp; EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white font-display tracking-tight">
              Enterprise Case Studies &amp; Experience
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Showcasing our actual work across business growth, network collaborations, event operations, technical platforms, and digital campaigns.
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
                    : 'bg-neutral-100 dark:bg-slate-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-slate-800'
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
                className="group relative rounded-3xl bg-neutral-50 dark:bg-[#121824] border border-neutral-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                    <img 
                      src={project.image || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"} 
                      alt={project.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
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

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {project.name}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
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

                {/* Footer deliverable tags */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-neutral-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                    {(Array.isArray(project.deliverables) ? project.deliverables : []).slice(0, 3).map((del, dIdx) => (
                      <span 
                        key={dIdx} 
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-neutral-200/60 dark:bg-slate-800 text-neutral-700 dark:text-neutral-300 font-mono"
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

      </div>

      {/* Project Detail Modal */}
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

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Key Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Array.isArray(selectedProject.deliverables) ? selectedProject.deliverables : []).map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-slate-800/60 p-2.5 rounded-xl font-mono">
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
    </section>
  );
}
