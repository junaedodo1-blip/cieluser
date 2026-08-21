import React from "react";
import { Composition, Sequence } from "remotion";
import { PosterCanvas } from "./components/PosterCanvas";
import { FilmGrainVignette } from "./components/FilmGrainVignette";
import { AudioSoundDesign } from "./components/AudioSoundDesign";
import { HookScene } from "./scenes/HookScene";
import { Step1PromptScene } from "./scenes/Step1PromptScene";
import { Step2AdShowcaseScene } from "./scenes/Step2AdShowcaseScene";
import { PayoffLoopScene } from "./scenes/PayoffLoopScene";
import { CielSingleSlideAnimated, CielFullCarouselReel, CIEL_SLIDES } from "./scenes/CielAnimatedCarousel";

export const ViralTutorialComposition: React.FC = () => {
  return (
    <PosterCanvas>
      <AudioSoundDesign />
      <Sequence from={0} durationInFrames={90}>
        <HookScene />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <Step1PromptScene />
      </Sequence>
      <Sequence from={240} durationInFrames={210}>
        <Step2AdShowcaseScene />
      </Sequence>
      <Sequence from={450} durationInFrames={150}>
        <PayoffLoopScene />
      </Sequence>
      <FilmGrainVignette />
    </PosterCanvas>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* project\ciel Full Animated Carousel Reel (1080x1350, 4:5 Instagram Portrait) */}
      <Composition
        id="CielFullCarouselReel"
        component={CielFullCarouselReel}
        durationInFrames={CIEL_SLIDES.length * 90}
        fps={30}
        width={1080}
        height={1350}
      />

      {/* Individual Animated Slides for Video Carousel (3 seconds each at 30fps) */}
      {CIEL_SLIDES.map((slide) => (
        <Composition
          key={`CielSlide${slide.index}`}
          id={`CielSlide-${slide.index < 10 ? `0${slide.index}` : slide.index}`}
          component={() => <CielSingleSlideAnimated slide={slide} />}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1350}
        />
      ))}

      {/* 9:16 Vertical Composition for TikTok / Reels / Shorts (1080x1920, 30fps, 20s) */}
      <Composition
        id="ViralPromoVertical"
        component={ViralTutorialComposition}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 16:9 Horizontal Composition for Twitter / YouTube (1920x1080, 30fps, 20s) */}
      <Composition
        id="ViralPromoHorizontal"
        component={ViralTutorialComposition}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
