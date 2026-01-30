import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { colors } from "../styles/colors";

export const Scene1_UsersArrive: React.FC = () => {
  const frame = useCurrentFrame();

  // User movement with spring easing for bouncy arrival
  const user1Progress = springForFrame(frame, 0, 150, 0.25, 0.7);
  const user2Progress = springForFrame(frame, 30, 180, 0.25, 0.7);
  const user3Progress = springForFrame(frame, 60, 210, 0.25, 0.7);

  const user1X = -100 + user1Progress * 800;
  const user2X = -100 + user2Progress * 800;
  const user3X = -100 + user3Progress * 800;

  // Door opening with elastic easing for dramatic snap effect
  const doorOpen = elasticOutForFrame(frame, 200, 250, 1.2, 0.3);

  // Title fade in
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);

  // Portal glow intensity based on door open
  const portalGlow = doorOpen * 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {/* Main monolith body with rounded corners */}
          <rect 
            x={-150} 
            y={-400} 
            width={300} 
            height={400} 
            fill={colors.monolithDark} 
            stroke={colors.monolithLight} 
            strokeWidth={2}
            rx={12}
          />

          {/* Top decorations - antennas */}
          <rect x={-120} y={-480} width={40} height={80} fill={colors.monolith} rx={4} />
          <rect x={80} y={-480} width={40} height={80} fill={colors.monolith} rx={4} />
          <rect x={-30} y={-520} width={60} height={120} fill={colors.monolith} rx={6} />

          {/* Door frame opening */}
          <rect x={-40} y={-80} width={80} height={80} fill={colors.background} opacity={0.95} rx={4} />
          
          {/* Door with elastic opening animation */}
          <g transform={`rotate(${doorOpen * 70})`} style={{ transformOrigin: "-40px -80px" }}>
            <rect 
              x={-40} 
              y={-80} 
              width={40} 
              height={80} 
              fill={colors.monolith}
              rx={4}
            />
          </g>

          {/* Portal glow effect - intensifies as door opens */}
          {doorOpen > 0 && (
            <>
              <ellipse 
                cx={-20} 
                cy={0} 
                rx={30 + doorOpen * 50} 
                ry={10 + doorOpen * 20} 
                fill={colors.accent} 
                opacity={portalGlow} 
              />
              {/* Additional glow rings for dramatic effect */}
              <ellipse 
                cx={-20} 
                cy={0} 
                rx={20 + doorOpen * 40} 
                ry={8 + doorOpen * 15} 
                fill={colors.users} 
                opacity={portalGlow * 0.5} 
              />
            </>
          )}

          {/* Highlight on monolith for depth */}
          <rect 
            x={-130} 
            y={-390} 
            width={20} 
            height={380} 
            fill={colors.monolithLight} 
            opacity={0.2}
            rx={4}
          />
        </g>

        {/* User 1 - Blue, larger scale */}
        <KurzgesagtStickFigure
          x={user1X}
          y={700}
          scale={1.2}
          color={colors.users}
          facingRight={true}
          walking={user1Progress < 1}
          walkCycle={(frame / 15) % 1}
        />

        {/* User 2 - Green, medium scale */}
        <KurzgesagtStickFigure
          x={user2X}
          y={720}
          scale={1}
          color={colors.orders}
          facingRight={true}
          walking={user2Progress < 1}
          walkCycle={((frame - 30) / 15) % 1}
        />

        {/* User 3 - Purple, smaller scale */}
        <KurzgesagtStickFigure
          x={user3X}
          y={680}
          scale={0.9}
          color={colors.products}
          facingRight={true}
          walking={user3Progress < 1}
          walkCycle={((frame - 60) / 15) % 1}
        />

        {/* Title with spring fade in */}
        <text 
          x={960} 
          y={150} 
          textAnchor="middle" 
          fill={colors.text} 
          fontSize={56} 
          fontWeight="bold" 
          opacity={titleOpacity}
        >
          Users Arrive
        </text>

        {/* Subtle subtitle */}
        <text 
          x={960} 
          y={200} 
          textAnchor="middle" 
          fill={colors.textSecondary} 
          fontSize={24} 
          opacity={titleOpacity * 0.8}
        >
          Requesting access to the system
        </text>
      </svg>
    </AbsoluteFill>
  );
};
