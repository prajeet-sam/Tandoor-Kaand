"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { actAnchors } from "./section-defs";

interface ActState {
  act: string;
  left: number;
  passed: boolean;
}

const SECTION_LABELS = [
  ["cold-open", "01 · Cold open"],
  ["summary", "02 · The case in sixty seconds"],
  ["background", "03 · Two people, one fault line"],
  ["timeline", "04 · The timeline"],
  ["scene", "05 · Three scenes, one chain"],
  ["staging", "06 · Staging vs. detection"],
  ["autopsy", "07 · The autopsy contradiction"],
  ["verdict", "08 · The verdict ladder"],
  ["legacy", "09 · Why this case matters"],
  ["sources", "10 · Sources & limitations"],
] as const;

function getAnchorProgress(selector: string): number {
  const el = document.querySelector(selector);
  if (!el) return -1;
  const docEl = document.documentElement;
  const total = docEl.scrollHeight - window.innerHeight;
  if (total <= 0) return 0;
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  return Math.min(1, Math.max(0, top / total));
}

/**
 * Slim top progress bar tracking position through all ten sections, with
 * act tick labels (Murder → Investigation → Trial → Appeals → Release).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  const [acts, setActs] = useState<ActState[]>([]);
  const [current, setCurrent] = useState<string>(SECTION_LABELS[0][1]);
  const [shownLabels, setShownLabels] = useState<boolean[]>([]);
  const frame = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const els = SECTION_LABELS.map(([id]) => document.getElementById(id));

    const update = () => {
      const progressNow = scrollYProgress.get();

      const nextActs = actAnchors.map((a) => {
        const p = getAnchorProgress(a.selector);
        return {
          act: a.act,
          left: p < 0 ? -1 : p,
          passed: p >= 0 && progressNow >= p - 0.001,
        };
      });
      setActs(nextActs.filter((n) => n.left >= 0));

      let next = 0;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          next = i;
        }
      }
      setCurrent(SECTION_LABELS[next][1]);
      frame.current = null;
    };

    const onScroll = () => {
      if (frame.current === null) {
        frame.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [scrollYProgress]);

  /* Hide an act label when it would collide with the previous one —
     keeps the tick dots but drops the overlapping word so "Appeals"
     and "Release" never run into each other. */
  useEffect(() => {
    const compute = () => {
      const track = trackRef.current?.clientWidth ?? 0;
      if (!track) return;
      let prevRight = -Infinity;
      const shown = actAnchors.map((a) => {
        const p = getAnchorProgress(a.selector);
        if (p < 0) return false;
        const el = labelEls.current.find((n) => n?.dataset.act === a.act);
        const w = el?.offsetWidth ?? 0;
        const left = p * track - w / 2;
        if (left > prevRight + 14) {
          prevRight = p * track + w / 2;
          return true;
        }
        return false;
      });
      setShownLabels(shown);
    };
    compute();
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 400);
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] shrink-0 border-b border-line/70 bg-ink/90 backdrop-blur-sm"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-ember-deep via-ember to-ember-bright"
        style={{ scaleX }}
      />
      <div ref={trackRef} className="absolute inset-y-0 left-0 right-48">
        {acts.map((a, i) => (
          <span
            key={a.act}
            className={`absolute top-[3px] -translate-x-1/2 font-mono text-[0.55rem] uppercase leading-none tracking-[0.18em] transition-colors duration-500 ${
              a.passed ? "text-ember-bright" : "text-paper-faint"
            }`}
            style={{ left: `${a.left * 100}%` }}
          >
            <span
              className={`mx-auto mb-0.5 block h-1 w-1 rounded-full ${
                a.passed ? "bg-ember-bright" : "bg-line-strong"
              }`}
            />
            <span
              ref={(el) => {
                if (el) labelEls.current[i] = el;
              }}
              data-act={a.act}
              className={`whitespace-nowrap px-1 ${
                shownLabels[i] ? "" : "invisible"
              }`}
            >
              {a.act}
            </span>
          </span>
        ))}
      </div>
      <span className="absolute right-3 top-[3px] hidden font-mono text-[0.55rem] uppercase tracking-[0.2em] text-paper-faint lg:block">
        {current}
      </span>
    </div>
  );
}