import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {ServiceBox} from '../shared/ServiceBox';
import {NetworkLine} from '../shared/NetworkLine';
import {COLORS} from '../../config/colors';
import {SERVICE_COLORS, SERVICE_NAMES} from '../../config/constants';
import {calculateCirclePosition} from '../../utils/position-calculations';
import {scaleIn, floatingOffset} from '../../utils/animation-helpers';

export const Scene3IntroMicroservices: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 750-1350
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Monolith explosion at frame 60-105
  const explosionProgress = interpolate(localFrame, [60, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const explosionScale = interpolate(localFrame, [60, 90], [1, 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Services appear in circular layout
  const serviceRadius = 250;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const serviceIcons: Record<string, 'lock' | 'creditCard' | 'bell' | 'user' | 'database'> = {
    Auth: 'lock',
    Payment: 'creditCard',
    Notification: 'bell',
    User: 'user',
    Database: 'database',
  };
  
  // Connection lines animate between services
  const lineOpacity = interpolate(localFrame, [150, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Tagline fade in
  const taglineOpacity = interpolate(localFrame, [300, 350], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: COLORS.white,
            textShadow: `0 4px 12px ${COLORS.background}80`,
          }}
        >
          ENTER MICROSERVICES
        </div>
      </div>
      
      {/* Exploding monolith */}
      {localFrame < 120 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${explosionScale})`,
            opacity: 1 - explosionProgress,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              backgroundColor: COLORS.primaryBlue,
              borderRadius: 16,
              border: `4px solid ${COLORS.white}`,
            }}
          />
        </div>
      )}
      
      {/* Explosion particles */}
      {explosionProgress > 0 && explosionProgress < 1 && (
        <>
          {Array.from({length: 12}).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = explosionProgress * 300;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            const size = 10 + explosionProgress * 20;
            
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  backgroundColor: SERVICE_COLORS[SERVICE_NAMES[i % SERVICE_NAMES.length] as keyof typeof SERVICE_COLORS],
                  opacity: 1 - explosionProgress,
                }}
              />
            );
          })}
        </>
      )}
      
      {/* Service boxes in circular layout */}
      {localFrame >= 90 && (
        <>
          {SERVICE_NAMES.map((name, index) => {
            const delay = index * 15; // Stagger the appearance
            const pos = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            const floatY = floatingOffset(localFrame - 90 - delay, index * 60);
            
            return (
              <ServiceBox
                key={name}
                name={name}
                color={SERVICE_COLORS[name as keyof typeof SERVICE_COLORS]}
                iconType={serviceIcons[name]}
                status="healthy"
                x={pos.x}
                y={pos.y}
                floatingOffset={floatY}
                delay={delay}
                scale={0.9}
              />
            );
          })}
        </>
      )}
      
      {/* API connection lines */}
      {localFrame >= 150 && (
        <>
          {/* Create connections between adjacent services */}
          {SERVICE_NAMES.map((name, index) => {
            const pos1 = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            const nextIndex = (index + 1) % SERVICE_NAMES.length;
            const pos2 = calculateCirclePosition(nextIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            
            return (
              <NetworkLine
                key={`${index}-${nextIndex}`}
                fromX={pos1.x}
                fromY={pos1.y}
                toX={pos2.x}
                toY={pos2.y}
                active={true}
                color={COLORS.primaryBlue}
                delay={index * 10}
                showPackets={true}
              />
            );
          })}
          
          {/* Cross connections for complexity */}
          {SERVICE_NAMES.filter((_, i) => i % 2 === 0).map((name, index) => {
            const actualIndex = SERVICE_NAMES.indexOf(name);
            const pos1 = calculateCirclePosition(actualIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            const oppositeIndex = (actualIndex + 2) % SERVICE_NAMES.length;
            const pos2 = calculateCirclePosition(oppositeIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            
            return (
              <NetworkLine
                key={`cross-${actualIndex}`}
                fromX={pos1.x}
                fromY={pos1.y}
                toX={pos2.x}
                toY={pos2.y}
                active={true}
                color={COLORS.primaryBlue}
                delay={actualIndex * 10 + 30}
                showPackets={true}
              />
            );
          })}
        </>
      )}
      
      {/* Tagline */}
      {localFrame >= 300 && (
        <div
          style={{
            position: 'absolute',
            bottom: 150,
            width: '100%',
            textAlign: 'center',
            opacity: taglineOpacity,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: COLORS.white,
              textShadow: `0 4px 12px ${COLORS.background}80`,
            }}
          >
            Small. Independent. Scalable.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
