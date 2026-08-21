import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface FlashCutProps {
  atFrame: number;
  durationInFrames?: number;
}

export const FlashCut: React.FC<FlashCutProps> = ({
  atFrame,
  durationInFrames = 10,
}) => {
  const frame = useCurrentFrame();
  const half = Math.floor(durationInFrames / 2);
  const start = atFrame - half;
  const end = atFrame + half;

  if (frame < start || frame > end) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [start, atFrame, end],
    [0, 0.98, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(
    frame,
    [start, atFrame, end],
    [0.8, 1.2, 1.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* Light Flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ffffff',
          opacity,
          pointerEvents: 'none',
          zIndex: 999,
        }}
      />
      {/* Radial Energy Burst */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, rgba(255,0,85,${opacity * 0.8}) 0%, transparent 70%)`,
          transform: `scale(${scale})`,
          pointerEvents: 'none',
          zIndex: 998,
        }}
      />
    </>
  );
};
