import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EvidenceTag } from "@/components/EvidenceTag";
import { legacyTakeaways, legacyClose } from "@/data";

/**
 * 4.9 - Why This Case Matters (Forensic Legacy).
 * Section 8.9 objectives reframed as reader-facing takeaways.
 */
export function LegacySection() {
  return (
    <Section
      id="legacy"
      index="09"
      kicker="Why this case matters"
      title={
        <>
          What the tandoor
          <br />
          <span className="text-paper-dim">taught the record</span>
        </>
      }
      intro="Six takeaways from a case that has been studied in Indian forensic and legal training for decades."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {legacyTakeaways.map((tk, i) => (
          <Reveal key={tk.id} delay={i * 0.04}>
            <div className="border border-line bg-ink-3 p-6 sm:p-8">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-paper-faint">
                Takeaway {String(tk.objective).padStart(2, "0")}
              </p>
              <h3 className="display mt-2 text-[clamp(1.3rem,2.4vw,1.7rem)] text-paper">
                {tk.heading}
              </h3>
              <p className="note mt-3 text-paper-dim">{tk.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
                {tk.tags.map((t) => (
                  <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <blockquote className="mt-16 border-l-2 border-ember/60 pl-6 py-6">
          <p className="display max-w-4xl text-[clamp(1.5rem,3vw,2.4rem)] text-paper-dim">
            {legacyClose}
          </p>
        </blockquote>
      </Reveal>
    </Section>
  );
}
