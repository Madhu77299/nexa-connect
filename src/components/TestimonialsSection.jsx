import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TestimonialsSection() {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex] || testimonials[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300 relative overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white font-display tracking-tight">
            Trusted by Leaders Across India.
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Hear from executive stakeholders and procurement directors partnering with PMK Nexa.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#101c2f] border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl relative"
            >
              <Quote className="absolute top-8 right-8 h-16 w-16 text-neutral-100 dark:text-neutral-800/60 pointer-events-none" />

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed mb-8 relative z-10 italic">
                "{current.quote}"
              </p>

              {/* Author Lockup */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                    alt={current.author}
                    className="h-12 w-12 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                  />
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                      {current.author}
                    </h4>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                      {current.position}, <strong className="text-[#3167ff] dark:text-[#20c9b5]">{current.company}</strong>
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#3167ff] hover:text-white transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#3167ff] hover:text-white transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
