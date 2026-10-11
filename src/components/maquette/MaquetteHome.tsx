"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { MaquetteCaisse } from "./MaquetteCaisse";
import { MaquetteCartel } from "./MaquetteCartel";
import { MaquetteColis } from "./MaquetteColis";
import { MaquetteCoupe } from "./MaquetteCoupe";
import { MaquetteDecoupe } from "./MaquetteDecoupe";
import { MaquetteEtabli } from "./MaquetteEtabli";
import { MaquetteJury } from "./MaquetteJury";
import { MaquetteMetre } from "./MaquetteMetre";
import { MaquetteVitrine } from "./MaquetteVitrine";

export function MaquetteHome() {
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

      gsap.utils.toArray<HTMLElement>("[data-mq-title]").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-mq-plate]").forEach((el) => {
        gsap.from(el, { x: -40, rotate: -8, autoAlpha: 0, duration: 0.7, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      gsap.utils.toArray<SVGPathElement>("[data-mq-arrow]").forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", delay: 0.4, scrollTrigger: { trigger: path, start: "top 90%" } },
        );
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
      <MaquetteMetre active={active} />
      <MaquetteEtabli />
      <MaquetteCartel />
      <MaquetteVitrine />
      <MaquetteCaisse />
      <MaquetteDecoupe />
      <MaquetteCoupe />
      <MaquetteJury />
      <MaquetteColis />
    </main>
  );
}
