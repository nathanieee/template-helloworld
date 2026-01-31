import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene15_Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const envelopeCount = Math.floor(interpolate(frame, [0, 200], [0, 150], { extrapolateRight: "clamp" }));
  const chaosRotation = interpolate(frame, [0, 250], [0, 15], { extrapolateRight: "clamp" });
  const shake = frame > 150 ? Math.sin(frame / 2) * 5 * ((frame - 150) / 150) : 0;
  const panicScale = 1 + Math.sin((frame / 5) * Math.PI * 2) * 0.1 * (frame / 300);

  const services = [
    { name: "Orders", color: colors.orders, x: 960, y: 400 },
    { name: "Inventory", color: colors.inventory, x: 600, y: 650 },
    { name: "Products", color: colors.products, x: 1320, y: 650 },
  ];

  const envelopes = Array.from({ length: envelopeCount }).map((_, i) => ({
    x: Math.random() * 1920,
    y: Math.random() * 1080,
    rotation: Math.random() * 360,
    scale: 0.3 + Math.random() * 0.5,
    color: [colors.orders, colors.inventory, colors.products, colors.network][Math.floor(Math.random() * 4)],
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080} style={{ transform: `rotate(${chaosRotation}deg) translate(${shake}px, ${shake}px)` }}>
        {envelopes.map((env, i) => (
          <g key={i} transform={`translate(${env.x}, ${env.y}) rotate(${env.rotation}) scale(${env.scale})`}>
            <rect x={-25} y={-18} width={50} height={36} rx={4} fill={env.color} opacity={0.7} />
            <path d="M -25 -18 L 0 5 L 25 -18" fill={env.color} opacity={0.5} />
          </g>
        ))}
        {services.map((service, i) => (
          <g key={service.name} transform={`translate(${service.x}, ${service.y}) scale(${panicScale})`}>
            {frame > 100 && (
              <>
                <ellipse cx={50} cy={-40} rx={8} ry={12} fill={colors.network} opacity={0.6}>
                  <animate attributeName="cy" values="-40;-20;-40" dur="1s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx={-50} cy={-40} rx={8} ry={12} fill={colors.network} opacity={0.6}>
                  <animate attributeName="cy" values="-40;-20;-40" dur="0.8s" repeatCount="indefinite" />
                </ellipse>
              </>
            )}
            <rect x={-60} y={-40} width={120} height={80} rx={10} fill={service.color} />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={16} fontWeight="bold">{service.name}</text>
          </g>
        ))}
        {frame > 200 && (
          <g transform="translate(960, 540)" opacity={interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" })}>
            <path d="M 0 0 Q 30 -30 60 0 Q 90 60 0 90 Q -90 60 -120 0 Q -150 -90 0 -120" fill="none" stroke={colors.danger} strokeWidth={5} opacity={0.5} />
            <text x={0} y={0} textAnchor="middle" fill={colors.danger} fontSize={48} fontWeight="bold">TOO MANY!</text>
          </g>
        )}
        <text x={960} y={100} textAnchor="middle" fill={colors.danger} fontSize={56} fontWeight="bold" opacity={titleOpacity}>THE CHAOS</text>
        <text x={960} y={170} textAnchor="middle" fill={colors.textSecondary} fontSize={32} opacity={titleOpacity}>Hundreds of requests flying everywhere! 😵</text>
      </svg>
    </AbsoluteFill>
  );
};
