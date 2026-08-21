import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const PixelProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progressPct = Math.min(100, (frame / durationInFrames) * 100);

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "40px",
        right: "40px",
        height: "20px",
        backgroundColor: "#FFFFFF",
        border: "3px solid #000000",
        boxShadow: "4px 4px 0px #000000",
        overflow: "hidden",
        zIndex: 990,
        display: "flex",
        alignItems: "center",
        padding: "2px",
        imageRendering: "pixelated",
      }}
    >
      <div
        style={{
          width: `${progressPct}%`,
          height: "100%",
          backgroundColor: "#2563EB", // Pixel Royal Blue
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.2) 8px, rgba(255,255,255,0.2) 16px)`,
        }}
      />
    </div>
  );
};
