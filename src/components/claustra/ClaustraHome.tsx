"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { ClaustraAstrolabe } from "./ClaustraAstrolabe";
import { ClaustraAtelier } from "./ClaustraAtelier";
import { ClaustraBoussole } from "./ClaustraBoussole";
import { ClaustraCaravane } from "./ClaustraCaravane";
import { ClaustraFanous } from "./ClaustraFanous";
import { ClaustraGalerie } from "./ClaustraGalerie";
import { ClaustraMajlis } from "./ClaustraMajlis";
import { ClaustraNuit } from "./ClaustraNuit";
import { ClaustraParchemin } from "./ClaustraParchemin";
import { OgiveDefs } from "./shared";

export function ClaustraHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();
  const [active, setActive] = useState("accueil");

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { autoAlpha: 0, y: 36 });
      if (!introDone) return;

      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.07,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-claustra-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.from(split.words, {
          y: 30,
          autoAlpha: 0,
          filter: "blur(8px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.from(el, { scaleX: 0, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      gsap.to("[data-boussole-fill]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true },
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
    <main ref={root} className="overflow-x-clip bg-paper text-ink xl:[&>section]:pr-24">
      <OgiveDefs />
      <ClaustraBoussole active={active} />
      <ClaustraNuit />
      <ClaustraMajlis />
      <ClaustraGalerie />
      <ClaustraAtelier />
      <ClaustraAstrolabe />
      <ClaustraCaravane />
      <ClaustraParchemin />
      <ClaustraFanous />
    </main>
  );
}
