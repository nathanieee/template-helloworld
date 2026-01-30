import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame } from "../animation-engine/easing";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt/KurzgesagtCube";
import { useWiggle } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

interface Scene13ProcessingProps {
  titleText?: string;
}

/**
 * Scene13: Processing
 * Cube glow intensifies with thinking animation, envelope being processed
 * Features: useWiggle for thinking animation, pulsing glow, loading indicators
 */
export const Scene13Processing: React.FC<Scene13ProcessingProps> = ({
  titleText = "PROCESSING",
}) => {
  const frame = useCurrentFrame();

  // Animation timing
  const sceneStart = 0;
  const cubeCenterStart = 30;
  const cubeCenterEnd = 80;
  const processingStart = 100;
  const thinkingStart = 120;
  const envelopeArrive = 90;
  const envelopeConsume = 150;
  const glowIntensify = 110;

  // Cube moves to center
  const cubeProgress = springForFrame(frame, cubeCenterStart, cubeCenterEnd, 0.25, 0.7);
  const cubeX = 960 - 60;
  const cubeY = 540 - 60 - (1 - cubeProgress) * 100;

  // Envelope arrives and shrinks into cube
  const envelopeProgress = springForFrame(frame, envelopeArrive, envelopeConsume, 0.3, 0.6);
  const envelopeScale = 1 - envelopeProgress * 0.8;
  const envelopeOpacity = 1 - envelopeProgress * 0.9;
  const envelopeY = 540 + (1 - envelopeProgress) * 200;

  // Glow intensifies during processing
  const glowProgress = springForFrame(frame, glowIntensify, glowIntensify + 60, 0.2, 0.65);
  const glowIntensity = 0.3 + glowProgress * 0.7;

  // Thinking animation with wiggle
  const wiggleX = useWiggle({ amount: 8, frequency: 0.08, phase: 0 });
  const wiggleY = useWiggle({ amount: 6, frequency: 0.12, phase: Math.PI / 4 });

  // Pulse speeds up during processing
  const pulseSpeed = frame < processingStart ? 0.04 : 0.08 + glowProgress * 0.04;
  const pulsePhase = frame * pulseSpeed;

  // Loading spinner rotation
  const spinnerRotation = frame * 8;

  // Processing dots animation
  const dotsCycle = Math.floor(frame / 20) % 4;
  const dot1Opacity = dotsCycle >= 1 ? 1 : 0.3;
  const dot2Opacity = dotsCycle >= 2 ? 1 : 0.3;
  const dot3Opacity = dotsCycle >= 3 ? 1 : 0.3;

  // Emotion changes during processing
  const getCubeEmotion = (): CubeEmotion => {
    if (frame < thinkingStart) return "neutral";
    if (frame < thinkingStart + 60) return "surprised";
    return "worried";
  };

  // Thought bubble appears
  const thoughtBubbleProgress = springForFrame(frame, thinkingStart, thinkingStart + 40, 0.3, 0.65);
  const thoughtBubbleScale = thoughtBubbleProgress;
  const thoughtBubbleOpacity = thoughtBubbleProgress;

  // Title and subtitle fade
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });

  // Status indicator
  const statusPulse = (Math.sin(frame * 0.1) + 1) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background - darker, focused */}
        <rect width={1920} height={1080} fill={colors.background} />

        {/* Concentric circles radiating from processing center */}
        {frame >= processingStart && (
          <g transform="translate(960, 540)" opacity={0.15}>
            {Array.from({ length: 5 }, (_, i) => {
              const radius = 100 + i * 60 + ((frame - processingStart) * 0.5) % 60;
              const opacity = 1 - (radius - 100) / 350;
              return (
                <circle
                  key={i}
                  cx={0}
                  cy={0}
                  r={radius}
                  fill="none"
                  stroke={colors.users}
                  strokeWidth={2}
                  opacity={opacity}
                />
              );
            })}
          </g>
        )}

        {/* Server Cube with thinking animation */}
        <g
          transform={`translate(${cubeX + wiggleX * (frame >= thinkingStart ? 1 : 0)}, ${cubeY + wiggleY * (frame >= thinkingStart ? 1 : 0)})`}
        >
          {/* Intense glow effect */}
          <ellipse
            cx={60}
            cy={60}
            rx={120 * glowIntensity}
            ry={120 * glowIntensity * 0.7}
            fill={colors.users}
            opacity={0.15 * glowIntensity}
          />

          {/* Secondary glow ring */}
          <ellipse
            cx={60}
            cy={60}
            rx={90 * glowIntensity}
            ry={90 * glowIntensity * 0.7}
            fill={colors.usersLight}
            opacity={0.1 * glowIntensity}
          />

          {/* The Cube */}
          <KurzgesagtCube
            x={0}
            y={0}
            size={120}
            color={colors.monolith}
            emotion={getCubeEmotion()}
            glow={true}
            pulseConfig={{
              min: 0.95,
              max: 1.08,
              speed: pulseSpeed,
              phase: pulsePhase,
            }}
          />

          {/* Loading spinner above cube */}
          {frame >= processingStart && (
            <g transform="translate(60, -30)">
              <circle
                cx={0}
                cy={0}
                r={20}
                fill="none"
                stroke={colors.usersLight}
                strokeWidth={4}
                strokeDasharray="80"
                strokeDashoffset={frame * 3}
                opacity={0.8}
                transform={`rotate(${spinnerRotation})`}
              />
            </g>
          )}
        </g>

        {/* Envelope being consumed */}
        {envelopeProgress < 1 && (
          <g
            transform={`translate(960, ${envelopeY}) scale(${envelopeScale})`}
            style={{ transformOrigin: "center" }}
          >
            {/* Envelope body */}
            <rect
              x={-40}
              y={-25}
              width={80}
              height={50}
              fill={colors.usersLight}
              rx={6}
              stroke={colors.usersDark}
              strokeWidth={2}
              opacity={envelopeOpacity}
            />
            {/* Envelope flap */}
            <path
              d="M -40 -25 L 0 5 L 40 -25"
              fill={colors.users}
              stroke={colors.usersDark}
              strokeWidth={2}
              strokeLinejoin="round"
              opacity={envelopeOpacity}
            />
          </g>
        )}

        {/* Thought bubble with question marks */}
        {frame >= thinkingStart && thoughtBubbleOpacity > 0 && (
          <g
            transform="translate(1150, 380)"
            opacity={thoughtBubbleOpacity}
            scale={thoughtBubbleScale}
          >
            {/* Thought bubble */}
            <ellipse
              cx={0}
              cy={0}
              rx={70}
              ry={50}
              fill={colors.monolithLight}
              opacity={0.9}
            />
            {/* Thought dots */}
            <circle cx={-50} cy={40} r={8} fill={colors.monolithLight} opacity={0.7} />
            <circle cx={-35} cy={55} r={5} fill={colors.monolithLight} opacity={0.5} />
            <circle cx={-25} cy={65} r={3} fill={colors.monolithLight} opacity={0.3} />

            {/* Question marks that float */}
            <text
              x={0}
              y={10}
              textAnchor="middle"
              fill={colors.monolithDark}
              fontSize={36}
              fontWeight="bold"
            >
              ?
            </text>
          </g>
        )}

        {/* Processing status bar */}
        {frame >= processingStart && (
          <g transform="translate(760, 850)">
            {/* Background bar */}
            <rect
              x={0}
              y={0}
              width={400}
              height={20}
              fill={colors.monolithDark}
              opacity={0.5}
              rx={10}
            />

            {/* Progress fill */}
            <rect
              x={0}
              y={0}
              width={Math.min(400, (frame - processingStart) * 4)}
              height={20}
              fill={colors.users}
              rx={10}
            />

            {/* Progress glow */}
            <rect
              x={Math.min(400, (frame - processingStart) * 4) - 20}
              y={0}
              width={40}
              height={20}
              fill="white"
              opacity={0.3}
              rx={10}
            />
          </g>
        )}

        {/* Processing dots */}
        {frame >= processingStart && (
          <g transform="translate(960, 900)">
            <text
              x={-30}
              y={0}
              fill={colors.textSecondary}
              fontSize={20}
              opacity={dot1Opacity}
              fontFamily="monospace"
            >
              .
            </text>
            <text
              x={0}
              y={0}
              fill={colors.textSecondary}
              fontSize={20}
              opacity={dot2Opacity}
              fontFamily="monospace"
            >
              .
            </text>
            <text
              x={30}
              y={0}
              fill={colors.textSecondary}
              fontSize={20}
              opacity={dot3Opacity}
              fontFamily="monospace"
            >
              .
            </text>
          </g>
        )}

        {/* Status indicator */}
        <g transform="translate(960, 750)">
          <rect
            x={-80}
            y={-20}
            width={160}
            height={40}
            fill={colors.monolithDark}
            opacity={0.8}
            rx={20}
          />
          <circle
            cx={-50}
            cy={0}
            r={8}
            fill={colors.accent}
            opacity={0.5 + statusPulse * 0.5}
          />
          <text
            x={15}
            y={8}
            textAnchor="middle"
            fill={colors.text}
            fontSize={16}
            fontFamily="Arial, sans-serif"
          >
            PROCESSING
          </text>
        </g>

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
          The server thinks through the request
        </text>
      </svg>
    </AbsoluteFill>
  );
};

export { Scene13ProcessingProps as Scene13Processing };
