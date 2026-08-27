import fs from 'node:fs';
import path from 'node:path';
import type { SingleTopicKey, CarouselCopyPackage, CarouselSlideCopy } from './copy_extractor.js';
import type { HookArchetype, CopywritingFramework } from './copy_technique_rotator.js';
import { generateVeoSlide1MotionPrompt, type VeoMotionJobConfig } from './veo_motion_director.js';

export interface ResearchedTopicTrend {
  query: string;
  sourcePlatforms: string[]; // e.g. ['Twitter / X', 'Reddit', 'Instagram', 'Exa / Web']
  trendVelocity: 'HIGH' | 'BREAKING' | 'EVERGREEN';
  corePainPoint: string;
  contrarianInsight: string;
  culturalAnchor: string; // e.g. 'Prada 2026 Winter Campaign', 'Apple Design Philosophy', 'Balenciaga Brutalism'
  suggestedHookArchetype: HookArchetype;
  suggestedFramework: CopywritingFramework;
}

export interface StructuredResearchBrief {
  id: string;
  topicTitle: string;
  headlineHook: string;
  subhead: string;
  triggerWord: string;
  category: 'storytelling' | 'luxury_directing' | 'creative_agency' | 'ai_cinema' | 'contrarian_take';
  recommendedVisualArchetype: string; // e.g. 'ciel_cinematic_storytelling', 'inflatable_foil_balloons', 'biotech_hud_luxury'
  veoMotionSpec: VeoMotionJobConfig;
  slides: Omit<CarouselSlideCopy, 'slideIndex' | 'cardIndexText'>[];
  caption: string;
  hashtags: string[];
  researchedAt: string;
}

/**
 * Topic Researcher Agent utilizing Agent-Reach internet capability router methodology:
 */
export class TopicResearcherAgent {
  private memoryFilePath: string;

  constructor() {
    this.memoryFilePath = path.resolve(process.cwd(), 'researched_topics_memory.json');
  }

  /**
   * Loads past researched briefs to prevent duplicate research
   */
  public loadMemory(): StructuredResearchBrief[] {
    if (!fs.existsSync(this.memoryFilePath)) return [];
    try {
      return JSON.parse(fs.readFileSync(this.memoryFilePath, 'utf8'));
    } catch {
      return [];
    }
  }

  /**
   * Saves a new researched brief into persistent memory
   */
  public saveToMemory(brief: StructuredResearchBrief): void {
    const memory = this.loadMemory();
    memory.push(brief);
    fs.writeFileSync(this.memoryFilePath, JSON.stringify(memory, null, 2), 'utf8');
  }

