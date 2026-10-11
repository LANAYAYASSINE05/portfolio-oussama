"use client";

import { useRef, useState } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { techCategories, technologies, type TechCategory } from "@/lib/content";
import { BentoSection, Tile, TileLabel } from "./Tile";

export function ToolsGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<TechCategory | null>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-tool-bar]").forEach((bar) => {
        gsap.from(bar, {
          scaleX: 0,
          duration: 1.4,
          scrollTrigger: { trigger: bar, start: "top 92%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <BentoSection id="technologies" index="02 — Technologies" title={<>Outils<span className="text-terra">.</span></>}>
      <Tile tone="dark" className="col-span-2 flex flex-col justify-between gap-10 md:col-span-6 lg:col-span-4 lg:row-span-2">
        <TileLabel>Boîte à outils</TileLabel>
        <div>
          <p className="font-display text-[clamp(6rem,12vw,11rem)] leading-[0.8]">{technologies.length}</p>
          <p className="mt-3 max-w-xs text-on-night/70">
            logiciels qui accompagnent chaque phase, du premier trait au rendu photoréaliste.
          </p>
        </div>
        <ul className="space-y-1">
          {techCategories.map((c) => (
            <li key={c}>
              <button
                type="button"
                onPointerEnter={() => setFocus(c)}
                onPointerLeave={() => setFocus(null)}
                onFocus={() => setFocus(c)}
                onBlur={() => setFocus(null)}
                className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-colors duration-300 ${
                  focus === c ? "bg-terra text-[#111]" : "bg-on-night/5"
                }`}
                data-cursor=""
              >
                <span className="label">{c}</span>
                <span className="flex -space-x-1.5">
                  {technologies
                    .filter((t) => t.category === c)
                    .map((t) => (
                      <TechLogo key={t.symbol} name={t.name} className="size-6 ring-2 ring-night" />
                    ))}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Tile>

      <div ref={root} className="contents">
        {techCategories.map((c) => (
          <Tile
            key={c}
            className={`col-span-2 transition-opacity duration-500 md:col-span-3 lg:col-span-4 ${
              focus && focus !== c ? "opacity-35" : ""
            }`}
          >
            <TileLabel>{c}</TileLabel>
            <ul className="mt-5 space-y-3.5">
              {technologies
                .filter((t) => t.category === c)
                .map((t) => (
                  <li key={t.symbol} className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3">
                    <TechLogo name={t.name} className="size-9" />
                    <span>
                      <span className="block text-sm font-medium">{t.name}</span>
                      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-line">
                        <span
                          data-tool-bar
                          className="block h-full origin-left rounded-full bg-terra"
                          style={{ width: `${t.level}%` }}
                        />
                      </span>
                    </span>
                    <span className="label tabular-nums text-graphite">{t.level}%</span>
                  </li>
                ))}
            </ul>
          </Tile>
        ))}
      </div>
    </BentoSection>
  );
}
