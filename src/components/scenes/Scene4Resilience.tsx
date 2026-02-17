import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {ServiceBox} from '../shared/ServiceBox';
import {NetworkLine} from '../shared/NetworkLine';
import {Icon} from '../shared/Icon';
import {COLORS} from '../../config/colors';
import {SERVICE_COLORS, SERVICE_NAMES} from '../../config/constants';
import {calculateCirclePosition} from '../../utils/position-calculations';
import {floatingOffset} from '../../utils/animation-helpers';

export const Scene4Resilience: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 1350-1950
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Service positions
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
  
  // Payment service fails at frame 150 (global 1500)
  const failureProgress = interpolate(localFrame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Warning pulse on failed service
  const warningPulse = localFrame >= 150 ? 0.5 + Math.sin((localFrame - 150) / 5) * 0.5 : 1;
  
  // Robot repair appears at frame 350 (global 1700)
  const robotOpacity = interpolate(localFrame, [350, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const robotY = interpolate(localFrame, [350, 380], [-100, centerY], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Service returns to healthy at frame 450-500 (global 1800-1850)
  const repairProgress = interpolate(localFrame, [450, 500], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Status text fade in
  const statusOpacity = interpolate(localFrame, [200, 250], [0, 1], {
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
          RESILIENCE
        </div>
        <div
          style={{
            fontSize: 28,
            color: COLORS.white,
            opacity: 0.8,
            marginTop: 12,
          }}
        >
          Failures stay contained
        </div>
      </div>
      
      {/* Service boxes */}
      {SERVICE_NAMES.map((name, index) => {
        const pos = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        const floatY = floatingOffset(localFrame, index * 60);
        
        // Payment service fails and recovers
        const isPayment = name === 'Payment';
        let status: 'healthy' | 'warning' | 'error' = 'healthy';
        
        if (isPayment && localFrame >= 150 && localFrame < 450) {
          status = localFrame < 180 ? 'error' : 'warning';
        }
        
        // Apply repair
        const finalStatus = isPayment && repairProgress > 0.5 ? 'healthy' : status;
        
        return (
          <ServiceBox
            key={name}
            name={name}
            color={SERVICE_COLORS[name as keyof typeof SERVICE_COLORS]}
            iconType={serviceIcons[name]}
            status={finalStatus}
            x={pos.x}
            y={pos.y}
            floatingOffset={floatY}
            delay={0}
            scale={0.9}
          />
        );
      })}
      
      {/* Connection lines */}
      {SERVICE_NAMES.map((name, index) => {
        const pos1 = calculateCirclePosition(index, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        const nextIndex = (index + 1) % SERVICE_NAMES.length;
        const pos2 = calculateCirclePosition(nextIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
        
        // Deactivate lines connected to Payment when it fails
        const isPaymentConnection = name === 'Payment' || SERVICE_NAMES[nextIndex] === 'Payment';
        const isActive = !isPaymentConnection || (localFrame < 150 || localFrame >= 450);
        
        return (
          <NetworkLine
            key={`${index}-${nextIndex}`}
            fromX={pos1.x}
            fromY={pos1.y}
            toX={pos2.x}
            toY={pos2.y}
            active={isActive}
            color={isPaymentConnection && !isActive ? COLORS.error : COLORS.primaryBlue}
            delay={index * 10}
            showPackets={isActive}
          />
        );
      })}
      
      {/* Repair robot */}
      {localFrame >= 350 && (
        <div
          style={{
            position: 'absolute',
            left: centerX + 200,
            top: robotY,
            opacity: robotOpacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Icon type="robot" size={80} />
        </div>
      )}
      
      {/* Status text */}
      {localFrame >= 200 && (
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
              fontSize: 36,
              fontWeight: 'bold',
              color: localFrame >= 450 ? COLORS.healthy : COLORS.warning,
              textShadow: `0 2px 8px ${localFrame >= 450 ? COLORS.healthy : COLORS.warning}40`,
            }}
          >
            {localFrame < 350 && 'OTHER SERVICES KEEP RUNNING'}
            {localFrame >= 350 && localFrame < 450 && 'REPAIRING...'}
            {localFrame >= 450 && 'SYSTEM RECOVERED'}
          </div>
        </div>
      )}
      
      {/* Highlight other services during failure */}
      {localFrame >= 150 && localFrame < 450 && (
        <>
          {SERVICE_NAMES.filter(n => n !== 'Payment').map((name, index) => {
            const actualIndex = SERVICE_NAMES.indexOf(name);
            const pos = calculateCirclePosition(actualIndex, SERVICE_NAMES.length, serviceRadius, centerX, centerY);
            
            return (
              <div
                key={name}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    border: `3px solid ${COLORS.healthy}`,
                    opacity: 0.3 + Math.sin((localFrame + actualIndex * 30) / 20) * 0.2,
                  }}
                />
              </div>
            );
          })}
        </>
      )}
    </AbsoluteFill>
  );
};
