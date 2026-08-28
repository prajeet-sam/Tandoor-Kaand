import type { Person } from "./types";

/**
 * Sections 8.3 (Key Persons) and 8.4 (Victim Profile).
 * Matloob Karim is not listed in 8.3 but appears throughout the source
 * material as Naina's colleague and friend; his facts are taken only from
 * Sections 8.2 and 8.5.
 */
export const people: Person[] = [
  {
    id: "naina-sahni",
    name: "Naina Sahni",
    role: "Victim",
    roleTone: "victim",
    facts: [
      { label: "Sex", value: "Female" },
      { label: "Residence", value: "Flat on Mandir Marg, Delhi" },
      { label: "Work", value: "Congress youth worker" },
      { label: "Circumstance", value: "Body found in the tandoor at Bagiya restaurant" },
    ],
    note: "The person this case is named for — whose life, and whose burnt remains, became evidence in an Indian court.",
  },
  {
    id: "sushil-sharma",
    name: "Sushil Sharma",
    role: "Culprit",
    roleTone: "accused",
    facts: [
      { label: "Position", value: "Rising political figure, Delhi Youth Congress" },
      { label: "Weapon", value: "Licensed .32 bore revolver" },
      { label: "Conviction", value: "Murder, IPC 302 — 3 November 2003" },
      { label: "Final sentence", value: "Death commuted to life; released 21 December 2018" },
    ],
    note: "Convicted of murdering his wife; the death sentence was later commuted to life imprisonment by the Supreme Court.",
  },
  {
    id: "keshav-kumar",
    name: "Keshav Kumar",
    role: "Accessory — restaurant manager",
    roleTone: "accessory",
    facts: [
      { label: "Role", value: "Manager, Bagiya Bar-be-Que restaurant" },
      { label: "Arrested", value: "On the spot, night of 2–3 July 1995" },
      { label: "Sentence", value: "Seven years' rigorous imprisonment" },
    ],
    note: "Tried alongside Sharma; convicted as the accessory at the disposal scene.",
  },
  {
    id: "matloob-karim",
    name: "Matloob Karim",
    role: "Colleague & friend of the victim",
    roleTone: "witness",
    facts: [
      { label: "Relation", value: "Naina Sahni's colleague and friend" },
      { label: "Role in the case", value: "His friendship with Naina became a point of suspicion" },
      { label: "Status", value: "A flashpoint in the relationship; not a person of interest" },
    ],
    note: "Supporting Naina's attempts to distance herself from Sharma, Karim's friendship became the tension Sharma fixated on.",
  },
];

export function getPerson(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}