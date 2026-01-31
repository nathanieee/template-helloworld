import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export interface BirdProps {
  x: number;
  y: number;
  scale?: number;
  facingRight?: boolean;
  flying?: boolean;
  wingFlapSpeed?: number;
}

/**
 * Kurzgesagt-style bird mascot
 * Simple flat shapes with orange body and yellow beak
 */
export const Bird: React.FC<BirdProps> = ({
  x,
  y,
  scale = 1,
  facingRight = true,
  flying = false,
  wingFlapSpeed = 0.1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = scale;
  const dir = facingRight ? 1 : -1;

  // Wing flap animation
  const wingAngle = flying
    ? Math.sin((frame * wingFlapSpeed * Math.PI * 2) / fps * 60) * 0.4
    : 0;

  // Floating/bobbing when flying
  const bobOffset = flying ? Math.sin(frame * 0.05) * 8 : 0;

  // Body dimensions
  const bodyWidth = 50 * s;
  const bodyHeight = 40 * s;

  return (
    <g transform={`translate(${x * dir}, ${y + bobOffset}) scale(${dir}, 1)`}>
      {/* Wing (back) */}
      <ellipse
        cx={-5 * s}
        cy={5 * s}
        rx={20 * s}
        ry={12 * s}
        fill="#d4620e"
        transform={`rotate(${wingAngle * 180 / Math.PI})`}
      />

      {/* Body */}
      <ellipse
        cx={0}
        cy={0}
        rx={bodyWidth / 2}
        ry={bodyHeight / 2}
        fill="#e47212"
      />

      {/* Belly (lighter) */}
      <ellipse
        cx={5 * s}
        cy={8 * s}
        rx={18 * s}
        ry={20 * s}
        fill="#f6be39"
        opacity={0.6}
      />

      {/* Wing (front) */}
      <ellipse
        cx={5 * s}
        cy={8 * s}
        rx={18 * s}
        ry={10 * s}
        fill="#e47212"
        transform={`rotate(${wingAngle * 180 / Math.PI})`}
      />

      {/* Eye white */}
      <circle
        cx={15 * s}
        cy={-8 * s}
        r={10 * s}
        fill="white"
      />

      {/* Eye pupil */}
      <circle
        cx={17 * s}
        cy={-8 * s}
        r={5 * s}
        fill="black"
      />

      {/* Eye highlight */}
      <circle
        cx={19 * s}
        cy={-10 * s}
        r={2 * s}
        fill="white"
      />

      {/* Beak */}
      <path
        d={`
          M ${22 * s} ${-3 * s}
          L ${40 * s} ${0}
          L ${22 * s} ${3 * s}
          Z
        `}
        fill="#f6be39"
      />

      {/* Tail feathers */}
      <path
        d={`
          M ${-bodyWidth / 2} ${-5 * s}
          L ${-bodyWidth / 2 - 15 * s} ${-10 * s}
          L ${-bodyWidth / 2 - 5 * s} ${0}
          Z
        `}
        fill="#d4620e"
      />
      <path
        d={`
          M ${-bodyWidth / 2} ${0}
          L ${-bodyWidth / 2 - 18 * s} ${0}
          L ${-bodyWidth / 2 - 5 * s} ${5 * s}
          Z
        `}
        fill="#d4620e"
      />
      <path
        d={`
          M ${-bodyWidth / 2} ${5 * s}
          L ${-bodyWidth / 2 - 15 * s} ${10 * s}
          L ${-bodyWidth / 2 - 5 * s} ${5 * s}
          Z
        `}
        fill="#d4620e"
      />

      {/* Feet (when not flying) */}
      {!flying && (
        <>
          <line
            x1={8 * s}
            y1={bodyHeight / 2 - 2 * s}
            x2={5 * s}
            y2={bodyHeight / 2 + 12 * s}
            stroke="#f6be39"
            strokeWidth={3 * s}
            strokeLinecap="round"
          />
          <line
            x1={12 * s}
            y1={bodyHeight / 2 - 2 * s}
            x2={15 * s}
            y2={bodyHeight / 2 + 12 * s}
            stroke="#f6be39"
            strokeWidth={3 * s}
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
};
