import { Reveal } from "@/components/Reveal";
import type { Person } from "@/data";

const TONE_BORDER: Record<Person["roleTone"], string> = {
  victim: "border-sage/60",
  accused: "border-rust/60",
  accessory: "border-sand/50",
  witness: "border-ember/50",
};

const TONE_LABEL: Record<Person["roleTone"], string> = {
  victim: "text-sage",
  accused: "text-rust-bright",
  accessory: "text-sand",
  witness: "text-ember-bright",
};

/**
 * Case-file profile card for a person in the record. `compact` renders a
 * smaller row style for supporting persons.
 */
export function PersonCard({
  person,
  delay = 0,
  compact = false,
}: {
  person: Person;
  delay?: number;
  compact?: boolean;
}) {
  const border = TONE_BORDER[person.roleTone];
  const label = TONE_LABEL[person.roleTone];

  if (compact) {
    return (
      <Reveal delay={delay}>
        <div className={`border ${border} bg-ink-3 p-5`}>
          <p className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="display text-[1.4rem] text-paper">{person.name}</span>
            <span className={`font-mono text-[0.62rem] uppercase tracking-[0.18em] ${label}`}>
              {person.role}
            </span>
          </p>
          <p className="note mt-2 text-paper-dim">{person.note}</p>
          <ul className="mt-3 flex flex-col gap-1">
            {person.facts.map((f) => (
              <li key={f.label} className="meta-mono flex flex-wrap gap-x-2">
                <span className="text-paper-faint">{f.label}:</span>
                <span className="text-paper-dim">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <div className={`border ${border} bg-ink-3 lg:sticky lg:top-10`}>
        <div className="border-b border-line px-7 py-5">
          <p className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] ${label}`}>
            Case-file profile · {person.role}
          </p>
        </div>
        <div className="px-7 py-6">
          <p className="display text-[clamp(2rem,3.4vw,2.7rem)] text-paper">
            {person.name}
          </p>
          <p className="note mt-3 text-paper-dim">{person.note}</p>
          <dl className="mt-5 flex flex-col gap-3 border-line pt-5">
            {person.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-3">
                <dt className="meta-mono pt-0.5 text-paper-faint">{f.label}</dt>
                <dd className="meta-mono text-paper-dim">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Reveal>
  );
}