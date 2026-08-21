import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const PosterCanvas: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  // Subtle ambient radial glow physics
  const pulse = Math.sin(frame / 20) * 0.08;
  const scale = 1 + pulse;
  const rotate = interpolate(frame, [0, 600], [0, 20]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.bgCanvas,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Cyber Cyan Radial Neon Orb Top Left */}
      <div
        style={{
          position: "absolute",
          width: "950px",
          height: "950px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.electricCyan}33 0%, transparent 65%)`,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          top: "-20%",
          left: "-20%",
          filter: "blur(110px)",
        }}
      />

      {/* 2. Neon Magenta Radial Orb Bottom Right */}
      <div
        style={{
          position: "absolute",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.neonMagenta}33 0%, transparent 65%)`,
          transform: `scale(${1.1 - pulse}) rotate(${-rotate}deg)`,
          bottom: "-20%",
          right: "-20%",
          filter: "blur(120px)",
        }}
      />

      {/* 3. Acid Yellow Radial Ambient Pulse Center */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.acidYellow}1A 0%, transparent 70%)`,
          transform: `scale(${1 + pulse * 0.5})`,
          filter: "blur(90px)",
        }}
      />

      {/* 4. Editorial Swiss Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.8,
        }}
      />

      {/* 5. Poster Outer Border Frame */}
      <div
        style={{
          position: "absolute",
          inset: "20px",
          border: `1.5px solid rgba(255, 255, 255, 0.15)`,
          borderRadius: "36px",
          pointerEvents: "none",
          zIndex: 998,
        }}
      />

      {children}
    </div>
  );
};
