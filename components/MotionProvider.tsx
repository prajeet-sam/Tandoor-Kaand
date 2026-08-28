"use client";

import { MotionConfig } from "framer-motion";

/**
 * Central motion configuration. `reducedMotion="user"` makes all
 * framer-motion animations avoid transform/opacity movement when the
 * user has declared a preference for reduced motion (via
 * prefers-reduced-motion) — the primary reduced-motion fallback across
 * the whole experience. CSS in globals.css backs it up.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}