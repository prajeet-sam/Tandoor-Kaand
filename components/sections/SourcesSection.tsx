import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  sources,
  editorialNote,
  visualizationMethodology,
  limitations,
  onTheVictim,
  codeMappings,
  bnsNote,
} from "@/data";

/**
 * 4.10 - Sources, Limitations & Methodology. Transparent closing section:
 * editorial notes first, then the full reference list. No gimmicks.
 */
export function SourcesSection() {
  return (
    <Section
      id="sources"
      index="10"
      kicker="Sources, limitations & methodology"
      title={
        <>
          The record,
          <br />
          <span className="text-paper-dim">and its limits</span>
        </>
      }
      intro={editorialNote}
    >
{/* methodology */}
      <Reveal>
        <div className="border border-line bg-ink-3 p-6 sm:p-10">
          <h3 className="display text-[1.6rem] text-paper">
            {visualizationMethodology.heading}
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {visualizationMethodology.items.map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[0.55rem] text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="note text-paper-dim">{m}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* code mapping: IPC then, BNS now */}
      <Reveal>
        <div className="mt-6 border border-line bg-ink-2 p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="kicker text-ember">Code then · code now</h3>
            <p className="meta-mono text-[0.62rem] text-paper-faint">
              Indian Penal Code, 1860 &rarr; Bharatiya Nyaya Sanhita, 2023
            </p>
          </div>
          <div className="mt-4 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {codeMappings.map((m) => (
              <div key={m.ipc} className="bg-ink-3 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="display text-[1.05rem] text-paper">{m.ipc}</p>
                  <p className="font-mono text-[0.75rem] text-ember-bright">
                    &rarr; {m.bns}
                  </p>
                </div>
                <p className="note mt-1 text-paper-dim">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="note mt-3 text-paper-faint">{bnsNote}</p>
        </div>
      </Reveal>

      {/* on the victim */}
      <Reveal>
        <div className="mt-6 border border-sage/40 bg-ink-3 p-6 sm:p-8">
          <p className="note flex items-start gap-3 text-paper-dim">
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-sage">&#9670;</span>
            {onTheVictim}
          </p>
        </div>
      </Reveal>

      {/* limitations */}
      <Reveal>
        <h3 className="display mt-14 mb-6 text-[1.6rem] text-paper">
          Limitations of this case study
        </h3>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {limitations.map((lim, i) => (
          <Reveal key={lim.id} delay={i * 0.03}>
            <div className="border border-line bg-ink-3 p-5">
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[0.55rem] text-paper-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[0.85rem] uppercase tracking-[0.08em] text-paper">
                  {lim.heading}
                </span>
              </p>
              <p className="note mt-2 text-paper-dim">{lim.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* references */}
      <Reveal>
        <h3 className="display mt-16 mb-2 text-[1.6rem] text-paper">
          References
        </h3>
        <p className="note mb-6 text-paper-dim">
          Listed as supplied in the case bibliography. Entries with a public
          URL are live links; the remainder are shown as bibliography text.
        </p>
      </Reveal>
      <ol className="flex list-none m-0 flex-col">
        {sources.map((s) => (
          <li
            key={s.ref}
            className="group flex items-baseline gap-4 border-b border-line py-3"
          >
            <span className="w-7 shrink-0 font-mono text-[0.65rem] text-paper-faint">
              {String(s.ref).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-sans text-[0.95rem] text-paper">
                  {s.title}
                </span>
              </p>
              <p className="meta-mono">
                <span className="text-paper-dim">{s.outlet}</span>
                {s.date ? (
                  <span className="text-paper-faint"> &middot; {s.date}</span>
                ) : null}
              </p>
            </div>
            <span className="shrink-0">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-line-strong px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ember transition-colors hover:border-ember hover:bg-ember/10 hover:text-ember-bright"
                >
                  open
                </a>
              ) : (
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper-faint">
                  no url
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>

<Reveal>
        <div className="mt-12 border-t border-line pt-8 text-center">
          <span aria-hidden="true" className="stamp mb-8">
            File closed · 19 Dec 2018
          </span>
          <p className="font-sans text-[0.8rem] uppercase tracking-[0.14em] text-paper-dim">
            Case study prepared by
          </p>
          <a
            href="https://www.linkedin.com/in/anushka-vinay-chitnis-697b0540b/"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-block text-ember transition-colors hover:text-ember-bright"
          >
            <span className="display text-[1.5rem]">Anushka Vinay Chitnis</span>
          </a>
          <p className="meta-mono mt-10 border-t border-line pt-6 text-paper-faint">
            End of record · file closed &middot; an editorial reconstruction of
            the public record &middot; 1995&ndash;2018
          </p>
</div>
      </Reveal>

      <p className="mt-10 flex items-center justify-end gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-faint">
        <span className="inline-block h-px w-8 bg-line-strong" aria-hidden="true" />
        Website made by
        <a
          href="https://www.linkedin.com/in/prajeet-sam-025117419/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-paper-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember-bright"
        >
          Prajeet Sam
        </a>
      </p>
    </Section>
  );
}
