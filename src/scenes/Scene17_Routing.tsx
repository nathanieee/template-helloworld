import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtGateway } from "../components/kurzgesagt/KurzgesagtGateway";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { DataParticles } from "../animation-engine/particles/DataParticles";
import { colors } from "../styles/colors";

export const Scene17_Routing: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleScale = springForFrame(frame, 0, 60, 0.25, 0.7);

  // Gateway entrance with spring
  const gatewayScale = springForFrame(frame, 40, 120, 0.2, 0.7);
  const gatewayGlow = interpolate(frame, [100, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Services slide in
  const serviceSlide = springForFrame(frame, 60, 150, 0.3, 0.7);

  const services = [
    { name: "Orders", color: colors.orders, x: 400, y: 380, delay: 0 },
    { name: "Inventory", color: colors.inventory, x: 960, y: 380, delay: 10 },
    { name: "Products", color: colors.products, x: 1520, y: 380, delay: 20 },
    { name: "Users", color: colors.users, x: 680, y: 650, delay: 5 },
  ];

  // Request envelopes flowing rapidly with spring easing
  const requests = [
    {
      toX: 400,
      toY: 380,
      color: colors.orders,
      startFrame: 140,
      duration: 25,
    },
    {
      toX: 960,
      toY: 380,
      color: colors.inventory,
      startFrame: 155,
      duration: 22,
    },
    {
      toX: 1520,
      toY: 380,
      color: colors.products,
      startFrame: 170,
      duration: 28,
    },
    {
      toX: 680,
      toY: 650,
      color: colors.users,
      startFrame: 185,
      duration: 24,
    },
    {
      toX: 400,
      toY: 380,
      color: colors.orders,
      startFrame: 200,
      duration: 20,
    },
  ];

  // Envelope path animation helper
  const getEnvelopePosition = (request: { toX: number; toY: number; startFrame: number; duration: number }) => {
    const progress = springForFrame(frame, request.startFrame, request.startFrame + request.duration, 0.4, 0.7);
    if (progress <= 0) return null;

    const startX = 960;
    const startY = 540;
    const endX = request.toX;
    const endY = request.toY;

    // Add arc to path for more dynamic motion
    const midX = (startX + endX) / 2;
    const midY = Math.min(startY, endY) - 50;

    const t = progress;
    const invT = 1 - t;

    // Quadratic bezier
    const x = invT * invT * startX + 2 * invT * t * midX + t * t * endX;
    const y = invT * invT * startY + 2 * invT * t * midY + t * t * endY;

    // Envelope rotation based on direction
    const rotation = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    return { x, y, rotation, progress };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background floating particles */}
        {frame >= 80 && Array.from({ length: 8 }).map((_, i) => {
          const progress = ((frame * 2 + i * 25) % 100) / 100;
          const y = 100 + progress * 300;
          const x = 760 + Math.sin(progress * Math.PI * 2 + i) * 100;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={6 + Math.sin(i) * 3}
              fill={colors.network}
              opacity={0.4 * (1 - progress * 0.5)}
            />
          );
        })}

        {/* Title */}
        <g
          transform={`translate(960, 120) scale(${0.8 + titleScale * 0.2})`}
          style={{ transformOrigin: "960px 120px" }}
        >
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fill={colors.text}
            fontSize={52}
            fontWeight="bold"
            opacity={titleOpacity}
          >
            Smart Routing
          </text>
          <text
            x={0}
            y={50}
            textAnchor="middle"
            fill={colors.accent}
            fontSize={26}
            opacity={titleOpacity * 0.9}
          >
            Gateway knows exactly where each request goes
          </text>
        </g>

        {/* Central Gateway */}
        <g transform="translate(960, 540)">
          {gatewayGlow > 0 && (
            <ellipse
              cx={0}
              cy={0}
              rx={140 * gatewayScale}
              ry={100 * gatewayScale}
              fill={colors.accent}
              opacity={gatewayGlow * 0.25}
            />
          )}
          <KurzgesagtGateway
            x={0}
            y={0}
            width={140}
            height={120}
            color={colors.accent}
            glow={frame >= 100}
            glowIntensity={0.6 + gatewayGlow * 0.4}
            archScale={gatewayScale}
          />
        </g>

        {/* Service Cubes */}
        {services.map((service, i) => {
          const slideProgress = springForFrame(frame, 60 + service.delay, 150 + service.delay, 0.3, 0.7);
          const xOffset = (slideProgress - 1) * 200;

          return (
            <g
              key={service.name}
              transform={`translate(${service.x + xOffset}, ${service.y})`}
            >
              <KurzgesagtCube
                x={-45}
                y={-45}
                size={90}
                color={service.color}
                emotion="happy"
                pulseConfig={{
                  min: 0.97,
                  max: 1.03,
                  speed: 0.025,
                  phase: i * 3,
                }}
              />
              <text
                x={0}
                y={65}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={16}
                fontWeight="bold"
              >
                {service.name}
              </text>
            </g>
          );
        })}

        {/* Routing paths with animated data particles */}
        {requests.map((request, i) => {
          const pos = getEnvelopePosition(request);
          if (!pos) return null;

          // Fade out near destination
          const opacity = pos.progress < 0.8 ? 1 : interpolate(pos.progress, [0.8, 1], [1, 0]);

          return (
            <g key={i} opacity={opacity}>
              {/* Trail line */}
              <line
                x1={960}
                y1={540}
                x2={pos.x}
                y2={pos.y}
                stroke={request.color}
                strokeWidth={3}
                strokeDasharray="6,4"
                opacity={0.4}
              />

              {/* Envelope icon */}
              <g transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rotation})`}>
                <rect
                  x={-20}
                  y={-14}
                  width={40}
                  height={28}
                  rx={4}
                  fill={request.color}
                  stroke="white"
                  strokeWidth={2}
                />
                {/* Envelope flap lines */}
                <path
                  d="M -20 -14 L 0 4 L 20 -14"
                  stroke="white"
                  strokeWidth={2}
                  fill="none"
                  opacity={0.8}
                />
                <line
                  x1={-20}
                  y1={14}
                  x2={20}
                  y2={14}
                  stroke="white"
                  strokeWidth={2}
                  opacity={0.6}
                />
              </g>

              {/* Glow effect on envelope */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={18}
                fill={request.color}
                opacity={0.3}
              />
            </g>
          );
        })}

        {/* Data particles along routes */}
        {frame >= 130 && (
          <DataParticles
            path={[
              { x: 960, y: 540 },
              { x: 680, y: 460 },
              { x: 400, y: 380 },
            ]}
            count={4}
            startFrame={130}
            duration={35}
            color={colors.orders}
            size={5}
            spacing={18}
          />
        )}

        {frame >= 145 && (
          <DataParticles
            path={[
              { x: 960, y: 540 },
              { x: 960, y: 460 },
              { x: 960, y: 380 },
            ]}
            count={4}
            startFrame={145}
            duration={30}
            color={colors.inventory}
            size={5}
            spacing={18}
          />
        )}

        {frame >= 160 && (
          <DataParticles
            path={[
              { x: 960, y: 540 },
              { x: 1240, y: 460 },
              { x: 1520, y: 380 },
            ]}
            count={4}
            startFrame={160}
            duration={35}
            color={colors.products}
            size={5}
            spacing={18}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
