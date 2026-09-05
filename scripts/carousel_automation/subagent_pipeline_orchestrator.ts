import fs from 'node:fs';
import path from 'node:path';
import { generateCarouselCopy, type SingleTopicKey, type CarouselCopyPackage } from './copy_extractor.js';
import {
  getDeconstructedReference,
  getNextRotatingReferenceStyle,
  type DeconstructedReferenceStyle,
} from './reference_deconstructor.js';
import { buildNanoBananaVariationBatch, type NanoBananaSlidePromptJob } from './nano_banana_generator.js';
import { generateDigitalLeadMagnet } from './lead_magnet_generator.js';
import { buildBufferInstagramCarouselPayload, INSTAGRAM_DEFAULT_CHANNEL_ID } from './buffer_publisher.js';
import { recordPendingNotification } from './fallback_checker.js';
import { runMultiPlatformRepurposing, type RepurposedPackage } from './repurposing_engine.js';
import { recordPublishedPost } from './analytics_evaluator.js';
import { globalCowHarness } from './cowagent_harness.js';
import { globalTrendScout, type TrendingTopicInsight } from './trend_scout_subagent.js';
import { dispatchToTelegramGroup } from './telegram_publisher.js';
import { integrateCheatOnContent } from './cheat_integration.js';

export interface PipelineExecutionOptions {
  topicKey?: SingleTopicKey;
  referenceStyleKey?: string;
  triggerWord?: string;
  slideImagePaths?: string[];
  publicImageUrls?: string[];
}

export interface PipelineExecutionReport {
  executionId: string;
  status: 'success' | 'failed';
  agentsInvolved: string[];
  topic: string;
  topicKey: string;
  trendInsight?: TrendingTopicInsight;
  referenceImage: string;
  referenceStyleName: string;
  referenceStyleKey: string;
  promptsGenerated: number;
  promptsDir: string;
  leadMagnetPath: string;
  linkedInPdfPath?: string;
  linkedInPostPath?: string;
  twitterThreadPath?: string;
  cowBranchId?: string;
  variationBatch: NanoBananaSlidePromptJob[];
}

const STATE_FILE = 'carousel_automation_state.json';

