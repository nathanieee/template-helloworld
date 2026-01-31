import React from "react";
import { colors } from "../../styles/colors";

interface NetworkLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  dashArray?: string;
  opacity?: number;
}

export const NetworkLine: React.FC<NetworkLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = colors.network,
  strokeWidth = 2,
  animated = false,
  dashArray,
  opacity = 1,
}) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray || (animated ? "10,5" : undefined)}
      opacity={opacity}
    >
      {animated && (
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-15"
          dur="1s"
          repeatCount="indefinite"
        />
      )}
    </line>
  );
};
