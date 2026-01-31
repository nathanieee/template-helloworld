import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtStickFigure } from "../../components/kurzgesagt";

/**
 * Scene 2a: The Decision (0:20-0:27, 600-810 frames)
 * User stands before rubble, lightbulb appears
 * Text: "What if we separated concerns?"
 */
export const Part2_Scene1_Decision: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Stick figure walks in
  const figureX = interpolate(frame, [20, 80], [1600, 960], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Lightbulb appearance
  const bulbScale = interpolate(frame, [100, 150], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.7)),
  });

  // Bulb glow pulsing
  const glowPulse = 1 + Math.sin(frame * 0.1) * 0.2;

  // Text fade in
  const textOpacity = interpolate(frame, [160, 200], [0, 1], {
    extrapolateRight: "clamp",
  });

  const walkCycle = (frame - 20) / 30;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080} opacity={sceneOpacity}>
        {/* Rubble in background */}
        <g transform="translate(960, 540)">
          <rect x={-180} y={-100} width={100} height={60} fill={kurzgesagtColors.darkGrey} rx={5} transform="rotate(15)" />
          <rect x={50} y={-80} width={80} height={40} fill={kurzgesagtColors.darkGrey} rx={5} transform="rotate(-10)" />
          <rect x={-60} y={50} width={120} height={50} fill={kurzgesagtColors.darkGrey} rx={5} />
          <ellipse cx={0} cy={100} rx={200} ry={30} fill={kurzgesagtColors.darkPurple} opacity={0.3} />
        </g>

        {/* Stick figure */}
        <g transform={`translate(${figureX}, 540)`}>
          <KurzgesagtStickFigure
            x={0}
            y={0}
            scale={1.5}
            color={kurzgesagtColors.usersBlue}
            facingRight={false}
            walking={frame < 80}
            walkCycle={walkCycle}
          />
        </g>

        {/* Lightbulb above head */}
        <g transform={`translate(${figureX}, 300)`}>
          {/* Glow */}
          <circle
            cx={0}
            cy={0}
            r={60 * bulbScale * glowPulse}
            fill={kurzgesagtColors.goldenYellow}
            opacity={0.2}
          />
          <circle
            cx={0}
            cy={0}
            r={40 * bulbScale * glowPulse}
            fill={kurzgesagtColors.goldenYellow}
            opacity={0.3}
          />

          {/* Bulb */}
          <g transform={`scale(${bulbScale})`}>
            {/* Glass */}
            <ellipse cx={0} cy={10} rx={25} ry={30} fill={kurzgesagtColors.goldenYellow} opacity={0.9} />
            <ellipse cx={0} cy={10} rx={20} ry={25} fill={kurzgesagtColors.goldenYellow} opacity={0.5} />
            {/* Base */}
            <rect x={-10} y={35} width={20} height={15} fill={kurzgesagtColors.darkGrey} rx={2} />
            <rect x={-8} y={50} width={16} height={5} fill={kurzgesagtColors.darkGrey} rx={1} />
            {/* Filament */}
            <path d="M -5 15 L 0 0 L 5 15" stroke={kurzgesagtColors.orangeRed} strokeWidth={2} fill="none" />
          </g>

          {/* Sparkles */}
          {bulbScale > 0.5 && [-1, 1].map((dir) => (
            <g key={dir} transform={`translate(${dir * 50}, ${-30})`}>
              <path
                d="M 0 -15 L 5 0 L 0 15 L -5 0 Z"
                fill={kurzgesagtColors.goldenYellow}
                opacity={0.8}
              />
            </g>
          ))}
        </g>

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={52}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          What if we separated concerns?
        </text>
      </svg>
    </AbsoluteFill>
  );
};
