export interface SectionDef {
  id: string;
  index: string;
  label: string;
  act: string;
}

export const sectionDefs: SectionDef[] = [
  { id: "cold-open", index: "01", label: "Cold open", act: "Occurrence" },
  { id: "summary", index: "02", label: "The case in sixty seconds", act: "Occurrence" },
  { id: "background", index: "03", label: "Two people, one fault line", act: "Context" },
  { id: "timeline", index: "04", label: "The timeline", act: "Chronology" },
  { id: "scene", index: "05", label: "Three scenes, one chain", act: "Investigation" },
  { id: "staging", index: "06", label: "Staging vs. detection", act: "Investigation" },
  { id: "autopsy", index: "07", label: "The autopsy contradiction", act: "Investigation" },
  { id: "verdict", index: "08", label: "The verdict ladder", act: "Trial · Appeals" },
  { id: "legacy", index: "09", label: "Why this case matters", act: "Legacy" },
  { id: "sources", index: "10", label: "Sources & limitations", act: "Credits" },
];

/** Acts shown as tick labels on the scroll progress bar. */
export const acts = ["Murder", "Investigation", "Trial", "Appeals", "Release"] as const;

/**
 * Anchor element per act. `.verdict-tier-*` spans are placed inside the
 * verdict section between tiers so acts align with real content position.
 */
export const actAnchors: { act: (typeof acts)[number]; selector: string }[] = [
  { act: "Murder", selector: "#cold-open" },
  { act: "Investigation", selector: "#scene" },
  { act: "Trial", selector: "#verdict" },
  { act: "Appeals", selector: ".verdict-tier-sc" },
  { act: "Release", selector: ".verdict-tier-release" },
];