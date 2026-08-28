"use client";

import { useId, useRef, useState } from "react";
import { resolveSources } from "@/data";

interface FootnoteProps {
  refs: number[];
  label?: string;
}

/**
 * Expandable inline case-file citation. Superscript markers expand to show
 * the source reference on hover or tap, instead of forcing a jump to the
 * bottom. Keyboard accessible: the marker is a real <button>.
 */
export function Footnote({ refs, label }: FootnoteProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sources = resolveSources(refs);

  if (sources.length === 0) return null;

  const text = label ?? sources.map((s) => s.ref).join(" · ");

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  return (
    <span className="note relative inline-block align-baseline">
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((v) => !v)}
        onPointerEnter={openNow}
        onPointerLeave={scheduleClose}
        onFocus={openNow}
        onBlur={() => setOpen(false)}
        className="mx-0.5 inline-flex h-[1.15em] min-w-[1.3em] items-center justify-center border-b border-ember/60 px-1 align-baseline font-mono text-[0.7em] leading-none text-ember transition-colors hover:bg-ember/15 focus-visible:bg-ember/15"
      >
        {text}
      </button>
      {open && (
        <div
          id={`${id}-panel`}
          role="region"
          aria-label="Case file citation"
          onPointerEnter={openNow}
          onPointerLeave={scheduleClose}
          className="absolute left-0 top-[1.6em] z-30 block w-72 max-w-[85vw] border border-line-strong bg-ink-3 p-3 text-left shadow-[0_12px_40px_rgba(122,92,46,0.28)]"
        >
          <span className="kicker mb-1.5 block">Case file · source</span>
          <ul className="flex flex-col gap-2">
            {sources.map((s) => (
              <li key={s.ref} className="flex flex-col gap-0.5">
                <span className="flex items-baseline gap-1.5 font-sans text-[0.8rem] leading-snug text-paper">
                  <span className="font-mono text-[0.7rem] text-paper-faint">
                    [{s.ref}]
                  </span>
                  {s.title}
                </span>
                <span className="meta-mono">
                  {s.outlet}
                  {s.date ? ` · ${s.date}` : ""}
                  {s.url ? (
                    <a
                      className="ml-2 text-ember underline decoration-ember/40 underline-offset-2 hover:text-ember-bright"
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      tabIndex={open ? 0 : -1}
                    >
                      open ↗
                    </a>
                  ) : (
                    <span className="ml-2 text-paper-faint">· no public URL in case bibliography</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
}