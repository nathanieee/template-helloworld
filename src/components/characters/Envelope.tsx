import React from "react";
import { colors } from "../../styles/colors";

interface EnvelopeProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  rotation?: number;
  opened?: boolean;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  x,
  y,
  width = 40,
  height = 28,
  color = colors.network,
  rotation = 0,
  opened = false,
}) => {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Envelope body */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={3}
        fill={color}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />

      {/* Envelope flap */}
      <path
        d={
          opened
            ? `M ${-width / 2} ${-height / 2} L 0 ${-height / 2 - height * 0.4} L ${width / 2} ${-height / 2}`
            : `M ${-width / 2} ${-height / 2} L 0 ${0} L ${width / 2} ${-height / 2}`
        }
        fill={color}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />

      {/* Highlight */}
      <rect
        x={-width / 2 + 4}
        y={-height / 2 + 4}
        width={width * 0.3}
        height={height * 0.3}
        rx={1}
        fill="white"
        opacity={0.3}
      />
    </g>
  );
};
