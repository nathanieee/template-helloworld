import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";
import { useShake } from "../../animation-engine/hooks";

/**
 * Scene 5a: Traffic Spike (1:20-1:27, 2400-2610 frames)
 * Hundreds of envelopes flood screen, cubes overwhelmed
 */
export const Part5_Scene1_TrafficSpike: React.FC = () => {
  const frame = useCurrentFrame();

  // Envelope count increases
  const envelopeCount = Math.floor(interpolate(frame, [0, 150], [5, 50], {
    extrapolateRight: "clamp",
  }));

  // Cubes shake when overwhelmed
  const shakeIntensity = interpolate(frame, [60, 120], [0, 10], {
    extrapolateRight: "clamp",
  });
  const shake = useShake({ intensity: shakeIntensity });

  // Cube emotion changes to worried
  const worryProgress = interpolate(frame, [80, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text fade in
  const textOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateRight: "clamp",
  });

  const positions = [-200, 0, 200];
  const colors = [
    kurzgesagtColors.usersBlue,
    kurzgesagtColors.ordersGreen,
    kurzgesagtColors.inventoryOrange,
  ];

  // Generate random envelope positions
  const envelopes = Array.from({ length: envelopeCount }, (_, i) => {
    const angle = (i / 50) * Math.PI * 2 + frame * 0.02;
    const radius = 200 + (i % 5) * 80;
    const speed = 1 + (i % 3) * 0.5;
    const progress = ((frame * speed + i * 10) % 150) / 150;

    return {
      x: Math.cos(angle) * radius * progress,
      y: Math.sin(angle) * radius * progress - 100 * (1 - progress),
      rotation: (frame * 2 + i * 15) % 360,
    };
  });

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
        <g transform="translate(960, 540)">
          {/* Cubes */}
          {positions.map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`}>
              <KurzgesagtCube
                x={-40}
                y={-40}
                size={80}
                color={colors[i]}
                emotion={worryProgress > 0.5 ? "worried" : "neutral"}
                pulseConfig={{ min: 0.95, max: 1.05, speed: 0.1, phase: i }}
              />
              {/* Sweat drops when worried */}
              {worryProgress > 0.5 && i === 1 && (
                <g transform="translate(30, -30)">
                  <path
                    d="M 0 0 Q 5 10 0 15 Q -5 10 0 0"
                    fill={kurzgesagtColors.usersBlue}
                    opacity={0.7}
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0 0; 5 20; 0 40"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              )}
            </g>
          ))}

          {/* Flying envelopes */}
          {envelopes.map((env, i) => (
            <g key={i} transform={`translate(${env.x}, ${env.y}) rotate(${env.rotation})`}>
              <rect x={-12} y={-8} width={24} height={16} fill={kurzgesagtColors.white} rx={2} opacity={0.8} />
              <path d="M -12 -8 L 0 2 L 12 -8" fill={kurzgesagtColors.white} stroke={kurzgesagtColors.darkGrey} strokeWidth={1} />
            </g>
          ))}
        </g>

        {/* Warning text */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={kurzgesagtColors.orangeRed}
          fontSize={56}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          Incoming Traffic...
        </text>

        {/* Counter */}
        <text
          x={960}
          y={190}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={32}
          fontFamily="monospace"
          opacity={textOpacity}
        >
          {Math.floor(envelopeCount * 23)} req/sec
        </text>
      </svg>
    </AbsoluteFill>
  );
};
