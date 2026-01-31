import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { SparkParticles } from "../animation-engine/particles/SparkParticles";
import { colors } from "../styles/colors";

export const Scene28_Tradeoff: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleY = interpolate(frame, [0, 50], [-30, 0]);

  // Scale balancing animation
  const scaleAngle = springForFrame(frame, 60, 180, 0.15, 0.75) * 25;

  // Weight indicators
  const simplicityWeight = 1;
  const flexibilityWeight = springForFrame(frame, 80, 180, 0.2, 0.7);

  // Pros/Cons panels
  const leftPanelOpacity = springForFrame(frame, 150, 200, 0.3, 0.8);
  const rightPanelOpacity = springForFrame(frame, 180, 230, 0.3, 0.8);
  const leftPanelX = interpolate(frame, [150, 200], [500, 280]);
  const rightPanelX = interpolate(frame, [180, 230], [1340, 1120]);

  // Scale beam glow
  const beamGlow = Math.sin(frame / 20) * 0.1 + 0.2;

  // Microservices blocks growing
  const blocksScale = elasticOutForFrame(frame, 100, 160, 0.4, 0.35);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background subtle grid */}
        <g opacity={0.1}>
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={100 + (i % 5) * 400}
              cy={100 + Math.floor(i / 5) * 200}
              r={3}
              fill={colors.accent}
            />
          ))}
        </g>

        {/* Main scale apparatus */}
        <g transform={`translate(960, 480) rotate(${-scaleAngle})`}>
          {/* Scale beam */}
          <rect
            x={-280}
            y={-8}
            width={560}
            height={16}
            fill={colors.monolith}
            rx={8}
          />
          {/* Glow effect on beam */}
          <rect
            x={-280}
            y={-8}
            width={560}
            height={16}
            fill={colors.accent}
            opacity={beamGlow}
            rx={8}
          />

          {/* Center pivot */}
          <circle cx={0} cy={0} r={30} fill={colors.monolithDark} stroke={colors.accent} strokeWidth={3} />
          <circle cx={0} cy={0} r={15} fill={colors.accent} opacity={0.5} />

          {/* Left side - Simplicity (Monolith) */}
          <g transform="translate(-250, 0)">
            {/* Scale arm connector */}
            <rect x={-20} y={8} width={40} height={100} fill={colors.monolithDark} rx={4} />

            {/* Scale platform */}
            <ellipse cx={0} cy={120} rx={100} ry={30} fill={colors.monolithDark} opacity={0.8} />
            <ellipse cx={0} cy={115} rx={90} ry={25} fill={colors.monolith} />

            {/* Monolith cube */}
            <g transform="translate(0, 70)" opacity={simplicityWeight}>
              <KurzgesagtCube
                x={-45}
                y={-50}
                size={90}
                color={colors.monolith}
                emotion="neutral"
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.02, phase: 0 }}
                shadowScale={true}
              />
              {/* "SIMPLE" label */}
              <rect x={-35} y={55} width={70} height={20} rx={10} fill={colors.monolithDark} />
              <text x={0} y={69} textAnchor="middle" fill={colors.textSecondary} fontSize={10} fontWeight="bold">
                SIMPLE
              </text>
            </g>
          </g>

          {/* Right side - Flexibility (Microservices) */}
          <g transform="translate(250, 0)">
            {/* Scale arm connector */}
            <rect x={-20} y={8} width={40} height={100} fill={colors.monolithDark} rx={4} />

            {/* Scale platform */}
            <ellipse cx={0} cy={120} rx={100} ry={30} fill={colors.monolithDark} opacity={0.8} />
            <ellipse cx={0} cy={115} rx={90} ry={25} fill={colors.orders} opacity={0.7} />

            {/* Microservices blocks */}
            <g transform="translate(0, 60) scale(${blocksScale})" style={{ transformOrigin: "center top" }}>
              {/* Orders service */}
              <g transform="translate(-45, -40)">
                <rect x={-25} y={-20} width={50} height={40} fill={colors.orders} rx={6} />
                <text x={0} y={5} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                  Orders
                </text>
              </g>
              {/* Inventory service */}
              <g transform="translate(10, -25)">
                <rect x={-20} y={-18} width={40} height={36} fill={colors.inventory} rx={5} />
                <text x={0} y={4} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold">
                  Inv
                </text>
              </g>
              {/* Products service */}
              <g transform="translate(40, -35)">
                <rect x={-22} y={-19} width={44} height={38} fill={colors.products} rx={5} />
                <text x={0} y={4} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold">
                  Prod
                </text>
              </g>
            </g>

            {/* "FLEXIBLE" label */}
            <g opacity={flexibilityWeight}>
              <rect x={-40} y={55} width={80} height={20} rx={10} fill={colors.ordersDark} />
              <text x={0} y={69} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                FLEXIBLE
              </text>
            </g>
          </g>
        </g>

        {/* Base of scale */}
        <g transform="translate(960, 540)">
          <rect x={-8} y={0} width={16} height={150} fill={colors.monolithDark} rx={4} />
          <rect x={-60} y={145} width={120} height={20} fill={colors.monolith} rx={6} />
        </g>

        {/* Left panel - Monolith pros/cons */}
        <g transform={`translate(${leftPanelX}, 320)`} opacity={leftPanelOpacity}>
          <rect x={0} y={0} width={280} height={280} fill={colors.monolithDark} opacity={0.9} rx={16} />
          <rect x={0} y={0} width={280} height={60} fill={colors.monolith} rx={16} />
          <rect x={0} y={40} width={280} height={20} fill={colors.monolith} />

          <text x={140} y={40} textAnchor="middle" fill={colors.text} fontSize={22} fontWeight="bold">
            {"🏛️"} Monolith
          </text>

          <g transform="translate(20, 90)">
            {[
              { text: "Easy to develop", good: true },
              { text: "Simple to deploy", good: true },
              { text: "Fast communication", good: true },
              { text: "Hard to scale", good: false },
              { text: "Tightly coupled", good: false },
              { text: "Single point of failure", good: false },
            ].map((item, i) => (
              <g key={i} transform={`translate(0, ${i * 30})`}>
                <text x={0} y={0} fill={item.good ? colors.ordersLight : colors.danger} fontSize={16} fontWeight="bold">
                  {item.good ? "✓" : "✗"} {item.text}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* Right panel - Microservices pros/cons */}
        <g transform={`translate(${rightPanelX}, 320)`} opacity={rightPanelOpacity}>
          <rect x={0} y={0} width={280} height={280} fill={colors.ordersDark} opacity={0.9} rx={16} />
          <rect x={0} y={0} width={280} height={60} fill={colors.orders} rx={16} />
          <rect x={0} y={40} width={280} height={20} fill={colors.orders} />

          <text x={140} y={40} textAnchor="middle" fill={colors.text} fontSize={22} fontWeight="bold">
            {"🚀"} Microservices
          </text>

          <g transform="translate(20, 90)">
            {[
              { text: "Independent scaling", good: true },
              { text: "Flexible deployment", good: true },
              { text: "Technology diversity", good: true },
              { text: "Complex architecture", good: false },
              { text: "More operational overhead", good: false },
              { text: "Network latency", good: false },
            ].map((item, i) => (
              <g key={i} transform={`translate(0, ${i * 30})`}>
                <text x={0} y={0} fill={item.good ? colors.ordersLight : colors.danger} fontSize={16} fontWeight="bold">
                  {item.good ? "✓" : "✗"} {item.text}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* Bottom labels */}
        <g opacity={leftPanelOpacity}>
          <text x={300} y={750} textAnchor="middle" fill={colors.textSecondary} fontSize={20} fontWeight="bold">
            Simplicity
          </text>
          <text x={1620} y={750} textAnchor="middle" fill={colors.textSecondary} fontSize={20} fontWeight="bold">
            Flexibility
          </text>
        </g>

        {/* Balance indicator arrow */}
        <g transform={`translate(960, 820) rotate(${-scaleAngle})`} opacity={leftPanelOpacity}>
          <polygon
            points={`${-scaleAngle * 3},0 ${-scaleAngle * 3 - 15},-20 ${-scaleAngle * 3 + 15},-20`}
            fill={scaleAngle > 10 ? colors.orders : scaleAngle < -10 ? colors.monolith : colors.accent}
          />
        </g>

        {/* Title */}
        <g transform={`translate(960, ${100 + titleY})`}>
          <text x={0} y={0} textAnchor="middle" fill={colors.text} fontSize={56} fontWeight="bold" opacity={titleOpacity}>
            The Trade-off
          </text>
          <text x={0} y={45} textAnchor="middle" fill={colors.textSecondary} fontSize={28} opacity={titleOpacity * 0.9}>
            {"⚖️"} Simplicity vs. Flexibility
          </text>
        </g>

        {/* Spark particles when scale settles */}
        {frame > 180 && frame < 210 && (
          <SparkParticles
            count={8}
            origin={{ x: 960, y: 480 }}
            burstFrame={180}
            color={colors.accent}
            speed={0.5}
            lifetime={30}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
