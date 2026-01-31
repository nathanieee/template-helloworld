export const SCENE_DURATION = 300; // 10 seconds @ 30fps
export const FPS = 30;
export const TOTAL_FRAMES = 9000; // 5 minutes @ 30fps

// Generate frame ranges for all 30 scenes
export const sceneFrames: Record<string, { from: number; to: number }> = {};
for (let i = 0; i < 30; i++) {
  sceneFrames[`scene${i}`] = {
    from: i * SCENE_DURATION,
    to: (i + 1) * SCENE_DURATION,
  };
}

// Helper to get progress within a scene (0-1)
export function getSceneProgress(
  currentFrame: number,
  sceneIndex: number
): number {
  const startFrame = sceneIndex * SCENE_DURATION;
  const progress = (currentFrame - startFrame) / SCENE_DURATION;
  return Math.max(0, Math.min(1, progress));
}

// Helper to check if frame is within a scene
export function isFrameInScene(
  currentFrame: number,
  sceneIndex: number
): boolean {
  return (
    currentFrame >= sceneIndex * SCENE_DURATION &&
    currentFrame < (sceneIndex + 1) * SCENE_DURATION
  );
}
