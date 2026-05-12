"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [ready, setReady] = useState(false);       // only render on fine-pointer devices
  const [visible, setVisible] = useState(false);   // hide until first mouse move
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false); // hovering over interactive element

  // Raw mouse position
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot: tight spring — feels almost instant
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 36, mass: 0.4 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 36, mass: 0.4 });

  // Glow ring: loose spring — trails behind
  const glowX = useSpring(mouseX, { stiffness: 160, damping: 22, mass: 0.6 });
  const glowY = useSpring(mouseY, { stiffness: 160, damping: 22, mass: 0.6 });

  // Deduplicate hover state updates to avoid unnecessary re-renders
  const hoverRef = useRef(false);

  useEffect(() => {
    // Only show custom cursor on mouse (fine pointer) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setReady(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Event delegation — detect interactive element hover cheaply
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      const isInteractive = !!el.closest("a, button, [role='button'], label, input, textarea, select");
      if (isInteractive !== hoverRef.current) {
        hoverRef.current = isInteractive;
        setHovering(isInteractive);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <>
      {/* ── Trailing glow ring ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-[var(--cyan)]/30 bg-[var(--cyan)]/[0.04]"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : clicking ? 28 : 40,
          height: hovering ? 56 : clicking ? 28 : 40,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* ── Core dot ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-[var(--cyan)]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: clicking ? 5 : 8,
          height: clicking ? 5 : 8,
          opacity: visible ? 1 : 0,
          boxShadow: hovering
            ? "0 0 12px 2px rgba(0,217,255,0.5)"
            : "0 0 6px 1px rgba(0,217,255,0.3)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}
