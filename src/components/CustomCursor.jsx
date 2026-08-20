import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false); // Over buttons/links
  const [cursorText, setCursorText] = useState(''); // "VIEW", "EXPLORE", "OPEN"

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
      setIsInteractive(!!isClickable);

      const dataCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (dataCursor) {
        setCursorText(dataCursor.toUpperCase());
      } else {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neutral-800 dark:border-neutral-200 pointer-events-none z-[9999] flex items-center justify-center font-bold text-[8px] tracking-widest text-neutral-800 dark:text-neutral-200 overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: cursorText ? 2.2 : isInteractive ? 1.4 : 1,
          backgroundColor: cursorText ? 'rgba(29, 78, 216, 0.15)' : 'rgba(0,0,0,0)',
          borderColor: cursorText ? '#1d4ed8' : isInteractive ? '#f97316' : '',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        {cursorText}
      </motion.div>
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-600 dark:bg-cyan-400 rounded-full pointer-events-none z-[9999] ml-[12px] mt-[12px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorText || isInteractive ? 0.3 : 1,
          backgroundColor: cursorText ? '#f97316' : '',
        }}
      />
    </>
  );
}
