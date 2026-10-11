"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { spring } from "@/lib/tokens";
import { useMediaQuery } from "@/lib/useMediaQuery";

const pad = (n: number) => Math.max(0, Math.round(n)).toString().padStart(4, "0");

export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine)");
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.cursor);
  const sy = useSpring(y, spring.cursor);
  const coordX = useTransform(x, (v) => `X ${pad(v)}`);
  const coordY = useTransform(y, (v) => `Y ${pad(v)}`);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target ? target.dataset.cursor || "" : null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const active = label !== null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference text-white">
      {/* Lignes de construction */}
      <motion.div
        className="absolute left-0 top-0 h-px w-screen bg-white/25"
        style={{ y: sy }}
        animate={{ opacity: active ? 0 : 1 }}
      />
      <motion.div
        className="absolute left-0 top-0 h-screen w-px bg-white/25"
        style={{ x: sx }}
        animate={{ opacity: active ? 0 : 1 }}
      />

      <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white"
          animate={{
            width: active ? (label ? 96 : 56) : 14,
            height: active ? (label ? 96 : 56) : 14,
            backgroundColor: label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
            scale: pressed ? 0.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                className="label text-black"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="label absolute left-4 top-4 whitespace-nowrap leading-tight"
          animate={{ opacity: active ? 0 : 0.8 }}
        >
          <motion.div>{coordX}</motion.div>
          <motion.div>{coordY}</motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
