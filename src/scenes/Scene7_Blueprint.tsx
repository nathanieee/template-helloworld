import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { DustParticles, SparkParticles, DataParticles } from "../animation-engine/particles";
import { useWiggle, usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

/**
 * Scene7: The Blueprint
 * A blueprint unrolls with the microservices architecture plan
 * Features: Blueprint unroll animation, service diagram reveals, pencil sketching effect,
 * grid lines, elastic service appearances
 */
export const Scene7_Blueprint: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.7);
  const titleScale = elasticOutForFrame(frame, 0, 60, 1.1, 0.35);

  // Blueprint unroll animation
  const unrollStartFrame = 60;
  const unrollEndFrame = 150;
  const unrollProgress = springForFrame(frame, unrollStartFrame, unrollEndFrame, 0.2, 0.65);
  const maxBlueprintHeight = 700;
  const currentBlueprintHeight = maxBlueprintHeight * unrollProgress;

  // Blueprint wobble during unroll - hook always called, value applied conditionally
  const wobbleValue = useWiggle({ amount: 3, frequency: 0.08 });
  const blueprintWobble = frame < unrollEndFrame ? wobbleValue : 0;

  // Blueprint glow pulse
  const blueprintGlow = usePulse({ min: 0.05, max: 0.15, speed: 0.025, phase: 2 });

  // Character watching the blueprint
  const characterEnterProgress = springForFrame(frame, 40, 100, 0.25, 0.7);
  const characterX = 300 + (350 - 300) * characterEnterProgress;
  const characterBreath = usePulse({ min: 0.97, max: 1.03, speed: 0.025 });
  const characterHeadTilt = useWiggle({ amount: 2, frequency: 0.03 });

  // Pencil animation
  const pencilStartFrame = 180;
  const pencilEndFrame = 280;
  const pencilProgress = springForFrame(frame, pencilStartFrame, pencilEndFrame, 0.3, 0.7);
  const pencilX = -250 + pencilProgress * 400;
  const pencilY = 50 + Math.sin(pencilProgress * Math.PI * 3) * 20;
  const pencilRotation = Math.sin(frame * 0.05) * 15;

  // Service diagram reveals with elastic animation
  const serviceRevealFrame = 200;

  const service1Progress = elasticOutForFrame(frame, serviceRevealFrame, serviceRevealFrame + 40, 1.15, 0.35);
  const service2Progress = elasticOutForFrame(frame, serviceRevealFrame + 30, serviceRevealFrame + 70, 1.15, 0.35);
  const service3Progress = elasticOutForFrame(frame, serviceRevealFrame + 60, serviceRevealFrame + 100, 1.15, 0.35);
  const service4Progress = elasticOutForFrame(frame, serviceRevealFrame + 90, serviceRevealFrame + 130, 1.15, 0.35);
  const service5Progress = elasticOutForFrame(frame, serviceRevealFrame + 120, serviceRevealFrame + 160, 1.15, 0.35);

  const service1Opacity = interpolate(frame, [serviceRevealFrame, serviceRevealFrame + 40], [0, 1], { extrapolateRight: "clamp" });
  const service2Opacity = interpolate(frame, [serviceRevealFrame + 30, serviceRevealFrame + 70], [0, 1], { extrapolateRight: "clamp" });
  const service3Opacity = interpolate(frame, [serviceRevealFrame + 60, serviceRevealFrame + 100], [0, 1], { extrapolateRight: "clamp" });
  const service4Opacity = interpolate(frame, [serviceRevealFrame + 90, serviceRevealFrame + 130], [0, 1], { extrapolateRight: "clamp" });
  const service5Opacity = interpolate(frame, [serviceRevealFrame + 120, serviceRevealFrame + 160], [0, 1], { extrapolateRight: "clamp" });

  // Connection lines draw animation
  const lineDrawProgress = springForFrame(frame, serviceRevealFrame + 150, serviceRevealFrame + 200, 0.3, 0.7);

  // Spark effects when services are revealed
  const sparkBursts = [
    serviceRevealFrame + 40,
    serviceRevealFrame + 70,
    serviceRevealFrame + 100,
    serviceRevealFrame + 130,
    serviceRevealFrame + 160,
  ];

  // Blueprint text fade in
  const titleTextOpacity = interpolate(frame, [160, 200], [0, 1], { extrapolateRight: "clamp" });
  const subtitleTextOpacity = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });

  // Subtitle animations
  const subtitle1Opacity = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: "clamp" });
  const subtitle2Opacity = interpolate(frame, [serviceRevealFrame + 180, serviceRevealFrame + 220], [0, 1], { extrapolateRight: "clamp" });

  // Data particles in background
  const dataParticleOpacity = interpolate(frame, [0, 80], [0, 0.2], { extrapolateRight: "clamp" });

  // Services data
  const services = [
    { name: "Orders", color: colors.orders, endpoint: "/api/orders", x: -250, y: -100 },
    { name: "Inventory", color: colors.inventory, endpoint: "/api/inventory", x: 0, y: -180 },
    { name: "Products", color: colors.products, endpoint: "/api/products", x: 250, y: -100 },
    { name: "Payments", color: colors.payments, endpoint: "/api/payments", x: -125, y: 50 },
    { name: "Users", color: colors.users, endpoint: "/api/users", x: 125, y: 50 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust particles */}
      <DustParticles count={25} speed={0.15} opacity={{ min: 0.05, max: 0.2 }} />

      {/* Data particles */}
      <DustParticles count={15} />

      {/* Spark bursts when services appear */}
      {sparkBursts.map((burstFrame, i) => {
        const service = services[i];
        return (
          frame >= burstFrame && frame < burstFrame + 50 && (
            <SparkParticles
              key={i}
              count={10}
              origin={{ x: 960 + service.x, y: 540 + service.y }}
              burstFrame={burstFrame}
              color={service.color}
              speed={1.2}
              lifetime={50}
            />
          )
        );
      })}

      {/* Final celebration sparks */}
      {frame >= serviceRevealFrame + 210 && frame < serviceRevealFrame + 280 && (
        <SparkParticles
          count={20}
          origin={{ x: 960, y: 540 }}
          burstFrame={serviceRevealFrame + 210}
          color={colors.accent}
          speed={1.5}
          lifetime={70}
        />
      )}

      <svg width={1920} height={1080}>
        {/* Title */}
        <g
          transform={`translate(960, 100) scale(${titleScale})`}
          style={{ transformOrigin: "960px 100px" }}
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
            The Blueprint
          </text>
          <text
            x={0}
            y={50}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={28}
            opacity={titleOpacity * 0.8}
          >
            A plan for transformation
          </text>
        </g>

        {/* Subtitle 1 */}
        {subtitle1Opacity > 0 && (
          <text
            x={960}
            y={200}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={24}
            opacity={subtitle1Opacity}
          >
            Let's design our microservices architecture...
          </text>
        )}

        {/* Blueprint */}
        <g
          transform={`translate(960, ${540 + blueprintWobble})`}
          style={{ transformOrigin: "960px 540px" }}
        >
          {/* Blueprint base */}
          <rect
            x={-450}
            y={-currentBlueprintHeight / 2}
            width={900}
            height={currentBlueprintHeight}
            fill="#1a365d"
            opacity={0.95}
            rx={8}
          />

          {/* Blueprint glow */}
          <rect
            x={-450}
            y={-currentBlueprintHeight / 2}
            width={900}
            height={currentBlueprintHeight}
            fill={colors.accent}
            opacity={blueprintGlow}
            rx={8}
          />

          {/* Blueprint border */}
          <rect
            x={-450}
            y={-currentBlueprintHeight / 2}
            width={900}
            height={currentBlueprintHeight}
            fill="none"
            stroke={colors.accent}
            strokeWidth={3}
            opacity={0.3}
            rx={8}
          />

          {/* Grid lines - horizontal */}
          {Array.from({ length: 12 }).map((_, i) => {
            const y = -currentBlueprintHeight / 2 + (i * currentBlueprintHeight) / 12;
            return (
              <line
                key={`h-${i}`}
                x1={-450}
                y1={y}
                x2={450}
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
            );
          })}

          {/* Grid lines - vertical */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = -450 + (i * 900) / 8;
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={-currentBlueprintHeight / 2}
                x2={x}
                y2={currentBlueprintHeight / 2}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
            );
          })}

          {/* Blueprint header */}
          {titleTextOpacity > 0 && (
            <g opacity={titleTextOpacity}>
              <text
                x={0}
                y={-currentBlueprintHeight / 2 + 50}
                textAnchor="middle"
                fill={colors.accent}
                fontSize={28}
                fontWeight="bold"
              >
                MICROSERVICES ARCHITECTURE
              </text>
              <text
                x={0}
                y={-currentBlueprintHeight / 2 + 85}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={16}
              >
                Design v1.0 | System Decomposition Plan
              </text>
              {/* Decorative lines */}
              <line
                x1={-350}
                y1={-currentBlueprintHeight / 2 + 100}
                x2={-200}
                y2={-currentBlueprintHeight / 2 + 100}
                stroke={colors.accent}
                strokeWidth={2}
                opacity={0.5}
              />
              <line
                x1={200}
                y1={-currentBlueprintHeight / 2 + 100}
                x2={350}
                y2={-currentBlueprintHeight / 2 + 100}
                stroke={colors.accent}
                strokeWidth={2}
                opacity={0.5}
              />
            </g>
          )}

          {/* Service boxes */}
          {services.map((service, i) => {
            const progress = [service1Progress, service2Progress, service3Progress, service4Progress, service5Progress][i];
            const opacity = [service1Opacity, service2Opacity, service3Opacity, service4Opacity, service5Opacity][i];

            return (
              <g
                key={service.name}
                transform={`translate(${service.x}, ${service.y}) scale(${progress})`}
                opacity={opacity}
              >
                {/* Service box background */}
                <rect
                  x={-80}
                  y={-55}
                  width={160}
                  height={110}
                  rx={15}
                  fill={`${service.color}15`}
                  stroke={service.color}
                  strokeWidth={3}
                />

                {/* Service icon circle */}
                <circle cx={0} cy={-15} r={25} fill={service.color} opacity={0.3} />
                <circle cx={0} cy={-15} r={18} fill={service.color} opacity={0.5} />

                {/* Service icon lines */}
                <line x1={-8} y1={-15} x2={8} y2={-15} stroke="white" strokeWidth={3} strokeLinecap="round" />
                <line x1={0} y1={-23} x2={0} y2={-7} stroke="white" strokeWidth={3} strokeLinecap="round" />

                {/* Service name */}
                <text
                  x={0}
                  y={25}
                  textAnchor="middle"
                  fill={service.color}
                  fontSize={18}
                  fontWeight="bold"
                >
                  {service.name}
                </text>

                {/* Service endpoint */}
                <text
                  x={0}
                  y={45}
                  textAnchor="middle"
                  fill={colors.textSecondary}
                  fontSize={12}
                >
                  {service.endpoint}
                </text>

                {/* Glow effect */}
                <rect
                  x={-80}
                  y={-55}
                  width={160}
                  height={110}
                  rx={15}
                  fill={service.color}
                  opacity={0.1}
                />
              </g>
            );
          })}

          {/* Connection lines */}
          {lineDrawProgress > 0 && (
            <g opacity={lineDrawProgress}>
              {/* Central hub */}
              <circle cx={0} cy={-30} r={40} fill="none" stroke={colors.accent} strokeWidth={2} strokeDasharray="5,5" opacity={0.5} />

              {/* Lines to services */}
              <line x1={0} y1={-30} x2={-250} y2={-100} stroke={colors.network} strokeWidth={2} strokeDasharray="10,5" opacity={0.4} />
              <line x1={0} y1={-30} x2={0} y2={-180} stroke={colors.network} strokeWidth={2} strokeDasharray="10,5" opacity={0.4} />
              <line x1={0} y1={-30} x2={250} y2={-100} stroke={colors.network} strokeWidth={2} strokeDasharray="10,5" opacity={0.4} />
              <line x1={0} y1={-30} x2={-125} y2={50} stroke={colors.network} strokeWidth={2} strokeDasharray="10,5" opacity={0.4} />
              <line x1={0} y1={-30} x2={125} y2={50} stroke={colors.network} strokeWidth={2} strokeDasharray="10,5" opacity={0.4} />

              {/* API Gateway label */}
              <text x={0} y={-25} textAnchor="middle" fill={colors.accent} fontSize={12} fontWeight="bold">API Gateway</text>
            </g>
          )}

          {/* Pencil */}
          {pencilProgress > 0 && (
            <g
              transform={`translate(${pencilX}, ${pencilY}) rotate(${pencilRotation})`}
              opacity={interpolate(frame, [pencilStartFrame, pencilStartFrame + 20], [0, 1], { extrapolateRight: "clamp" })}
            >
              {/* Pencil body */}
              <rect x={-3} y={-70} width={6} height={70} fill="#F6E05E" rx={1} />
              {/* Pencil ferrule */}
              <rect x={-3} y={0} width={6} height={15} fill="#FFB366" rx={1} />
              {/* Pencil tip */}
              <polygon points="-3,15 3,15 0,28" fill="#2D3748" />
              {/* Pencil point */}
              <polygon points="-1,25 1,25 0,28" fill="#F6E05E" />
              {/* Pencil eraser */}
              <ellipse cx={0} cy={-73} rx={4} ry={6} fill="#F56565" />

              {/* Scratch lines */}
              {Math.floor(pencilProgress * 5) > 0 && (
                <>
                  <line x1={8} y1={0} x2={20} y2={0} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
                  <line x1={8} y1={5} x2={18} y2={5} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                  <line x1={8} y1={-5} x2={15} y2={-5} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                </>
              )}
            </g>
          )}

          {/* Blueprint footer */}
          {subtitleTextOpacity > 0 && (
            <g opacity={subtitleTextOpacity}>
              <text
                x={0}
                y={currentBlueprintHeight / 2 - 30}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={14}
              >
                Each service: Independent | Scalable | Maintainable
              </text>
            </g>
          )}
        </g>

        {/* Character watching the blueprint */}
        <g
          transform={`translate(${characterX}, ${700 + characterHeadTilt}) scale(${characterBreath})`}
        >
          <KurzgesagtStickFigure
            x={0}
            y={0}
            scale={1.6}
            color={colors.users}
            facingRight={true}
          />
        </g>

        {/* Subtitle 2 - Plan complete */}
        {subtitle2Opacity > 0 && (
          <text
            x={960}
            y={920}
            textAnchor="middle"
            fill={colors.success}
            fontSize={26}
            fontWeight="bold"
            opacity={subtitle2Opacity}
          >
            The plan is ready. Time to build! 📐
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};
