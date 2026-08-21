export type HookAngleType =
  | 'contrarian_truth'
  | 'case_study_directing'
  | 'technical_formula'
  | 'before_vs_after'
  | 'step_by_step_anatomy'
  | 'curiosity_juxtaposition'
  | 'commerce_conversion'
  | 'viral_storytelling_secrets';

export interface CarouselSlideCopy {
  slideIndex: number; // 1-indexed (1, 2, 3... 8)
  slideType:
    | 'visual_hook'
    | 'friction'
    | 'sensory_discovery'
    | 'exploded_anatomy'
    | 'philosophical_shift'
    | 'tactile_proof'
    | 'product_spec'
    | 'ciel_cta';
  header: string;
  subhead?: string;
  bodyBullets?: string[];
  keyCallout?: string;
  badgeText?: string;
  swissHudMetadata?: string;
  swipePrompt?: string;
  cardIndexText: string; // e.g. "01 // 08"
}

export interface CarouselCopyPackage {
  topic: string;
  hookAngle: HookAngleType;
  hookHeadline: string;
  slides: CarouselSlideCopy[];
  instagramCaption: string;
  hashtags: string[];
}

/**
 * 7 Battle-Tested, Simple & Punchy Hook Blueprints (Passes the 9-Year-Old Clarity Test).
 * Crystal clear language, zero confusing jargon, massive curiosity and emotional pull.
 */
export const HOOK_ANGLE_BLUEPRINTS: Record<
  HookAngleType,
  {
    name: string;
    hookHeader: string;
    hookSubhead: string;
    frictionHeader: string;
    frictionSubhead: string;
    frictionBullets: string[];
    ruleSummary: string;
    badgeText: string;
  }
