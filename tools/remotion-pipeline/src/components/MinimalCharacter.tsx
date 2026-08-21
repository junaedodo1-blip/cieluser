import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface MinimalCharacterProps {
  actionState?: "pointing" | "typing" | "celebrating" | "explaining";
}

export const MinimalCharacter: React.FC<MinimalCharacterProps> = ({
  actionState = "pointing",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle breathing & idle float
  const floatY = Math.sin(frame / 20) * 4;
  const tilt = Math.cos(frame / 25) * 3;

  // Arm physics based on action
  let armRightAngle = 10;
  if (actionState === "pointing") armRightAngle = -35 + Math.sin(frame / 10) * 8;
  else if (actionState === "typing") armRightAngle = 25 + Math.sin(frame * 0.6) * 15;
  else if (actionState === "celebrating") armRightAngle = -90 + Math.sin(frame / 8) * 10;

  const spr = spring({
    frame: frame % 90,
    fps,
    config: theme.springs.smooth,
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "120px",
        right: "50px",
        zIndex: 900,
        pointerEvents: "none",
        transform: `translateY(${floatY}px) rotate(${tilt}deg) scale(${spr})`,
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
      }}
    >
      <div
        style={{
          width: "220px",
          height: "320px",
          position: "relative",
        }}
      >
        {/* Pivoting Hand Indicator */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            right: "15%",
            transformOrigin: "top left",
            transform: `rotate(${armRightAngle}deg)`,
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#2563EB",
              border: "2px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            ✦
          </div>
        </div>

        {/* Clean Character Image without Background */}
        <img
          src={staticFile("pixel_character.png")}
          alt="Presenter Character"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
          }}
        />
      </div>
    </div>
  );
};
