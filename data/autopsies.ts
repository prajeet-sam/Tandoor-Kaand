import type { AutopsyPanel } from "./types";

/**
 * Section 8.7 (autopsy sub-section) + Section 8.6 (ballistics).
 * The contrast between the two post-mortems is the section's centrepiece.
 */
export const autopsyIntro =
  "Two post-mortems examined the same charred remains and reached opposite conclusions. The difference was method.";

export const autopsyPanels: AutopsyPanel[] = [
  {
    id: "autopsy-1",
    shortLabel: "Autopsy One",
    longLabel: "First post-mortem",
    performedBy: "Unspecified in the case literature",
    orderedBy: "Routine first examination",
    method:
      "Conventional examination. The full-body X-rays the second examination relied on were skipped.",
    findings: [
      {
        text: "Concluded the body had been chopped or dismembered — a claim widely repeated in the media.",
        disputed: true,
      },
      {
        text: "Rejected a bullet wound as the cause of death.",
      },
    ],
    conclusion:
      "A finding that raised more questions than it answered — and that the second autopsy contradicted.",
    flags: ["X-rays skipped", "Bullet wound rejected"],
    tone: "flawed",
  },
  {
    id: "autopsy-2",
    shortLabel: "Autopsy Two",
    longLabel: "Second post-mortem — Dr. T.D. Dogra, AIIMS",
    performedBy: "Specialist panel led by Dr T.D. Dogra of AIIMS",
    orderedBy: "Ordered by the Delhi Lieutenant Governor",
    method:
      "More thorough techniques including full-body X-rays, which the first autopsy had skipped.",
    findings: [
      {
        text: "Two bullet wounds — one in the skull, one in the cervical spine.",
      },
      {
        text: "Confirmed homicide by gunshot, directly contradicting the first report.",
      },
    ],
    conclusion:
      "Renewed the ballistic chain: two bullets in the skull were later matched to Sharma's .32 bore revolver.",
    flags: ["Full-body X-rays", "Homicide by gunshot confirmed"],
    tone: "rigorous",
  },
];

export const autopsyConflict = {
  heading: "The contradiction in one line",
  first:
    "Autopsy One rejected a bullet wound as cause of death.",
  second:
    "Autopsy Two found two bullet wounds — skull and cervical spine — and confirmed homicide by gunshot.",
};

export const autopsyDisputedNote =
  "The dismemberment claim — repeated across news coverage for years — is precisely what the Supreme Court later found no evidence for when it commuted the death sentence in 2013.";

export const autopsySources = [1, 8, 18, 19];