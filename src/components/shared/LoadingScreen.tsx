"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MIN_MS = 1000; // show for at least 1s so the animation plays
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setLoading(false), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-[var(--background)]"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* HD badge */}
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--cyan)]/10 font-mono text-3xl font-bold text-[var(--cyan)] ring-2 ring-[var(--cyan)]/25">
                HD
              </div>
              {/* Subtle radial glow behind badge */}
              <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-[var(--cyan)]/10 blur-2xl" />
            </div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-mono text-sm tracking-[0.22em] text-muted-foreground uppercase"
            >
              Hasitha Dilshan
            </motion.p>
          </motion.div>

          {/* Bouncing dots progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-1.5 w-1.5 rounded-full bg-[var(--cyan)]/60"
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.75,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
