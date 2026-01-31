import React from "react";
import { colors } from "../../styles/colors";

interface TitleProps {
  text: string;
  x?: number;
  y?: number;
  fontSize?: number;
  color?: string;
  align?: "left" | "center" | "right";
  opacity?: number;
}

export const Title: React.FC<TitleProps> = ({
  text,
  x = 960,
  y = 100,
  fontSize = 48,
  color = colors.text,
  align = "center",
  opacity = 1,
}) => {
  const anchor = align === "left" ? "start" : align === "right" ? "end" : "middle";

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={color}
      fontSize={fontSize}
      fontWeight="bold"
      opacity={opacity}
      fontFamily="Arial, sans-serif"
    >
      {text}
    </text>
  );
};
