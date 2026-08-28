/**
 * Section 8.2 — Background of the Case.
 * Beats are drawn verbatim from the source; the closing "set the stage"
 * line is the source's own final sentence.
 */
export interface BackgroundBeat {
  id: string;
  meta: string;
  heading: string;
  body: string;
}

export const backgroundIntro =
  "The case the courts called Sushil Sharma v. State (NCT of Delhi) began not in a courtroom but inside a marriage nobody was supposed to know about.";

export const backgroundBeats: BackgroundBeat[] = [
  {
    id: "bg-01",
    meta: "The rising figure",
    heading: "A politician on the way up",
    body: "Sushil Sharma was a rising political figure, active in the Delhi Youth Congress. He was in a relationship with Naina Sahni that had, over time, turned troubled — he was possessive and controlling, harbouring doubts about her fidelity and restricting her personal freedom.",
  },
  {
    id: "bg-02",
    meta: "The fault line",
    heading: "Trying to break free",
    body: "Naina, on her part, was reportedly unhappy in the relationship. She had been trying to distance herself from Sharma, with plans to move away, and had the support of a colleague and friend, Matloob Karim, in doing so.",
  },
  {
    id: "bg-03",
    meta: "The flashpoint",
    heading: "A friendship under suspicion",
    body: "Karim's friendship became a major point of tension, as Sharma grew increasingly suspicious that it was more than platonic.",
  },
  {
    id: "bg-04",
    meta: "The hidden marriage",
    heading: "Married, quietly, in secret",
    body: "The two were said to have married quietly, in their own way, without a public ceremony — a secret marriage Sharma wanted kept hidden because of his political image, something Naina reportedly resented.",
  },
];

export const backgroundClose =
  "This mix of possessiveness, suspicion, a hidden relationship, and Naina's attempts to break free set the stage for the explosive confrontation that followed — one that ended in murder and a botched attempt to cover it up.";

export const backgroundSources = [1, 2, 14];