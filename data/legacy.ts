import type { Tag } from "./types";

const ballistic: Tag = { label: "Ballistic chain", kind: "ballistic" };
const dna: Tag = { label: "DNA profiling", kind: "dna" };
const trace: Tag = { label: "Trace evidence", kind: "trace" };
const autopsy: Tag = { label: "Methodology", kind: "autopsy" };
const eye: Tag = { label: "Circumstantial case", kind: "eyewitness" };
const legal: Tag = { label: "Capital sentencing", kind: "legal" };

/**
 * Section 8.9, reframed as reader-facing takeaways (not an academic list).
 * Every takeaway maps to one stated objective.
 */
export interface LegacyTakeaway {
  id: string;
  heading: string;
  body: string;
  tags: Tag[];
  objective: number;
}

export const legacyTakeaways: LegacyTakeaway[] = [
  {
    id: "lk-1",
    heading: "The crime chain was rebuilt from three places",
    body: "Ballistics, DNA and autopsy evidence reconstructed the route murder scene → vehicle → disposal site — even though no one directly witnessed the shooting itself.",
    tags: [ballistic, dna],
    objective: 1,
  },
  {
    id: "lk-2",
    heading: "Staging fails against physical evidence",
    body: "Incineration failed to erase bullets, bone fragments and blood traces. Physical evidence outlived the cover story — where witness-dependent accounts wavered, the record didn't.",
    tags: [trace, ballistic],
    objective: 2,
  },
  {
    id: "lk-3",
    heading: "Method decides what evidence says",
    body: "The flawed first autopsy and the X-ray-assisted second autopsy are a case study in investigative quality control: the same remains, two opposite readings, the difference being method.",
    tags: [autopsy],
    objective: 3,
  },
  {
    id: "lk-4",
    heading: "A fully circumstantial case, tried under the IPC",
    body: "The prosecution built the case entirely on circumstantial and forensic evidence, and the courts weighed it under IPC Sections 302, 201 and 120-B.",
    tags: [eye, legal],
    objective: 4,
  },
  {
    id: "lk-5",
    heading: "Death penalty reasoning has a staircase",
    body: "The same facts produced a death sentence at trial and in the High Court, but life imprisonment at the Supreme Court — via the 'rarest of rare' doctrine and mitigating factors.",
    tags: [legal],
    objective: 5,
  },
  {
    id: "lk-6",
    heading: "A 1995 case, read with today's toolkit",
    body: "DNA database matching, digital chain-of-custody tracking and ballistic-matching software would reframe this case entirely — none of it existed in 1995.",
    tags: [dna, ballistic],
    objective: 6,
  },
];

export const legacyClose =
  "The tandoor was meant to be the end of the story — all evidence reduced to ash. Instead it became the reason the case is still studied: a demonstration of what physical evidence survives, and what it can reconstruct.";