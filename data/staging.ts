import type { StagingRow, Tag } from "./types";

const ballistic: Tag = { label: "Ballistic match", kind: "ballistic" };
const dna: Tag = { label: "DNA profile", kind: "dna" };
const trace: Tag = { label: "Trace evidence", kind: "trace" };
const eye: Tag = { label: "Eyewitness testimony", kind: "eyewitness" };
const autopsy: Tag = { label: "Second autopsy", kind: "autopsy" };
const arrest: Tag = { label: "Arrest", kind: "arrest" };

/**
 * Section 8.7 — every staging attempt and the forensic counter-move that
 * defeated it. Attempts and counters are drawn verbatim from the source.
 */
export const stagingRows: StagingRow[] = [
  {
    id: "fire",
    attemptLabel: "Attempt 01 · Incineration",
    attempt: "Destroy the body entirely by fire",
    attemptDetail:
      "The body was burned in the restaurant's clay tandoor on the assumption that ash would leave no evidence, no identification, no case.",
    counterLabel: "Fire failed where it mattered",
    counter:
      "Bullets remained embedded in the skull and neck region of the charred corpse. Bone and metal survive fire far better than soft tissue.",
    counterDetail:
      "Forensic ballistics matched the recovered bullets to Sharma's .32 Arminius revolver — the murder weapon outlasted the attempt to erase it.",
    tags: [ballistic, trace],
  },
  {
    id: "banners",
    attemptLabel: "Attempt 02 · Cover story",
    attempt: "'We are only burning old Congress banners'",
    attemptDetail:
      "When Home Guard Chander Pal and Constable Abdul Nazir Kunju noticed fire and smoke, restaurant employee Keshav Kumar claimed they were simply burning old Congress banners.",
    counterLabel: "The story contradicted the scene",
    counter:
      "Eyewitnesses placed Sharma at the tandoor itself, stoking the fire with a wooden stick — direct testimony undercutting the cover story.",
    counterDetail:
      "The claimed 'banner burning' could not explain what a police patrol, stopping for drinking water at Ashok Yatri Niwas, saw that night.",
    tags: [eye, trace],
  },
  {
    id: "flight",
    attemptLabel: "Attempt 03 · Flight",
    attempt: "Run, across five cities",
    attemptDetail:
      "Sharma fled through Gujarat Bhawan, then Jaipur, Mumbai, and Chennai, before being caught in Bangalore.",
    counterLabel: "The net closed regardless",
    counter:
      "Arrested in Bangalore on 10 July 1995, produced before a local court, and brought back to Delhi on transit remand.",
    counterDetail:
      "Whatever the forensic chain proved later, the suspect was already in custody nine days after the burning.",
    tags: [arrest],
  },
  {
    id: "dispute",
    attemptLabel: "Attempt 04 · Dispute the evidence",
    attempt: "Claim the evidence was fabricated",
    attemptDetail:
      "At trial, the defence argued the cartridges, bullet, and other flat evidence were fabricated by police, pointing to the fact that neighbours hadn't reported hearing gunshots.",
    counterLabel: "The physical chain held together",
    counter:
      "Blood traces on the mattress in the bedroom at the Mandir Marg flat matched Naina's AB blood group; blood and hair in the car's trunk further corroborated the transport route.",
    counterDetail:
      "Ballistic matching read the cartridges and bullet as one chain; DNA read flat, car and restaurant as one route. Fabrication of all of it, consistently, was not a defence the evidence supported.",
    tags: [dna, ballistic, trace, autopsy],
  },
];

export const stagingIntro =
  "Every attempt to control the scene — to burn, to explain, to flee, to deny — collided with evidence that the fire could not destroy. Left, what the accused hoped would end the case. Right, what the physical record actually showed.";

export const stagingSources = [1, 8, 19];