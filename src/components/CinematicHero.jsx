import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function CinematicHero() {
  const { company, mediaSettings } = useData();
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef(null);

  const slides = [
    {
      id: "slide-1",
      tag: "ONE NETWORK. MULTIPLE CAPABILITIES.",
      title: "Your Growth. Our Network.",
      highlight: "Our Network.",
      subtitle: "PMK NEXA SOLUTIONS PRIVATE LIMITED connects businesses, professionals, vendors and opportunities through a strong and reliable network.",
      videoUrl: mediaSettings?.heroVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-loop-animation-43301-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Explore Our Capabilities",
      ctaLink: "/services",
      ctaState: { activeId: "business-development" },
      secondaryCtaText: "Connect With Us",
      secondaryCtaLink: "/contact",
      stats: "5 Core Capabilities · 100% Verified Network"
    },
    {
      id: "slide-2",
      tag: "GROWTH",
      title: "Business Development Support.",
      highlight: "Support.",
      subtitle: "Supporting businesses with growth opportunities, client acquisition, strategic partnerships and business development.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-digital-matrix-of-numbers-31908-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Explore Capabilities",
      ctaLink: "/services",
      ctaState: { activeId: "business-development" },
      secondaryCtaText: "Connect With Us",
      secondaryCtaLink: "/contact",
      stats: "₹4.8 Cr Pipeline · Strategic Partnerships"
    },
    {
      id: "slide-3",
      tag: "VENDOR ECOSYSTEM",
      title: "Vendor Network Solutions.",
      highlight: "Solutions.",
      subtitle: "Connecting clients and businesses with the right vendors, professionals and service providers through our network.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-31912-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Explore Vendor Network",
      ctaLink: "/services",
      ctaState: { activeId: "vendor-network" },
      secondaryCtaText: "Connect With Us",
      secondaryCtaLink: "/contact",
      stats: "85+ Vetted Suppliers · 6-Month Lead Guarantee"
    },
    {
      id: "slide-4",
      tag: "EVENT EXECUTION",
      title: "High-Stakes Event Operations.",
      highlight: "Event Operations.",
      subtitle: "Supporting the planning, coordination, vendor management and execution of events. Any kind of events like corporate, weddings, and company events.",
      videoUrl: mediaSettings?.heroSecondaryVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-network-lines-and-dots-42999-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80",
      ctaText: "View Event Operations",
      ctaLink: "/services",
      ctaState: { activeId: "event-operations" },
      secondaryCtaText: "Connect With Us",
      secondaryCtaLink: "/contact",
      stats: "2,500+ Attendees · Multi-Camera Broadcast"
    },
    {
      id: "slide-5",
      tag: "TECH & DIGITAL",
      title: "Technical Solutions & Digital Marketing.",
      highlight: "Digital Marketing.",
      subtitle: "Providing access to technical expertise, full-stack platforms, branding, graphic designing, digital marketing, and promotional strategies.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-keyboard-40073-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Explore Tech & Digital",
      ctaLink: "/services",
      ctaState: { activeId: "technical" },
      secondaryCtaText: "Connect With Us",
      secondaryCtaLink: "/contact",
      stats: "Modern Web & Apps · Multi-Channel Reach"
    }
  ];

  const currentSlide = slides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full min-h-[72vh] lg:min-h-[80vh] flex flex-col justify-start bg-[#0A0D14] text-white overflow-hidden select-none">

      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={currentSlide.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          poster={currentSlide.posterUrl}
          className="w-full h-full object-cover opacity-80 brightness-95 contrast-110 saturate-120 scale-100 transition-all duration-1000"
        >
          <source src={currentSlide.videoUrl} type="video/mp4" />
        </video>

        {/* Directional Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14]/90 via-[#0A0D14]/50 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/85 via-transparent to-[#0A0D14]/40 z-1" />
      </div>

      {/* 2. Main Content Viewport */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12 flex flex-col justify-between flex-1">

        {/* Top Recognition Badge */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-xl text-xs font-bold tracking-wider text-amber-400 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white uppercase">{company.name || "PMK NEXA SOLUTIONS PRIVATE LIMITED"}</span>
            <span className="text-white/40 font-normal">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">ENDLESS OPPORTUNITIES</span>
          </div>

          <Link
            to="/opportunities"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 backdrop-blur-xl text-xs font-bold text-white transition-all shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>We Are Hiring — Full-Time &amp; Internships →</span>
          </Link>
        </div>

        {/* Center Hero Copy */}
        <div className="max-w-4xl space-y-4 sm:space-y-5 my-2 sm:my-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 sm:space-y-5"
            >
              {/* Category Tag */}


              {/* Mega Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-display text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {currentSlide.title.replace(currentSlide.highlight, '')}
                <span className="text-amber-400 block sm:inline font-black">
                  {currentSlide.highlight}
                </span>
              </h1>

              {/* Subtitle description */}
              <p className="text-sm sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {currentSlide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to={currentSlide.ctaLink}
                  state={currentSlide.ctaState}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>{currentSlide.ctaText || "Explore Our Capabilities"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to={currentSlide.secondaryCtaLink || "/contact"}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all"
                >
                  <span>{currentSlide.secondaryCtaText || "Connect With Us"}</span>
                </Link>
              </div>

              {/* Slide Metric Pill */}
              <div className="inline-flex items-center gap-2 pt-1 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-bold text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified Network: </span>
                <strong className="text-white font-mono">{currentSlide.stats}</strong>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${activeSlide === idx
                    ? 'w-10 bg-amber-400'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
