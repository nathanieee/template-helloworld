import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt/KurzgesagtCube";
import { DataParticles } from "../animation-engine/particles";
import { colors } from "../styles/colors";

interface Scene12RequestProps {
  titleText?: string;
}

/**
 * Scene12: The Request
 * Envelope with spring animation follows path from user to server
 * Features: Bouncy envelope travel, spring easing, cube anticipates
 */
export const Scene12Request: React.FC<Scene12RequestProps> = ({
  titleText = "THE REQUEST",
}) => {
  const frame = useCurrentFrame();

  // Animation timing
  const sceneStart = 0;
  const userEnterEnd = 60;
  const cubeAppearEnd = 90;
  const envelopeStart = 100;
  const envelopeEnd = 200;
  const cubeReactStart = 190;
  const cubeReactEnd = 230;

  // User enters with spring
  const userProgress = springForFrame(frame, sceneStart, userEnterEnd, 0.25, 0.7);
  const userX = 200 + userProgress * 300;

  // Server cube appears
  const cubeProgress = springForFrame(frame, 30, cubeAppearEnd, 0.2, 0.65);
  const cubeY = 540 - (1 - cubeProgress) * 150;

  // Envelope travels with spring easing on path
  const envelopeProgress = springForFrame(frame, envelopeStart, envelopeEnd, 0.3, 0.6);

  // Envelope path points (curved from user to server)
  const envelopePath = [
    { x: 500, y: 750 },
    { x: 700, y: 700 },
    { x: 850, y: 620 },
    { x: 960, y: 540 },
  ];

  // Calculate envelope position along path
  const getEnvelopePosition = (progress: number) => {
    if (envelopePath.length === 0) return { x: 0, y: 0 };
    const totalSegments = envelopePath.length - 1;
    const exactPosition = progress * totalSegments;
    const segmentIndex = Math.floor(exactPosition);
    const segmentProgress = exactPosition - segmentIndex;

    const p1 = envelopePath[Math.min(segmentIndex, envelopePath.length - 1)];
    const p2 = envelopePath[Math.min(segmentIndex + 1, envelopePath.length - 1)];

    return {
      x: p1.x + (p2.x - p1.x) * segmentProgress,
      y: p1.y + (p2.y - p1.y) * segmentProgress,
    };
  };

  const envelopePos = getEnvelopePosition(envelopeProgress);

  // Envelope rotation follows path direction
  const envelopeRotation = interpolate(envelopeProgress, [0, 0.3, 0.7, 1], [-15, -20, 0, 0]);

  // Envelope squash and stretch
  const envelopeSquash = 1 + Math.sin(envelopeProgress * Math.PI * 4) * 0.05 * (1 - envelopeProgress);

  // Cube reacts (tilts head, raises eyebrow) when envelope arrives
  const cubeReactProgress = springForFrame(frame, cubeReactStart, cubeReactEnd, 0.4, 0.7);

  // Cube emotion changes as envelope approaches
  const getCubeEmotion = (): CubeEmotion => {
    if (envelopeProgress < 0.7) return "neutral";
    if (envelopeProgress < 0.95) return "surprised";
    return "happy";
  };

  // Title fade
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow pulse on server
  const glowIntensity = 0.3 + cubeReactProgress * 0.4;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background - subtle gradient */}
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.backgroundLight} />
            <stop offset="100%" stopColor={colors.background} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation={3} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width={1920} height={1080} fill="url(#bgGradient)" />

        {/* Connection line - dashed path */}
        <g opacity={0.4}>
          <path
            d="M 500 750 Q 700 700 850 620 L 960 540"
            stroke={colors.network}
            strokeWidth={3}
            fill="none"
            strokeDasharray="10 5"
            strokeLinecap="round"
          />
        </g>

        {/* Server Cube */}
        <g transform={`translate(960 - 60, ${cubeY - 60})`}>
          {/* Glow effect */}
          <ellipse
            cx={60}
            cy={60}
            rx={80 * (1 + glowIntensity * 0.5)}
            ry={80 * (1 + glowIntensity * 0.3)}
            fill={colors.users}
            opacity={0.1 * glowIntensity}
          />

          <KurzgesagtCube
            x={0}
            y={0}
            size={120}
            color={colors.monolith}
            emotion={getCubeEmotion()}
            glow={envelopeProgress > 0.7}
            pulseConfig={{
              min: 0.97,
              max: 1.03,
              speed: 0.06,
              phase: frame * 0.03,
            }}
          />
        </g>

        {/* User figure */}
        <KurzgesagtStickFigure
          x={userX}
          y={750}
          scale={1.4}
          color={colors.users}
          facingRight={true}
          walking={userProgress < 1}
          walkCycle={(frame / 15) % 1}
        />

        {/* Envelope - follows path with spring animation */}
        {envelopeProgress > 0 && (
          <g
            transform={`translate(${envelopePos.x}, ${envelopePos.y}) rotate(${envelopeRotation}) scale(${envelopeSquash})`}
            style={{ transformOrigin: "center" }}
          >
            {/* Envelope shadow */}
            <ellipse
              cx={0}
              cy={35}
              rx={40}
              ry={10}
              fill="black"
              opacity={0.2}
            />

            {/* Envelope body */}
            <rect
              x={-45}
              y={-30}
              width={90}
              height={60}
              fill={colors.usersLight}
              rx={8}
              stroke={colors.usersDark}
              strokeWidth={2}
            />

            {/* Envelope flap */}
            <path
              d="M -45 -30 L 0 5 L 45 -30"
              fill={colors.users}
              stroke={colors.usersDark}
              strokeWidth={2}
              strokeLinejoin="round"
            />

            {/* Data indicator on envelope */}
            <circle
              cx={0}
              cy={0}
              r={12}
              fill={colors.background}
              opacity={0.8}
            />
            <rect
              x={-8}
              y={-3}
              width={16}
              height={6}
              fill={colors.users}
              rx={2}
            />

            {/* Motion trail */}
            {envelopeProgress < 1 && (
              <g opacity={0.3}>
                <ellipse
                  cx={-30}
                  cy={0}
                  rx={15}
                  ry={8}
                  fill={colors.usersLight}
                />
                <ellipse
                  cx={-50}
                  cy={0}
                  rx={10}
                  ry={5}
                  fill={colors.usersLight}
                />
              </g>
            )}
          </g>
        )}

        {/* Data particles trailing envelope */}
        {frame >= envelopeStart && frame < envelopeEnd && (
          <DataParticles
            path={envelopePath}
            count={4}
            startFrame={envelopeStart}
            duration={envelopeEnd - envelopeStart}
            color={colors.usersLight}
            size={6}
            spacing={25}
          />
        )}

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={colors.text}
          fontSize={64}
          fontWeight="bold"
          opacity={titleOpacity}
          fontFamily="Arial, sans-serif"
          letterSpacing={6}
        >
          {titleText}
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={180}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={24}
          opacity={subtitleOpacity}
          fontFamily="Arial, sans-serif"
        >
          A request begins its journey through the system
        </text>

        {/* Request label near envelope */}
        {envelopeProgress > 0.3 && envelopeProgress < 0.9 && (
          <g transform={`translate(${envelopePos.x}, ${envelopePos.y - 60})`}>
            <rect
              x={-50}
              y={-15}
              width={100}
              height={30}
              fill={colors.monolithDark}
              opacity={0.8}
              rx={15}
            />
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill={colors.text}
              fontSize={14}
              fontFamily="Arial, sans-serif"
            >
              GET /api/data
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
