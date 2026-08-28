import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JumpNav } from "@/components/JumpNav";
import { Hero } from "@/components/sections/Hero";
import { SummarySection } from "@/components/sections/SummarySection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";

const TimelineSection = dynamic(() =>
  import("@/components/sections/TimelineSection").then((m) => m.TimelineSection)
);
const CrimeSceneSection = dynamic(() =>
  import("@/components/sections/CrimeSceneSection").then((m) => m.CrimeSceneSection)
);
const StagingSection = dynamic(() =>
  import("@/components/sections/StagingSection").then((m) => m.StagingSection)
);
const AutopsySection = dynamic(() =>
  import("@/components/sections/AutopsySection").then((m) => m.AutopsySection)
);
const VerdictLadderSection = dynamic(() =>
  import("@/components/sections/VerdictLadderSection").then((m) => m.VerdictLadderSection)
);
const LegacySection = dynamic(() =>
  import("@/components/sections/LegacySection").then((m) => m.LegacySection)
);
const SourcesSection = dynamic(() =>
  import("@/components/sections/SourcesSection").then((m) => m.SourcesSection)
);

const SITE_URL = "https://the-tandoor-case.vercel.app";
const AUTHOR_URL = "https://www.linkedin.com/in/anushka-vinay-chitnis-697b0540b/";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "The Tandoor Case — an interactive case file",
      description:
        "A scroll-driven account of the 1995 murder of Naina Sahni and the forensic evidence that convicted Sushil Sharma.",
      inLanguage: "en-IN",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Anushka Vinay Chitnis",
      url: AUTHOR_URL,
      sameAs: [AUTHOR_URL],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#victim`,
      name: "Naina Sahni",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#accused`,
      name: "Sushil Sharma",
    },
    {
      "@type": "Article",
      "@id": `${SITE_URL}/#article`,
      url: `${SITE_URL}/`,
      headline: "The Tandoor Case — an interactive case file",
      name: "The Tandoor Case — an interactive case file",
      description:
        "New Delhi, 2 July 1995. A shooting, a car trunk, a clay tandoor — and the forensic evidence that survived the fire.",
      author: [{ "@id": `${SITE_URL}/#author` }],
      publisher: { "@id": `${SITE_URL}/#author` },
      datePublished: "2026-08-28T00:00:00+05:30",
      dateModified: "2026-08-28T00:00:00+05:30",
      inLanguage: "en-IN",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/` },
      about: [{ "@id": `${SITE_URL}/#victim` }, { "@id": `${SITE_URL}/#accused` }],
      keywords:
        "tandoor murder case, Naina Sahni, Sushil Sharma, forensic evidence, forensic science, New Delhi, IPC 302, BNS 103",
    },
  ],
};

export default function Home() {
  return (
    <main id="story-start" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollProgress />
      <JumpNav />
      <article>
        <Hero />
        <SummarySection />
        <BackgroundSection />
        <TimelineSection />
        <CrimeSceneSection />
        <StagingSection />
        <AutopsySection />
        <VerdictLadderSection />
        <LegacySection />
        <SourcesSection />
      </article>
    </main>
  );
}

