import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../../styles/colors";

interface FadeTransitionProps {
  progress: number; // 0-1
  color?: string;
}

export const FadeIn: React.FC<FadeTransitionProps> = ({
  progress,
  color = colors.background,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity: 1 - progress,
        pointerEvents: "none",
      }}
    />
  );
};

export const FadeOut: React.FC<FadeTransitionProps> = ({
  progress,
  color = colors.background,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity: progress,
        pointerEvents: "none",
      }}
    />
  );
};

interface WipeTransitionProps {
  progress: number;
  direction?: "left" | "right" | "up" | "down";
  color?: string;
}

export const WipeTransition: React.FC<WipeTransitionProps> = ({
  progress,
  direction = "left",
  color = colors.background,
}) => {
  const getPosition = () => {
    switch (direction) {
      case "left":
        return { left: 0, top: 0, width: `${progress * 100}%`, height: "100%" };
      case "right":
        return { right: 0, top: 0, width: `${progress * 100}%`, height: "100%" };
      case "up":
        return { left: 0, top: 0, width: "100%", height: `${progress * 100}%` };
      case "down":
        return { left: 0, bottom: 0, width: "100%", height: `${progress * 100}%` };
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: color,
        ...getPosition(),
      }}
    />
  );
};
