import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface PainVsDesireCardProps {
  delay?: number;
}

export const PainVsDesireCard: React.FC<PainVsDesireCardProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.smooth,
  });

  const translateY = interpolate(spr, [0, 1], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        width: "100%",
        maxWidth: "860px",
        opacity: spr,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Traditional Agency Pain Card */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FEF2F2",
          border: "2px solid #FCA5A5",
          borderRadius: "24px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "14px",
            fontWeight: 800,
            color: "#DC2626",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          ❌ TRADITIONAL AGENCY
        </span>
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "24px",
            fontWeight: 900,
            color: "#991B1B",
          }}
        >
          $10,000 / 3 Weeks
        </span>
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "13px",
            color: "#7F1D1D",
            lineHeight: 1.4,
          }}
        >
          Slow revisions, expensive film crews, rigid contracts, zero speed ramping control.
        </span>
      </div>

      {/* Google Omni Desire Card */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ECFDF5",
          border: "2px solid #6EE7B7",
          borderRadius: "24px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          boxShadow: "0 10px 30px rgba(16, 185, 129, 0.15)",
        }}
      >
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "14px",
            fontWeight: 800,
            color: "#059669",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          ⚡ GOOGLE OMNI AI
        </span>
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "24px",
            fontWeight: 900,
            color: "#065F46",
          }}
        >
          $0 / 60 Seconds
        </span>
        <span
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: "13px",
            color: "#064E3B",
            lineHeight: 1.4,
          }}
        >
          Instant 4K renders, cinematic camera sweeps, automated product explosions.
        </span>
      </div>
    </div>
  );
};
