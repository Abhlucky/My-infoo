import { useEffect, useState } from "react";
import { scrollState } from "./scrollState";

// Polls the module-level scroll state at animation-frame rate but only
// triggers a React re-render when the (slow-changing) chapter index changes.
export function useChapter() {
  const [chapter, setChapter] = useState(scrollState.chapter);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (scrollState.chapter !== chapter) setChapter(scrollState.chapter);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [chapter]);

  return chapter;
}
