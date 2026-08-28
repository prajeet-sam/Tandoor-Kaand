export const techNote =
  "1995-era DNA profiling and manual ballistic matching, not current laboratory capability.";

/**
 * Section 2 summary beats — Section 8.1, verbatim, split for scroll pacing.
 */
export interface SummaryBeat {
  id: string;
  meta: string;
  text: string;
  sources: number[];
}

export const summaryBeats: SummaryBeat[] = [
  {
    id: "beat-01",
    meta: "The suspicion",
    text: "Sushil Sharma suspected his wife, Naina Sahni, of having an affair with a colleague.",
    sources: [1, 2, 3],
  },
  {
    id: "beat-02",
    meta: "The night",
    text: "One night, after catching her on a phone call with him, Sharma flew into a rage and shot her dead.",
    sources: [1, 2, 3],
  },
  {
    id: "beat-03",
    meta: "The cover-up",
    text: "To destroy the evidence, he drove her body to a restaurant and tried to burn it in the large clay tandoor oven there — but the smell of burning flesh caught a patrolling constable's attention, exposing the crime.",
    sources: [1, 3, 7],
  },
  {
    id: "beat-04",
    meta: "The conviction",
    text: "Sharma went on the run before eventually surrendering and was convicted largely on the strength of forensic evidence, especially DNA testing that linked the blood in his car and at the scene back to Naina.",
    sources: [1, 8],
  },
  {
    id: "beat-05",
    meta: "The sentence",
    text: "His death sentence was later commuted to life imprisonment, and he was eventually released on parole.",
    sources: [2, 3, 8],
  },
];