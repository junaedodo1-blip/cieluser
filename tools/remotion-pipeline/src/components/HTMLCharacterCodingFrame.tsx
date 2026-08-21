import React from "react";
import { AbsoluteFill, staticFile } from "remotion";

export const HTMLCharacterCodingFrame: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E14" }}>
      <iframe
        src={staticFile("character_coding_animation.html")}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "hidden",
        }}
        title="Pure CSS Character Coding Animation"
      />
    </AbsoluteFill>
  );
};
