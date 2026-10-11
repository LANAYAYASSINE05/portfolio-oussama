"use client";

import { useRef } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { techCategories, technologies } from "@/lib/content";
import { Blocks, SectionBar } from "./shared";

export function BetonTools() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-tool-row]").forEach((row) => {
        gsap.from(row.querySelectorAll('[data-block="on"]'), {
          autoAlpha: 0,
          duration: 0.01,
          stagger: 0.06,
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="technologies" ref={root} className="mt-[14vh]">
      <SectionBar index="03" label="Technologies" title="Outils" meta={`${technologies.length} logiciels`} />

      <div className="grid md:grid-cols-2">
        {techCategories.map((c, ci) => {
          const list = technologies.filter((t) => t.category === c);
          return (
            <div key={c} data-reveal className={`border-b-2 border-ink ${ci % 2 === 0 ? "md:border-r-2" : ""}`}>
              <p className="beton-mono flex justify-between border-b-2 border-ink bg-paper-2 px-[var(--gutter)] py-2.5">
                <span>
                  {String(ci + 1).padStart(2, "0")} — {c}
                </span>
                <span className="text-graphite">{list.length}</span>
              </p>
              <ul>
                {list.map((t) => (
                  <li
                    key={t.symbol}
                    data-tool-row
                    className="group grid grid-cols-[2.75rem_1fr_6rem_2.5rem] items-center gap-4 border-b border-ink/30 px-[var(--gutter)] py-3.5 last:border-b-0 sm:grid-cols-[2.75rem_1fr_9rem_2.5rem]"
                  >
                    <TechLogo
                      name={t.name}
                      className="size-10 rounded-none grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                    />
                    <span className="font-semibold uppercase tracking-tight">{t.name}</span>
                    <Blocks value={t.level} />
                    <span className="beton-mono text-right tabular-nums">{t.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
