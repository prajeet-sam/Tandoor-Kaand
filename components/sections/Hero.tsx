"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

const GLOW_TRANSITION: Transition = {
  duration: 6,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

/**
 * 4.1 — Hero / Cold Open. A single restrained line, a scroll cue, and a
 * slow amber glow. Nothing literal or graphic: the glow evokes ember
 * without depicting fire.
 */
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="cold-open"
      aria-labelledby="cold-open-title"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden border-line"
    >
      {/* subtle ember glow — abstract, not literal */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0.75 }}
          transition={GLOW_TRANSITION}
          style={{
            background:
              "radial-gradient(circle, rgba(198,143,60,0.16) 0%, rgba(198,143,60,0.05) 45%, transparent 70%)",
          }}
        />
      )}

      {/* case-file jacket strip + classification stamp */}
      <p
        className="meta-mono absolute left-5 top-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6rem] tracking-[0.18em] text-paper-faint sm:left-8 sm:text-[0.62rem]"
        aria-label="Case jacket: file number, registration and jurisdiction"
      >
        <span>★ FILE NO. EXH-CR/95-04</span>
        <span aria-hidden="true" className="text-ember/50">·</span>
        <span>REG 04 JUL 1995</span>
        <span aria-hidden="true" className="text-ember/50">·</span>
        <span>JURIS DELHI</span>
        <span aria-hidden="true" className="text-ember/50">·</span>
        <span className="text-rust-bright">RESTRICTED</span>
      </p>

      <span
        aria-hidden="true"
        className="stamp absolute right-6 top-8 hidden sm:inline-flex"
      >
        Confidential
      </span>

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="kicker mb-10 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-ember/60" aria-hidden="true" />
            An investigative case file
          </p>
        </motion.div>

        <motion.h1
          id="cold-open-title"
          className="display text-paper text-[clamp(2.7rem,8vw,6rem)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          The Tandoor Case
        </motion.h1>

        <motion.p
          className="meta-mono mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <span className="text-paper-faint">CASE OF</span>
          <span className="text-ember-bright">MURDER OF NAINA SAHNI</span>
          <span aria-hidden="true" className="text-ember/50">·</span>
          <span>NEW DELHI</span>
          <span aria-hidden="true" className="text-ember/50">·</span>
          <span>2 JULY 1995</span>
        </motion.p>

        <motion.p
          className="meta-mono mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="text-paper-faint">PREPARED BY</span>
          <a
            href="https://www.linkedin.com/in/anushka-vinay-chitnis-697b0540b/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-ember-bright underline decoration-ember/40 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
          >
            ANUSHKA VINAY CHITNIS
          </a>
        </motion.p>

        <motion.p
          className="story-body mt-10 max-w-2xl text-paper-dim"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          New Delhi. 2 July 1995. Sushil Sharma shot his wife, Naina Sahni,
          dead at their Mandir Marg flat — then drove her body to a
          restaurant and lit the tandoor.
        </motion.p>

        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {!reduced ? (
            <motion.span
              aria-hidden="true"
              className="block h-10 w-px bg-gradient-to-b from-ember/80 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span aria-hidden="true" className="block h-10 w-px bg-ember/60" />
          )}
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-paper-faint">
            Scroll — the evidence survived the fire
          </p>
        </motion.div>
      </div>

      <p className="absolute bottom-6 left-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper-faint/60 sm:left-8">
        A long-form, scroll-driven case study
      </p>
    </section>
  );
}