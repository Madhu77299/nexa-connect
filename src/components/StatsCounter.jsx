import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, ShieldCheck, Users, MapPin, Zap } from 'lucide-react';

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    {
      value: 150,
      suffix: "+",
      label: "Commercial Projects",
      detail: "Delivered across business, event ops & digital services",
      icon: TrendingUp,
      accent: "#3167ff"
    },
    {
      value: 99.4,
      suffix: "%",
      isDecimal: true,
      label: "SLA Adherence Rate",
      detail: "Reliable execution benchmarks and operational governance",
      icon: ShieldCheck,
      accent: "#20c9b5"
    },
    {
      value: 50,
      suffix: "+",
      label: "Ecosystem Partners",
      detail: "Verified vendor & technology provider network",
      icon: Users,
      accent: "#ff715b"
    },
    {
      value: 12,
      suffix: "+",
      label: "Metro Operating Hubs",
      detail: "Pan-India presence with synchronized local teams",
      icon: MapPin,
      accent: "#3167ff"
    }
  ];

  return (
    <section ref={ref} className="w-full py-16 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3167ff]/10 dark:bg-[#20c9b5]/10 text-xs font-bold text-[#3167ff] dark:text-[#20c9b5] uppercase tracking-widest">
            <Zap className="h-3.5 w-3.5" />
            ENTERPRISE SCALE & METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white font-display tracking-tight">
            Measurable impact. Proven delivery.
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
            Our numbers reflect our commitment to SLA compliance, enterprise execution, and scalable partnership value.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#101c2f] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Glow pill */}
                <div 
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: stat.accent }}
                />

                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${stat.accent}15`, color: stat.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
                    KPI #{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white font-display flex items-baseline">
                    <Counter 
                      target={stat.value} 
                      isInView={isInView} 
                      isDecimal={stat.isDecimal} 
                    />
                    <span style={{ color: stat.accent }}>{stat.suffix}</span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                    {stat.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function Counter({ target, isInView, isDecimal = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, isDecimal]);

  return <span>{isDecimal ? count.toFixed(1) : count}</span>;
}
