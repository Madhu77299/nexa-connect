import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="space-y-3 mb-12">
      {label && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
