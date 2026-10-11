"use client";

import { motion } from "motion/react";
import { useSite } from "@/components/providers/SiteProvider";
import { pop } from "./shared";

const rooms = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "Profil" },
  { id: "projets", label: "Projets" },
  { id: "technologies", label: "Logiciels" },
  { id: "competences", label: "Skills" },
  { id: "experience", label: "Parcours" },
  { id: "formation", label: "Diplôme" },
  { id: "contact", label: "Contact" },
];

/** Bottom dock of coloured keys; the current section's key pops up. */
export function BlocDock({ active }: { active: string }) {
  const { scrollTo } = useSite();

  return (
    <nav aria-label="Sections" className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 lg:block">
      <ul className="flex items-end gap-2 rounded-2xl border-[3px] border-ink bg-paper/90 p-2 shadow-[5px_5px_0_0_var(--ink)] backdrop-blur">
        {rooms.map((r, i) => {
          const on = r.id === active;
          return (
            <li key={r.id}>
              <motion.button
                type="button"
                onClick={() => scrollTo(`#${r.id}`)}
                aria-current={on ? "true" : undefined}
                animate={{ y: on ? -10 : 0 }}
                whileHover={{ y: on ? -12 : -5 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className={`rounded-lg border-[3px] border-ink px-3 py-2 text-xs font-black uppercase ${on ? `${pop(i)} text-night shadow-[3px_3px_0_0_var(--ink)]` : "bg-paper-2 text-ink"}`}
                data-cursor=""
              >
                {r.label}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
