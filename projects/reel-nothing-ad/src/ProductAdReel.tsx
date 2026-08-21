import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FlashCut } from './components/FlashCut';
import { Mascot } from './components/Mascot';
import {
  BlurSlideSubtitles,
  LineBoilCTA,
  MarkerUnderline,
  TypewriterPrompt,
} from './components/Typography';

export const ProductAdReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -------------------------------------------------------------------------
  // TIMINGS (465 frames = 15.5s @ 30fps)
  // -------------------------------------------------------------------------
  // Scene 1: 0 - 75f   -> 3D Glass Card Raw Photo + Kick
  // Scene 2: 75 - 210f  -> Step 1: Laser Slice + Editorial Poster
  // Scene 3: 210 - 330f -> Step 2: Parallax Character Layer Slide
  // Scene 4: 330 - 420f -> Step 3: High-Tech Omni Gauge Render
  // Scene 5: 420 - 465f -> Step 4: 3D Curved Cinema Outro + Line-Boil CTA
  // -------------------------------------------------------------------------

  // 3D Camera Orbit & Rotation
  const cameraOrbitX = Math.sin(frame * 0.04) * 8;
  const cameraOrbitY = Math.cos(frame * 0.03) * 6;

  // Spring animations for Scene 1
  const rawSpr = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 140 },
  });

  const kickImpact = frame >= 55 && frame <= 75 ? Math.sin((frame - 55) * 0.8) * 50 : 0;
  const kickRotation = frame >= 55 && frame <= 75 ? (frame - 55) * 10 : 0;

  // Omni Progress Percentage
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.floor(interpolate(frame, [335, 410], [0, 100])))
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#06070a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* -------------------------------------------------- */}
      {/* DYNAMIC AMBIENT LIGHT BLOOM & GRID BACKDROP         */}
      {/* -------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: -100,
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(255,0,85,0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate(${cameraOrbitX * 3}px, ${cameraOrbitY * 3}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          right: -100,
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate(${-cameraOrbitX * 3}px, ${-cameraOrbitY * 3}px)`,
        }}
      />
      {/* Modern Radial Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          opacity: 0.7,
        }}
      />

      {/* -------------------------------------------------- */}
      {/* SCENE 1: 3D GLASS CARD RAW PHOTO (0 - 75f)          */}
      {/* -------------------------------------------------- */}
      {frame < 75 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Glassmorphic Container Card */}
          <div
            style={{
              transform: `perspective(1200px) rotateX(${
                12 + cameraOrbitY
              }deg) rotateY(${cameraOrbitX}deg) translateY(${kickImpact}px) rotate(${kickRotation}deg) scale(${rawSpr})`,
              padding: 24,
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              borderRadius: 36,
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.1)',
            }}
          >
            <Img
              src={staticFile('assets/product-raw.jpg')}
              style={{
                width: 700,
                height: 700,
                objectFit: 'cover',
                borderRadius: 24,
              }}
            />
          </div>

          <MarkerUnderline
            text="I Saved $5,000 With 1 Photo"
            highlightWord="$5,000"
            startFrame={5}
          />
        </AbsoluteFill>
      )}

      {/* -------------------------------------------------- */}
      {/* SCENE 2: STEP 1 - EDITORIAL POSTER (75 - 210f)     */}
      {/* -------------------------------------------------- */}
      {frame >= 75 && frame < 210 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              transform: `perspective(1200px) rotateX(${cameraOrbitY * 0.5}deg) rotateY(${cameraOrbitX * 0.5}deg) scale(${
                1 + Math.sin((frame - 75) * 0.02) * 0.03
              })`,
              width: '92%',
              height: '82%',
              position: 'relative',
              borderRadius: 36,
              overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 30px rgba(0,240,255,0.2)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Img
              src={staticFile('assets/poster.jpeg')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <TypewriterPrompt
            prompt="clean poster for white headphones"
            startFrame={95}
          />
        </AbsoluteFill>
      )}

      {/* -------------------------------------------------- */}
      {/* SCENE 3: STEP 2 - PARALLAX CHARACTER (210 - 330f)  */}
      {/* -------------------------------------------------- */}
      {frame >= 210 && frame < 330 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              transform: `perspective(1200px) scale(${
                1 + (frame - 210) * 0.001
              }) rotateY(${-cameraOrbitX * 0.4}deg)`,
              width: '92%',
              height: '82%',
              position: 'relative',
              borderRadius: 36,
              overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Img
              src={staticFile('assets/character.jpeg')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* -------------------------------------------------- */}
      {/* SCENE 4: STEP 3 - HIGH-TECH OMNI RENDER (330 - 420f) */}
      {/* -------------------------------------------------- */}
      {frame >= 330 && frame < 420 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Glowing Omni Glass Pod */}
          <div
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(24px)',
              borderRadius: 40,
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80%',
            }}
          >
            <Img
              src={staticFile('assets/omni-logo.png')}
              style={{
                width: 150,
                height: 150,
                marginBottom: 32,
                filter: 'drop-shadow(0 0 30px rgba(255,0,85,0.9))',
              }}
            />

            <div
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: 28,
                letterSpacing: '0.08em',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
              }}
            >
              GENERATING 3D LIGHTING &amp; CAMERA...
            </div>

            {/* Glowing Neon Progress Bar */}
            <div
              style={{
                width: '90%',
                height: 28,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 14,
                padding: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff0055, #00f0ff)',
                  borderRadius: 10,
                  boxShadow: '0 0 24px #00f0ff, 0 0 12px #ff0055',
                }}
              />
            </div>

            <div
              style={{
                marginTop: 20,
                fontSize: 36,
                fontWeight: 900,
                color: '#00f0ff',
                fontFamily: 'monospace',
                textShadow: '0 0 20px #00f0ff',
              }}
            >
              {progressPercent}%
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* -------------------------------------------------- */}
      {/* SCENE 5: 3D CURVED CINEMA OUTRO (420 - 465f)        */}
      {/* -------------------------------------------------- */}
      {frame >= 420 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '92%',
              height: '84%',
              position: 'relative',
              borderRadius: 36,
              overflow: 'hidden',
              boxShadow: '0 35px 100px rgba(0,0,0,0.95), 0 0 40px rgba(255,0,85,0.3)',
              border: '1.5px solid rgba(255,255,255,0.2)',
            }}
          >
            <OffthreadVideo
              src={staticFile('assets/ad-render.mp4')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              startFrom={0}
            />
          </div>

          <LineBoilCTA text="WORKFLOW" keyword="WORKFLOW" startFrame={430} />
        </AbsoluteFill>
      )}

      {/* -------------------------------------------------- */}
      {/* SUBTITLES: KINETIC BLUR-SLIDE CAPTIONS            */}
      {/* -------------------------------------------------- */}
      <BlurSlideSubtitles
        text="I saved $5,000 with 1 photo..."
        startFrame={0}
        durationInFrames={70}
      />
      <BlurSlideSubtitles
        text="...and made THIS 3D ad in 60s!"
        startFrame={75}
        durationInFrames={55}
      />
      <BlurSlideSubtitles
        text="1. Cut the background &amp; make a poster."
        startFrame={130}
        durationInFrames={75}
      />
      <BlurSlideSubtitles
        text="2. Drop in a person wearing headphones."
        startFrame={210}
        durationInFrames={110}
      />
      <BlurSlideSubtitles
        text="3. Click Omni to make the camera move."
        startFrame={330}
        durationInFrames={85}
      />
      <BlurSlideSubtitles
        text="Comment 'WORKFLOW' to get the steps..."
        startFrame={420}
        durationInFrames={45}
      />

      {/* -------------------------------------------------- */}
      {/* MASCOT ANIMATIONS (Glassmorphic Avatar Pod)        */}
      {/* -------------------------------------------------- */}
      <Mascot action="kick" startFrame={20} endFrame={75} />
      <Mascot action="laser" startFrame={95} endFrame={205} />
      <Mascot action="pull" startFrame={220} endFrame={325} />
      <Mascot action="zap" startFrame={335} endFrame={415} />
      <Mascot action="headbang" startFrame={425} endFrame={465} />

      {/* -------------------------------------------------- */}
      {/* CINEMATIC FLASH-CUT & RADIAL BURST TRANSITIONS    */}
      {/* -------------------------------------------------- */}
      <FlashCut atFrame={75} durationInFrames={10} />
      <FlashCut atFrame={210} durationInFrames={10} />
      <FlashCut atFrame={330} durationInFrames={10} />
      <FlashCut atFrame={420} durationInFrames={10} />
    </AbsoluteFill>
  );
};
