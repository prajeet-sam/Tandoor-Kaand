"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EvidenceTag } from "@/components/EvidenceTag";
import { stagingRows, stagingIntro, stagingSources } from "@/data";

/**
 * 4.6 — Staging vs. Detection. The interactive centerpiece: a two-column
 * "attempt vs. outcome" defeat map. Left, what the accused hoped would end
 * the case; right, the physical record that survived. Contents reveal on
 * hover or block-level focus; a toggle pins them open for touch/keyboard.
 */
export function StagingSection() {
  return (
    <Section
      id="staging"
      index="06"
      kicker="Staging vs. detection"
      title={
        <>
          The cover-up had a plan.
          <br />
          <span className="text-paper-dim">The evidence never read it.</span>
        </>
      }
      intro={stagingIntro}
      sources={stagingSources}
      tone="deep"
    >
      {/* column heads */}
      <div className="mb-5 hidden items-stretch gap-6 md:grid md:grid-cols-[1fr_4.5rem_1fr]">
        <p className="kicker border-b border-line pb-2 text-rust-bright">
          The staging · what was tried
        </p>
        <span aria-hidden="true" className="border-b border-transparent" />
        <div className="flex items-center justify-between gap-4 border-b border-line pb-2">
          <p className="kicker text-ember-bright">
            Forensic detection · what survived
          </p>
          <span aria-hidden="true" className="stamp stamp-ink stamp-sm shrink-0">
            Evidence received
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {stagingRows.map((row, i) => (
          <StagingRow key={row.id} row={row} index={i + 1} />
        ))}
      </div>

      <Reveal>
        <p className="note mt-10 max-w-3xl border-l-2 border-ember/40 pl-4 text-paper-dim">
          Read the right column as the record itself: each claim the staging
          was designed to erase is sitting there in the physical evidence.
          Hover or focus to bring it up; the ↔ controls pin it open.
        </p>
      </Reveal>
    </Section>
  );
}

function StagingRow({
  row,
  index,
}: {
  row: (typeof stagingRows)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const id = `staging-${row.id}`;

  return (
    <div
      role="group"
      aria-labelledby={`${id}-att`}
      className={`group relative grid gap-5 border bg-ink-3 transition-colors duration-300 md:grid-cols-[1fr_4.5rem_1fr] md:gap-6 ${
        open ? "border-ember/45" : "border-line"
      }`}
    >
      {/* ghost index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-2 font-serif text-[3.4rem] leading-none text-paper-faint/45 select-none"
      >
        {String(index).padStart(2, "0")}
      </span>

      {/* left — the attempt */}
      <div className="flex flex-col gap-3 px-6 pb-6 pt-6 md:py-8">
        <p className="kicker text-rust-bright">{row.attemptLabel}</p>
        <h3
          id={`${id}-att`}
          className="display max-w-md text-[clamp(1.4rem,2.6vw,1.9rem)] text-paper"
        >
          {row.attempt}
        </h3>
        <p className="note max-w-md text-paper-dim">{row.attemptDetail}</p>
      </div>

      {/* connector */}
      <div aria-hidden="true" className="hidden flex-col items-center justify-center md:flex">
        <span className="h-10 w-px bg-line-strong" />
        <motion.span
          animate={{ x: open ? 3 : 0 }}
          className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${
            open ? "border-ember bg-ember/15 text-ember-bright" : "border-line-strong text-paper-faint"
          }`}
        >
          →
        </motion.span>
        <span className="h-10 w-px bg-line-strong" />
      </div>

      {/* right — the counter-evidence */}
      <div className="flex flex-col gap-4 border-t border-line px-6 py-6 md:border-t-0 md:py-8">
        <div className="flex items-start justify-between gap-3">
          <p className="kicker text-ember-bright">{row.counterLabel}</p>
          <button
            type="button"
            id={`${id}-toggle`}
            aria-expanded={open}
            aria-controls={`${id}-reveal`}
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 border border-line-strong px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-dim transition-colors hover:border-ember/60 hover:text-ember-bright focus-visible:border-ember"
          >
            {open ? "hide" : "reveal"}
          </button>
        </div>

        <div
          id={`${id}-reveal`}
          className={`flex flex-col gap-3 transition-[opacity,filter] duration-500 ${
            open
              ? "opacity-100 blur-0"
              : "opacity-35 blur-[1.5px] group-hover:opacity-100 group-hover:blur-0 group-focus-within:opacity-100 group-focus-within:blur-0"
          }`}
        >
          <p className="display max-w-md text-[clamp(1.4rem,2.6vw,1.9rem)] text-paper">
            {row.counter}
          </p>
          <p className="note max-w-md text-paper-dim">{row.counterDetail}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {row.tags.map((t) => (
              <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}