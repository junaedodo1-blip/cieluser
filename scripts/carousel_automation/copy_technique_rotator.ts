import fs from 'node:fs';
import path from 'node:path';
import type { SingleTopicKey, CarouselCopyPackage, CarouselSlideCopy } from './copy_extractor.js';

export type HookArchetype =
  | 'counter_intuitive_truth'
  | 'anecdotal_parable'
  | 'high_status_teardown'
  | 'three_act_transformation'
  | 'curiosity_gap_inversion'
  | 'unfiltered_hot_take'
  | 'quantified_case_study';

export type CopywritingFramework =
  | 'PAS' // Problem - Agitate - Solve
  | 'BAB' // Before - After - Bridge
  | 'STORY_TENSION' // Status Quo - Conflict - Turning Point - Transformation
  | 'TEARDOWN_ANATOMY' // High-Status Anatomy - Hidden Physics - Actionable Blueprint
  | 'CONTRARIAN_MYTH' // Common Belief - Fatal Flaw - The Real Moat
  | 'CURIOSITY_GAP'; // The Unseen Shift - What Changes - The Moat

export interface CopyVariantBlueprint {
  variantId: string;
  topicKey: SingleTopicKey;
  hookArchetype: HookArchetype;
  framework: CopywritingFramework;
  headlineHook: string;
  subhead: string;
  slides: Omit<CarouselSlideCopy, 'slideIndex' | 'cardIndexText'>[];
  caption: string;
  triggerWord: string;
  hashtags: string[];
}

const HISTORY_FILE = 'used_copy_history.json';

export interface CopyHistoryEntry {
  postId?: string;
  topicKey: string;
  variantId: string;
  hookHeadline: string;
  hookArchetype: HookArchetype;
  framework: CopywritingFramework;
  timestamp: string;
  performanceScore?: number;
}

export function loadCopyHistory(): CopyHistoryEntry[] {
  const p = path.resolve(process.cwd(), HISTORY_FILE);
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return [];
  }
}

export function recordCopyUsage(entry: CopyHistoryEntry): void {
  const history = loadCopyHistory();
  history.push(entry);
  fs.writeFileSync(
    path.resolve(process.cwd(), HISTORY_FILE),
    JSON.stringify(history, null, 2),
    'utf8'
  );
}

/**
 * Validates that a proposed copy package has not been used in the last N posts
 */
export function isCopyRecentlyUsed(
  topicKey: string,
  hookHeadline: string,
  lookbackDays = 14
): boolean {
  const history = loadCopyHistory();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - lookbackDays);

  return history.some((item) => {
    const itemDate = new Date(item.timestamp);
    if (itemDate < cutoff) return false;

    // Exact topic match or similar hook headline
    if (item.topicKey === topicKey && item.hookHeadline === hookHeadline) {
      return true;
    }
    return false;
  });
}

/**
 * 7 Diverse Master Copywriting Blueprints with Distinct Hooks & Structures:
 */