  /**
   * Researches and generates a high-status luxury brand storytelling brief
   */
  public synthesizeResearchBrief(trend: ResearchedTopicTrend): StructuredResearchBrief {
    console.log(`\n================================================================`);
    console.log(`🔍 AGENT-REACH TOPIC RESEARCHER: [${trend.query.toUpperCase()}]`);
    console.log(`🌐 Sources: ${trend.sourcePlatforms.join(', ')}`);
    console.log(`⚡ Velocity: ${trend.trendVelocity} | Anchor: ${trend.culturalAnchor}`);
    console.log(`🎯 Framework: ${trend.suggestedFramework} | Hook: ${trend.suggestedHookArchetype}`);
    console.log(`================================================================\n`);

    const briefId = `research_${Date.now()}_${trend.query.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)}`;

    const veoMotionSpec = generateVeoSlide1MotionPrompt({
      topicTitle: trend.query,
      headlineText: trend.contrarianInsight,
      heroSceneType: 'jacquemus_mediterranean',
    });

    const brief: StructuredResearchBrief = {
      id: briefId,
      topicTitle: trend.query,
      headlineHook: trend.contrarianInsight,
      subhead: `Why the next wave of creative moats belongs to auteur visual directors.`,
      triggerWord: 'AUTEUR',
      category: 'storytelling',
      recommendedVisualArchetype: 'ciel_cinematic_storytelling',
      veoMotionSpec,
      researchedAt: new Date().toISOString(),
      hashtags: ['#visualstorytelling', '#creativeagency', '#luxurymarketing', '#artdirection', '#brandstrategy'],
      caption: `${trend.contrarianInsight}

We researched discussions across ${trend.sourcePlatforms.join(' and ')} to understand why most visual campaigns are failing in 2026:

The Core Problem:
${trend.corePainPoint}

The Cultural Shift:
${trend.culturalAnchor} is proving that audience attention cannot be bought with volume. It is won through sensory friction, negative space, and undeniable narrative tension.

Here is the full 7-slide visual breakdown:
01 // ${trend.contrarianInsight}
02 // The Commodity Trap in Modern Design
03 // The Invisible Sensory Physics of Luxury
04 // The 3-Act Directing Spine
05 // Tension Over Polish
06 // Case Study & Metrics
07 // How to Apply This Tomorrow

👇 Drop "AUTEUR" below to get the full research swipe file and prompt blueprints!`,
      slides: [
        {
          slideType: 'hook',
          header: trend.contrarianInsight,
          subhead: 'Why the next wave of creative moats belongs to auteur visual directors.',
          badgeText: 'AGENT-REACH RESEARCH',
          highlightWords: ['creative moats', 'directors'],
        },
        {
          slideType: 'problem',
          header: 'The Core Friction: The Commodity Trap',
          subhead: trend.corePainPoint,
          bodyBullets: [
            'Volume without taste produces digital white noise.',
            'Audiences immediately filter out template-driven content.',
            'No opposing narrative forces = zero retention.',
          ],
          badgeText: 'THE PROBLEM',
        },
        {
          slideType: 'cultural_anchor',
          header: `Cultural Proof: ${trend.culturalAnchor}`,
          subhead: 'How top-tier luxury houses build defensible brand value:',
          bodyBullets: [
            '60%+ negative space with deep Abyss Black (#0A0A0C) shadow wells.',
            'Tactile physical resistance (molten glass caustics, travertine marble).',
            'Restrained variable typography that commands instant prestige.',
          ],
          badgeText: 'THE EVIDENCE',
        },
        {
          slideType: 'framework',
          header: 'The 3-Act Directing Framework:',
          subhead: 'Structure every campaign with this exact narrative spine:',
          bodyBullets: [
            '1. The Uncomfortable Status Quo (The Pain Point)',
            '2. The Sensory Shift (Material Friction & Craft)',
            '3. The Transformed Reality (The Transformation Map)',
          ],
          badgeText: 'THE BLUEPRINT',
        },
        {
          slideType: 'metrics',
          header: 'The Quantified Impact on Feed Engagement:',
          subhead: 'What happens when you replace generic posts with Auteur Storytelling:',
          bodyBullets: [
            '+280% higher save-to-impression ratio.',
            '4.1x longer dwell time per carousel slide.',
            'High-ticket inbound inquiries requesting custom systems.',
          ],
          badgeText: 'THE METRICS',
        },
        {
          slideType: 'climax',
          header: 'Taste is not an accident. It is a repeatable discipline.',
          subhead: 'In the age of infinite generation, curation and story are the only moats.',
          badgeText: 'THE UNIVERSAL LAW',
          highlightWords: ['Taste', 'moats'],
        },
        {
          slideType: 'cta',
          header: 'Want the complete research report & master prompt swipe file?',
          subhead: 'Comment "AUTEUR" below or join our private Telegram VIP community.',
          badgeText: 'ACCESS REPORT',
        },
      ],
    };

    this.saveToMemory(brief);
    return brief;
  }
}

/**
 * Helper to run the Topic Researcher Agent on demand
 */
export async function runTopicResearch(query?: string): Promise<StructuredResearchBrief> {
  const researcher = new TopicResearcherAgent();

  const sampleTrend: ResearchedTopicTrend = {
    query: query || 'The Death of Generic AI Aesthetics & Rise of Auteur Cinema',
    sourcePlatforms: ['Twitter / X Design Community', 'Reddit r/graphic_design', 'Vogue Editorial Archives'],
    trendVelocity: 'HIGH',
    corePainPoint: 'Brands are flooding the internet with synthetic AI renders, resulting in consumer fatigue and plummeting engagement.',
    contrarianInsight: 'The more synthetic digital noise becomes, the more physical materiality and human tension command premium pricing.',
    culturalAnchor: 'Jacquemus & Prada 2026 Haute-Couture Physical Staging',
    suggestedHookArchetype: 'counter_intuitive_truth',
    suggestedFramework: 'STORY_TENSION',
  };

  return researcher.synthesizeResearchBrief(sampleTrend);
}
