"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { identity } from "@/lib/content";
import { WINDOW_IDS, windows, type WindowId } from "@/lib/desk";
import { useDesk } from "./DeskProvider";

type Command = { name: string; hint: string; aliases: string[]; run: () => string | void };

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

export function CommandLine() {
  const desk = useDesk();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Command[]>(() => {
    const openers: Command[] = WINDOW_IDS.map((id: WindowId) => ({
      name: windows[id].aliases[0].toUpperCase(),
      hint: `Ouvre ${windows[id].label}`,
      aliases: windows[id].aliases,
      run: () => {
        desk.open(id);
        return `Ouverture de ${windows[id].file}`;
      },
    }));
    const list: Command[] = [
      ...openers,
      { name: "TOUT", hint: "Ouvre toutes les fenêtres", aliases: ["tout", "all"], run: () => desk.openAll() },
      {
        name: "FERMER",
        hint: "Ferme la fenêtre active",
        aliases: ["fermer", "close", "x"],
        run: () => {
          if (!desk.focused) return "Aucune fenêtre active.";
          desk.close(desk.focused);
        },
      },
      { name: "FERMERTOUT", hint: "Ferme toutes les fenêtres", aliases: ["fermertout", "closeall"], run: () => desk.closeAll() },
      {
        name: "ZE",
        hint: "Zoom étendu sur le plan",
        aliases: ["ze", "zoom", "z"],
        run: () => {
          desk.zoomExtentsRef.current();
          return "Zoom étendu.";
        },
      },
      {
        name: "GRILLE",
        hint: "Affiche / masque la grille (F7)",
        aliases: ["grille", "grid"],
        run: () => {
          desk.toggleGrid();
          return `Grille ${desk.grid ? "désactivée" : "activée"}.`;
        },
      },
      {
        name: "ACCROCHAGE",
        hint: "Accrochage à la grille (F9)",
        aliases: ["accrochage", "snap"],
        run: () => {
          desk.toggleSnap();
          return `Accrochage ${desk.snap ? "désactivé" : "activé"}.`;
        },
      },
      {
        name: "LINKEDIN",
        hint: "Profil LinkedIn",
        aliases: ["linkedin", "in"],
        run: () => {
          const href = identity.socials.find((s) => s.label === "LinkedIn")?.href;
          if (href) window.open(href, "_blank", "noreferrer");
          return "Ouverture du profil LinkedIn…";
        },
      },
      {
        name: "SYSTEME",
        hint: "Documentation du système de design",
        aliases: ["systeme", "design"],
        run: () => router.push("/systeme"),
      },
    ];
    list.push({
      name: "AIDE",
      hint: "Liste des commandes",
      aliases: ["aide", "help", "?"],
      run: () => `Commandes : ${list.map((c) => c.name).join(" · ")}`,
    });
    return list;
  }, [desk, router]);

  const query = normalize(value);
  const suggestions = query
    ? commands.filter((c) => c.aliases.some((a) => a.startsWith(query)) || normalize(c.name).startsWith(query)).slice(0, 6)
    : [];

  const execute = (raw: string) => {
    const q = normalize(raw);
    if (!q) return;
    desk.print(`Commande : ${raw.toUpperCase()}`);
    const cmd = commands.find((c) => c.aliases.includes(q) || normalize(c.name) === q) ?? suggestions[selected];
    const out = cmd ? cmd.run() : `Commande inconnue « ${raw} ». Tapez AIDE.`;
    if (out) desk.print(out);
    setHistory((h) => [...h.filter((x) => x !== raw), raw].slice(-30));
    setCursor(-1);
    setValue("");
    setSelected(0);
  };

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [desk.log]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable='true']");
      if (e.key === "F7") {
        e.preventDefault();
        desk.toggleGrid();
        return;
      }
      if (e.key === "F9") {
        e.preventDefault();
        desk.toggleSnap();
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape" && desk.focused) {
        desk.close(desk.focused);
        return;
      }
      const byKey = WINDOW_IDS.find((id) => windows[id].key === e.key);
      if (byKey) {
        desk.open(byKey);
        return;
      }
      if (/^[a-zA-Zàâçéèêëîïôûùüÿ?]$/.test(e.key) && input.current) {
        input.current.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [desk]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(value);
    } else if (e.key === "Tab" && suggestions.length) {
      e.preventDefault();
      setValue(suggestions[selected].aliases[0]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length) return setSelected((s) => (s - 1 + suggestions.length) % suggestions.length);
      if (!history.length) return;
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length) return setSelected((s) => (s + 1) % suggestions.length);
      if (cursor < 0) return;
      const next = cursor + 1;
      setCursor(next >= history.length ? -1 : next);
      setValue(next >= history.length ? "" : history[next]);
    } else if (e.key === "Escape") {
      setValue("");
      input.current?.blur();
    }
  };

  return (
    <div className="relative border-t border-edge bg-desk font-mono text-[12px]">
      <div ref={logRef} className="desk-scroll h-[3.75rem] overflow-auto px-3 pt-1.5 text-muted">
        {desk.log.map((line, i) => (
          <p key={`${i}-${line}`} className={line.startsWith("Commande :") ? "text-dim" : ""}>
            {line}
          </p>
        ))}
      </div>
      <div className="flex h-8 items-center gap-2 border-t border-edge/60 px-3">
        <span className="shrink-0 text-select">Commande :</span>
        <input
          ref={input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Ligne de commande"
          placeholder="Tapez une commande — AIDE, APROPOS, PROJETS…"
          className="min-w-0 flex-1 bg-transparent uppercase text-fg caret-select outline-none placeholder:normal-case placeholder:text-dim"
        />
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full left-24 z-[999] mb-1 w-80 overflow-hidden rounded-md border border-edge bg-panel-2 py-1 shadow-2xl"
          >
            {suggestions.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execute(s.aliases[0]);
                  }}
                  onMouseEnter={() => setSelected(i)}
                  className={`flex w-full items-baseline justify-between gap-4 px-3 py-1 text-left ${
                    i === selected ? "bg-select/20 text-fg" : "text-muted"
                  }`}
                >
                  <span>{s.name}</span>
                  <span className="truncate font-sans text-[11px] text-dim">{s.hint}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