> = {
  contrarian_truth: {
    name: 'The Contrarian Truth',
    hookHeader: 'Anyone can make an AI video in 5 seconds. But 99% get skipped immediately.',
    hookSubhead: 'Here is why flashy AI tricks fail, and the simple rule that makes people stop and watch.',
    frictionHeader: 'The Big Mistake: Making it look like a boring commercial',
    frictionSubhead: 'When a video looks like an ordinary ad, people swipe away before they even see the product.',
    frictionBullets: [
      'Flashy AI filters look cheap and get forgotten in 3 seconds',
      'People do not buy pixels. They buy how an object makes them feel',
      'If there is no story or emotion, nobody cares',
    ],
    ruleSummary: 'SIMPLE RULE: Story is the only thing that makes people care.',
    badgeText: 'THE UNCOMFORTABLE TRUTH',
  },
  case_study_directing: {
    name: 'The Auteur Case Study',
    hookHeader: 'How giant luxury brands get millions of views with crazy, simple ideas.',
    hookSubhead: 'You do not need a giant Hollywood budget. You just need to know how to direct the camera.',
    frictionHeader: 'Why standard product videos feel so boring',
    frictionSubhead: 'Spinning a 3D shoe on a white screen does not make anyone want to buy it.',
    frictionBullets: [
      'Everyone is copying the exact same 3 boring camera moves',
      'No surprise, no excitement, and zero personality',
      'The feed is full of noise. You have to break the pattern',
    ],
    ruleSummary: 'SIMPLE RULE: Make the camera feel like a real person is holding it.',
    badgeText: 'DIRECTING BREAKDOWN',
  },
  technical_formula: {
    name: 'The Technical Blueprint',
    hookHeader: 'Why normal AI videos look fake and robotic (and how to fix them in 1 click).',
    hookSubhead: 'Real objects have weight. When you drop something, it bounces. Here is how we add real physics.',
    frictionHeader: 'The "Robot Video" problem: Zero weight and zero bounce',
    frictionSubhead: 'When an object glides in a straight line with no gravity, your brain knows it is fake.',
    frictionBullets: [
      'Robotic straight lines make AI videos look cheap',
      'Real objects have weight, inertia, and natural bounce',
      'We use simple spring code so every movement feels organic and juicy',
    ],
    ruleSummary: 'SIMPLE RULE: Add natural weight and spring bounce to every shot.',
    badgeText: 'THE SECRET CODE',
  },
  before_vs_after: {
    name: 'Before vs After / Comparison',
    hookHeader: 'Cheap AI Video vs Million-Dollar Commercial: The 3 Big Differences.',
    hookSubhead: 'Most creators make these 3 easy mistakes when rendering physical products.',
    frictionHeader: 'Why cheap AI videos fail to sell anything',
    frictionSubhead: 'They look like video game tech demos instead of real luxury items you can touch.',
    frictionBullets: [
      'Mistake 1: Plastic skin and shiny, fake surfaces',
      'Mistake 2: Bad lighting that flattens out all the details',
      'Mistake 3: Zero human emotion or reason to buy',
    ],
    ruleSummary: 'SIMPLE RULE: Make the details look so crisp you can almost touch them.',
    badgeText: 'BEFORE VS AFTER',
  },
  step_by_step_anatomy: {
    name: 'Step-by-Step Anatomy',
    hookHeader: 'The simple 8-step recipe to turn any product into a viral video.',
    hookSubhead: 'From grabbing attention in the first second to making sales on autopilot.',
    frictionHeader: 'Why most creators lose 80% of viewers by slide 3',
    frictionSubhead: 'If you do not connect each slide like a story, people get bored and swipe away.',
    frictionBullets: [
      'Random facts make people lose interest fast',
      'Every second must lead naturally into the next second',
      'Hook their curiosity first, show proof second, give the prize last',
    ],
    ruleSummary: 'SIMPLE RULE: Hook curiosity $\\rightarrow$ Show proof $\\rightarrow$ Give the prize.',
    badgeText: 'STEP-BY-STEP GUIDE',
  },
  curiosity_juxtaposition: {
    name: 'Uncanny Juxtaposition',
    hookHeader: 'Why putting a fancy luxury item in a gritty street makes everyone stop scrolling.',
    hookSubhead: 'The secret of contrast: When two things do not belong together, your brain is forced to look.',
    frictionHeader: 'Clean studio renders are invisible in the feed',
    frictionSubhead: 'When everything is clean and perfect, the brain ignores it as background wallpaper.',
    frictionBullets: [
      'Our brains are built to notice things that look out of place',
      'A luxury perfume bottle inside a raw concrete tunnel stops the thumb',
      'Contrast creates curiosity, and curiosity creates views',
    ],
    ruleSummary: 'SIMPLE RULE: Put something fancy in a place nobody expects.',
    badgeText: 'SCROLL-STOPPING TRICK',
  },
  commerce_conversion: {
    name: 'Commerce & Conversion Engine',
    hookHeader: 'How we turn 1 simple comment into automatic sales while we sleep.',
    hookSubhead: 'You do not need to beg people to buy. Just set up this simple automated robot in 2 minutes.',
    frictionHeader: 'Why getting 100,000 views with 0 sales hurts so much',
    frictionSubhead: 'Views do not pay the bills if you do not have an easy way to give people what they want.',
    frictionBullets: [
      'Putting a link in your bio loses 90% of interested buyers',
      'People want the link sent directly into their DMs right away',
      'Automated DM robots deliver the product in 2 seconds flat',
    ],
    ruleSummary: 'SIMPLE RULE: Ask for a 1-word comment $\\rightarrow$ DM them the prize instantly.',
    badgeText: 'SALES ON AUTOPILOT',
  },
  viral_storytelling_secrets: {
    name: 'Viral Hook & Storytelling Formula',
    hookHeader: 'The 3-Second Hook Secret That Makes Millions Stop Scrolling.',
    hookSubhead: 'How top creators write opening lines that hook viewers, hold them for 15 seconds, and go viral.',
    frictionHeader: 'Why 90% of videos die in the first 2 seconds',
    frictionSubhead: 'Starting with boring greetings ("Hey guys") or channel logos kills your reach immediately.',
    frictionBullets: [
      'Never start with "Hey guys" or boring introductions',
      'The 3-Layer Hook: Visual shock + Spoken intrigue + 4-word punchy text',
      'Open a curiosity loop in second 1, resolve the prize in second 15',
    ],
    ruleSummary: 'SIMPLE RULE: Lead with the prize $\\rightarrow$ Build tension $\\rightarrow$ Deliver the formula.',
    badgeText: 'VIRAL HOOK FORMULA',
  },
};

/**
 * Builds structured carousel copy rotating through diverse angles and hooks.
 * Strictly formatted for 9-year-old clarity, high curiosity, and zero fluff.
 */
