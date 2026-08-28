import type { SceneEvidence, SceneNode, Tag } from "./types";

const ballistic: Tag = { label: "Ballistic match — CFSL", kind: "ballistic" };
const dna: Tag = { label: "DNA profile", kind: "dna" };
const trace: Tag = { label: "Trace evidence", kind: "trace" };
const eye: Tag = { label: "Eyewitness testimony", kind: "eyewitness" };
const autopsy: Tag = { label: "Second autopsy", kind: "autopsy" };

const SHOOTING_EVIDENCE: SceneEvidence[] = [
  {
    text: "Police seized blood-stained articles and ballistic evidence, including cartridge cases.",
    tags: [ballistic],
  },
  {
    text: "A second post-mortem revealed two bullets lodged in the skull; forensic ballistics (CFSL) linked these bullets and the cartridge cases to Sharma's .32 bore revolver.",
    tags: [ballistic, autopsy],
  },
  {
    text: "Blood stains on the carpet and cloth matched Naina's DNA, confirming the shooting location.",
    tags: [dna],
  },
];

const CAR_EVIDENCE: SceneEvidence[] = [
  {
    text: "Sharma's abandoned car was located, with blood found in its trunk (dickey).",
    tags: [trace],
  },
  {
    text: "Blood and hair recovered from the trunk matched Naina's DNA, forensically proving the body had been transported from the flat to the restaurant.",
    tags: [dna],
  },
];

const RESTAURANT_EVIDENCE: SceneEvidence[] = [
  {
    text: "Police recovered a charred female body from the tandoor.",
    tags: [trace, autopsy],
  },
  {
    text: "Eyewitness testimony placed Sharma at the tandoor, stoking the fire with a wooden stick before leaving.",
    tags: [eye],
  },
  {
    text: "A police patrol vehicle crew noticed the fire while stopping for drinking water at Ashok Yatri Niwas, leading directly to the discovery.",
    tags: [trace],
  },
];

/**
 * Section 8.6 — three linked crime scenes, each contributing physical
 * evidence pieced together into one continuous chain.
 */
export const crimeScenes: SceneNode[] = [
  {
    id: "flat",
    code: "Scene 01 · primary",
    name: "The Mandir Marg flat",
    placeLabel: "Mandir Marg flat",
    location: "Mandir Marg, Delhi",
    timing: "Night of 2 July 1995",
    whatHappened: [
      "The actual murder scene, where Sharma shot Naina Sahni three times.",
    ],
    evidence: SHOOTING_EVIDENCE,
    link: "Blood on the carpet and cloth matches Naina's DNA — the shooting happened here, not anywhere the cover story claimed.",
  },
  {
    id: "car",
    code: "Scene 02 · transport",
    name: "The car",
    placeLabel: "Maruti car, trunk",
    location: "Sharma's abandoned Maruti car",
    timing: "Night of 2 July 1995",
    whatHappened: [
      "The body travelled from the flat in the car's trunk (dickey) to the restaurant.",
    ],
    evidence: CAR_EVIDENCE,
    link: "Blood and hair from the trunk match Naina's DNA — the flat and the restaurant are physically joined by this vehicle.",
  },
  {
    id: "tandoor",
    code: "Scene 03 · disposal",
    name: "Bagiya restaurant / tandoor",
    placeLabel: "Bagiya Bar-be-Que, tandoor",
    location: "Bagiya Bar-be-Que restaurant",
    timing: "2–3 July 1995, early hours",
    whatHappened: [
      "The body was taken here to be destroyed in the large clay tandoor oven.",
    ],
    evidence: RESTAURANT_EVIDENCE,
    link: "Where the chain ends: the charred remains were found here, and eyewitnesses placed Sharma stoking the fire.",
  },
];

export const crimeChain = ["flat", "car", "tandoor"] as const;

export const forensicTechniques: { label: string; tag: Tag }[] = [
  {
    label:
      "Ballistic analysis — matching recovered bullets and cartridge cases to Sharma's licensed revolver.",
    tag: ballistic,
  },
  {
    label:
      "DNA profiling — identifying badly burnt remains as Naina Sahni and linking blood traces across all three locations (flat → car → restaurant).",
    tag: dna,
  },
  {
    label:
      "Autopsy / post-mortem examination — the first autopsy's findings became controversial; a second post-mortem definitively identified the bullet wounds.",
    tag: autopsy,
  },
];

export const whyThisMatters =
  "The case is frequently cited as an early Indian example where DNA evidence, rather than just eyewitness testimony or confession, became central to securing a conviction — establishing precedent for how forensic science could reconstruct a crime timeline across multiple locations even when the body itself was severely damaged.";

export const crimeMapNote =
  "A stylized editorial diagram, not a survey map: the three sites are real but positions are approximate and not to scale.";

export const crimeScenesSources = [1, 8, 18];