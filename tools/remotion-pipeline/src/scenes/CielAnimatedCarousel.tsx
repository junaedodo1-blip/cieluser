import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

export interface CielSlideData {
  index: number;
  hud: string;
  badge?: string;
  headline: string;
  subhead: string;
  bullets?: string[];
  callout?: string;
  ctaText?: string;
  imageSrc?: string;
}

export const CIEL_SLIDES: CielSlideData[] = [
  {
    index: 1,
    hud: "01 // MANIFESTO & NARRATIVE CORE // SPEC: 2026.01",
    badge: "PROJECT\\CIEL DOCTRINE",
    headline: "Anyone can generate pixels. Story makes physical objects immortal.",
    subhead: "Today, AI makes spectacle easy. But spectacle without soul is forgotten in 3 seconds. Here is how we direct Cannes-grade physical cinema.",
    ctaText: "ENTER THE WORLD →",
    imageSrc: "ciel_slide_01.jpg",
  },
  {
    index: 2,
    hud: "02 // NARRATIVE PHILOSOPHY // LEVEL 2 REJECTION",
    headline: "The Level 2 Trap: AI Gimmicks With Zero Soul",
    subhead: "Traditional agencies rely on flashy visual transitions. We operate at Level 5 & 6 (The Translator & Maestro).",
    bullets: [
      "Level 2 (The Illusionist): Visual effects without emotional purpose — STRICTLY REJECTED",
      "Level 1 (The Reporter): Raw specs and price tags — restricted to subtle Swiss HUD",
      "Level 6 (The Maestro): Full Narrative Worldbuilding & Cultural Gravity",
    ],
    callout: "RULE: Story is the only true commercial moat in modern luxury commerce.",
    ctaText: "SENSORY PHYSICS →",
    imageSrc: "ciel_slide_02.jpg",
  },
  {
    index: 3,
    hud: "03 // SENSORY PHYSICS // OLFACTORY VISUAL CINEMA",
    headline: "Rule 01: Sensory Physics First",
    subhead: "You cannot smell an image. Here is how we translate scent, texture, and formulas into visual gravity.",
    bullets: [
      "Olfactory Cinema: Translating notes into light dispersion & mist particles",
      "Macro Texture: Liquid droplet physics at 1/10,000s shutter",
      "8K Fabric Drape: Modeling heavy cotton fleece, raw silk, and tech-beads",
    ],
    callout: "Human feeling is our objective; physics and code are our instruments.",
    ctaText: "REMOTION PHYSICS →",
    imageSrc: "ciel_slide_03.jpg",
  },
  {
    index: 4,
    hud: "04 // MOTION CORE // REACT & TYPESCRIPT ENGINEERING",
    headline: "Rule 02: Mathematical Spring Physics in Code",
    subhead: "We replaced timeline video editing with damped harmonic oscillator equations in Remotion.",
    bullets: [
      "Mathematical Weight: Exact physics equations give motion organic tactile gravity",
      "Pixel-Perfect Typography: Dynamic weight shifting (Archivo 300 to 900) & non-uniform kerning",
      "Programmatic Multi-Variants: 1 master video branches into 20+ localized ad variations",
    ],
    callout: "Remotion Code Core: Damped harmonic spring pop-ups with non-uniform word spacing.",
    ctaText: "AUTEUR DIRECTING →",
    imageSrc: "ciel_slide_04.jpg",
  },
  {
    index: 5,
    hud: "05 // AUTEUR DIRECTING // CANNES LIONS MASTERY",
    headline: "Rule 03: Directing Like Jonze, Glazer & Megaforce",
    subhead: "We integrate the proven directing principles of the world's most celebrated visual luxury houses.",
    bullets: [
      "Spike Jonze: Tactile magic realism — space expanding with emotion",
      "Jonathan Glazer: Mythic weight & hard cuts to force viewer focus",
      "Simon Porte Jacquemus: Surreal scale disruption in raw architectural streets",
      "Uncanny Juxtaposition: Placing impossible luxury inside raw concrete environments",
    ],
    callout: "Visual Doctrine: Deep shadow wells with ray-traced product illumination.",
    ctaText: "NARRATIVE SPINE →",
    imageSrc: "ciel_slide_05.jpg",
  },
  {
    index: 6,
    hud: "06 // NARRATIVE SPINE // 3-ACT PSYCHOLOGY",
    headline: "Rule 04: The 3-Act Narrative Spine",
    subhead: "Every 15-second commercial is built on an unbreakable emotional spine.",
    bullets: [
      "ACT I: THE TRUTH — Open on unspoken cultural friction (0.0s – 2.0s)",
      "ACT II: THE TENSION — Sensory struggle, zero-G suspension, and emotional float",
      "ACT III: THE RESOLVE — The physical object lands as human armor",
    ],
    callout: "Psychological Principle: Withholding info, breaking prediction, instant believability.",
    ctaText: "AGENCY SPEC →",
    imageSrc: "ciel_slide_06.jpg",
  },
  {
    index: 7,
    hud: "07 // PRODUCTION SPEC // COMMERCE CONVERSION",
    headline: "The project\\ciel Master Architecture",
    subhead: "High-prestige storytelling integrated with autonomous inbound conversion.",
    bullets: [
      "4K AI Narrative Master Commercial with Swiss HUD metadata",
      "Remotion Dynamic Ad Engine: 1 master branches into 20+ ad variations",
      "Autonomous DM Conversion Lab: AI Scent/Shade quizzes to Shopify checkouts",
    ],
    callout: "Conversion Engine: Converting viral attention into physical revenue 24/7.",
    ctaText: "COMMENT 'CIEL' →",
    imageSrc: "ciel_slide_07.jpg",
  },
];

