import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Footnote } from "@/components/Footnote";
import { summaryBeats, timelineSources } from "@/data";

/**
 * 4.2 — The Summary. The whole shape of the case in one scroll, as a case
 * abstract set for pacing. Content is Section 8.1 verbatim, split into five
 * beats for scroll reveal.
 */
export function SummarySection() {
  return (
    <Section
      id="summary"
      index="02"
      kicker="The case in sixty seconds"
      title={
        <>
          The shape of the case,
          <br className="hidden sm:block" /> before the depth
        </>
      }
      intro="Read as an abstract — then the sections below take it apart, evidence by evidence, court by court."
      sources={timelineSources}
    >
      <div className="flex flex-col gap-20">
        {summaryBeats.map((beat, i) => (
          <Reveal key={beat.id} delay={i * 0.05}>
            <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <p className="kicker pt-2 md:text-right">
                Beat {String(i + 1).padStart(2, "0")}
                <span aria-hidden="true" className="block text-paper-faint">
                  {beat.meta}
                </span>
              </p>
              <p className="display max-w-3xl text-[clamp(1.5rem,3.2vw,2.4rem)] text-paper">
                {beat.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="meta-mono mt-20 flex flex-wrap items-center gap-x-2 gap-y-1 border-line pt-6">
          <span>Summary drawn from the case record</span>
          <Footnote refs={timelineSources} />
          <span aria-hidden="true" className="text-ember/60">
            ↓
          </span>
          <span className="text-paper-faint">the detail follows</span>
        </div>
      </Reveal>
    </Section>
  );
}