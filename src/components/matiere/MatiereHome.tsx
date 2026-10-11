"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { MatiereCareer } from "./MatiereCareer";
import { MatiereContact } from "./MatiereContact";
import { MatiereEducation } from "./MatiereEducation";
import { MatiereHero } from "./MatiereHero";
import { MatiereProfile } from "./MatiereProfile";
import { MatiereProjects } from "./MatiereProjects";
import { MatiereSkills } from "./MatiereSkills";
import { MatiereTools } from "./MatiereTools";

export function MatiereHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();

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
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-matiere-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "words", mask: "words" });
        gsap.from(split.words, {
          yPercent: 110,
          rotate: 4,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <main ref={root} className="bg-paper text-ink">
      <MatiereHero />
      <MatiereProfile />
      <MatiereProjects />
      <MatiereTools />
      <MatiereSkills />
      <MatiereCareer />
      <MatiereEducation />
      <MatiereContact />
    </main>
  );
}
