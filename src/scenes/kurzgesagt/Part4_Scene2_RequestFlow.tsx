import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { kurzgesagtColors } from "../../styles/colors";
import { KurzgesagtCube } from "../../components/kurzgesagt";

/**
 * Scene 4b+4c: Request Flow (1:07-1:20, 2010-2400 frames)
 * Envelope travels between cubes, processing animation
 */
export const Part4_Scene2_RequestFlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Envelope animation path: User -> Orders -> Inventory -> Orders -> User
  const envelopeProgress = interpolate(frame, [20, 250], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  // Get envelope position based on progress
  const getEnvelopePos = () => {
    if (envelopeProgress < 0.25) {
      // Users to Orders
      const p = envelopeProgress / 0.25;
      return { x: -280 + p * 280, y: -p * 50, stage: "toOrders" };
    } else if (envelopeProgress < 0.5) {
      // Orders to Inventory
      const p = (envelopeProgress - 0.25) / 0.25;
      return { x: p * 280, y: -50 + p * 50, stage: "toInventory" };
    } else if (envelopeProgress < 0.75) {
      // Inventory back to Orders (with response)
      const p = (envelopeProgress - 0.5) / 0.25;
      return { x: 280 - p * 280, y: p * 50, stage: "response" };
    } else {
      // Orders back to Users
      const p = (envelopeProgress - 0.75) / 0.25;
      return { x: -p * 280, y: 50 - p * 50, stage: "complete" };
    }
  };

  const envelopePos = getEnvelopePos();

  // Cube emotions based on stage
  const getEmotion = (index: number) => {
    if (envelopeProgress < 0.1) return index === 0 ? "happy" : "neutral";
    if (envelopeProgress < 0.4) return index === 1 ? "surprised" : "neutral";
    if (envelopeProgress < 0.7) return index === 2 ? "happy" : "neutral";
    return index === 0 ? "happy" : "neutral";
  };

  // Processing indicator
  const processingRotation = interpolate(frame, [80, 180], [0, 360], {
    extrapolateRight: "clamp",
  });

  // Text labels
  const labelOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const positions = [-280, 0, 280];
  const colors = [
    kurzgesagtColors.usersBlue,
    kurzgesagtColors.ordersGreen,
    kurzgesagtColors.inventoryOrange,
  ];

  const labels = ["Users", "Orders", "Inventory"];

  return (
    <AbsoluteFill style={{
      backgroundColor: kurzgesagtColors.deepBlue,
    }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* Connection lines */}
          <line x1={-280} y1={0} x2={0} y2={0} stroke={kurzgesagtColors.networkGlow} strokeWidth={3} opacity={0.4} />
          <line x1={0} y1={0} x2={280} y2={0} stroke={kurzgesagtColors.networkGlow} strokeWidth={3} opacity={0.4} />

          {/* Cubes */}
          {positions.map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`}>
              <KurzgesagtCube
                x={-50}
                y={-50}
                size={100}
                color={colors[i]}
                emotion={getEmotion(i)}
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: i }}
              />

              {/* Processing spinner above Orders */}
              {i === 1 && envelopeProgress > 0.25 && envelopeProgress < 0.75 && (
                <g transform={`translate(0, -70) rotate(${processingRotation})`}>
                  <path d="M 0 -20 L 5 -5 L 0 0 L -5 -5 Z" fill={kurzgesagtColors.goldenYellow} />
                  <path d="M 20 0 L 5 5 L 0 0 L 5 -5 Z" fill={kurzgesagtColors.goldenYellow} opacity={0.7} />
                  <path d="M 0 20 L -5 5 L 0 0 L 5 5 Z" fill={kurzgesagtColors.goldenYellow} opacity={0.4} />
                  <path d="M -20 0 L -5 -5 L 0 0 L -5 5 Z" fill={kurzgesagtColors.goldenYellow} opacity={0.2} />
                </g>
              )}

              {/* Label */}
              <text
                x={0}
                y={90}
                textAnchor="middle"
                fill={colors[i]}
                fontSize={20}
                fontWeight="bold"
                opacity={labelOpacity}
              >
                {labels[i]}
              </text>
            </g>
          ))}

          {/* Envelope */}
          {envelopeProgress > 0 && envelopeProgress < 1 && (
            <g transform={`translate(${envelopePos.x}, ${envelopePos.y})`}>
              {/* Envelope glow */}
              <circle cx={0} cy={0} r={25} fill={kurzgesagtColors.goldenYellow} opacity={0.3} />
              {/* Envelope body */}
              <rect x={-20} y={-12} width={40} height={24} fill={kurzgesagtColors.white} rx={2} />
              {/* Envelope flap */}
              <path d="M -20 -12 L 0 2 L 20 -12" fill={kurzgesagtColors.white} stroke={kurzgesagtColors.darkGrey} strokeWidth={1} />
              {/* Checkmark if response */}
              {envelopePos.stage === "response" || envelopePos.stage === "complete" ? (
                <path d="M -8 0 L -2 6 L 8 -6" stroke={kurzgesagtColors.successGreen} strokeWidth={3} fill="none" />
              ) : (
                <circle cx={0} cy={0} r={4} fill={kurzgesagtColors.orangeRed} />
              )}
            </g>
          )}

          {/* Step labels */}
          <g opacity={labelOpacity}>
            {envelopeProgress < 0.25 && (
              <text x={-140} y={-80} textAnchor="middle" fill={kurzgesagtColors.white} fontSize={16}>
                POST /orders
              </text>
            )}
            {envelopeProgress >= 0.25 && envelopeProgress < 0.5 && (
              <text x={140} y={-80} textAnchor="middle" fill={kurzgesagtColors.white} fontSize={16}>
                Check inventory
              </text>
            )}
            {envelopeProgress >= 0.5 && (
              <text x={0} y={-80} textAnchor="middle" fill={kurzgesagtColors.successGreen} fontSize={16}>
                ✓ Order confirmed
              </text>
            )}
          </g>
        </g>

        {/* Title */}
        <text
          x={960}
          y={100}
          textAnchor="middle"
          fill={kurzgesagtColors.white}
          fontSize={48}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={labelOpacity}
        >
          Service Request Flow
        </text>
      </svg>
    </AbsoluteFill>
  );
};
