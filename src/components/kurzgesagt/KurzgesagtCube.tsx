import React from "react";
import { usePulse } from "../../animation-engine/hooks";

export type CubeEmotion = "happy" | "worried" | "neutral" | "surprised";

export interface KurzgesagtCubeProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  emotion?: CubeEmotion;
  glow?: boolean;
  pulseConfig?: {
    min?: number;
    max?: number;
    speed?: number;
    phase?: number;
  };
  shadowScale?: boolean;
}

/**
 * Kurzgesagt-style expressive cube character
 * Features rounded corners, expressive eyes, breathing animation, and 3D depth
 */
export const KurzgesagtCube: React.FC<KurzgesagtCubeProps> = ({
  x,
  y,
  size = 100,
  color = "#FF6B35",
  emotion = "neutral",
  glow = false,
  pulseConfig = { min: 0.95, max: 1.05, speed: 0.03 },
  shadowScale = true,
}) => {
  const scale = usePulse(pulseConfig);

  // Calculate dimensions based on size and pulse
  const currentSize = size * scale;
  const halfSize = currentSize / 2;
  const cornerRadius = size * 0.18;
  const outlineWidth = size * 0.05;

  // Eye positions and sizes
  const eyeY = size * 0.35;
  const eyeSpacing = size * 0.22;
  const eyeRadius = size * 0.1;
  const pupilRadius = size * 0.05;

  // Blink calculation (quick blink every ~120 frames)
  const blinkPhase = (pulseConfig?.phase || 0) * 100;
  const isBlinking = Math.sin(blinkPhase * 0.05) > 0.95;
  const eyeHeight = isBlinking ? pupilRadius * 0.3 : eyeRadius;

  // Shadow scaling with breathing
  const shadowWidth = shadowScale ? size * 1.1 * scale : size * 1.1;
  const shadowOpacity = 0.15 + (scale - 1) * 0.1;

  // Get eye/eyebrow configurations based on emotion
  const getEyeConfig = (emotionType: CubeEmotion) => {
    const configs = {
      happy: {
        eyebrowLeftY: -size * 0.04,
        eyebrowRightY: size * 0.02,
        eyebrowRotationLeft: 0.15,
        eyebrowRotationRight: -0.1,
        pupilOffsetY: size * 0.01,
        mouthType: "smile" as const,
      },
      worried: {
        eyebrowLeftY: -size * 0.05,
        eyebrowRightY: -size * 0.05,
        eyebrowRotationLeft: -0.3,
        eyebrowRotationRight: 0.3,
        pupilOffsetY: -size * 0.02,
        mouthType: "frown" as const,
      },
      neutral: {
        eyebrowLeftY: -size * 0.02,
        eyebrowRightY: -size * 0.02,
        eyebrowRotationLeft: 0,
        eyebrowRotationRight: 0,
        pupilOffsetY: 0,
        mouthType: "line" as const,
      },
      surprised: {
        eyebrowLeftY: -size * 0.08,
        eyebrowRightY: -size * 0.08,
        eyebrowRotationLeft: 0,
        eyebrowRotationRight: 0,
        pupilOffsetY: 0,
        mouthType: "o" as const,
      },
    };
    return configs[emotionType];
  };

  const eyeConfig = getEyeConfig(emotion);

  // 3D side depth
  const sideDepth = size * 0.15;

  // Lighter/darker color variations for 3D effect
  const topSideColor = lightenColor(color, 20);
  const rightSideColor = darkenColor(color, 20);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Shadow that scales with breathing */}
      <ellipse
        cx={halfSize}
        cy={currentSize + size * 0.05}
        rx={shadowWidth / 2}
        ry={size * 0.08}
        fill="black"
        opacity={Math.max(0.05, Math.min(0.25, shadowOpacity))}
      />

      {/* Glow effect behind cube */}
      {glow && (
        <>
          <circle
            cx={halfSize}
            cy={halfSize}
            r={size * 0.7 * scale}
            fill={color}
            opacity={0.15}
          />
          <circle
            cx={halfSize}
            cy={halfSize}
            r={size * 0.5 * scale}
            fill={color}
            opacity={0.1}
          />
        </>
      )}

      {/* Right side (3D depth) - darker */}
      <path
        d={`
          M ${currentSize} ${cornerRadius}
          L ${currentSize + sideDepth} ${cornerRadius - sideDepth * 0.3}
          L ${currentSize + sideDepth} ${currentSize - cornerRadius - sideDepth * 0.3}
          L ${currentSize} ${currentSize - cornerRadius}
          Z
        `}
        fill={rightSideColor}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={outlineWidth * 0.5}
      />

      {/* Top side (3D depth) - lighter */}
      <path
        d={`
          M ${cornerRadius} 0
          L ${cornerRadius + sideDepth * 0.7} ${-sideDepth}
          L ${currentSize - cornerRadius + sideDepth * 0.7} ${-sideDepth}
          L ${currentSize - cornerRadius} 0
          Z
        `}
        fill={topSideColor}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={outlineWidth * 0.5}
      />

      {/* Top-right corner piece (3D connection) */}
      <path
        d={`
          M ${currentSize - cornerRadius} 0
          L ${currentSize - cornerRadius + sideDepth * 0.7} ${-sideDepth}
          L ${currentSize + sideDepth} ${cornerRadius - sideDepth * 0.3}
          L ${currentSize} ${cornerRadius}
          Z
        `}
        fill={lightenColor(color, 10)}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={outlineWidth * 0.5}
      />

      {/* Main cube face */}
      <rect
        x={0}
        y={0}
        width={currentSize}
        height={currentSize}
        rx={cornerRadius}
        fill={color}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={outlineWidth}
      />

      {/* Highlight (top-left) */}
      <rect
        x={size * 0.08 * scale}
        y={size * 0.08 * scale}
        width={size * 0.25 * scale}
        height={size * 0.25 * scale}
        rx={size * 0.05 * scale}
        fill="white"
        opacity={0.2}
      />

      {/* Left eyebrow */}
      <g
        transform={`translate(${halfSize - eyeSpacing}, ${eyeY - size * 0.15}) rotate(${eyeConfig.eyebrowRotationLeft * 180 / Math.PI})`}
      >
        <rect
          x={-size * 0.08}
          y={eyeConfig.eyebrowLeftY - size * 0.015}
          width={size * 0.16}
          height={size * 0.035}
          rx={size * 0.015}
          fill="rgba(0,0,0,0.6)"
        />
      </g>

      {/* Right eyebrow */}
      <g
        transform={`translate(${halfSize + eyeSpacing}, ${eyeY - size * 0.15}) rotate(${eyeConfig.eyebrowRotationRight * 180 / Math.PI})`}
      >
        <rect
          x={-size * 0.08}
          y={eyeConfig.eyebrowRightY - size * 0.015}
          width={size * 0.16}
          height={size * 0.035}
          rx={size * 0.015}
          fill="rgba(0,0,0,0.6)"
        />
      </g>

      {/* Left eye - white part */}
      <ellipse
        cx={halfSize - eyeSpacing}
        cy={eyeY}
        rx={eyeRadius}
        ry={eyeHeight}
        fill="white"
      />

      {/* Right eye - white part */}
      <ellipse
        cx={halfSize + eyeSpacing}
        cy={eyeY}
        rx={eyeRadius}
        ry={eyeHeight}
        fill="white"
      />

      {/* Pupils (only when not blinking) */}
      {!isBlinking && (
        <>
          <circle
            cx={halfSize - eyeSpacing}
            cy={eyeY + eyeConfig.pupilOffsetY}
            r={pupilRadius}
            fill="black"
          />
          <circle
            cx={halfSize + eyeSpacing}
            cy={eyeY + eyeConfig.pupilOffsetY}
            r={pupilRadius}
            fill="black"
          />
          {/* Pupil highlights */}
          <circle
            cx={halfSize - eyeSpacing - pupilRadius * 0.3}
            cy={eyeY + eyeConfig.pupilOffsetY - pupilRadius * 0.3}
            r={pupilRadius * 0.4}
            fill="white"
          />
          <circle
            cx={halfSize + eyeSpacing - pupilRadius * 0.3}
            cy={eyeY + eyeConfig.pupilOffsetY - pupilRadius * 0.3}
            r={pupilRadius * 0.4}
            fill="white"
          />
        </>
      )}

      {/* Mouth */}
      <g transform={`translate(${halfSize}, ${size * 0.65})`}>
        {eyeConfig.mouthType === "smile" && (
          <path
            d={`M ${-size * 0.15} 0 Q 0 ${size * 0.1} ${size * 0.15} 0`}
            stroke="rgba(0,0,0,0.7)"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
            fill="none"
          />
        )}
        {eyeConfig.mouthType === "frown" && (
          <path
            d={`M ${-size * 0.12} ${size * 0.05} Q 0 ${-size * 0.02} ${size * 0.12} ${size * 0.05}`}
            stroke="rgba(0,0,0,0.7)"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
            fill="none"
          />
        )}
        {eyeConfig.mouthType === "line" && (
          <line
            x1={-size * 0.1}
            y1={0}
            x2={size * 0.1}
            y2={0}
            stroke="rgba(0,0,0,0.7)"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
        )}
        {eyeConfig.mouthType === "o" && (
          <ellipse
            cx={0}
            cy={size * 0.02}
            rx={size * 0.08}
            ry={size * 0.1}
            fill="rgba(0,0,0,0.7)"
          />
        )}
      </g>
    </g>
  );
};

/**
 * Lighten a hex color by a percentage
 */
function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `rgb(${R}, ${G}, ${B})`;
}

/**
 * Darken a hex color by a percentage
 */
function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `rgb(${R}, ${G}, ${B})`;
}
