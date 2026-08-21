import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

// Subtitle component with Kinetic Blur + Glass Pill effect
interface BlurSlideProps {
  text: string;
  startFrame: number;
  durationInFrames: number;
}

export const BlurSlideSubtitles: React.FC<BlurSlideProps> = ({
  text,
  startFrame,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const localFrame = frame - startFrame;
  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 220 },
  });

  const translateY = interpolate(spr, [0, 1], [40, 0]);
  const blur = interpolate(spr, [0, 1], [16, 0]);
  const opacity = interpolate(spr, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 200,
        left: '4%',
        width: '92%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 400,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          filter: `blur(${blur}px)`,
          opacity,
          color: '#ffffff',
          fontSize: 44,
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '16px 32px',
          background: 'rgba(10, 12, 18, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 24,
          boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.05)',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </div>
    </div>
  );
};

// High-Tech Code Prompt Badge
export const TypewriterPrompt: React.FC<{
  prompt: string;
  startFrame: number;
}> = ({ prompt, startFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const charsShown = Math.min(
    prompt.length,
    Math.floor((frame - startFrame) * 1.5)
  );
  const visibleText = prompt.slice(0, charsShown);

  return (
    <div
      style={{
        position: 'absolute',
        top: 240,
        left: 50,
        right: 50,
        padding: '20px 28px',
        background: 'rgba(5, 7, 12, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: 20,
        color: '#00f0ff',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: 26,
        boxShadow: '0 16px 50px rgba(0,0,0,0.8), 0 0 20px rgba(0, 240, 255, 0.2)',
        zIndex: 350,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f56', marginRight: 6 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffbd2e', marginRight: 6 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27c93f', marginRight: 12 }} />
        <span style={{ fontSize: 16, color: '#8080a0', fontWeight: 600 }}>AI PROMPT ENGINE</span>
      </div>
      <div>
        <span style={{ color: '#ff0055', fontWeight: 'bold' }}>&gt; </span>
        <span style={{ color: '#ffffff' }}>{visibleText}</span>
        {charsShown < prompt.length && (
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 24,
              backgroundColor: '#00f0ff',
              marginLeft: 4,
              verticalAlign: 'middle',
              boxShadow: '0 0 10px #00f0ff',
            }}
          />
        )}
      </div>
    </div>
  );
};

// Marker Underline Title Effect
export const MarkerUnderline: React.FC<{
  text: string;
  highlightWord: string;
  startFrame: number;
}> = ({ text, highlightWord, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startFrame) return null;

  const localFrame = frame - startFrame;
  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 200 },
  });

  const underlineWidth = interpolate(localFrame, [8, 22], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 160,
        left: '4%',
        width: '92%',
        textAlign: 'center',
        zIndex: 450,
      }}
    >
      <h1
        style={{
          transform: `scale(${spr})`,
          fontSize: 66,
          fontWeight: 900,
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          textShadow: '0 10px 30px rgba(0,0,0,0.9)',
          margin: 0,
        }}
      >
        {text.split(highlightWord)[0]}
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ color: '#ff0055', textShadow: '0 0 20px rgba(255,0,85,0.6)' }}>{highlightWord}</span>
          <span
            style={{
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: `${underlineWidth}%`,
              height: 12,
              background: 'linear-gradient(90deg, #ff0055, #ff5500)',
              borderRadius: 6,
              boxShadow: '0 0 16px #ff0055',
            }}
          />
        </span>
        {text.split(highlightWord)[1]}
      </h1>
    </div>
  );
};

// Line Boil CTA component with Glowing Edge Jitter Effect
export const LineBoilCTA: React.FC<{
  text: string;
  keyword: string;
  startFrame: number;
}> = ({ text, keyword, startFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const seed = Math.floor(frame / 3);
  const jitterX = (Math.sin(seed * 7) * 3).toFixed(1);
  const jitterY = (Math.cos(seed * 11) * 3).toFixed(1);
  const jitterRotate = (Math.sin(seed * 13) * 2).toFixed(1);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 280,
        left: '5%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 500,
      }}
    >
      <div
        style={{
          transform: `translate(${jitterX}px, ${jitterY}px) rotate(${jitterRotate}deg)`,
          padding: '22px 42px',
          background: 'linear-gradient(135deg, #ff0055, #ff2a00)',
          borderRadius: 28,
          boxShadow: '0 16px 60px rgba(255, 0, 85, 0.8), 0 0 30px rgba(255, 0, 85, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
