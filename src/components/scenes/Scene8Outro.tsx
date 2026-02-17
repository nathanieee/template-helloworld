import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {ServiceBox} from '../shared/ServiceBox';
import {NetworkLine} from '../shared/NetworkLine';
import {COLORS} from '../../config/colors';
import {SERVICE_COLORS, SERVICE_NAMES} from '../../config/constants';
import {calculateCirclePosition, getCenterOfCanvas} from '../../utils/position-calculations';
import {floatingOffset} from '../../utils/animation-helpers';

export const Scene8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 3300-3600
  
  // Service positions
  const serviceRadius = 200;
  const center = getCenterOfCanvas(width, height);
  
  const serviceIcons: Record<string, 'lock' | 'creditCard' | 'bell' | 'user' | 'database'> = {
    Auth: 'lock',
    Payment: 'creditCard',
    Notification: 'bell',
    User: 'user',
    Database: 'database',
  };
  
  // Gentle zoom out
  const zoomScale = interpolate(localFrame, [0, 300], [1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Slight orbiting camera motion
  const orbitAngle = (localFrame / 300) * Math.PI * 2;
  const orbitX = Math.sin(orbitAngle) * 30;
  const orbitY = Math.cos(orbitAngle) * 20;
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [30, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Subtitle fade in
  const subtitleOpacity = interpolate(localFrame, [90, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Soft glow on all services
  const glowIntensity = 0.3 + Math.sin(localFrame / 30) * 0.2;
  
  // Connection lines with gentle pulse
  const connectionPulse = 0.4 + Math.sin(localFrame / 20) * 0.3;

  return (
    <AbsoluteFill>
      <Background opacity={0.95} />
      
      {/* Container for camera motion */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${orbitX}px), calc(-50% + ${orbitY}px)) scale(${zoomScale})`,
        }}
      >
        {/* Service boxes with glow */}
        {SERVICE_NAMES.map((name, index) => {
          const pos = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, center.x, center.y);
          const floatY = floatingOffset(localFrame, index * 60);
          
          return (
            <React.Fragment key={name}>
              {/* Glow effect */}
              <div
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y + floatY,
                  transform: 'translate(-50%, -50%)',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  backgroundColor: SERVICE_COLORS[name as keyof typeof SERVICE_COLORS],
                  opacity: glowIntensity * 0.3,
                  filter: 'blur(20px)',
                  pointerEvents: 'none',
                }}
              />
              
              <ServiceBox
                name={name}
                color={SERVICE_COLORS[name as keyof typeof SERVICE_COLORS]}
                iconType={serviceIcons[name]}
                status="healthy"
                x={pos.x}
                y={pos.y + floatY}
                floatingOffset={0}
                delay={0}
                scale={0.85}
              />
            </React.Fragment>
          );
        })}
        
        {/* Connection lines */}
        {SERVICE_NAMES.map((name, index) => {
          const pos1 = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, center.x, center.y);
          const nextIndex = (index + 1) % SERVICE_NAMES.length;
          const pos2 = calculateCirclePosition(nextIndex, SERVICE_NAMES.length, serviceRadius, center.x, center.y);
          
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
      </div>
      
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: COLORS.white,
            textShadow: `0 4px 20px ${COLORS.primaryBlue}60`,
            letterSpacing: '2px',
          }}
        >
          MICROSERVICES
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: COLORS.accentGreen,
            textShadow: `0 4px 20px ${COLORS.accentGreen}60`,
            marginTop: 8,
          }}
        >
          IN 2 MINUTES
        </div>
      </div>
      
      {/* Subtitle / call to action */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          width: '100%',
          textAlign: 'center',
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: COLORS.white,
            opacity: 0.9,
            textShadow: `0 2px 8px ${COLORS.background}80`,
          }}
        >
          Independent. Scalable. Resilient.
        </div>
        <div
          style={{
            fontSize: 24,
            color: COLORS.white,
            opacity: 0.6,
            marginTop: 16,
          }}
        >
          But remember: with great power comes great complexity
        </div>
      </div>
      
      {/* Decorative corner elements */}
      {[
        {top: 40, left: 40},
        {top: 40, right: 40},
        {bottom: 40, left: 40},
        {bottom: 40, right: 40},
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: 80,
            height: 80,
            border: `3px solid ${COLORS.primaryBlue}`,
            opacity: 0.3 + Math.sin((localFrame + i * 45) / 30) * 0.2,
            ...(i % 2 === 0 ? {borderLeft: 'none', borderTop: 'none'} : {borderRight: 'none', borderBottom: 'none'}),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
