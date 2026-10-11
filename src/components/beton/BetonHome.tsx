"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { BetonCareer } from "./BetonCareer";
import { BetonContact } from "./BetonContact";
import { BetonEducation } from "./BetonEducation";
import { BetonHero } from "./BetonHero";
import { BetonProfile } from "./BetonProfile";
import { BetonProjects } from "./BetonProjects";
import { BetonSkills } from "./BetonSkills";
import { BetonTools } from "./BetonTools";

export function BetonHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { clipPath: "inset(0 0 100% 0)" });
      if (!introDone) return;

      ScrollTrigger.batch(reveals, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "expo.inOut",
            stagger: 0.07,
            overwrite: true,
            clearProps: "clipPath",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-beton-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "words,chars" });
        gsap.from(split.chars, {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.025,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <main ref={root} className="overflow-x-clip bg-paper text-ink">
      <BetonHero />
      <BetonProfile />
      <BetonProjects />
      <BetonTools />
      <BetonSkills />
      <BetonCareer />
      <BetonEducation />
      <BetonContact />
    </main>
  );
}