export const DIVERSE_COPY_VARIANTS: CopyVariantBlueprint[] = [
  // Variant 1: Contrarian Myth-Busting (PAS Framework)
  {
    variantId: 'contrarian_tension_pas',
    topicKey: 'brand_transformation_story',
    hookArchetype: 'counter_intuitive_truth',
    framework: 'PAS',
    headlineHook: 'The reason your brand feels forgettable isn\'t your aesthetics.',
    subhead: 'It is your total absence of narrative tension.',
    triggerWord: 'TENSION',
    caption: `The reason your brand feels forgettable isn't your typography, your color palette, or your UI.

It is your total lack of narrative tension.

Most brands optimize for pretty visuals. But pretty without tension dies in 3 seconds.

Here is the 7-slide master breakdown on how to engineer visual tension that converts:
01 // Aesthetics don't build memory. Tension does.
02 // The "Commodity Trap" — why flawless polish looks generic.
03 // The Anatomy of Conflict: Why stakes create retention.
04 // The 3-Act Brand Directing Framework.
05 // Sensory Physics: Weight, resistance, and caustics.
06 // Case Study: How luxury houses command 10x margins.
07 // How to direct your next campaign.

👇 Comment "TENSION" below to get our private swipe file!`,
    hashtags: ['#brandstrategy', '#creativeagency', '#visualdirecting', '#luxurymarketing', '#designsystems'],
    slides: [
      {
        slideType: 'hook',
        header: 'The reason your brand feels forgettable isn\'t your aesthetics.',
        subhead: 'It is your total absence of narrative tension.',
        badgeText: 'THE UNCOMFORTABLE TRUTH',
        highlightWords: ['forgettable', 'tension'],
      },
      {
        slideType: 'agitate',
        header: 'Most brands make the mistake of optimizing for "clean".',
        subhead: 'Clean is safe. Clean is polite. And clean is completely invisible in a high-speed social feed.',
        bodyBullets: [
          'No opposing forces = zero curiosity.',
          'When nothing is at risk, nobody cares how it resolves.',
          'Flawless perfection feels like AI plastic.',
        ],
        badgeText: 'THE COMMODITY TRAP',
      },
      {
        slideType: 'turning_point',
        header: 'Look at how Prada, Apple & Jacquemus direct tension:',
        subhead: 'They never show products in sterile white voids. They place them in extreme juxtapositions.',
        bodyBullets: [
          'Brutal raw concrete vs. delicate fluted glass.',
          'Oversized tailoring against minimalist limestone cliffs.',
          'Deep Abyss Black shadow wells (#0A0A0C) that make light feel precious.',
        ],
        badgeText: 'THE LUXURY PARADOX',
      },
      {
        slideType: 'framework',
        header: 'The 3-Step Visual Tension Blueprint:',
        subhead: 'Apply these three friction layers to every campaign:',
        bodyBullets: [
          '1. The Antagonist (What resistance does the hero face?)',
          '2. The Material Texture (Physical weight, grain, and caustics)',
          '3. The Release (The undeniable transformation)',
        ],
        badgeText: 'THE BLUEPRINT',
      },
      {
        slideType: 'proof',
        header: 'When you introduce tension, conversion metrics flip:',
        subhead: 'Audiences don\'t scroll past stories where they have an emotional stake.',
        bodyBullets: [
          '3.4x higher carousel swipe completion rate.',
          '5x higher save-to-reach ratio.',
          'Qualified inbound DMs asking for your full system.',
        ],
        badgeText: 'RETENTION DATA',
      },
      {
        slideType: 'climax',
        header: 'Stop making pretty ads. Start directing memorable cinema.',
        subhead: 'Taste and tension are the only defensible moats left.',
        badgeText: 'THE UNIVERSAL LAW',
        highlightWords: ['cinema', 'defensible moats'],
      },
      {
        slideType: 'cta',
        header: 'Want our private visual directing cheat sheet & prompts?',
        subhead: 'Drop "TENSION" in the comments or join our private Telegram VIP.',
        badgeText: 'ACCESS THE SYSTEM',
      },
    ],
  },

  // Variant 2: Anecdotal Parable (BAB Framework)
  {
    variantId: 'anecdotal_pitch_bab',
    topicKey: 'founder_origin_reframe',
    hookArchetype: 'anecdotal_parable',
    framework: 'BAB',
    headlineHook: 'An agency founder spent $80,000 on a rebrand that tanked sales by 40%.',
    subhead: 'Here is the one invisible flaw nobody in the room caught:',
    triggerWord: 'REBRAND',
    caption: `An agency founder spent $80,000 on an immaculate rebrand. New logo. Custom typography. 3D motion assets.

Within 60 days, inbound sales dropped by 40%.

Why?
Because the entire rebrand told a story about the agency — instead of the transformation their client experiences.

Here is the breakdown of what went wrong and how to fix it:
01 // The $80k Rebrand Mistake.
02 // The Vanity Metric Trap.
03 // The "Before-and-After" Translation Map.
04 // Why founders talk about history instead of outcome.
05 // The 3-minute framing fix.
06 // Results: Turning low conversions into high-ticket pipeline.

👇 Drop "REBRAND" below to get our Rebrand Audit Checklist!`,
    hashtags: ['#rebrand', '#founderlessons', '#creativeagency', '#conversionrate', '#marketingstrategy'],
    slides: [
      {
        slideType: 'hook',
        header: 'An agency founder spent $80,000 on a rebrand that tanked sales by 40%.',
        subhead: 'Here is the one invisible flaw nobody in the room caught:',
        badgeText: 'CASE STUDY',
        highlightWords: ['$80,000', 'tanked sales'],
      },
      {
        slideType: 'problem',
        header: 'The agency spent 6 months designing for awards, not buyers.',
        subhead: 'Every single slide on their deck started with "Our Journey" and "Our Philosophy".',
        bodyBullets: [
          'Buyers don\'t care how long you took to build your company.',
          'They care what changes for them the minute they hire you.',
          'Self-obsessed copy kills commercial intent.',
        ],
        badgeText: 'THE VANITY TRAP',
      },
      {
        slideType: 'bridge',
        header: 'We rebuilt their entire narrative with one simple rule:',
        subhead: 'The Before-State vs. After-State Bridge.',
        bodyBullets: [
          'Before: Frustrated, stuck with generic commodity deliverables.',
          'Friction: Wasting hundreds of hours on low-ticket revisions.',
          'After: The undisputed category authority commanding 5-figure retainers.',
        ],
        badgeText: 'THE PIVOT',
      },
      {
        slideType: 'framework',
        header: 'Everything in your brand must sit on that transformation line.',
        subhead: 'If a headline doesn\'t move the prospect from Before to After, cut it.',
        bodyBullets: [
          'Hero Section: Establish the painful status quo immediately.',
          'Middle Section: Introduce the proprietary transformation mechanism.',
          'Footer: Clear, low-friction invitation to step into the future.',
        ],
        badgeText: 'EXECUTION GUIDE',
      },
      {
        slideType: 'result',
        header: 'The outcome after launching the narrative overhaul:',
        subhead: 'Within 30 days of replacing self-centered copy with the Transformation Map:',
        bodyBullets: [
          '+140% increase in qualified sales call bookings.',
          'Average deal size expanded from $4.5k to $18k.',
          'Zero pushback on premium pricing.',
        ],
        badgeText: 'THE METRICS',
      },
      {
        slideType: 'climax',
        header: 'Your brand is not the hero of the story. Your customer is.',
        subhead: 'You are simply the guide who gives them the map.',
        badgeText: 'THE GOLDEN RULE',
        highlightWords: ['hero', 'guide'],
      },
      {
        slideType: 'cta',
        header: 'Want to audit your brand story in 10 minutes?',
        subhead: 'Comment "REBRAND" to get our private Storytelling Audit Framework.',
        badgeText: 'FREE AUDIT',
      },
    ],
  },

  // Variant 3: High-Status Masterclass Teardown (TEARDOWN_ANATOMY Framework)
  {
    variantId: 'high_status_anatomy',
    topicKey: 'auteur_cultural_moat_story',
    hookArchetype: 'high_status_teardown',
    framework: 'TEARDOWN_ANATOMY',
    headlineHook: 'How Prada, Jacquemus & Apple build visual authority without saying a word.',
    subhead: 'The 3 hidden directing secrets of high-status luxury houses:',
    triggerWord: 'AUTEUR',
    caption: `How do brands like Prada, Jacquemus, and Apple command instant reverence before you even read a word of copy?

It is not luck. It is a calculated visual directing system based on 3 sensory rules:

1. Negative Space Discipline (Abyss Black wells & massive margins)
2. Material Tactility (Physical resistance, glass refractions, stone)
3. Typographic Hierarchy (Avant-garde editorial contrast)

Swipe through for the complete high-status design teardown.

👇 Comment "AUTEUR" to receive the master visual prompt blueprints!`,
    hashtags: ['#luxurybranding', '#artdirection', '#creativeleadership', '#prada', '#jacquemus'],
    slides: [
      {
        slideType: 'hook',
        header: 'How Prada, Jacquemus & Apple build visual authority without saying a word.',
        subhead: 'The 3 hidden directing secrets of high-status luxury houses:',
        badgeText: 'AUTEUR DIRECTING',
        highlightWords: ['visual authority', 'secrets'],
      },
      {
        slideType: 'secret_1',
        header: '01 // Negative Space Discipline',
        subhead: 'Cheap design fills every corner. Luxury design lets the silence speak.',
        bodyBullets: [
          'High-status brands use 60%+ negative space.',
          'Abyss Black (#0A0A0C) shadow wells create prestige.',
          'When you give elements room to breathe, value skyrockets.',
        ],
        badgeText: 'PILLAR 01',
      },
      {
        slideType: 'secret_2',
        header: '02 // Physical Tactility & Weight',
        subhead: 'Digital visuals feel cheap when they lack physical friction.',
        bodyBullets: [
          'Macro reflections on molten fluted glass.',
          'Brushed titanium hardware with authentic micro-scratches.',
          '35mm optical grain that proves human presence.',
        ],
        badgeText: 'PILLAR 02',
      },
      {
        slideType: 'secret_3',
        header: '03 // Typographic Restraint',
        subhead: 'Banish 5 different font sizes. Pick two contrasting voices and hold the line.',
        bodyBullets: [
          'High-contrast editorial serif (Playfair/Didot) for thesis punchlines.',
          'Technical Swiss sans-serif (Lato/Archivo) for structural metadata.',
          'Zero artificial badges, zero cheap cartoon stickers.',
        ],
        badgeText: 'PILLAR 03',
      },
      {
        slideType: 'synthesis',
        header: 'The Formula: Restraint + Materiality = Authority.',
        subhead: 'You don\'t need a $200k budget to direct at this level in 2026.',
        bodyBullets: [
          'Lock your reference image aesthetic first.',
          'Direct the scene with optical camera parameters (18mm, 35mm).',
          'Enforce strict color palettes with zero plastic sheen.',
        ],
        badgeText: 'THE SYNTHESIS',
      },
      {
        slideType: 'climax',
        header: 'In an era of infinite AI noise, taste is the only defensible moat.',
        subhead: 'Anyone can generate pixels. Only auteurs direct feeling.',
        badgeText: 'THE THESIS',
        highlightWords: ['taste', 'feeling'],
      },
      {
        slideType: 'cta',
        header: 'Ready to upgrade your brand to auteur status?',
        subhead: 'Drop "AUTEUR" below for our full high-fashion prompt swipe file.',
        badgeText: 'TELEGRAM VIP',
      },
    ],
  },
];

/**
 * Gets the next unused copy package variant for the specified topic
 */
export function getNextUniqueCopyVariant(topicKey?: SingleTopicKey): CopyVariantBlueprint {
  const history = loadCopyHistory();
  const recentVariantIds = new Set(history.slice(-10).map((h) => h.variantId));

  // Find a variant that hasn't been used recently
  const candidate = DIVERSE_COPY_VARIANTS.find((v) => {
    if (topicKey && v.topicKey !== topicKey) return false;
    return !recentVariantIds.has(v.variantId);
  });

  if (candidate) return candidate;

  // Fallback: Pick the least recently used variant
  return DIVERSE_COPY_VARIANTS[0]!;
}