export function generateCarouselCopy(params: {
  topic: string;
  hookAngle?: HookAngleType;
  extractedPoints?: string[];
  totalSlides?: number;
  brandHandle?: string;
}): CarouselCopyPackage {
  const {
    topic,
    extractedPoints = [],
    totalSlides = 8,
    brandHandle = 'project\\ciel',
  } = params;

  // Select angle
  const angleKeys = Object.keys(HOOK_ANGLE_BLUEPRINTS) as HookAngleType[];
  const selectedAngle = params.hookAngle || angleKeys[Math.floor(Math.random() * angleKeys.length)];
  const angleDef = HOOK_ANGLE_BLUEPRINTS[selectedAngle];

  const slides: CarouselSlideCopy[] = [];

  // Slide 1: Scroll-Stopping Hero Hook
  slides.push({
    slideIndex: 1,
    slideType: 'visual_hook',
    header: angleDef.hookHeader,
    subhead: angleDef.hookSubhead,
    badgeText: angleDef.badgeText,
    swissHudMetadata: `01 // ${selectedAngle.toUpperCase().replace(/_/g, ' ')} // SPEC: 2026`,
    swipePrompt: 'SWIPE TO LEARN THE SECRET →',
    cardIndexText: '01 // 08',
  });

  // Slide 2: The Core Problem (Why people fail)
  slides.push({
    slideIndex: 2,
    slideType: 'friction',
    header: angleDef.frictionHeader,
    subhead: angleDef.frictionSubhead,
    bodyBullets: angleDef.frictionBullets,
    keyCallout: angleDef.ruleSummary,
    swissHudMetadata: '02 // THE PROBLEM // WHY IT FAILS',
    swipePrompt: 'HOW WE FIX IT →',
    cardIndexText: '02 // 08',
  });

  // Slide 3: Free Nano Banana Poster Prompt Formula (Instant Practical Value)
  slides.push({
    slideIndex: 3,
    slideType: 'sensory_discovery',
    header: 'Free Nano Banana Poster Formula 🎨',
    subhead: 'Copy-paste this exact prompt formula to make luxury product posters for free:',
    bodyBullets: [
      '📌 STEP 1: Upload your favorite reference photo into Nano Banana',
      '💬 STEP 2: Paste this: "Use this image as reference. Swap the copy to [My Title]. 50mm clean prime, raking key light, 35mm film grain, 4:5 vertical poster."',
      '✨ STEP 3: Export in high-res (1080x1350) with zero blur and crisp text.',
    ],
    keyCallout: '💡 PROMPT CODE: "Use reference style, add 50mm macro lighting & raking shadow, 35mm film grain, razor-sharp typography."',
    swissHudMetadata: '03 // FREE POSTER PROMPT // NANO BANANA',
    swipePrompt: 'FREE VIDEO PROMPT NEXT →',
    cardIndexText: '03 // 08',
  });

  // Slide 4: Free Higgsfield Video Generation Prompt (Instant Video Value)
  slides.push({
    slideIndex: 4,
    slideType: 'exploded_anatomy',
    header: 'Free Higgsfield Video Prompt 🎬',
    subhead: 'Want to turn that still poster into a viral 4K video? Use this exact camera prompt:',
    bodyBullets: [
      '🎥 Camera Move: "Slow cinematic dolly in on hero object, 50mm FOV, shallow depth of field"',
      '💧 Physics: "Macro liquid mist diffusion at 1/10,000s shutter, real gravity and bounce"',
      '🎞️ Finish: "Volumetric light beams, lifted deep shadows, 35mm cinema film grain, no CGI sheen"',
    ],
    keyCallout: '🎬 HIGGSFIELD CODE: "MS slow dolly in, 50mm lens, 1/10,000s shutter, liquid viscosity splash, 35mm grain, no CGI."',
    swissHudMetadata: '04 // FREE VIDEO PROMPT // HIGGSFIELD',
    swipePrompt: 'STEP-BY-STEP RECIPE →',
    cardIndexText: '04 // 08',
  });

  // Slide 5: The 3-Step Poster Creation Recipe
  slides.push({
    slideIndex: 5,
    slideType: 'philosophical_shift',
    header: 'How To Make Posters In 3 Minutes ⏱️',
    subhead: 'You do not need Photoshop or complex 3D software. Follow these 3 simple steps:',
    bodyBullets: [
      '1. Pick a reference: Find an aesthetic poster you love on Pinterest or Instagram',
      '2. Nano Banana Magic: Feed the photo into Nano Banana + our 9-year-old clear copy',
      '3. Instant Swiss HUD: Add a tiny corner metadata stamp for instant luxury authority',
    ],
    keyCallout: '⭐ RESULT: You get a $5,000-looking agency poster in under 180 seconds.',
    swissHudMetadata: '05 // 3-STEP WORKFLOW // POSTER CREATION',
    swipePrompt: 'SAVE THE CHEAT SHEET →',
    cardIndexText: '05 // 08',
  });

  // Slide 6: Saveable Prompt & Camera Cheat Sheet (High Save Velocity)
  slides.push({
    slideIndex: 6,
    slideType: 'tactile_proof',
    header: 'The Copy-Paste Cheat Sheet 📋',
    subhead: 'Here is your quick-reference pocket guide for all future video & poster prompts:',
    bodyBullets: [
      '🎯 Lighting: "Raking side key light, soft highlight roll-off, lifted open shadows"',
      '📷 Lens: "50mm prime portrait, wide aperture, creamy round bokeh"',
      '🧪 Anti-AI Lock: "Real skin pores, peach fuzz, 35mm motion-picture grain, no plastic"',
    ],
    keyCallout: '💾 SAVE THIS POST: You will need these copy-paste prompt tags for your next project!',
    swissHudMetadata: '06 // PROMPT CHEAT SHEET // SAVE FOR LATER',
    swipePrompt: 'THE 3-STEP SYSTEM →',
    cardIndexText: '06 // 08',
  });

  // Slide 7: The Master Blueprint (High Share Velocity)
  slides.push({
    slideIndex: 7,
    slideType: 'product_spec',
    header: 'The 3-Part Winning System 🚀',
    subhead: 'How to combine posters, video, and automated sales into one machine:',
    bodyBullets: [
      '1. Beautiful Nano Banana Poster: Stops the feed in 0.5s',
      '2. Higgsfield Motion Video: Brings the physical object to life with real physics',
      '3. Automated DM Robot: Delivers the prompt PDF the second someone comments',
    ],
    keyCallout: '✈️ SHARE WITH A FRIEND: Help a creator level up their visual quality today!',
    swissHudMetadata: '07 // THE BLUEPRINT // AUTONOMOUS ENGINE',
    swipePrompt: 'CLAIM THE FREE PROMPT PACK →',
    cardIndexText: '07 // 08',
  });

  // Slide 8: The Instant Free Prize CTA (High Comment Velocity)
  slides.push({
    slideIndex: 8,
    slideType: 'ciel_cta',
    header: 'Want The Full Free PDF & Prompt Pack? 🎁',
    subhead: 'Drop a 1-word comment below and I will send the complete playbook straight to your DMs!',
    bodyBullets: [
      '💬 Comment "CIEL" on this post right now',
      '📥 Our automated robot will instantly DM you the free interactive PDF guide',
      '📦 Includes all Nano Banana prompt files + Higgsfield 4K camera codes',
      '🚀 Follow @junnbuilds / project\\ciel for daily visual directing secrets',
    ],
    keyCallout: '⚡ Instant free delivery: Comment "CIEL" below to get the download link in 2 seconds.',
    swissHudMetadata: '08 // FREE PROMPT PACK // DROP "CIEL" BELOW',
    swipePrompt: 'COMMENT "CIEL" NOW ↓',
    cardIndexText: '08 // 08',
  });

  const instagramCaption = `${angleDef.hookHeader}\n\n"${angleDef.hookSubhead}"\n\nHere is the simple 8-step visual breakdown:\n\n01 // The Scroll-Stopping Hook\n02 // Why Most Ads Fail\n03 // Secret 1: Make Them Feel It\n04 // Secret 2: The Micro Details\n05 // Secret 3: Sell The Emotion\n06 // Secret 4: Real Weight & Physics\n07 // The 3-Part System\n08 // Get The Free Playbook\n\n---\n💾 SAVE this post so you have the formulas for your next project.\n✈️ SHARE with a friend or creator who needs this.\n👇 Drop "CIEL" in the comments and I will instantly DM you the complete free interactive playbook & prompt templates!\n\nproject\\ciel // BEYOND THE FRAME, INTO FEELING.`;

  const hashtags = [
    '#projectciel',
    '#visualdirecting',
    '#luxurymarketing',
    '#aicinema',
    '#brandstorytelling',
    '#contentcreator',
    '#creativeagency',
  ];

  return {
    topic,
    hookAngle: selectedAngle,
    hookHeadline: angleDef.hookHeader,
    slides,
    instagramCaption,
    hashtags,
  };
}

export function extractSlidesFromText(text: string): CarouselSlideCopy[] {
  return generateCarouselCopy({ topic: text.slice(0, 80) }).slides;
}
