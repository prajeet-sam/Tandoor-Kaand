import type { Tag, TimelineEntry } from "./types";

const b: Tag = { label: "Ballistic", kind: "ballistic" };
const trace: Tag = { label: "Trace evidence", kind: "trace" };
const autopsy: Tag = { label: "Autopsy", kind: "autopsy" };
const doc: Tag = { label: "Document", kind: "document" };
const arrest: Tag = { label: "Arrest", kind: "arrest" };
const ipc302: Tag = { label: "IPC 302", kind: "legal" };
const ipcTriple: Tag = { label: "IPC 120-B · 302 · 201", kind: "legal" };
const crpc: Tag = { label: "S.354(3) CrPC", kind: "legal" };

/**
 * Section 8.5 — every dated event, verbatim.
 * `zone` marks the two visual densities: `crime` (the compressed first night
 * and immediate aftermath) vs `judicial` (the long tail of appeals).
 * `iso` is a machine-readable anchor used for to-scale axis positioning.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "t-shooting",
    zone: "crime",
    iso: "1995-07-02",
    date: "2 July 1995 · night",
    title: "The shooting",
    description:
      "Sushil Sharma shoots his wife Naina Sahni dead at their Mandir Marg flat, suspecting infidelity with colleague Matloob Karim after an angry phone confrontation; he shoots her thrice with his licensed revolver.",
    tags: [b, ipc302],
  },
  {
    id: "t-transport",
    zone: "crime",
    iso: "1995-07-02",
    date: "Same night",
    title: "The drive to Bagiya",
    description:
      "He transports the body in his Maruti car's trunk to the Bagiya Bar-be-Que restaurant and attempts to incinerate it in the tandoor with the help of restaurant employee Keshav Kumar.",
    tags: [trace],
  },
  {
    id: "t-recovery",
    zone: "crime",
    iso: "1995-07-03",
    date: "2–3 July 1995 · early hours",
    title: "The tandoor is opened",
    description:
      "Police recover the burnt remains of Naina Sahni from the tandoor at the Bagiya restaurant; restaurant manager Keshav Kumar is arrested on the spot.",
    tags: [arrest, autopsy],
  },
  {
    id: "t-arrest",
    zone: "crime",
    iso: "1995-07-10",
    date: "10 July 1995",
    title: "Sharma arrested in Bangalore",
    description:
      "Prime accused Sushil Sharma is arrested in Bangalore, produced before a local court, and brought to Delhi on transit remand.",
    tags: [arrest],
  },
  {
    id: "t-chargesheet",
    zone: "crime",
    iso: "1995-07-27",
    date: "27 July 1995",
    title: "Chargesheet filed",
    description: "Delhi Police files a 19-page chargesheet against Sharma.",
    tags: [doc],
  },
  {
    id: "t-charges",
    zone: "crime",
    iso: "1996-05-09",
    date: "9 May 1996",
    title: "Charges framed",
    description:
      "The Additional Sessions Judge frames charges against Sharma and Keshav Kumar under IPC Sections 120-B (criminal conspiracy), 302 (murder), and 201 (destruction of evidence).",
    tags: [ipcTriple],
  },
  {
    id: "t-conviction",
    zone: "judicial",
    iso: "2003-11-03",
    date: "3 November 2003",
    title: "Convicted of murder",
    description:
      "The Additional Sessions Judge convicts Sharma of murder.",
    tags: [ipc302],
  },
  {
    id: "t-sentence",
    zone: "judicial",
    iso: "2003-11-07",
    date: "7 November 2003",
    title: "Death sentence",
    description:
      "Sharma is sentenced to death; restaurant manager Keshav Kumar is sentenced to seven years' rigorous imprisonment.",
    tags: [ipc302],
  },
  {
    id: "t-appeal",
    zone: "judicial",
    iso: "2003-12-01",
    date: "December 2003",
    title: "Appeal to the High Court",
    description:
      "Sharma appeals to the Delhi High Court, challenging the trial court's judgment.",
    tags: [ipc302],
  },
  {
    id: "t-hearing",
    zone: "judicial",
    iso: "2006-08-01",
    date: "August 2006",
    title: "Day-to-day hearing begins",
    description:
      "The High Court begins hearing the case on a day-to-day basis.",
    tags: [doc],
  },
  {
    id: "t-hc",
    zone: "judicial",
    iso: "2007-02-19",
    date: "19 February 2007",
    title: "High Court upholds death",
    description:
      "The Delhi High Court upholds Sharma's death sentence.",
    tags: [ipc302],
  },
  {
    id: "t-sc",
    zone: "judicial",
    iso: "2013-10-08",
    date: "8 October 2013",
    title: "Supreme Court commutes to life",
    description:
      "The Supreme Court commutes Sharma's death sentence to life imprisonment, ruling that there was no evidence Sharma had actually chopped up his wife's body, and that brutality alone did not justify a death sentence in this case.",
    tags: [crpc, autopsy],
  },
  {
    id: "t-parole",
    zone: "judicial",
    iso: "2014-09-15",
    date: "15 September 2014 · approx.",
    title: "First parole",
    description:
      "Sharma gets parole for the first time since his arrest.",
    tags: [doc],
  },
  {
    id: "t-srb",
    zone: "judicial",
    iso: "2018-04-21",
    date: "21 April · years later",
    title: "Appeal after 21 years in jail",
    description:
      "Sharma appeals to the Delhi High Court for early release after 21 years in jail, after the Sentence Review Board rejects his plea for premature release.",
    tags: [doc],
  },
  {
    id: "t-release",
    zone: "judicial",
    iso: "2018-12-21",
    date: "21 December 2018",
    title: "Ordered released",
    description:
      "The Delhi High Court orders Sharma's immediate ('forthwith') release, ruling the Sentence Review Board's rejection was 'arbitrary and without application of mind.'",
    tags: [doc],
  },
];

export const timelineZones = [
  {
    id: "crime",
    label: "The crime & arrest",
    timespan: "2–3 July 1995 · hours",
    note: "Compressed. The shooting, transport, discovery and arrest unfolded within a single night.",
  },
  {
    id: "judicial",
    label: "The appeals",
    timespan: "1996 → 21 December 2018 · 23 years",
    note: "Long-stretched. From chargesheet to release, the legal process ran for more than two decades.",
  },
] as const;

export const timelineIntro =
  "Draw the scope of the case with your cursor. The night itself was hours; the legal aftermath was twenty-three years. Event spacing is drawn to scale, with a marked break where the time scale changes.";

export const timelineSources = [1, 2, 3];