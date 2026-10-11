"use client";

import { useEffect } from "react";
import { useSite } from "@/components/providers/SiteProvider";

export function IntroSkip() {
  const { finishIntro } = useSite();
  useEffect(() => finishIntro(), [finishIntro]);
  return null;
}
