import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame } from "../animation-engine/easing";
import { CameraZoom } from "../animation-engine/camera";
import { DataParticles } from "../animation-engine/particles/DataParticles";
import { SparkParticles } from "../animation-engine/particles/SparkParticles";
import { colors } from "../styles/colors";

export const Scene27_ZoomOut: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom out animation - start close, end far
  const zoomProgress = springForFrame(frame, 0, 240, 0.15, 0.8);

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleY = interpolate(frame, [0, 50], [-30, 0]);

  // Feature labels fade in
  const labelsOpacity = springForFrame(frame, 180, 240, 0.3, 0.8);
  const labelsY = interpolate(frame, [180, 240], [30, 0]);

  // System box pulse
  const boxScale = 1 + Math.sin(frame / 40) * 0.01;
  const boxGlow = interpolate(frame, [150, 200], [0, 0.3], { extrapolateRight: "clamp" });

  // Service data for the architecture diagram
  const services = [
    { name: "Users", color: colors.users, x: 960, y: 280, scale: 1 },
    { name: "API Gateway", color: colors.accent, x: 960, y: 420, scale: 1.2 },
    { name: "Orders 1", color: colors.orders, x: 760, y: 560, scale: 0.9 },
    { name: "Orders 2", color: colors.orders, x: 960, y: 560, scale: 0.9 },
    { name: "Orders 3", color: colors.orders, x: 1160, y: 560, scale: 0.9 },
    { name: "Inventory", color: colors.inventory, x: 800, y: 700, scale: 0.85 },
    { name: "Products", color: colors.products, x: 960, y: 700, scale: 0.85 },
    { name: "Payments", color: colors.payments, x: 1120, y: 700, scale: 0.85 },
  ];

  // Connection paths
  const connections = [
    [0, 1], // Users -> API Gateway
    [1, 2], // API -> Orders 1
    [1, 3], // API -> Orders 2
    [1, 4], // API -> Orders 3
    [2, 5], // Orders 1 -> Inventory
    [3, 6], // Orders 2 -> Products
    [4, 7], // Orders 3 -> Payments
  ];

  // Calculate zoom level
  const currentZoom = 2.5 - zoomProgress * 2; // Starts at 2.5x, ends at 0.5x

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <CameraZoom
        from={2.5}
        to={0.5}
        startFrame={0}
        duration={240}
        targetX={960}
        targetY={490}
      >
        <svg width={1920} height={1080}>
          {/* Background grid that becomes visible as we zoom out */}
          <g opacity={zoomProgress * 0.3}>
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={200 + i * 180}
                y1={0}
                x2={200 + i * 180}
                y2={1080}
                stroke={colors.network}
                strokeWidth={1}
                strokeDasharray="5,5"
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={100 + i * 180}
                x2={1920}
                y2={100 + i * 180}
                stroke={colors.network}
                strokeWidth={1}
                strokeDasharray="5,5"
              />
            ))}
          </g>

          {/* System boundary box */}
          <g
            transform={`translate(960, 490) scale(${boxScale})`}
            style={{ transformOrigin: "center" }}
          >
            <rect
              x={-320}
              y={-180}
              width={640}
              height={560}
              fill="none"
              stroke={colors.accent}
              strokeWidth={3}
              strokeDasharray="20,10"
              rx={20}
              opacity={boxGlow + 0.2}
            />
            {/* Corner accents */}
            <g opacity={boxGlow + 0.3}>
              <rect x={-330} y={-190} width={20} height={20} fill={colors.accent} rx={4} />
              <rect x={310} y={-190} width={20} height={20} fill={colors.accent} rx={4} />
              <rect x={-330} y={370} width={20} height={20} fill={colors.accent} rx={4} />
              <rect x={310} y={370} width={20} height={20} fill={colors.accent} rx={4} />
            </g>
          </g>

          {/* Connection lines */}
          {connections.map(([fromIdx, toIdx], i) => {
            const from = services[fromIdx];
            const to = services[toIdx];
            const lineOpacity = springForFrame(frame, 60 + i * 15, 120 + i * 15, 0.2, 0.7);

            return (
              <g key={i} opacity={lineOpacity}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={colors.network}
                  strokeWidth={2}
                  opacity={0.4}
                />
                {/* Data particles flowing along connections */}
                <DataParticles
                  path={[
                    { x: from.x, y: from.y, progress: 0 },
                    { x: to.x, y: to.y, progress: 1 },
                  ]}
                  count={2}
                  startFrame={120 + i * 20}
                  duration={50}
                  color={from.color}
                  size={4}
                  spacing={30}
                />
              </g>
            );
          })}

          {/* Services */}
          {services.map((service, i) => {
            const serviceOpacity = springForFrame(frame, i * 20, i * 20 + 60, 0.25, 0.75);
            const serviceScale = serviceOpacity < 1 ? 0.3 + serviceOpacity * 0.7 : 1;

            return (
              <g
                key={service.name}
                transform={`translate(${service.x}, ${service.y}) scale(${serviceScale})`}
                opacity={serviceOpacity}
                style={{ transformOrigin: "center" }}
              >
                {/* Service box with rounded corners */}
                <rect
                  x={-50 * service.scale}
                  y={-25 * service.scale}
                  width={100 * service.scale}
                  height={50 * service.scale}
                  fill={service.color}
                  rx={8}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={2}
                />
                {/* Highlight */}
                <rect
                  x={-45 * service.scale}
                  y={-20 * service.scale}
                  width={15 * service.scale}
                  height={15 * service.scale}
                  fill="white"
                  opacity={0.2}
                  rx={4}
                />
                {/* Label */}
                <text
                  x={0}
                  y={5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={12 * service.scale}
                  fontWeight="bold"
                >
                  {service.name}
                </text>
              </g>
            );
          })}

          {/* System label */}
          <g transform="translate(960, 780)" opacity={zoomProgress}>
            <rect x={-80} y={-15} width={160} height={30} rx={15} fill={colors.monolithDark} opacity={0.8} />
            <text x={0} y={5} textAnchor="middle" fill={colors.accent} fontSize={14} fontWeight="bold">
              Microservices System
            </text>
          </g>

          {/* Feature labels that slide in */}
          <g transform={`translate(150, ${200 + labelsY})`} opacity={labelsOpacity}>
            <text x={0} y={0} fill={colors.accent} fontSize={24} fontWeight="bold">
              System Architecture
            </text>
            <g transform="translate(0, 40)">
              {[
                { icon: "🔀", text: "API Gateway routes requests" },
                { icon: "📦", text: "Multiple service instances" },
                { icon: "💾", text: "Independent databases" },
                { icon: "⚖️", text: "Load balancing" },
              ].map((item, i) => (
                <g key={i} transform={`translate(0, ${i * 35})`}>
                  <text x={0} y={0} fill={colors.textSecondary} fontSize={16}>
                    {item.icon} {item.text}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* Title */}
          <g transform={`translate(1760, ${100 + titleY})`} style={{ transformOrigin: "right center" }}>
            <text x={0} y={0} textAnchor="end" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
              The Big Picture
            </text>
            <text x={0} y={45} textAnchor="end" fill={colors.textSecondary} fontSize={24} opacity={titleOpacity * 0.9}>
              All services working together {"🎵"}
            </text>
          </g>

          {/* Spark burst when zoom completes */}
          {zoomProgress > 0.95 && (
            <SparkParticles
              count={12}
              origin={{ x: 960, y: 490 }}
              burstFrame={240}
              color={colors.accent}
              speed={0.6}
              lifetime={50}
            />
          )}
        </svg>
      </CameraZoom>
    </AbsoluteFill>
  );
};
