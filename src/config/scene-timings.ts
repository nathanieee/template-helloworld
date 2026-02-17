export const SCENE_TIMINGS = {
  scene1Hook: { start: 0, end: 300, duration: 300 },
  scene2Monolith: { start: 300, end: 750, duration: 450 },
  scene3Intro: { start: 750, end: 1350, duration: 600 },
  scene4Resilience: { start: 1350, end: 1950, duration: 600 },
  scene5Scaling: { start: 1950, end: 2550, duration: 600 },
  scene6TechFreedom: { start: 2550, end: 3000, duration: 450 },
  scene7Tradeoffs: { start: 3000, end: 3300, duration: 300 },
  scene8Outro: { start: 3300, end: 3600, duration: 300 },
} as const;

export type SceneKey = keyof typeof SCENE_TIMINGS;
