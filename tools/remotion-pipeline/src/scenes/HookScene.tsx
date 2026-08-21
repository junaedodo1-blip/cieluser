import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TopBrandHeader } from "../components/TopBrandHeader";
import { ExplosiveHeadline } from "../components/ExplosiveHeadline";
import { PainVsDesireCard } from "../components/PainVsDesireCard";
import { FullyArticulatedCartoonActor } from "../components/FullyArticulatedCartoonActor";
import { theme } from "../theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kinetic Camera Zoom Impact on Opening Frames
  const cameraZoomSpr = spring({
    frame,
    fps,
    config: theme.springs.wobbly,
  });

  const cameraScale = interpolate(cameraZoomSpr, [0, 1], [1.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center Media Box Floating Physics
  const floatY = Math.sin(frame / 14) * 8;
  const cardRotate = Math.cos(frame / 18) * 2;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "110px 40px 130px 40px",
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Prominent Dual Brand Logos at Top */}
      <TopBrandHeader />

      {/* Pathos Emotional Contrast Card (Agency vs Omni AI) */}
      <PainVsDesireCard delay={3} />

      {/* Kinetic Animated Center Box Container with High-Contrast Border */}
      <div
        style={{
          width: "840px",
          height: "560px",
          borderRadius: "32px",
          backgroundColor: theme.colors.bgCardSolid,
          border: `3px solid ${theme.colors.electricCyan}`,
          boxShadow: theme.colors.glassShadow,
          transform: `translateY(${floatY}px) rotate(${cardRotate}deg)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* MacOS Terminal Window Chrome Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "42px",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            gap: "8px",
            zIndex: 10,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <span style={{ marginLeft: "auto", fontFamily: theme.fonts.mono, fontSize: "12px", color: theme.colors.electricCyan, fontWeight: 700 }}>
            omni_workflow_preview.mp4
          </span>
        </div>

        <img
          src={staticFile("poster-jacket.jpeg")}
          alt="Preview"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Fully Articulated Cartoon Actor with Active Pointing Physics */}
      <FullyArticulatedCartoonActor actionState="pointing" />

      {/* Explosive Bungee Headline in bottom safe zone */}
      <ExplosiveHeadline
        text="How I Made a $10,000 Ad For $0 Using Google Omni"
        highlightWords={["$10,000", "$0", "Google", "Omni"]}
        fontSize={62}
        delay={4}
      />
    </AbsoluteFill>
  );
};
