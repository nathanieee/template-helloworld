import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";

/**
 * Scene 1a: The Monolith (0:00-0:07, 0-210 frames)
 * Dark void, massive grey cathedral-like structure rises
 * Text: "The Monolith"
 * Colors: Dark Grey (#2c3e50), Deep Blue (#001372)
 */
export const Part1_Scene1_MonolithRises: React.FC = () => {
  const frame = useCurrentFrame();

  // Monolith rises from below
  const riseProgress = interpolate(frame, [0, 60], [1, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Slow zoom in
  const zoomScale = interpolate(frame, [0, 210], [1, 1.15], {
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // Title fade in
  const titleOpacity = interpolate(frame, [30, 80], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // Subtitle fade in (after title)
  const subtitleOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  const monolithY = 540 + 500 * riseProgress;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg
        width={1920}
        height={1080}
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center",
        }}
      >
        {/* Starfield background */}
        {Array.from({ length: 60 }).map((_, i) => {
          const cx = (i * 137.5) % 1920;
          const cy = (i * 89.3) % 1080;
          const twinkle = Math.sin(frame * 0.02 + i) * 0.3 + 0.7;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={Math.random() * 2 + 1}
              fill="white"
              opacity={twinkle * 0.6}
            />
          );
        })}

        {/* Monolith structure */}
        <g transform="translate(960, 540)">
          {/* Main building */}
          <rect
            x={-200}
            y={-500 + monolithY - 540}
            width={400}
            height={500}
            fill={kurzgesagtColors.darkGrey}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={3}
          />

          {/* Left tower */}
          <rect x={-180} y={-600 + monolithY - 540} width={60} height={100} fill={kurzgesagtColors.darkGrey} />
          <rect x={-180} y={-620 + monolithY - 540} width={60} height={20} fill="#1a252f" />

          {/* Right tower */}
          <rect x={120} y={-600 + monolithY - 540} width={60} height={100} fill={kurzgesagtColors.darkGrey} />
          <rect x={120} y={-620 + monolithY - 540} width={60} height={20} fill="#1a252f" />

          {/* Central spire */}
          <rect x={-40} y={-680 + monolithY - 540} width={80} height={180} fill={kurzgesagtColors.darkGrey} />
          <path
            d={`M -40 ${-680 + monolithY - 540} L 0 ${-740 + monolithY - 540} L 40 ${-680 + monolithY - 540} Z`}
            fill={kurzgesagtColors.darkGrey}
          />

          {/* Windows (dark openings) */}
          <rect x={-150} y={-450 + monolithY - 540} width={40} height={60} fill={kurzgesagtColors.deepBlue} opacity={0.9} />
          <rect x={110} y={-450 + monolithY - 540} width={40} height={60} fill={kurzgesagtColors.deepBlue} opacity={0.9} />
          <rect x={-30} y={-350 + monolithY - 540} width={60} height={80} fill={kurzgesagtColors.deepBlue} opacity={0.9} />

          {/* Large door */}
          <rect x={-60} y={-100 + monolithY - 540} width={120} height={100} fill={kurzgesagtColors.darkPurple} />
          <circle cx={20} cy={-50 + monolithY - 540} r={6} fill={kurzgesagtColors.goldenYellow} />

          {/* Horizontal decorative lines */}
          <line x1={-200} y1={-400 + monolithY - 540} x2={200} y2={-400 + monolithY - 540}
            stroke="rgba(255,255,255,0.15)" strokeWidth={4} />
          <line x1={-200} y1={-200 + monolithY - 540} x2={200} y2={-200 + monolithY - 540}
            stroke="rgba(255,255,255,0.15)" strokeWidth={4} />
        </g>

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={72}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={titleOpacity}
        >
          The Monolith
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={180}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={32}
          fontFamily="Arial, sans-serif"
          opacity={subtitleOpacity}
        >
          A single application that does everything
        </text>
      </svg>
    </AbsoluteFill>
  );
};
