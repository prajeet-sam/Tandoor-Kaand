export type {
  EvidenceKind,
  Tag,
  TimelineEntry,
  TimelineZone,
  SceneNode,
  SceneEvidence,
  StagingRow,
  VerdictTier,
  VerdictSeverity,
  Source,
  Person,
  AutopsyPanel,
} from "./types";

export { summaryBeats } from "./summary";
export type { SummaryBeat } from "./summary";

export {
  backgroundIntro,
  backgroundBeats,
  backgroundClose,
  backgroundSources,
} from "./background";
export type { BackgroundBeat } from "./background";

export { people, getPerson } from "./people";

export {
  timeline,
  timelineZones,
  timelineIntro,
  timelineSources,
} from "./timeline";

export {
  crimeScenes,
  crimeChain,
  forensicTechniques,
  whyThisMatters,
  crimeMapNote,
  crimeScenesSources,
} from "./crimeScenes";

export { stagingRows, stagingIntro, stagingSources } from "./staging";

export {
  autopsyIntro,
  autopsyPanels,
  autopsyConflict,
  autopsyDisputedNote,
  autopsySources,
} from "./autopsies";

export { verdictIntro, verdictTiers, verdictFootNote, verdictSources } from "./verdicts";

export { legacyTakeaways, legacyClose } from "./legacy";
export type { LegacyTakeaway } from "./legacy";

export { sources, resolveSources, primarySources } from "./sources";

export {
  editorialNote,
  visualizationMethodology,
  limitations,
  onTheVictim,
  codeMappings,
  bnsNote,
} from "./methodology";
export type { Limitation } from "./methodology";