import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { colors } from "../styles/colors";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt";
import { useWiggle } from "../animation-engine";
import { springForFrame, elasticOut } from "../animation-engine/easing";

/**
 * Scene25_LoadBalancer - Shows load balancer distributing requests
 * Funnel appears, envelopes split smoothly to multiple instances
 */
export const Scene25_LoadBalancer: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 40], [50, 100], {
    extrapolateRight: "clamp",
  });

  // Load balancer funnel entrance
  const lbSpring = springForFrame(frame, 50, 100, 0.3, 0.7);
  const lbScale = elasticOut(lbSpring, 0.6, 0.4);

  // Funnel grows downward
  const funnelGrow = interpolate(frame, [80, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Service instances appear
  const instances = [
    { x: 500, name: "Orders 1", delay: 0 },
    { x: 960, name: "Orders 2", delay: 10 },
    { x: 1420, name: "Orders 3", delay: 20 },
  ];

  // Incoming requests from top
  const incomingRequests = React.useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const cycle = (frame + i * 20) % 150;
      const progress = cycle / 150;
      const y = 50 + progress * 300;
      const scale = elasticOut(Math.min(1, progress * 2), 0.4, 0.3);
      return {
        x: 960 + (i % 2 === 0 ? -15 : 15),
        y,
        scale: Math.max(0.3, scale),
        opacity: progress > 0.1 && progress < 0.9 ? 1 : progress * 2,
      };
    });
  }, [frame]);

  // Requests being distributed
  const distributedRequests = React.useMemo(() => {
    if (frame < 180) return [];

    return Array.from({ length: 12 }, (_, i) => {
      const startFrame = 180 + i * 15;
      const progress = interpolate(
        frame,
        [startFrame, startFrame + 60],
        [0, 1],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      );

      if (progress <= 0) return null;

      // Round-robin distribution
      const targetIndex = i % 3;
      const target = instances[targetIndex];

      // Bezier curve path
      const startX = 960;
      const startY = 520;
      const endX = target.x;
      const endY = 700;
      const controlX = 960;
      const controlY = 620;

      const t = progress;
      const invT = 1 - t;

      // Quadratic bezier
      const x = invT * invT * startX + 2 * invT * t * controlX + t * t * endX;
      const y = invT * invT * startY + 2 * invT * t * controlY + t * t * endY;

      // Add some wobble for fun
      const wobble = Math.sin(progress * Math.PI * 2) * 10;

      return {
        x: x + wobble * (1 - progress),
        y,
        scale: elasticOut(progress, 0.3, 0.4),
        opacity: 1,
        color: colors.orders,
      };
    }).filter(Boolean);
  }, [frame, instances]);

  // Comparison stats animation
  const statsOpacity = interpolate(frame, [300, 340], [0, 1], {
    extrapolateRight: "clamp",
  });
  const statsY = interpolate(frame, [300, 340], [900, 870], {
    extrapolateRight: "clamp",
  });

  // Arrow indicators showing flow
  const arrowOpacity = interpolate(frame, [150, 200], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Load per instance display
  const loadBars = instances.map((_, i) => {
    const progress = interpolate(
      frame,
      [220 + i * 10, 260 + i * 10],
      [0, 1],
      { extrapolateRight: "clamp" }
    );
    return {
      width: progress * 100,
      opacity: progress,
    };
  });

  // Wobble for load balancer
  const lbWiggle = useWiggle({ amount: 3, frequency: 0.1, phase: 0 });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <defs>
          {/* Gradient for funnel */}
          <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity={0.9} />
            <stop offset="100%" stopColor={colors.accentDark} stopOpacity={1} />
          </linearGradient>
          {/* Glow effect */}
          <filter id="lbGlow">
            <feGaussianBlur stdDeviation={4} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Arrow marker */}
          <marker id="arrowhead" markerWidth="10" markerHeight={10} refX="9" refY="3" orient="auto">
            <path d="M 0 0 L 10 3 L 0 6 z" fill={colors.network} />
          </marker>
        </defs>

        {/* Incoming requests from top */}
        {incomingRequests.map((req, i) => (
          <g
            key={i}
            transform={`translate(${req.x}, ${req.y}) scale(${req.scale})`}
            opacity={req.opacity}
          >
            <circle r={12} fill={colors.network} opacity={0.8} />
            <circle r={6} fill="rgba(255,255,255,0.5)" />
          </g>
        ))}

        {/* Load Balancer Funnel */}
        <g
          transform={`translate(${960 + lbWiggle}, 400) scale(${lbScale})`}
        >
          {/* Funnel body */}
          <path
            d={`
              M ${-100 * funnelGrow} -60
              L ${100 * funnelGrow} -60
              L ${35 * funnelGrow} 70
              L ${-35 * funnelGrow} 70
              Z
            `}
            fill="url(#funnelGrad)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={3}
            filter="url(#lbGlow)"
          />

          {/* Funnel shine */}
          <path
            d={`
              M ${-80 * funnelGrow} -50
              L ${-40 * funnelGrow} -50
              L ${-15 * funnelGrow} 60
              L ${-30 * funnelGrow} 60
              Z
            `}
            fill="rgba(255,255,255,0.2)"
          />

          {/* Load balancer icon/text */}
          {funnelGrow > 0.8 && (
            <text
              x={0}
              y={110}
              textAnchor="middle"
              fill={colors.accent}
              fontSize={22}
              fontWeight="bold"
              opacity={lbScale}
            >
              Load Balancer
            </text>
          )}

          {/* Distribution arrows */}
          {arrowOpacity > 0 && (
            <>
              <g opacity={arrowOpacity}>
                <path
                  d="M -20 80 Q -80 120 -120 150"
                  stroke={colors.network}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray="8,4"
                  markerEnd="url(#arrowhead)"
                />
                <path
                  d="M 0 80 L 0 180"
                  stroke={colors.network}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray="8,4"
                  markerEnd="url(#arrowhead)"
                />
                <path
                  d="M 20 80 Q 80 120 120 150"
                  stroke={colors.network}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray="8,4"
                  markerEnd="url(#arrowhead)"
                />
              </g>
            </>
          )}
        </g>

        {/* Service Instances */}
        {instances.map((instance, i) => {
          const instanceSpring = springForFrame(
            frame,
            100 + instance.delay,
            150 + instance.delay,
            0.3,
            0.7
          );
          const instanceScale = elasticOut(instanceSpring, 0.5, 0.35);

          return (
            <g
              key={instance.name}
              transform={`translate(${instance.x}, 700) scale(${instanceScale})`}
            >
              {/* Instance cube */}
              <KurzgesagtCube
                x={-60}
                y={-45}
                size={120}
                color={colors.orders}
                emotion="happy"
              />

              {/* Instance name */}
              <text
                x={0}
                y={75}
                textAnchor="middle"
                fill="white"
                fontSize={18}
                fontWeight="bold"
              >
                {instance.name}
              </text>

              {/* Load indicator bar */}
              {loadBars[i] && loadBars[i].opacity > 0 && (
                <g opacity={loadBars[i].opacity} transform="translate(0, 100)">
                  <rect
                    x={-60}
                    y={0}
                    width={120}
                    height={16}
                    rx={8}
                    fill={colors.monolith}
                  />
                  <rect
                    x={-57}
                    y={3}
                    width={loadBars[i].width}
                    height={10}
                    rx={5}
                    fill={colors.orders}
                  />
                  <text
                    x={0}
                    y={30}
                    textAnchor="middle"
                    fill={colors.textSecondary}
                    fontSize={14}
                  >
                    {Math.floor(loadBars[i].width)}% load
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Distributed requests */}
        {distributedRequests.map((req, i) =>
          req && (
            <g
              key={i}
              transform={`translate(${req.x}, ${req.y}) scale(${req.scale})`}
            >
              <circle r={14} fill={req.color} opacity={req.opacity} />
              <circle r={6} fill="rgba(255,255,255,0.4)" />
            </g>
          )
        )}

        {/* Comparison stats */}
        {statsOpacity > 0 && (
          <g
            transform={`translate(960, ${statsY})`}
            opacity={statsOpacity}
          >
            <rect
              x={-350}
              y={-30}
              width={700}
              height={80}
              rx={15}
              fill={colors.monolith}
              opacity={0.8}
            />
            <text
              x={-150}
              y={0}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={18}
            >
              Before: 1 service @ 2500 req/s
            </text>
            <text
              x={-150}
              y={25}
              textAnchor="middle"
              fill={colors.danger}
              fontSize={16}
            >
              Overloaded! 🚨
            </text>
            <line x1={-20} y1={-20} x2={-20} y2={30} stroke={colors.textTertiary} strokeWidth={2} />
            <text
              x={150}
              y={0}
              textAnchor="middle"
              fill={colors.orders}
              fontSize={18}
            >
              After: 3 services @ ~833 req/s
            </text>
            <text
              x={150}
              y={25}
              textAnchor="middle"
              fill={colors.success}
              fontSize={16}
            >
              Balanced! ✅
            </text>
          </g>
        )}

        {/* Title */}
        <text
          x={960}
          y={titleY}
          textAnchor="middle"
          fill={colors.text}
          fontSize={52}
          fontWeight="bold"
          opacity={titleOpacity}
        >
          Load Balancer
        </text>
        <text
          x={960}
          y={titleY + 50}
          textAnchor="middle"
          fill={colors.accent}
          fontSize={28}
          opacity={titleOpacity}
        >
          Distributing requests evenly across instances
        </text>
      </svg>
    </AbsoluteFill>
  );
};
