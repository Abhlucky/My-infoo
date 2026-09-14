import { motion } from "framer-motion";
import { useState } from "react";
import { EXPERIMENTS, SOCIALS } from "../data/content";
import { scrollState } from "../lib/scrollState";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 1, ease: easeOut },
  }),
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 font-mono-ui text-[11px] uppercase tracking-[0.4em] text-[#5eb1ff]/80">
      {children}
    </div>
  );
}

function BigNumber({ n }: { n: string }) {
  return (
    <span className="pointer-events-none absolute -top-10 left-0 select-none font-mono-ui text-[13vw] font-light leading-none text-white/[0.04] sm:text-[9vw]">
      {n}
    </span>
  );
}

const viewport = { once: true, amount: 0.5 } as const;

/* ---------------------------------------------------------------- */
export function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.4 }}
        className="mb-6 font-mono-ui text-[11px] uppercase tracking-[0.5em] text-white/40"
      >
        Enter the unknown
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, filter: "blur(18px)", letterSpacing: "0.3em" }}
        animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0em" }}
        transition={{ delay: 0.4, duration: 2.2, ease: easeOut }}
        className="text-glow text-[15vw] font-extrabold leading-[0.85] tracking-tight sm:text-[10vw]"
      >
        LUCKY SHAH
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.2, ease: easeOut }}
        className="mt-5 text-xl font-light tracking-wide text-white/70 sm:text-2xl"
      >
        aka Abhay Kumar
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="mt-4 font-mono-ui text-xs uppercase tracking-[0.35em] text-[#5eb1ff]"
      >
        AI / ML &nbsp;•&nbsp; Python &nbsp;•&nbsp; Vibe Coder
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll to enter
        </span>
        <svg width="16" height="26" viewBox="0 0 16 26" className="float-y text-white/50">
          <path d="M8 0 V22 M2 16 L8 22 L14 16" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function AboutSection() {
  return (
    <section className="relative flex h-screen w-full items-center px-6 sm:px-14">
      <div className="relative max-w-3xl">
        <BigNumber n="01" />
        <Kicker>Who am I?</Kicker>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-glow text-[13vw] font-extrabold leading-[0.85] tracking-tight sm:text-[7vw]"
        >
          I'M LUCKY.
        </motion.h2>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-6 text-lg text-white/60"
        >
          aka <span className="text-white">Abhay Kumar</span>
        </motion.p>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-2 font-mono-ui text-sm uppercase tracking-[0.3em] text-[#5eb1ff]"
        >
          AI/ML Student &nbsp;•&nbsp; IIT Patna
        </motion.p>
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 max-w-lg text-balance text-base leading-relaxed text-white/50"
        >
          Exploring Artificial Intelligence and Machine Learning while learning Python and
          building things through curiosity, experimentation and vibe coding.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function JourneySection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="02" />
      <Kicker>The journey</Kicker>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[10vw] font-extrabold leading-[0.9] tracking-tight sm:text-[5vw]"
      >
        IIT PATNA
      </motion.h2>
      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-3 font-mono-ui text-sm uppercase tracking-[0.4em] text-[#5eb1ff]"
      >
        AI / ML — My Journey
      </motion.p>
      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-8 max-w-md text-sm text-white/40"
      >
        A glowing timeline, receding into the distance — follow it with your scroll.
      </motion.p>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function JeeSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center px-6 text-center">
      <div>
        <Kicker>The moment</Kicker>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-mono-ui text-sm uppercase tracking-[0.4em] text-white/40"
        >
          JEE Result
        </motion.p>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 text-sm text-white/40"
        >
          Particles that once formed a number now form a place —
        </motion.p>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-glow mt-1 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          IIT PATNA.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function AiSection() {
  return (
    <section className="relative flex h-screen w-full items-center px-6 sm:px-14">
      <div className="relative max-w-2xl">
        <BigNumber n="04" />
        <Kicker>The AI chamber</Kicker>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-glow text-[11vw] font-extrabold leading-[0.85] tracking-tight sm:text-[6vw]"
        >
          ARTIFICIAL
          <br />
          INTELLIGENCE
        </motion.h2>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-6 text-lg text-white/50"
        >
          Learning how machines learn.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function MlSection() {
  const words = ["DATA", "PATTERNS", "MODELS", "EXPERIMENTS", "LOGIC"];
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="05" />
      <Kicker>Currently exploring</Kicker>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[11vw] font-extrabold leading-[0.9] tracking-tight sm:text-[6vw]"
      >
        MACHINE LEARNING
      </motion.h2>
      <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {words.map((w, i) => (
          <motion.span
            key={w}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="font-mono-ui text-xs uppercase tracking-[0.3em] text-white/40"
          >
            {w}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function PythonSection() {
  return (
    <section className="relative flex h-screen w-full items-center px-6 sm:px-14">
      <div className="relative max-w-xl">
        <BigNumber n="06" />
        <Kicker>Currently learning</Kicker>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-glow font-mono-ui text-[13vw] font-bold leading-[0.85] tracking-tight sm:text-[7vw]"
        >
          PYTHON
        </motion.h2>
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-2 font-mono-ui text-xs uppercase tracking-[0.3em] text-[#5eb1ff]"
        >
          Level 01 <span className="text-white/30">/</span> Learning mode
          <span className="blink-cursor h-3 w-[2px] bg-[#5eb1ff]" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function VibeSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="07" />
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[16vw] font-extrabold leading-[0.8] tracking-tighter sm:text-[9vw]"
      >
        VIBE
        <br />
        CODER
      </motion.h2>
      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-8 text-lg italic text-white/50"
      >
        Ideas first. Code second. Curiosity always.
      </motion.p>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function EngineSection() {
  const steps = ["IDEA", "CODE", "AI", "EXPERIMENT", "REALITY"];
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="08" />
      <Kicker>The idea engine</Kicker>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[9vw] font-extrabold tracking-tight sm:text-[4.5vw]"
      >
        IDEA ENGINE
      </motion.h2>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono-ui text-xs uppercase tracking-[0.3em]">
        {steps.map((s, i) => (
          <motion.span
            key={s}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className={`flex items-center gap-3 ${
              s === "REALITY" ? "text-[#5eb1ff]" : "text-white/40"
            }`}
          >
            {s}
            {i < steps.length - 1 && <span className="text-white/20">→</span>}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function ExperimentsSection() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24">
      <div className="relative mb-16 text-center">
        <BigNumber n="09" />
        <Kicker>Selected work</Kicker>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-glow text-[13vw] font-extrabold leading-[0.85] tracking-tight sm:text-[7vw]"
        >
          EXPERIMENTS
        </motion.h2>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {EXPERIMENTS.map((exp, i) => (
          <motion.button
            key={exp.title + i}
            data-cursor="big"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            onMouseEnter={() => (scrollState.hoveredProject = i)}
            onMouseLeave={() => (scrollState.hoveredProject = -1)}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-[#5eb1ff]/50 hover:bg-white/[0.04]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#5eb1ff]">
                {exp.category}
              </span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/30">
                {exp.status}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white/90 group-hover:text-white">
              {exp.title}
            </h3>
            <p className="mt-2 text-sm text-white/40">{exp.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-white/30"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <div className="max-w-lg text-center">
            <span className="font-mono-ui text-xs uppercase tracking-[0.3em] text-[#5eb1ff]">
              {EXPERIMENTS[active].category} &nbsp;•&nbsp; {EXPERIMENTS[active].status}
            </span>
            <h3 className="text-glow mt-4 text-4xl font-bold">{EXPERIMENTS[active].title}</h3>
            <p className="mt-4 text-white/60">{EXPERIMENTS[active].desc}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {EXPERIMENTS[active].stack.map((s) => (
                <span
                  key={s}
                  className="border border-white/10 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/50"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-8 font-mono-ui text-[10px] uppercase tracking-[0.3em] text-white/30">
              Tap anywhere to close
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function SoulSection() {
  const words = ["LEARN", "BUILD", "BREAK", "UNDERSTAND", "REBUILD"];
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="10" />
      <Kicker>The digital soul</Kicker>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[11vw] font-extrabold tracking-tight sm:text-[6vw]"
      >
        CURIOSITY
      </motion.h2>
      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono-ui text-xs uppercase tracking-[0.3em] text-white/40">
        {words.map((w, i) => (
          <motion.span
            key={w}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {w}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function FutureSection() {
  const words = ["AI", "ML", "PYTHON", "CREATIVE TECHNOLOGY", "MORE EXPERIMENTS"];
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="11" />
      <Kicker>What's next?</Kicker>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[9vw] font-extrabold tracking-tight sm:text-[5vw]"
      >
        WHAT'S NEXT?
      </motion.h2>
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {words.map((w, i) => (
          <motion.span
            key={w}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="font-mono-ui text-xs uppercase tracking-[0.3em] text-[#5eb1ff]/80"
          >
            {w}
          </motion.span>
        ))}
      </div>
      <motion.h3
        custom={words.length + 1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-12 text-4xl font-extrabold tracking-tight sm:text-5xl"
      >
        BUILD. LEARN. REPEAT.
      </motion.h3>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function ContactSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <BigNumber n="12" />
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[13vw] font-extrabold leading-[0.85] tracking-tight sm:text-[7vw]"
      >
        LET'S BUILD
        <br />
        SOMETHING.
      </motion.h2>
      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-6 text-lg text-white/50"
      >
        Got an idea? Let's turn it into an experiment.
      </motion.p>
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3"
      >
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            data-cursor="big"
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="font-mono-ui text-xs uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-[#5eb1ff]"
          >
            {s.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
export function EndingSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-glow text-[13vw] font-extrabold leading-[0.85] tracking-tight sm:text-[7vw]"
      >
        LUCKY SHAH
      </motion.h2>
      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-4 text-lg text-white/50"
      >
        aka Abhay Kumar
      </motion.p>
      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.35em] text-[#5eb1ff]/70"
      >
        AI/ML • Python • Vibe Coding
      </motion.p>
      <motion.p
        custom={3}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-14 font-mono-ui text-sm uppercase tracking-[0.5em] text-white"
      >
        Keep building.
      </motion.p>
    </section>
  );
}
