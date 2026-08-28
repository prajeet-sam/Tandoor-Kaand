import type { Source } from "./types";

/**
 * Section 8.11 — the full reference list. Every entry is rendered as a live
 * link; URLs were verified against the live articles on 28 August 2026.
 */
export const sources: Source[] = [
  {
    ref: 1,
    outlet: "Wikipedia",
    title: "Murder of Naina Sahni",
    url: "https://en.wikipedia.org/wiki/Murder_of_Naina_Sahni",
  },
  {
    ref: 2,
    outlet: "WION News",
    title: "Tandoor murder case: A timeline",
    date: "21 Dec 2018",
    url: "https://www.wionews.com/india-news/tandoor-murder-case-a-timeline-185716",
  },
  {
    ref: 3,
    outlet: "NewsBytes",
    title: "1995 'tandoor' murder case: Killer Sushil Sharma released",
    date: "21 Dec 2018",
    url: "https://www.newsbytesapp.com/news/india/1995-tandoor-murder-case-killer-released/story",
  },
  {
    ref: 4,
    outlet: "Hindustan Times (via PressReader)",
    title: "Tandoor murder case convict walks free after two decades",
    date: "22 Dec 2018",
    url: "https://www.hindustantimes.com/lucknow/tandoor-murder-case-all-my-negativity-has-been-washed-by-the-sweat-inside-tihar-sushil/story-OZfs6vG5Fhc9gYxl6LxXJO.html",
  },
  {
    ref: 5,
    outlet: "Hindustan Times Delhi (via PressReader)",
    title: "Tandoor convict Sushil Sharma walks free",
    date: "22 Dec 2018",
    url: "https://www.hindustantimes.com/india-news/tandoor-murder-case-1995-delhi-high-court-orders-release-of-sushil-sharma/story-6LLhZlUgUyfIHhwpSzlsHI.html",
  },
  {
    ref: 6,
    outlet: "Deccan Herald",
    title: "Tandoor murder: HC orders release of Sushil Sharma",
    url: "https://www.deccanherald.com/india/tandoor-murder-case-sushil-709249.html",
  },
  {
    ref: 7,
    outlet: "Al Jazeera",
    title: "Death for India's Tandoor killer",
    date: "7 Nov 2003",
    url: "https://www.aljazeera.com/news/2003/11/7/death-for-indias-tandoor-killer",
  },
  {
    ref: 8,
    outlet: "Casemine",
    title:
      "Sushil Sharma v. State (NCT of Delhi), Supreme Court of India, Judgment",
    url: "https://www.casemine.com/judgement/in/5609af3ee4b0149711415ece",
  },
  {
    ref: 9,
    outlet: "Record of Law",
    title: "Sushil Sharma vs State (NCT) of Delhi",
    url: "https://recordoflaw.in/sushil-sharma-vs-state-nct-of-delhi/",
  },
  {
    ref: 10,
    outlet: "Lawful Legal",
    title: "Sushil Sharma v State NCT of Delhi (Tandoor Murder Case)",
    date: "11 Dec 2025",
    url: "https://lawfullegal.in/sushil-sharma-v-state-nct-of-delhi-tandoor-murder-case/",
  },
  {
    ref: 11,
    outlet: "International Journal of Legal Science and Innovation (IJLSI)",
    title: "The Tandoor Murder Case: Case Comment",
    url: "https://ijlsi.com/article/view/the-tandoor-murder-case-case-comment",
  },
  {
    ref: 12,
    outlet: "IJLSI (PDF)",
    title: "The Tandoor Murder Case – Case Comment",
    url: "https://ijlsi.com/article/view/the-tandoor-murder-case-case-comment/57",
  },
  {
    ref: 13,
    outlet: "The Quint",
    title:
      "Shraddha Walkar Murder Brings Back Horrific Memories of Tandoor Murder Case",
    date: "17 Nov 2022",
    url: "https://www.thequint.com/explainers/what-was-tandoor-murder-case-naina-sahni-delhi",
  },
  {
    ref: 14,
    outlet: "Advocate Tanwar",
    title: "The Shocking Tandoor Murder Case: Naina Sahni's Story",
    date: "13 Feb 2024",
    url: "https://advocatetanwar.com/the-shocking-tandoor-murder-case-naina-sahnis-story/",
  },
  {
    ref: 15,
    outlet: "Vocal Media",
    title: "The Tandoor Murder Case: A Tale of Horror, Betrayal, and Justice",
    url: "https://vocal.media/criminal/the-tandoor-murder-case-a-tale-of-horror-betrayal-and-justice",
  },
  {
    ref: 16,
    outlet: "Vocal Media",
    title: "Tandoor murder case",
    url: "https://vocal.media/criminal/tandoor-murder-case",
  },
  {
    ref: 17,
    outlet: "Newsgram",
    title:
      "Tandoor Murder Case: An account of Delhi's One of the Most Chilling Crime",
    date: "17 Sep 2025",
    url: "https://www.newsgram.com/crime/2025/09/10/tandoor-murder-case-delhi",
  },
  {
    ref: 18,
    outlet: "Scribd",
    title: "Tandoor Murder Case: Forensic Insights (PDF)",
    url: "https://www.scribd.com/document/452827339/IMPORTANCE-OF-FORENSIC-SCIENCE-IN-TANDOOR-MURDER-CASE",
  },
  {
    ref: 19,
    outlet: "Scribd",
    title: "Naina Sahni Tandoor Murder Case Summary (PDF)",
    url: "https://www.scribd.com/document/915272167/Murder-of-Naina-Sahni-Wikipedia",
  },
];

export function resolveSources(refs: number[]): Source[] {
  const map = new Map(sources.map((s) => [s.ref, s]));
  return refs
    .map((r) => map.get(r))
    .filter((s): s is Source => Boolean(s));
}

export const primarySources = [1, 2, 3, 7, 8];