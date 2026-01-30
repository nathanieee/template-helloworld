import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface Subtitle {
  startFrame: number;
  endFrame: number;
  text: string;
}

interface SubtitleTrackProps {
  subtitles: Subtitle[];
  style?: "typewriter" | "fade";
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Animated subtitle track
 * Kurzgesagt-style rounded pill shape at bottom
 */
export const SubtitleTrack: React.FC<SubtitleTrackProps> = ({
  subtitles,
  style = "typewriter",
  backgroundColor = "rgba(10, 14, 39, 0.9)",
  textColor = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();

  // Find active subtitle
  const active = subtitles.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );

  if (!active) return null;

  const progress = (frame - active.startFrame) / (active.endFrame - active.startFrame);

  let displayText = active.text;

  if (style === "typewriter") {
    const charCount = Math.floor(active.text.length * interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }));
    displayText = active.text.slice(0, charCount);
  }

  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor,
          color: textColor,
          padding: "16px 32px",
          borderRadius: 24,
          fontSize: 32,
          fontWeight: 600,
          opacity,
          maxWidth: 1400,
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {displayText}
        {style === "typewriter" && progress < 0.3 && (
          <span style={{ animation: "blink 1s infinite" }}>|</span>
        )}
      </div>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </AbsoluteFill>
  );
};
