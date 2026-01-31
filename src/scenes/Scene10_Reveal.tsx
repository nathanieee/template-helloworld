import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame, DustParticles, SparkParticles, usePulse } from "../animation-engine";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { colors } from "../styles/colors";

export const Scene10_Reveal: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = springForFrame(frame, 0, 60, 0.3, 0.7);
  const centerPulse = usePulse({ min: 0.98, max: 1.02, speed: 0.025 });

  const services = [
    { name: "Orders", color: colors.orders, angle: 0, delay: 0 },
    { name: "Inventory", color: colors.inventory, angle: 72, delay: 10 },
    { name: "Products", color: colors.products, angle: 144, delay: 20 },
    { name: "Payments", color: colors.payments, angle: 216, delay: 30 },
    { name: "Users", color: colors.users, angle: 288, delay: 40 },
  ];

  const flashOpacity = interpolate(frame, [50, 80, 120], [0, 0.8, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <DustParticles count={30} speed={0.2} />

        {flashOpacity > 0 && <rect x={0} y={0} width={1920} height={1080} fill="white" opacity={flashOpacity} />}

        <g transform={"translate(960, 540) scale(" + centerPulse + ")"}>
          <g opacity={interpolate(frame, [100, 150], [0, 1], { extrapolateRight: "clamp" })}>
            <ellipse cx={0} cy={0} rx={90} ry={50} fill={colors.monolith} opacity={0.3} />
            <text x={0} y={8} textAnchor="middle" fill={colors.text} fontSize={24} fontWeight="bold">Microservices</text>
          </g>

          {services.map((service, i) => {
            const angleRad = (service.angle - 90) * (Math.PI / 180);
            const radius = 280;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            const revealProgress = springForFrame(frame, 60 + service.delay, 120 + service.delay, 0.25, 0.65);
            const elasticScale = elasticOutForFrame(frame, 60 + service.delay, 100 + service.delay, 1.15, 0.35);
            const opacity = interpolate(frame, [60 + service.delay, 100 + service.delay], [0, 1], { extrapolateRight: "clamp" });

            return (
              <g key={service.name} transform={"translate(" + x + ", " + y + ") scale(" + elasticScale + ")"} opacity={opacity}>
                <ellipse cx={0} cy={55} rx={55} ry={12} fill="rgba(0,0,0,0.2)" />
                <line x1={0} y1={0} x2={-x * 0.3} y2={-y * 0.3} stroke={service.color} strokeWidth={2} opacity={0.4} strokeDasharray="5,5" />
                <KurzgesagtCube x={-50} y={-50} size={100} color={service.color} emotion="happy" glow={true} pulseConfig={{ min: 0.95, max: 1.05, speed: 0.03, phase: i * 0.7 }} />
                <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{service.name}</text>
                {frame >= 100 + service.delay && frame <= 140 + service.delay && <SparkParticles count={6} origin={{ x: 0, y: 0 }} burstFrame={100 + service.delay} color={service.color} lifetime={40} />}
              </g>
            );
          })}

          {frame >= 80 && frame <= 140 && <g opacity={interpolate(frame, [80, 130], [1, 0], { extrapolateRight: "clamp" })}>
            <SparkParticles count={25} origin={{ x: 0, y: 0 }} burstFrame={80} color={colors.accent} lifetime={60} />
          </g>}

          {frame >= 180 && <SparkParticles count={20} origin={{ x: 0, y: 0 }} burstFrame={180} color={colors.accent} lifetime={70} />}

          {frame >= 150 && [...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2 + frame * 0.01;
            const orbitRadius = 220;
            const px = Math.cos(angle) * orbitRadius;
            const py = Math.sin(angle) * orbitRadius;
            return <circle key={i} cx={px} cy={py} r={3} fill={colors.accent} opacity={0.6} />;
          })}
        </g>

        <text x={960} y={120} textAnchor="middle" fill={colors.text} fontSize={56} fontWeight="bold" opacity={titleOpacity}>The Reveal</text>
        <text x={960} y={185} textAnchor="middle" fill={colors.accent} fontSize={32} opacity={interpolate(frame, [30, 80], [0, 1], { extrapolateRight: "clamp" })}>Meet the new microservices!</text>

        <g opacity={interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" })}>
          <text x={960} y={920} textAnchor="middle" fill={colors.success} fontSize={26} fontWeight="bold">Each service independent, scalable, and free to evolve</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
