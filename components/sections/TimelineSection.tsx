"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EvidenceTag } from "@/components/EvidenceTag";
import { useMediaQuery } from "@/components/use-media-query";
import { timeline, timelineZones, timelineIntro, timelineSources } from "@/data";
import type { TimelineEntry } from "@/data";

/* ---------- geometry (to-scale, with a marked break) ---------- */
const MONTH_PX = 6; // px per month in the judicial tail
const JUDICIAL_X0 = 740; // start of the tail, after the scale break
const MIN_GAP = 56; // min px so neighbouring date labels don't collide
const TAIL_ANCHOR = Date.UTC(1996, 4, 9); // 9 May 1996 (charges framed)
let gLastTailX = JUDICIAL_X0;

function tailX(iso: string): number {
  const months =
    (Date.parse(`${iso}T12:00:00Z`) - TAIL_ANCHOR) /
    (1000 * 60 * 60 * 24 * 30.4375);
  let x = JUDICIAL_X0 + Math.round(months * MONTH_PX);
  if (x - gLastTailX < MIN_GAP) x = gLastTailX + MIN_GAP;
  gLastTailX = x;
  return x;
}

const CRIME_X: Record<string, number> = {
  "t-shooting": 0,
  "t-transport": 96,
  "t-recovery": 192,
  "t-arrest": 310,
  "t-chargesheet": 470,
  "t-charges": 660,
};

function computePositions(): Record<string, number> {
  gLastTailX = JUDICIAL_X0;
  const pos: Record<string, number> = {};
  for (const e of timeline) {
    pos[e.id] = e.zone === "crime" ? CRIME_X[e.id] : tailX(e.iso);
  }
  return pos;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/* =========================================================== */

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      index="04"
      kicker="Chronology · 1995 → 2018"
      title={
        <>
          Two July days,
          <br />twenty-three years
        </>
      }
      intro={timelineIntro}
      sources={timelineSources}
    >
      <TimelineBody />
      <Reveal>
        <p className="note mt-10 max-w-3xl border-l-2 border-ember/40 pl-4 text-paper-dim">
          Density note: the six earliest events share one band — the shooting,
          the drive, the discovery and the first arrests happened within a
          single night and week. The band after the scale break carries the
          legal process to December 2018. Spacing is drawn to time scale;
          exact positions in the first band are stylised.
        </p>
      </Reveal>
    </Section>
  );
}

/* ============================ body ============================ */

function TimelineBody() {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const positions = useMemo(() => computePositions(), []);
  const [selected, setSelected] = useState<string>(timeline[0].id);
  const entries = useMemo(
    () =>
      [...timeline].sort(
        (a, b) => (a.zone === b.zone ? 0 : a.zone === "crime" ? -1 : 1)
      ),
    []
  );

  return isDesktop ? (
    <TimelineHorizontal
      entries={entries}
      positions={positions}
      selected={selected}
      onSelect={setSelected}
    />
  ) : (
    <TimelineVertical entries={entries} selected={selected} onSelect={setSelected} />
  );
}

/* ------------------------ horizontal scrub ------------------------ */

