import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useWiggle, usePulse } from "../../animation-engine/hooks";
import { colors } from "../../styles/colors";

export interface KurzgesagtStickFigureProps {
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
  walkSpeed?: number;
  armSwing?: number;
  legSwing?: number;
  bobAmount?: number;
  blink?: boolean;
  shadow?: boolean;
  walkCycle?: number;
}

/**
 * Enhanced Kurzgesagt-style stick figure with bouncy walk cycle,
 * blinking eyes, expressive smile, and shadow.
 */
export const KurzgesagtStickFigure: React.FC<KurzgesagtStickFigureProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  color = colors.users,
  walkSpeed = 0.08,
  armSwing = 25,
  legSwing = 20,
  bobAmount = 8,
  blink = true,
  shadow = true,
  walkCycle: externalWalkCycle,
}) => {
  const frame = useCurrentFrame();

  // Bouncy walk cycle using useWiggle
  const wiggleY = useWiggle({
    amount: bobAmount,
    frequency: walkSpeed * 2,
    phase: 0,
  });

  // Breathing/pulse effect for body scale
  const pulse = usePulse({
    min: 0.98,
    max: 1.02,
    speed: 0.02,
    phase: 0,
  });

  // Walk cycle phase (0 to 1)
  const walkPhase = externalWalkCycle ?? (frame * walkSpeed) % 1;

  // Calculate limb angles based on walk cycle
  const leftArmAngle = Math.sin(walkPhase * Math.PI * 2) * armSwing;
  const rightArmAngle = Math.sin(walkPhase * Math.PI * 2 + Math.PI) * armSwing;
  const leftLegAngle = Math.sin(walkPhase * Math.PI * 2 + Math.PI) * legSwing;
  const rightLegAngle = Math.sin(walkPhase * Math.PI * 2) * legSwing;

  // Blinking eyes - blink every 120-180 frames
  const blinkPhase = (frame % 150) / 150;
  const isBlinking = blink && blinkPhase > 0.95 && blinkPhase < 0.98;

  // Eye openness based on blink state
  const eyeOpenness = interpolate(blinkPhase, [0.95, 0.965, 0.98], [1, 0.1, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Expressive smile curve
  const smileCurve = interpolate(
    Math.sin(frame * 0.03),
    [-1, 0, 1],
    [0.3, 0.5, 0.7]
  );

  const s = scale * pulse;
  const bob = wiggleY * s;

  // Helper to create a stick figure limb
  const createLimb = (
    angle: number,
    length: number,
    strokeWidth: number
  ): React.ReactElement => {
    const radians = (angle * Math.PI) / 180;
    const endX = Math.sin(radians) * length * s;
    const endY = Math.cos(radians) * length * s;
    return (
      <line
        x1={0}
        y1={0}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={strokeWidth * s}
        strokeLinecap="round"
      />
    );
  };

  return (
    <g transform={`translate(${x}, ${y + bob})`}>
      {/* Shadow underneath */}
      {shadow && (
        <ellipse
          cx={0}
          cy={40 * s}
          rx={25 * s}
          ry={8 * s}
          fill="rgba(0, 0, 0, 0.2)"
        />
      )}

      {/* Legs */}
      <g transform={`translate(0, ${5 * s})`}>
        <g transform={`rotate(${leftLegAngle})`}>
          {createLimb(0, 30, 5)}
        </g>
        <g transform={`rotate(${rightLegAngle})`}>
          {createLimb(0, 30, 5)}
        </g>
      </g>

      {/* Body */}
      <line
        x1={0}
        y1={-25 * s}
        x2={0}
        y2={0}
        stroke={color}
        strokeWidth={6 * s}
        strokeLinecap="round"
      />

      {/* Arms */}
      <g transform={`translate(0, ${-20 * s})`}>
        <g transform={`rotate(${leftArmAngle})`}>
          {createLimb(0, 25, 5)}
        </g>
        <g transform={`rotate(${rightArmAngle})`}>
          {createLimb(0, 25, 5)}
        </g>
      </g>

      {/* Head */}
      <circle
        cx={0}
        cy={-40 * s}
        r={16 * s}
        fill={color}
      />

      {/* Eyes - blinking effect */}
      {blink ? (
        <>
          {/* Left eye */}
          <ellipse
            cx={-5 * s}
            cy={-42 * s}
            rx={3 * s}
            ry={3 * s * eyeOpenness}
            fill="white"
          />
          {/* Right eye */}
          <ellipse
            cx={5 * s}
            cy={-42 * s}
            rx={3 * s}
            ry={3 * s * eyeOpenness}
            fill="white"
          />
          {/* Pupils */}
          {eyeOpenness > 0.5 && (
            <>
              <circle
                cx={-4 * s}
                cy={-42 * s}
                r={1.5 * s}
                fill="#0A0E27"
              />
              <circle
                cx={6 * s}
                cy={-42 * s}
                r={1.5 * s}
                fill="#0A0E27"
              />
            </>
          )}
        </>
      ) : (
        // Simple dots when blinking is disabled
        <>
          <circle
            cx={-5 * s}
            cy={-42 * s}
            r={2 * s}
            fill="white"
          />
          <circle
            cx={5 * s}
            cy={-42 * s}
            r={2 * s}
            fill="white"
          />
        </>
      )}

      {/* Expressive smile */}
      <path
        d={`M ${-6 * s} ${-35 * s} Q 0 ${-35 * s + 10 * s * smileCurve} ${6 * s} ${-35 * s}`}
        stroke="white"
        strokeWidth={2 * s}
        strokeLinecap="round"
        fill="none"
      />

      {/* Antenna/ears (Kurzgesagt style) */}
      <circle
        cx={-14 * s}
        cy={-48 * s}
        r={4 * s}
        fill={color}
      />
      <circle
        cx={14 * s}
        cy={-48 * s}
        r={4 * s}
        fill={color}
      />
    </g>
  );
};

export default KurzgesagtStickFigure;
