import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export const AudioSoundDesign: React.FC = () => {
  return (
    <>
      {/* 0:00 (Frame 0): Scene 1 Hook Entry Riser & Impact Hit */}
      <Sequence from={0} layout="none">
        <Audio src={staticFile("sfx/riser_riser-cine.mp3")} volume={0.6} />
        <Audio src={staticFile("sfx/impact_impact-cine-big.mp3")} volume={0.85} />
      </Sequence>

      {/* 0:03 (Frame 90): Scene 2 Code Terminal Transition & Shutter Click */}
      <Sequence from={90} layout="none">
        <Audio src={staticFile("sfx/transition_whoosh-fast.mp3")} volume={0.7} />
        <Audio src={staticFile("sfx/camera_camera-shutter-hard.mp3")} volume={0.8} />
      </Sequence>

      {/* 0:08 (Frame 240): Scene 3 Product Video Showcase Tech Slide & Bass Impact */}
      <Sequence from={240} layout="none">
        <Audio src={staticFile("sfx/transition_transition-tech-slide.mp3")} volume={0.75} />
        <Audio src={staticFile("sfx/impact_bass-hit-futuristic.mp3")} volume={0.9} />
      </Sequence>

      {/* 0:15 (Frame 450): Scene 4 Payoff & CTA UI Message Pop & Crystal Chime */}
      <Sequence from={450} layout="none">
        <Audio src={staticFile("sfx/ui_ui-message-pop.mp3")} volume={0.85} />
        <Audio src={staticFile("sfx/ui_chime-crystal.mp3")} volume={0.7} />
      </Sequence>
    </>
  );
};
