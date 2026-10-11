"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { AboutGrid } from "./AboutGrid";
import { ContactGrid } from "./ContactGrid";
import { EducationGrid } from "./EducationGrid";
import { ExperienceGrid } from "./ExperienceGrid";
import { IntroGrid } from "./IntroGrid";
import { ProjectsGrid } from "./ProjectsGrid";
import { SkillsGrid } from "./SkillsGrid";
import { ToolsGrid } from "./ToolsGrid";

export function BentoHome() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useSite();

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-bento-tile]");
      gsap.set(tiles, { autoAlpha: 0, y: 48, scale: 0.97 });
      if (!introDone) return;

      const split = SplitText.create("[data-bento-name]", { type: "chars", mask: "chars" });
      gsap.from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.04, delay: 0.5 });

      ScrollTrigger.batch(tiles, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.07,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <main ref={root} className="pb-[var(--gutter)]">
      <IntroGrid />
      <AboutGrid />
      <ToolsGrid />
      <SkillsGrid />
      <ExperienceGrid />
      <EducationGrid />
      <ProjectsGrid />
      <ContactGrid />
    </main>
  );
}
