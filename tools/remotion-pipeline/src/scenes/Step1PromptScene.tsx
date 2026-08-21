import React from "react";
import { AbsoluteFill } from "remotion";
import { TopBrandHeader } from "../components/TopBrandHeader";
import { ExplosiveHeadline } from "../components/ExplosiveHeadline";
import { AnimatedCodeTerminal } from "../components/AnimatedCodeTerminal";
import { FullyArticulatedCartoonActor } from "../components/FullyArticulatedCartoonActor";

export const Step1PromptScene: React.FC = () => {
  const promptText =
    "trendy social media product ad : extreme dynamic fast cuts, camera motion in unusual angles, glitches motion blur, speed ramping, hyper zooms, product explosion, inverted colors, extreme sound effects";

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

      <ExplosiveHeadline
        text="STEP 1: Craft The Master Motion Prompt"
        highlightWords={["STEP", "1:", "Master", "Motion"]}
        fontSize={54}
      />

      <AnimatedCodeTerminal
        code={promptText}
        delay={6}
        width={840}
        height={620}
        title="google-omni-prompt.txt"
        cps={45}
      />

      <FullyArticulatedCartoonActor actionState="typing" />
    </AbsoluteFill>
  );
};
