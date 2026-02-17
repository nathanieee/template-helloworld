import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {ServiceBox} from '../shared/ServiceBox';
import {NetworkLine} from '../shared/NetworkLine';
import {COLORS} from '../../config/colors';
import {SERVICE_COLORS, SERVICE_NAMES} from '../../config/constants';
import {calculateCirclePosition} from '../../utils/position-calculations';
import {floatingOffset} from '../../utils/animation-helpers';

export const Scene6TechnologyFreedom: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 2550-3000
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Service positions
  const serviceRadius = 220;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const serviceIcons: Record<string, 'lock' | 'creditCard' | 'bell' | 'user' | 'database'> = {
    Auth: 'lock',
    Payment: 'creditCard',
    Notification: 'bell',
    User: 'user',
    Database: 'database',
  };
  
  // Tech stack labels appear at frame 60
  const techStackOpacity = interpolate(localFrame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const techStacks: Record<string, string> = {
    Auth: 'Node.js + Passport',
    Payment: 'Go + gRPC',
    Notification: 'Python + Celery',
    User: 'Java + Spring',
    Database: 'PostgreSQL',
  };
  
  // Connection lines pulse to show API communication
  const pulseIntensity = interpolate(
    localFrame,
    [120, 150],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Data packets flow between services
  const dataFlowProgress = interpolate(localFrame, [150, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Status text
  const statusOpacity = interpolate(localFrame, [180, 210], [0, 1], {
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
            fontSize: 56,
            fontWeight: 'bold',
            color: COLORS.white,
            textShadow: `0 4px 12px ${COLORS.background}80`,
          }}
        >
          TECHNOLOGY FREEDOM
        </div>
        <div
          style={{
            fontSize: 28,
            color: COLORS.white,
            opacity: 0.8,
            marginTop: 12,
          }}
        >
          Use the best tool for each job
        </div>
      </div>
      
      {/* Service boxes */}
      {SERVICE_NAMES.map((name, index) => {
        const pos = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        const floatY = floatingOffset(localFrame, index * 60);
        
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
            delay={0}
            scale={0.85}
          />
        );
      })}
      
      {/* Tech stack labels */}
      {localFrame >= 60 && (
        <>
          {SERVICE_NAMES.map((name, index) => {
            const pos = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius + 100, centerX, centerY);
            
            return (
              <div
                key={`tech-${name}`}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y + 60,
                  transform: 'translate(-50%, -50%)',
                  opacity: techStackOpacity,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: `1px solid ${COLORS.white}40`,
                    color: COLORS.white,
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {techStacks[name]}
                </div>
              </div>
            );
          })}
        </>
      )}
      
      {/* Connection lines with pulse effect */}
      {localFrame >= 120 && (
        <>
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
        </>
      )}
      
      {/* API badges on connections */}
      {localFrame >= 180 && (
        <>
          {SERVICE_NAMES.map((name, index) => {
            const pos1 = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            const nextIndex = (index + 1) % SERVICE_NAMES.length;
            const pos2 = calculateCirclePosition(nextIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            const midX = (pos1.x + pos2.x) / 2;
            const midY = (pos1.y + pos2.y) / 2 - 20;
            
            return (
              <div
                key={`api-${index}`}
                style={{
                  position: 'absolute',
                  left: midX,
                  top: midY,
                  transform: 'translate(-50%, -50%)',
                  opacity: pulseIntensity * (0.6 + Math.sin((localFrame + index * 30) / 15) * 0.4),
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.accentYellow,
                    color: COLORS.background,
                    fontSize: 12,
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: 4,
                  }}
                >
                  API
                </div>
              </div>
            );
          })}
        </>
      )}
      
      {/* Status text */}
      {localFrame >= 180 && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            width: '100%',
            textAlign: 'center',
            opacity: statusOpacity,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: COLORS.white,
              textShadow: `0 2px 8px ${COLORS.background}80`,
            }}
          >
            SERVICES COMMUNICATE VIA STANDARD APIS
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
