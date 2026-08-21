import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface PixelPresenterCharacterProps {
  sceneState?: "hook" | "prompt" | "render" | "cta";
}

export const PixelPresenterCharacter: React.FC<PixelPresenterCharacterProps> = ({
  sceneState = "hook",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Idle floating animation (up and down pulse)
  const floatY = Math.sin(frame / 15) * 8;
  // Expressive tilt reaction on scene transitions
  const tilt = Math.cos(frame / 20) * 4;
  // Subtle scale pulse (breathing effect)
  const breathScale = 1 + Math.sin(frame / 25) * 0.03;

  // Spring entrance pop-in
  const spr = spring({
    frame: frame % 90,
    fps,
    config: theme.springs.bounce,
  });

  const entranceScale = interpolate(spr, [0, 1], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Metaphoric speech bubble content per scene state
  const bubbleConfig = {
    hook: {
      emoji: "💸",
      title: "$10,000 Agency -> $0 AI!",
      subtitle: "Saved 100% budget",
      bgColor: "#FEF2F2",
      borderColor: "#EF4444",
      textColor: "#991B1B",
    },
    prompt: {
      emoji: "💻",
      title: "Master Prompt Engineering",
      subtitle: "Speed ramp + Camera tags",
      bgColor: "#EFF6FF",
      borderColor: "#2563EB",
      textColor: "#1E40AF",
    },
    render: {
      emoji: "🎬",
      title: "Google Omni Rendering",
      subtitle: "4K 60FPS Product Explosion",
      bgColor: "#ECFDF5",
      borderColor: "#10B981",
      textColor: "#065F46",
    },
    cta: {
      emoji: "🚀",
      title: "Share With Creators!",
      subtitle: "Tap Send DM Button",
      bgColor: "#F3E8FF",
      borderColor: "#7C3AED",
      textColor: "#6B21A8",
    },
  }[sceneState];

  return (
    <div
      style={{
        position: "absolute",
        bottom: "160px",
        right: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        zIndex: 900,
        pointerEvents: "none",
      }}
    >
      {/* Metaphoric Action Speech Bubble */}
      <div
        style={{
          backgroundColor: bubbleConfig.bgColor,
          border: `2.5px solid ${bubbleConfig.borderColor}`,
          borderRadius: "24px",
          padding: "12px 20px",
          boxShadow: "0 15px 35px rgba(15, 23, 42, 0.15)",
          marginBottom: "16px",
          marginRight: "20px",
          transform: `translateY(${floatY * 0.5}px) scale(${entranceScale})`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          maxWidth: "360px",
        }}
      >
        <span style={{ fontSize: "32px" }}>{bubbleConfig.emoji}</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: "16px",
              fontWeight: 900,
              color: bubbleConfig.textColor,
              lineHeight: 1.2,
            }}
          >
            {bubbleConfig.title}
          </span>
          <span
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: "12px",
              fontWeight: 700,
              color: theme.colors.textMuted,
              marginTop: "2px",
            }}
          >
            {bubbleConfig.subtitle}
          </span>
        </div>
      </div>

      {/* Animated Pixel Character Container */}
      <div
        style={{
          width: "240px",
          height: "340px",
          position: "relative",
          transform: `translateY(${floatY}px) rotate(${tilt}deg) scale(${breathScale * entranceScale})`,
          filter: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.25))",
        }}
      >
        <img
          src={staticFile("pixel_character.png")}
          alt="Pixel Presenter Character"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated", // Crisp pixel art rendering
          }}
        />

        {/* Visual Metaphor Icon Effect badge next to character hand */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "-20px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: `2px solid ${bubbleConfig.borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            animation: "pulse 1s infinite alternate",
          }}
        >
          {bubbleConfig.emoji}
        </div>
      </div>
    </div>
  );
};
