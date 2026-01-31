import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { useSpringIn } from "../../animation-engine/hooks";

/**
 * Scene 3a: The Separation (0:40-0:47, 1200-1410 frames)
 * 3 grey cubes lift from rubble and float apart
 */
export const Part3_Scene1_Separation: React.FC = () => {
  const frame = useCurrentFrame();

  const springIn = useSpringIn({ delay: 0, damping: 15, stiffness: 70 });

  // Vertical rise
  const riseY = interpolate(frame, [0, 60], [200, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // Horizontal separation
  const separationX = interpolate(frame, [60, 150], [0, 250], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating bob
  const bob = Math.sin((frame - 100) * 0.03) * 8;

  const cubeSize = 100;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* Rubble below */}
          <g opacity={1 - springIn}>
            <rect x={-200} y={150} width={120} height={60} fill={kurzgesagtColors.darkGrey} rx={5} transform="rotate(10)" />
            <rect x={80} y={160} width={100} height={50} fill={kurzgesagtColors.darkGrey} rx={5} transform="rotate(-15)" />
            <rect x={-60} y={180} width={140} height={40} fill={kurzgesagtColors.darkGrey} rx={5} />
          </g>

          {/* Three floating cubes (still grey) */}
          <g transform={`translate(0, ${riseY + bob})`}>
            {/* Left cube (Users) */}
            <g transform={`translate(${-separationX - cubeSize}, 0)`}>
              <Cube3D size={cubeSize} color={kurzgesagtColors.darkGrey} />
            </g>

            {/* Center cube (Orders) */}
            <g transform="translate(0, 0)">
              <Cube3D size={cubeSize} color={kurzgesagtColors.darkGrey} />
            </g>

            {/* Right cube (Inventory) */}
            <g transform={`translate(${separationX + cubeSize}, 0)`}>
              <Cube3D size={cubeSize} color={kurzgesagtColors.darkGrey} />
            </g>
          </g>
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
          opacity={springIn}
        >
          Separation Begins
        </text>
      </svg>
    </AbsoluteFill>
  );
};

// 3D Cube helper component
interface Cube3DProps {
  size: number;
  color: string;
}

const Cube3D: React.FC<Cube3DProps> = ({ size, color }) => {
  const half = size / 2;
  const depth = size * 0.15;

  // Lighter/darker variants
  const lighter = color + "cc"; // Add some transparency
  const darker = color;

  return (
    <g>
      {/* Shadow */}
      <ellipse cx={0} cy={size * 0.6} rx={half * 1.2} ry={size * 0.1} fill="black" opacity={0.2} />

      {/* Right side (darker) */}
      <path
        d={`
          M ${half} ${-half}
          L ${half + depth} ${-half - depth * 0.3}
          L ${half + depth} ${half - depth * 0.3}
          L ${half} ${half}
          Z
        `}
        fill={darker}
        opacity={0.8}
      />

      {/* Top side (lighter) */}
      <path
        d={`
          M ${-half} ${-half}
          L ${-half + depth * 0.7} ${-half - depth}
          L ${half + depth * 0.7} ${-half - depth}
          L ${half} ${-half}
          Z
        `}
        fill={lighter}
        opacity={0.9}
      />

      {/* Front face */}
      <rect x={-half} y={-half} width={size} height={size} fill={color} rx={8} />
    </g>
  );
};
