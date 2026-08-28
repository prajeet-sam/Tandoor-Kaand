import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Footnote } from "@/components/Footnote";
import {
  backgroundIntro,
  backgroundBeats,
  backgroundClose,
  backgroundSources,
  getPerson,
} from "@/data";
import { PersonCard } from "./BackgroundPersonCard";

/**
 * 4.3 — Background: Two People, One Fault Line.
 * The narrative beats scroll past while the profile cards for Sharma and
 * Naina reveal at the right moments. All content from Sections 8.2–8.4.
 */
export function BackgroundSection() {
  const sharma = getPerson("sushil-sharma");
  const naina = getPerson("naina-sahni");
  const karim = getPerson("matloob-karim");
  const kumar = getPerson("keshav-kumar");

  return (
    <Section
      id="background"
      index="03"
      kicker="Two people, one fault line"
      title={
        <>
          Before the night:
          <br />a marriage kept hidden
        </>
      }
      intro={backgroundIntro}
      sources={backgroundSources}
      tone="deep"
    >
      <div className="flex flex-col gap-24">
        {/* Beat 01 + Sharma card */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <BeatMeta beat={backgroundBeats[0]} />
          {sharma && <PersonCard person={sharma} delay={0.15} />}
        </div>

        {/* Beats 02 + Naina card */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-12">
            <BeatMeta beat={backgroundBeats[1]} />
            <BeatMeta beat={backgroundBeats[2]} small />
          </div>
          {naina && <PersonCard person={naina} delay={0.15} />}
        </div>

        {/* Beat 04 */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <BeatMeta beat={backgroundBeats[3]} />
          <div className="flex flex-col gap-4 pt-2 lg:pt-6">
            <Reveal>
              <p className="meta-mono text-paper-faint">Supporting entries</p>
            </Reveal>
            {karim && <PersonCard person={karim} compact />}
            {kumar && <PersonCard person={kumar} compact />}
          </div>
        </div>

        <Reveal>
          <blockquote className="hairline border-line pt-10">
            <p className="display max-w-4xl text-[clamp(1.4rem,2.8vw,2.1rem)] text-paper-dim">
              {backgroundClose}
            </p>
            <p className="meta-mono mt-4">— Background, from the case record</p>
          </blockquote>
        </Reveal>
      </div>

      <Reveal>
        <div className="meta-mono mt-16 flex items-center gap-2">
          <span>Background sources</span>
          <Footnote refs={backgroundSources} />
        </div>
      </Reveal>
    </Section>
  );
}

function BeatMeta({
  beat,
  small,
}: {
  beat: (typeof backgroundBeats)[number];
  small?: boolean;
}) {
  return (
    <Reveal>
      <div className="border-l-2 border-ember/50 pl-6">
        <p className="kicker">{beat.meta}</p>
        <h3 className={`display mt-2 text-paper ${small ? "text-[1.6rem]" : "text-[clamp(1.7rem,3.4vw,2.4rem)]"}`}>
          {beat.heading}
        </h3>
        <p className="story-body mt-4 max-w-xl text-paper-dim">{beat.body}</p>
      </div>
    </Reveal>
  );
}