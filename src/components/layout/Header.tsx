"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { Magnetic } from "@/components/ui/Magnetic";
import { NavIcon } from "@/components/ui/NavIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { identity, navigation, secondaryNavigation } from "@/lib/content";
import { ScrollTrigger } from "@/lib/gsap";
import { useTheme } from "@/lib/theme";

const ease = [0.16, 1, 0.3, 1] as const;

function Clock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Africa/Casablanca",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

export function Header() {
  const { introDone, scrollTo } = useSite();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const [active, setActive] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!isHome || !introDone) return;
    const triggers = navigation.map((item) =>
      ScrollTrigger.create({
        trigger: item.href,
        start: "top 50%",
        end: "bottom 50%",
        refreshPriority: -1,
        onToggle: (self) => self.isActive && setActive(item.href),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [isHome, introDone, theme]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("/")) router.push(href);
    else if (isHome) scrollTo(href);
    else router.push(`/${href}`);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[60] flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)] text-white mix-blend-difference"
        initial={{ y: "-100%" }}
        animate={{ y: introDone || !isHome ? "0%" : "-100%" }}
        transition={{ duration: 1, ease, delay: 0.6 }}
      >
        <Link href="/" className="flex items-center gap-3" data-cursor="">
          <Monogram className="size-9 transition-transform duration-700 ease-archi hover:rotate-90" />
          <span className="label hidden md:block lg:hidden 2xl:block">{identity.name}</span>
        </Link>

        <div className="label hidden items-center gap-2 2xl:flex">
          <span>{identity.city}</span>
          <span className="opacity-40">/</span>
          <Clock />
        </div>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navigation.map((item, i) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className={`label group relative flex items-center gap-1.5 transition-opacity duration-500 ${
                active && active !== item.href ? "opacity-60 hover:opacity-100" : ""
              }`}
              data-cursor=""
            >
              <span className="hidden opacity-50 xl:inline">0{i}</span>
              <NavIcon href={item.href} className="hidden size-3.5 xl:block" />
              {item.label}
              {active === item.href ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-current"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : (
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-archi group-hover:origin-left group-hover:scale-x-100" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic className="hidden lg:block">
            <button
              type="button"
              onClick={() => go("#contact")}
              className="label flex h-10 items-center rounded-full border border-current px-5"
              data-cursor=""
            >
              Contact
            </button>
          </Magnetic>
          <Magnetic className="lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="label flex h-10 items-center gap-2 rounded-full border border-current px-4"
              aria-expanded={open}
            >
              {open ? "Fermer" : "Menu"}
            </button>
          </Magnetic>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-end bg-night p-[var(--gutter)] pb-16 text-on-night"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <ul className="space-y-2">
              {[...navigation, ...secondaryNavigation].map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-on-night/15 pb-2">
                  <motion.button
                    type="button"
                    onClick={() => go(item.href)}
                    className="flex w-full items-center justify-between font-display text-[clamp(2.25rem,9vw,3.75rem)] leading-tight"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="flex items-center gap-4">
                      <NavIcon href={item.href} className="size-[0.55em] text-terra" />
                      {item.label}
                    </span>
                    <span className="label opacity-50">0{i + 1}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <p className="label opacity-60">{identity.email}</p>
              <ul className="flex gap-5">
                {identity.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="block hover:text-terra">
                      <SocialIcon label={s.label} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
