import React from "react";
import { colors } from "../../styles/colors";

interface StickFigureProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  facingRight?: boolean;
  walking?: boolean;
  walkCycle?: number; // 0-1 for walk phase
}

export const StickFigure: React.FC<StickFigureProps> = ({
  x,
  y,
  scale = 1,
  color = colors.users,
  facingRight = true,
  walking = false,
  walkCycle = 0,
}) => {
  const s = scale;
  const dir = facingRight ? 1 : -1;

  // Simple bobbing animation for walking
  const bob = walking ? Math.sin(walkCycle * Math.PI * 2) * 5 * s : 0;

  // Leg animation
  const leftLegAngle = walking ? Math.sin(walkCycle * Math.PI * 2) * 0.4 : 0;
  const rightLegAngle = walking ? Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 0.4 : 0;

  // Arm animation (opposite to legs)
  const leftArmAngle = walking ? Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 0.3 : 0;
  const rightArmAngle = walking ? Math.sin(walkCycle * Math.PI * 2) * 0.3 : 0;

  const headRadius = 15 * s;
  const bodyLength = 40 * s;
  const limbLength = 30 * s;

  return (
    <g transform={`translate(${x}, ${y + bob})`}>
      {/* Head */}
      <circle
        cx={0}
        cy={-bodyLength - headRadius}
        r={headRadius}
        fill={color}
      />

      {/* Eyes */}
      <circle cx={5 * dir} cy={-bodyLength - headRadius - 2} r={3 * s} fill="white" />
      <circle cx={5 * dir} cy={-bodyLength - headRadius - 2} r={1 * s} fill="black" />

      {/* Body */}
      <line
        x1={0}
        y1={-bodyLength}
        x2={0}
        y2={0}
        stroke={color}
        strokeWidth={6 * s}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <line
        x1={0}
        y1={-bodyLength + 10 * s}
        x2={Math.cos(leftArmAngle + Math.PI / 2) * limbLength * dir}
        y2={-bodyLength + 10 * s + Math.sin(leftArmAngle + Math.PI / 2) * limbLength}
        stroke={color}
        strokeWidth={5 * s}
        strokeLinecap="round"
      />

      {/* Right Arm */}
      <line
        x1={0}
        y1={-bodyLength + 10 * s}
        x2={Math.cos(rightArmAngle + Math.PI / 2) * limbLength * dir}
        y2={-bodyLength + 10 * s + Math.sin(rightArmAngle + Math.PI / 2) * limbLength}
        stroke={color}
        strokeWidth={5 * s}
        strokeLinecap="round"
      />

      {/* Left Leg */}
      <line
        x1={0}
        y1={0}
        x2={Math.sin(leftLegAngle) * limbLength * dir}
        y2={Math.cos(leftLegAngle) * limbLength}
        stroke={color}
        strokeWidth={5 * s}
        strokeLinecap="round"
      />

      {/* Right Leg */}
      <line
        x1={0}
        y1={0}
        x2={Math.sin(rightLegAngle) * limbLength * dir}
        y2={Math.cos(rightLegAngle) * limbLength}
        stroke={color}
        strokeWidth={5 * s}
        strokeLinecap="round"
      />
    </g>
  );
};
