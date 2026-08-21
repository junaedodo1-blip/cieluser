import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  registerRoot,
  Easing,
} from 'remotion';
import * as React from 'react';

const DURATION_FRAMES = 850;
const FPS = 30;

// Helper to render floating dollar bill SVG
const DollarBill: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    style={{
      position: 'absolute',
      width: '180px',
      height: '90px',
      opacity: 0.08,
      filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))',
      pointerEvents: 'none',
      zIndex: 3,
      ...style,
    }}
    viewBox="0 0 100 50"
  >
    <rect width="100" height="50" rx="3" fill="#2e7d32" stroke="#1b5e20" stroke-width="1.5" />
    <circle cx="50" cy="25" r="12" fill="none" stroke="#1b5e20" stroke-width="1" />
    <text x="50" y="30" font-family="Space Mono, monospace" font-size="12" fill="#1b5e20" text-anchor="middle" font-weight="bold">$100</text>
  </svg>
);

// Window control buttons for Mock Cards
const WindowControls: React.FC = () => (
  <div style={{ display: 'flex', gap: '8px', marginRight: '20px' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
  </div>
);

// Custom Dotted Annotation pointer tag
const AnnotationTag: React.FC<{ x: number; y: number; label: string; lineD?: string; opacity?: number }> = ({
  x,
  y,
  label,
  lineD,
  opacity = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 25,
      fontFamily: 'monospace',
      opacity,
      pointerEvents: 'none',
    }}
  >
    {lineD && (
      <svg style={{ position: 'absolute', overflow: 'visible', pointerEvents: 'none', left: 0, top: 0 }} width="100" height="100">
        <path d={lineD} stroke="#ec4899" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
      </svg>
    )}
    <span
      style={{
        backgroundColor: 'rgba(236, 72, 153, 0.12)',
        border: '2.5px solid #ec4899',
        color: '#ec4899',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 700,
        boxShadow: '0 5px 15px rgba(236, 72, 153, 0.15)',
      }}
    >
      {label}
    </span>
  </div>
);

export const JunnBuildsSpecimenComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BGM Volume Envelope
  const bgmVolume = interpolate(
    frame,
    [0, 30, DURATION_FRAMES - 60, DURATION_FRAMES],
    [0, 0.34, 0.34, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Background Grid Zoom & Pan
  const bgZoom = interpolate(frame, [0, DURATION_FRAMES], [1.0, 1.1]);
  const bgRotation = interpolate(frame, [0, DURATION_FRAMES], [0, 2]);

  // Background Grid Style
  const gridStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0, 188, 212, 0.07) 1.5px, transparent 1.5px),
      linear-gradient(90deg, rgba(0, 188, 212, 0.07) 1.5px, transparent 1.5px)
    `,
    backgroundSize: '54px 54px',
    pointerEvents: 'none',
    zIndex: 2,
  };

  // Floating bills drift starting at f540
  const bill1Y = interpolate(frame, [540, 850], [700, 150], { extrapolateLeft: 'clamp' });
  const bill2Y = interpolate(frame, [540, 850], [1300, 850], { extrapolateLeft: 'clamp' });

  // Outro Camera zoom out (f600 to f630)
  const globalCameraScale = interpolate(
    frame,
    [600, 630],
    [1.0, 0.93],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Slide 1 (f0 - f120): The Chatbot Card springs
  const card1Progress = spring({ frame, fps, config: { damping: 13, mass: 0.8 } });
  const card1Scale = interpolate(card1Progress, [0, 1], [0.92, 1]);
  const card1Y = interpolate(card1Progress, [0, 1], [100, 0]);
  const card1Tilt = interpolate(card1Progress, [0, 1], [15, 0]);

  const text1Progress = frame >= 60 ? spring({ frame: frame - 60, fps, config: { damping: 15 } }) : 0;
  const text1Y = interpolate(text1Progress, [0, 1], [30, 0]);

  // Slide 2 (f120 - f600): The Agentic Flowchart Card
  const card2Progress = frame >= 120 ? spring({ frame: frame - 120, fps, config: { damping: 13, mass: 0.8 } }) : 0;
  const card2Scale = interpolate(card2Progress, [0, 1], [0.92, 1]);
  const card2Y = interpolate(card2Progress, [0, 1], [100, 0]);
  const card2Tilt = interpolate(card2Progress, [0, 1], [-15, 0]);

  // Flowchart sub-reveals
  const goalProgress = frame >= 180 ? spring({ frame: frame - 180, fps, config: { damping: 15 } }) : 0;
  const line1Draw = interpolate(frame, [240, 280], [160, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Draw = interpolate(frame, [260, 300], [250, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const node1Progress = frame >= 300 ? spring({ frame: frame - 300, fps, config: { damping: 12 } }) : 0;
  const node2Progress = frame >= 310 ? spring({ frame: frame - 310, fps, config: { damping: 12 } }) : 0;
  const node3Progress = frame >= 320 ? spring({ frame: frame - 320, fps, config: { damping: 10, mass: 0.6 } }) : 0;

  // Test Node triggers (f360: pass green, f420: fail red + loop arrow)
  const testNodeState = frame >= 420 ? 'fail' : frame >= 360 ? 'pass' : 'running';
  const correctionLineDraw = interpolate(frame, [420, 460], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Infinity scaling (f480)
  const infinityScale = frame >= 480 ? spring({ frame: frame - 480, fps, config: { damping: 9, mass: 0.5 } }) : 0;
  const infinityRotate = interpolate(infinityScale, [0, 1], [-25, 0]);

  // Slide 4: Outro (f600 to end)
  const outroTitleScale = frame >= 600 ? spring({ frame: frame - 600, fps, config: { damping: 15 } }) : 0;
  const outroTitleY = interpolate(outroTitleScale, [0, 1], [40, 0]);

  const btn1Scale = frame >= 660 ? spring({ frame: frame - 660, fps, config: { damping: 10, mass: 0.6 } }) : 0;
  const btn2Scale = frame >= 720 ? spring({ frame: frame - 720, fps, config: { damping: 10, mass: 0.6 } }) : 0;

  const commentCtaScale = frame >= 780 ? spring({ frame: frame - 780, fps, config: { damping: 15 } }) : 0;
  const commentCtaY = interpolate(commentCtaScale, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '1080px',
          height: '1920px',
          background: 'linear-gradient(135deg, #d3f9f4 0%, #ffffff 60%, #e8fbf8 100%)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${globalCameraScale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Ambient Grid Backdrop */}
        <div
          style={{
            ...gridStyle,
            transform: `scale(${bgZoom}) rotate(${bgRotation}deg)`,
            transformOrigin: 'center center',
          }}
        />

        {/* Top Progress Bar */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            height: '8px',
            backgroundColor: 'rgba(0, 188, 212, 0.1)',
            borderRadius: '4px',
            zIndex: 30,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ff6f61, #f5a623)',
              width: `${(frame / DURATION_FRAMES) * 100}%`,
            }}
          />
        </div>

        {/* Floating Bills */}
        {frame >= 540 && (
          <>
            <DollarBill style={{ top: `${bill1Y}px`, left: '8%', transform: 'rotate(-25deg)' }} />
            <DollarBill style={{ top: `${bill2Y}px`, right: '6%', transform: 'rotate(15deg)' }} />
          </>
        )}

        {/* Watermark Logo */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '26px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            zIndex: 20,
            color: '#1e293b',
            backgroundColor: 'rgba(0, 188, 212, 0.06)',
            padding: '12px 36px',
            borderRadius: '999px',
            border: '1px solid rgba(0, 188, 212, 0.12)',
            fontFamily: 'sans-serif',
          }}
        >
          @junnbuilds
        </div>

        {/* ======================================================== */}
        {/* SLIDE 1: Specimen 1: The Chatbot (f0 to f120) with Video Background */}
        {/* ======================================================== */}
        {frame < 120 && (
          <AbsoluteFill
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '0 80px',
              zIndex: 10,
              perspective: '1200px',
              overflow: 'hidden',
            }}
          >
            {/* Cinematic background video */}
            <Video
              src={require('./Character_typing_on_laptop_1080p_202608080153.mp4')}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1,
              }}
              startFrom={0}
              endAt={120}
              muted
              loop
            />
            {/* Dark glass masking layer */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(11, 15, 25, 0.55)', backdropFilter: 'blur(3px)', zIndex: 2 }} />

            {/* Chatbot Specimen Card */}
            <div
              style={{
                backgroundColor: 'rgba(11, 15, 25, 0.95)',
                border: '2px solid rgba(0, 188, 212, 0.25)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                borderRadius: '28px',
                width: '880px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                transform: `scale(${card1Scale}) translateY(${card1Y}px) rotateX(${card1Tilt}deg)`,
                opacity: card1Progress,
                transformOrigin: 'bottom center',
                position: 'relative',
                zIndex: 5,
              }}
            >
              {/* Browser control header */}
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px', marginBottom: '32px' }}>
                <WindowControls />
                <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>SPECIMEN_01 // CHATBOT</span>
              </div>

              {/* Speech bubble mockup */}
              <div style={{ padding: '24px', backgroundColor: '#161b22', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '16px', color: '#00bcd4', fontFamily: 'monospace', marginBottom: '8px' }}>User Prompt:</div>
                <div style={{ fontSize: '20px', color: '#fff', fontFamily: 'sans-serif' }}>"How to resolve this syntax bug?"</div>
              </div>

              {/* Static response mockup */}
              <div style={{ padding: '24px', backgroundColor: '#1c2128', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '16px', color: '#ff5f56', fontFamily: 'monospace' }}>Model Response:</div>
                <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', fontFamily: 'sans-serif' }}>
                  "Try changing lines 10-12..." (Static Answer)
                </div>
              </div>

              {/* Dotted annotation pointers */}
              {frame >= 40 && (
                <AnnotationTag x={540} y={120} label="STATIC RESPONSE" lineD="M -40 20 L -120 20" />
              )}
            </div>

            {/* Hook header */}
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: text1Progress, transform: `translateY(${text1Y}px)`, zIndex: 5 }}>
              <h1 style={{ fontSize: '84px', color: '#ffffff', fontWeight: 900, marginBottom: '20px', fontFamily: 'sans-serif', textAlign: 'center', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                THE AGENT LOOP.
              </h1>
              <p style={{ textAlign: 'center', fontSize: '32px', color: '#a5b4fc', fontWeight: 600, maxWidth: '16ch', fontFamily: 'sans-serif', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                Stop treating AI like a simple chatbot.
              </p>
            </div>
          </AbsoluteFill>
        )}

        {/* ======================================================== */}
        {/* SLIDE 2 & 3: Specimen 2: The Agentic Loop (f120 to f600) */}
        {/* ======================================================== */}
        {frame >= 120 && frame < 600 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '0 80px',
              zIndex: 10,
              perspective: '1200px',
            }}
          >
            {/* Agent Loop Card */}
            <div
              style={{
                backgroundColor: '#0b0f19',
                border: '2px solid rgba(0, 188, 212, 0.15)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
                borderRadius: '28px',
                width: '880px',
                padding: '40px 48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${card2Scale}) translateY(${card2Y}px) rotateY(${card2Tilt}deg)`,
                opacity: card2Progress,
                transformOrigin: 'center left',
                position: 'relative',
              }}
            >
              {/* Browser control header */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px', marginBottom: '32px' }}>
                <WindowControls />
                <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>SPECIMEN_02 // RECURSIVE_LOOP</span>
              </div>

              {/* Goal Node (f180) */}
              <div
                style={{
                  padding: '16px 36px',
                  backgroundColor: '#161b22',
                  border: '1.5px solid rgba(0, 188, 212, 0.3)',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: goalProgress,
                  transform: `scale(${goalProgress})`,
                  boxShadow: '0 0 20px rgba(0, 188, 212, 0.15)',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00bcd4', boxShadow: '0 0 10px #00bcd4' }} />
                Goal: Resolve Bug
              </div>

              {/* Connector line downwards */}
              <div style={{ width: '4px', height: '40px', backgroundColor: '#00bcd4', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, height: `${line1Draw}px`, width: '100%', backgroundColor: '#0b0f19' }} />
              </div>

              {/* Spawner Node */}
              {frame >= 260 && (
                <div style={{ padding: '16px 32px', backgroundColor: '#1c2128', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '18px', fontFamily: 'monospace' }}>
                  Spawner: Loop Orchestrator
                </div>
              )}

              {/* Connector branches */}
              {frame >= 280 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
                  <div style={{ width: '4px', height: '24px', backgroundColor: '#00bcd4' }} />
                  <div style={{ width: '500px', height: '4px', backgroundColor: '#00bcd4' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '500px' }}>
                    <div style={{ width: '4px', height: '24px', backgroundColor: '#00bcd4' }} />
                    <div style={{ width: '4px', height: '24px', backgroundColor: '#00bcd4' }} />
                    <div style={{ width: '4px', height: '24px', backgroundColor: '#00bcd4' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, height: `${line2Draw}px`, width: '100%', backgroundColor: '#0b0f19' }} />
                </div>
              )}

              {/* Three worker nodes (Staggered f300, f310, f320) */}
              <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%', marginTop: '4px' }}>
                {frame >= 300 && (
                  <div style={{ padding: '14px 20px', backgroundColor: '#161b22', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontFamily: 'monospace', opacity: node1Progress, transform: `scale(${node1Progress})` }}>
                    Agent: Read
                  </div>
                )}
                {frame >= 310 && (
                  <div style={{ padding: '14px 20px', backgroundColor: '#161b22', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontFamily: 'monospace', opacity: node2Progress, transform: `scale(${node2Progress})` }}>
                    Agent: Edit
                  </div>
                )}

                {/* Test Node (transitions states) */}
                {frame >= 320 && (
                  <div
                    style={{
                      padding: '14px 24px',
                      backgroundColor: testNodeState === 'fail' ? '#271215' : testNodeState === 'pass' ? '#12251a' : '#161b22',
                      border: `2px solid ${testNodeState === 'fail' ? '#ff5f56' : testNodeState === 'pass' ? '#4ade80' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '12px',
                      color: testNodeState === 'fail' ? '#ff5f56' : testNodeState === 'pass' ? '#4ade80' : 'rgba(255,255,255,0.4)',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      boxShadow: testNodeState !== 'running' ? `0 0 15px ${testNodeState === 'fail' ? 'rgba(255,95,86,0.2)' : 'rgba(74,222,128,0.2)'}` : 'none',
                      opacity: node3Progress,
                      transform: `scale(${node3Progress})`,
                    }}
                  >
                    Agent: Test {testNodeState === 'fail' ? '[Fail]' : testNodeState === 'pass' ? '[Pass]' : ''}
                  </div>
                )}
              </div>

              {/* Red Self-correction loop path (f420) */}
              {frame >= 420 && (
                <div style={{ position: 'absolute', right: '40px', bottom: '60px', width: '220px', height: '110px', pointerEvents: 'none' }}>
                  <svg width="220" height="110" viewBox="0 0 220 110">
                    <path
                      d="M 50 110 C 120 170, 200 110, 170 30"
                      stroke="#ff5f56"
                      strokeWidth="3"
                      strokeDasharray="200"
                      strokeDashoffset={correctionLineDraw}
                      fill="none"
                    />
                  </svg>
                  {frame >= 430 && (
                    <div style={{ position: 'absolute', right: '42px', top: '24px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56', boxShadow: '0 0 10px #ff5f56' }} />
                  )}
                </div>
              )}

              {/* Infinity node scale (f480) */}
              {frame >= 480 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '210px',
                    zIndex: 25,
                    transform: `scale(${infinityScale}) rotate(${infinityRotate}deg)`,
                    filter: 'drop-shadow(0 15px 30px rgba(0, 188, 212, 0.4))',
                  }}
                >
                  <span style={{ fontSize: '72px', fontWeight: 900, color: '#00bcd4', fontFamily: 'monospace' }}>∞</span>
                </div>
              )}

              {/* Annotation spec labels */}
              {frame >= 340 && (
                <AnnotationTag x={40} y={150} label="RECURSIVE_SPAWN" lineD="M 120 30 L 220 30" />
              )}
            </div>

            {/* Explainer paragraph */}
            {frame >= 480 && (
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: infinityScale }}>
                <p style={{ textAlign: 'center', fontSize: '38px', fontWeight: 900, color: '#1e293b', fontFamily: 'sans-serif' }}>
                  No limit. No warning.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 4: Outro CTA Debate (f600 to end) */}
        {/* ======================================================== */}
        {frame >= 600 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '0 100px',
              zIndex: 10,
            }}
          >
            {/* Outro Title */}
            <h1
              style={{
                fontSize: '52px',
                textAlign: 'center',
                color: '#1e293b',
                fontWeight: 900,
                lineHeight: 1.5,
                marginBottom: '100px',
                maxWidth: '18ch',
                opacity: outroTitleScale,
                transform: `translateY(${outroTitleY}px)`,
                fontFamily: 'sans-serif',
              }}
            >
              Necessary guardrail, or babysitting?
            </h1>

            {/* Voting blocks side-by-side */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '35px', justifyContent: 'center', width: '100%', marginBottom: '100px' }}>
              <div
                style={{
                  padding: '24px 56px',
                  border: '4px solid #ff6f61',
                  color: '#ff6f61',
                  fontWeight: 900,
                  borderRadius: '24px',
                  fontSize: '26px',
                  letterSpacing: '0.05em',
                  transform: `scale(${btn1Scale})`,
                  opacity: btn1Scale,
                  boxShadow: '0 15px 30px rgba(255, 111, 97, 0.12)',
                  fontFamily: 'sans-serif',
                  backgroundColor: '#fff',
                }}
              >
                GUARDRAIL
              </div>

              <div
                style={{
                  padding: '24px 56px',
                  border: '4px solid #9ca3af',
                  color: '#6b7280',
                  fontWeight: 900,
                  borderRadius: '24px',
                  fontSize: '26px',
                  letterSpacing: '0.05em',
                  transform: `scale(${btn2Scale})`,
                  opacity: btn2Scale,
                  fontFamily: 'sans-serif',
                  backgroundColor: '#fff',
                }}
              >
                BABYSITTING
              </div>
            </div>

            {/* Comment footer CTA */}
            <p
              style={{
                textAlign: 'center',
                fontSize: '26px',
                color: '#6b7280',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transform: `translateY(${commentCtaY}px)`,
                opacity: commentCtaScale,
                fontFamily: 'sans-serif',
              }}
            >
              👉 comment one word
            </p>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* Audio Tracks */}
      {/* ======================================================== */}
      <Audio src={require('./audio.mp3')} volume={1.0} />
      <Audio src={require('./video-shotcraft-assets/audio/bgm/bgm-tech-house.mp3')} volume={bgmVolume} />

      {/* Precision Timed SFX Layers from Video Shotcraft */}
      <Sequence from={0}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/transition/transition-soft.mp3')} volume={0.45} />
      </Sequence>
      <Sequence from={60}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/transition/whoosh-big.mp3')} volume={0.35} />
      </Sequence>

      <Sequence from={240}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/transition/swoosh-quick.mp3')} volume={0.40} />
      </Sequence>
      <Sequence from={300}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/counter/clock-tick-single.mp3')} volume={0.25} />
      </Sequence>

      <Sequence from={360}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/transition/whoosh-fast.mp3')} volume={0.40} />
      </Sequence>
      <Sequence from={540}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/impact/impact-deep-whoosh.mp3')} volume={0.50} />
      </Sequence>

      <Sequence from={600}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/riser/riser-cine.mp3')} volume={0.35} />
      </Sequence>
      <Sequence from={660}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/ui/pop.mp3')} volume={0.30} />
      </Sequence>
      <Sequence from={720}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/ui/pop.mp3')} volume={0.30} />
      </Sequence>
      <Sequence from={800}>
        <Audio src={require('./video-shotcraft-assets/audio/sfx/light/sparkle.mp3')} volume={0.40} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const JunnBuildsRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="JunnBuildsSpecimen"
        component={JunnBuildsSpecimenComposition}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(JunnBuildsRoot);
export default JunnBuildsRoot;
