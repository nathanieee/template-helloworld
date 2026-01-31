import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";
import { Bird } from "../../components/characters";

/**
 * Scene 6c: Conclusion (1:54-2:00, 3420-3600 frames)
 * Camera zooms out, bird mascot flies in, fade to black
 */
export const Part6_Scene3_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom out
  const zoomScale = interpolate(frame, [0, 100], [1, 0.6], {
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // Bird flies in
  const birdX = interpolate(frame, [40, 120], [2200, 960], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const birdY = interpolate(frame, [40, 100], [200, 350], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Bird lands (stops flying)
  const landedProgress = interpolate(frame, [100, 130], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Final message fade in
  const messageOpacity = interpolate(frame, [100, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade to black
  const blackOpacity = interpolate(frame, [160, 180], [0, 1], {
    extrapolateRight: "clamp",
  });

  const positions = [
    { x: -250, color: kurzgesagtColors.usersBlue },
    { x: 0, color: kurzgesagtColors.ordersGreen },
    { x: 100, color: kurzgesagtColors.ordersGreen },
    { x: 200, color: kurzgesagtColors.ordersGreen },
    { x: 350, color: kurzgesagtColors.inventoryOrange },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg
        width={1920}
        height={1080}
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center",
        }}
      >
        <g transform="translate(960, 540)">
          {/* All services visible */}
          {positions.map((pos, i) => (
            <g key={i} transform={`translate(${pos.x}, 0)`}>
              <KurzgesagtCube
                x={-30}
                y={-30}
                size={60}
                color={pos.color}
                emotion="happy"
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.02, phase: i }}
              />
            </g>
          ))}

          {/* Connection lines */}
          <g opacity={0.3}>
            <line x1={-220} y1={0} x2={-30} y2={0} stroke={kurzgesagtColors.white} strokeWidth={2} />
            <line x1={30} y1={0} x2={70} y2={0} stroke={kurzgesagtColors.white} strokeWidth={2} />
            <line x1={130} y1={0} x2={170} y2={0} stroke={kurzgesagtColors.white} strokeWidth={2} />
            <line x1={230} y1={0} x2={320} y2={0} stroke={kurzgesagtColors.white} strokeWidth={2} />
          </g>

          {/* Gateway above */}
          <g transform="translate(0, -180)">
            <rect x={-50} y={-30} width={100} height={60} fill={kurzgesagtColors.gatewayPurple} rx={8} />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">API Gateway</text>
          </g>
        </g>

        {/* Bird mascot */}
        <g transform={`translate(${birdX}, ${birdY})`}>
          <Bird
            x={0}
            y={0}
            scale={2}
            facingRight={false}
            flying={landedProgress < 1}
            wingFlapSpeed={0.15}
          />
        </g>

        {/* Final message */}
        <g opacity={messageOpacity}>
          <text
            x={960}
            y={850}
            textAnchor="middle"
            fill={kurzgesagtColors.white}
            fontSize={48}
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            Microservices: Complexity for Flexibility
          </text>
        </g>

        {/* Fade to black overlay */}
        <rect
          x={0}
          y={0}
          width={1920}
          height={1080}
          fill="black"
          opacity={blackOpacity}
        />
      </svg>
    </AbsoluteFill>
  );
};
