import type { EvidenceKind } from "@/data";

const KIND_STYLES: Record<EvidenceKind, string> = {
  ballistic: "border-ember/50 text-ember-bright",
  dna: "border-sage/50 text-sage",
  trace: "border-paper-faint/60 text-paper-dim",
  eyewitness: "border-sand/50 text-sand",
  autopsy: "border-ember-bright/50 text-ember-bright",
  legal: "border-rust-bright/60 text-rust-bright",
  document: "border-line-strong text-paper-dim",
  arrest: "border-sage/40 text-sage",
};

interface EvidenceTagProps {
  label: string;
  kind: EvidenceKind;
}

/**
 * Small reusable pill stamped throughout the piece so readers learn "what
 * kind of evidence / legal reference" is being discussed at a glance.
 */
export function EvidenceTag({ label, kind }: EvidenceTagProps) {
  return (
    <span
      data-evidence-kind={kind}
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] leading-4 ${KIND_STYLES[kind]}`}
    >
      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}