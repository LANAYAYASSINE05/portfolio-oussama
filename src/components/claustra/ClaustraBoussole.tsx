"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { Khatam } from "./shared";

export const rooms = [
  { id: "accueil", label: "Nuit" },
  { id: "a-propos", label: "Majlis" },
  { id: "projets", label: "Galerie" },
  { id: "technologies", label: "Atelier" },
  { id: "competences", label: "Astrolabe" },
  { id: "experience", label: "Caravane" },
  { id: "formation", label: "Parchemin" },
  { id: "contact", label: "Fanous" },
];

/** Fixed right-edge route: a brass thread fills with page progress, each room is a stop on it. */
export function ClaustraBoussole({ active }: { active: string }) {
  const { scrollTo } = useSite();
  const activeIndex = Math.max(0, rooms.findIndex((r) => r.id === active));

  return (
    <nav aria-label="Pièces de la médina" className="fixed right-[var(--gutter)] top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="relative">
        <span aria-hidden className="absolute bottom-3 right-[11px] top-3 w-px bg-line" />
        <span aria-hidden data-boussole-fill className="absolute right-[11px] top-3 h-[calc(100%-1.5rem)] w-px origin-top scale-y-0 bg-terra" />
        <ul className="relative flex flex-col gap-5">
          {rooms.map((r, i) => {
            const on = r.id === active;
            const passed = i <= activeIndex;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(`#${r.id}`)}
                  aria-current={on ? "true" : undefined}
                  className="group flex items-center justify-end gap-3"
                  data-cursor=""
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-500 ${on ? "translate-x-0 text-terra opacity-100" : "translate-x-2 text-graphite opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                  >
                    {r.label}
                  </span>
                  <span className="grid size-6 place-items-center">
                    <Khatam
                      className={`transition-all duration-500 ${on ? "size-6 rotate-45 text-terra" : passed ? "size-3 text-terra" : "size-3 text-graphite/60"}`}
                      filled={on || passed}
                      stroke={8}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
