import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";

/**
 * Scene 6b: Resilience (1:47-1:54, 3210-3420 frames)
 * Orange cube fails, circuit breaker activates
 */
export const Part6_Scene2_Resilience: React.FC = () => {
  const frame = useCurrentFrame();

  // Orange cube fails (turns grey, shakes)
  const failureProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Cube shake during failure
  const shakeAmount = failureProgress > 0.5 && failureProgress < 1
    ? Math.sin(frame * 0.5) * 10
    : 0;

  // Cube color shifts to grey
  const cubeColor = failureProgress > 0.8
    ? kurzgesagtColors.darkGrey
    : kurzgesagtColors.inventoryOrange;

  // Circuit breaker appears
  const cbScale = interpolate(frame, [80, 120], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // Switch flips
  const switchAngle = interpolate(frame, [140, 170], [0, -45], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Fallback response shows
  const fallbackOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text fade in
  const textOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* Orders cube (healthy, still processing) */}
          <g transform="translate(-150, 0)">
            <KurzgesagtCube
              x={-40}
              y={-40}
              size={80}
              color={kurzgesagtColors.ordersGreen}
              emotion="neutral"
            />
          </g>

          {/* Inventory cube (failing) */}
          <g transform={`translate(150, ${shakeAmount})`}>
            <KurzgesagtCube
              x={-40}
              y={-40}
              size={80}
              color={cubeColor}
              emotion={failureProgress > 0.9 ? "worried" : "neutral"}
            />
            {/* X mark when failed */}
            {failureProgress > 0.9 && (
              <g opacity={failureProgress}>
                <line x1={-60} y1={-60} x2={60} y2={60} stroke={kurzgesagtColors.errorRed} strokeWidth={8} />
                <line x1={60} y1={-60} x2={-60} y2={60} stroke={kurzgesagtColors.errorRed} strokeWidth={8} />
              </g>
            )}
          </g>

          {/* Connection line */}
          <line
            x1={-110}
            y1={0}
            x2={110}
            y2={0}
            stroke={kurzgesagtColors.networkGlow}
            strokeWidth={3}
            opacity={0.4}
          />

          {/* Circuit Breaker */}
          <g transform={`translate(0, -150) scale(${cbScale})`}>
            {/* Box */}
            <rect x={-60} y={-40} width={120} height={80} fill={kurzgesagtColors.darkGrey} rx={8} />
            <rect x={-55} y={-35} width={110} height={70} fill={kurzgesagtColors.darkGrey} stroke={kurzgesagtColors.white} strokeWidth={2} rx={5} />

            {/* Label */}
            <text x={0} y={-15} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
              Circuit Breaker
            </text>

            {/* Switch */}
            <g transform={`translate(0, 15) rotate(${switchAngle})`}>
              <rect x={-5} y={-15} width={10} height={30} fill={kurzgesagtColors.goldenYellow} rx={3} />
            </g>

            {/* Status lights */}
            <circle cx={-35} cy={20} r={6} fill={switchAngle < -20 ? kurzgesagtColors.errorRed : kurzgesagtColors.darkGrey} />
            <circle cx={35} cy={20} r={6} fill={switchAngle < -20 ? kurzgesagtColors.darkGrey : kurzgesagtColors.successGreen} />
          </g>

          {/* Fallback response bubble */}
          {fallbackOpacity > 0 && (
            <g transform="translate(-150, -100)" opacity={fallbackOpacity}>
              <rect x={-70} y={-25} width={140} height={50} fill={kurzgesagtColors.goldenYellow} rx={8} />
              <text x={0} y={5} textAnchor="middle" fill={kurzgesagtColors.darkGrey} fontSize={14} fontWeight="bold">
                Cached Response
              </text>
            </g>
          )}
        </g>

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={52}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          Fault Isolation • Circuit Breakers
        </text>
      </svg>
    </AbsoluteFill>
  );
};