function loadState(): any {
  const p = path.resolve(process.cwd(), STATE_FILE);
  if (!fs.existsSync(p)) {
    return { usedStyles: [], usedTopics: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return { usedStyles: [], usedTopics: [] };
  }
}

function saveState(state: any) {
  const p = path.resolve(process.cwd(), STATE_FILE);
  let currentState: any = {};
  if (fs.existsSync(p)) {
    try {
      currentState = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch {}
  }
  const mergedState = {
    ...currentState,
    ...state,
    usedStyles: state.usedStyles || [],
    usedTopics: state.usedTopics || [],
  };
  fs.writeFileSync(p, JSON.stringify(mergedState, null, 2), 'utf8');
}

/**
 * Executes the CowAgent-Harnessed Autonomous Subagent Fleet:
 * 1. [CowAgent Harness]: Forks an isolated COW branch for memory safety & lineage.
 * 2. [trend_scout_subagent]: Discovers high-performing viral outlier topics and generates structured copy.
 * 3. [visual_director_subagent]: Rotates reference pictures & deconstructs into Nano Banana 2 style blueprint.
 * 4. [nano_banana_engine]: Generates slide-by-slide Nano Banana 2 variation prompts.
 * 5. [distribution_lead_subagent]: Generates interactive lead magnet with 1-click copy buttons.
 * 6. [repurposing_subagent]: Exports LinkedIn PDF & Anti-AI Post + Twitter Algorithm Optimized 9-tweet thread.
 * 7. [analytics_evaluator_subagent]: Logs published post in history and CowAgent master base.
 */
export async function executeSubagentPipeline(options: PipelineExecutionOptions = {}): Promise<PipelineExecutionReport> {
  const executionId = `exec_${Date.now()}`;
  console.log(`\n================================================================`);
  console.log(`🐮 COWAGENT HARNESSED SUBAGENT FLEET LAUNCHED [${executionId}]`);
  console.log(`================================================================`);

  // --- COWAGENT HARNESS: Branching Memory ---
  const cowBranch = globalCowHarness.branch({
    label: `run_${executionId}`,
    subagentName: 'orchestrator',
    metadata: { options },
  });

  const state = loadState();
  const calendarDay = state.currentCalendarDay || 1;

  // --- SUBAGENT 1: Trend & 30-Day Content Calendar Scout ---
  console.log(`\n🕵️ [SUBAGENT 1: trend_scout_subagent] Initialized.`);
  const { generateCarouselCopyFromCalendar } = await import('./copy_extractor.js');
  const copyPackage = generateCarouselCopyFromCalendar(calendarDay);
  const selectedTopicKey = copyPackage.topicKey as SingleTopicKey;

  const trendInsight = {
    nichePillar: `Day ${calendarDay} Calendar Pillar`,
    topicTitle: copyPackage.topicTitle,
    viralHookArchetype: '3-Act Brand Narrative / Cultural Gravity',
    bulletProofThesis: copyPackage.hookHeadline,
    predictedSaveRate: 0.95,
    topicKey: selectedTopicKey,
    triggerWord: copyPackage.triggerWord,
  };

  console.log(`   - Calendar Day: ${calendarDay} of 30`);
  console.log(`   - Selected Topic: "${copyPackage.topicTitle}"`);
  console.log(`   - Trigger Word: "${copyPackage.triggerWord}"`);
  console.log(`   - Slide 1 Hook: "${copyPackage.slides[0]?.header}"`);

  // --- CHEAT-ON-CONTENT INTEGRATION ---
  await integrateCheatOnContent(copyPackage, executionId);

  // --- SUBAGENT 2: Visual Director (Round-Robin AI Visual Prompt Cookbook Style Selection) ---
  console.log(`\n👑 [SUBAGENT 2: visual_director_subagent] Initialized.`);
  const { selectNextCookbookStyle } = await import('./style_manager.js');
  let cookbookStyle = undefined;
  try {
    cookbookStyle = selectNextCookbookStyle();
    console.log(`   - Active Cookbook Style: "${cookbookStyle.name}" (${cookbookStyle.slug})`);
  } catch (e) {
    console.warn(`   ⚠️ Could not load cookbook style:`, e);
  }

  const referenceStyle: DeconstructedReferenceStyle = options.referenceStyleKey
    ? getDeconstructedReference(options.referenceStyleKey)
    : getNextRotatingReferenceStyle(state.usedStyles);

  globalCowHarness.ingest(cowBranch.branchId, {
    key: 'visual_style_blueprint',
    value: cookbookStyle || referenceStyle,
  });
  globalCowHarness.checkpoint(cowBranch.branchId, 'visual_style_locked');

  // --- SUBAGENT 3: Nano Banana 2 Variation Prompt Engine ---
  console.log(`\n🎨 [SUBAGENT 3: nano_banana_engine] Initialized.`);
  console.log(`   - Generating 8 unique slide variations from the reference image...`);
  const { batch, promptsDir, summaryPath, fidelityReport } = buildNanoBananaVariationBatch({
    copyPackage,
    referenceStyleKey: referenceStyle.id,
    outputDir: `out/nano_banana_prompts/${selectedTopicKey}`,
  });
  console.log(`   ✅ Generated ${batch.length} Nano Banana 2 Variation Prompts in ${promptsDir}`);
  console.log(`   🛡️ Visual Fidelity Score: ${fidelityReport.averageFidelityScore}% [${fidelityReport.overallStatus.toUpperCase()}]`);

  globalCowHarness.ingest(cowBranch.branchId, {
    key: 'nano_banana_prompts_batch',
    value: batch,
  });
  globalCowHarness.ingest(cowBranch.branchId, {
    key: 'visual_fidelity_audit',
    value: fidelityReport,
  });
  globalCowHarness.checkpoint(cowBranch.branchId, 'prompts_fidelity_verified');

  // --- SUBAGENT 4: Distribution Lead (Lead Magnet & Playbook) ---
  console.log(`\n📦 [SUBAGENT 4: distribution_lead_subagent] Initialized.`);
  const leadMagnet = generateDigitalLeadMagnet({
    carouselCopy: copyPackage,
    triggerWord: copyPackage.triggerWord,
  });
  console.log(`   - Interactive Lead Magnet (1-Click Copy Buttons): ${leadMagnet.htmlDocPath}`);

  // --- SUBAGENT 5: Multi-Platform Repurposing (LinkedIn, Twitter & Telegram VIP) ---
  console.log(`\n📄 [SUBAGENT 5: repurposing_subagent] Initialized.`);
  let repurposed: RepurposedPackage | undefined;
  if (options.slideImagePaths && options.slideImagePaths.length > 0) {
    repurposed = await runMultiPlatformRepurposing({
      imagePaths: options.slideImagePaths,
      copyPackage,
      referenceStyle,
      ...(options.publicImageUrls ? { imageUrls: options.publicImageUrls } : {}),
    });
    console.log(`   ✅ LinkedIn PDF Carousel: ${repurposed.linkedInPdfPath}`);
    console.log(`   ✅ LinkedIn Anti-AI Post: ${repurposed.linkedInPostPath}`);
    console.log(`   ✅ Twitter/X 9-Tweet Thread: ${repurposed.twitterThreadPath}`);
  } else {
    // Generate Twitter & LinkedIn copy directly
    const res = await runMultiPlatformRepurposing({
      imagePaths: [],
      copyPackage,
      referenceStyle,
      ...(options.publicImageUrls ? { imageUrls: options.publicImageUrls } : {}),
    });
    repurposed = res;
    console.log(`   ✅ LinkedIn Anti-AI Post: ${repurposed.linkedInPostPath}`);
    console.log(`   ✅ Twitter/X 9-Tweet Thread: ${repurposed.twitterThreadPath}`);
  }

  const telegramBroadcast = await dispatchToTelegramGroup({
    copyPackage,
    referenceStyle,
    ...(options.slideImagePaths ? { slideImagePaths: options.slideImagePaths } : {}),
    ...(repurposed?.linkedInPdfPath ? { pdfPath: repurposed.linkedInPdfPath } : {}),
  });
  console.log(`   ✅ Telegram VIP Breakdown: ${telegramBroadcast.markdownPath}`);

  // --- SUBAGENT 6: Analytics Evaluator & CowAgent Master Base Promotion ---
  console.log(`\n📊 [SUBAGENT 6: analytics_evaluator_subagent] Initialized.`);
  recordPublishedPost({
    postId: executionId,
    topicKey: copyPackage.topicKey,
    topicTitle: copyPackage.topicTitle,
    styleKey: referenceStyle.id,
    styleName: referenceStyle.referenceName,
  });

  // Promote CowAgent branch into master memory base
  globalCowHarness.promote(cowBranch.branchId);

  // Update rotation state
  if (!state.usedStyles.includes(referenceStyle.id)) {
    state.usedStyles.push(referenceStyle.id);
  }
  if (!state.usedTopics.includes(selectedTopicKey)) {
    state.usedTopics.push(selectedTopicKey);
  }
  if (state.usedStyles.length >= 7) state.usedStyles = [];
  if (state.usedTopics.length >= 6) state.usedTopics = [];
  saveState(state);

  // Format Buffer Caption
  const musicRec = "BICEP — 'Glue' / Fred again.. — 'adore u'";
  const caption = `${copyPackage.instagramCaption}\n\n🎵 Suggested Audio: ${musicRec}\n\n👇 Drop "${copyPackage.triggerWord}" in the comments and I will instantly DM you the private Telegram group invite link! (All raw assets, breakdowns & Figma files are pinned inside 📲)\n\n${copyPackage.hashtags.join(' ')}`;

  const fallbackDueAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  recordPendingNotification({
    postId: executionId,
    channelId: INSTAGRAM_DEFAULT_CHANNEL_ID,
    createdAt: new Date().toISOString(),
    fallbackDueAt,
    caption,
    imageUrls: options.publicImageUrls || batch.map((j) => `https://open-design.local/prompts/${j.outputFileName}`),
    topic: copyPackage.topicTitle,
  });

  console.log(`\n================================================================`);
  console.log(`✅ COWAGENT HARNESSED PIPELINE COMPLETE: 100% READY`);
  console.log(`📁 CowAgent Memory Base: data/memory/ciel_master.rvf`);
  console.log(`📁 Master Batch JSON: ${summaryPath}`);
  console.log(`================================================================\n`);

  return {
    executionId,
    status: 'success',
    agentsInvolved: [
      'cowagent_harness',
      'trend_scout_subagent',
      'visual_director_subagent',
      'nano_banana_engine',
      'distribution_lead_subagent',
      'repurposing_subagent',
      'analytics_evaluator_subagent',
    ],
    topic: copyPackage.topicTitle,
    topicKey: copyPackage.topicKey,
    trendInsight,
    referenceImage: referenceStyle.referencePath,
    referenceStyleName: referenceStyle.referenceName,
    referenceStyleKey: referenceStyle.id,
    promptsGenerated: batch.length,
    promptsDir,
    leadMagnetPath: leadMagnet.htmlDocPath,
    linkedInPdfPath: repurposed?.linkedInPdfPath,
    linkedInPostPath: repurposed?.linkedInPostPath,
    twitterThreadPath: repurposed?.twitterThreadPath,
    cowBranchId: cowBranch.branchId,
    variationBatch: batch,
  };
}

if (process.argv[1]?.endsWith('subagent_pipeline_orchestrator.ts')) {
  const topicArgIdx = process.argv.indexOf('--topic-key');
  const topicKey = topicArgIdx !== -1 ? (process.argv[topicArgIdx + 1] as SingleTopicKey) : undefined;
  const styleArgIdx = process.argv.indexOf('--style-key');
  const referenceStyleKey = styleArgIdx !== -1 ? process.argv[styleArgIdx + 1] : undefined;
  executeSubagentPipeline({
    ...(topicKey ? { topicKey } : {}),
    ...(referenceStyleKey ? { referenceStyleKey } : {}),
  }).catch(console.error);
}
