import fs from 'node:fs';
import path from 'node:path';

export interface VeoMotionJobConfig {
  slideId: string;
  topicTitle: string;
  themeStyle: string;
  sourceImageUrl?: string;
  cameraChoreography: string;
  physicalDynamics: string;
  lightingAtmosphere: string;
  veoPrompt: string;
  negativePrompt: string;
  fps: number;
  durationSeconds: number;
  aspectRatio: string;
  motionStrength: number;
  loopingStyle: 'seamless_ambient_loop' | 'cinematic_push_in' | 'dutch_tilt_reveal';
}

export function generateVeoSlide1MotionPrompt(options: {
  topicTitle: string;
  headlineText: string;
  heroSceneType?: 'jacquemus_mediterranean' | 'balenciaga_brutalist' | 'prada_intellectual' | 'vogue_chiaroscuro';
}): VeoMotionJobConfig {
  const { topicTitle, headlineText, heroSceneType = 'jacquemus_mediterranean' } = options;

  let cameraChoreography = '';
  let physicalDynamics = '';
  let lightingAtmosphere = '';
  let veoPrompt = '';

  if (heroSceneType === 'jacquemus_mediterranean') {
    cameraChoreography = 'Slow, sweeping 18mm ultra-wide low-angle push-in, starting below the cantilevered travertine ledge with a subtle 3-degree Dutch tilt counter-roll that smoothly stabilizes at eye-level.';
    physicalDynamics = 'Gentle Mediterranean sea breeze fluttering the structural hem of the Abyss Black wool cape; fine golden sea spray mist drifting horizontally across the frame with natural micro-turbulence.';
    lightingAtmosphere = 'Golden hour raking rim light cutting through atmospheric sea mist, intense specular sunlight flares reflecting off the turquoise ocean fjord surface, deep #0A0A0C shadow contrast.';
    veoPrompt = `Cinematic 35mm film motion capture, Google Veo 2 ultra-photorealism. A high-fashion editorial figure in an oversized structured Abyss Black wool cocoon cape and sculptural dark sunglasses stands statuesquely on a cantilevered brutalist travertine marble platform over a misty ocean fjord at sunrise. The camera performs a slow, hypnotic 18mm low-angle push-in with gentle Dutch tilt counter-rotation. Golden rim light carves the fabric silhouette as atmospheric morning sea mist drifts across the frame. Subtle fabric movement in the wind, hyper-realistic water caustics below, 24fps cinematic film shutter, 180-degree motion blur, flawless haute-couture fashion commercial standard.`;
  } else if (heroSceneType === 'balenciaga_brutalist') {
    cameraChoreography = 'Extreme low-angle worm\'s-eye view looking up at a towering brutalist concrete monolith, slow vertical pedestal tilt upward with subtle handheld micro-shake.';
    physicalDynamics = 'Aggressive high-fashion wind machine turbulence billowing sheer dark organza layers; rain-slicked asphalt reflecting sharp specular strobe pulses.';
    lightingAtmosphere = 'Dystopian twilight gloom illuminated by industrial xenon spotlights and lightning-fast flash strobes catching wet surfaces with deep black shadow wells.';
    veoPrompt = `High-fashion Balenciaga campaign cinema directed on 35mm anamorphic prime lens. Extreme 18mm low-angle shot looking up at an avant-garde model in an exaggerated architectural black coat against a towering monolithic concrete facade at dusk. Heavy wind machine turbulence creates dramatic billows in the dark fabric. The camera executes a slow upward pedestal tilt while rain-slicked concrete reflects atmospheric strobe pulses. High-contrast chiaroscuro, cinematic motion blur, natural film grain, 24fps.`;
  } else if (heroSceneType === 'prada_intellectual') {
    cameraChoreography = 'Extreme macro focal pull: starting razor-sharp on knurled brushed titanium and molten crystal caustics, slowly pulling back into a medium profile portrait.';
    physicalDynamics = 'Slow amber light refraction shifting across fluted glass flutes; delicate vapor curls rising from cold-pressed titanium canister.';
    lightingAtmosphere = 'Cool Milanese gallery daylight paired with warm golden tungsten caustics dancing across polished travertine surfaces.';
    veoPrompt = `Haute-horlogerie and Prada-level luxury campaign cinematography. Extreme macro shot of knurled brushed titanium hardware and molten fluted crystal catching sharp morning refraction caustics. Smooth continuous focal pull revealing a high-fashion model draped across a sculpted stainless steel chaise lounge inside a modernist glass pavilion. Liquid amber reflections shift subtly across surfaces, 24fps, organic 35mm optical falloff, ultra-clean aesthetic.`;
  } else {
    cameraChoreography = 'Hypnotic circular orbital tracking shot (30-degree arc) around a monolithic black Portoro marble sculpture with model in silhouette.';
    physicalDynamics = 'Slow-motion golden dust motes drifting through a single focused shaft of cinematic sunlight.';
    lightingAtmosphere = 'High-drama Renaissance chiaroscuro lighting, deep velvet shadow wells, crisp golden edge highlights.';
    veoPrompt = `Vogue Italia editorial cover motion capture. High-contrast chiaroscuro lighting in a soaring minimalist gallery. An avant-garde silhouette in tailored monochrome couture stands beside a monolithic Portoro marble plinth. Camera performs a slow 30-degree orbital tracking move as a single beam of golden sunlight illuminates floating atmospheric dust motes and highlights fabric weave. 24fps cinematic shutter, exquisite elegance.`;
  }

  const negativePrompt = 'cheap CGI, 3D render sheen, video game graphics, jittery motion, morphing artifacts, distorted anatomy, blurry text, cartoon, oversaturated, plastic skin, jump cuts, erratic camera shake';

  return {
    slideId: 'slide_01_showstopper',
    topicTitle,
    themeStyle: heroSceneType,
    cameraChoreography,
    physicalDynamics,
    lightingAtmosphere,
    veoPrompt,
    negativePrompt,
    fps: 24,
    durationSeconds: 4,
    aspectRatio: '4:5',
    motionStrength: 5,
    loopingStyle: 'seamless_ambient_loop',
  };
}
