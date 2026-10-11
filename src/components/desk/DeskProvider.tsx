"use client";

import { useMotionValue, type MotionValue } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useReducer, useRef } from "react";
import { WINDOW_IDS, type WindowId } from "@/lib/desk";

type WindowState = { open: boolean; minimized: boolean; maximized: boolean; z: number };

type State = {
  windows: Record<WindowId, WindowState>;
  focused: WindowId | null;
  top: number;
  grid: boolean;
  snap: boolean;
  booted: boolean;
  log: string[];
};

type Action =
  | { type: "open" | "close" | "minimize" | "focus" | "maximize"; id: WindowId }
  | { type: "openAll" | "closeAll" | "toggleGrid" | "toggleSnap" | "boot" }
  | { type: "log"; line: string };

const closed: WindowState = { open: false, minimized: false, maximized: false, z: 0 };

const initialState: State = {
  windows: Object.fromEntries(
    WINDOW_IDS.map((id) => [id, id === "accueil" ? { ...closed, open: true, z: 1 } : closed]),
  ) as Record<WindowId, WindowState>,
  focused: "accueil",
  top: 1,
  grid: true,
  snap: false,
  booted: false,
  log: ["OZ·CAD 2026 — oussama-ziyati.dwg ouvert.", "Tapez AIDE pour la liste des commandes."],
};

function topVisible(windows: State["windows"], except?: WindowId): WindowId | null {
  let best: WindowId | null = null;
  for (const id of WINDOW_IDS) {
    const w = windows[id];
    if (id === except || !w.open || w.minimized) continue;
    if (!best || w.z > windows[best].z) best = id;
  }
  return best;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open":
    case "focus": {
      const top = state.top + 1;
      const current = state.windows[action.id];
      return {
        ...state,
        top,
        focused: action.id,
        windows: { ...state.windows, [action.id]: { ...current, open: true, minimized: false, z: top } },
      };
    }
    case "close":
    case "minimize": {
      const current = state.windows[action.id];
      const next = action.type === "close" ? { ...closed } : { ...current, minimized: true };
      const windows = { ...state.windows, [action.id]: next };
      return { ...state, windows, focused: topVisible(windows, action.id) };
    }
    case "maximize": {
      const current = state.windows[action.id];
      return {
        ...state,
        focused: action.id,
        windows: { ...state.windows, [action.id]: { ...current, maximized: !current.maximized } },
      };
    }
    case "openAll": {
      let top = state.top;
      const windows = { ...state.windows };
      for (const id of WINDOW_IDS) windows[id] = { ...windows[id], open: true, minimized: false, z: ++top };
      return { ...state, windows, top, focused: WINDOW_IDS[WINDOW_IDS.length - 1] };
    }
    case "closeAll": {
      const windows = Object.fromEntries(WINDOW_IDS.map((id) => [id, closed])) as State["windows"];
      return { ...state, windows, focused: null };
    }
    case "toggleGrid":
      return { ...state, grid: !state.grid };
    case "toggleSnap":
      return { ...state, snap: !state.snap };
    case "boot":
      return { ...state, booted: true };
    case "log":
      return { ...state, log: [...state.log, action.line].slice(-40) };
  }
}

type DeskContext = State & {
  open: (id: WindowId) => void;
  close: (id: WindowId) => void;
  minimize: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  maximize: (id: WindowId) => void;
  openAll: () => void;
  closeAll: () => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  finishBoot: () => void;
  print: (line: string) => void;
  cursor: { x: MotionValue<number>; y: MotionValue<number> };
  desktopRef: React.RefObject<HTMLDivElement | null>;
  zoomExtentsRef: React.RefObject<() => void>;
};

const Ctx = createContext<DeskContext | null>(null);

export function DeskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const desktopRef = useRef<HTMLDivElement>(null);
  const zoomExtentsRef = useRef<() => void>(() => {});

  const open = useCallback((id: WindowId) => dispatch({ type: "open", id }), []);
  const close = useCallback((id: WindowId) => dispatch({ type: "close", id }), []);
  const minimize = useCallback((id: WindowId) => dispatch({ type: "minimize", id }), []);
  const focus = useCallback((id: WindowId) => dispatch({ type: "focus", id }), []);
  const maximize = useCallback((id: WindowId) => dispatch({ type: "maximize", id }), []);
  const openAll = useCallback(() => dispatch({ type: "openAll" }), []);
  const closeAll = useCallback(() => dispatch({ type: "closeAll" }), []);
  const toggleGrid = useCallback(() => dispatch({ type: "toggleGrid" }), []);
  const toggleSnap = useCallback(() => dispatch({ type: "toggleSnap" }), []);
  const finishBoot = useCallback(() => dispatch({ type: "boot" }), []);
  const print = useCallback((line: string) => dispatch({ type: "log", line }), []);

  const value = useMemo<DeskContext>(
    () => ({
      ...state,
      open,
      close,
      minimize,
      focus,
      maximize,
      openAll,
      closeAll,
      toggleGrid,
      toggleSnap,
      finishBoot,
      print,
      cursor: { x, y },
      desktopRef,
      zoomExtentsRef,
    }),
    [state, open, close, minimize, focus, maximize, openAll, closeAll, toggleGrid, toggleSnap, finishBoot, print, x, y],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesk() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDesk doit être utilisé dans <DeskProvider>");
  return ctx;
}
