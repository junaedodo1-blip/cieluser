import React from "react";
import { AbsoluteFill } from "remotion";
import { FullyArticulatedCartoonActor } from "../components/FullyArticulatedCartoonActor";
import { theme } from "../theme";

interface MascotShowcaseProps {
  actionState: "pointing" | "typing" | "celebrating" | "explaining";
}

export const MascotShowcase: React.FC<MascotShowcaseProps> = ({ actionState }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent", // Transparent for clean asset rendering
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FullyArticulatedCartoonActor actionState={actionState} />
      </div>
    </AbsoluteFill>
  );
};
