import { useState } from "react";
import { CHAPTERS } from "../data/content";
import { useChapter } from "../lib/useChapter";

export default function ChapterNav() {
  const active = useChapter();
  const [hover, setHover] = useState<number | null>(null);

  const goTo = (i: number) => {
    const y = i * window.innerHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      className="pointer-events-auto fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-[6px] sm:right-6 md:flex"
      aria-label="Chapter navigation"
    >
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          data-cursor="big"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          onClick={() => goTo(i)}
          className="group flex items-center gap-3 py-[3px] font-mono-ui text-[10px] tracking-[0.2em] text-white/50 transition-colors hover:text-white"
        >
          <span
            className={`whitespace-nowrap uppercase transition-all duration-300 ${
              hover === i ? "max-w-[140px] opacity-100 translate-x-0" : "max-w-0 opacity-0 translate-x-2"
            } overflow-hidden`}
          >
            {c.nav}
          </span>
          <span
            className={`h-[2px] rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-[#5eb1ff]" : "w-3 bg-white/30 group-hover:bg-white/70"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
