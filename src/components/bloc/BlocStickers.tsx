"use client";

import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { techCategories, technologies } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

const tilts = [-6, 4, -2, 7, -5, 3, -8, 5, -3, 6, -7, 2, -4, 8, -1, 5];

export function BlocStickers() {
  const wall = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(0);

  return (
    <section id="technologies" data-room="technologies" className="px-[var(--gutter)] py-[14vh]">
      <BlocTitle
        index={3}
        tag="Logiciels"
        color="bg-pop-lime"
        title={<>{technologies.length} outils, collés au mur.</>}
        aside={
          <button type="button" onClick={() => setRound((r) => r + 1)} className="bloc-box bloc-press flex items-center gap-2 bg-paper px-5 py-3 font-black uppercase" data-cursor="">
            <RotateCcw aria-hidden strokeWidth={2.5} className="size-4" />
            Tout ranger
          </button>
        }
      />

      <ul className="mb-6 flex flex-wrap gap-3">
        {techCategories.map((c, i) => (
          <li key={c} className="flex items-center gap-2 text-sm font-bold">
            <span className={`size-4 rounded-md border-2 border-ink ${pop(i)}`} />
            {c}
          </li>
        ))}
      </ul>

      <div ref={wall} className="bloc-box bloc-dots relative overflow-hidden bg-paper-2 p-4 md:p-8">
        <ul key={round} className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
          {technologies.map((t, i) => {
            const ci = techCategories.indexOf(t.category);
            return (
              <motion.li
                key={t.symbol}
                drag
                dragConstraints={wall}
                dragElastic={0.2}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: tilts[i % tilts.length] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: (i % 8) * 0.04 }}
                whileHover={{ scale: 1.06, rotate: 0 }}
                whileDrag={{ scale: 1.15, rotate: 0, zIndex: 20 }}
                className={`relative flex cursor-grab touch-none select-none flex-col items-center gap-3 rounded-2xl border-[3px] border-ink px-3 pb-4 pt-5 text-night shadow-[5px_5px_0_0_var(--ink)] active:cursor-grabbing ${pop(ci)}`}
                data-cursor="Glisser"
              >
                <span className="grid size-16 place-items-center rounded-xl border-[3px] border-ink bg-ink">
                  <TechLogo name={t.name} className="size-10" />
                </span>
                <span className="text-center text-sm font-black uppercase leading-tight">{t.name}</span>
                <span className="absolute -right-3 -top-3 grid size-11 place-items-center rounded-full border-[3px] border-ink bg-paper font-display text-xs text-ink">
                  {t.level}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <p className="mt-4 text-sm text-graphite">Attrapez un sticker et déplacez-le. Le chiffre indique le niveau de maîtrise sur 100.</p>
    </section>
  );
}
