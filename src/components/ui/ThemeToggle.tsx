"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { setTheme, useTheme, type Theme } from "@/lib/theme";

const options: { id: Theme; label: string }[] = [
  { id: "trait", label: "Trait" },
  { id: "volume", label: "Volume" },
  { id: "medina", label: "Médina" },
  { id: "bento", label: "Bento" },
  { id: "lumiere", label: "Lumière" },
  { id: "studio", label: "Studio" },
  { id: "beton", label: "Béton" },
  { id: "claustra", label: "Claustra" },
  { id: "bloc", label: "Bloc" },
  { id: "maquette", label: "Maquette" },
  { id: "chantier", label: "Chantier" },
];

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const current = options.find((o) => o.id === theme) ?? options[0];
  const index = options.indexOf(current);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!root.current?.contains(t) && !menu.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="theme-menu"
        className="label flex h-10 items-center gap-2.5 rounded-full border border-current pl-1.5 pr-4"
        data-cursor=""
      >
        <span className="grid h-7 min-w-7 place-items-center rounded-full bg-white px-1.5 text-black">{String(index + 1).padStart(2, "0")}</span>
        <span className="hidden opacity-60 sm:inline">Système</span>
        <span>{current.label}</span>
        <motion.span aria-hidden animate={{ rotate: open ? 180 : 0 }} className="text-[0.6rem]">
          ▾
        </motion.span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={menu}
                id="theme-menu"
                role="radiogroup"
                aria-label="Système de design"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-4 top-[calc(var(--header-h)-0.5rem)] z-[70] grid origin-top grid-cols-2 gap-1 sm:left-auto sm:right-[var(--gutter)] sm:w-80 sm:origin-top-right rounded-2xl border border-white/15 bg-[#111] p-2 text-[#f2f0ea] shadow-[0_24px_50px_rgb(0_0_0/0.45)]"
              >
                {options.map((o, i) => {
                  const active = theme === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={(e) => {
                        setOpen(false);
                        if (!active) setTheme(o.id, { x: e.clientX, y: e.clientY });
                      }}
                      className={`label flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${active ? "bg-white text-black" : "hover:bg-white/10"}`}
                      data-cursor=""
                    >
                      <span className="opacity-50">{String(i + 1).padStart(2, "0")}</span>
                      {o.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
