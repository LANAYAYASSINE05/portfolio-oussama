import type { IconName } from "@/lib/desk";

type Name = IconName | "eye" | "eye-off" | "minus" | "square" | "close" | "grid" | "magnet" | "lock" | "chevron";

const paths: Record<Name, string> = {
  home: "M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20c1.5-4 4.5-6 8-6s6.5 2 8 6",
  cube: "M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v0M4 7.5 12 12l8-4.5M12 12v9",
  ruler: "M3 17 17 3l4 4L7 21l-4-4Zm4-4 2 2m1-5 2 2m1-5 2 2",
  building: "M5 21V5l7-2 7 2v16M5 21h14M9 8h1m4 0h1M9 12h1m4 0h1M9 16h1m4 0h1",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5",
  folder: "M3 6h6l2 2h10v11H3V6Z",
  mail: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  "eye-off": "M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.9M6.1 6.6C3.5 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1",
  minus: "M6 12h12",
  square: "M6 6h12v12H6z",
  close: "M6 6l12 12M18 6 6 18",
  grid: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18",
  magnet: "M6 3v8a6 6 0 0 0 12 0V3h-4v8a2 2 0 0 1-4 0V3H6Zm0 4h4m4 0h4",
  lock: "M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4",
  chevron: "M9 6l6 6-6 6",
};

export function Icon({ name, className = "size-4" }: { name: Name; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  );
}
