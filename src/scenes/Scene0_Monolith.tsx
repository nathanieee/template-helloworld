import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { springForFrame } from "../animation-engine/easing";
import { DustParticles, StarField } from "../animation-engine/particles";
import { colors } from "../styles/colors";

interface Scene0MonolithProps {
  /** Title text to display */
  titleText?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom monolith color */
  monolithColor?: string;
}

/**
 * Scene0: The Monolith
 * Opening scene with a mysterious monolith rising from darkness
 * Features bouncy spring animation and atmospheric particle effects
 */
export const Scene0Monolith: React.FC<Scene0MonolithProps> = ({
  titleText = "THE MONOLITH",
  backgroundColor = colors.background,
  monolithColor = colors.monolith,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timing
  const monolithRiseStart = 30;
  const monolithRiseEnd = 90;
  const titleFadeStart = 100;
  const titleFadeEnd = 130;

  // Monolith rise animation with spring easing for bouncy arrival
  const riseProgress = springForFrame(
    frame,
    monolithRiseStart,
    monolithRiseEnd,
    0.15, // stiffness - lower = more bounce
    0.65 // damping - lower = more oscillation
  );

  // Monolith dimensions
  const monolithWidth = 200;
  const monolithHeight = 500;
  const centerX = 960;
  const groundY = 850;

  // Calculate monolith position (rises from below ground)
  const monolithY = groundY - monolithHeight * riseProgress;

  // Shadow grows as monolith rises
  const shadowWidth = monolithWidth * (0.5 + 0.5 * riseProgress);
  const shadowOpacity = 0.1 + 0.2 * riseProgress;

  // Title fade in
  const titleOpacity =
    frame < titleFadeStart
      ? 0
      : frame >= titleFadeEnd
        ? 1
        : (frame - titleFadeStart) / (titleFadeEnd - titleFadeStart);

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Background stars with parallax */}
      <StarField count={150} layers={3} parallaxIntensity={0.3} />

      {/* Ambient dust particles */}
      <DustParticles count={40} size={{ min: 1, max: 3 }} opacity={{ min: 0.1, max: 0.3 }} speed={0.2} />

      {/* Shadow beneath monolith */}
      <ellipse
        cx={centerX}
        cy={groundY + 5}
        rx={shadowWidth / 2}
        ry={15}
        fill="black"
        opacity={shadowOpacity}
      />

      {/* The Monolith */}
      <g>
        {/* Main body */}
        <rect
          x={centerX - monolithWidth / 2}
          y={monolithY}
          width={monolithWidth}
          height={monolithHeight}
          fill={monolithColor}
          rx={4} // Rounded corners
        />

        {/* Highlight gradient on left edge */}
        <rect
          x={centerX - monolithWidth / 2}
          y={monolithY}
          width={15}
          height={monolithHeight}
          fill={colors.monolithLight}
          opacity={0.3}
          rx={4}
        />

        {/* Shadow on right edge */}
        <rect
          x={centerX + monolithWidth / 2 - 20}
          y={monolithY}
          width={20}
          height={monolithHeight}
          fill={colors.monolithDark}
          opacity={0.4}
          rx={4}
        />

        {/* Subtle top highlight */}
        <rect
          x={centerX - monolithWidth / 2 + 10}
          y={monolithY + 10}
          width={monolithWidth - 20}
          height={2}
          fill={colors.highlight}
          rx={1}
        />
      </g>

      {/* Title text */}
      {titleOpacity > 0 && (
        <text
          x={centerX}
          y={200}
          textAnchor="middle"
          fill={colors.text}
          fontSize={48}
          fontWeight="bold"
          opacity={titleOpacity}
          fontFamily="Arial, sans-serif"
          letterSpacing={8}
        >
          {titleText}
        </text>
      )}
    </AbsoluteFill>
  );
};
