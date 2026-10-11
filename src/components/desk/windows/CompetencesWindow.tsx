"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { qualities, skills } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function CompetencesWindow() {
  const zone = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-8 p-6">
      <div>
        <p className="label mb-4 text-dim">Cotes — savoir-faire</p>
        <ul className="space-y-5">
          {skills.map((s, i) => (
            <li key={s.name}>
              <div className="mb-1.5 flex items-baseline justify-between text-[13px]">
                <span>{s.name}</span>
                <span className="font-mono text-[11px] text-l-green">{s.level}</span>
              </div>
              <div className="relative h-3">
                <span className="absolute left-0 top-0 h-3 w-px bg-l-green" />
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left"
                  style={{ width: `${s.level}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.07, ease }}
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-l-green" />
                  <span className="absolute left-0 top-1/2 size-0 -translate-y-1/2 border-y-[3px] border-r-[6px] border-y-transparent border-r-l-green" />
                  <span className="absolute right-0 top-1/2 size-0 -translate-y-1/2 border-y-[3px] border-l-[6px] border-y-transparent border-l-l-green" />
                  <span className="absolute right-0 top-0 h-3 w-px bg-l-green" />
                </motion.div>
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-edge" style={{ left: `${s.level}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="label text-dim">Qualités</p>
          <p className="label text-dim">Glissez-les ↔</p>
        </div>
        <div
          ref={zone}
          className="relative flex min-h-36 flex-wrap content-start gap-2 rounded-md border border-dashed border-edge-2 p-3"
        >
          {qualities.map((q, i) => (
            <motion.button
              key={q}
              type="button"
              drag
              dragConstraints={zone}
              dragElastic={0.15}
              whileDrag={{ scale: 1.08, zIndex: 10 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 400, damping: 22 }}
              className="cursor-grab rounded-full border border-edge-2 bg-panel-2 px-3 py-1 text-[12.5px] active:cursor-grabbing"
            >
              {q}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
