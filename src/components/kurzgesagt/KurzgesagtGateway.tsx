import React from "react";
import { colors } from "../../styles/colors";

export interface KurzgesagtGatewayProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  glow?: boolean;
  glowIntensity?: number;
  shieldActive?: boolean;
  shieldColor?: string;
  archScale?: number;
}

/**
 * Kurzgesagt-styled API Gateway component
 * Features rounded corners, shield glow, and 3D depth
 */
export const KurzgesagtGateway: React.FC<KurzgesagtGatewayProps> = ({
  x,
  y,
  width = 140,
  height = 120,
  color = colors.accent,
  glow = false,
  glowIntensity = 1,
  shieldActive = false,
  shieldColor = colors.accent,
  archScale = 1,
}) => {
  const w = width * archScale;
  const h = height * archScale;
  const cornerRadius = 12 * archScale;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Shield glow effect */}
      {(glow || shieldActive) && (
        <>
          <ellipse
            cx={0}
            cy={0}
            rx={w * 0.9 * glowIntensity}
            ry={h * 0.7 * glowIntensity}
            fill={shieldActive ? colors.danger : shieldColor}
            opacity={shieldActive ? 0.4 : 0.15}
          />
          <ellipse
            cx={0}
            cy={0}
            rx={w * 0.6 * glowIntensity}
            ry={h * 0.45 * glowIntensity}
            fill={shieldActive ? colors.danger : shieldColor}
            opacity={shieldActive ? 0.3 : 0.1}
          />
        </>
      )}

      {/* Left pillar with 3D depth */}
      <g>
        {/* Side depth */}
        <rect
          x={-w / 2 - 8}
          y={-h / 4}
          width={12}
          height={h / 2 + h / 4 + 10}
          fill={darkenColor(color, 20)}
          rx={4}
        />
        {/* Main pillar */}
        <rect
          x={-w / 2 - 5}
          y={-h / 4}
          width={14}
          height={h / 2 + h / 4}
          fill={color}
          rx={3}
        />
        {/* Highlight */}
        <rect
          x={-w / 2 - 3}
          y={-h / 4 + 8}
          width={4}
          height={h / 3}
          fill="white"
          opacity={0.3}
          rx={2}
        />
      </g>

      {/* Right pillar with 3D depth */}
      <g>
        {/* Side depth */}
        <rect
          x={w / 2 - 4}
          y={-h / 4}
          width={12}
          height={h / 2 + h / 4 + 10}
          fill={darkenColor(color, 20)}
          rx={4}
        />
        {/* Main pillar */}
        <rect
          x={w / 2 - 9}
          y={-h / 4}
          width={14}
          height={h / 2 + h / 4}
          fill={color}
          rx={3}
        />
        {/* Highlight */}
        <rect
          x={w / 2 - 7}
          y={-h / 4 + 8}
          width={4}
          height={h / 3}
          fill="white"
          opacity={0.3}
          rx={2}
        />
      </g>

      {/* Top decoration bar */}
      <rect
        x={-w / 2 - 10}
        y={-h / 2 - 10}
        width={w + 20}
        height={16}
        rx={4}
        fill={lightenColor(color, 10)}
      />

      {/* Main arch body */}
      <path
        d={`
          M ${-w / 2} ${h / 2}
          L ${-w / 2} ${-h / 4}
          Q ${-w / 2} ${-h / 2} 0 ${-h / 2}
          Q ${w / 2} ${-h / 2} ${w / 2} ${-h / 4}
          L ${w / 2} ${h / 2}
          Z
        `}
        fill={color}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={2}
      />

      {/* Inner opening (dark portal) */}
      <path
        d={`
          M ${-w / 2 + 18} ${h / 2}
          L ${-w / 2 + 18} ${-h / 4}
          Q ${-w / 2 + 18} ${-h / 2 + 12} 0 ${-h / 2 + 12}
          Q ${w / 2 - 18} ${-h / 2 + 12} ${w / 2 - 18} ${-h / 4}
          L ${w / 2 - 18} ${h / 2}
          Z
        `}
        fill={colors.background}
      />

      {/* Portal glow when active */}
      {glow && (
        <ellipse
          cx={0}
          cy={0}
          rx={w * 0.25}
          ry={h * 0.15}
          fill={shieldColor}
          opacity={0.4}
        />
      )}

      {/* Shield overlay when active */}
      {shieldActive && (
        <g opacity={0.8}>
          <path
            d={`
              M -${w * 0.35} ${-h * 0.3}
              L ${w * 0.35} ${-h * 0.3}
              L ${w * 0.35} ${h * 0.1}
              Q ${w * 0.35} ${h * 0.5} 0 ${h * 0.6}
              Q ${-w * 0.35} ${h * 0.5} ${-w * 0.35} ${h * 0.1}
              Z
            `}
            fill={colors.danger}
            stroke="white"
            strokeWidth={3}
          />
          {/* X mark on shield */}
          <line
            x1={-w * 0.15}
            y1={-h * 0.05}
            x2={w * 0.15}
            y2={h * 0.25}
            stroke="white"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <line
            x1={w * 0.15}
            y1={-h * 0.05}
            x2={-w * 0.15}
            y2={h * 0.25}
            stroke="white"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Highlight on left side */}
      <path
        d={`
          M ${-w / 2 + 10} ${-h / 4 + 8}
          L ${-w / 2 + 10} ${-h / 4 + 25}
        `}
        stroke="white"
        strokeWidth={3}
        opacity={0.4}
        strokeLinecap="round"
      />
    </g>
  );
};

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `rgb(${R}, ${G}, ${B})`;
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `rgb(${R}, ${G}, ${B})`;
}
