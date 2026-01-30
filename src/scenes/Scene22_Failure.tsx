import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { colors } from "../styles/colors";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt";
import { useWiggle, useShake, useSquashStretch } from "../animation-engine";
import { elasticOut } from "../animation-engine/easing";

/**
 * Scene22_Failure - Shows a service failing with dramatic cube animation
 * Cube falls over, turns dark, "Connection Refused" stamp appears
 */
export const Scene22_Failure: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 40], [50, 100], {
    extrapolateRight: "clamp",
  });

  // Orders service (the one sending requests) - stable cube
  const ordersSpring = spring({
    frame: frame - 20,
    fps: 30,
    config: { stiffness: 80, damping: 15 },
  });
  const ordersScale = interpolate(ordersSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Request traveling
  const requestX = interpolate(frame, [60, 140], [650, 1250], {
    extrapolateRight: "clamp",
  });

  // Request bounces back with error
  const bounceBackProgress = interpolate(frame, [140, 220], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bounceX = interpolate(
    bounceBackProgress,
    [0, 1],
    [1250, 650],
    extrapolateRight: "clamp"
  );
  const bounceHeight = elasticOut(bounceBackProgress, 0.8, 0.3);
  const bounceY = 540 - bounceHeight * 150;

  // Inventory service (the one that fails)
  const inventorySpring = spring({
    frame: frame - 30,
    fps: 30,
    config: { stiffness: 60, damping: 12 },
  });
  const inventoryScale = interpolate(inventorySpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Service falls over when request arrives
  const fallProgress = interpolate(frame, [130, 170], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fallRotation = interpolate(fallProgress, [0, 1], [0, 25], {
    extrapolateRight: "clamp",
  });
  const fallY = interpolate(fallProgress, [0, 1], [0, 80], {
    extrapolateRight: "clamp",
  });

  // Service darkens as it fails
  const darkenAmount = interpolate(frame, [140, 180], [0, 1], {
    extrapolateRight: "clamp",
  });
  const serviceColor = `rgb(${Math.floor(237 - darkenAmount * 180)}, ${Math.floor(
    137 - darkenAmount * 100
  )}, ${Math.floor(54 - darkenAmount * 40)})`;

  // Shake when hit by request
  const impactShake = useShake({
    startFrame: 140,
    duration: 30,
    intensity: 12,
    decay: true,
  });

  // Sad face transition
  const sadFaceProgress = interpolate(frame, [150, 190], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tears animation
  const tearOpacity = interpolate(frame, [180, 220], [0, 1], {
    extrapolateRight: "clamp",
  });

  // "Connection Refused" stamp
  const stampScale = interpolate(frame, [180, 220], [2, 1], {
    extrapolateRight: "clamp",
  });
  const stampOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });
  const stampRotation = interpolate(frame, [180, 210], [-15, -12], {
    extrapolateRight: "clamp",
  });

  // Error particles
  const errorParticles = Array.from({ length: 8 }, (_, i) => {
    const startFrame = 150 + i * 5;
    const progress = interpolate(
      frame,
      [startFrame, startFrame + 60],
      [0, 1],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    const angle = (i / 8) * Math.PI * 2;
    const distance = progress * 120;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 50,
      opacity: 1 - progress,
      scale: 1 - progress * 0.5,
    };
  });

  // Request changes to error icon
  const requestErrorProgress = interpolate(frame, [140, 160], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Error box pop-up
  const errorBoxScale = interpolate(frame, [200, 230], [0, 1], {
    extrapolateRight: "clamp",
  });
  const errorBoxY = interpolate(frame, [200, 230], [850, 800], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <defs>
          {/* Gradient for failed service */}
          <linearGradient id="failedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.dangerDark} />
            <stop offset="100%" stopColor="#1a0a0a" />
          </linearGradient>
          {/* Stamp texture */}
          <filter id="stamp">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
            <feDisplacementMap in="SourceGraphic" scale={2} />
          </filter>
        </defs>

        {/* Connection line */}
        <line
          x1={650}
          y1={540}
          x2={1250}
          y2={540}
          stroke={colors.network}
          strokeWidth={3}
          strokeDasharray="10,10"
          opacity={0.3}
        />

        {/* Orders Service - sending the request */}
        <g transform={`translate(650, 540) scale(${ordersScale})`}>
          <KurzgesagtCube
            x={-60}
            y={-50}
            size={100}
            color={colors.orders}
            emotion="happy"
            glow={false}
          />
          <text x={0} y={70} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">
            Orders
          </text>
        </g>

        {/* Inventory Service - the one that fails */}
        <g
          transform={`translate(1250, ${540 + fallY}) rotate(${
            fallRotation + impactShake.rotation
          }) scale(${inventoryScale})`}
        >
          {/* Service cube */}
          <rect
            x={-70}
            y={-60}
            width={140}
            height={120}
            rx={25}
            fill={darkenAmount > 0.5 ? "url(#failedGrad)" : serviceColor}
            stroke={darkenAmount > 0.5 ? colors.dangerDark : "rgba(255,255,255,0.2)"}
            strokeWidth={3}
          />

          {/* Face - transitions from happy to sad */}
          <g>
            {/* Eyes */}
            <circle cx={-22} cy={-15} r={12} fill="white" />
            <circle cx={22} cy={-15} r={12} fill="white" />

            {/* Pupils - look down as service fails */}
            <circle
              cx={-22}
              cy={-15 + sadFaceProgress * 5}
              r={6}
              fill="black"
            />
            <circle
              cx={22}
              cy={-15 + sadFaceProgress * 5}
              r={6}
              fill="black"
            />

            {/* Worried eyebrows */}
            {sadFaceProgress > 0.3 && (
              <>
                <g transform={`translate(-22, -32) rotate(${-15 + sadFaceProgress * -20})`}>
                  <rect x={-10} y={-4} width={20} height={6} rx={3} fill="rgba(0,0,0,0.5)" />
                </g>
                <g transform={`translate(22, -32) rotate(${15 - sadFaceProgress * 20})`}>
                  <rect x={-10} y={-4} width={20} height={6} rx={3} fill="rgba(0,0,0,0.5)" />
                </g>
              </>
            )}

            {/* Mouth - from smile to frown */}
            {sadFaceProgress < 0.5 ? (
              <path
                d={`M ${-20 * (1 - sadFaceProgress * 2)} 15 Q 0 ${
                  20 - sadFaceProgress * 30
                } ${20 * (1 - sadFaceProgress * 2)} 15`}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d={`M ${-20 * sadFaceProgress} 20 Q 0 ${
                  10 - sadFaceProgress * 15
                } ${20 * sadFaceProgress} 20`}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>

          {/* Sweat drops */}
          {sadFaceProgress > 0.5 && (
            <>
              <ellipse
                cx={50}
                cy={-20}
                rx={5}
                ry={8}
                fill={colors.network}
                opacity={sadFaceProgress}
              >
                <animate
                  attributeName="cy"
                  values="-20;-10;-20"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </>
          )}

          {/* Tears */}
          {tearOpacity > 0 && (
            <>
              <ellipse
                cx={-35}
                cy={0}
                rx={4}
                ry={8}
                fill={colors.network}
                opacity={tearOpacity * 0.7}
              >
                <animate
                  attributeName="cy"
                  values="0;30;60"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0.5;0"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse
                cx={35}
                cy={0}
                rx={4}
                ry={8}
                fill={colors.network}
                opacity={tearOpacity * 0.7}
              >
                <animate
                  attributeName="cy"
                  values="0;30;60"
                  dur="0.8s"
                  begin="0.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0.5;0"
                  dur="0.8s"
                  begin="0.2s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </>
          )}

          {/* Service label */}
          <text
            x={0}
            y={45}
            textAnchor="middle"
            fill="white"
            fontSize={18}
            fontWeight="bold"
            opacity={1 - darkenAmount * 0.5}
          >
            Inventory
          </text>
        </g>

        {/* "Connection Refused" stamp */}
        {stampOpacity > 0 && (
          <g
            transform={`translate(1250, 450) rotate(${stampRotation}) scale(${stampScale})`}
            opacity={stampOpacity}
          >
            <rect
              x={-130}
              y={-40}
              width={260}
              height={80}
              rx={8}
              fill={colors.danger}
              opacity={0.9}
            />
            <rect
              x={-130}
              y={-40}
              width={260}
              height={80}
              rx={8}
              fill="url(#stamp)"
              opacity={0.3}
            />
            <text
              x={0}
              y={10}
              textAnchor="middle"
              fill="white"
              fontSize={32}
              fontWeight="bold"
              filter="url(#stamp)"
            >
              CONNECTION REFUSED
            </text>
          </g>
        )}

        {/* Error particles spreading */}
        {errorParticles.map(
          (p, i) =>
            p.opacity > 0 && (
              <g
                key={i}
                transform={`translate(${1250 + p.x}, ${500 + p.y}) scale(${p.scale})`}
                opacity={p.opacity}
              >
                <circle r={8} fill={colors.danger} />
                <text
                  x={0}
                  y={5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={10}
                  fontWeight="bold"
                >
                  !
                </text>
              </g>
            )
        )}

        {/* Request traveling */}
        {frame < 140 && (
          <g transform={`translate(${requestX}, 540)`}>
            <circle r={20} fill={colors.network} opacity={0.8} />
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill="white"
              fontSize={12}
              fontWeight="bold"
            >
              GET
            </text>
          </g>
        )}

        {/* Error bouncing back */}
        {bounceBackProgress > 0 && (
          <g transform={`translate(${bounceX}, ${bounceY})`}>
            <circle r={20} fill={colors.danger} opacity={0.9} />
            {/* X icon */}
            <g
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
              opacity={requestErrorProgress}
            >
              <line x1={-7} y1={-7} x2={7} y2={7} />
              <line x1={7} y1={-7} x2={-7} y2={7} />
            </g>
          </g>
        )}

        {/* Error message box */}
        {errorBoxScale > 0 && (
          <g
            transform={`translate(960, ${errorBoxY}) scale(${errorBoxScale})`}
          >
            <rect
              x={-250}
              y={-50}
              width={500}
              height={100}
              rx={15}
              fill={colors.danger}
              opacity={0.95}
            />
            <text
              x={0}
              y={-5}
              textAnchor="middle"
              fill="white"
              fontSize={28}
              fontWeight="bold"
            >
              Connection Failed!
            </text>
            <text
              x={0}
              y={30}
              textAnchor="middle"
              fill="rgba(255,255,255,0.8)"
              fontSize={18}
            >
              Inventory service is down
            </text>
          </g>
        )}

        {/* Title */}
        <text
          x={960}
          y={titleY}
          textAnchor="middle"
          fill={colors.danger}
          fontSize={52}
          fontWeight="bold"
          opacity={titleOpacity}
        >
          Failure Happens
        </text>
        <text
          x={960}
          y={titleY + 50}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={28}
          opacity={titleOpacity}
        >
          Services fail. What do we do?
        </text>
      </svg>
    </AbsoluteFill>
  );
};
