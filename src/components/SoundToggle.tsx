import { useEffect, useRef, useState } from "react";
import { scrollState } from "../lib/scrollState";

// Fully synthesised, code-generated ambience — no audio assets required.
// Two detuned low oscillators + slow LFO on gain create a soft atmospheric
// drone. A short bandpass "blip" plays on toggle for tactile feedback.
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    return ctxRef.current!;
  };

  const startDrone = () => {
    const ctx = ensureCtx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const freqs = [55, 82.5, 110];
    const oscs: OscillatorNode[] = [];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 1 ? "triangle" : "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.05 / (i + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      osc.connect(g);
      g.connect(master);
      osc.start();
      lfo.start();
      oscs.push(osc);
    });

    master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.4);
    gainRef.current = master;
    nodesRef.current = oscs;
  };

  const stopDrone = () => {
    const ctx = ctxRef.current;
    const master = gainRef.current;
    if (!ctx || !master) return;
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  };

  const blip = () => {
    const ctx = ensureCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = on ? 320 : 640;
    g.gain.value = 0.0001;
    osc.connect(g);
    g.connect(ctx.destination);
    const t = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    osc.start(t);
    osc.stop(t + 0.3);
  };

  const toggle = () => {
    blip();
    setOn((v) => {
      const next = !v;
      scrollState.soundOn = next;
      if (next) startDrone();
      else stopDrone();
      return next;
    });
  };

  useEffect(() => {
    return () => {
      nodesRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* noop */
        }
      });
      ctxRef.current?.close();
    };
  }, []);

  return (
    <button
      data-cursor="big"
      onClick={toggle}
      aria-pressed={on}
      className="pointer-events-auto fixed bottom-6 right-4 z-50 flex items-center gap-2 font-mono-ui text-[10px] tracking-[0.2em] text-white/50 transition-colors hover:text-white sm:right-6"
    >
      <span className="relative flex h-2 w-2">
        {on && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5eb1ff] opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${on ? "bg-[#5eb1ff]" : "bg-white/40"}`}
        />
      </span>
      SOUND {on ? "ON" : "OFF"}
    </button>
  );
}
