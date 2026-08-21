import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export type MascotAction = 'kick' | 'laser' | 'pull' | 'zap' | 'headbang';

interface MascotProps {
  action: MascotAction;
  startFrame: number;
  endFrame: number;
}

export const Mascot: React.FC<MascotProps> = ({
  action,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const localFrame = frame - startFrame;

  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 220 },
  });

  const exitDuration = 10;
  const isExiting = frame > endFrame - exitDuration;
  const exitOpacity = isExiting
    ? interpolate(frame, [endFrame - exitDuration, endFrame], [1, 0])
    : 1;

  let transformStyle = '';
  let containerStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 300,
    opacity: exitOpacity,
  };

  switch (action) {
    case 'kick': {
      const translateY = interpolate(spr, [0, 1], [250, 0]);
      const rotate = Math.sin(localFrame * 0.4) * 12 - 8;
      transformStyle = `translateY(${translateY}px) rotate(${rotate}deg) scale(1.1)`;
      containerStyle = {
        ...containerStyle,
        bottom: 100,
        left: 50,
      };
      break;
    }
    case 'laser': {
      const scale = spr;
      const wiggle = Math.sin(localFrame * 0.8) * 6;
      transformStyle = `scale(${scale}) rotate(${wiggle}deg)`;
      containerStyle = {
        ...containerStyle,
        top: 240,
        right: 50,
      };
      break;
    }
    case 'pull': {
      const translateX = interpolate(spr, [0, 1], [-180, 0]);
      const pullTug = Math.sin(localFrame * 0.5) * 20;
      transformStyle = `translateX(${translateX + pullTug}px) rotate(-10deg)`;
      containerStyle = {
        ...containerStyle,
        top: '42%',
        left: 40,
      };
      break;
    }
    case 'zap': {
      const spin = localFrame * 20;
      const shake = Math.sin(localFrame * 1.8) * 14;
      transformStyle = `rotate(${spin}deg) translateY(${shake}px) scale(0.9)`;
      containerStyle = {
        ...containerStyle,
        top: 160,
        right: 50,
      };
      break;
    }
    case 'headbang': {
      const bang = Math.abs(Math.sin(localFrame * 0.7)) * 28;
      const tilt = Math.sin(localFrame * 0.4) * 12;
      transformStyle = `translateY(${-bang}px) rotate(${tilt}deg) scale(1.15)`;
      containerStyle = {
        ...containerStyle,
        bottom: 140,
        right: 50,
      };
      break;
    }
  }

  return (
    <div style={containerStyle}>
      <div
        style={{
          transform: transformStyle,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Glassmorphic Avatar Pod */}
        <div
          style={{
            padding: 8,
            borderRadius: 32,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 0, 85, 0.4)',
          }}
        >
          <Img
            src={staticFile('assets/mascot.jpg')}
            style={{
              width: 160,
              height: 160,
              objectFit: 'cover',
              borderRadius: 24,
            }}
          />
        </div>

        {/* Laser Beam Action */}
        {action === 'laser' && (
          <div
            style={{
              position: 'absolute',
              top: 80,
              right: 150,
              width: 550,
              height: 10,
              background: 'linear-gradient(90deg, #ff0055, #00f0ff, #ffffff)',
              boxShadow: '0 0 20px #ff0055, 0 0 40px #00f0ff',
              borderRadius: 6,
              opacity: Math.sin(localFrame * 0.9) > 0 ? 1 : 0.5,
            }}
          />
        )}

        {/* Headbang Action Tag */}
        {action === 'headbang' && (
          <div
            style={{
              marginTop: 12,
              padding: '8px 18px',
              background: 'linear-gradient(135deg, #ff0055, #ff5500)',
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 900,
              borderRadius: 16,
              boxShadow: '0 8px 24px rgba(255,0,85,0.7)',
              letterSpacing: '0.06em',
            }}
          >
            🔥 WORKFLOW
          </div>
        )}
      </div>
    </div>
  );
};
