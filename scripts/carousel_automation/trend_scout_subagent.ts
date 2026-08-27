import { globalCowHarness } from './cowagent_harness.js';
import { loadAnalyticsState } from './analytics_evaluator.js';
import { generateCarouselCopy, type CarouselCopyPackage, type SingleTopicKey } from './copy_extractor.js';

export interface TrendingTopicInsight {
  topicKey: SingleTopicKey | string;
  topicTitle: string;
  nichePillar:
    | 'ai_visual_directing'
    | 'viral_marketing'
    | 'aesthetic_hacks'
    | 'automation_funnels'
    | 'motion_3d'
    | 'founder_storytelling'
    | 'visual_directing'
    | 'narrative_craft'
    | 'brand_philosophy';
  viralHookArchetype: string;
  whyItPerforms: string;
  predictedSaveRate: number; // e.g. 0.85
  triggerWord: string;
  bulletProofThesis: string;
  slideCopyBlueprint: {
    slide1Hook: string;
    slide2MistakeOrTension: string;
    slide3Step1: string;
    slide4Step2PromptCode: string;
    slide5Step3Secret: string;
    slide6SaveableCheatSheet: string;
    slide7Routine: string;
    slide8CallToAction: string;
  };
}

/**
 * High-Performing Outlier Topics Database
 * Curated using viral-short-form-ideas frameworks (contrarian takes, actionable blueprints, cheat sheets).
 */
