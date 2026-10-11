"use client";

import { motion, useTransform } from "motion/react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { identity } from "@/lib/content";
import { WINDOW_IDS, windows } from "@/lib/desk";
import { useDesk } from "./DeskProvider";
import { Icon } from "./Icon";

const timeFormat = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Casablanca",
});

function subscribeClock(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

function useClock() {
  return useSyncExternalStore(subscribeClock, () => timeFormat.format(Date.now()), () => "--:--");
}

export function MenuBar() {
  const desk = useDesk();
  const time = useClock();
  const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

  return (
    <div className="flex h-10 items-stretch border-b border-edge bg-panel text-[12.5px]">
      <div className="flex items-center gap-2 border-r border-edge px-3">
        <span className="grid size-6 place-items-center rounded-[4px] bg-select font-mono text-[10px] font-bold text-desk">
          OZ
        </span>
        <span className="hidden font-medium sm:inline">OZ·CAD</span>
        <span className="label hidden text-dim md:inline">2026</span>
      </div>
      <div className="flex min-w-0 items-end gap-px px-2 pt-1.5">
        <div className="flex h-full min-w-0 items-center gap-2 rounded-t-md border border-b-0 border-edge bg-desk px-3">
          <span className="size-1.5 shrink-0 rounded-full bg-l-green" />
          <span className="truncate">oussama-ziyati.dwg</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1 px-2">
        <MenuButton onClick={desk.openAll}>Tout ouvrir</MenuButton>
        <MenuButton onClick={desk.closeAll}>Tout fermer</MenuButton>
        <Link href="/systeme" className="hidden rounded px-2.5 py-1 text-muted transition-colors hover:bg-edge hover:text-fg md:block">
          Système
        </Link>
        {linkedin && (
          <a
            href={linkedin.href}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded px-2.5 py-1 text-muted transition-colors hover:bg-edge hover:text-fg sm:block"
          >
            LinkedIn ↗
          </a>
        )}
        <span className="label ml-2 hidden border-l border-edge pl-3 text-muted lg:inline">Casablanca {time}</span>
      </div>
    </div>
  );
}

function MenuButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden rounded px-2.5 py-1 text-muted transition-colors hover:bg-edge hover:text-fg md:block"
    >
      {children}
    </button>
  );
}

export function ToolPalette() {
  const desk = useDesk();

  return (
    <nav
      aria-label="Sections"
      className="flex items-center justify-around gap-1 border-t border-edge bg-panel p-1.5 lg:flex-col lg:justify-start lg:border-r lg:border-t-0 lg:py-3"
    >
      {WINDOW_IDS.map((id) => {
        const def = windows[id];
        const state = desk.windows[id];
        const active = desk.focused === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => (active ? desk.minimize(id) : desk.open(id))}
            aria-pressed={state.open && !state.minimized}
            className={`group relative grid size-10 place-items-center rounded-md transition-colors ${
              active ? "bg-select/15 text-select" : "text-muted hover:bg-edge hover:text-fg"
            }`}
          >
            <Icon name={def.icon} className="size-[18px]" />
            {state.open && (
              <span
                className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full lg:bottom-auto lg:left-0.5 lg:top-1/2 lg:h-3 lg:w-0.5 lg:-translate-y-1/2 lg:translate-x-0"
                style={{ background: def.color }}
              />
            )}
            <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded border border-edge bg-panel-2 px-2 py-1 text-xs text-fg opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
              {def.label} <span className="label ml-2 text-dim">{def.key}</span>
            </span>
            <span className="sr-only">{def.label}</span>
          </button>
        );
      })}
      <div className="hidden flex-1 lg:block" />
      <button
        type="button"
        onClick={desk.toggleGrid}
        title="Grille (F7)"
        aria-pressed={desk.grid}
        className={`hidden size-10 place-items-center rounded-md transition-colors lg:grid ${
          desk.grid ? "text-fg" : "text-dim"
        } hover:bg-edge`}
      >
        <Icon name="grid" className="size-[18px]" />
      </button>
    </nav>
  );
}

export function StatusBar() {
  const desk = useDesk();
  const coords = useTransform(
    () => `X ${desk.cursor.x.get().toFixed(2).padStart(7, " ")}   Y ${desk.cursor.y.get().toFixed(2).padStart(7, " ")}`,
  );

  return (
    <div className="label flex h-7 items-center gap-1 border-t border-edge bg-panel px-2 text-muted">
      <motion.span className="w-52 whitespace-pre text-fg">{coords}</motion.span>
      <Toggle on={desk.grid} onClick={desk.toggleGrid} hint="F7">
        Grille
      </Toggle>
      <Toggle on={desk.snap} onClick={desk.toggleSnap} hint="F9">
        Accrochage
      </Toggle>
      <span className="ml-2 hidden rounded bg-desk px-2 py-0.5 md:inline">Objet</span>
      <span className="ml-auto hidden md:inline">
        {identity.city} · {identity.coords}
      </span>
    </div>
  );
}

function Toggle({
  on,
  onClick,
  hint,
  children,
}: {
  on: boolean;
  onClick: () => void;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      title={`${children} (${hint})`}
      className={`rounded px-2 py-0.5 transition-colors ${on ? "bg-select/15 text-select" : "hover:text-fg"}`}
    >
      {children}
    </button>
  );
}
