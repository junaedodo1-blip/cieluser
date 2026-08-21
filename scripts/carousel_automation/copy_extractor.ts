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

export const HOOK_ANGLE_BLUEPRINTS: Record<
  HookAngleType,
  {
    name: string;
    hookHeader: string;
    hookSubhead: string;
    frictionHeader: string;
    frictionSubhead: string;
    badgeText: string;
  }
> = {
  contrarian_truth: {
    name: 'The Contrarian Truth',
    hookHeader: 'Anyone can generate pixels. Story makes physical objects immortal.',
    hookSubhead: 'Today, AI makes spectacle easy. But spectacle without soul is forgotten in three seconds.',
    frictionHeader: 'The Commodity Trap: Flat Visuals, Zero Soul',
    frictionSubhead: 'Traditional marketing relies on superficial transitions without emotional gravity.',
    badgeText: 'CONTRARIAN DOCTRINE',
  },
  case_study_directing: {
    name: 'The Auteur Case Study',
    hookHeader: 'How Jacquemus & Glazer Direct Visuals That Stop The Feed',
    hookSubhead: 'Dissecting the exact visual staging behind the world’s most celebrated luxury houses.',
    frictionHeader: 'The Mistake: Mimicking Ordinary Commercial Formats',
    frictionSubhead: 'If your creative looks like every other sponsored ad, the thumb keeps scrolling.',
    badgeText: 'DIRECTING BREAKDOWN',
  },
  technical_formula: {
    name: 'The Technical Blueprint',
    hookHeader: 'The Remotion Physics Stack Behind Cannes-Grade AI Cinema',
    hookSubhead: 'How damped harmonic oscillator code gives artificial cameras true organic weight.',
    frictionHeader: 'Linear Keyframes Look Fake (The Uncanny Valley)',
    frictionSubhead: 'Stock easing curves feel synthetic. Physical products require true gravity and inertia.',
    badgeText: 'TECHNICAL BLUEPRINT',
  },
  before_vs_after: {
    name: 'Before vs After / Comparison',
    hookHeader: 'Stock AI Generation vs Auteur Physical Product Cinema',
    hookSubhead: 'The 4 critical directing laws that separate forgotten pixels from iconic brand artifacts.',
    frictionHeader: 'Level 2 Illusionism vs Level 6 Maestro',
    frictionSubhead: 'Level 2 is flashy AI tricks. Level 6 is narrative worldbuilding that drives physical desire.',
    badgeText: 'DIRECTING COMPARISON',
  },
  step_by_step_anatomy: {
    name: 'Step-by-Step Anatomy',
    hookHeader: 'The 8-Stage Visual Literature Architecture Explained',
    hookSubhead: 'From initial curiosity gap to automated inbound commerce conversion.',
    frictionHeader: 'Why Disjointed Carousels Bleed Drop-Off Rate',
    frictionSubhead: 'Without an unbroken 3-act narrative spine, users swipe away on slide 3.',
    badgeText: 'MASTERCLASS ANATOMY',
  },
  curiosity_juxtaposition: {
    name: 'Uncanny Juxtaposition',
    hookHeader: 'Why Placing Impossible Luxury in Concrete Environments Stops The Scroll',
    hookSubhead: 'The psychology of contrast: Brutalist architecture meets hyper-refined luxury goods.',
    frictionHeader: 'Clean Studio Renders Are Boring',
    frictionSubhead: 'Contrast is what triggers pattern interruption in the Instagram feed.',
    badgeText: 'SCROLL-STOPPING PSYCHOLOGY',
  },
  commerce_conversion: {
    name: 'Commerce & Conversion Engine',
    hookHeader: 'How We Turn 1 Reel Comment into Tracked Shopify Checkouts 24/7',
    hookSubhead: 'Integrating high-prestige auteur visuals with autonomous comment-to-DM conversion.',
    frictionHeader: 'The Vanishing ROI of Brand Awareness',
    frictionSubhead: 'Views mean nothing without an automated system converting attention into cashflow.',
    badgeText: 'CONVERSION ARCHITECTURE',
  },
};

