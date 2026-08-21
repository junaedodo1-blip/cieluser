export type HookAngleType =
  | 'contrarian_truth'
  | 'case_study_directing'
  | 'technical_formula'
  | 'before_vs_after'
  | 'step_by_step_anatomy'
  | 'curiosity_juxtaposition'
  | 'commerce_conversion';

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

  // Slide 3: Secret 1 - Sensory Physics (Make them feel it)
  slides.push({
    slideIndex: 3,
    slideType: 'sensory_discovery',
    header: 'Secret 1: Make Them Feel It Through The Screen',
    subhead: 'You cannot smell or touch a phone screen. So you have to make the visuals super juicy.',
    bodyBullets: [
      'Show water splashes and perfume mist in slow motion',
      'Use beautiful raking light to show real texture and cloth fabric',
      'When things look real and juicy, people crave them',
    ],
    keyCallout: 'TIP: If it looks delicious, crisp, and real, people stop scrolling.',
    swissHudMetadata: '03 // SECRET 01 // SENSORY TEXTURES',
    swipePrompt: 'SECRET 2 →',
    cardIndexText: '03 // 08',
  });

  // Slide 4: Secret 2 - The Close-Up Details
  slides.push({
    slideIndex: 4,
    slideType: 'exploded_anatomy',
    header: 'Secret 2: Zoom In On The Tiny Craft Details',
    subhead: 'Cheap videos stay far away. Great videos show the tiny details up close.',
    bodyBullets: [
      'Show the clean glass cuts and shiny metal reflections',
      'Show how the heavy cloth folds naturally when it moves',
      'Tiny details prove to the buyer that your product is high quality',
    ],
    keyCallout: 'TIP: Quality is shown in the micro-details, not in big promises.',
    swissHudMetadata: '04 // SECRET 02 // CRAFT DETAILS',
    swipePrompt: 'SECRET 3 →',
    cardIndexText: '04 // 08',
  });

  // Slide 5: Secret 3 - Sell The Feeling, Not The Thing
  slides.push({
    slideIndex: 5,
    slideType: 'philosophical_shift',
    header: 'Secret 3: Sell How It Feels, Not What It Is',
    subhead: 'Nobody buys a jacket just to stay warm. They buy it to feel cool, confident, and strong.',
    bodyBullets: [
      'A luxury perfume is not scented water. It is a memory of a rainy night',
      'A streetwear hoodie is not just cotton. It is your daily armor',
      'When you connect the product to an emotion, price does not matter',
    ],
    keyCallout: 'TIP: Sell the feeling of wearing it, not just the fabric.',
    swissHudMetadata: '05 // SECRET 03 // THE EMOTION',
    swipePrompt: 'SECRET 4 →',
    cardIndexText: '05 // 08',
  });

  // Slide 6: Secret 4 - Real Gravity & Weight
  slides.push({
    slideIndex: 6,
    slideType: 'tactile_proof',
    header: 'Secret 4: Real Weight and Real Bounce',
    subhead: 'Fake AI videos glide in straight lines. Real objects fall with gravity and bounce.',
    bodyBullets: [
      'Fast speeds create excitement, slow zero-G floats create wonder',
      'Deep bass sound effects make every impact feel heavy and solid',
      'When the video feels physically real, people trust your brand',
    ],
    keyCallout: 'TIP: Real physics = instant trust and higher sales.',
    swissHudMetadata: '06 // SECRET 04 // REAL PHYSICS',
    swipePrompt: 'THE COMPLETE SYSTEM →',
    cardIndexText: '06 // 08',
  });

  // Slide 7: The Master Blueprint
  slides.push({
    slideIndex: 7,
    slideType: 'product_spec',
    header: 'The 3-Part Winning System',
    subhead: 'How to put all 4 secrets together into one simple machine:',
    bodyBullets: [
      '1. Beautiful Story: A 15-second video that stops the feed',
      '2. High-Prestige Renders: Crisp 4K lighting and real textures',
      '3. Automated DM Robot: Sends the private link the second someone comments',
    ],
    keyCallout: 'Everything runs on autopilot 24/7.',
    swissHudMetadata: '07 // THE BLUEPRINT // AUTONOMOUS ENGINE',
    swipePrompt: 'GET THE FREE GUIDE →',
    cardIndexText: '07 // 08',
  });

  // Slide 8: The Simple 1-Word CTA
  slides.push({
    slideIndex: 8,
    slideType: 'ciel_cta',
    header: 'Want the Full Free Guide & Prompts?',
    subhead: 'Drop a 1-word comment below and I will send the complete playbook straight to your DMs!',
    bodyBullets: [
      '💬 Comment "CIEL" on this post right now',
      '📥 Our automated robot will instantly DM you the free interactive guide',
      '🚀 Follow @junnbuilds / project\\ciel for daily visual directing secrets',
    ],
    keyCallout: '⚡ Instant delivery to your DMs in 2 seconds flat.',
    swissHudMetadata: '08 // FREE PRIZE // DROP "CIEL" BELOW',
    swipePrompt: 'COMMENT "CIEL" NOW ↓',
    cardIndexText: '08 // 08',
  });

  const instagramCaption = `${angleDef.hookHeader}\n\n"${angleDef.hookSubhead}"\n\nHere is the simple 8-step visual breakdown:\n\n01 // The Scroll-Stopping Hook\n02 // Why Most Ads Fail\n03 // Secret 1: Make Them Feel It\n04 // Secret 2: The Micro Details\n05 // Secret 3: Sell The Emotion\n06 // Secret 4: Real Weight & Physics\n07 // The 3-Part System\n08 // Get The Free Playbook\n\n---\n👇 Drop "CIEL" in the comments below and I will instantly DM you the complete free interactive playbook & prompt templates!\n\nproject\\ciel // BEYOND THE FRAME, INTO FEELING.`;

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
