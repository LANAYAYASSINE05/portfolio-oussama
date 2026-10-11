"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { BlocAffiche } from "./BlocAffiche";
import { BlocBatteries } from "./BlocBatteries";
import { BlocContact } from "./BlocContact";
import { BlocDiplome } from "./BlocDiplome";
import { BlocDock } from "./BlocDock";
import { BlocDossiers } from "./BlocDossiers";
import { BlocFiche } from "./BlocFiche";
import { BlocStickers } from "./BlocStickers";
import { BlocTickets } from "./BlocTickets";

export function BlocHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();
  const [active, setActive] = useState("accueil");

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { autoAlpha: 0, y: 40 });
      if (!introDone) return;

      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-bloc-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.from(split.words, {
          yPercent: 80,
          rotate: () => gsap.utils.random(-8, 8),
          autoAlpha: 0,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-bloc-tag]").forEach((el) => {
        gsap.from(el, { scale: 0, rotate: -20, duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      gsap.utils.toArray<HTMLElement>("[data-room]").forEach((room) => {
        ScrollTrigger.create({
          trigger: room,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(room.dataset.room ?? "accueil"),
        });
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <main ref={root} className="overflow-x-clip bg-paper text-ink">
      <BlocDock active={active} />
      <BlocAffiche />
      <BlocFiche />
      <BlocDossiers />
      <BlocStickers />
      <BlocBatteries />
      <BlocTickets />
      <BlocDiplome />
      <BlocContact />
    </main>
  );
}
