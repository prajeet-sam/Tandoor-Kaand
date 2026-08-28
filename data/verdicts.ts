import type { Tag, VerdictTier } from "./types";

const ipc302: Tag = { label: "IPC 302", kind: "legal" };
const crpc: Tag = { label: "S.354(3) CrPC", kind: "legal" };
const ipc201: Tag = { label: "IPC 201", kind: "legal" };
const doc: Tag = { label: "Document", kind: "document" };

/**
 * Sections 8.5 (verdict entries) + 8.8 (Post-Verdict Appellate
 * Developments). Five tiers, each with the court's own reasoning.
 */
export const verdictIntro =
  "The same facts climbed the Indian judiciary and produced different sentences at every rung. Watch what changed — and what the higher court said about the reasoning below it.";

export const verdictTiers: VerdictTier[] = [
  {
    id: "v-trial",
    court: "Trial Court · Additional Sessions Judge",
    date: "3 · 7 November 2003",
    outcome: "Convicted · sentenced to death",
    outcomeDetail:
      "Convicted of murder under IPC Section 302. On 7 November 2003, sentenced to death. Restaurant manager Keshav Kumar was sentenced to seven years' rigorous imprisonment.",
    reasoning: [
      "The prosecution's forensic chain — ballistics, DNA, autopsy — had carried a case built without direct testimony of the shooting itself.",
    ],
    tags: [ipc302, ipc201],
    severity: "death",
  },
  {
    id: "v-hc",
    court: "Delhi High Court",
    date: "19 February 2007",
    outcome: "Death sentence upheld",
    outcomeDetail:
      "After day-to-day hearings running from August 2006, the High Court upheld the death sentence.",
    reasoning: [
      "Agreed this was a 'rarest of rare' case, characterising Sharma as a 'power-drunk' politician whose act embodied a societal menace.",
    ],
    tags: [ipc302],
    severity: "death-uphold",
  },
  {
    id: "v-sc",
    court: "Supreme Court of India",
    date: "8 October 2013",
    outcome: "Commutated: death → life imprisonment",
    outcomeDetail:
      "The Supreme Court committed the death sentence to life imprisonment.",
    reasoning: [
      "Brutality alone was insufficient to justify death; the crime stemmed from a possessive motive rooted in a troubled personal relationship, not 'total depravity' or broader societal menace.",
      "Mitigating factors weighed: no prior criminal record, potential for rehabilitation, elderly parents, and a profile suggesting no repeat offence.",
      "Concluded life imprisonment was appropriate under Section 354(3) CrPC.",
      "Found no evidence Sharma had chopped up his wife's body — undercutting part of the narrative used to argue for the death penalty.",
    ],
    tags: [ipc302, crpc],
    severity: "life",
  },
  {
    id: "v-srb",
    court: "Sentence Review Board",
    date: "Years later",
    outcome: "Rejected plea for premature release",
    outcomeDetail:
      "Sharma had served 21 years when the Sentence Review Board rejected his plea; he appealed to the Delhi High Court.",
    reasoning: [
      "The Board's reasoning was later characterised by the High Court as 'arbitrary and without application of mind.'",
    ],
    tags: [doc],
    severity: "rejected",
  },
  {
    id: "v-report",
    court: "Delhi High Court",
    date: "21 December 2018",
    outcome: "Ordered release — 'forthwith'",
    outcomeDetail:
      "The High Court ordered Sharma's immediate release, ruling the Board's rejection arbitrary.",
    reasoning: [
      "The rejection was 'arbitrary and without application of mind.'",
      "Incarceration does not strip a convicted person of all fundamental rights.",
      "By this point, Sharma had spent 23 years in prison.",
    ],
    tags: [doc],
    severity: "release",
  },
];

export const verdictFootNote =
  "Note the last rung: the release order was not a pardon. It came after 23 years served, via the courts — not the Sentence Review Board.";

export const verdictSources = [1, 2, 8, 9];