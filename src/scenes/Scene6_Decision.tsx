import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { DustParticles, SparkParticles, DataParticles } from "../animation-engine/particles";
import { useWiggle, usePulse, useShake } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

/**
 * Scene6: The Decision
 * A developer has an epiphany moment - the lightbulb idea!
 * Features: Thought bubble animation, lightbulb with glow, spark particles,
 * multiple option cards appearing with elastic animation
 */
export const Scene6_Decision: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.7);
  const titleScale = elasticOutForFrame(frame, 0, 60, 1.1, 0.35);

  // Character enters scene
  const characterEnterProgress = springForFrame(frame, 30, 90, 0.25, 0.7);
  const characterX = 400 + (560 - 400) * characterEnterProgress;
  const characterY = 600;

  // Character breathing animation
  const characterBreath = usePulse({ min: 0.98, max: 1.02, speed: 0.03 });
  const characterWiggle = useWiggle({ amount: 2, frequency: 0.04 });

  // Thought bubble appears
  const thoughtBubbleProgress = springForFrame(frame, 80, 140, 0.25, 0.65);
  const thoughtBubbleScale = thoughtBubbleProgress;
  const thoughtBubbleOpacity = thoughtBubbleProgress;

  // Thought bubbles (small to large)
  const smallBubble1Scale = springForFrame(frame, 100, 130, 0.3, 0.7);
  const smallBubble2Scale = springForFrame(frame, 110, 140, 0.3, 0.7);
  const smallBubble3Scale = springForFrame(frame, 120, 150, 0.3, 0.7);

  // Lightbulb appears with dramatic effect
  const lightbulbProgress = springForFrame(frame, 140, 190, 0.25, 0.7);
  const lightbulbScale = elasticOutForFrame(frame, 150, 200, 1.4, 0.35);
  const lightbulbY = -150 - lightbulbProgress * 100;

  // Lightbulb glow pulse
  const bulbGlowPulse = usePulse({ min: 0.3, max: 0.7, speed: 0.06, phase: 1 });
  const bulbGlowSize = 60 + bulbGlowPulse * 50;
  const bulbGlowIntensity = 0.3 + bulbGlowPulse * 0.4;

  // Spark particles when lightbulb appears
  const sparkBurstFrame = 180;
  const sparkCount = 20;

  // Question mark appears before lightbulb
  const questionMarkProgress = springForFrame(frame, 130, 170, 0.3, 0.7);
  const questionMarkScale = questionMarkProgress;
  const questionMarkRotation = useWiggle({ amount: 5, frequency: 0.05 });
  const questionMarkFadeOut = springForFrame(frame, 175, 200, 0.25, 0.7);

  // Option cards appear
  const option1Progress = elasticOutForFrame(frame, 220, 260, 1.15, 0.35);
  const option2Progress = elasticOutForFrame(frame, 240, 280, 1.15, 0.35);
  const option3Progress = elasticOutForFrame(frame, 260, 300, 1.15, 0.35);

  const option1Opacity = interpolate(frame, [220, 260], [0, 1], { extrapolateRight: "clamp" });
  const option2Opacity = interpolate(frame, [240, 280], [0, 1], { extrapolateRight: "clamp" });
  const option3Opacity = interpolate(frame, [260, 300], [0, 1], { extrapolateRight: "clamp" });

  // Selected option highlight (eventually selects option 3 - split to services)
  const selectionFrame = 320;
  const selectionProgress = springForFrame(frame, selectionFrame, selectionFrame + 40, 0.3, 0.7);
  const option3Highlight = selectionProgress;

  // Celebration sparks when decision is made
  const decisionSparks = frame >= selectionFrame;

  // Character reaction to decision
  const characterHappyFrame = selectionFrame + 20;
  const characterJumpProgress = springForFrame(frame, characterHappyFrame, characterHappyFrame + 30, 0.3, 0.7);
  const characterJumpY = -characterJumpProgress * 30;
  // Hook always called, value applied conditionally
  const armWaveValue = useWiggle({ amount: 15, frequency: 0.1 });
  const characterArmWave = frame >= characterHappyFrame ? armWaveValue : 0;

  // Subtitle animations
  const subtitle1Opacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const subtitle2Opacity = interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" });
  const subtitle3Opacity = interpolate(frame, [selectionFrame + 30, selectionFrame + 70], [0, 1], { extrapolateRight: "clamp" });

  // Data particles floating in background (representing ideas)
  const dataParticleOpacity = interpolate(frame, [0, 80], [0, 0.3], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust particles */}
      <DustParticles count={30} speed={0.2} />

      {/* Data particles in background (ideas floating) */}
      <DustParticles count={20} />

      {/* Spark burst when lightbulb appears */}
      {frame >= sparkBurstFrame && frame < sparkBurstFrame + 60 && (
        <SparkParticles
          count={sparkCount}
          origin={{ x: 1120, y: 350 }}
          burstFrame={sparkBurstFrame}
          color={colors.accent}
          speed={1.5}
          lifetime={60}
        />
      )}

      {/* Secondary spark burst */}
      {frame >= sparkBurstFrame + 10 && frame < sparkBurstFrame + 70 && (
        <SparkParticles
          count={12}
          origin={{ x: 1120, y: 350 }}
          burstFrame={sparkBurstFrame + 10}
          color={colors.orders}
          speed={1.2}
          lifetime={50}
        />
      )}

      {/* Celebration sparks when decision is made */}
      {decisionSparks && frame < selectionFrame + 80 && (
        <SparkParticles
          count={25}
          origin={{ x: 1440, y: 750 }}
          burstFrame={selectionFrame}
          color={colors.success}
          speed={1.5}
          lifetime={70}
        />
      )}

      <svg width={1920} height={1080}>
        {/* Title */}
        <g
          transform={`translate(960, 120) scale(${titleScale})`}
          style={{ transformOrigin: "960px 120px" }}
        >
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fill={colors.text}
            fontSize={56}
            fontWeight="bold"
            opacity={titleOpacity}
          >
            The Decision
          </text>
          <text
            x={0}
            y={50}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={28}
            opacity={titleOpacity * 0.8}
          >
            A moment of clarity
          </text>
        </g>

        {/* Subtitle 1 - The problem */}
        {subtitle1Opacity > 0 && (
          <text
            x={960}
            y={220}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={24}
            opacity={subtitle1Opacity}
          >
            "There must be a better way..."
          </text>
        )}

        {/* Main Character - Developer */}
        <g
          transform={`translate(${characterX + characterWiggle}, ${characterY + characterJumpY}) scale(${characterBreath})`}
          style={{ transformOrigin: `${characterX}px ${characterY}px` }}
        >
          <KurzgesagtStickFigure
            x={0}
            y={0}
            scale={1.8}
            color={colors.users}
            facingRight={true}
          />

          {/* Arm waving when happy */}
          {frame >= characterHappyFrame && (
            <g transform={`translate(${characterArmWave}, ${-70})`}>
              <line
                x1={0}
                y1={0}
                x2={characterArmWave * 0.5}
                y2={-30}
                stroke={colors.users}
                strokeWidth={8}
                strokeLinecap="round"
              />
            </g>
          )}
        </g>

        {/* Thought Bubble Assembly */}
        <g
          transform={`translate(1120, ${450 + (1 - thoughtBubbleProgress) * 100}) scale(${thoughtBubbleScale})`}
          opacity={thoughtBubbleOpacity}
        >
          {/* Small thought bubble 1 */}
          <g transform={`translate(30, 80) scale(${smallBubble1Scale})`}>
            <circle cx={0} cy={0} r={12} fill="rgba(255,255,255,0.5)" />
          </g>

          {/* Small thought bubble 2 */}
          <g transform={`translate(60, 50) scale(${smallBubble2Scale})`}>
            <circle cx={0} cy={0} r={18} fill="rgba(255,255,255,0.6)" />
          </g>

          {/* Small thought bubble 3 */}
          <g transform={`translate(100, 20) scale(${smallBubble3Scale})`}>
            <circle cx={0} cy={0} r={25} fill="rgba(255,255,255,0.7)" />
          </g>

          {/* Main thought bubble */}
          <ellipse
            cx={0}
            cy={lightbulbY}
            rx={140}
            ry={120}
            fill="rgba(255,255,255,0.95)"
            stroke={colors.monolithLight}
            strokeWidth={3}
          />

          {/* Question mark (before lightbulb) */}
          <g
            transform={`translate(0, ${lightbulbY}) rotate(${questionMarkRotation}) scale(${questionMarkScale})`}
            opacity={1 - questionMarkFadeOut}
          >
            <text
              x={0}
              y={20}
              textAnchor="middle"
              fill={colors.monolithDark}
              fontSize={80}
              fontWeight="bold"
            >
              ?
            </text>
          </g>

          {/* Lightbulb */}
          <g transform={`translate(0, ${lightbulbY}) scale(${lightbulbScale})`}>
            {/* Glow effect */}
            <circle
              cx={0}
              cy={0}
              r={bulbGlowSize}
              fill={colors.accent}
              opacity={bulbGlowIntensity * 0.3}
            />

            {/* Outer glow ring */}
            <circle
              cx={0}
              cy={0}
              r={bulbGlowSize * 0.7}
              fill={colors.accent}
              opacity={bulbGlowIntensity * 0.5}
            />

            {/* Lightbulb base */}
            <rect
              x={-20}
              y={45}
              width={40}
              height={15}
              rx={4}
              fill={colors.monolithDark}
            />
            <rect
              x={-18}
              y={60}
              width={36}
              height={8}
              rx={2}
              fill={colors.monolithDark}
            />
            <rect
              x={-16}
              y={68}
              width={32}
              height={5}
              rx={2}
              fill={colors.monolithDark}
            />

            {/* Lightbulb glass */}
            <ellipse
              cx={0}
              cy={0}
              rx={45}
              ry={55}
              fill={colors.accent}
              opacity={0.9}
            />

            {/* Lightbulb highlight */}
            <ellipse
              cx={-15}
              cy={-20}
              rx={15}
              ry={25}
              fill="white"
              opacity={0.5}
            />

            {/* Filament */}
            <path
              d="M -10 30 Q 0 0 10 30"
              stroke={colors.monolithDark}
              strokeWidth={3}
              fill="none"
            />

            {/* Light rays */}
            {lightbulbProgress > 0.5 && (
              <>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rayLength = 30 + Math.sin(frame * 0.1 + i) * 10;
                  const rayOpacity = (lightbulbProgress - 0.5) * 2;
                  return (
                    <g
                      key={angle}
                      transform={`rotate(${angle})`}
                      opacity={rayOpacity}
                    >
                      <line
                        x1={50}
                        y1={0}
                        x2={50 + rayLength}
                        y2={0}
                        stroke={colors.accent}
                        strokeWidth={4}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </>
            )}
          </g>
        </g>

        {/* Option Cards */}
        <g transform="translate(960, 750)">
          {/* Option 1: Keep Monolith */}
          <g
            transform={`translate(-400, 0) scale(${option1Progress})`}
            opacity={option1Opacity}
          >
            <rect
              x={-180}
              y={-50}
              width={360}
              height={100}
              rx={15}
              fill={colors.monolith}
              opacity={0.9}
            />
            <rect
              x={-180}
              y={-50}
              width={360}
              height={100}
              rx={15}
              fill="none"
              stroke={colors.monolithLight}
              strokeWidth={2}
              opacity={0.5}
            />
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill={colors.text}
              fontSize={24}
              fontWeight="bold"
            >
              Keep Monolith
            </text>
            <text
              x={0}
              y={30}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={16}
            >
              Status quo...
            </text>
            {/* X mark (not chosen) */}
            {selectionProgress > 0.5 && (
              <g opacity={selectionProgress}>
                <circle cx={140} cy={0} r={20} fill={colors.danger} opacity={0.8} />
                <line
                  x1={133}
                  y1={-7}
                  x2={147}
                  y2={7}
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={147}
                  y1={-7}
                  x2={133}
                  y2={7}
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>

          {/* Option 2: Refactor */}
          <g
            transform={`translate(0, 0) scale(${option2Progress})`}
            opacity={option2Opacity}
          >
            <rect
              x={-180}
              y={-50}
              width={360}
              height={100}
              rx={15}
              fill={colors.products}
              opacity={0.9}
            />
            <rect
              x={-180}
              y={-50}
              width={360}
              height={100}
              rx={15}
              fill="none"
              stroke={colors.productsLight}
              strokeWidth={2}
              opacity={0.5}
            />
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill={colors.text}
              fontSize={24}
              fontWeight="bold"
            >
              Refactor Code
            </text>
            <text
              x={0}
              y={30}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={16}
            >
              Clean but tangled...
            </text>
            {/* X mark (not chosen) */}
            {selectionProgress > 0.5 && (
              <g opacity={selectionProgress}>
                <circle cx={140} cy={0} r={20} fill={colors.danger} opacity={0.8} />
                <line
                  x1={133}
                  y1={-7}
                  x2={147}
                  y2={7}
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={147}
                  y1={-7}
                  x2={133}
                  y2={7}
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>

          {/* Option 3: Split to Services (THE CHOSEN ONE) */}
          <g
            transform={`translate(400, 0) scale(${option3Progress})`}
            opacity={option3Opacity}
          >
            {/* Highlight glow when selected */}
            {option3Highlight > 0 && (
              <rect
                x={-185}
                y={-55}
                width={370}
                height={110}
                rx={18}
                fill={colors.accent}
                opacity={option3Highlight * 0.5}
              />
            )}

            <rect
              x={-180}
              y={-50}
              width={360}
              height={100}
              rx={15}
              fill={colors.orders}
              opacity={0.95}
            />
            <rect
              x={-180}
              y={-50}
              width={360}
              height={100}
              rx={15}
              fill="none"
              stroke={colors.ordersLight}
              strokeWidth={3}
              opacity={option3Highlight + 0.3}
            />

            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill={colors.text}
              fontSize={24}
              fontWeight="bold"
            >
              Split to Services!
            </text>
            <text
              x={0}
              y={30}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={16}
            >
              The future! ✓
            </text>

            {/* Checkmark */}
            {option3Highlight > 0 && (
              <g
                transform={`translate(140, 0) scale(${option3Highlight})`}
                style={{ transformOrigin: "140px 0px" }}
              >
                <circle cx={0} cy={0} r={22} fill={colors.success} />
                <path
                  d="M -8 0 L -2 6 L 8 -6"
                  stroke="white"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            )}

            {/* Mini service icons */}
            {option3Highlight > 0.5 && (
              <g opacity={option3Highlight - 0.5}>
                <circle cx={-100} cy={0} r={8} fill={colors.orders} />
                <circle cx={-80} cy={0} r={8} fill={colors.inventory} />
                <circle cx={-60} cy={0} r={8} fill={colors.products} />
                <circle cx={-40} cy={0} r={8} fill={colors.payments} />
              </g>
            )}
          </g>
        </g>

        {/* Subtitle 2 - The realization */}
        {subtitle2Opacity > 0 && (
          <text
            x={960}
            y={900}
            textAnchor="middle"
            fill={colors.accent}
            fontSize={26}
            fontWeight="bold"
            opacity={subtitle2Opacity}
          >
            Microservices! The answer was right there!
          </text>
        )}

        {/* Subtitle 3 - The decision */}
        {subtitle3Opacity > 0 && (
          <text
            x={960}
            y={950}
            textAnchor="middle"
            fill={colors.success}
            fontSize={24}
            fontWeight="bold"
            opacity={subtitle3Opacity}
          >
            Time to break free! 🚀
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};
