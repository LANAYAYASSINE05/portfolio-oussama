"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { certifications, education } from "@/lib/content";
import { Icon } from "../Icon";

export function FormationWindow() {
  const [openItem, setOpenItem] = useState<string | null>(education[0]?.title ?? null);

  return (
    <div className="space-y-6 p-5 font-mono text-[12.5px]">
      <div>
        <p className="label mb-2 font-sans text-dim">Arborescence</p>
        <div className="flex items-center gap-2 text-fg">
          <Icon name="folder" className="size-4 text-l-magenta" />
          ENA_Rabat/
        </div>
        <ul className="ml-2 mt-1 border-l border-edge pl-3">
          {education.map((item, i) => {
            const expanded = openItem === item.title;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpenItem(expanded ? null : item.title)}
                  className="flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-panel-2"
                >
                  <motion.span animate={{ rotate: expanded ? 90 : 0 }} className="text-dim">
                    <Icon name="chevron" className="size-3" />
                  </motion.span>
                  <span className="text-l-magenta">{item.level}</span>
                  <span className="truncate font-sans text-[13.5px] text-fg">{item.title}</span>
                  <span className="ml-auto shrink-0 text-dim">{item.year}</span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <dl className="mb-2 ml-7 grid grid-cols-[5.5rem_1fr] gap-y-1 rounded-md border border-edge bg-desk/60 p-3 font-sans text-[12.5px]">
                        <dt className="text-dim">École</dt>
                        <dd>{item.school}</dd>
                        <dt className="text-dim">Lieu</dt>
                        <dd>{item.location}</dd>
                        <dt className="text-dim">Détail</dt>
                        <dd className="leading-relaxed text-fg/85">{item.detail}</dd>
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="label mb-2 font-sans text-dim">Spécialités</p>
        <ul className="space-y-1">
          {certifications.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3 rounded border border-edge px-3 py-2 font-sans text-[13px]"
            >
              <span className="font-mono text-[11px] text-l-magenta">0{i + 1}</span>
              {c}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
