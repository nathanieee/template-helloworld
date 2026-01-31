import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { colors } from "../styles/colors";

export const Scene20_LooseCoupling: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleScale = springForFrame(frame, 0, 60, 0.25, 0.7);

  // Services appear with spring
  const ordersScale = springForFrame(frame, 40, 100, 0.3, 0.7);
  const inventoryScale = springForFrame(frame, 60, 120, 0.3, 0.7);

  // Initial connection forms
  const initialConnect = springForFrame(frame, 120, 160, 0.35, 0.65);

  // Disconnection animation - plug pulls out with elastic
  const disconnectProgress = springForFrame(frame, 180, 230, 0.3, 0.7);
  const plugPullX = disconnectProgress * 150;
  const plugWiggle = Math.sin(((frame - 180) / 5) * Math.PI * 2) * 8 * (1 - disconnectProgress);

  // Cable snap back effect
  const cableSnap = elasticOutForFrame(frame, 180, 240, 1.3, 0.4);

  // Services show emotions during disconnect
  const ordersWorried = interpolate(frame, [190, 220], [0, 1], {
    extrapolateRight: "clamp",
  });
  const inventoryWorried = interpolate(frame, [190, 220], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Reconnection with satisfying snap
  const reconnectProgress = springForFrame(frame, 260, 310, 0.25, 0.7);
  const reconnectSnap = elasticOutForFrame(frame, 290, 340, 1.4, 0.3);

  // Success celebration
  const successPulse = interpolate(frame, [310, 350], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ordersHappy = interpolate(frame, [300, 330], [0, 1], {
    extrapolateRight: "clamp",
  });
  const inventoryHappy = interpolate(frame, [300, 330], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Comparison text appearance
  const compareOpacity = springForFrame(frame, 320, 360, 0.3, 0.7);

  // Spring animation for cable
  const springCoils = 6;
  const springAmplitude = 15 + cableSnap * 10;
  const cableY = (t: number) => {
    return Math.sin(t * springCoils * Math.PI * 2) * springAmplitude * (1 - reconnectProgress);
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background grid for technical feel */}
        <g opacity={0.1}>
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={i * 100}
              y1={0}
              x2={i * 100}
              y2={1080}
              stroke={colors.text}
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 100}
              x2={1920}
              y2={i * 100}
              stroke={colors.text}
              strokeWidth={1}
            />
          ))}
        </g>

        {/* Title */}
        <g
          transform={`translate(960, 120) scale(${0.8 + titleScale * 0.2})`}
          style={{ transformOrigin: "960px 120px" }}
          opacity={titleOpacity}
        >
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fill={colors.text}
            fontSize={56}
            fontWeight="bold"
          >
            Loose Coupling
          </text>
          <text
            x={0}
            y={50}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={26}
          >
            Services can change without breaking others
          </text>
        </g>

        {/* Orders Service */}
        <g
          transform={`translate(600, 540) scale(${ordersScale})`}
          style={{ transformOrigin: "600px 540px" }}
        >
          {/* Shadow */}
          <ellipse
            cx={0}
            cy={60}
            rx={70}
            ry={15}
            fill="black"
            opacity={0.2}
          />

          <KurzgesagtCube
            x={-60}
            y={-60}
            size={120}
            color={colors.orders}
            emotion={ordersHappy > 0.5 ? "happy" : ordersWorried > 0.5 ? "worried" : "neutral"}
            pulseConfig={{
              min: 0.97,
              max: 1.03,
              speed: 0.02,
              phase: 0,
            }}
          />

          <text
            x={0}
            y={85}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={20}
            fontWeight="bold"
          >
            Orders
          </text>

          {/* Plug/socket connector */}
          <g transform="translate(70, 0)">
            {/* Socket base */}
            <rect
              x={-10}
              y={-25}
              width={25}
              height={50}
              rx={6}
              fill={colors.monolith}
              stroke={colors.orders}
              strokeWidth={2}
            />
            {/* Socket holes */}
            <circle cx={5} cy={-10} r={8} fill={colors.background} />
            <circle cx={5} cy={10} r={8} fill={colors.background} />
          </g>
        </g>

        {/* Inventory Service */}
        <g
          transform={`translate(1320, 540) scale(${inventoryScale})`}
          style={{ transformOrigin: "1320px 540px" }}
        >
          {/* Shadow */}
          <ellipse
            cx={0}
            cy={60}
            rx={70}
            ry={15}
            fill="black"
            opacity={0.2}
          />

          <KurzgesagtCube
            x={-60}
            y={-60}
            size={120}
            color={colors.inventory}
            emotion={inventoryHappy > 0.5 ? "happy" : inventoryWorried > 0.5 ? "worried" : "neutral"}
            pulseConfig={{
              min: 0.97,
              max: 1.03,
              speed: 0.02,
              phase: 1,
            }}
          />

          <text
            x={0}
            y={85}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={20}
            fontWeight="bold"
          >
            Inventory
          </text>

          {/* Plug/socket connector */}
          <g transform="translate(-70, 0)">
            {/* Socket base */}
            <rect
              x={-15}
              y={-25}
              width={25}
              height={50}
              rx={6}
              fill={colors.monolith}
              stroke={colors.inventory}
              strokeWidth={2}
            />
            {/* Socket holes */}
            <circle cx={-5} cy={-10} r={8} fill={colors.background} />
            <circle cx={-5} cy={10} r={8} fill={colors.background} />
          </g>
        </g>

        {/* Connection cable with plug */}
        {initialConnect > 0 && (
          <g>
            {/* The cable - either connected or stretched */}
            {disconnectProgress < 0.9 ? (
              // Connected state with spring effect
              <>
                {/* Main cable line */}
                <path
                  d={`
                    M 695 540
                    Q 960 ${540 + cableY(0.5)} 1225 540
                  `}
                  stroke={colors.network}
                  strokeWidth={12}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.6}
                />

                {/* Cable highlight */}
                <path
                  d={`
                    M 695 535
                    Q 960 ${535 + cableY(0.5)} 1225 535
                  `}
                  stroke={colors.network}
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.8}
                />

                {/* Data flowing on cable */}
                {initialConnect >= 1 && disconnectProgress < 0.1 && (
                  <>
                    <circle
                      cx={695 + ((frame % 40) / 40) * 530}
                      cy={540 + Math.sin(((frame % 40) / 40) * Math.PI * 2) * 5}
                      r={8}
                      fill={colors.accent}
                      opacity={0.9}
                    />
                    <circle
                      cx={695 + (((frame + 15) % 40) / 40) * 530}
                      cy={540 + Math.sin((((frame + 15) % 40) / 40) * Math.PI * 2) * 5}
                      r={6}
                      fill={colors.network}
                      opacity={0.7}
                    />
                  </>
                )}
              </>
            ) : (
              // Disconnected state - cable retracted
              <g>
                {/* Left side cable */}
                <path
                  d="M 695 540 Q 800 540 850 540"
                  stroke={colors.network}
                  strokeWidth={12}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.6}
                />

                {/* Right side cable */}
                <path
                  d="M 1225 540 Q 1120 540 1070 540"
                  stroke={colors.network}
                  strokeWidth={12}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.6}
                />
              </g>
            )}

            {/* The plug that connects the two */}
            <g
              transform={`translate(960 + plugPullX + plugWiggle, 540)`}
            >
              {/* Plug body */}
              <rect
                x={-40}
                y={-20}
                width={80}
                height={40}
                rx={10}
                fill={colors.network}
                stroke={colors.accent}
                strokeWidth={3}
              />

              {/* Plug pins */}
              <rect x={-45} y={-12} width={10} height={8} rx={2} fill={colors.accent} />
              <rect x={-45} y={4} width={10} height={8} rx={2} fill={colors.accent} />
              <rect x={35} y={-12} width={10} height={8} rx={2} fill={colors.accent} />
              <rect x={35} y={4} width={10} height={8} rx={2} fill={colors.accent} />

              {/* Plug indicator light */}
              <circle
                cx={0}
                cy={0}
                r={10}
                fill={disconnectProgress > 0.9 ? colors.danger : colors.orders}
                opacity={0.9}
              >
                {disconnectProgress < 0.9 && (
                  <animate
                    attributeName="opacity"
                    values="0.9;0.5;0.9"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>

              {/* Connection status text */}
              {disconnectProgress > 0.9 && (
                <text
                  x={0}
                  y={-35}
                  textAnchor="middle"
                  fill={colors.textSecondary}
                  fontSize={14}
                >
                  Disconnected
                </text>
              )}
            </g>

            {/* Reconnection effect */}
            {reconnectProgress > 0 && (
              <g>
                {/* Connection beam */}
                <line
                  x1={850}
                  y1={540}
                  x2={850 + (370 * reconnectSnap)}
                  y2={540}
                  stroke={colors.orders}
                  strokeWidth={20}
                  opacity={0.3}
                />

                {/* Sparks at connection point */}
                {reconnectProgress > 0.8 && (
                  <>
                    {[0, 1, 2].map((i) => {
                      const angle = (i / 3) * Math.PI * 2 + (frame / 10) * Math.PI * 2;
                      const dist = 20 + Math.random() * 10;
                      return (
                        <circle
                          key={i}
                          cx={960 + Math.cos(angle) * dist}
                          cy={540 + Math.sin(angle) * dist}
                          r={4}
                          fill={colors.accent}
                          opacity={1 - reconnectProgress * 0.5}
                        />
                      );
                    })}
                  </>
                )}
              </g>
            )}
          </g>
        )}

        {/* Success pulse */}
        {successPulse > 0 && reconnectProgress >= 0.95 && (
          <>
            <circle
              cx={600}
              cy={540}
              r={100 + successPulse * 50}
              fill={colors.orders}
              opacity={0.2 * (1 - successPulse)}
            />
            <circle
              cx={1320}
              cy={540}
              r={100 + successPulse * 50}
              fill={colors.inventory}
              opacity={0.2 * (1 - successPulse)}
            />
          </>
        )}

        {/* Comparison text */}
        {compareOpacity > 0 && (
          <g
            transform="translate(960, 850)"
            opacity={compareOpacity}
          >
            {/* Tightly coupled - crossed out */}
            <g transform="translate(-250, 0)">
              <rect
                x={-100}
                y={-20}
                width={200}
                height={40}
                rx={8}
                fill={colors.danger}
                opacity={0.2}
              />
              <text
                x={0}
                y={8}
                textAnchor="middle"
                fill={colors.danger}
                fontSize={20}
                fontWeight="bold"
                textDecoration="line-through"
                opacity={0.7}
              >
                Tightly Coupled
              </text>
              {/* X mark */}
              <g opacity={0.5}>
                <line
                  x1={-80}
                  y1={-30}
                  x2={80}
                  y2={30}
                  stroke={colors.danger}
                  strokeWidth={3}
                />
                <line
                  x1={80}
                  y1={-30}
                  x2={-80}
                  y2={30}
                  stroke={colors.danger}
                  strokeWidth={3}
                />
              </g>
            </g>

            {/* Arrow */}
            <text
              x={0}
              y={8}
              textAnchor="middle"
              fill={colors.accent}
              fontSize={30}
              fontWeight="bold"
            >
              {"->"}
            </text>

            {/* Loosely coupled - checkmark */}
            <g transform="translate(250, 0)">
              <rect
                x={-90}
                y={-20}
                width={180}
                height={40}
                rx={8}
                fill={colors.orders}
                opacity={0.2}
              />
              <text
                x={0}
                y={8}
                textAnchor="middle"
                fill={colors.orders}
                fontSize={20}
                fontWeight="bold"
              >
                Loosely Coupled
              </text>
              {/* Checkmark */}
              <g opacity={0.8}>
                <circle
                  cx={70}
                  cy={0}
                  r={18}
                  fill={colors.orders}
                />
                <path
                  d="M 62 -2 L 68 6 L 78 -8"
                  stroke="white"
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        )}

        {/* Info callout */}
        {frame >= 150 && frame < 260 && (
          <g
            transform="translate(960, 700)"
            opacity={interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" })}
          >
            <rect
              x={-180}
              y={-25}
              width={360}
              height={50}
              rx={12}
              fill={colors.textSecondary}
              opacity={0.15}
            />
            <text
              x={0}
              y={8}
              textAnchor="middle"
              fill={colors.accent}
              fontSize={20}
            >
              Can disconnect without breaking!
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
