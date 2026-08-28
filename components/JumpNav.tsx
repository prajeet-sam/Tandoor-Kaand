"use client";

import { useEffect, useRef, useState } from "react";
import { sectionDefs } from "./section-defs";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Sticky section jump menu — collapsed to a small tab by default, expands
 * to jump to any of the ten sections. Keyboard accessible (Esc closes,
 * focus returns to the trigger).
 */
export function JumpNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const scrolledPastRef = useRef(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.7;
      if (past !== scrolledPastRef.current) {
        scrolledPastRef.current = past;
        setScrolledPast(past);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLinkRef.current?.focus(), 30);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onClickOutside);
    return () => document.removeEventListener("pointerdown", onClickOutside);
  }, [open]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    requestAnimationFrame(() => {
      const behavior: ScrollBehavior = prefersReduced() ? "auto" : "smooth";
      el.scrollIntoView({ behavior, block: "start" });
      setTimeout(() => triggerRef.current?.focus(), prefersReduced() ? 0 : 700);
    });
  };

  return (
    <nav
      aria-label="Section jump menu"
      className={`fixed right-4 z-40 transition-all duration-500 ${
        scrolledPast ? "bottom-4" : "bottom-0 translate-y-3 opacity-0"
      }`}
      style={{ pointerEvents: scrolledPast ? "auto" : "none" }}
    >
      <div ref={panelRef}>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="jump-panel"
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-2 border px-4 py-2.5 font-sans text-[0.72rem] uppercase tracking-[0.22em] backdrop-blur-sm transition-colors ${
            open
              ? "border-ember bg-ink-4 text-ember-bright"
              : "border-line-strong bg-ink-3/95 text-paper-dim hover:border-ember/60 hover:text-ember-bright"
          }`}
        >
          <span aria-hidden="true" className={`text-[0.85rem] leading-none ${open ? "rotate-45" : ""}`}>
            {open ? "+" : "☰"}
          </span>
          <span className="hidden sm:inline">{open ? "Close index" : "Index"}</span>
          <span className="sm:hidden">Index</span>
        </button>

        {open && (
          <div
            id="jump-panel"
            role="dialog"
            aria-label="Story index"
            className="absolute bottom-[3.5rem] right-0 w-[21rem] max-w-[calc(100vw-2rem)] border border-line-strong bg-ink-3/98 shadow-[0_20px_60px_rgba(122,92,46,0.3)] backdrop-blur-md"
          >
            <p className="kicker border-b border-line px-5 py-4">
              The case file · contents
            </p>
            <ul className="max-h-[65vh] overflow-y-auto py-2">
              {sectionDefs.map((s, i) => (
                <li key={s.id}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(s.id);
                    }}
                    className="group flex items-baseline gap-4 px-5 py-2.5 transition-colors hover:bg-ink-4 focus-visible:bg-ink-4"
                  >
                    <span className="meta-mono w-6 shrink-0 text-ember">
                      {s.index}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate font-sans text-[0.9rem] text-paper transition-colors group-hover:text-ember-bright">
                        {s.label}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-faint">
                        {s.act}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-faint">
              The Tandoor Case · New Delhi, 1995
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}