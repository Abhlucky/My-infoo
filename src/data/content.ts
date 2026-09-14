export interface ChapterMeta {
  id: string;
  num: string;
  nav: string;
}

// 14 chapters -> also drives the depth of the 3D world (see World.tsx)
export const CHAPTERS: ChapterMeta[] = [
  { id: "hero", num: "00", nav: "ENTER" },
  { id: "about", num: "01", nav: "ABOUT" },
  { id: "journey", num: "02", nav: "JOURNEY" },
  { id: "jee", num: "03", nav: "JEE" },
  { id: "ai", num: "04", nav: "A.I." },
  { id: "ml", num: "05", nav: "M.L." },
  { id: "python", num: "06", nav: "PYTHON" },
  { id: "vibe", num: "07", nav: "VIBE" },
  { id: "engine", num: "08", nav: "ENGINE" },
  { id: "experiments", num: "09", nav: "WORK" },
  { id: "soul", num: "10", nav: "SOUL" },
  { id: "future", num: "11", nav: "NEXT" },
  { id: "contact", num: "12", nav: "CONTACT" },
  { id: "ending", num: "13", nav: "END" },
];

export interface Experiment {
  category: "AI" | "WEB" | "AUTOMATION" | "CREATIVE CODE";
  title: string;
  status: string;
  desc: string;
  stack: string[];
  github?: string;
  live?: string;
}

// No fabricated projects, awards or metrics — only honest, in-progress
// experiments. Replace these with real work as it ships.
export const EXPERIMENTS: Experiment[] = [
  {
    category: "AI",
    title: "Untitled AI Experiment",
    status: "IN PROGRESS",
    desc: "A small machine-learning experiment born from curiosity. Details land here once it's ready to show.",
    stack: ["Python", "NumPy"],
  },
  {
    category: "WEB",
    title: "Untitled Web Build",
    status: "PROTOTYPING",
    desc: "An experiment in interactive, cinematic front-end design — currently taking shape.",
    stack: ["React", "Three.js"],
  },
  {
    category: "AUTOMATION",
    title: "Untitled Script",
    status: "SKETCHING",
    desc: "A small tool to automate something repetitive. Idea stage — code coming soon.",
    stack: ["Python"],
  },
  {
    category: "CREATIVE CODE",
    title: "Untitled Study",
    status: "EXPLORING",
    desc: "A playground for generative and creative-coding ideas. More soon.",
    stack: ["JavaScript", "WebGL"],
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Discord", href: "#" },
  { label: "Email", href: "mailto:hello@example.com" },
];
