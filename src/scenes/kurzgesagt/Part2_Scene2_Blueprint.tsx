import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";

/**
 * Scene 2b: The Blueprint (0:27-0:34, 810-1020 frames)
 * Blueprint unrolled showing 3 distinct cubes
 * Text: "Users • Orders • Inventory"
 */
export const Part2_Scene2_Blueprint: React.FC = () => {
  const frame = useCurrentFrame();

  // Blueprint unroll
  const unrollProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const blueprintWidth = 800 * unrollProgress;

  // Cube outlines fade in
  const outlineOpacity = interpolate(frame, [50, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Labels fade in
  const labelOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowIntensity = 1 + Math.sin((frame - 80) * 0.05) * 0.3;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        {/* Blueprint background */}
        <g transform="translate(960, 540)">
          <rect
            x={-blueprintWidth / 2}
            y={-250}
            width={blueprintWidth}
            height={500}
            fill="#0a1628"
            stroke="#1a3a5c"
            strokeWidth={3}
          />

          {/* Grid lines on blueprint */}
          <g opacity={outlineOpacity * 0.3}>
            {[...Array(10)].map((_, i) => (
              <line
                key={i}
                x1={-350}
                y1={-200 + i * 45}
                x2={350}
                y2={-200 + i * 45}
                stroke="#1a3a5c"
                strokeWidth={1}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <line
                key={i}
                x1={-350 + i * 50}
                y1={-250}
                x2={-350 + i * 50}
                y2={250}
                stroke="#1a3a5c"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* Three cube outlines */}
          <g opacity={outlineOpacity}>
            {/* Users cube */}
            <g transform="translate(-200, 0)">
              <rect x={-60} y={-60} width={120} height={120} fill="none" stroke={kurzgesagtColors.usersBlue} strokeWidth={3} />
              {/* 3D effect lines */}
              <path d="M -60 -60 L -40 -80 L 80 -80 L 60 -60" fill="none" stroke={kurzgesagtColors.usersBlue} strokeWidth={2} />
              <path d="M 60 -60 L 80 -80 L 80 40 L 60 60" fill="none" stroke={kurzgesagtColors.usersBlue} strokeWidth={2} />
              {/* Glow */}
              <rect x={-60} y={-60} width={120} height={120} fill={kurzgesagtColors.usersBlue} opacity={0.1 * glowIntensity} />
            </g>

            {/* Orders cube */}
            <g transform="translate(0, 0)">
              <rect x={-60} y={-60} width={120} height={120} fill="none" stroke={kurzgesagtColors.ordersGreen} strokeWidth={3} />
              <path d="M -60 -60 L -40 -80 L 80 -80 L 60 -60" fill="none" stroke={kurzgesagtColors.ordersGreen} strokeWidth={2} />
              <path d="M 60 -60 L 80 -80 L 80 40 L 60 60" fill="none" stroke={kurzgesagtColors.ordersGreen} strokeWidth={2} />
              <rect x={-60} y={-60} width={120} height={120} fill={kurzgesagtColors.ordersGreen} opacity={0.1 * glowIntensity} />
            </g>

            {/* Inventory cube */}
            <g transform="translate(200, 0)">
              <rect x={-60} y={-60} width={120} height={120} fill="none" stroke={kurzgesagtColors.inventoryOrange} strokeWidth={3} />
              <path d="M -60 -60 L -40 -80 L 80 -80 L 60 -60" fill="none" stroke={kurzgesagtColors.inventoryOrange} strokeWidth={2} />
              <path d="M 60 -60 L 80 -80 L 80 40 L 60 60" fill="none" stroke={kurzgesagtColors.inventoryOrange} strokeWidth={2} />
              <rect x={-60} y={-60} width={120} height={120} fill={kurzgesagtColors.inventoryOrange} opacity={0.1 * glowIntensity} />
            </g>
          </g>

          {/* Connection lines (dashed) */}
          <g opacity={outlineOpacity}>
            <line x1={-140} y1={0} x2={-60} y2={0} stroke={kurzgesagtColors.white} strokeWidth={2} strokeDasharray="5,5" opacity={0.5} />
            <line x1={60} y1={0} x2={140} y2={0} stroke={kurzgesagtColors.white} strokeWidth={2} strokeDasharray="5,5" opacity={0.5} />
          </g>

          {/* Labels */}
          <g opacity={labelOpacity}>
            <text x={-200} y={100} textAnchor="middle" fill={kurzgesagtColors.usersBlue} fontSize={28} fontWeight="bold">Users</text>
            <text x={0} y={100} textAnchor="middle" fill={kurzgesagtColors.ordersGreen} fontSize={28} fontWeight="bold">Orders</text>
            <text x={200} y={100} textAnchor="middle" fill={kurzgesagtColors.inventoryOrange} fontSize={28} fontWeight="bold">Inventory</text>
          </g>
        </g>

        {/* Title */}
        <text
          x={960}
          y={100}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={48}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          The Blueprint
        </text>
      </svg>
    </AbsoluteFill>
  );
};