/**
 * Builds structured carousel copy rotating through diverse angles and hooks.
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

  // If no specific angle passed, randomly select or rotate from available angles
  const angleKeys = Object.keys(HOOK_ANGLE_BLUEPRINTS) as HookAngleType[];
  const selectedAngle = params.hookAngle || angleKeys[Math.floor(Math.random() * angleKeys.length)];
  const angleDef = HOOK_ANGLE_BLUEPRINTS[selectedAngle];

  const points = extractedPoints.length >= 4
    ? extractedPoints
    : [
        'Sensory Physics First: Prioritize perfume mist diffusion, liquid viscosity, and fabric grain.',
        'Uncanny Juxtaposition: Place impossible luxury inside raw, authentic brutalist environments.',
        'Non-Uniform Pacing: High-velocity sprints for tension, suspended zero-G float for realization.',
        'Exploded Material Anatomy: Translate scent notes into light dispersion and ray-traced prism refractions.',
      ];

  const slides: CarouselSlideCopy[] = [];

  // Slide 1: Visual Hook
  slides.push({
    slideIndex: 1,
    slideType: 'visual_hook',
    header: angleDef.hookHeader,
    subhead: angleDef.hookSubhead,
    badgeText: angleDef.badgeText,
    swissHudMetadata: `01 // ${selectedAngle.toUpperCase().replace(/_/g, ' ')} // SPEC: 2026.01`,
    swipePrompt: 'ENTER THE WORLD →',
    cardIndexText: '01 // 08',
  });

  // Slide 2: The Friction
  slides.push({
    slideIndex: 2,
    slideType: 'friction',
    header: angleDef.frictionHeader,
    subhead: angleDef.frictionSubhead,
    bodyBullets: [
      'You cannot smell a static image or feel a still garment',
      'AI gimmicks without story are forgotten in three seconds',
      'Spectacle without emotional tension leaves zero commercial moat',
    ],
    keyCallout: 'RULE: Story is the only true commercial moat in modern luxury commerce.',
    swissHudMetadata: '02 // THE COGNITIVE FRICTION // NARRATIVE GAP',
    swipePrompt: 'THE SENSORY SHIFT →',
    cardIndexText: '02 // 08',
  });

  // Slide 3: Sensory Discovery (Act I)
  slides.push({
    slideIndex: 3,
    slideType: 'sensory_discovery',
    header: 'Act I: Sensory Physics & Tactile Light',
    subhead: 'Olfactory & tactile cinema: translating invisible physical notes into visible light.',
    bodyBullets: [
      points[0] || 'Liquid Viscosity: Macro droplet dynamics at 1/10,000s shutter speed',
      'Atmospheric Volumetrics: Scent mist expanding in deep shadow wells',
      'Subsurface Scattering: Human skin and physical textures interacting with raking light',
    ],
    keyCallout: 'Human feeling is our objective; physics and code are our instruments.',
    swissHudMetadata: '03 // ACT I: SENSORY PHYSICS // VISUAL GRAVITY',
    swipePrompt: 'EXPLODED ANATOMY →',
    cardIndexText: '03 // 08',
  });

  // Slide 4: Exploded Material Anatomy (Act II)
  slides.push({
    slideIndex: 4,
    slideType: 'exploded_anatomy',
    header: 'Act II: The Exploded Material Architecture',
    subhead: 'Deconstructing the hero physical object down to its micro-craft foundation.',
    bodyBullets: [
      points[3] || 'Prism Refraction: Top, Heart, and Base notes modeled as light dispersion',
      '8K Fabric Drape: Heavy cotton fleece & waterproof tech-bead simulations',
      'Titanium & Glass Tolerances: Sub-millimeter chamfers capturing optical flares',
    ],
    keyCallout: 'Every micro-detail is an intentional testament to human craft.',
    swissHudMetadata: '04 // ACT II: MATERIAL ANATOMY // RAY-TRACED SPEC',
    swipePrompt: 'PHILOSOPHICAL SHIFT →',
    cardIndexText: '04 // 08',
  });

  // Slide 5: The Philosophical Shift
  slides.push({
    slideIndex: 5,
    slideType: 'philosophical_shift',
    header: 'The Inflection: Beyond The Frame, Into Feeling',
    subhead: 'Physical objects are not utilitarian tools. They are armor, identity, and memory.',
    bodyBullets: [
      'Level 5 (The Translator): Connecting physical formulas to universal human emotion',
      'Level 6 (The Maestro): Building cultural gravity that outlives trend cycles',
      points[1] || 'Uncanny Juxtaposition: Luxury anchored in raw, undeniable reality',
    ],
    keyCallout: 'We do not sell products. We direct the feeling of possession.',
    swissHudMetadata: '05 // THE INFLECTION // EMOTIONAL ARMOR',
    swipePrompt: 'UNDENIABLE PROOF →',
    cardIndexText: '05 // 08',
  });

  // Slide 6: Tactile Proof (Act III)
  slides.push({
    slideIndex: 6,
    slideType: 'tactile_proof',
    header: 'Act III: Undeniable Sensory Proof',
    subhead: 'Grounding the narrative in tactile, undeniable physical reality.',
    bodyBullets: [
      points[2] || 'Non-Uniform Pacing: High-velocity tension resolving into zero-G stillness',
      'Subterranean 45Hz Sub-bass: Custom physical sound design anchoring each impact',
      'The Hero Shot: The object landing with absolute gravitational weight',
    ],
    keyCallout: 'Believability is created through physical imperfection and friction.',
    swissHudMetadata: '06 // ACT III: PHYSICAL PROOF // CANNES GRADE',
    swipePrompt: 'MASTER SPEC →',
    cardIndexText: '06 // 08',
  });

  // Slide 7: Product Spec
  slides.push({
    slideIndex: 7,
    slideType: 'product_spec',
    header: 'The Physical Anchor: Master Edition',
    subhead: 'The technical specifications of the complete project\\ciel auteur pipeline.',
    bodyBullets: [
      '4K AI Narrative Master Commercial (Cannes-grade lighting & story spine)',
      'Remotion Programmatic Ad Engine (20+ localized shade/currency variants)',
      'Autonomous DM Conversion Lab (AI Scent & Shade quizzes to checkout)',
    ],
    keyCallout: 'A unified storytelling and commerce architecture built for modern luxury.',
    swissHudMetadata: '07 // THE HERO SPEC // 2026 ARCHITECTURE',
    swipePrompt: 'CLAIM THE BLUEPRINT →',
    cardIndexText: '07 // 08',
  });

  // Slide 8: The Ciel CTA & Digital Product Trigger
  slides.push({
    slideIndex: 8,
    slideType: 'ciel_cta',
    header: 'Unlock The Full Story Spine & Formula',
    subhead: 'Comment "CIEL" below to receive our complete Auteur Directing Playbook & Prompts.',
    bodyBullets: [
      '💬 Comment "CIEL" on this post',
      '📥 Our system will DM you the interactive blueprint & Remotion code templates',
      `🚀 Follow @junnbuilds / project\\ciel for daily auteur luxury directing breakdowns`,
    ],
    keyCallout: '⚡ Instant private delivery to your DMs.',
    swissHudMetadata: '08 // NARRATIVE CTA // AUTONOMOUS CONVERSION',
    swipePrompt: 'DROP "CIEL" BELOW ↓',
    cardIndexText: '08 // 08',
  });

  const instagramCaption = `${angleDef.hookHeader}\n\n"${angleDef.hookSubhead}"\n\nHere is the 8-stage visual literature breakdown from the project\\ciel Master Brand Guidelines:\n\n01 // The Unspoken Truth & Curiosity Gap\n02 // The Commodity Trap & Cognitive Friction\n03 // Act I: Sensory Physics & Macro Viscosity\n04 // Act II: Exploded Material Anatomy\n05 // The Philosophical Shift (Identity as Armor)\n06 // Act III: Undeniable Sourced Proof\n07 // The Hero Object Silhouette\n08 // Autonomous Inbound Conversion\n\n---\n👇 Comment "CIEL" below and our system will instantly DM you the complete interactive Auteur Playbook & prompt blueprints!\n\nproject\\ciel // BEYOND THE FRAME, INTO FEELING.`;

  const hashtags = [
    '#projectciel',
    '#auteurcinema',
    '#visualdirecting',
    '#luxurymarketing',
    '#aicinema',
    '#brandstorytelling',
    '#remotion',
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
