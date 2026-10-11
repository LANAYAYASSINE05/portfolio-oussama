"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTheme } from "@/lib/theme";

type SiteContextValue = {
  introDone: boolean;
  finishIntro: () => void;
  scrollTo: (target: string | number) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const height = document.body.scrollHeight;
        if (Math.abs(height - lastHeight) < 2) return;
        lastHeight = height;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 250);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.2, autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!introDone) {
      lenis?.stop();
      document.documentElement.classList.add("is-loading");
    } else {
      lenis?.start();
      document.documentElement.classList.remove("is-loading");
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }
  }, [introDone]);

  const theme = useTheme();
  useEffect(() => {
    const id = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(id);
  }, [theme]);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6 });
      return;
    }
    if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <SiteContext.Provider value={{ introDone, finishIntro, scrollTo }}>
      {children}
    </SiteContext.Provider>
  );
}
