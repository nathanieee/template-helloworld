import React from "react";
import { colors } from "../../styles/colors";

interface CubeProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  label?: string;
  glowing?: boolean;
  glowIntensity?: number;
  shaking?: boolean;
  shakeIntensity?: number;
  rotation?: number;
}

export const Cube: React.FC<CubeProps> = ({
  x,
  y,
  size = 80,
  color,
  label = "",
  glowing = false,
  glowIntensity = 0.5,
  shaking = false,
  shakeIntensity = 5,
  rotation = 0,
}) => {
  const defaultColor = color || colors.orders;

  // Apply shake offset if shaking
  const shakeX = shaking ? (Math.random() - 0.5) * shakeIntensity : 0;
  const shakeY = shaking ? (Math.random() - 0.5) * shakeIntensity : 0;

  return (
    <g transform={`translate(${x + shakeX}, ${y + shakeY}) rotate(${rotation})`}>
      {/* Glow effect */}
      {glowing && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.8}
          fill={defaultColor}
          opacity={glowIntensity * 0.3}
        />
      )}

      {/* Main cube face */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        rx={8}
        fill={defaultColor}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={2}
      />

      {/* 3D effect - top side */}
      <path
        d={`M ${size * 0.1} ${size * 0.1} L ${size * 0.25} 0 L ${size * 0.9} 0 L ${size * 0.75} ${size * 0.1} Z`}
        fill={defaultColor}
        opacity={0.7}
      />

      {/* 3D effect - right side */}
      <path
        d={`M ${size * 0.9} 0 L ${size * 0.75} ${size * 0.1} L ${size * 0.75} ${size} L ${size} ${size * 0.9} L ${size} ${size * 0.1} Z`}
        fill={defaultColor}
        opacity={0.5}
      />

      {/* Highlight */}
      <rect
        x={size * 0.1}
        y={size * 0.1}
        width={size * 0.3}
        height={size * 0.3}
        rx={4}
        fill="white"
        opacity={0.2}
      />

      {/* Label */}
      {label && (
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={size * 0.2}
          fontWeight="bold"
        >
          {label}
        </text>
      )}
    </g>
  );
};
