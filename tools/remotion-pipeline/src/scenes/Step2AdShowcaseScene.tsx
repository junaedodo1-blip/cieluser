import React from "react";
import { AbsoluteFill } from "remotion";
import { TopBrandHeader } from "../components/TopBrandHeader";
import { ExplosiveHeadline } from "../components/ExplosiveHeadline";
import { CenterMediaBox } from "../components/CenterMediaBox";
import { ProofMetricsCard } from "../components/ProofMetricsCard";
import { FullyArticulatedCartoonActor } from "../components/FullyArticulatedCartoonActor";

export const Step2AdShowcaseScene: React.FC = () => {
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
        text="STEP 2: Generate & Render Product Video"
        highlightWords={["STEP", "2:", "Product", "Video"]}
        fontSize={54}
      />

      <CenterMediaBox
        src="product-ad.mp4"
        delay={3}
        width={840}
        height={700}
        badgeText="GOOGLE OMNI RENDER (1080P)"
        explainerStep="PROMOTION VIDEO RESULT"
        explainerText="Google Omni automatically renders camera cuts & product explosions."
      />

      <ProofMetricsCard delay={8} />

      <FullyArticulatedCartoonActor actionState="explaining" />
    </AbsoluteFill>
  );
};
