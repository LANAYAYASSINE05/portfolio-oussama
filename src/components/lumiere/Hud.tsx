"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const RUNTIME_SECONDS = 12 * 60;
const FPS = 24;

function timecode(progress: number) {
  const total = Math.floor(progress * RUNTIME_SECONDS * FPS);
  const f = total % FPS;
  const s = Math.floor(total / FPS);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
}

const corners = [
  "left-4 top-20 border-l border-t",
  "right-4 top-20 border-r border-t",
  "left-4 bottom-4 border-b border-l",
  "right-4 bottom-4 border-b border-r",
];

export function Hud() {
  const root = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const sceneRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const film = root.current?.closest("main");
    if (!film) return;
    const show = (self: ScrollTrigger) => {
      if (tcRef.current) tcRef.current.textContent = timecode(self.progress);
    };
    ScrollTrigger.create({
      trigger: film,
      start: "top top",
      end: "bottom bottom",
      refreshPriority: -1,
      onUpdate: show,
      onRefresh: show,
    });

    film.querySelectorAll<HTMLElement>("[data-chapter]").forEach((chapter) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: "top 50%",
        end: "bottom 50%",
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive && sceneRef.current) sceneRef.current.textContent = chapter.dataset.chapter ?? "";
        },
      });
    });
  });

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-50 text-ink mix-blend-difference">
      {corners.map((pos) => (
        <span key={pos} className={`absolute size-6 border-current opacity-50 ${pos}`} />
      ))}
      <div className="label absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-5 whitespace-nowrap">
        <span className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-red-500" /> REC
        </span>
        <span ref={sceneRef} className="hidden opacity-70 sm:inline">
          Ouverture
        </span>
        <span ref={tcRef} className="tabular-nums">
          00:00:00:00
        </span>
      </div>
    </div>
  );
}
