import React from 'react';
import { motion } from 'framer-motion';

export default function NetworkAnimation() {
  // Slowed down animation times via delays
  const nodes = [
    { id: 1, label: 'RESOURCES', cx: 120, cy: 520, r: 8, delay: 1.0 },
    { id: 2, label: 'VENDORS', cx: 220, cy: 440, r: 8, delay: 1.8 },
    { id: 3, label: 'PROFESSIONALS', cx: 350, cy: 370, r: 10, delay: 2.6 },
    { id: 4, label: 'BUSINESSES', cx: 500, cy: 350, r: 14, delay: 3.4 },
    { id: 5, label: 'OPPORTUNITIES', cx: 650, cy: 280, r: 10, delay: 4.2 },
  ];

  const secondaryNodes = [
    { cx: 300, cy: 460 },
    { cx: 420, cy: 420 },
    { cx: 580, cy: 360 },
    { cx: 720, cy: 300 },
    { cx: 900, cy: 260 },
  ];

  const mainPath = "M -50 650 Q 100 550 120 520 T 220 440 T 350 370 T 500 350 T 650 280 T 850 150 L 1100 -50";
  const thinPath = "M -50 500 Q 150 480 300 460 T 420 420 T 580 360 T 720 300 T 900 260 L 1100 100";

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] overflow-hidden flex items-center justify-center">
      <svg
        className="w-full h-full max-w-5xl"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Thin Secondary Path */}
        <motion.path
          d={thinPath}
          stroke="currentColor"
          className="text-neutral-900/40 dark:text-white/50"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />

        {/* Main Green Growth Path */}
        <motion.path
          d={mainPath}
          stroke="currentColor"
          className="text-blue-600 dark:text-[#84f55a]"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 5, ease: "easeOut" }}
        />

        {/* Secondary tiny nodes */}
        {secondaryNodes.map((node, i) => (
          <motion.circle
            key={`sec-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="currentColor"
            className="text-neutral-400 dark:text-white"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 + (i * 0.5), duration: 1 }}
          />
        ))}

        {/* Main Nodes & Labels */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            {/* Connecting vertical line to label */}
            <motion.line
              x1={node.cx}
              y1={node.cy}
              x2={node.cx}
              y2={node.cy - 40}
              stroke="currentColor"
              className="text-neutral-900/40 dark:text-white/50"
              strokeWidth="1"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 0.6, duration: 1 }}
            />
            
            {/* The glowing node */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r + 6}
              fill="currentColor"
              className="text-blue-600/40 dark:text-[#84f55a]/40"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay, duration: 0.8 }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="currentColor"
              className="text-blue-600 dark:text-[#84f55a]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 0.2, duration: 0.8, type: "spring" }}
            />
            
            {/* Node Label */}
            <motion.text
              x={node.cx}
              y={node.cy - 50}
              fill="currentColor"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="0.1em"
              textAnchor="middle"
              className="uppercase font-sans fill-neutral-900 dark:fill-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 1, duration: 1 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}

        {/* Target Growth Node (Huge) */}
        <g>
          <motion.line
            x1={850}
            y1={150}
            x2={850}
            y2={80}
            stroke="currentColor"
            className="text-neutral-900/40 dark:text-white/60"
            strokeWidth="1.5"
            initial={{ opacity: 0, pathLength: 0 }}
            whileInView={{ opacity: 1, pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 5.5, duration: 1 }}
          />
          <motion.circle
            cx="850"
            cy="150"
            r="60"
            stroke="currentColor"
            className="text-blue-600 dark:text-[#84f55a]"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 4.5, duration: 1.5 }}
          />
          <motion.circle
            cx="850"
            cy="150"
            r="50"
            stroke="currentColor"
            className="text-blue-600 dark:text-[#84f55a]"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 4.8, duration: 1.5 }}
          />
          <motion.circle
            cx="850"
            cy="150"
            r="40"
            fill="currentColor"
            className="text-blue-600 dark:text-[#84f55a]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 5.0, duration: 1.5, type: "spring" }}
          />
          <motion.text
            x="850"
            y="65"
            fill="currentColor"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="0.1em"
            textAnchor="middle"
            className="uppercase font-sans fill-neutral-900 dark:fill-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 6.0, duration: 1 }}
          >
            GROWTH
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
