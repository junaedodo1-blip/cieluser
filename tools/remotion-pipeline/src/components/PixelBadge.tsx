import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PixelBadgeProps {
  text: string;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  delay?: number;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  text,
  icon = "✨",
  bgColor = "#FEF08A", // Pixel Yellow
  textColor = "#000000",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 220 },
  });

  const scale = interpolate(spr, [0, 1], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin((frame + delay * 4) / 16) * 4;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: bgColor,
        border: "3.5px solid #000000",
        boxShadow: "5px 5px 0px #000000",
        padding: "8px 20px",
        opacity: spr,
        transform: `translateY(${floatY}px) scale(${scale})`,
        imageRendering: "pixelated",
        zIndex: 20,
      }}
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
      <span
        style={{
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          fontSize: "16px",
          fontWeight: 900,
          color: textColor,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