function TimelineHorizontal({
  entries,
  positions,
  selected,
  onSelect,
}: {
  entries: TimelineEntry[];
  positions: Record<string, number>;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(1000);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const [scrub, setScrub] = useState(0);

  const maxScroll = Math.max(0, RAIL_RIGHT - viewportW);
  const fillPct = maxScroll > 0 ? (scrub / maxScroll) * 100 : 0;

  // measure the visible stage width
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setViewportW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // reflect drag position into the range control
  useEffect(() => {
    const unsub = x.on("change", (v) => {
      setScrub(Math.round(clamp(-v, 0, maxScroll)));
    });
    return unsub;
  }, [x, maxScroll]);

  const select = useCallback(
    (idx: number) => {
      const next = entries[idx].id;
      onSelect(next);
      const px = positions[next];
      const target = clamp(px - viewportW / 2 + 40, 0, maxScroll);
      if (reduced) {
        x.jump(-target);
      } else {
        animate(x, -target, { type: "spring", stiffness: 120, damping: 24 });
      }
    },
    [entries, onSelect, positions, viewportW, maxScroll, reduced, x]
  );

  // arrow-key navigation across events
  const step = useCallback(
    (dir: 1 | -1) => {
      const idx = entries.findIndex((e) => e.id === selected);
      const nextIdx = clamp(idx + dir, 0, entries.length - 1);
      select(nextIdx);
    },
    [entries, selected, select]
  );

  const selectedIdx = entries.findIndex((e) => e.id === selected);

  const activateNode = useCallback(
    (id: string) => {
      const idx = entries.findIndex((e) => e.id === id);
      if (idx >= 0) select(idx);
    },
    [entries, select]
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {timelineZones.map((z) => (
            <p key={z.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 border ${
                  z.id === "crime"
                    ? "border-rust-bright bg-rust/30"
                    : "border-ember bg-ember/30"
                }`}
              />
              <span className="meta-mono">
                <span className="text-paper">{z.label}</span>
                <span className="text-paper-faint"> · {z.timespan}</span>
              </span>
            </p>
          ))}
        </div>
        <p className="meta-mono text-paper-faint" aria-hidden="true">
          drag · arrow keys · scrub
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative h-[280px] touch-pan-y overflow-hidden border-y border-line bg-ink-2"
        role="group"
        aria-roledescription="timeline"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        tabIndex={0}
      >
        <motion.div
          className="absolute inset-y-0 left-0 will-change-transform"
          style={{ x, width: RAIL_RIGHT }}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.06}
          dragDirectionLock
          dragMomentum={false}
        >
          {/* zone bands */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 border-r border-line/70 bg-rust/5"
            style={{ width: 700 }}
          >
            <p className="kicker absolute left-4 top-3 text-rust-bright">
              {timelineZones[0].label}
              <span className="block font-mono text-[0.58rem] text-paper-faint">
                {timelineZones[0].timespan}
              </span>
            </p>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-y-0 border-r border-line/70"
            style={{ left: 740, width: RAIL_RIGHT - 740 }}
          >
            <p className="kicker absolute left-5 top-3">
              {timelineZones[1].label}
              <span className="block font-mono text-[0.58rem] text-paper-faint">
                {timelineZones[1].timespan}
              </span>
            </p>
          </div>

          {/* scale break */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 border-l border-dashed border-ember/50"
            style={{ left: 740 }}
          >
            <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink-2 px-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ember">
              time scale changes
            </p>
          </div>

          {/* axis */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 h-px bg-line-strong"
            style={{ top: AXIS_Y }}
          />

          {/* markers */}
          {entries.map((e) => (
            <TimelineMarker
              key={e.id}
              entry={e}
              left={positions[e.id]}
              active={e.id === selected}
              onActivate={() => activateNode(e.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* scrub control */}
      <div className="mt-4 flex items-center gap-4">
        <label htmlFor="timeline-scrub" className="kicker shrink-0">
          Scrub
        </label>
        <div className="relative h-6 flex-1" role="group" aria-label="Case timeline scrubber">
          <input
            id="timeline-scrub"
            type="range"
            min={0}
            max={maxScroll}
            step={1}
            value={scrub}
            onChange={(e) => {
              const v = Number(e.target.value);
              setScrub(v);
              x.set(-v);
            }}
            aria-label="Scrub through the case timeline"
            className="peer absolute inset-0 z-10 w-full cursor-ew-resize opacity-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-line-strong ring-1 ring-inset ring-line-strong/40"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-ember-deep via-ember to-ember-bright"
              style={{ width: `${fillPct}%` }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ember-bright bg-ink-3 shadow-[0_1px_4px_rgba(122,92,46,0.35)] transition-transform duration-150 ease-out peer-hover:scale-110 peer-focus-visible:scale-110 peer-focus-visible:shadow-[0_0_0_4px_rgba(178,112,28,0.22)]"
              style={{ left: `${fillPct}%` }}
            />
          </div>
        </div>
        <p className="meta-mono shrink-0 tabular-nums text-paper-faint">
          event {String(selectedIdx + 1).padStart(2, "0")} / {entries.length}
        </p>
      </div>

      {/* prev / next */}
      <div className="mt-3 flex justify-end">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={selectedIdx === 0}
            className="border border-line-strong px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-dim transition-colors hover:border-ember/60 hover:text-ember-bright disabled:opacity-35"
          >
            ← prev
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={selectedIdx === entries.length - 1}
            className="border border-line-strong px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-dim transition-colors hover:border-ember/60 hover:text-ember-bright disabled:opacity-35"
          >
            next →
          </button>
        </div>
      </div>

      {/* detail panel */}
      <TimelineDetail entry={entries[selectedIdx]} />
    </div>
  );
}

const AXIS_Y = 158;
const RAIL_RIGHT = 740 + 271 * MONTH_PX + 240; // ~2606

function TimelineMarker({
  entry,
  left,
  active,
  onActivate,
}: {
  entry: TimelineEntry;
  left: number;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      className="absolute top-0 h-full"
      style={{ left, transform: "translateX(-50%)" }}
    >
      <button
        type="button"
        onClick={onActivate}
        aria-pressed={active}
        aria-label={`${entry.date} — ${entry.title}`}
        className="group absolute flex flex-col items-center focus-visible:outline-none"
        style={{ top: AXIS_Y - 6 }}
      >
        <span
          className={`display absolute bottom-full mb-2 w-40 -translate-x-1/2 text-center text-[0.98rem] leading-snug transition-opacity duration-150 ${
            active
              ? "text-paper"
              : "text-paper-dim opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
          style={{ left: "50%" }}
        >
          {entry.title}
        </span>
        <span
          className={`block h-3 w-3 rounded-full border transition-all ${
            active
              ? "scale-125 border-ember-bright bg-ember-bright shadow-[0_0_12px_rgba(157,100,24,0.3)]"
              : entry.zone === "crime"
                ? "border-rust-bright bg-rust/40"
                : "border-ember bg-ember/20"
          }`}
        />
        <span
          className={`meta-mono absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 text-center text-[0.85rem] font-medium leading-tight transition-opacity duration-150 ${
            active
              ? "text-ember-bright"
              : "text-paper-dim opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        >
          {entry.date}
        </span>
      </button>
    </div>
  );
}

/* ------------------------ vertical (mobile) ------------------------ */

function TimelineVertical({
  entries,
  selected,
  onSelect,
}: {
  entries: TimelineEntry[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ol className="relative flex list-none flex-col gap-1 pl-8 m-0">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-0 w-px bg-line-strong"
      />
      {entries.map((e, i) => {
        const open = e.id === selected;
        return (
          <li key={e.id} className="relative pb-2">
            <span
              aria-hidden="true"
              className={`absolute -left-8 top-2 h-3 w-3 rounded-full border ${
                open
                  ? "border-ember-bright bg-ember-bright"
                  : e.zone === "crime"
                    ? "border-rust-bright bg-rust/40"
                    : "border-ember bg-ink-2"
              } ${i === 0 ? "ring-2 ring-ember/30" : ""}`}
            />
            <button
              type="button"
              aria-expanded={open}
              onClick={() => onSelect(open ? "" : e.id)}
              className={`w-full border px-4 py-3 text-left transition-colors ${
                open
                  ? e.zone === "crime"
                    ? "border-rust/50 bg-ink-3"
                    : "border-ember/50 bg-ink-3"
                  : "border-transparent hover:bg-ink-2"
              }`}
            >
              <p className="meta-mono text-[0.62rem] uppercase tracking-[0.16em] text-ember">
                {e.date}
              </p>
              <p className="display mt-1 text-[1.15rem] text-paper">{e.title}</p>
            </button>
            {open && (
              <div className="border border-t-0 border-ember/40 bg-ink-3 px-4 pb-4 pt-2">
                <p className="story-body text-[1rem] text-paper-dim">
                  {e.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
                  ))}
                </div>
              </div>
            )}
          </li>
        );
      })}
      <li className="pl-4 pt-2">
        <p className="note text-paper-faint">
          Vertical list on small screens — the horizontal, time-scaled version
          returns on wider displays.
        </p>
      </li>
    </ol>
  );
}

function TimelineDetail({ entry }: { entry: TimelineEntry }) {
  return (
    <div
      aria-live="polite"
      className="mt-6 border border-line bg-ink-3 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="meta-mono text-[0.7rem] uppercase tracking-[0.18em] text-ember">
          {entry.date}
        </p>
        <p className="meta-mono text-paper-faint">
          {entry.zone === "crime" ? "Band 1 · the crime & arrest" : "Band 2 · the appeals"}
        </p>
      </div>
      <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.2rem)] text-paper">
        {entry.title}
      </h3>
      <p className="story-body mt-4 max-w-3xl text-paper-dim">
        {entry.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2 border-line pt-4">
        {entry.tags.map((t) => (
          <EvidenceTag key={t.label} label={t.label} kind={t.kind} />
        ))}
      </div>
    </div>
  );
}