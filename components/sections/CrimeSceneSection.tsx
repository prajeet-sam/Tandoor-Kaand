"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EvidenceTag } from "@/components/EvidenceTag";
import { useMediaQuery } from "@/components/use-media-query";
import {
  crimeScenes,
  crimeChain,
  forensicTechniques,
  whyThisMatters,
  crimeMapNote,
  crimeScenesSources,
} from "@/data";
import type { SceneNode } from "@/data";

/**
 * 4.5 — Three Scenes, One Chain. A stylized node diagram (not a survey
 * map) of the flat → car → tandoor chain, each node opening the evidence
 * recovered there and how forensics linked it to the next location.
 */
export function CrimeSceneSection() {
  return (
    <Section
      id="scene"
      index="05"
      kicker="The crime scene chain"
      title={
        <>
          Three scenes,
          <br />one unbroken chain
        </>
      }
      intro="What linked a flat, a car and a restaurant into a single case was not a confession but physical evidence — each site held a piece that pointed to the next."
      sources={crimeScenesSources}
    >
      <ChainDiagram />
      <Reveal>
        <p className="meta-mono mt-8 flex max-w-3xl items-start gap-2 text-paper-faint">
          <span aria-hidden="true" className="mt-1 text-ember">
            ◇
          </span>
          {crimeMapNote}
        </p>
      </Reveal>
    </Section>
  );
}

function ChainDiagram() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isDesktop ? <DesktopDiagram /> : <MobileDiagram />;
}

/* ---------------------------- desktop SVG ---------------------------- */

const NODE_POS: Record<(typeof crimeChain)[number], { x: number; y: number }> = {
  flat: { x: 150, y: 300 },
  car: { x: 470, y: 344 },
  tandoor: { x: 800, y: 148 },
};

function DesktopDiagram() {
  const [active, setActive] = useState<SceneNode["id"]>("flat");
  const scene = crimeScenes.find((s) => s.id === active) ?? crimeScenes[0];
  const activeIdx = crimeChain.indexOf(active as (typeof crimeChain)[number]);
  const connectedLinks = activeIdx; // edges drawn to this point are live

  return (
    <div className="lg:grid lg:grid-cols-[1.45fr_1fr] lg:gap-10">
      <div className="relative">
        <span
          aria-hidden="true"
          className="stamp stamp-ink stamp-sm absolute right-2 top-2 z-10"
        >
          Exhibit A · scene 01–03
        </span>
        <svg
          viewBox="0 0 960 470"
          role="group"
          aria-roledescription="Chain diagram of three linked crime scenes"
          aria-label="Scene chain: Mandir Marg flat, the car, and the Bagiya restaurant tandoor"
          className="w-full select-none"
        >
          {/* grid backdrop */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(180,161,126,0.4)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="960" height="470" fill="url(#grid)" />

          {/* edges */}
          <ChainEdge
            from={NODE_POS["flat"]}
            to={NODE_POS["car"]}
            active={connectedLinks >= 1}
            label="the flat → the trunk"
            delay={0.3}
          />
          <ChainEdge
            from={NODE_POS["car"]}
            to={NODE_POS["tandoor"]}
            active={connectedLinks >= 2}
            label="the route → the restaurant"
            delay={0.6}
          />

          {/* nodes */}
          {crimeChain.map((id, i) => (
            <NodeButton
              key={id}
              code={crimeScenes[i].code}
              name={crimeScenes[i].name}
              pos={NODE_POS[id]}
              index={i + 1}
              active={active === id}
              onActivate={() => setActive(id)}
            />
          ))}
        </svg>
      </div>

      {/* detail panel */}
      <ScenePanel scene={scene} position={activeIdx + 1} />
    </div>
  );
}

function ChainEdge({
  from,
  to,
  active,
  label,
  delay,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active: boolean;
  label: string;
  delay: number;
}) {
  const startX = from.x + 26 * Math.cos(Math.atan2(to.y - from.y, to.x - from.x));
  const startY = from.y + 26 * Math.sin(Math.atan2(to.y - from.y, to.x - from.x));
  const endX = to.x - 26 * Math.cos(Math.atan2(to.y - from.y, to.x - from.x));
  const endY = to.y - 26 * Math.sin(Math.atan2(to.y - from.y, to.x - from.x));
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 44;
  const d = `M ${startX} ${startY} C ${midX} ${midY + 30}, ${midX} ${midY + 30}, ${endX} ${endY}`;

  return (
    <g fontFamily="var(--font-mono)">
      <motion.path
        d={d}
        fill="none"
        stroke={active ? "rgba(157,100,24,0.9)" : "rgba(180,161,126,0.9)"}
        strokeWidth={active ? 2.5 : 1.5}
        strokeDasharray="7 8"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, delay, ease: "easeInOut" }}
      />
      <motion.text
        x={(startX + endX) / 2}
        y={(startY + endY) / 2 - 60}
        textAnchor="middle"
        fontSize="13"
        letterSpacing="0.12em"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5 }}
        className={active ? "fill-ember-bright" : "fill-paper-faint"}
        aria-hidden="true"
      >
        {label.toUpperCase()}
      </motion.text>
    </g>
  );
}

