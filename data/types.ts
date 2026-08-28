export type EvidenceKind =
  | "ballistic"
  | "dna"
  | "trace"
  | "eyewitness"
  | "autopsy"
  | "legal"
  | "document"
  | "arrest";

export interface Tag {
  label: string;
  kind: EvidenceKind;
}

export type TimelineZone = "crime" | "judicial";

export interface TimelineEntry {
  id: string;
  iso: string;
  date: string;
  title: string;
  description: string;
  tags: Tag[];
  zone: TimelineZone;
}

export interface SceneEvidence {
  text: string;
  tags: Tag[];
}

export interface SceneNode {
  id: string;
  code: string;
  name: string;
  location: string;
  timing: string;
  whatHappened: string[];
  evidence: SceneEvidence[];
  link: string;
  placeLabel: string;
}

export interface StagingRow {
  id: string;
  attemptLabel: string;
  attempt: string;
  attemptDetail: string;
  counterLabel: string;
  counter: string;
  counterDetail: string;
  tags: Tag[];
}

export type VerdictSeverity =
  | "death"
  | "death-uphold"
  | "life"
  | "rejected"
  | "release";

export interface VerdictTier {
  id: string;
  court: string;
  date: string;
  outcome: string;
  outcomeDetail: string;
  reasoning: string[];
  tags: Tag[];
  severity: VerdictSeverity;
}

export interface Source {
  ref: number;
  outlet: string;
  title: string;
  date?: string;
  url?: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  roleTone: "victim" | "accused" | "accessory" | "witness";
  facts: { label: string; value: string }[];
  note: string;
}

export interface AutopsyPanel {
  id: string;
  shortLabel: string;
  longLabel: string;
  performedBy: string;
  orderedBy?: string;
  method: string;
  findings: { text: string; disputed?: boolean }[];
  conclusion: string;
  flags: string[];
  tone: "flawed" | "rigorous";
}