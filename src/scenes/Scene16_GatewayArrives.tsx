import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtGateway } from "../components/kurzgesagt/KurzgesagtGateway";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { SparkParticles } from "../animation-engine/particles/SparkParticles";
import { colors } from "../styles/colors";

export const Scene16_GatewayArrives: React.FC = () => {
  const frame = useCurrentFrame();

  // Title fade in with spring
  const titleOpacity = springForFrame(frame, 0, 60, 0.3, 0.8);
  const titleY = springForFrame(frame, 0, 60, 0.25, 0.7);

  // Gateway slides in with spring easing (bouncy arrival)
  const gatewayProgress = springForFrame(frame, 30, 180, 0.25, 0.65);
  const gatewayY = 1200 - gatewayProgress * 660;

  // Gateway squash and stretch on arrival
  const gatewayScaleX = interpolate(frame, [150, 180, 210], [1, 1.15, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const gatewayScaleY = interpolate(frame, [150, 180, 210], [1, 0.85, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Shield glow pulses after arrival
  const glowPulse = (Math.sin(((frame - 160) / 20) * Math.PI * 2) + 1) / 2;
  const glowIntensity = interpolate(frame, [160, 200], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Services react to gateway arrival
  const serviceReaction = elasticOutForFrame(frame, 170, 220, 1.5, 0.4);
  const serviceScale = 1 + (serviceReaction > 0 ? serviceReaction * 0.15 : 0);

  // Spark particles burst on arrival
  const sparkBurst = frame >= 175 && frame < 220;

  // Service cube positions
  const services = [
    { name: "Orders", color: colors.orders, x: 350, y: 280, emotion: "neutral" as const },
    { name: "Inventory", color: colors.inventory, x: 960, y: 280, emotion: "neutral" as const },
    { name: "Products", color: colors.products, x: 1570, y: 280, emotion: "neutral" as const },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background services as Kurzgesagt cubes */}
        {services.map((service, i) => (
          <g key={service.name} transform={`translate(${service.x}, ${service.y})`}>
            <KurzgesagtCube
              x={-50}
              y={-50}
              size={100}
              color={service.color}
              emotion={service.emotion}
              pulseConfig={{
                min: 0.98,
                max: 1.02,
                speed: 0.02,
                phase: i * 2,
              }}
            />
            <text
              x={0}
              y={75}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={16}
              fontWeight="bold"
              opacity={0.8}
            >
              {service.name}
            </text>
          </g>
        ))}

        {/* Gateway with spring animation */}
        <g
          transform={`translate(960, ${gatewayY}) scale(${gatewayScaleX}, ${gatewayScaleY})`}
          style={{ transformOrigin: "960px center" }}
        >
          <KurzgesagtGateway
            x={0}
            y={0}
            width={160}
            height={140}
            color={colors.accent}
            glow={frame >= 160}
            glowIntensity={0.8 + glowPulse * 0.4}
          />

          {/* Gateway label */}
          {frame >= 160 && (
            <text
              x={0}
              y={110}
              textAnchor="middle"
              fill={colors.accent}
              fontSize={22}
              fontWeight="bold"
              opacity={interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" })}
            >
              API Gateway
            </text>
          )}
        </g>

        {/* Spark particles burst on gateway arrival */}
        {sparkBurst && (
          <SparkParticles
            count={20}
            origin={{ x: 960, y: gatewayY }}
            burstFrame={175}
            color={colors.accent}
            speed={1.5}
            lifetime={50}
          />
        )}

        {/* Additional effect particles */}
        {sparkBurst && (
          <SparkParticles
            count={12}
            origin={{ x: 960, y: gatewayY }}
            burstFrame={178}
            color={colors.network}
            speed={1.2}
            lifetime={40}
          />
        )}

        {/* Title with spring slide-in */}
        <g
          transform={`translate(0, ${150 - titleY * 30})`}
          opacity={titleOpacity}
        >
          <text
            x={960}
            y={150}
            textAnchor="middle"
            fill={colors.text}
            fontSize={56}
            fontWeight="bold"
          >
            The Gateway Arrives
          </text>
          <text
            x={960}
            y={210}
            textAnchor="middle"
            fill={colors.accent}
            fontSize={28}
            opacity={0.9}
          >
            "Let me handle that for you!"
          </text>
        </g>

        {/* Decorative network lines connecting services */}
        {frame >= 200 && (
          <g opacity={interpolate(frame, [200, 240], [0, 0.3], { extrapolateRight: "clamp" })}>
            <line
              x1={400}
              y1={280}
              x2={960}
              y2={280}
              stroke={colors.network}
              strokeWidth={2}
              strokeDasharray="8,4"
            />
            <line
              x1={1520}
              y1={280}
              x2={960}
              y2={280}
              stroke={colors.network}
              strokeWidth={2}
              strokeDasharray="8,4"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
