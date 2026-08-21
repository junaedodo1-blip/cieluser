import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface LogoRevealProps {
  src: string;
  delay?: number;
  size?: number;
  label?: string;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  src,
  delay = 0,
  size = 140,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.bounce,
  });

  const scale = interpolate(spr, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotateX = interpolate(spr, [0, 1], [35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        perspective: "1000px",
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "28px",
          backgroundColor: theme.colors.cardBg,
          border: `1.5px solid ${theme.colors.cardBorder}`,
          backdropFilter: "blur(16px)",
          boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${theme.colors.primaryAccent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: spr,
          transform: `scale(${scale}) rotateX(${rotateX}deg)`,
          padding: "16px",
        }}
      >
        <img
          src={staticFile(src)}
          alt="Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {label && (
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "20px",
            fontWeight: 700,
            color: theme.colors.textMuted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: spr,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
