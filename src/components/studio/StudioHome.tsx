"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { StudioCareer } from "./StudioCareer";
import { StudioContact } from "./StudioContact";
import { StudioEducation } from "./StudioEducation";
import { StudioExpertise } from "./StudioExpertise";
import { StudioHero } from "./StudioHero";
import { StudioProfile } from "./StudioProfile";
import { StudioProjects } from "./StudioProjects";
import { StudioTools } from "./StudioTools";

export function StudioHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();

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
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-studio-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <main ref={root} className="bg-paper text-ink">
      <StudioHero />
      <StudioProfile />
      <StudioProjects />
      <StudioTools />
      <StudioExpertise />
      <StudioCareer />
      <StudioEducation />
      <StudioContact />
    </main>
  );
}
