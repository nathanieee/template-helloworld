import React from "react";
import { colors } from "../../styles/colors";

interface GatewayProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
}

export const Gateway: React.FC<GatewayProps> = ({
  x,
  y,
  width = 120,
  height = 100,
  color = colors.accent,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Main arch */}
      <path
        d={`
          M ${-width / 2} ${height / 2}
          L ${-width / 2} ${-height / 4}
          Q ${-width / 2} ${-height / 2} 0 ${-height / 2}
          Q ${width / 2} ${-height / 2} ${width / 2} ${-height / 4}
          L ${width / 2} ${height / 2}
          Z
        `}
        fill={color}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={2}
      />

      {/* Inner opening */}
      <path
        d={`
          M ${-width / 2 + 15} ${height / 2}
          L ${-width / 2 + 15} ${-height / 4}
          Q ${-width / 2 + 15} ${-height / 2 + 10} 0 ${-height / 2 + 10}
          Q ${width / 2 - 15} ${-height / 2 + 10} ${width / 2 - 15} ${-height / 4}
          L ${width / 2 - 15} ${height / 2}
          Z
        `}
        fill={colors.background}
      />

      {/* decorative pillars */}
      <rect
        x={-width / 2 - 5}
        y={-height / 4}
        width={10}
        height={height / 2 + height / 4}
        fill={color}
        opacity={0.8}
      />
      <rect
        x={width / 2 - 5}
        y={-height / 4}
        width={10}
        height={height / 2 + height / 4}
        fill={color}
        opacity={0.8}
      />

      {/* Top decoration */}
      <rect
        x={-width / 2 - 8}
        y={-height / 2 - 8}
        width={width + 16}
        height={12}
        rx={2}
        fill={color}
      />

      {/* Highlight */}
      <path
        d={`
          M ${-width / 2 + 8} ${-height / 4 + 5}
          L ${-width / 2 + 8} ${-height / 4 + 15}
        `}
        stroke="white"
        strokeWidth={2}
        opacity={0.4}
        strokeLinecap="round"
      />
    </g>
  );
};
