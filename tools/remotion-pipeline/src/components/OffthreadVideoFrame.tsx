import React from "react";
import { interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface OffthreadVideoFrameProps {
  src: string;
  delay?: number;
  width?: number;
  height?: number;
  tiltAngle?: number;
  badgeText?: string;
  volume?: number;
}

export const OffthreadVideoFrame: React.FC<OffthreadVideoFrameProps> = ({
  src,
  delay = 0,
  width = 800,
  height = 1000,
  tiltAngle = -12,
  badgeText,
  volume = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.smooth,
  });

  const translateY = interpolate(spr, [0, 1], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(spr, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns zoom on the video frame
  const kenBurnsScale = interpolate(frame, [0, 600], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        perspective: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: "24px",
          backgroundColor: theme.colors.cardBg,
          border: `2px solid ${theme.colors.cardBorder}`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.7), 0 0 40px ${theme.colors.primaryAccent}33`,
          overflow: "hidden",
          opacity: spr,
          transform: `translateY(${translateY}px) scale(${scale * kenBurnsScale}) rotateY(${tiltAngle}deg) rotateX(6deg)`,
          position: "relative",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Browser Top Bar */}
        <div
          style={{
            height: "36px",
            backgroundColor: theme.colors.terminalHeader,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10B981" }} />
          {badgeText && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: theme.fonts.mono,
                fontSize: "12px",
                color: theme.colors.textMuted,
                fontWeight: 600,
              }}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Media Frame */}
        <div style={{ width: "100%", height: "calc(100% - 36px)", overflow: "hidden" }}>
          <OffthreadVideo
            src={staticFile(src)}
            volume={volume}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};
