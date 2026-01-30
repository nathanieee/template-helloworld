import React from "react";
import { colors } from "../../styles/colors";

export interface KurzgesagtStickFigureProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  facingRight?: boolean;
  walking?: boolean;
  walkCycle?: number;
}

export const KurzgesagtStickFigure: React.FC<KurzgesagtStickFigureProps> = ({
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

  const bob = walking ? Math.sin(walkCycle * Math.PI * 2) * 6 * s : 0;
  const leftLegAngle = walking ? Math.sin(walkCycle * Math.PI * 2) * 0.5 : 0;
  const rightLegAngle = walking ? Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 0.5 : 0;
  const leftArmAngle = walking ? Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 0.4 : 0;
  const rightArmAngle = walking ? Math.sin(walkCycle * Math.PI * 2) * 0.4 : 0;

  const headRadius = 16 * s;
  const bodyLength = 42 * s;
  const limbLength = 32 * s;

  return (
    <g transform={`translate(${x}, ${y + bob})`}>
      <ellipse cx={0} cy={5 * s} rx={20 * s} ry={6 * s} fill="rgba(0, 0, 0, 0.2)" />
      <line x1={0} y1={0} x2={Math.sin(leftLegAngle) * limbLength * dir} y2={Math.cos(leftLegAngle) * limbLength} stroke={color} strokeWidth={6 * s} strokeLinecap="round" />
      <line x1={0} y1={0} x2={Math.sin(rightLegAngle) * limbLength * dir} y2={Math.cos(rightLegAngle) * limbLength} stroke={color} strokeWidth={6 * s} strokeLinecap="round" />
      <line x1={0} y1={-bodyLength} x2={0} y2={0} stroke={color} strokeWidth={7 * s} strokeLinecap="round" />
      <line x1={0} y1={-bodyLength + 12 * s} x2={Math.cos(leftArmAngle + Math.PI / 2) * limbLength * dir} y2={-bodyLength + 12 * s + Math.sin(leftArmAngle + Math.PI / 2) * limbLength} stroke={color} strokeWidth={5 * s} strokeLinecap="round" />
      <line x1={0} y1={-bodyLength + 12 * s} x2={Math.cos(rightArmAngle + Math.PI / 2) * limbLength * dir} y2={-bodyLength + 12 * s + Math.sin(rightArmAngle + Math.PI / 2) * limbLength} stroke={color} strokeWidth={5 * s} strokeLinecap="round" />
      <circle cx={0} cy={-bodyLength - headRadius} r={headRadius} fill={color} />
      <circle cx={6 * dir} cy={-bodyLength - headRadius - 2} r={4 * s} fill="white" />
      <circle cx={7 * dir} cy={-bodyLength - headRadius - 2} r={1.5 * s} fill={colors.monolithDark} />
      <circle cx={-5 * s} cy={-bodyLength - headRadius - 8 * s} r={3 * s} fill="white" opacity={0.3} />
    </g>
  );
};
