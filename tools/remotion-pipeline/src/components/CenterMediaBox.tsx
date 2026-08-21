import React from "react";
import { OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface CenterMediaBoxProps {
  src: string;
  delay?: number;
  width?: number;
  height?: number;
  badgeText?: string;
  explainerStep?: string;
  explainerText?: string;
}

export const CenterMediaBox: React.FC<CenterMediaBoxProps> = ({
  src,
  delay = 0,
  width = 820,
  height = 920,
  badgeText,
  explainerStep,
  explainerText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.smooth,
  });

  const translateY = interpolate(spr, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(spr, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns zoom on the video asset inside box
  const kenBurnsScale = interpolate(frame, [0, 600], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Visual Explainer Pill Badge floating right above the box */}
      {explainerStep && (
        <div
          style={{
            position: "absolute",
            top: "-54px",
            backgroundColor: theme.colors.primaryAccent,
            color: "#FFFFFF",
            padding: "8px 24px",
            borderRadius: "50px",
            fontFamily: theme.fonts.heading,
            fontSize: "18px",
            fontWeight: 800,
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
            opacity: spr,
            transform: `scale(${scale})`,
            zIndex: 10,
          }}
        >
          {explainerStep}
        </div>
      )}

      {/* Center White Clean Border Box Container */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: "32px",
          backgroundColor: "#FFFFFF",
          border: `2px solid #E2E8F0`,
          boxShadow: `0 30px 70px -15px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)`,
          overflow: "hidden",
          opacity: spr,
          transform: `translateY(${translateY}px) scale(${scale})`,
          position: "relative",
        }}
      >
        {/* Top Control Bar */}
        <div
          style={{
            height: "44px",
            backgroundColor: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: "8px",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          {badgeText && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: theme.fonts.mono,
                fontSize: "13px",
                color: "#64748B",
                fontWeight: 700,
              }}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Media Frame Inside Box */}
        <div style={{ width: "100%", height: "calc(100% - 44px)", overflow: "hidden" }}>
          <OffthreadVideo
            src={staticFile(src)}
            volume={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${kenBurnsScale})`,
            }}
          />
        </div>
      </div>

      {/* Visual Explainer Text Card right under the box */}
      {explainerText && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "14px 28px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            fontFamily: theme.fonts.heading,
            fontSize: "20px",
            fontWeight: 700,
            color: "#1E293B",
            opacity: spr,
            textAlign: "center",
            maxWidth: "760px",
          }}
        >
          💡 <span style={{ color: theme.colors.primaryAccent }}>Explainer:</span> {explainerText}
        </div>
      )}
    </div>
  );
};
