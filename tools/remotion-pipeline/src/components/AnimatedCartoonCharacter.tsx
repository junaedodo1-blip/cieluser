import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface AnimatedCartoonCharacterProps {
  actionState?: "pointing" | "typing" | "celebrating" | "explaining";
}

export const AnimatedCartoonCharacter: React.FC<AnimatedCartoonCharacterProps> = ({
  actionState = "pointing",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cartoon Character Limb & Body Physics
  // 1. Head Bob & Tilting
  const headBob = Math.sin(frame / 12) * 5;
  const headTilt = Math.cos(frame / 18) * 6;

  // 2. Torso Breathing & Sway
  const bodySway = Math.sin(frame / 16) * 3;
  const breathScaleY = 1 + Math.sin(frame / 20) * 0.025;

  // 3. Arm Gestures & Intention Based on Action State
  let armRightAngle = 15;
  let armLeftAngle = -15;
  let handScale = 1;
  let propEmoji = "✨";
  let actionLabel = "GUYS LOOK!";

  if (actionState === "pointing") {
    // Excited Pointing gesture up at the poster headline
    armRightAngle = -45 + Math.sin(frame / 8) * 12; // Pointing up high
    armLeftAngle = 20 + Math.cos(frame / 10) * 8;
    propEmoji = "👉";
    actionLabel = "LOOK AT THIS!";
  } else if (actionState === "typing") {
    // Rapid typing motion with hands moving fast
    armRightAngle = 30 + Math.sin(frame * 0.8) * 20;
    armLeftAngle = -30 - Math.cos(frame * 0.8) * 20;
    handScale = 1.1 + Math.sin(frame * 0.5) * 0.1;
    propEmoji = "⚡";
    actionLabel = "CODING PROMPT...";
  } else if (actionState === "celebrating") {
    // High energy celebratory arms up jump
    armRightAngle = -120 + Math.sin(frame / 6) * 15;
    armLeftAngle = 120 - Math.sin(frame / 6) * 15;
    propEmoji = "🔥";
    actionLabel = "SAVED $10,000!";
  } else if (actionState === "explaining") {
    // Open palm explanatory gesture
    armRightAngle = -25 + Math.sin(frame / 14) * 10;
    armLeftAngle = -15 - Math.cos(frame / 14) * 10;
    propEmoji = "💡";
    actionLabel = "HERE IS HOW!";
  }

  // Leg Bounce Physics (Cartoon Character Idle Step)
  const legBounce = Math.abs(Math.sin(frame / 10)) * 6;

  // Spring Entrance Pop-In
  const spr = spring({
    frame: frame % 90,
    fps,
    config: theme.springs.bounce,
  });

  const entranceY = interpolate(spr, [0, 1], [150, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "120px",
        right: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        zIndex: 990,
        pointerEvents: "none",
      }}
    >
      {/* Dynamic Action Metaphor Thought Bubble */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `3px solid ${theme.colors.electricCyan}`,
          borderRadius: "28px",
          padding: "12px 22px",
          boxShadow: `0 15px 35px rgba(0,0,0,0.5), 0 0 25px ${theme.colors.electricCyan}55`,
          marginBottom: "14px",
          marginRight: "30px",
          transform: `translateY(${-legBounce + headBob}px) scale(${spr})`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "28px" }}>{propEmoji}</span>
        <span
          style={{
            fontFamily: theme.fonts.display,
            fontSize: "18px",
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.02em",
          }}
        >
          {actionLabel}
        </span>
      </div>

      {/* Vector/Artistic Cartoon Character Layered Assembly */}
      <div
        style={{
          width: "260px",
          height: "360px",
          position: "relative",
          transform: `translateY(${entranceY - legBounce}px) rotate(${bodySway}deg) scaleY(${breathScaleY})`,
          filter: `drop-shadow(0 25px 35px rgba(0,0,0,0.6)) drop-shadow(0 0 15px ${theme.colors.electricCyan}44)`,
        }}
      >
        {/* Layer 1: Right Arm / Hand (Pivoting with Physics Angle) */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            right: "20%",
            transformOrigin: "top left",
            transform: `rotate(${armRightAngle}deg) scale(${handScale})`,
            zIndex: 3,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: theme.colors.electricCyan,
              border: "3px solid #000000",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            ✋
          </div>
        </div>

        {/* Layer 2: Main Character Body Cutout (Without Background) */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transform: `translateY(${headBob * 0.4}px) rotate(${headTilt * 0.5}deg)`,
            zIndex: 2,
          }}
        >
          <img
            src={staticFile("pixel_character.png")}
            alt="Cartoon Presenter Character"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* Layer 3: Left Arm / Hand (Pivoting with Physics Angle) */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "15%",
            transformOrigin: "top right",
            transform: `rotate(${armLeftAngle}deg) scale(${handScale})`,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: theme.colors.neonMagenta,
              border: "3px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            👉
          </div>
        </div>
      </div>
    </div>
  );
};
