import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { colors } from "../styles/colors";

export const Scene19_ServiceDiscovery: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleY = springForFrame(frame, 0, 60, 0.25, 0.7);

  // Service Registry appearance
  const registryScale = springForFrame(frame, 40, 100, 0.3, 0.7);
  const registryOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Connection line breaking - snaps with elastic
  const breakProgress = springForFrame(frame, 80, 130, 0.4, 0.6);
  const lineScale = 1 - breakProgress * 0.8;

  // Orders cube confusion animation
  const ordersWorry = interpolate(frame, [100, 130], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Search radar effect
  const searchAngle = interpolate(frame, [130, 240], [0, 360], {
    extrapolateRight: "clamp",
  });
  const searchLength = 120 + Math.sin(((frame - 130) / 8) * Math.PI * 2) * 30;
  const searchOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Registry consultation animation
  const registryPulse = frame >= 150
    ? (Math.sin(((frame - 150) / 12) * Math.PI * 2) + 1) / 2
    : 0;

  // New Inventory service appears
  const inventoryScale = springForFrame(frame, 220, 280, 0.35, 0.65);
  const inventoryBounce = elasticOutForFrame(frame, 280, 320, 1.3, 0.4);

  // Reconnection with elastic snap-back
  const reconnectProgress = springForFrame(frame, 260, 320, 0.25, 0.7);
  const lineSnapBack = elasticOutForFrame(frame, 280, 330, 1.2, 0.35);

  // Success celebration
  const successPulse = interpolate(frame, [320, 360], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ordersHappy = interpolate(frame, [300, 330], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Found text appearance
  const foundOpacity = elasticOutForFrame(frame, 300, 340, 1.2, 0.4);
  const foundScale = elasticOutForFrame(frame, 300, 350, 1.5, 0.3);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Title */}
        <g
          transform={`translate(0, ${120 - titleY * 20})`}
          opacity={titleOpacity}
        >
          <text
            x={960}
            y={120}
            textAnchor="middle"
            fill={colors.text}
            fontSize={52}
            fontWeight="bold"
          >
            Service Discovery
          </text>
          <text
            x={960}
            y={170}
            textAnchor="middle"
            fill={colors.accent}
            fontSize={26}
            opacity={0.9}
          >
            Services find each other dynamically
          </text>
        </g>

        {/* Service Registry */}
        <g
          transform={`translate(960, 220) scale(${0.5 + registryScale * 0.5})`}
          style={{ transformOrigin: "960px 220px" }}
          opacity={registryOpacity}
        >
          {/* Registry box */}
          <rect
            x={-110}
            y={-50}
            width={220}
            height={100}
            rx={16}
            fill={colors.monolith}
            stroke={colors.accent}
            strokeWidth={3}
          />

          {/* Glow effect when active */}
          {registryPulse > 0 && (
            <ellipse
              cx={0}
              cy={0}
              rx={130 + registryPulse * 20}
              ry={70 + registryPulse * 10}
              fill={colors.accent}
              opacity={registryPulse * 0.2}
            />
          )}

          {/* Registry icon - database/list */}
          <g transform="translate(-80, -15)">
            <rect x={0} y={0} width={40} height={8} rx={4} fill={colors.accent} opacity={0.8} />
            <rect x={0} y={14} width={40} height={8} rx={4} fill={colors.accent} opacity={0.6} />
            <rect x={0} y={28} width={40} height={8} rx={4} fill={colors.accent} opacity={0.4} />
          </g>

          {/* Registry text */}
          <text
            x={10}
            y={5}
            textAnchor="middle"
            fill={colors.accent}
            fontSize={20}
            fontWeight="bold"
          >
            Service Registry
          </text>
          <text
            x={10}
            y={30}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={13}
          >
            "I know where everyone is!"
          </text>
        </g>

        {/* Orders Service Cube */}
        <g transform="translate(400, 540)">
          <KurzgesagtCube
            x={-55}
            y={-55}
            size={110}
            color={colors.orders}
            emotion={ordersHappy > 0.5 ? "happy" : ordersWorry > 0.5 ? "worried" : "neutral"}
            pulseConfig={{
              min: 0.97,
              max: 1.03,
              speed: 0.025,
              phase: 0,
            }}
          />
          <text
            x={0}
            y={80}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={18}
            fontWeight="bold"
          >
            Orders
          </text>

          {/* Thought bubble when worried */}
          {ordersWorry > 0.5 && frame < 220 && (
            <g
              transform="translate(60, -60)"
              opacity={ordersWorry}
            >
              <ellipse cx={0} cy={0} rx={35} ry={25} fill={colors.textSecondary} opacity={0.2} />
              <circle cx={15} cy={20} r={6} fill={colors.textSecondary} opacity={0.15} />
              <circle cx={25} cy={35} r={4} fill={colors.textSecondary} opacity={0.1} />
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={12}
              >
                Where's
              </text>
              <text
                x={0}
                y={20}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={12}
              >
                Inventory?
              </text>
            </g>
          )}
        </g>

        {/* Old Inventory location - empty */}
        <g transform="translate(1500, 540)" opacity={interpolate(frame, [0, 80], [1, 0.2], { extrapolateRight: "clamp" })}>
          {/* Faded outline showing old location */}
          <rect
            x={-60}
            y={-45}
            width={120}
            height={90}
            rx={12}
            fill="none"
            stroke={colors.inventory}
            strokeWidth={2}
            strokeDasharray="8,4"
            opacity={0.5}
          />
          <text
            x={0}
            y={5}
            textAnchor="middle"
            fill={colors.inventory}
            fontSize={16}
            opacity={0.3}
          >
            (old)
          </text>
        </g>

        {/* Broken connection line */}
        <g
          transform="translate(960, 540)"
          opacity={interpolate(frame, [80, 120], [1, 0.3], { extrapolateRight: "clamp" })}
        >
          <line
            x1={-500}
            y1={0}
            x2={-500 + 500 * lineScale}
            y2={0}
            stroke={colors.network}
            strokeWidth={4}
            strokeDasharray="12,6"
          />
          <line
            x1={500}
            y1={0}
            x2={500 - 500 * lineScale}
            y2={0}
            stroke={colors.network}
            strokeWidth={4}
            strokeDasharray="12,6"
          />
          {/* Question mark in middle */}
          <text
            x={0}
            y={15}
            textAnchor="middle"
            fill={colors.danger}
            fontSize={32}
            fontWeight="bold"
          >
            ?
          </text>
        </g>

        {/* Search radar effect */}
        {frame >= 130 && frame < 260 && (
          <g
            transform="translate(460, 480)"
            opacity={searchOpacity}
          >
            {/* Radar sweep */}
            <line
              x1={0}
              y1={0}
              x2={Math.cos((searchAngle * Math.PI) / 180) * searchLength}
              y2={Math.sin((searchAngle * Math.PI) / 180) * searchLength}
              stroke={colors.accent}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={0.8}
            />

            {/* Radar arcs */}
            <circle
              cx={0}
              cy={0}
              r={80}
              fill="none"
              stroke={colors.accent}
              strokeWidth={1}
              opacity={0.3}
              strokeDasharray="4,4"
            />
            <circle
              cx={0}
              cy={0}
              r={140}
              fill="none"
              stroke={colors.accent}
              strokeWidth={1}
              opacity={0.2}
              strokeDasharray="6,6"
            />

            {/* Searching dot */}
            <circle
              cx={Math.cos((searchAngle * Math.PI) / 180) * searchLength}
              cy={Math.sin((searchAngle * Math.PI) / 180) * searchLength}
              r={10}
              fill={colors.accent}
            >
              <animate
                attributeName="r"
                values="10;14;10"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Connection to registry */}
            {frame >= 150 && (
              <line
                x1={0}
                y1={0}
                x2={500}
                y2={-260}
                stroke={colors.accent}
                strokeWidth={2}
                strokeDasharray="5,5"
                opacity={0.4}
              />
            )}
          </g>
        )}

        {/* New Inventory Service - appears dynamically */}
        {inventoryScale > 0 && (
          <g
            transform={`translate(1500, 540) scale(${0.7 + inventoryBounce * 0.3})`}
            style={{ transformOrigin: "1500px 540px" }}
          >
            <KurzgesagtCube
              x={-55}
              y={-55}
              size={110}
              color={colors.inventory}
              emotion="surprised"
              glow={true}
              pulseConfig={{
                min: 0.98,
                max: 1.02,
                speed: 0.03,
                phase: 2,
              }}
            />
            <text
              x={0}
              y={80}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={18}
              fontWeight="bold"
            >
              Inventory
            </text>

            {/* NEW badge */}
            <g transform="translate(50, -80)">
              <rect
                x={-25}
                y={-12}
                width={50}
                height={24}
                rx={12}
                fill={colors.accent}
              />
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fill="black"
                fontSize={14}
                fontWeight="bold"
              >
                NEW!
              </text>
            </g>
          </g>
        )}

        {/* New connection line - snaps back with elastic */}
        {reconnectProgress > 0 && (
          <g>
            {/* Animated connection line */}
            <line
              x1={460}
              y1={540}
              x2={460 + (1040 * reconnectProgress * lineSnapBack)}
              y2={540}
              stroke={colors.orders}
              strokeWidth={5}
              strokeLinecap="round"
            />

            {/* Success pulse at connection point */}
            {successPulse > 0 && reconnectProgress >= 0.95 && (
              <circle
                cx={960}
                cy={540}
                r={30 + successPulse * 40}
                fill={colors.orders}
                opacity={0.4 * (1 - successPulse)}
              />
            )}

            {/* Data particles flowing on new connection */}
            {reconnectProgress >= 1 && (
              <>
                <circle
                  cx={460 + ((frame % 60) / 60) * 1040}
                  cy={540}
                  r={8}
                  fill={colors.orders}
                  opacity={0.8}
                />
                <circle
                  cx={460 + (((frame + 20) % 60) / 60) * 1040}
                  cy={540}
                  r={6}
                  fill={colors.inventory}
                  opacity={0.6}
                />
              </>
            )}
          </g>
        )}

        {/* Found! text */}
        {foundOpacity > 0 && (
          <g
            transform={`translate(960, 640) scale(${0.5 + foundScale * 0.5})`}
            style={{ transformOrigin: "960px 640px" }}
            opacity={foundOpacity}
          >
            <text
              x={0}
              y={0}
              textAnchor="middle"
              fill={colors.orders}
              fontSize={32}
              fontWeight="bold"
            >
              Found! Connected at 1500:540
            </text>
          </g>
        )}

        {/* Sparkles on success */}
        {frame >= 300 && (
          <>
            {[0, 1, 2].map((i) => {
              const angle = (i / 3) * Math.PI * 2 + (frame / 30) * Math.PI * 2;
              const distance = 80 + Math.sin(frame / 10 + i) * 20;
              const x = 960 + Math.cos(angle) * distance;
              const y = 540 + Math.sin(angle) * distance;
              return (
                <g key={i} transform={`translate(${x}, ${y})`}>
                  <circle
                    r={4 + Math.sin(frame / 5 + i * 2) * 2}
                    fill={colors.accent}
                    opacity={0.8}
                  />
                  <circle
                    r={8}
                    fill={colors.accent}
                    opacity={0.3}
                  />
                </g>
              );
            })}
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
