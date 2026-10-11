"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { ChantierConteneurs } from "./ChantierConteneurs";
import { ChantierCoulage } from "./ChantierCoulage";
import { ChantierGrue } from "./ChantierGrue";
import { ChantierMonteCharge } from "./ChantierMonteCharge";
import { ChantierPalissade } from "./ChantierPalissade";
import { ChantierPermis } from "./ChantierPermis";
import { ChantierPlanning } from "./ChantierPlanning";
import { ChantierRadio } from "./ChantierRadio";
import { ChantierReception } from "./ChantierReception";

export function ChantierHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();
  const [active, setActive] = useState("accueil");

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { autoAlpha: 0, y: 50 });
      if (!introDone) return;

      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-ch-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.set(split.masks, { paddingTop: "0.16em", marginTop: "-0.16em" });
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-ch-sign]").forEach((el) => {
        gsap.from(el, {
          rotate: -10,
          y: -30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "0% 0%",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
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
      <ChantierMonteCharge active={active} />
      <ChantierGrue />
      <ChantierPermis />
      <ChantierPalissade />
      <ChantierConteneurs />
      <ChantierCoulage />
      <ChantierPlanning />
      <ChantierReception />
      <ChantierRadio />
    </main>
  );
}
