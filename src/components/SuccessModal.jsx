import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Copy, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Submission Confirmed",
  message = "Your request has been received by our enterprise operations desk.",
  referenceId,
  dataSummary = {},
  autoCloseSeconds = 8
}) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(autoCloseSeconds);

  // Generate fallback ref ID if not provided
  const refCode = referenceId || `NX-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(autoCloseSeconds);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, autoCloseSeconds]);

  const copyRef = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/75 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-[#101c2f] border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xl z-10 text-neutral-900 dark:text-white"
          >
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#3167ff] via-[#20c9b5] to-[#ff715b]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Animated Icon & Heading */}
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-[#20c9b5]/15 border border-[#20c9b5]/30 flex items-center justify-center text-[#20c9b5] shadow-inner">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3167ff] text-white">
                    <Sparkles className="h-2.5 w-2.5" />
                  </span>
                </div>

                <div className="space-y-1 pr-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#20c9b5]">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Transmission
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              {/* Reference ID Ticket Box */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-100 dark:bg-[#08111f] border border-neutral-200 dark:border-neutral-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500">
                    Tracking Reference
                  </span>
                  <div className="font-mono text-sm font-black text-[#3167ff] dark:text-[#20c9b5] tracking-wider">
                    {refCode}
                  </div>
                </div>
                <button
                  onClick={copyRef}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Data Summary Grid if provided */}
              {Object.keys(dataSummary).length > 0 && (
                <div className="space-y-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 p-4 border border-neutral-200/60 dark:border-neutral-800/60 text-xs">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Submitted Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700 dark:text-neutral-300">
                    {Object.entries(dataSummary).map(([key, value]) => (
                      value ? (
                        <div key={key} className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 capitalize">{key}</span>
                          <span className="font-semibold truncate">{String(value)}</span>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps Note */}
              <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                <p>
                  • A senior representative has been assigned to your inquiry.
                </p>
                <p>
                  • Expected SLA response time: <strong>Within 2-4 business hours</strong>.
                </p>
              </div>

              {/* Bottom Action and Progress Bar */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#3167ff] hover:bg-[#2552d4] text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <span>Done &amp; Dismiss ({timeLeft}s)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Animated countdown bar */}
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: autoCloseSeconds, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#3167ff] to-[#20c9b5]"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
