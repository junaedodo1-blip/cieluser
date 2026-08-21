import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface FullyArticulatedCartoonActorProps {
  actionState?: "pointing" | "typing" | "celebrating" | "explaining";
}

export const FullyArticulatedCartoonActor: React.FC<FullyArticulatedCartoonActorProps> = ({
  actionState = "pointing",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Cartoon Physics & Secondary Motion ---
  // 1. Head Bobbing & Expressive Tilting
  const headY = Math.sin(frame / 6) * 8;
  const headRotate = Math.cos(frame / 8) * 7;

  // 2. Torso Squash & Stretch Breathing
  const squashY = 1 + Math.sin(frame / 10) * 0.05;
  const stretchX = 1 - Math.sin(frame / 10) * 0.03;

  // 3. Leg Walk-Step Bounce & Knee Flexing
  const legBounce = Math.abs(Math.sin(frame / 6)) * 12;
  const legAngleLeft = Math.sin(frame / 6) * 15;
  const legAngleRight = -Math.sin(frame / 6) * 15;

  // 4. Arm Articulation & Expression Physics
  let rightUpperArmRotate = 20;
  let rightForearmRotate = 15;
  let leftUpperArmRotate = -20;
  let leftForearmRotate = -15;
  let rightHandEmoji = "👉";
  let leftHandEmoji = "✋";
  let propLabel = "LOOK AT THIS!";
  let propColor = theme.colors.electricCyan;

  if (actionState === "pointing") {
    // Pointing high up at headline with right arm stretching out
    rightUpperArmRotate = -60 + Math.sin(frame / 5) * 15;
    rightForearmRotate = -30 + Math.cos(frame / 5) * 10;
    leftUpperArmRotate = 30 + Math.sin(frame / 7) * 10;
    rightHandEmoji = "👉";
    propLabel = "LOOK AT THIS!";
    propColor = theme.colors.neonPink;
  } else if (actionState === "typing") {
    // Rapid typing motion with alternating arm swings
    rightUpperArmRotate = 35 + Math.sin(frame * 0.9) * 30;
    rightForearmRotate = 40 + Math.cos(frame * 0.9) * 20;
    leftUpperArmRotate = -35 - Math.sin(frame * 0.9) * 30;
    leftForearmRotate = -40 - Math.cos(frame * 0.9) * 20;
    rightHandEmoji = "⚡";
    leftHandEmoji = "💻";
    propLabel = "CODING PROMPT!";
    propColor = theme.colors.acidYellow;
  } else if (actionState === "celebrating") {
    // Excited jumping celebrating arms high up
    rightUpperArmRotate = -130 + Math.sin(frame / 4) * 20;
    rightForearmRotate = -40 + Math.cos(frame / 4) * 15;
    leftUpperArmRotate = 130 - Math.sin(frame / 4) * 20;
    leftForearmRotate = 40 - Math.cos(frame / 4) * 15;
    rightHandEmoji = "🔥";
    leftHandEmoji = "🎉";
    propLabel = "SAVED $10,000!";
    propColor = theme.colors.electricCyan;
  } else if (actionState === "explaining") {
    // Open palm gesturing side to side
    rightUpperArmRotate = -20 + Math.sin(frame / 8) * 15;
    rightForearmRotate = -10 + Math.cos(frame / 8) * 10;
    leftUpperArmRotate = -40 - Math.sin(frame / 8) * 15;
    rightHandEmoji = "💡";
    propLabel = "HERE IS HOW!";
    propColor = theme.colors.acidYellow;
  }

  // Wobbly Spring Entrance Pop-In
  const entranceSpr = spring({
    frame: frame % 90,
    fps,
    config: theme.springs.wobbly,
  });

  const entranceScale = interpolate(entranceSpr, [0, 1], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "100px",
        right: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        zIndex: 990,
        pointerEvents: "none",
      }}
    >
      {/* Dynamic Animated Speech Bubble with Bounce Physics */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `3.5px solid ${propColor}`,
          borderRadius: "28px",
          padding: "10px 22px",
          boxShadow: `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${propColor}77`,
          marginBottom: "12px",
          marginRight: "40px",
          transform: `translateY(${-legBounce + headY}px) scale(${entranceScale})`,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "28px" }}>{rightHandEmoji}</span>
        <span
          style={{
            fontFamily: theme.fonts.explosive,
            fontSize: "18px",
            color: "#0F172A",
            letterSpacing: "0.02em",
          }}
        >
          {propLabel}
        </span>
      </div>

      {/* Articulated Body Skeleton Container */}
      <div
        style={{
          width: "280px",
          height: "380px",
          position: "relative",
          transform: `translateY(${-legBounce}px) scaleX(${stretchX}) scaleY(${squashY * entranceScale})`,
          filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 20px ${propColor}44)`,
        }}
      >
        {/* === LAYER 1: BACK LEFT LEG (Articulated Walking Pivot) === */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "35%",
            width: "30px",
            height: "80px",
            transformOrigin: "top center",
            transform: `rotate(${legAngleLeft}deg)`,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              backgroundColor: "#1E293B",
              border: "3px solid #000",
              position: "absolute",
              bottom: 0,
            }}
          />
        </div>

        {/* === LAYER 2: BACK LEFT ARM & HAND === */}
        <div
          style={{
            position: "absolute",
            top: "32%",
            left: "15%",
            transformOrigin: "top right",
            transform: `rotate(${leftUpperArmRotate}deg)`,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: theme.colors.neonPink,
              border: "3px solid #000",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              transform: `rotate(${leftForearmRotate}deg)`,
            }}
          >
            {leftHandEmoji}
          </div>
        </div>

        {/* === LAYER 3: MAIN CHARACTER TORSO & HEAD (Image Cutout) === */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transform: `translateY(${headY}px) rotate(${headRotate}deg)`,
            zIndex: 2,
          }}
        >
          <img
            src={staticFile("pixel_character.png")}
            alt="Articulated Cartoon Character"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* === LAYER 4: FRONT RIGHT LEG (Articulated Walking Pivot) === */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "35%",
            width: "30px",
            height: "80px",
            transformOrigin: "top center",
            transform: `rotate(${legAngleRight}deg)`,
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              backgroundColor: "#2563EB",
              border: "3px solid #000",
              position: "absolute",
              bottom: 0,
            }}
          />
        </div>

        {/* === LAYER 5: FRONT RIGHT ARM & HAND (Active Gesture) === */}
        <div
          style={{
            position: "absolute",
            top: "32%",
            right: "15%",
            transformOrigin: "top left",
            transform: `rotate(${rightUpperArmRotate}deg)`,
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: theme.colors.electricCyan,
              border: "3px solid #000",
              boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              transform: `rotate(${rightForearmRotate}deg)`,
            }}
          >
            {rightHandEmoji}
          </div>
        </div>
      </div>
    </div>
  );
};
