import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { useShake } from "../../animation-engine/hooks";

/**
 * Scene 1c: The Crash (0:14-0:20, 420-600 frames)
 * Bug crawls, wire snaps, monolith collapses
 * Text: "Everything breaks together"
 */
export const Part1_Scene3_Crash: React.FC = () => {
  const frame = useCurrentFrame();

  // Screen shake when collapse happens
  const shakeIntensity = interpolate(frame, [60, 90], [0, 15], {
    extrapolateRight: "clamp",
  });
  const shake = useShake({ intensity: shakeIntensity });

  // Monolith collapse rotation and fall
  const collapseRotation = interpolate(frame, [70, 120], [0, 25], {
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });

  const collapseY = interpolate(frame, [70, 120], [0, 200], {
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // Dust cloud opacity
  const dustOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dustScale = interpolate(frame, [100, 150], [0.5, 2], {
    extrapolateRight: "clamp",
  });

  // Bug crawl animation
  const bugX = interpolate(frame, [0, 50], [1300, 1000], {
    extrapolateRight: "clamp",
  });
  const bugY = 400 + Math.sin(frame * 0.1) * 5;

  // Text fade in
  const textOpacity = interpolate(frame, [120, 160], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Wire snap animation
  const wireSnap = interpolate(frame, [45, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const leftWireY = wireSnap > 0.5 ? 50 + (wireSnap - 0.5) * 100 : 50;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg
        width={1920}
        height={1080}
        style={{
          transform: `translate(${shake.x}px, ${shake.y}px)`,
        }}
      >
        {/* Monolith (before collapse) */}
        <g
          transform={`translate(960, 540) rotate(${collapseRotation}) translate(0, ${collapseY})`}
        >
          <rect
            x={-200}
            y={-500}
            width={400}
            height={500}
            fill={kurzgesagtColors.darkGrey}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={3}
          />
          {/* Cracks appearing */}
          {frame > 40 && (
            <>
              <path d="M -100 -400 L -50 -350 L -80 -300" stroke={kurzgesagtColors.black} strokeWidth={3} fill="none" />
              <path d="M 50 -200 L 80 -150 L 40 -100" stroke={kurzgesagtColors.black} strokeWidth={3} fill="none" />
            </>
          )}
        </g>

        {/* Bug character */}
        {frame < 55 && (
          <g transform={`translate(${bugX}, ${bugY})`}>
            {/* Bug body */}
            <ellipse cx={0} cy={0} rx={20} ry={12} fill={kurzgesagtColors.errorRed} />
            <circle cx={-10} cy={0} r={8} fill={kurzgesagtColors.errorRed} />
            <circle cx={10} cy={0} r={8} fill={kurzgesagtColors.errorRed} />
            {/* Eyes */}
            <circle cx={-12} cy={-2} r={3} fill="white" />
            <circle cx={8} cy={-2} r={3} fill="white" />
            <circle cx={-11} cy={-2} r={1.5} fill="black" />
            <circle cx={9} cy={-2} r={1.5} fill="black" />
            {/* Antennae */}
            <path d="M -5 -8 L -8 -18" stroke={kurzgesagtColors.errorRed} strokeWidth={2} />
            <path d="M 5 -8 L 8 -18" stroke={kurzgesagtColors.errorRed} strokeWidth={2} />
            {/* Legs */}
            {[-6, -2, 2, 6].map((xPos, i) => (
              <line
                key={i}
                x1={xPos}
                y1={8}
                x2={xPos + (i % 2 === 0 ? -5 : 5)}
                y2={18}
                stroke={kurzgesagtColors.errorRed}
                strokeWidth={2}
              />
            ))}
          </g>
        )}

        {/* Wire that snaps */}
        <g>
          <line
            x1={1000}
            y1={0}
            x2={1000 + (wireSnap > 0.5 ? -30 : 0)}
            y2={leftWireY}
            stroke={kurzgesagtColors.orangeRed}
            strokeWidth={4}
          />
          <line
            x1={1000}
            y1={0}
            x2={1000 + (wireSnap > 0.5 ? 30 : 0)}
            y2={50 + (wireSnap > 0.5 ? wireSnap * 80 : 0)}
            stroke={kurzgesagtColors.orangeRed}
            strokeWidth={4}
          />
          {/* Spark effect when snapping */}
          {wireSnap > 0.3 && wireSnap < 0.7 && (
            <>
              <circle cx={1000} cy={50} r={15} fill={kurzgesagtColors.goldenYellow} opacity={0.8} />
              <circle cx={1000} cy={50} r={8} fill="white" />
            </>
          )}
        </g>

        {/* Dust cloud */}
        {dustOpacity > 0 && (
          <g
            transform={`translate(960, 700) scale(${dustScale})`}
            opacity={dustOpacity}
          >
            <ellipse cx={0} cy={0} rx={150} ry={40} fill={kurzgesagtColors.darkGrey} opacity={0.6} />
            <ellipse cx={-50} cy={-20} rx={80} ry={30} fill={kurzgesagtColors.darkGrey} opacity={0.4} />
            <ellipse cx={50} cy={-20} rx={80} ry={30} fill={kurzgesagtColors.darkGrey} opacity={0.4} />
          </g>
        )}

        {/* Title */}
        <text
          x={960}
          y={150}
          textAnchor="middle"
          fill={kurzgesagtColors.errorRed}
          fontSize={64}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          Everything breaks together
        </text>
      </svg>
    </AbsoluteFill>
  );
};
