import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface AnimatedCodeTerminalProps {
  code: string;
  delay?: number;
  width?: number;
  height?: number;
  title?: string;
  cps?: number;
}

export const AnimatedCodeTerminal: React.FC<AnimatedCodeTerminalProps> = ({
  code,
  delay = 0,
  width = 900,
  height = 550,
  title = "google-omni-prompt.txt",
  cps = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.snappy,
  });

  const activeFrames = Math.max(0, frame - delay);
  const totalCharsToShow = Math.min(code.length, Math.floor((activeFrames / fps) * cps));
  const visibleCode = code.slice(0, totalCharsToShow);

  const translateY = interpolate(spr, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showCursor = Math.floor(frame / 12) % 2 === 0;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "20px",
        backgroundColor: "rgba(11, 15, 25, 0.92)",
        border: `1.5px solid ${theme.colors.cardBorder}`,
        boxShadow: `0 25px 50px rgba(0,0,0,0.8), 0 0 35px ${theme.colors.secondaryAccent}33`,
        overflow: "hidden",
        opacity: spr,
        transform: `translateY(${translateY}px) scale(${spr})`,
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          height: "42px",
          backgroundColor: theme.colors.terminalHeader,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
        <span
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: theme.fonts.mono,
            fontSize: "14px",
            color: theme.colors.textMuted,
            fontWeight: 600,
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          padding: "24px",
          fontFamily: theme.fonts.mono,
          fontSize: "20px",
          lineHeight: 1.6,
          color: "#E2E8F0",
          height: "calc(100% - 42px)",
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <span style={{ color: theme.colors.highlight }}>$ </span>
        <span style={{ color: "#38BDF8" }}>omni</span> generate-ad --prompt="
        <span style={{ color: "#FDE047" }}>{visibleCode}</span>
        {showCursor && <span style={{ color: theme.colors.primaryAccent, fontWeight: 900 }}>▌</span>}"
      </div>
    </div>
  );
};