export const OUTLIER_TOPIC_REGISTRY: Record<string, TrendingTopicInsight> = {
  nano_banana_posters: {
    topicKey: 'nano_banana_posters',
    topicTitle: 'How to Make $5,000 Luxury Brand Posters in Nano Banana (In 3 Minutes)',
    nichePillar: 'ai_visual_directing',
    viralHookArchetype: 'Cost Confession / Speed Advantage',
    whyItPerforms: 'Directly addresses how to achieve high-ticket agency visual quality with zero 3D software.',
    predictedSaveRate: 0.92,
    triggerWord: 'POSTER',
    bulletProofThesis: 'Great design is about reference-locking and layout rules, not typing 50 random prompt buzzwords.',
    slideCopyBlueprint: {
      slide1Hook: 'how to make $5k luxury brand posters in 3 minutes.',
      slide2MistakeOrTension: 'why 90% of ai posters look cheap and messy.',
      slide3Step1: 'step 1: pick a grid reference layout.',
      slide4Step2PromptCode: 'step 2: the exact copy-paste prompt formula.',
      slide5Step3Secret: 'step 3: add retro stickers & pastel highlights.',
      slide6SaveableCheatSheet: 'the saveable poster cheat sheet.',
      slide7Routine: 'the 3-minute daily production routine.',
      slide8CallToAction: 'want the free prompt pack + templates?',
    },
  },
  jacquemus_street_art: {
    topicKey: 'jacquemus_street_art',
    topicTitle: 'Scale Disruption & Surreal Street Art: The Jacquemus Strategy',
    nichePillar: 'aesthetic_hacks',
    viralHookArchetype: 'Big Brand Breakdown / Outlier Case Study',
    whyItPerforms: 'Explains the viral billboard and CGI marketing mechanism behind billion-dollar fashion virality.',
    predictedSaveRate: 0.88,
    triggerWord: 'SCALE',
    bulletProofThesis: 'Place familiar everyday objects at 50x giant scale in real architectural city streets to stop thumb scrolling.',
    slideCopyBlueprint: {
      slide1Hook: 'the jacquemus secret: scale disruption in public streets.',
      slide2MistakeOrTension: 'why normal product ads get zero attention.',
      slide3Step1: 'rule 1: choose 1 recognizable everyday object.',
      slide4Step2PromptCode: 'rule 2: 50x giant scale in realistic urban architecture.',
      slide5Step3Secret: 'rule 3: 50mm optical prime with real sunlight caustics.',
      slide6SaveableCheatSheet: 'the viral scale disruption cheat sheet.',
      slide7Routine: 'how to test 3 street concepts in 5 minutes.',
      slide8CallToAction: 'get the complete surreal prompt library free.',
    },
  },
  viral_hook_secrets: {
    topicKey: 'viral_hook_secrets',
    topicTitle: 'The 1.5-Second Visual Hook Blueprint (Stopping the Scroll)',
    nichePillar: 'viral_marketing',
    viralHookArchetype: 'Retention Anatomy / Mathematical Formula',
    whyItPerforms: 'Solves the #1 problem of creators and agencies: skipping and low retention on slide 1.',
    predictedSaveRate: 0.95,
    triggerWord: 'HOOKS',
    bulletProofThesis: 'The 3-layer hook (Dominant visual centerpiece + High-contrast typography + Floating sticker badge) stops 80% of skips.',
    slideCopyBlueprint: {
      slide1Hook: 'the 1.5-second visual hook formula that stops the scroll.',
      slide2MistakeOrTension: 'why viewers swipe past your first slide.',
      slide3Step1: 'layer 1: dominant optical centerpiece.',
      slide4Step2PromptCode: 'layer 2: bold stacked lowercase serif title.',
      slide5Step3Secret: 'layer 3: tilted high-contrast 3D accent decals.',
      slide6SaveableCheatSheet: 'the scroll-stopper visual layout blueprint.',
      slide7Routine: 'how to A/B test 5 hooks before publishing.',
      slide8CallToAction: 'download the 20 viral hook templates free.',
    },
  },
  automated_dm_sales: {
    topicKey: 'automated_dm_sales',
    topicTitle: 'How to Turn Instagram Comments into Automatic Sales 24/7',
    nichePillar: 'automation_funnels',
    viralHookArchetype: 'Passive Income & Conversion System',
    whyItPerforms: 'Shows direct monetization path for creative carousels with zero manual DM handling.',
    predictedSaveRate: 0.91,
    triggerWord: 'SALES',
    bulletProofThesis: 'Replace link-in-bio dead ends with 1-word comment keywords that trigger instant ManyChat rich media delivery.',
    slideCopyBlueprint: {
      slide1Hook: 'how to turn 1 simple comment into sales while you sleep.',
      slide2MistakeOrTension: 'why link-in-bio kills 85% of your conversions.',
      slide3Step1: 'step 1: pick a 1-word single-noun keyword.',
      slide4Step2PromptCode: 'step 2: automated instant DM webhook payload.',
      slide5Step3Secret: 'step 3: 2-step interactive value ladder delivery.',
      slide6SaveableCheatSheet: 'the high-converting comment-to-DM cheat sheet.',
      slide7Routine: 'how to launch a live campaign in under 10 minutes.',
      slide8CallToAction: 'get the pre-built ManyChat automation flow free.',
    },
  },
  higgsfield_video_directing: {
    topicKey: 'higgsfield_video_directing',
    topicTitle: 'Directing 8K Cinema Video with Zero Prompter Drift',
    nichePillar: 'motion_3d',
    viralHookArchetype: 'Director Masterclass / Anti-AI Video Artifacts',
    whyItPerforms: 'Solves AI video morphing and face-drift with strict camera FOV locks and physics doctrine.',
    predictedSaveRate: 0.89,
    triggerWord: 'CINEMA',
    bulletProofThesis: 'Lock FOV degrees, gravity timing, and anamorphic lens glass to eliminate AI camera jitter.',
    slideCopyBlueprint: {
      slide1Hook: 'how to direct cinematic AI video without messy prompt drift.',
      slide2MistakeOrTension: 'why AI camera movements look cheap and wobbly.',
      slide3Step1: 'rule 1: lock your lens FOV to 50mm or 85mm prime.',
      slide4Step2PromptCode: 'rule 2: describe real gravity physics and momentum.',
      slide5Step3Secret: 'rule 3: directional key light with atmospheric haze.',
      slide6SaveableCheatSheet: 'the 8K cinema director prompt cheat sheet.',
      slide7Routine: 'the 4-step multi-shot storyboard workflow.',
      slide8CallToAction: 'grab the complete 8K cinema prompt swipe file.',
    },
  },
  spring_physics_video: {
    topicKey: 'spring_physics_video',
    topicTitle: 'Natural Spring Physics: Making Digital UI Feel Heavy & Tactile',
    nichePillar: 'motion_3d',
    viralHookArchetype: 'Micro-Interaction Physics / Design Craft',
    whyItPerforms: 'Appeals to designers and product creators who want buttery smooth 60fps tactile feel.',
    predictedSaveRate: 0.87,
    triggerWord: 'PHYSICS',
    bulletProofThesis: 'Linear easing feels robotic; mass, stiffness, and damping create real physical weight.',
    slideCopyBlueprint: {
      slide1Hook: 'the secret to natural spring physics in digital design.',
      slide2MistakeOrTension: 'why linear animations look stiff and robotic.',
      slide3Step1: 'rule 1: set mass = 1, stiffness = 120, damping = 14.',
      slide4Step2PromptCode: 'rule 2: add micro-overshoot and settle time.',
      slide5Step3Secret: 'rule 3: directional momentum on release.',
      slide6SaveableCheatSheet: 'the ultimate spring physics configuration matrix.',
      slide7Routine: 'how to apply springs in code or design tools.',
      slide8CallToAction: 'get the copy-paste spring physics presets free.',
    },
  },
  brand_transformation_story: {
    topicKey: 'brand_transformation_story',
    topicTitle: 'Nobody Remembers Your Origin Story. They Remember The Transformation.',
    nichePillar: 'viral_marketing',
    viralHookArchetype: 'Brand Transformation / Storytelling Case Study',
    whyItPerforms: 'High-emotion founder & brand narrative reframe with full-bleed cinematic photography that earns massive saves and shares.',
    predictedSaveRate: 0.96,
    triggerWord: 'STORY',
    bulletProofThesis: 'Nobody remembers your origin timeline. They remember the transformation they got to be part of.',
    slideCopyBlueprint: {
      slide1Hook: 'Your brand needs to tell a story.',
      slide2MistakeOrTension: 'Most brands tell a story about themselves. Customers do not care how you got here.',
      slide3Step1: 'The 10-Minute Origin Pitch Trap: Investors checked out by minute two.',
      slide4Step2PromptCode: "The story that actually sells isn't about your history. It is a before and after transformation map.",
      slide5Step3Secret: "Most 'brand stories' skip the tension entirely. A story without a problem is just a timeline.",
      slide6SaveableCheatSheet: 'Nobody remembers your founding story. They remember the transformation they got to be part of.',
      slide7Routine: 'The 3-Step Story Engine: Old World → Catalyst → Transformed Identity.',
      slide8CallToAction: 'Want a brand story people actually see themselves in? Drop "STORY" below for Telegram VIP access.',
    },
  },
  ciel_invisible_craft_story: {
    topicKey: 'ciel_invisible_craft_story',
    topicTitle: 'Why We Spent 3 Months Obsessed Over a 0.5-Second Animation: The Soul of Physical Luxury',
    nichePillar: 'ai_visual_directing',
    viralHookArchetype: 'Auteur Craft Obsession / Commercial Moat',
    whyItPerforms: 'Directly addresses how luxury brands command extreme pricing power and emotional loyalty through obsessive tactile sensory details.',
    predictedSaveRate: 0.97,
    triggerWord: 'CRAFT',
    bulletProofThesis: 'Spectacle without soul is forgotten in three seconds. Story and physical sensory physics make brands immortal.',
    slideCopyBlueprint: {
      slide1Hook: 'why we spent 3 months obsessed over a 0.5-second animation.',
      slide2MistakeOrTension: 'the commodity trap: why 99% of AI visuals feel hollow and cheap.',
      slide3Step1: 'sensory physics: capturing real material weight, glass refraction, and fabric weave.',
      slide4Step2PromptCode: 'the 3-act narrative spine: Tension creates attention, physical objects deliver the transformation.',
      slide5Step3Secret: 'auteur lighting doctrine: deep Abyss Black shadow wells give light its prestige.',
      slide6SaveableCheatSheet: 'the project\\ciel visual directing cheat sheet.',
      slide7Routine: 'the 3-minute auteur directing workflow with Banana Pro Director 3.0.',
      slide8CallToAction: 'want the master project\\ciel brand directing playbook?',
    },
  },
  ciel_uncanny_luxury_story: {
    topicKey: 'ciel_uncanny_luxury_story',
    topicTitle: 'Why Billion-Dollar Fashion Houses Shoot Luxury In Raw Subways: The Law of Uncanny Juxtaposition',
    nichePillar: 'aesthetic_hacks',
    viralHookArchetype: 'Visual Psychology / Cultural Juxtaposition',
    whyItPerforms: 'Explains the subconscious curiosity engine behind high-fashion surrealism and unexpected contrast.',
    predictedSaveRate: 0.95,
    triggerWord: 'JUXTA',
    bulletProofThesis: 'Predictable elegance is invisible. Colliding impossible luxury into raw gritty reality commands immediate attention.',
    slideCopyBlueprint: {
      slide1Hook: 'why billion-dollar fashion houses shoot luxury in raw subways.',
      slide2MistakeOrTension: 'the sterile studio paradox: why ordinary ads get ignored.',
      slide3Step1: 'law of uncanny juxtaposition: colliding opposites (High Culture + Raw Reality).',
      slide4Step2PromptCode: 'how contrast creates instant status & curiosity gaps.',
      slide5Step3Secret: 'the 35mm prime camera setup for juxtaposition plates.',
      slide6SaveableCheatSheet: 'the uncanny juxtaposition cheat sheet matrix.',
      slide7Routine: 'the 3-step juxtaposition directing engine.',
      slide8CallToAction: 'want the full project\\ciel visual directing swipe file?',
    },
  },
  founder_origin_reframe: {
    topicKey: 'founder_origin_reframe',
    topicTitle: 'Why Great Founders Never Pitch What They Built: The Psychology of Visionary Stories',
    nichePillar: 'founder_storytelling',
    viralHookArchetype: 'Founder Pitch Reframe / Hero Journey',
    whyItPerforms: 'Directly addresses founders and creators struggling to articulate why their work matters.',
    predictedSaveRate: 0.98,
    triggerWord: 'FOUNDER',
    bulletProofThesis: 'Nobody buys your technology. They buy the transformed version of themselves you make possible.',
    slideCopyBlueprint: {
      slide1Hook: 'Your pitch is losing everyone in minute two.',
      slide2MistakeOrTension: 'Most founders explain what they built: line items, product modules, tech specs.',
      slide3Step1: 'Steve Jobs did not sell 5GB of storage. He sold 1,000 songs in your pocket.',
      slide4Step2PromptCode: 'The 3-Act Founder Spine: Broken Old World → Epiphany → Transformed Human.',
      slide5Step3Secret: 'A founder story without sacrifice is just corporate PR.',
      slide6SaveableCheatSheet: 'Nobody buys your product. They buy the future you make possible.',
      slide7Routine: 'The 3-Step Founder Storytelling Framework.',
      slide8CallToAction: 'Want the visionary founder storytelling playbook? Drop "FOUNDER" below.',
    },
  },
  visual_directing_cinema_story: {
    topicKey: 'visual_directing_cinema_story',
    topicTitle: 'How Cinema Lighting & Negative Space Create Subconscious Luxury Value',
    nichePillar: 'visual_directing',
    viralHookArchetype: 'Cinema Directing / Auteur Lighting',
    whyItPerforms: 'Explains the optical craft behind why high-end films look expensive and cheap AI looks plastic.',
    predictedSaveRate: 0.96,
    triggerWord: 'CINEMA',
    bulletProofThesis: 'Cheap visuals flood the frame with light. Auteur cinema uses deep shadow wells to make the light valuable.',
    slideCopyBlueprint: {
      slide1Hook: 'Why cheap visuals look fake in three seconds.',
      slide2MistakeOrTension: 'The flat studio lighting trap: uniform brightness destroys depth and prestige.',
      slide3Step1: 'The 35mm Prime Lens Doctrine: Optical glass falloff over digital perfection.',
      slide4Step2PromptCode: 'Directional raking key light at 80 degrees sculpts physical micro-texture.',
      slide5Step3Secret: 'Clutter signals panic. Abyss Black negative space signals dominance.',
      slide6SaveableCheatSheet: 'The Cinema Visual Directing Specification Matrix.',
      slide7Routine: 'The 3-Minute Cinema Lighting Workflow.',
      slide8CallToAction: 'Want the master cinema visual directing swipe file? Drop "CINEMA" below.',
    },
  },
  transformation_framework_story: {
    topicKey: 'transformation_framework_story',
    topicTitle: 'The 3-Act Hero Arc: The Only Storytelling Formula That Never Ages',
    nichePillar: 'narrative_craft',
    viralHookArchetype: 'Universal Storytelling Engine',
    whyItPerforms: 'Gives creators and brand builders a foolproof, timeless 3-act framework for any campaign.',
    predictedSaveRate: 0.97,
    triggerWord: 'HERO',
    bulletProofThesis: 'Information tells. Transformation sells. Every story that moves people follows the 3-act spine.',
    slideCopyBlueprint: {
      slide1Hook: 'Every story that moved you followed this exact spine.',
      slide2MistakeOrTension: 'Linear descriptions put audiences to sleep because there is zero emotional velocity.',
      slide3Step1: 'Act I: The Unspoken Tension — Name the friction everyone feels.',
      slide4Step2PromptCode: 'Act II: The Sensory Struggle — Show why conventional advice fails.',
      slide5Step3Secret: 'Act III: The New Identity — Reveal who the protagonist becomes.',
      slide6SaveableCheatSheet: 'The Universal 3-Act Storytelling Cheat Sheet.',
      slide7Routine: 'The 3-Step Hero Story Engine.',
      slide8CallToAction: 'Want the complete 3-Act Storytelling Playbook? Drop "HERO" below.',
    },
  },
  auteur_cultural_moat_story: {
    topicKey: 'auteur_cultural_moat_story',
    topicTitle: 'When Everything Is Generated in 3 Seconds: Taste and Story Are The Only Moat',
    nichePillar: 'brand_philosophy',
    viralHookArchetype: 'Cultural Moat & Taste Philosophy',
    whyItPerforms: 'High-status cultural thesis on why craft, story, and taste become infinitely more valuable in an AI era.',
    predictedSaveRate: 0.99,
    triggerWord: 'TASTE',
    bulletProofThesis: 'When generation speed approaches zero, discernment and storytelling become the only defensible luxury.',
    slideCopyBlueprint: {
      slide1Hook: 'When anyone can generate pixels, taste is the only moat.',
      slide2MistakeOrTension: 'The commodity deluge: why generic AI content is invisible to audiences.',
      slide3Step1: 'Pillar 1: Physical Materiality — Real texture and lived-in friction.',
      slide4Step2PromptCode: 'Pillar 2: Extreme Restraint — Luxury is what you have the discipline to withhold.',
      slide5Step3Secret: 'Pillar 3: Cultural Narrative — Products become obsolete; stories become mythology.',
      slide6SaveableCheatSheet: 'The Auteur Taste & Brand Moat Manifesto.',
      slide7Routine: 'The 3 Pillars of an Indestructible Brand Moat.',
      slide8CallToAction: 'Want to master auteur visual storytelling? Drop "TASTE" below.',
    },
  },
};

