"use client";

import { useRef } from "react";
import { identity, manifesto } from "@/lib/content";
import { WINDOW_IDS, windows } from "@/lib/desk";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useDesk } from "../DeskProvider";
import { Icon } from "../Icon";

export function AccueilWindow() {
  const desk = useDesk();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!desk.booted) return;
      const split = SplitText.create("[data-name]", { type: "chars", mask: "chars" });
      gsap
        .timeline({ delay: 0.15 })
        .from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.03 })
        .from("[data-fade]", { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.7 }, 0.35)
        .from("[data-shortcut]", { autoAlpha: 0, y: 10, stagger: 0.04, duration: 0.5 }, 0.55);
    },
    { scope: root, dependencies: [desk.booted] },
  );

  return (
    <div ref={root} className="flex min-h-full flex-col gap-6 p-6 @lg:p-8">
      <p data-fade className="label text-dim">
        Espace de travail · {identity.city}
      </p>

      <h1 className="font-display text-[clamp(3rem,13cqw,6.5rem)] leading-[0.88]">
        <span data-name className="block">
          {identity.firstName}
        </span>
        <span data-name className="block italic text-select">
          {identity.lastName}
        </span>
      </h1>

      <div data-fade className="space-y-1">
        <p className="text-[15px] font-medium">
          {identity.role} — {identity.school}
        </p>
        <p className="text-[13px] text-muted">{identity.headline}</p>
      </div>

      <blockquote data-fade className="border-l-2 border-select pl-4 font-display text-xl italic leading-snug text-fg/90">
        « {manifesto} »
      </blockquote>

      <div className="mt-auto">
        <p data-fade className="label mb-2 text-dim">
          Ouvrir un calque
        </p>
        <div className="grid grid-cols-2 gap-1.5 @md:grid-cols-4">
          {WINDOW_IDS.filter((id) => id !== "accueil").map((id) => {
            const def = windows[id];
            return (
              <button
                key={id}
                data-shortcut
                type="button"
                onClick={() => desk.open(id)}
                className="group flex items-center gap-2 rounded-md border border-edge bg-desk/60 px-2.5 py-2 text-left text-[12.5px] transition-colors hover:border-edge-2 hover:bg-panel-2"
              >
                <span className="size-2 shrink-0 rounded-[2px]" style={{ background: def.color }} />
                <Icon name={def.icon} className="size-3.5 shrink-0 text-muted group-hover:text-fg" />
                <span className="truncate">{def.label}</span>
                <kbd className="label ml-auto text-dim">{def.key}</kbd>
              </button>
            );
          })}
        </div>
        <p data-fade className="mt-3 text-[12px] text-dim">
          Astuce : tapez <span className="font-mono text-muted">APROPOS</span> dans la ligne de commande, ou
          appuyez sur <kbd className="font-mono text-muted">2</kbd>.
        </p>
      </div>
    </div>
  );
}
