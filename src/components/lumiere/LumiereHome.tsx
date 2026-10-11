"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EndCredits } from "./EndCredits";
import { FilmStrip } from "./FilmStrip";
import { Hud } from "./Hud";
import { Intertitles } from "./Intertitles";
import { LightMeter } from "./LightMeter";
import { Origins } from "./Origins";
import { Sequences } from "./Sequences";
import { ShadowStudy } from "./ShadowStudy";
import { Trailers } from "./Trailers";

export function LumiereHome() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-focus]").forEach((title) => {
        gsap.from(title, {
          filter: "blur(18px)",
          autoAlpha: 0,
          letterSpacing: "0.08em",
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="bg-paper">
      <ShadowStudy />
      <Intertitles />
      <FilmStrip />
      <LightMeter />
      <Sequences />
      <Origins />
      <Trailers />
      <EndCredits />
      <Hud />
    </main>
  );
}
