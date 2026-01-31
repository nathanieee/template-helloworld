import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";

/**
 * Scene 6a: Scaling (1:40-1:47, 3000-3210 frames)
 * Load balancer appears, green cube clones to 3
 */
export const Part6_Scene1_Scaling: React.FC = () => {
  const frame = useCurrentFrame();

  // Load balancer appears
  const lbScale = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // Clone animation
  const cloneProgress = interpolate(frame, [80, 180], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Load distributes
  const loadOpacity = interpolate(frame, [180, 220], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text fade in
  const textOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  const cubeSize = 70;

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* Load Balancer */}
          <g transform={`translate(0, -200) scale(${lbScale})`}>
            <rect x={-80} y={-40} width={160} height={80} fill={kurzgesagtColors.gatewayPurple} rx={10} />
            <rect x={-70} y={-30} width={140} height={60} fill={kurzgesagtColors.gatewayPurpleLight} rx={5} />
            {/* Arrows */}
            <path d="M -40 0 L -20 -10 M -40 0 L -20 10" stroke="white" strokeWidth={3} fill="none" />
            <path d="M 0 0 L 20 -10 M 0 0 L 20 10" stroke="white" strokeWidth={3} fill="none" />
            <path d="M 40 0 L 60 -10 M 40 0 L 60 10" stroke="white" strokeWidth={3} fill="none" />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">LB</text>
          </g>

          {/* Connection lines from LB */}
          {lbScale > 0.5 && (
            <>
              <line x1={0} y1={-160} x2={-150} y2={-50} stroke={kurzgesagtColors.gatewayPurple} strokeWidth={3} opacity={0.6} />
              <line x1={0} y1={-160} x2={0} y2={-50} stroke={kurzgesagtColors.gatewayPurple} strokeWidth={3} opacity={0.6} />
              <line x1={0} y1={-160} x2={150} y2={-50} stroke={kurzgesagtColors.gatewayPurple} strokeWidth={3} opacity={0.6} />
            </>
          )}

          {/* Three Orders clones */}
          {[-150, 0, 150].map((x, i) => {
            // Staggered appearance
            const delay = i * 20;
            const localProgress = Math.max(0, Math.min(1, (frame - 80 - delay) / 60));
            const scale = localProgress;
            const opacity = localProgress;

            return (
              <g key={i} transform={`translate(${x}, 0)`} opacity={opacity}>
                <g transform={`scale(${scale})`}>
                  <KurzgesagtCube
                    x={-cubeSize / 2}
                    y={-cubeSize / 2}
                    size={cubeSize}
                    color={kurzgesagtColors.ordersGreen}
                    emotion="happy"
                    pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: i }}
                  />
                </g>

                {/* Load indicator */}
                {loadOpacity > 0 && (
                  <g opacity={loadOpacity}>
                    <rect x={-25} y={50} width={50} height={8} fill={kurzgesagtColors.darkGrey} rx={4} />
                    <rect
                      x={-25}
                      y={50}
                      width={50 * (1 / 3)}
                      height={8}
                      fill={kurzgesagtColors.successGreen}
                      rx={4}
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* "Load Balanced" label */}
          {loadOpacity > 0 && (
            <text x={0} y={100} textAnchor="middle" fill={kurzgesagtColors.successGreen} fontSize={20} opacity={loadOpacity}>
              Load Distributed
            </text>
          )}
        </g>

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={56}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          Horizontal Scaling
        </text>
      </svg>
    </AbsoluteFill>
  );
};
