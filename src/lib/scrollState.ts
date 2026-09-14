// A mutable, module-level "world state" singleton.
// We deliberately avoid putting fast-changing values (scroll / mouse) into React
// state or a reactive store, because they update on every animation frame.
// Reading/writing plain object fields keeps the cinematic camera + particle
// system perfectly smooth (no re-render storms), while a tiny React hook below
// lets UI (nav, HUD) poll the slow-changing bits (chapter index, sound).

export const CHAPTER_COUNT = 14;

export const scrollState = {
  raw: 0, // 0..1 real scroll progress
  smooth: 0, // eased progress used to drive the camera
  velocity: 0,
  mouseX: 0, // -1..1
  mouseY: 0, // -1..1
  chapter: 0,
  hoveredProject: -1,
  soundOn: false,
  reducedMotion:
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  isTouch: typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
};


