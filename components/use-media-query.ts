"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. Snapshot on the server (and first client
 * render) is `false`, so the mobile layout renders first; the appropriate
 * layout swaps in after hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}