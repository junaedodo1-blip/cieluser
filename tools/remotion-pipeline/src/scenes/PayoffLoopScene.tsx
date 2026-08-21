import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { TopBrandHeader } from "../components/TopBrandHeader";
import { ExplosiveHeadline } from "../components/ExplosiveHeadline";
import { FullyArticulatedCartoonActor } from "../components/FullyArticulatedCartoonActor";
import { theme } from "../theme";

export const PayoffLoopScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "110px 40px 130px 40px",
      }}
    >
      <TopBrandHeader />

      <div
        style={{
          width: "840px",
          height: "700px",
          borderRadius: "32px",
          backgroundColor: theme.colors.bgCardSolid,
          border: `3px solid ${theme.colors.electricCyan}`,
          boxShadow: theme.colors.glassShadow,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <span style={{ marginLeft: "auto", fontFamily: theme.fonts.mono, fontSize: "12px", color: theme.colors.electricCyan, fontWeight: 700 }}>
            nothing_ciel_poster.jpg
          </span>
        </div>

        <img
          src={staticFile("poster-headphones.jpeg")}
          alt="Poster"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <FullyArticulatedCartoonActor actionState="celebrating" />

      <ExplosiveHeadline
        text="Send this to a creator who needs to try Google Omni today!"
        highlightWords={["Send", "creator", "Google", "Omni"]}
        fontSize={56}
      />
    </AbsoluteFill>
  );
};
