import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Network, Calendar, Cpu, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeBackground from '../components/ThreeBackground';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import { servicesData, blogsData } from '../data/companyData';

// Map icon string to component
const iconMap = {
  Briefcase: Briefcase,
  Network: Network,
  Calendar: Calendar,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
};

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null);

  // High quality images for services
  const serviceImages = {
    "business-development": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
    "vendor-network": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    "event-operations": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    "technical": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    "digital-marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  };

  const projectsData = [
    { name: "Global Tech Summit 2025", category: "Event Operations" },
    { name: "NexProcure Cloud Platform", category: "Technical Services" },
    { name: "Retail Reach Strategy", category: "Digital Marketing" },
    { name: "PartnerGrid Hub", category: "Business Development" },
    { name: "NexaFlow CRM System", category: "Technical Services" },
    { name: "Agile Logistics Sourcing", category: "Vendor Network" }
  ];

  return (
    <PageTransition>
      {/* 1. Redesigned Premium Split Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-[#faf9f6] dark:bg-[#0a0f1d] overflow-hidden border-b border-neutral-200/50 dark:border-neutral-900/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase">
              PMK NEXA SOLUTIONS
            </span>
            
            <h1 className="text-5xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-7xl leading-none">
              Business.<br />
              People.<br />
              <span className="text-[#1d4ed8] dark:text-[#f97316]">Possibilities.</span>
            </h1>

            <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Connecting business development, vendor networks, events, technology, and digital growth through one robust ecosystem. We coordinate execution so your team can focus on scale.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/services"
                className="flex items-center gap-2 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/careers"
                className="flex items-center gap-2 rounded-sm border border-neutral-300 dark:border-neutral-850 bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
              >
                Join Our Team
              </Link>
            </div>
          </div>

          {/* Right Side: Premium Offset Layered Photograph */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
            {/* Background offset decorative frame */}
            <div className="absolute top-4 left-4 right-0 bottom-0 border border-neutral-300 dark:border-neutral-800 rounded-sm pointer-events-none z-0" />
            
            {/* Main Image Container */}
            <div className="relative w-11/12 h-[320px] lg:h-[400px] overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-900 bg-neutral-100 z-10">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
                alt="PMK Nexa Solutions Collaboration"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Float Overlay Indicator */}
            <div className="absolute -bottom-2 -left-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-4 rounded-sm shadow-md z-20">
              <span className="text-[8px] font-bold uppercase tracking-widest block opacity-70">PMK NEXA</span>
              <span className="text-xs font-bold font-display">CONNECTED GROWING GRID</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Hero Bottom Strip: Infinite Scrolling Projects Marquee */}
      <section className="bg-neutral-900 dark:bg-neutral-950 py-6 text-white border-y border-neutral-800 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent dark:from-neutral-950 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent dark:from-neutral-950 z-10 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-12 select-none">
          {/* Double list loop to scroll seamlessly */}
          {[...projectsData, ...projectsData].map((proj, index) => (
            <div key={index} className="flex items-center gap-4 shrink-0 px-4">
              <span className="text-[9px] font-black tracking-widest text-[#f97316] bg-neutral-800 px-2 py-0.5 rounded-sm uppercase">
                {proj.category}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-colors cursor-default">
                {proj.name}
              </span>
              <span className="text-neutral-600 dark:text-neutral-800 font-mono">//</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Introduction Section (Two-Column Editorial) */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase block">
              WHO WE ARE
            </span>
            <h2 className="text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              Driving operational connection and network execution.
            </h2>
            
            {/* Custom offset image crop */}
            <div className="mt-8 relative pt-[60%] w-full overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-900">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="PMK Nexa Team"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed pt-6 lg:pt-14">
            <p className="font-medium text-neutral-900 dark:text-white text-xl">
              PMK Nexa Solutions Pvt. Ltd. operates at the intersection of business architecture, vendor networks, logistics, and digital builds.
            </p>
            <p>
              We solve the administrative and logistical overhead of modern expansion. Rather than restricting projects to internal capacity, we coordinate a verified network of strategic vendors, technical pipelines, and creative assets to build seamless growth.
            </p>
            <p>
              From custom software deployments to corporate event management and digital brand design, we bridge the gap between quality providers and demanding operations.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Services Section (Signature List-Hover Interaction) */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-24 transition-colors duration-300 border-y border-neutral-200/50 dark:border-neutral-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            label="SERVICES" 
            title="What We Do" 
            subtitle="Explore our interactive corporate capabilities." 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-center">
            
            {/* Left Side: Large Interactive List */}
            <div className="lg:col-span-7 space-y-4">
              {servicesData.map((svc, idx) => (
                <div
                  key={svc.id}
                  onMouseEnter={() => setHoveredService(svc.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="border-b border-neutral-200 dark:border-neutral-800 py-6 transition-all duration-300 group"
                  data-cursor="view"
                >
                  <Link to={`/services#${svc.id}`} className="flex justify-between items-center w-full text-left">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-neutral-400 dark:text-neutral-600 block">
                        0{idx + 1}
                      </span>
                      <h3 className="text-2xl font-black text-neutral-800 dark:text-neutral-200 group-hover:text-[#1d4ed8] dark:group-hover:text-[#f97316] transition-colors duration-200">
                        {svc.title}
                      </h3>
                      {hoveredService === svc.id && (
                        <motion.p 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md pt-2"
                        >
                          {svc.shortDescription}
                        </motion.p>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:translate-x-2 group-hover:text-neutral-900 dark:group-hover:text-white transition-all" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Side: Interactive Image Preview Pane */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative pt-[110%] w-full rounded-sm overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-lg">
                {servicesData.map((svc) => (
                  <motion.img
                    key={svc.id}
                    src={serviceImages[svc.id] || "https://images.unsplash.com/photo-1542744094-3a31f103e35f"}
                    alt={svc.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredService === svc.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
                {!hoveredService && (
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                    alt="PMK Nexa Corporate Building"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Why PMK Nexa (Principles Grid) */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        <SectionHeading 
          label="THE ADVANTAGE" 
          title="Designed for execution." 
          subtitle="Why clients choose the Nexa network framework." 
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          
          <div className="p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white dark:bg-neutral-950/40">
            <span className="text-[10px] font-bold text-[#1d4ed8] dark:text-[#f97316] uppercase tracking-widest block mb-4">// CONNECTED</span>
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">Integrated Ecosystem</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Every node of marketing, event logistics, and technical infrastructure is integrated under one coordination grid.
            </p>
          </div>

          <div className="p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white dark:bg-neutral-950/40">
            <span className="text-[10px] font-bold text-[#1d4ed8] dark:text-[#f97316] uppercase tracking-widest block mb-4">// PRACTICAL</span>
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">Outcome Oriented</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We skip vague strategy slideshows and focus directly on physical setups, running deployments, and verified SLAs.
            </p>
          </div>

          <div className="p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white dark:bg-neutral-950/40">
            <span className="text-[10px] font-bold text-[#1d4ed8] dark:text-[#f97316] uppercase tracking-widest block mb-4">// FLEXIBLE</span>
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">Dynamic Capacity</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Scale operations up or down instantly. Our vendor channels respond fluidly to changing business needs.
            </p>
          </div>

          <div className="p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white dark:bg-neutral-950/40">
            <span className="text-[10px] font-bold text-[#1d4ed8] dark:text-[#f97316] uppercase tracking-widest block mb-4">// HUMAN</span>
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">Trust Architecture</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Despite the deep technical systems we deploy, client support and direct communication remain our central pillar.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Visual Break Section (Full-Width Banner) */}
      <section className="relative h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-950/50 dark:bg-neutral-950/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=80" 
          alt="Visual break background"
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale"
        />
        <div className="z-20 text-center space-y-4 px-4 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none font-display">
            ONE NETWORK.<br />MANY POSSIBILITIES.
          </h2>
          <p className="text-xs sm:text-sm tracking-widest text-[#f97316] font-bold uppercase">
            // PMK NEXA SOLUTIONS PVT. LTD.
          </p>
        </div>
      </section>

      {/* 7. Careers Teaser Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase block">
              TALENT NETWORK
            </span>
            <h2 className="text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              Your next opportunity could start here.
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We look for creators, engineers, event coordinators, and builders. Join our distributed ecosystem of operational stars.
            </p>
            <div className="pt-2">
              <Link 
                to="/careers" 
                className="inline-flex items-center gap-2 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white transition-all"
              >
                Explore Careers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {/* Simple jobs list preview */}
            <div className="border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/40 p-6 rounded-sm flex justify-between items-center" data-cursor="open">
              <div>
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">TECHNICAL DOMAIN</span>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">Technical Lead / Developer</h4>
              </div>
              <Link to="/careers" className="text-xs font-bold text-[#1d4ed8] dark:text-[#f97316] hover:underline">
                View →
              </Link>
            </div>
            
            <div className="border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/40 p-6 rounded-sm flex justify-between items-center" data-cursor="open">
              <div>
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">CREATIVE DOMAIN</span>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">Senior Graphic Designer</h4>
              </div>
              <Link to="/careers" className="text-xs font-bold text-[#1d4ed8] dark:text-[#f97316] hover:underline">
                View →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Featured Blogs Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-24 border-t border-neutral-200/50 dark:border-neutral-900/60 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading 
              label="INSIGHTS" 
              title="The Nexa Blog" 
              subtitle="Business insights, creative trends, and event ops advice." 
            />
            <Link to="/blogs" className="text-xs font-bold text-[#1d4ed8] dark:text-[#f97316] hover:underline uppercase tracking-wider whitespace-nowrap mb-6 lg:mb-0">
              View All Entries →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.slice(0, 3).map((post) => (
              <article 
                key={post.id}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded-sm flex flex-col justify-between"
                data-cursor="explore"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#1d4ed8] dark:text-[#f97316] uppercase tracking-widest block mb-3">
                    {post.category}
                  </span>
                  <Link to={`/blogs/${post.id}`}>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors leading-tight mb-2">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-neutral-400">
                    {post.date} · {post.readTime}
                  </span>
                  <Link to={`/blogs/${post.id}`} className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 hover:text-[#1d4ed8]">
                    Read <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Elegant Let's Talk CTA */}
      <section className="bg-neutral-900 dark:bg-neutral-950 py-24 text-white text-center border-t border-neutral-800">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <span className="text-[10px] font-bold tracking-widest text-[#f97316] uppercase block">START A CONVERSATION</span>
          <h2 className="text-5xl font-black font-display uppercase tracking-tight leading-none">
            LET'S TALK.
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Have an event, business partnership, development project, or creative marketing campaign in mind? Contact our team today.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-white text-neutral-900 px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#f97316] hover:text-white transition-colors duration-300"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