function NodeButton({
  code,
  name,
  pos,
  index,
  active,
  onActivate,
}: {
  code: string;
  name: string;
  pos: { x: number; y: number };
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Scene ${index}: ${name}. Activate to read the evidence.`}
      aria-pressed={active}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className="cursor-pointer focus-visible:outline-none"
    >
      {active && (
        <motion.circle
          cx={pos.x}
          cy={pos.y}
          r={34}
          fill="none"
          stroke="rgba(178,112,28,0.5)"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={26}
        fill={active ? "rgba(157,100,24,0.14)" : "#fbf8ef"}
        stroke={active ? "#b2701c" : "#b4a17e"}
        strokeWidth={active ? 2 : 1.5}
      />
      <circle
        cx={pos.x}
        cy={pos.y}
        r={4.5}
        fill={active ? "#b2701c" : "#8b826f"}
      />
      <text
        x={pos.x}
        y={pos.y - 44}
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.18em"
        className="fill-ember"
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </text>
      <text
        x={pos.x}
        y={pos.y + 48}
        textAnchor="middle"
        fontSize="13"
        letterSpacing="0.08em"
        className={active ? "fill-paper" : "fill-paper-dim"}
        aria-hidden="true"
      >
        {name.toUpperCase()}
      </text>
      <text
        x={pos.x}
        y={pos.y + 64}
        textAnchor="middle"
        fontSize="10"
        letterSpacing="0.08em"
        className="fill-paper-faint"
        aria-hidden="true"
      >
        {code.replace("Scene", "SCENE").toUpperCase()}
      </text>
    </g>
  );
}

/* ---------------------------- shared panel ---------------------------- */

function ScenePanel({ scene, position }: { scene: SceneNode; position: number }) {
  return (
    <div aria-live="polite" className="mt-6 lg:mt-0">
      <p className="meta-mono flex items-center gap-3 text-paper-faint">
        <span className="inline-block h-px w-8 bg-ember/50" aria-hidden="true" />
        Chain link {position} of {crimeChain.length}
      </p>
      <h3 className="display mt-3 text-[clamp(1.7rem,3vw,2.3rem)] text-paper">
        {scene.name}
      </h3>
      <p className="meta-mono mt-2">
        {scene.code} · {scene.location}
        <span aria-hidden="true" className="mx-2 text-ember/60">
          /
        </span>
        {scene.timing}
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <p className="story-body text-[1.05rem] text-paper-dim">
          {scene.whatHappened[0]}
        </p>
      </div>

      <div className="mt-5 border border-line bg-ink-2 p-5">
        <p className="kicker mb-3">Evidence recovered here</p>
        <ul className="flex flex-col gap-3">
          {scene.evidence.map((ev, i) => (
            <li key={i} className="flex flex-col gap-1.5">
              <p className="note text-paper-dim">{ev.text}</p>
              <div className="flex flex-wrap gap-1.5">
                {ev.tags.map((t) => (
                  <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 flex items-start gap-2 border-l-2 border-ember/50 pl-3 text-[0.95rem] leading-relaxed text-sand">
        <span aria-hidden="true" className="mt-px shrink-0">
          ⌁
        </span>
        <span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ember-bright">
            How it links —
          </span>{" "}
          {scene.link}
        </span>
      </p>
    </div>
  );
}

/* ---------------------------- mobile stacked ---------------------------- */

function MobileDiagram() {
  return (
    <ol className="relative flex list-none flex-col pl-7 m-0">
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[9px] top-2 w-px bg-line-strong"
      />
      {crimeChain.map((id, i) => {
        const scene = crimeScenes[i];
        return (
          <li key={id} className="relative pb-10">
            <span
              aria-hidden="true"
              className="absolute -left-7 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-ember/60 bg-ink-2 font-mono text-[0.55rem] text-ember"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <SceneCard scene={scene} />
          </li>
        );
      })}
    </ol>
  );
}

function SceneCard({ scene }: { scene: SceneNode }) {
  return (
    <div className="border border-line bg-ink-3">
      <div className="border-b border-line px-5 py-4">
        <p className="meta-mono text-ember">
          {scene.code} · {scene.location}
          <span aria-hidden="true" className="mx-1.5 text-ember/60">
            /
          </span>
          {scene.timing}
        </p>
        <h4 className="display mt-1 text-[1.5rem] text-paper">{scene.name}</h4>
      </div>
      <div className="px-5 py-4">
        <p className="story-body text-[1rem] text-paper-dim">
          {scene.whatHappened[0]}
        </p>
        <div className="mt-4 border border-line bg-ink-2 p-4">
          <p className="kicker mb-2">Evidence recovered here</p>
          <ul className="flex flex-col gap-3">
            {scene.evidence.map((ev, i) => (
              <li key={i} className="flex flex-col gap-1.5">
                <p className="note text-paper-dim">{ev.text}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ev.tags.map((t) => (
                    <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function WhyThisMattersBanner() {
  return (
    <Reveal>
      <div className="mt-16 border border-ember/30 bg-ink-3 p-6 sm:p-10">
        <p className="kicker mb-3">Why this matters forensically</p>
        <p className="story-body max-w-4xl text-paper">{whyThisMatters}</p>
        <ul className="mt-6 flex flex-col gap-3 border-line pt-6">
          {forensicTechniques.map((t, i) => (
            <li key={i} className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-[0.6rem] text-paper-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="note flex-1 text-paper-dim">{t.label}</span>
              <EvidenceTag label={t.tag.label} kind={t.tag.kind} />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}