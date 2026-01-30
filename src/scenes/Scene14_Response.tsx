import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt/KurzgesagtCube";
import { SparkParticles } from "../animation-engine/particles";
import { usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

interface Scene14ResponseProps {
  titleText?: string;
}

/**
 * Scene14: The Response
 * Response envelope travels back to user with checkmark reveal and sparkles
 * Features: Success emotion, sparkles, elastic reveal, celebratory animation
 */
export const Scene14Response: React.FC<Scene14ResponseProps> = ({
  titleText = "THE RESPONSE",
}) => {
  const frame = useCurrentFrame();

  // Animation timing
  const cubeHappyStart = 30;
  const envelopeDepartStart = 80;
  const envelopeDepartEnd = 180;
  const envelopeArriveUser = 200;
  const checkmarkRevealStart = 220;
  const checkmarkRevealEnd = 260;
  const sparklesBurst = checkmarkRevealStart + 20;

  // Cube becomes happy
  const cubeEmotionProgress = springForFrame(frame, cubeHappyStart, cubeHappyStart + 40, 0.3, 0.7);

  // Response envelope travels from server to user
  const envelopeProgress = springForFrame(frame, envelopeDepartStart, envelopeDepartEnd, 0.3, 0.6);

  // Envelope path (from server to user)
  const envelopePath = [
    { x: 960, y: 540 },
    { x: 800, y: 600 },
    { x: 650, y: 680 },
    { x: 500, y: 750 },
  ];

  // Calculate envelope position along path
  const getEnvelopePosition = (progress: number) => {
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

  // Envelope rotation
  const envelopeRotation = interpolate(envelopeProgress, [0, 0.5, 1], [0, 15, 15]);

  // User receives envelope
  const userReceiveProgress = springForFrame(frame, envelopeArriveUser, envelopeArriveUser + 40, 0.4, 0.7);
  const userJump = userReceiveProgress * 20;

  // Checkmark reveal with elastic
  const checkmarkProgress = elasticOutForFrame(frame, checkmarkRevealStart, checkmarkRevealEnd, 1.5, 0.3);

  // Checkmark path animation
  const checkmarkDraw = springForFrame(frame, checkmarkRevealStart, checkmarkRevealStart + 30, 0.2, 0.6);
  const checkmarkLength = checkmarkDraw * 60;

  // Pulse effect for success glow
  const pulsePhase = frame * 0.04;
  const glowIntensity = usePulse({ min: 0.5, max: 1, speed: 0.06, phase: pulsePhase });

  // Title and subtitle fade
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });

  // Success badge scales in
  const badgeScale = springForFrame(frame, checkmarkRevealEnd - 40, checkmarkRevealEnd, 0.3, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <defs>
          {/* Glow filter for success elements */}
          <filter id="successGlow">
            <feGaussianBlur stdDeviation={4} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for success badge */}
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.success} />
            <stop offset="100%" stopColor={colors.ordersLight} />
          </linearGradient>
        </defs>

        {/* Background - slightly lighter for success mood */}
        <rect width={1920} height={1080} fill={colors.background} />

        {/* Subtle celebration particles */}
        {frame >= checkmarkRevealStart && (
          <g opacity={0.6}>
            {Array.from({ length: 20 }, (_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 200 + ((frame - checkmarkRevealStart) * 2) % 300;
              const x = 960 + Math.cos(angle) * distance;
              const y = 540 + Math.sin(angle) * distance;
              const size = 3 + Math.sin(i * 0.5) * 2;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={size}
                  fill={colors.success}
                  opacity={1 - distance / 500}
                />
              );
            })}
          </g>
        )}

        {/* Server Cube - happy emotion */}
        <g transform="translate(960 - 60, 540 - 60)">
          {/* Success glow */}
          <ellipse
            cx={60}
            cy={60}
            rx={100 * glowIntensity}
            ry={100 * glowIntensity * 0.7}
            fill={colors.success}
            opacity={0.2 * glowIntensity}
          />

          <KurzgesagtCube
            x={0}
            y={0}
            size={120}
            color={colors.monolith}
            emotion="happy"
            glow={true}
            pulseConfig={{
              min: 0.98,
              max: 1.04,
              speed: 0.05,
              phase: pulsePhase,
            }}
          />
        </g>

        {/* User figure - receives the response */}
        <g transform={`translate(500, ${750 - userJump})`}>
          <KurzgesagtStickFigure
            x={0}
            y={0}
            scale={1.4}
            color={colors.users}
            facingRight={true}
            walking={false}
          />

          {/* User becomes happy with arms up */}
          {userReceiveProgress > 0.5 && (
            <>
              {/* Left arm raised */}
              <line
                x1={0}
                y1={-85}
                x2={-35}
                y2={-130}
                stroke={colors.users}
                strokeWidth={7}
                strokeLinecap="round"
                opacity={userReceiveProgress}
              />
              {/* Right arm raised */}
              <line
                x1={0}
                y1={-85}
                x2={35}
                y2={-130}
                stroke={colors.users}
                strokeWidth={7}
                strokeLinecap="round"
                opacity={userReceiveProgress}
              />
            </>
          )}
        </g>

        {/* Response envelope traveling to user */}
        {envelopeProgress > 0 && envelopeProgress < 1 && (
          <g
            transform={`translate(${envelopePos.x}, ${envelopePos.y}) rotate(${envelopeRotation})`}
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

            {/* Envelope body - success color theme */}
            <rect
              x={-45}
              y={-30}
              width={90}
              height={60}
              fill={colors.ordersLight}
              rx={8}
              stroke={colors.ordersDark}
              strokeWidth={2}
            />

            {/* Envelope flap */}
            <path
              d="M -45 -30 L 0 5 L 45 -30"
              fill={colors.orders}
              stroke={colors.ordersDark}
              strokeWidth={2}
              strokeLinejoin="round"
            />

            {/* Success checkmark on envelope */}
            {envelopeProgress > 0.5 && (
              <g opacity={(envelopeProgress - 0.5) * 2}>
                <circle
                  cx={0}
                  cy={0}
                  r={15}
                  fill={colors.success}
                />
                <path
                  d="M -8 0 L -2 6 L 8 -6"
                  stroke="white"
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}

            {/* Motion trail */}
            {envelopeProgress < 1 && (
              <g opacity={0.3}>
                <ellipse
                  cx={35}
                  cy={0}
                  rx={15}
                  ry={8}
                  fill={colors.ordersLight}
                />
                <ellipse
                  cx={55}
                  cy={0}
                  rx={10}
                  ry={5}
                  fill={colors.ordersLight}
                />
              </g>
            )}
          </g>
        )}

        {/* Success badge with checkmark */}
        {frame >= checkmarkRevealStart && (
          <g
            transform="translate(960, 300)"
            scale={badgeScale}
            filter="url(#successGlow)"
          >
            {/* Badge background */}
            <circle
              cx={0}
              cy={0}
              r={60}
              fill="url(#successGradient)"
              opacity={0.9}
            />

            {/* Outer ring */}
            <circle
              cx={0}
              cy={0}
              r={68}
              fill="none"
              stroke={colors.success}
              strokeWidth={4}
              opacity={0.6}
            />

            {/* Checkmark */}
            <path
              d="M -25 0 L -8 18 L 30 -25"
              stroke="white"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={checkmarkLength}
              strokeDashoffset={60 - checkmarkLength}
            />
          </g>
        )}

        {/* Sparkles burst on success */}
        {frame >= sparklesBurst && (
          <SparkParticles
            count={20}
            origin={{ x: 960, y: 300 }}
            burstFrame={sparklesBurst}
            color={colors.accent}
            speed={1.2}
            lifetime={50}
          />
        )}

        {/* Additional sparkles around user */}
        {frame >= envelopeArriveUser && (
          <SparkParticles
            count={12}
            origin={{ x: 500, y: 650 }}
            burstFrame={envelopeArriveUser + 10}
            color={colors.success}
            speed={0.8}
            lifetime={40}
          />
        )}

        {/* Success text */}
        {frame >= checkmarkRevealEnd && (
          <g opacity={interpolate(frame, [checkmarkRevealEnd, checkmarkRevealEnd + 20], [0, 1], { extrapolateRight: "clamp" })}>
            <text
              x={960}
              y={420}
              textAnchor="middle"
              fill={colors.success}
              fontSize={32}
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
              letterSpacing={2}
            >
              SUCCESS!
            </text>
          </g>
        )}

        {/* Status indicator */}
        <g transform="translate(960, 900)">
          <rect
            x={-90}
            y={-20}
            width={180}
            height={40}
            fill={colors.monolithDark}
            opacity={0.8}
            rx={20}
          />
          <circle
            cx={-55}
            cy={0}
            r={8}
            fill={colors.success}
            opacity={glowIntensity}
          />
          <text
            x={20}
            y={8}
            textAnchor="middle"
            fill={colors.text}
            fontSize={16}
            fontFamily="Arial, sans-serif"
          >
            200 OK
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
          The server returns the requested data
        </text>
      </svg>
    </AbsoluteFill>
  );
};
