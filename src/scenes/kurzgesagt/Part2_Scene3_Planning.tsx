import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";

/**
 * Scene 2c: Planning (0:34-0:40, 1020-1200 frames)
 * Diagram shows monolith splitting apart
 * Text: "Microservices Architecture"
 */
export const Part2_Scene3_Planning: React.FC = () => {
  const frame = useCurrentFrame();

  // Separation animation
  const separationProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // Dashed lines appear
  const linesOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Scissors animation
  const scissorsX = interpolate(frame, [20, 60], [1200, 960], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const scissorsOpen = Math.sin((frame - 40) * 0.2) * 15;

  // Text fade in
  const textOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  const blockWidth = 100;
  const gap = 20 + separationProgress * 200;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* Dashed cut lines */}
          {linesOpacity > 0 && (
            <>
              <line
                x1={-50}
                y1={-100}
                x2={-50}
                y2={100}
                stroke={kurzgesagtColors.brightPink}
                strokeWidth={3}
                strokeDasharray="10,5"
                opacity={linesOpacity}
              />
              <line
                x1={50}
                y1={-100}
                x2={50}
                y2={100}
                stroke={kurzgesagtColors.brightPink}
                strokeWidth={3}
                strokeDasharray="10,5"
                opacity={linesOpacity}
              />
            </>
          )}

          {/* Three separating blocks */}
          <g>
            {/* Users block */}
            <rect
              x={-blockWidth - gap / 2}
              y={-80}
              width={blockWidth}
              height={160}
              fill={kurzgesagtColors.usersBlue}
              rx={8}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={-blockWidth / 2 - gap / 2}
              y={5}
              textAnchor="middle"
              fill="white"
              fontSize={16}
              fontWeight="bold"
            >
              Users
            </text>

            {/* Orders block */}
            <rect
              x={-blockWidth / 2}
              y={-80}
              width={blockWidth}
              height={160}
              fill={kurzgesagtColors.ordersGreen}
              rx={8}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill="white"
              fontSize={16}
              fontWeight="bold"
            >
              Orders
            </text>

            {/* Inventory block */}
            <rect
              x={blockWidth / 2 + gap / 2}
              y={-80}
              width={blockWidth}
              height={160}
              fill={kurzgesagtColors.inventoryOrange}
              rx={8}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={blockWidth / 2 + gap / 2}
              y={5}
              textAnchor="middle"
              fill="white"
              fontSize={16}
              fontWeight="bold"
            >
              Inv
            </text>
          </g>

          {/* Scissors (cutting animation) */}
          {frame < 100 && (
            <g transform={`translate(${scissorsX - 960}, -150)`}>
              {/* Left blade */}
              <g transform={`rotate(${-scissorsOpen})`}>
                <ellipse cx={-5} cy={0} rx={8} ry={30} fill={kurzgesagtColors.darkGrey} />
                <circle cx={-5} cy={-30} r={10} fill={kurzgesagtColors.darkGrey} />
              </g>
              {/* Right blade */}
              <g transform={`rotate(${scissorsOpen})`}>
                <ellipse cx={5} cy={0} rx={8} ry={30} fill={kurzgesagtColors.darkGrey} />
                <circle cx={5} cy={-30} r={10} fill={kurzgesagtColors.darkGrey} />
              </g>
              {/* Center screw */}
              <circle cx={0} cy={0} r={6} fill={kurzgesagtColors.orangeRed} />
            </g>
          )}
        </g>

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={56}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          Microservices Architecture
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={180}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={28}
          fontFamily="Arial, sans-serif"
          opacity={textOpacity * 0.8}
        >
          Independent services • Loose coupling
        </text>
      </svg>
    </AbsoluteFill>
  );
};
