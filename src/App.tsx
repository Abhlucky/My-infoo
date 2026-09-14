import { useEffect } from "react";
import World from "./three/World";
import CustomCursor from "./components/CustomCursor";
import ChapterNav from "./components/ChapterNav";
import SoundToggle from "./components/SoundToggle";
import { scrollState, CHAPTER_COUNT } from "./lib/scrollState";
import { useChapter } from "./lib/useChapter";
import {
  HeroSection,
  AboutSection,
  JourneySection,
  JeeSection,
  AiSection,
  MlSection,
  PythonSection,
  VibeSection,
  EngineSection,
  ExperimentsSection,
  SoulSection,
  FutureSection,
  ContactSection,
  EndingSection,
} from "./sections/Sections";

function useScrollDriver() {
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.raw = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      scrollState.mouseX = (t.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (t.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);
}

export default function App() {
  useScrollDriver();

  return (
    <div className="relative w-full bg-[#05050a] text-[#f2f3f7]">
      <World />

      {/* cinematic vignette + grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[40]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[41] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <CustomCursor />
      <ChapterNav />
      <SoundToggle />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <JeeSection />
        <AiSection />
        <MlSection />
        <PythonSection />
        <VibeSection />
        <EngineSection />
        <ExperimentsSection />
        <SoulSection />
        <FutureSection />
        <ContactSection />
        <EndingSection />
      </main>

      <ChapterCounter />
    </div>
  );
}

function ChapterCounter() {
  const chapter = useChapter();
  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-50 font-mono-ui text-[10px] uppercase tracking-[0.3em] text-white/25 sm:left-6">
      {String(chapter + 1).padStart(2, "0")} / {String(CHAPTER_COUNT).padStart(2, "0")}
    </div>
  );
}
