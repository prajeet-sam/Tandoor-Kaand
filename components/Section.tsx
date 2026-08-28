import { Reveal } from "./Reveal";
import { Footnote } from "./Footnote";

interface SectionProps {
  id: string;
  index: string;
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  sources?: number[];
  children: React.ReactNode;
  tone?: "default" | "deep";
}

/**
 * Shared full-bleed section chrome: numbered kicker, serif display title,
 * optional intro lead, then the section's content. Semantic <section> with
 * the title wired to aria-labelledby.
 */
export function Section({
  id,
  index,
  kicker,
  title,
  intro,
  sources,
  children,
  tone = "default",
}: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`relative scroll-mt-16 border-line ${tone === "deep" ? "bg-ink-2" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <div className="mb-14 md:mb-20">
            <div className="hairline mb-6 flex items-start justify-between gap-6">
              <p className="kicker pt-4">
                <span aria-hidden="true" className="text-paper-faint">
                  {index} ·
                </span>{" "}
                {kicker}
              </p>
              {sources && sources.length > 0 ? (
                <div className="meta-mono flex items-center gap-3 pt-4 text-right">
                  <span className="hidden text-[0.62rem] tracking-[0.18em] text-paper-faint sm:inline">
                    SHEET {index}/10
                  </span>
                  Sources <Footnote refs={sources} label="§" />
                </div>
              ) : (
                <p className="meta-mono pt-4 text-right text-[0.62rem] tracking-[0.18em] text-paper-faint">
                  SHEET {index}/10
                </p>
              )}
            </div>
            <h2
              id={titleId}
              className="display max-w-4xl text-[clamp(2.1rem,5vw,3.6rem)] text-paper"
            >
              {title}
            </h2>
            {intro && (
              <p className="story-body mt-6 max-w-2xl text-paper-dim">
                {intro}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}