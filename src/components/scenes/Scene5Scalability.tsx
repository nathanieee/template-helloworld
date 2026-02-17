import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {Background} from '../shared/Background';
import {ServiceBox} from '../shared/ServiceBox';
import {NetworkLine} from '../shared/NetworkLine';
import {ApiDot} from '../shared/ApiDot';
import {COLORS} from '../../config/colors';
import {SERVICE_COLORS, SERVICE_NAMES} from '../../config/constants';
import {calculateCirclePosition} from '../../utils/position-calculations';
import {floatingOffset} from '../../utils/animation-helpers';

export const Scene5Scalability: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 1950-2550
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Service positions
  const serviceRadius = 200;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const serviceIcons: Record<string, 'lock' | 'creditCard' | 'bell' | 'user' | 'database'> = {
    Auth: 'lock',
    Payment: 'creditCard',
    Notification: 'bell',
    User: 'user',
    Database: 'database',
  };
  
  // User traffic icons appear at frame 60
  const trafficOpacity = interpolate(localFrame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Payment service clones into 3 instances at frame 150 (global 2100)
  const cloneProgress = spring({
    frame: localFrame - 150,
    fps,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });
  
  const clampedCloneProgress = Math.max(0, Math.min(1, cloneProgress));
  
  // Payment clones positions
  const paymentBaseIndex = SERVICE_NAMES.indexOf('Payment');
  const paymentBasePos = calculateCirclePosition(paymentBaseIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
  
  const clonePositions = [
    paymentBasePos,
    {
      x: paymentBasePos.x + 80 * clampedCloneProgress,
      y: paymentBasePos.y - 60 * clampedCloneProgress,
    },
    {
      x: paymentBasePos.x + 80 * clampedCloneProgress,
      y: paymentBasePos.y + 60 * clampedCloneProgress,
    },
  ];
  
  // Load balancer dots appear at frame 270
  const loadBalancerOpacity = interpolate(localFrame, [270, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Data packets distribute among clones
  const packetDistribution = interpolate(localFrame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Status text fade in
  const statusOpacity = interpolate(localFrame, [120, 150], [0, 1], {
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
          INDEPENDENT SCALING
        </div>
        <div
          style={{
            fontSize: 28,
            color: COLORS.white,
            opacity: 0.8,
            marginTop: 12,
          }}
        >
          Scale only what you need
        </div>
      </div>
      
      {/* User traffic icons */}
      {localFrame >= 60 && (
        <>
          {Array.from({length: 5}).map((_, i) => {
            const angle = (i / 5) * Math.PI - Math.PI / 2;
            const distance = 350 + Math.sin((localFrame + i * 20) / 30) * 20;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                  opacity: trafficOpacity * (0.5 + Math.sin((localFrame + i * 15) / 20) * 0.5),
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: COLORS.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  👤
                </div>
              </div>
            );
          })}
        </>
      )}
      
      {/* Original service boxes (except Payment which gets cloned) */}
      {SERVICE_NAMES.filter(n => n !== 'Payment').map((name, index) => {
        const actualIndex = SERVICE_NAMES.indexOf(name);
        const pos = calculateCirclePosition(actualIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        const floatY = floatingOffset(localFrame, actualIndex * 60);
        
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
            scale={0.8}
          />
        );
      })}
      
      {/* Payment service clones */}
      {localFrame >= 150 && (
        <>
          {clonePositions.map((pos, i) => {
            const floatY = floatingOffset(localFrame, i * 40);
            const scale = 0.8;
            
            return (
              <ServiceBox
                key={`payment-${i}`}
                name={i === 0 ? 'Payment' : `Payment ${i + 1}`}
                color={SERVICE_COLORS.Payment}
                iconType="creditCard"
                status="healthy"
                x={pos.x}
                y={pos.y}
                floatingOffset={floatY}
                delay={0}
                scale={scale}
              />
            );
          })}
        </>
      )}
      
      {/* Connection lines */}
      {SERVICE_NAMES.filter(n => n !== 'Payment').map((name, index) => {
        const pos1 = calculateCirclePosition(SERVICE_NAMES.indexOf(name), SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        const nextIndex = (index + 1) % (SERVICE_NAMES.length - 1);
        const nextName = SERVICE_NAMES.filter(n => n !== 'Payment')[nextIndex];
        const pos2 = calculateCirclePosition(SERVICE_NAMES.indexOf(nextName), SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        
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
      
      {/* Load balancer dots distributing to Payment clones */}
      {localFrame >= 270 && (
        <>
          {Array.from({length: 3}).map((_, i) => {
            const progress = ((localFrame - 270) / 40 + i / 3) % 1;
            const sourceIndex = Math.floor(progress * 3); // Which clone receives the packet
            
            return (
              <ApiDot
                key={`lb-${i}`}
                progress={packetDistribution}
                color={COLORS.accentYellow}
                x={clonePositions[sourceIndex].x}
                y={clonePositions[sourceIndex].y - 80}
                size={10}
              />
            );
          })}
        </>
      )}
      
      {/* Status text */}
      {localFrame >= 120 && (
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
              color: COLORS.accentGreen,
              textShadow: `0 2px 8px ${COLORS.accentGreen}40`,
            }}
          >
            {localFrame < 270 && 'PAYMENT SERVICE UNDER HIGH LOAD'}
            {localFrame >= 270 && 'LOAD BALANCER DISTRIBUTING TRAFFIC'}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
