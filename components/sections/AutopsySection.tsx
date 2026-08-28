"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EvidenceTag } from "@/components/EvidenceTag";
import {
  autopsyIntro,
  autopsyPanels,
  autopsyConflict,
  autopsyDisputedNote,
  autopsySources,
} from "@/data";
import type { AutopsyPanel } from "@/data";

/**
 * 4.7 — The Autopsy Contradiction. A before / after toggle comparing the
 * first post-mortem against the X-ray-assisted second post-mortem led by
 * Dr. T.D. Dogra, AIIMS. The contradiction strip below stays visible in
 * both readings.
 */
export function AutopsySection() {
  const [activeId, setActiveId] = useState("autopsy-2");
  const active = autopsyPanels.find((p) => p.id === activeId) ?? autopsyPanels[1];

  return (
    <Section
      id="autopsy"
      index="07"
      kicker="The autopsy contradiction"
      title={
        <>
          Two autopsies.
          <br />
          <span className="text-paper-dim">Two opposite answers.</span>
        </>
      }
      intro={autopsyIntro}
      sources={autopsySources}
    >
      {/* toggle */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Compare the two autopsies"
          className="mb-6 flex flex-col gap-2 sm:flex-row"
        >
          {autopsyPanels.map((p) => (
            <button
              key={p.id}
              role="tab"
              type="button"
              id={`tab-${p.id}`}
              aria-selected={activeId === p.id}
              aria-controls={`panel-${p.id}`}
              onClick={() => setActiveId(p.id)}
              className={`border px-5 py-3 text-left transition-colors sm:flex-1 ${
                activeId === p.id
                  ? p.tone === "flawed"
                    ? "border-rust-bright bg-ink-3 text-rust-bright"
                    : "border-ember-bright bg-ink-3 text-ember-bright"
                  : "border-line-strong text-paper-dim hover:border-line-strong hover:text-paper"
              }`}
            >
              <span className="block font-sans text-[0.85rem] uppercase tracking-[0.08em]">
                {p.shortLabel}
              </span>
              <span className="block font-mono text-[0.62rem] normal-case tracking-[0.1em] text-paper-faint">
                {p.longLabel}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* active panel */}
      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}>
        <AutopsyPanelView panel={active} key={active.id} />
      </div>

      {/* contradiction strip — always visible */}
      <Reveal>
        <div className="mt-8 border border-line bg-ink-3 p-6 sm:p-8">
          <p className="kicker mb-4">{autopsyConflict.heading}</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2 border-l-2 border-rust/60 pl-4">
              <p className="meta-mono text-rust-bright">Autopsy One</p>
              <p className="story-body text-[1.05rem] text-paper-dim">
                {autopsyConflict.first}
              </p>
            </div>
            <div className="flex flex-col gap-2 border-l-2 border-ember/60 pl-4">
              <p className="meta-mono text-ember-bright">Autopsy Two</p>
              <p className="story-body text-[1.05rem] text-paper-dim">
                {autopsyConflict.second}
              </p>
            </div>
          </div>
          <p className="note mt-5 flex items-start gap-2 border-t border-line pt-4 text-paper-dim">
            <span className="shrink-0 font-mono text-[0.6rem] tracking-[0.14em] text-ember">
              DISPUTED FACT
            </span>
            {autopsyDisputedNote}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function AutopsyPanelView({ panel }: { panel: AutopsyPanel }) {
  const accent =
    panel.tone === "flawed"
      ? "border-rust-bright text-rust-bright"
      : "border-ember-bright text-ember-bright";
  const soft = panel.tone === "flawed" ? "bg-rust/10" : "bg-ember/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="border border-line bg-ink-3"
    >
      <div className={`flex flex-col gap-1 border-b border-line px-6 py-5 sm:px-8`}>
        <p className={`meta-mono border-l-2 pl-3 ${accent}`}>
          {panel.longLabel}
        </p>
        <dl className="meta-mono mt-2 flex flex-col gap-1 pl-3 text-paper-dim">
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-paper-faint">Performed by:</dt>
            <dd>{panel.performedBy}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-paper-faint">Ordered:</dt>
            <dd>{panel.orderedBy}</dd>
          </div>
        </dl>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <div className={`mb-5 border px-4 py-3 ${soft}`}>
          <p className="kicker mb-1">Method</p>
          <p className="note text-paper-dim">{panel.method}</p>
        </div>

        <p className="kicker mb-3">Findings</p>
        <ul className="flex flex-col gap-3">
          {panel.findings.map((f, i) => (
            <li key={i} className="flex flex-col gap-1.5">
              <p className="story-body text-[1.05rem] text-paper-dim">{f.text}</p>
              {f.disputed && (
                <span className="inline-flex w-fit items-center gap-1.5 border border-rust/60 bg-rust/10 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-rust-bright">
                  Disputed · not established
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 border-l-2 border-line pl-4">
          <p className="kicker mb-1">What the panel concluded</p>
          <p className="story-body text-paper">{panel.conclusion}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
          {panel.flags.map((f) => (
            <EvidenceTag key={f} label={f} kind="autopsy" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}