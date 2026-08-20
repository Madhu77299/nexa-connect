import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Network, Calendar, Cpu, TrendingUp, Sparkles, Code, UserCheck, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeBackground from '../components/ThreeBackground';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import { blogsData } from '../data/companyData';

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const projectsData = [
    { name: "Global Tech Summit 2025", category: "Event Operations" },
    { name: "NexProcure Cloud Platform", category: "Technical Services" },
    { name: "Retail Reach Strategy", category: "Digital Marketing" },
    { name: "PartnerGrid Hub", category: "Business Development" },
    { name: "NexaFlow CRM System", category: "Technical Services" },
    { name: "Agile Logistics Sourcing", category: "Vendor Network" }
  ];

  const servicesList = [
    { id: "bd", num: "01", title: "Business Development", desc: "Forging strategic partnerships and high-value alliances for long-term growth.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80" },
    { id: "vendor", num: "02", title: "Vendor Network Support", desc: "Connecting procurement hubs with verified on-ground operational suppliers.", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80" },
    { id: "event", num: "03", title: "Event Operations", desc: "End-to-end logistics coordination and sound production setup under live pressure.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
    { id: "tech", num: "04", title: "Technical Services", desc: "Deploying high-performance cloud apps and workflow automation frameworks.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
    { id: "marketing", num: "05", title: "Digital Marketing", desc: "Constructing targeted marketing campaigns with high-impact brand identities.", image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80" },
  ];

  const statementWords = [
    { label: "PEOPLE", desc: "Vetted talent pipelines mapped dynamically to meet your project standards.", icon: UserCheck },
    { label: "BUSINESS", desc: "Strategic development routes designed to yield high-volume lead acquisitions.", icon: BarChart },
    { label: "TECHNOLOGY", desc: "Responsive cloud application architectures constructed to scale smoothly.", icon: Code },
    { label: "OPPORTUNITY", desc: "Connected networks matching growing resources with operational gaps.", icon: Sparkles }
  ];

  return (
    <PageTransition>
      {/* 1. Redesigned Premium Split Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-[#f5f7fb] dark:bg-[#08111f] overflow-hidden border-b border-neutral-200/50 dark:border-neutral-900/60 transition-colors duration-300">
        
        {/* Subtle background glow elements */}
        <div className="absolute top-1/4 left-1/3 -z-10 h-96 w-96 rounded-full bg-[#3167ff]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#20c9b5]/5 blur-3xl pointer-events-none" />

        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Headline & Copy (45%) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3167ff]/20 bg-[#3167ff]/5 px-3 py-1 text-xs font-bold text-[#3167ff] dark:text-[#20c9b5]">
              <span className="flex h-2 w-2 rounded-full bg-[#3167ff] dark:bg-[#20c9b5] animate-pulse" />
              PMK NEXA SOLUTIONS
            </div>
            
            <h1 className="text-5xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-6xl leading-none">
              Connecting<br />
              Business.<br />
              Creating<br />
              <span className="text-[#3167ff] dark:text-[#20c9b5]">Growth.</span>
            </h1>

            <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              Business development, vendor networks, events, technology and digital growth — connected through one growing ecosystem.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/services"
                className="flex items-center gap-2 rounded-full bg-[#3167ff] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#ff715b] hover:shadow-lg transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/careers"
                className="flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/60 transition-all duration-300"
              >
                Join Our Team
              </Link>
            </div>
          </div>

          {/* Right Side: High-Quality Corporate Team Image (55%) */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
            {/* Background offset decorative frame */}
            <div className="absolute top-4 left-4 right-0 bottom-0 border border-[#3167ff]/20 dark:border-neutral-800 rounded-2xl pointer-events-none z-0" />
            
            {/* Main Image Container */}
            <div className="relative w-11/12 h-[340px] lg:h-[420px] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#101c2f] shadow-lg z-10" data-cursor="explore">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                alt="PMK Nexa Solutions Collaboration"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Hero Bottom Strip: Infinite Projects Marquee */}
      <section className="bg-neutral-900 dark:bg-neutral-950 py-5 text-white border-y border-neutral-800 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent dark:from-neutral-950 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent dark:from-neutral-950 z-10 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-12 select-none">
          {[...projectsData, ...projectsData].map((proj, index) => (
            <div key={index} className="flex items-center gap-4 shrink-0 px-4">
              <span className="text-[8px] font-black tracking-widest text-[#20c9b5] bg-neutral-850 px-2 py-0.5 rounded-sm uppercase">
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

      {/* 3. Introduction Section (Two-Column Startup Style) */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase block">
              01 / ABOUT PMK NEXA
            </span>
            <h2 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-5xl leading-tight font-display">
              One ecosystem.<br />Multiple possibilities.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed pt-2">
            <p className="font-semibold text-neutral-800 dark:text-white text-xl">
              We streamline operations across business, creative, and technical channels.
            </p>
            <p className="text-base">
              PMK Nexa Solutions Pvt. Ltd. acts as the central orchestrator for corporate growth. By integrating strategic business consulting, high-capacity vendor networks, physical event operations, custom software engineering, and search campaigns under one umbrella, we eliminate operational overhead for growing enterprises.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Sequential Scroll Milestones Statement Section */}
      <section className="bg-neutral-900 dark:bg-neutral-950 py-24 text-white border-y border-neutral-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {statementWords.map((word, index) => {
              const WordIcon = word.icon;
              return (
                <div 
                  key={word.label}
                  className="p-6 border border-neutral-800 rounded-xl bg-[#101c2f]/40 hover:border-[#3167ff]/40 transition-all duration-300 space-y-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#3167ff]/10 text-[#3167ff] flex items-center justify-center">
                    <WordIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black tracking-widest text-[#20c9b5] font-display">
                    {word.label}
                  </h3>
                  <p className="text-xs text-neutral-450 leading-relaxed">
                    {word.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Services Section (Left-Right List Interaction) */}
      <section className="bg-[#f5f7fb] dark:bg-[#08111f] py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column Label & Heading */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase block">// SERVICES</span>
              <h2 className="text-4xl font-black text-neutral-900 dark:text-white leading-tight font-display">
                What we<br />bring together.
              </h2>
              <p className="text-sm text-neutral-500 max-w-xs">
                Hover over the capabilities list to preview segment operations and details.
              </p>
            </div>

            {/* Right Column Interactive List */}
            <div className="lg:col-span-8 space-y-4">
              {servicesList.map((svc) => (
                <div
                  key={svc.id}
                  onMouseEnter={() => setHoveredService(svc.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative p-6 bg-white dark:bg-[#101c2f] border border-neutral-200/60 dark:border-neutral-800 rounded-2xl transition-all duration-350"
                  data-cursor="view"
                >
                  <Link to="/services" className="flex justify-between items-center">
                    <div className="space-y-2">
                      <span className="text-xs font-black text-[#3167ff] dark:text-[#20c9b5] block">
                        {svc.num}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-white group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-450 leading-relaxed max-w-xl">
                        {svc.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-450 group-hover:translate-x-2 group-hover:text-[#3167ff] transition-all" />
                  </Link>

                  {/* Absolute image overlay when hovered */}
                  <AnimatePresence>
                    {hoveredService === svc.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-cover bg-center rounded-2xl pointer-events-none z-0"
                        style={{ backgroundImage: `url(${svc.image})` }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 6. Why PMK Nexa (Premium Dark Section) */}
      <section className="bg-[#08111f] text-white py-24 border-t border-neutral-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-xl space-y-4">
            <span className="text-[10px] font-bold text-[#20c9b5] tracking-widest uppercase block">// THE ADVANTAGE</span>
            <h2 className="text-4xl font-black leading-none font-display">
              Built around how business moves.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Card 1: Essential / Connected style */}
            <div className="p-8 border border-neutral-800 rounded-2xl bg-[#0e131d] relative overflow-hidden group shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#3167ff] group-hover:w-full transition-all duration-500" />
              <span className="text-xs font-black text-[#3167ff] tracking-wider block mb-4">01 / CONNECTED</span>
              <h3 className="text-xl font-black text-white mb-3 font-display">Ecosystem Hub</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Single coordination layer syncing business strategy, event execution, code builds, and marketing channels.
              </p>
            </div>

            {/* Card 2: Elite / Practical style (Deep Navy Blue) */}
            <div className="p-8 border border-[#3167ff]/40 rounded-2xl bg-[#0a274c] relative overflow-hidden group shadow-xl hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#3167ff]/70 transition-all duration-300">
              <div className="absolute top-0 left-0 h-[3px] w-full bg-[#20c9b5] transition-all duration-500" />
              <span className="text-xs font-black text-[#20c9b5] tracking-wider block mb-4">02 / PRACTICAL</span>
              <h3 className="text-xl font-black text-white mb-3 font-display">Result Focus</h3>
              <p className="text-xs text-neutral-200 leading-relaxed">
                Direct deployment metrics, verified supplier networks, and straightforward contract milestones.
              </p>
            </div>

            {/* Card 3: Ultimate / Flexible style (Crimson Maroon - highlighted in red) */}
            <div className="p-8 border border-[#ff715b]/40 rounded-2xl bg-[#4c0d0d] relative overflow-hidden group shadow-xl hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#ff715b]/70 transition-all duration-300">
              <div className="absolute top-0 left-0 h-[3px] w-full bg-[#ff715b] transition-all duration-500" />
              <span className="text-xs font-black text-[#ff715b] tracking-wider block mb-4">03 / FLEXIBLE</span>
              <h3 className="text-xl font-black text-white mb-3 font-display">Scale On-Demand</h3>
              <p className="text-xs text-neutral-200 leading-relaxed">
                Adjust resource commitments fluidly. Our supply chains respond in real-time to your operations load.
              </p>
            </div>

            {/* Card 4: Human / Direct Access style */}
            <div className="p-8 border border-neutral-800 rounded-2xl bg-[#0e131d] relative overflow-hidden group shadow-xl hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#3167ff]/40 transition-all duration-300">
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#3167ff] group-hover:w-full transition-all duration-500" />
              <span className="text-xs font-black text-[#3167ff] tracking-wider block mb-4">04 / HUMAN</span>
              <h3 className="text-xl font-black text-white mb-3 font-display">Direct Access</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Real partners. We prioritize reliable support, client consultations, and dedicated SPOC setups.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Unique Ecosystem Connections Infographic Section */}


      {/* 8. Careers Section */}
      <section className="bg-[#101c2f] py-24 text-white transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold tracking-widest text-[#20c9b5] uppercase block">
              02 / CAREERS
            </span>
            <h2 className="text-4xl font-black text-white sm:text-5xl leading-tight font-display">
              Build what's<br />next with us.
            </h2>
            <p className="text-sm text-neutral-450 leading-relaxed">
              We're looking for stars across creative, business, operational, and technical domains. Join the Nexa Network.
            </p>
            <div className="pt-2">
              <Link 
                to="/careers" 
                className="inline-flex items-center gap-2 rounded-full bg-[#3167ff] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#ff715b] transition-all"
              >
                Explore Opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 h-[300px] lg:h-[400px] overflow-hidden rounded-2xl border border-neutral-800 relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Creative team collaboration" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

        </div>
      </section>

      {/* 9. Blogs Insights Section */}
      <section className="bg-white dark:bg-[#101c2f] py-24 border-t border-neutral-200/50 dark:border-neutral-900/60 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading 
              label="INSIGHTS" 
              title="From the Nexa Journal." 
              subtitle="Business insights, technical systems, and logistics." 
            />
            <Link to="/blogs" className="text-xs font-bold text-[#3167ff] dark:text-[#20c9b5] hover:underline uppercase tracking-wider whitespace-nowrap mb-6 lg:mb-0">
              View All Entries →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogsData.slice(0, 3).map((post) => (
              <article 
                key={post.id}
                className="bg-[#f5f7fb] dark:bg-[#08111f] border border-neutral-200/60 dark:border-neutral-800/80 p-6 rounded-2xl flex flex-col justify-between"
                data-cursor="explore"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-[#3167ff] dark:text-[#20c9b5] uppercase tracking-widest block">
                    {post.category}
                  </span>
                  <Link to={`/blogs/${post.id}`}>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white hover:text-[#3167ff] dark:hover:text-[#20c9b5] transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-200/40 dark:border-neutral-800 mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-neutral-450">
                    {post.date} · {post.readTime}
                  </span>
                  <Link to={`/blogs/${post.id}`} className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 hover:text-[#3167ff] dark:hover:text-[#20c9b5]">
                    Read <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Let's Build Contact CTA */}
      <section className="bg-neutral-900 dark:bg-neutral-950 py-24 text-white text-center border-t border-neutral-800">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <span className="text-[10px] font-bold tracking-widest text-[#20c9b5] uppercase block">GET STARTED</span>
          <h2 className="text-5xl font-black font-display uppercase tracking-tight leading-none">
            Let's build<br />something meaningful.
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Have an idea, business partnership, development project, or creative marketing campaign? Contact our team.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#3167ff] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#ff715b] transition-colors duration-300"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
