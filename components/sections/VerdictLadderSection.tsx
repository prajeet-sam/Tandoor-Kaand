"use client";

import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EvidenceTag } from "@/components/EvidenceTag";
import {
  verdictIntro,
  verdictTiers,
  verdictFootNote,
  verdictSources,
} from "@/data";
import type { VerdictSeverity, VerdictTier } from "@/data";

const SEVERITY: Record<
  VerdictSeverity,
  { dot: string; text: string; border: string; label: string }
> = {
  death: { dot: "bg-rust", text: "text-rust-bright", border: "border-rust/60", label: "Capital sentence" },
  "death-uphold": { dot: "bg-rust-bright", text: "text-rust-bright", border: "border-rust/50", label: "Death upheld" },
  life: { dot: "bg-ember", text: "text-ember-bright", border: "border-ember/60", label: "Commutated to life" },
  rejected: { dot: "bg-paper-faint", text: "text-paper-dim", border: "border-line-strong", label: "Plea rejected" },
  release: { dot: "bg-sage", text: "text-sage", border: "border-sage/60", label: "Release ordered" },
};

/**
 * 4.8 — The Verdict Ladder. The same facts, five rungs up the Indian
 * judiciary: trial court → Delhi HC → Supreme Court → Sentence Review
 * Board → Delhi HC (2018). Contains the anchors the scroll-progress acts
 * "Appeals" and "Release" are pinned to.
 */
export function VerdictLadderSection() {
  return (
    <Section
      id="verdict"
      index="08"
      kicker="The verdict ladder"
      title={
        <>
          Five rungs.
          <br />
          <span className="text-paper-dim">Three sentences.</span>
        </>
      }
      intro={verdictIntro}
      sources={verdictSources}
      tone="deep"
    >
      <div className="relative flex flex-col pl-5 sm:pl-8">
        {/* spine */}
        <span
          aria-hidden="true"
          className="absolute bottom-10 left-[7px] top-2 w-px bg-line-strong sm:left-[15px]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-10 left-[7px] h-2 w-2 -translate-x-[3px] rounded-full bg-ember/70 sm:left-[15px]"
        />
        <span
          aria-hidden="true"
          className="stamp absolute right-0 top-0 hidden lg:inline-flex"
        >
          Decision — filed
        </span>

        {verdictTiers.map((tier, i) => (
          <div key={tier.id} className="relative">
            {/* rung marker + connector */}
            <span
              aria-hidden="true"
              className={`absolute left-[7px] top-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border bg-ink-3 sm:left-[15px] ${SEVERITY[tier.severity].border}`}
            >
              <span className={`h-2 w-2 rounded-full ${SEVERITY[tier.severity].dot}`} />
            </span>

            <VerdictCard tier={tier} index={i + 1} />
            {i < verdictTiers.length - 1 && (
              <div aria-hidden="true" className="ml-6 flex justify-start py-1 sm:ml-8">
                <span className="block h-8 w-px bg-line-strong" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Reveal>
        <p className="note mt-10 flex max-w-3xl items-start gap-2 border-l-2 border-sage/50 pl-4 text-paper-dim">
          <span aria-hidden="true" className="mt-0.5 shrink-0 text-sage">
            ◈
          </span>
          {verdictFootNote}
        </p>
      </Reveal>
    </Section>
  );
}

function VerdictCard({ tier, index }: { tier: VerdictTier; index: number }) {
  const s = SEVERITY[tier.severity];
  const isSc = tier.id === "v-sc";
  const isRelease = tier.id === "v-report";

  return (
    <Reveal delay={index * 0.06}>
      <div
        className={`ml-5 border bg-ink-3 transition-colors duration-300 sm:ml-9 ${s.border}`}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-6 py-3 sm:px-8">
          <span className="meta-mono font-mono text-[0.65rem] text-paper-faint">
            RUNG {String(index).padStart(2, "0")}
          </span>
          <p className="meta-mono flex-1 uppercase">
            <span className="text-paper">{tier.court}</span>
          </p>
          <p className="meta-mono text-paper-faint">{tier.date}</p>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${s.dot}`} />
            <h3 className={`display text-[clamp(1.6rem,3vw,2.3rem)] ${s.text}`}>
              {tier.outcome}
            </h3>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-faint">
              {s.label}
            </span>
          </div>

          <p className="story-body mt-4 max-w-3xl text-[1.05rem] text-paper-dim">
            {tier.outcomeDetail}
          </p>

          <ul className="mt-5 flex max-w-3xl flex-col gap-2.5 border-line pt-4">
            {tier.reasoning.map((r, ri) => (
              <li key={ri} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 font-mono text-[0.55rem] text-ember/70">
                  ▶
                </span>
                <p className="note text-paper-dim">{r}</p>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {tier.tags.map((t) => (
              <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
            ))}
          </div>
        </div>
      </div>

      {/* hidden act anchors for the scroll-progress bar */}
      {isSc && (
        <span aria-hidden="true" className="verdict-tier-sc sr-only">
          appeals
        </span>
      )}
      {isRelease && (
        <span aria-hidden="true" className="verdict-tier-release sr-only">
          release
        </span>
      )}
    </Reveal>
  );
}