import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtStickFigure } from "../../components/kurzgesagt";

/**
 * Scene 1b: Users Arrive (0:07-0:14, 210-420 frames)
 * Cute stick figures walk up to single door
 * Text: "Single Point of Entry"
 */
export const Part1_Scene2_UsersArrive: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text fade in
  const textOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // User walk positions (bouncy walk cycle)
  const users = [
    { delay: 0, startX: 200, endX: 760 },
    { delay: 30, startX: 100, endX: 740 },
    { delay: 60, startX: 0, endX: 720 },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080} opacity={sceneOpacity}>
        {/* Monolith (scaled down, positioned left) */}
        <g transform="translate(960, 540) scale(0.8)">
          <rect
            x={-200}
            y={-500}
            width={400}
            height={500}
            fill={kurzgesagtColors.darkGrey}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={3}
          />
          {/* Simplified windows/door */}
          <rect x={-150} y={-450} width={40} height={60} fill={kurzgesagtColors.deepBlue} opacity={0.9} />
          <rect x={110} y={-450} width={40} height={60} fill={kurzgesagtColors.deepBlue} opacity={0.9} />
          <rect x={-60} y={-100} width={120} height={100} fill={kurzgesagtColors.darkPurple} />
          <circle cx={20} cy={-50} r={6} fill={kurzgesagtColors.goldenYellow} />
        </g>

        {/* Ground */}
        <rect x={0} y={580} width={1920} height={500} fill={kurzgesagtColors.darkPurple} opacity={0.5} />

        {/* Walking users */}
        {users.map((user, i) => {
          const walkStart = user.delay;
          const walkEnd = user.delay + 120;
          const walkProgress = Math.min(1, Math.max(0, (frame - walkStart) / (walkEnd - walkStart)));

          const x = interpolate(walkProgress, [0, 1], [user.startX, user.endX]);
          const walkCycle = (frame - walkStart) / 30;

          return (
            <g key={i} transform={`translate(${x}, 540)`}>
              <KurzgesagtStickFigure
                x={0}
                y={0}
                scale={1.2}
                color={kurzgesagtColors.usersBlue}
                facingRight={true}
                walking={walkProgress > 0 && walkProgress < 1}
                walkCycle={walkCycle}
              />
            </g>
          );
        })}

        {/* Title */}
        <text
          x={960}
          y={100}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={56}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          Single Point of Entry
        </text>

        {/* Arrow pointing to door */}
        <g opacity={textOpacity}>
          <path
            d="M 1200 540 L 1050 540"
            stroke={kurzgesagtColors.brightPink}
            strokeWidth={4}
            strokeDasharray="10,5"
          />
          <path
            d="M 1050 540 L 1070 525 M 1050 540 L 1070 555"
            stroke={kurzgesagtColors.brightPink}
            strokeWidth={4}
            fill="none"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
