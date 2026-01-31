import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube, KurzgesagtGateway } from "../../components/kurzgesagt";

/**
 * Scene 5b+5c: Gateway Protection (1:27-1:40, 2610-3000 frames)
 * API Gateway arrives, routes envelopes, blocks intruder
 */
export const Part5_Scene2_GatewayProtection: React.FC = () => {
  const frame = useCurrentFrame();

  // Gateway slides in from top
  const gatewayY = interpolate(frame, [0, 50], [-300, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  // Gateway glow activates
  const glowIntensity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Envelope routing animation
  const routeProgress = interpolate(frame, [100, 200], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  // Dark intruder envelope appears
  const intruderProgress = interpolate(frame, [180, 240], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Shield activates red
  const shieldActive = frame > 220 && frame < 280;

  // Cubes relieved emotion
  const reliefProgress = interpolate(frame, [100, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text labels
  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  const featureOpacity = interpolate(frame, [280, 320], [0, 1], {
    extrapolateRight: "clamp",
  });

  const positions = [-200, 0, 200];
  const colors = [
    kurzgesagtColors.usersBlue,
    kurzgesagtColors.ordersGreen,
    kurzgesagtColors.inventoryOrange,
  ];

  // Envelopes being routed
  const envelopes = [
    { xStart: -100, xEnd: -200, delay: 0, color: kurzgesagtColors.white },
    { xStart: 0, xEnd: 0, delay: 20, color: kurzgesagtColors.white },
    { xStart: 100, xEnd: 200, delay: 40, color: kurzgesagtColors.white },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* API Gateway */}
          <g transform={`translate(0, ${gatewayY - 150})`}>
            <KurzgesagtGateway
              x={0}
              y={0}
              width={180}
              height={150}
              color={kurzgesagtColors.gatewayPurple}
              glow={glowIntensity > 0}
              glowIntensity={0.5 + glowIntensity * 0.5}
              shieldActive={shieldActive}
              shieldColor={kurzgesagtColors.errorRed}
              archScale={1 + Math.sin(frame * 0.03) * 0.02}
            />
          </g>

          {/* Cubes behind gateway */}
          {positions.map((x, i) => (
            <g key={i} transform={`translate(${x}, 100)`}>
              <KurzgesagtCube
                x={-40}
                y={-40}
                size={80}
                color={colors[i]}
                emotion={reliefProgress > 0.5 ? "happy" : "neutral"}
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: i }}
              />
            </g>
          ))}

          {/* Routed envelopes */}
          {envelopes.map((env, i) => {
            const localProgress = Math.max(0, Math.min(1, (frame - 100 - env.delay) / 60));
            if (localProgress <= 0 || localProgress >= 1) return null;

            const currentX = env.xStart + (env.xEnd - env.xStart) * localProgress;
            const y = -100 + localProgress * 200;

            return (
              <g key={i} transform={`translate(${currentX}, ${y})`}>
                <rect x={-10} y={-7} width={20} height={14} fill={env.color} rx={2} />
                <path d="M -10 -7 L 0 2 L 10 -7" fill={env.color} stroke={kurzgesagtColors.darkGrey} strokeWidth={1} />
              </g>
            );
          })}

          {/* Dark intruder envelope */}
          {intruderProgress > 0 && (
            <g transform={`translate(0, ${-100 + intruderProgress * 150})`}>
              {/* Red glow around intruder */}
              <circle cx={0} cy={0} r={20} fill={kurzgesagtColors.errorRed} opacity={0.3} />
              <rect x={-12} y={-8} width={24} height={16} fill={kurzgesagtColors.darkGrey} rx={2} />
              <path d="M -12 -8 L 0 2 L 12 -8" fill={kurzgesagtColors.darkGrey} stroke="#333" strokeWidth={1} />
              {/* Skull symbol */}
              <circle cx={0} cy={0} r={4} fill={kurzgesagtColors.errorRed} />
            </g>
          )}

          {/* Blocked indicator */}
          {shieldActive && (
            <g transform="translate(0, -50)" opacity={interpolate(frame, [220, 240], [0, 1], { extrapolateRight: "clamp" })}>
              <text x={0} y={0} textAnchor="middle" fill={kurzgesagtColors.errorRed} fontSize={24} fontWeight="bold">
                BLOCKED
              </text>
            </g>
          )}
        </g>

        {/* Title */}
        <text
          x={960}
          y={100}
          textAnchor="middle"
          fill={kurzgesagtColors.gatewayPurple}
          fontSize={52}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={textOpacity}
        >
          API Gateway
        </text>

        {/* Features list */}
        <g opacity={featureOpacity}>
          <text x={960} y={170} textAnchor="middle" fill={kurzgesagtColors.white} fontSize={28} fontFamily="Arial, sans-serif">
            Routing • Authentication • Rate Limiting
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
