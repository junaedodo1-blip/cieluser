import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface BrandBadgeProps {
  src: string;
  delay?: number;
  size?: number; // Size of the logo image box
  label?: string;
  sublabel?: string;
}

export const BrandBadge: React.FC<BrandBadgeProps> = ({
  src,
  delay = 0,
  size = 130,
  label,
  sublabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.bounce,
  });

  const scale = interpolate(spr, [0, 1], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin((frame + delay * 5) / 22) * 5;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        backgroundColor: "#FFFFFF",
        border: "2px solid #E2E8F0",
        borderRadius: "28px",
        padding: "12px 28px 12px 16px",
        boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 0 25px rgba(37, 99, 235, 0.12)",
        opacity: spr,
        transform: `translateY(${floatY}px) scale(${scale})`,
      }}
    >
      {/* Prominent Logo Image Container */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "20px",
          backgroundColor: "#F8FAFC",
          border: "1.5px solid #CBD5E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          overflow: "hidden",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
        }}
      >
        <img
          src={staticFile(src)}
          alt={label || "Brand Logo"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {(label || sublabel) && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {label && (
            <span
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: "24px",
                fontWeight: 900,
                color: theme.colors.textPrimary,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {label}
            </span>
          )}
          {sublabel && (
            <span
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: "14px",
                fontWeight: 700,
                color: theme.colors.primaryAccent,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginTop: "2px",
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