/**
 * Single Slide Animated Component with Spring Physics & Zero-G Float
 */
export const CielSingleSlideAnimated: React.FC<{ slide: CielSlideData; localImagePath?: string }> = ({
  slide,
  localImagePath,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Spring Physics for Container Entry (Damped Harmonic Oscillator)
  const entryProgress = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 110,
    },
  });

  // 2. Zero-G Floating Drift (Continuous subtle breathing motion)
  const floatScale = interpolate(frame, [0, 150], [1, 1.03], { extrapolateRight: "clamp" });
  const floatY = Math.sin((frame / 30) * Math.PI) * 4;

  // 3. Swiss HUD Fade & Tracking Expansion
  const hudOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const hudTracking = interpolate(frame, [0, 20], [0.05, 0.15], { extrapolateRight: "clamp" });

  // 4. Headline Kinetic Spring Pop-In
  const headlineSpring = spring({
    frame: frame - 6,
    fps,
    config: {
      damping: 12,
      mass: 0.7,
      stiffness: 140,
    },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);

  // 5. Subtle Light Refraction Sheen (Horizontal laser shimmer pass)
  const shimmerPos = interpolate(frame, [15, 65], [-100, 200], { extrapolateRight: "clamp" });

  // 6. Pill Pulse
  const pulseOpacity = 0.85 + Math.sin(frame / 10) * 0.15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        color: "#FFFFFF",
        fontFamily: "'Archivo', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 50px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Subtle Technical Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      {/* Shimmer Light Flare */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${shimmerPos}%`,
          width: "80px",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }}
      />

      {/* Top Swiss HUD Metadata Bar */}
      <div
        style={{
          opacity: hudOpacity,
          letterSpacing: `${hudTracking}em`,
          borderBottom: "1px solid rgba(226, 226, 232, 0.15)",
          paddingBottom: "16px",
          fontSize: "13px",
          color: "#8E8E96",
          textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <span>{slide.hud}</span>
        <span style={{ color: "#FFFFFF" }}>{slide.index < 10 ? `0${slide.index} // 08` : `${slide.index} // 08`}</span>
      </div>

      {/* Main Slide Content Frame (Scale and Float) */}
      <div
        style={{
          transform: `scale(${floatScale}) translateY(${floatY}px)`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          margin: "auto 0",
          zIndex: 2,
        }}
      >
        {slide.badge && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "6px 14px",
              background: "#141418",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.1em",
              color: "#FFFFFF",
              opacity: pulseOpacity,
            }}
          >
            {slide.badge}
          </div>
        )}

        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "44px",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            transform: `translateY(${headlineY}px)`,
            opacity: headlineOpacity,
          }}
        >
          {slide.headline}
        </h1>

        <p
          style={{
            fontSize: "17px",
            fontWeight: 300,
            color: "#E2E2E8",
            lineHeight: 1.5,
            maxWidth: "92%",
          }}
        >
          {slide.subhead}
        </p>

        {slide.bullets && slide.bullets.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {slide.bullets.map((bullet, bIdx) => {
              const bProgress = spring({
                frame: frame - (10 + bIdx * 4),
                fps,
                config: { damping: 14, stiffness: 120 },
              });
              return (
                <div
                  key={bIdx}
                  style={{
                    background: "#141418",
                    border: "1px solid rgba(226, 226, 232, 0.12)",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    fontSize: "14px",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transform: `translateX(${(1 - bProgress) * 20}px)`,
                    opacity: bProgress,
                  }}
                >
                  <span style={{ color: "#8E8E96", fontFamily: "'JetBrains Mono', monospace" }}>•</span>
                  <span>{bullet}</span>
                </div>
              );
            })}
          </div>
        )}

        {slide.callout && (
          <div
            style={{
              background: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "14px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            <span style={{ color: "#E2E2E8" }}>⚡</span>
            <span>{slide.callout}</span>
          </div>
        )}
      </div>

      {/* Bottom Footer Navigation Indicator */}
      <div
        style={{
          borderTop: "1px solid rgba(226, 226, 232, 0.12)",
          paddingTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: "#8E8E96",
          zIndex: 2,
        }}
      >
        <span>project\ciel // BEYOND THE FRAME</span>
        <span style={{ color: "#FFFFFF", letterSpacing: "0.1em" }}>{slide.ctaText || "SWIPE →"}</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Full Multi-Slide Carousel Animated Sequence
 */
export const CielFullCarouselReel: React.FC = () => {
  const frame = useCurrentFrame();
  const SLIDE_DURATION = 90; // 3 seconds per slide at 30fps

  const activeIndex = Math.min(
    Math.floor(frame / SLIDE_DURATION),
    CIEL_SLIDES.length - 1
  );
  const currentSlide = CIEL_SLIDES[activeIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C" }}>
      <CielSingleSlideAnimated slide={currentSlide} />
    </AbsoluteFill>
  );
};
