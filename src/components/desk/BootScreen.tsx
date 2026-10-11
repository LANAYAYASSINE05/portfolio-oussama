"use client";

import { useEffect, useRef } from "react";
import { identity } from "@/lib/content";
import { WINDOW_IDS, windows } from "@/lib/desk";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useDesk } from "./DeskProvider";

const steps = [
  "Initialisation du moteur graphique",
  "Ouverture de oussama-ziyati.dwg",
  `Chargement des calques (${WINDOW_IDS.length})`,
  "Régénération du modèle",
];

export function BootScreen() {
  const { booted, finishBoot } = useDesk();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (booted) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        finishBoot();
        return;
      }
      const name = SplitText.create("[data-boot-name]", { type: "chars", mask: "chars" });
      const counter = { v: 0 };
      const percent = root.current?.querySelector("[data-boot-percent]");

      tl.current = gsap
        .timeline({ defaults: { ease: "expo.out" }, onComplete: finishBoot })
        .from(name.chars, { yPercent: 110, duration: 1, stagger: 0.035 })
        .from("[data-boot-role]", { autoAlpha: 0, y: 10, duration: 0.6 }, 0.4)
        .from("[data-boot-step]", { autoAlpha: 0, x: -12, duration: 0.4, stagger: 0.28 }, 0.5)
        .from("[data-boot-layer]", { scaleX: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, 0.7)
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (percent) percent.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.4,
        )
        .fromTo("[data-boot-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.4)
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }, "+=0.25");
    },
    { scope: root, dependencies: [booted] },
  );

  useEffect(() => {
    if (booted) return;
    const skip = () => tl.current?.progress(1);
    window.addEventListener("keydown", skip, { once: true });
    return () => window.removeEventListener("keydown", skip);
  }, [booted]);

  if (booted) return null;

  return (
    <div
      ref={root}
      onClick={() => tl.current?.progress(1)}
      className="fixed inset-0 z-[2000] flex flex-col justify-between bg-desk p-6 font-mono text-[12px] text-muted md:p-10"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex justify-between">
        <span>OZ·CAD 2026</span>
        <span>Cliquez pour passer</span>
      </div>

      <div>
        <h1 data-boot-name className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] text-fg">
          {identity.name}
        </h1>
        <p data-boot-role className="mt-4 text-select">
          {identity.role} — {identity.school}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ul className="space-y-1.5">
          {steps.map((s) => (
            <li key={s} data-boot-step>
              <span className="text-l-green">✓</span> {s}…
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-end gap-3">
          <div className="flex gap-1">
            {WINDOW_IDS.map((id) => (
              <span
                key={id}
                data-boot-layer
                className="h-1.5 flex-1 origin-left rounded-full"
                style={{ background: windows[id].color }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-edge">
              <div data-boot-bar className="h-px origin-left bg-select" />
            </div>
            <span data-boot-percent className="text-fg">
              000
            </span>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