/**
 * Trend Scout Subagent:
 * 1. Analyzes high-performing outlier ideas across niche pillars.
 * 2. Selects or ranks the highest predicted engagement topic.
 * 3. Extracts and packages the structured 8-slide copy.
 * 4. Ingests the insight into CowAgent memory and passes to Visual Director.
 */
export class TrendScoutSubagent {
  /**
   * Discovers and evaluates candidate topics, picking the optimal viral angle.
   */
  public async scoutTopPerformingTopic(params: {
    explicitTopicKey?: SingleTopicKey | string;
    preferredPillar?: string;
    excludeTopics?: string[];
    cowBranchId?: string;
  }): Promise<{ insight: TrendingTopicInsight; copyPackage: CarouselCopyPackage }> {
    const { explicitTopicKey, preferredPillar, excludeTopics = [], cowBranchId } = params;

    console.log(`\n🔍 [SUBAGENT: trend_scout_subagent] Scanning for high-performing viral topics...`);

    let selected: TrendingTopicInsight;
    if (explicitTopicKey && OUTLIER_TOPIC_REGISTRY[explicitTopicKey]) {
      selected = OUTLIER_TOPIC_REGISTRY[explicitTopicKey];
    } else {
      const candidates = Object.values(OUTLIER_TOPIC_REGISTRY).filter(
        (t) => !excludeTopics.includes(t.topicKey) && (!preferredPillar || t.nichePillar === preferredPillar)
      );

      const pool = candidates.length > 0 ? candidates : Object.values(OUTLIER_TOPIC_REGISTRY);

      // Sort by predicted save/bookmark rate multiplied by historical popularity weights
      const analyticsState = loadAnalyticsState();
      const topicWeights = analyticsState.topicWeights || {};
      pool.sort((a, b) => {
        const scoreA = a.predictedSaveRate * (topicWeights[a.topicKey] || 1.0);
        const scoreB = b.predictedSaveRate * (topicWeights[b.topicKey] || 1.0);
        return scoreB - scoreA;
      });
      selected = pool[0]!;
    }
    const selectedInsight = selected;

    console.log(`   ✨ Top Outlier Found: "${selectedInsight.topicTitle}"`);
    console.log(`   🎯 Pillar: [${selectedInsight.nichePillar}] | Hook Archetype: "${selectedInsight.viralHookArchetype}"`);
    console.log(`   📈 Predicted Save Rate: ${(selectedInsight.predictedSaveRate * 100).toFixed(0)}%`);
    console.log(`   💡 Core Thesis: "${selectedInsight.bulletProofThesis}"`);

    // Generate structured copy package
    const copyPackage = generateCarouselCopy({
      topicKey: selectedInsight.topicKey as SingleTopicKey,
    });

    if (cowBranchId) {
      globalCowHarness.ingest(cowBranchId, {
        key: 'trend_scout_selection',
        value: {
          insight: selectedInsight,
          copyPackage,
        },
      });
      globalCowHarness.checkpoint(cowBranchId, 'topic_scouted_and_locked');
    }

    return {
      insight: selectedInsight,
      copyPackage,
    };
  }
}

export const globalTrendScout = new TrendScoutSubagent();
