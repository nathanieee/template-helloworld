import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";

/**
 * Scene 4a: The Network (1:00-1:07, 1800-2010 frames)
 * Lines shoot between cubes, connecting them
 * Text: "Services communicate over HTTP"
 */
export const Part4_Scene1_Network: React.FC = () => {
  const frame = useCurrentFrame();

  // Connection lines animate in
  const lineProgress = interpolate(frame, [20, 120], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Data pulses travel along lines
  const pulseOffset = (frame * 3) % 100;

  // Text fade in
  const textOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Floating
  const bob = Math.sin(frame * 0.02) * 5;

  const positions = [-280, 0, 280];
  const colors = [
    kurzgesagtColors.usersBlue,
    kurzgesagtColors.ordersGreen,
    kurzgesagtColors.inventoryOrange,
  ];

  // Connection paths
  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 2 },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform={`translate(960, ${540 + bob})`}>
          {/* Connection lines */}
          {connections.map((conn, i) => {
            const fromX = positions[conn.from];
            const toX = positions[conn.to];
            const lineDelay = i * 20;
            const localProgress = Math.max(0, Math.min(1, (frame - lineDelay) / 60));
            const currentX = fromX + (toX - fromX) * localProgress;

            return (
              <g key={i}>
                {/* Line */}
                <line
                  x1={fromX}
                  y1={0}
                  x2={currentX}
                  y2={0}
                  stroke={kurzgesagtColors.networkGlow}
                  strokeWidth={4}
                  strokeDasharray="10,5"
                  opacity={0.6}
                />

                {/* Data pulse */}
                {localProgress > 0.8 && (
                  <circle
                    cx={fromX + (toX - fromX) * ((pulseOffset + i * 30) % 100) / 100}
                    cy={0}
                    r={8}
                    fill={kurzgesagtColors.goldenYellow}
                    opacity={0.9}
                  >
                    <animate
                      attributeName="r"
                      values="8;12;8"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Cubes */}
          {positions.map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`}>
              <KurzgesagtCube
                x={-50}
                y={-50}
                size={100}
                color={colors[i]}
                emotion="neutral"
                glow={lineProgress > 0.5}
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: i }}
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
          Services Communicate Over HTTP
        </text>

        {/* Technical details */}
        <text
          x={960}
          y={180}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={28}
          fontFamily="monospace"
          opacity={textOpacity * 0.8}
        >
          REST API • JSON
        </text>
      </svg>
    </AbsoluteFill>
  );
};
