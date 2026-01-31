import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";

/**
 * Scene 3b+3c: Color Reveal (0:47-1:00, 1410-1800 frames)
 * Grey shell cracks, cubes burst into vibrant colors with faces
 */
export const Part3_Scene2_Reveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Crack appearance
  const crackOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Shell pieces fall
  const shellFall = interpolate(frame, [40, 100], [0, 300], {
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // Shell fade
  const shellOpacity = interpolate(frame, [80, 120], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Color burst
  const colorBurst = interpolate(frame, [60, 100], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  // Labels appear
  const labelOpacity = interpolate(frame, [150, 190], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Floating animation
  const bob = Math.sin((frame - 100) * 0.04) * 10;

  const positions = [-280, 0, 280];
  const colors = [
    kurzgesagtColors.usersBlue,
    kurzgesagtColors.ordersGreen,
    kurzgesagtColors.inventoryOrange,
  ];
  const labels = ["Users Service", "Orders Service", "Inventory Service"];

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform={`translate(960, ${540 + bob})`}>
          {positions.map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`}>
              {/* Shell pieces */}
              <g opacity={shellOpacity} transform={`translate(0, ${shellFall * (1 + i * 0.1)}) rotate(${i * 30})`}>
                <path
                  d={`M -55 -55 L 0 -70 L 55 -55 L 55 55 L 0 70 L -55 55 Z`}
                  fill={kurzgesagtColors.darkGrey}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={2}
                />
                {/* Cracks */}
                <g opacity={crackOpacity}>
                  <path d="M -30 -40 L -10 -20 L -25 10" stroke={kurzgesagtColors.black} strokeWidth={3} fill="none" />
                  <path d="M 20 -35 L 35 -15 L 15 20" stroke={kurzgesagtColors.black} strokeWidth={3} fill="none" />
                  <path d="M -5 30 L 0 45 L 10 35" stroke={kurzgesagtColors.black} strokeWidth={3} fill="none" />
                </g>
              </g>

              {/* Colored cube */}
              <g transform={`scale(${colorBurst})`}>
                <KurzgesagtCube
                  x={-50}
                  y={-50}
                  size={100}
                  color={colors[i]}
                  emotion="surprised"
                  glow={true}
                  pulseConfig={{ min: 0.98, max: 1.02, speed: 0.05, phase: i }}
                />
              </g>

              {/* Label */}
              <g opacity={labelOpacity}>
                <text
                  x={0}
                  y={90}
                  textAnchor="middle"
                  fill={colors[i]}
                  fontSize={24}
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  {labels[i]}
                </text>
              </g>

              {/* Burst effect */}
              {colorBurst > 0.5 && colorBurst < 1 && (
                <g opacity={1 - colorBurst}>
                  {[...Array(8)].map((_, j) => {
                    const angle = (j / 8) * Math.PI * 2;
                    const distance = (1 - colorBurst) * 100;
                    return (
                      <circle
                        key={j}
                        cx={Math.cos(angle) * distance}
                        cy={Math.sin(angle) * distance}
                        r={8}
                        fill={colors[i]}
                        opacity={0.6}
                      />
                    );
                  })}
                </g>
              )}
            </g>
          ))}
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
        >
          New Identities Emerge
        </text>
      </svg>
    </AbsoluteFill>
  );
};
