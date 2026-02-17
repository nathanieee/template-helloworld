import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {ServiceBox} from '../shared/ServiceBox';
import {NetworkLine} from '../shared/NetworkLine';
import {COLORS} from '../../config/colors';
import {SERVICE_COLORS, SERVICE_NAMES} from '../../config/constants';
import {calculateCirclePosition} from '../../utils/position-calculations';
import {floatingOffset} from '../../utils/animation-helpers';

export const Scene7Tradeoffs: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 3000-3300
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Service positions
  const serviceRadius = 180;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const serviceIcons: Record<string, 'lock' | 'creditCard' | 'bell' | 'user' | 'database'> = {
    Auth: 'lock',
    Payment: 'creditCard',
    Notification: 'bell',
    User: 'user',
    Database: 'database',
  };
  
  // Network lines multiply
  const networkOpacity = interpolate(localFrame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Monitoring dashboard fades in at frame 150
  const dashboardOpacity = interpolate(localFrame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Status text
  const statusOpacity = interpolate(localFrame, [60, 90], [0, 1], {
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
          THE TRADE-OFFS
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
            scale={0.75}
          />
        );
      })}
      
      {/* Network lines multiply */}
      {localFrame >= 60 && (
        <>
          {/* Original circle connections */}
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
          
          {/* Cross connections (more complexity) */}
          {localFrame >= 100 && (
            <>
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
          
          {/* Additional complexity lines */}
          {localFrame >= 180 && (
            <>
              {SERVICE_NAMES.filter((_, i) => i === 0 || i === 3).map((name, index) => {
                const actualIndex = SERVICE_NAMES.indexOf(name);
                const pos1 = calculateCirclePosition(actualIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
                const farIndex = (actualIndex + 3) % SERVICE_NAMES.length;
                const pos2 = calculateCirclePosition(farIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
                
                return (
                  <NetworkLine
                    key={`complex-${actualIndex}`}
                    fromX={pos1.x}
                    fromY={pos1.y}
                    toX={pos2.x}
                    toY={pos2.y}
                    active={true}
                    color={COLORS.accentPurple}
                    delay={actualIndex * 15 + 50}
                    showPackets={true}
                  />
                );
              })}
            </>
          )}
        </>
      )}
      
      {/* Monitoring dashboard */}
      {localFrame >= 150 && (
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: dashboardOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(11, 16, 38, 0.9)',
              backdropFilter: 'blur(8px)',
              border: `2px solid ${COLORS.primaryBlue}`,
              borderRadius: 12,
              padding: 20,
              width: 280,
            }}
          >
            <div
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 16,
              }}
            >
              📊 System Monitoring
            </div>
            
            {/* Status indicators */}
            {SERVICE_NAMES.map((name) => {
              const health = 85 + Math.floor(Math.random() * 14);
              return (
                <div
                  key={name}
                  style={{
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: COLORS.white,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    <span>{name}</span>
                    <span>{health}%</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: 6,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${health}%`,
                        height: '100%',
                        backgroundColor: health > 90 ? COLORS.healthy : COLORS.warning,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: `1px solid ${COLORS.white}20`,
                color: COLORS.white,
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              Active connections: {12 + localFrame % 5}
            </div>
          </div>
        </div>
      )}
      
      {/* Status text */}
      {localFrame >= 60 && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            width: '100%',
            textAlign: 'center',
            opacity: statusOpacity,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: COLORS.accentYellow,
              textShadow: `0 2px 8px ${COLORS.accentYellow}40`,
            }}
          >
            More flexibility. More complexity.
          </div>
          <div
            style={{
              fontSize: 24,
              color: COLORS.white,
              opacity: 0.8,
              marginTop: 12,
            }}
          >
            Requires orchestration, monitoring, and DevOps
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
