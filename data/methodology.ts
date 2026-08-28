/**
 * Section 4.10 content — Section 8.10 (Limitations) reframed as an honest
 * editorial note, plus the methodology transparency notes the brief requires
 * (editorial visualizations, disputed facts).
 */
export interface Limitation {
  id: string;
  heading: string;
  body: string;
}

export const editorialNote =
  "If this reads like a documentary's closing credits, that is deliberate. Below is the honest list of what this piece drew on — and what it cannot claim.";

export const visualizationMethodology = {
  heading: "Methodology · how this piece was built",
  items: [
    "The map, timeline, crime-scene diagram and verdict ladder are editorial visualizations built from court records and news reporting — not official documents.",
    "The three-scene diagram is stylized: the sites are real, but positions are approximate and not to scale. Exact coordinates were not part of the sourced case study.",
    "The timeline draws event density to time scale, with a marked break — the crime unfolded in hours, the legal process across 23 years.",
    "Where the source itself flags a disputed fact — most prominently the dismemberment claim, which the Supreme Court found no evidence for despite wide media repetition — this piece flags it as disputed rather than asserting it.",
    "Neutral legal language is intentional: 'the prosecution alleged,' 'the court found,' 'according to the judgment.'",
  ],
};

export const limitations: Limitation[] = [
  {
    id: "lim-1",
    heading: "Secondary sources",
    body: "This piece relies on court judgments, news archives and legal commentary — not primary case files or forensic laboratory reports.",
  },
  {
    id: "lim-2",
    heading: "Conflicting accounts",
    body: "Sources disagree on points the record itself resolved, such as the dismemberment claim; where they conflict, this piece defers to what the Supreme Court found.",
  },
  {
    id: "lim-3",
    heading: "Dated forensic technology",
    body: "1995-era DNA profiling and manual ballistic matching do not reflect current laboratory capability.",
  },
  {
    id: "lim-4",
    heading: "Single-case generalisation",
    body: "Patterns visible in this case should not be assumed to generalise to other cases.",
  },
  {
    id: "lim-5",
    heading: "Legal & procedural specificity",
    body: "The case was governed by the Indian Penal Code and Indian criminal procedure of its time.",
  },
  {
    id: "lim-6",
    heading: "No direct witness to the crime",
    body: "No one testified to the shooting itself; the conviction rests on circumstantial and forensic reconstruction, not eyewitness description of the act.",
  },
  {
    id: "lim-7",
    heading: "Sensationalised public framing",
    body: "Many media and blog accounts dramatize rather than present neutral forensic analysis; this piece works from the sourced record instead.",
  },
  {
    id: "lim-8",
    heading: "No period digital forensics",
    body: "No digital forensic tools or databases existed in 1995. Any modern-technique comparisons here are hypothetical or reconstructive, not drawn from the original investigation.",
  },
];

export const onTheVictim =
  "A final editorial note: this is the story of the murder of Naina Sahni, a named real person. The reconstructed imagery is deliberately absent. Nothing here is a 'reconstruction' of her body or her death — only of the evidentiary record around it.";

export const codeMappings = [
  {
    ipc: "IPC 302",
    label: "Punishment for murder",
    bns: "BNS 103",
  },
  {
    ipc: "IPC 201",
    label: "Causing disappearance of evidence",
    bns: "BNS 238",
  },
  {
    ipc: "IPC 120-B",
    label: "Criminal conspiracy",
    bns: "BNS 61",
  },
];

export const bnsNote =
  "The case was tried wholly under the Indian Penal Code, 1860. Since 1 July 2024 the Bharatiya Nyaya Sanhita, 2023 renumbers these offences — the same charges are now cited by their BNS equivalents.";