import path from 'node:path';
import {
  selectNextStyleFolder,
  commitStyleUsage,
  loadState,
} from './style_manager.js';
import { generateCarouselCopy } from './copy_extractor.js';
import { buildCarouselGenerationBatch } from './nano_banana_generator.js';
import {
  buildBufferInstagramCarouselPayload,
  INSTAGRAM_DEFAULT_CHANNEL_ID,
} from './buffer_publisher.js';
import { generateDigitalLeadMagnet } from './lead_magnet_generator.js';
import { buildOpenReplyCampaignConfig } from './openreply_integration.js';

interface CliArgs {
  topic: string;
  competitor?: string;
  useLast30Days: boolean;
  triggerWord?: string;
  slideCount: number;
  dryRun: boolean;
  postNow: boolean;
  referencesDir?: string;
  brandHandle: string;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  let topic = 'Auteur Cinema Directing for Luxury Physical Brands';
  let competitor: string | undefined;
  let useLast30Days = false;
  let triggerWord = 'CIEL';
  let slideCount = 8;
  let dryRun = false;
  let postNow = false;
  let referencesDir: string | undefined;
  let brandHandle = 'project\\ciel';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--topic' && args[i + 1]) {
      topic = args[++i];
    } else if (arg === '--competitor' && args[i + 1]) {
      competitor = args[++i];
    } else if (arg === '--last30days') {
      useLast30Days = true;
    } else if (arg === '--trigger-word' && args[i + 1]) {
      triggerWord = args[++i];
    } else if (arg === '--slide-count' && args[i + 1]) {
      slideCount = parseInt(args[++i], 10) || 8;
    } else if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--post-now') {
      postNow = true;
    } else if (arg === '--references-dir' && args[i + 1]) {
      referencesDir = args[++i];
    } else if (arg === '--brand-handle' && args[i + 1]) {
      brandHandle = args[++i];
    }
  }

  return { topic, competitor, useLast30Days, triggerWord, slideCount, dryRun, postNow, referencesDir, brandHandle };
}

export async function runCarouselAutomation(options?: Partial<CliArgs>) {
  const args: CliArgs = {
    ...parseArgs(),
    ...options,
  };

  console.log('====================================================');
  console.log('🚀 PROJECT\\CIEL CAROUSEL & LEAD MAGNET AUTOMATION');
  console.log('====================================================');
  console.log(`📌 Topic: "${args.topic}"`);
  if (args.useLast30Days) console.log(`🔥 Trend Source: Last30Days Community & Social Scan`);
  if (args.competitor) console.log(`🔍 Competitor Reference: ${args.competitor}`);
  console.log(`🎯 Trigger Word: "${args.triggerWord}"`);
  console.log(`📊 Target Slides: ${args.slideCount} (8-Slide Visual Literature Architecture)`);
  console.log(`🎨 Brand System: ${args.brandHandle} // BEYOND THE FRAME, INTO FEELING`);

  // Step 1: Style folder selection via round-robin
  console.log('\n--- [Step 1: Reference Style Selection (Round-Robin)] ---');
  let selectedStyle;
  try {
    selectedStyle = selectNextStyleFolder(args.referencesDir);
    console.log(`✅ Selected Style Folder: "${selectedStyle.styleName}"`);
    console.log(`📁 Folder Path: ${selectedStyle.folderPath}`);
    console.log(`🖼️ Reference Images Found: ${selectedStyle.referenceImages.length}`);
    console.log(`🔄 Cycle: ${selectedStyle.cycle} (${selectedStyle.remainingInCycle} styles remaining in this cycle)`);
  } catch (err: any) {
    console.warn(`⚠️ Warning: ${err.message}`);
    console.log('Using default style theme: "style_01_modern_dark"');
    selectedStyle = {
      styleName: 'style_01_modern_dark',
      folderPath: path.resolve(process.cwd(), 'carousel_references', 'style_01_modern_dark'),
      referenceImages: [],
      cycle: 1,
      remainingInCycle: 0,
    };
  }

  // Step 2: Generate Structured Carousel Copy (8-Slide Architecture)
  console.log('\n--- [Step 2: Copy Extraction & 8-Slide Visual Literature Architecture] ---');
  let hookTitle = args.competitor
    ? `The Story Doctrine Behind ${args.competitor}'s Most Viral Campaign`
    : undefined;

  if (args.useLast30Days) {
    hookTitle = `Why Traditional Ads Die in 3 Seconds (And What 2026 Auteur Storytelling Proves)`;
  }

  const copyPackage = generateCarouselCopy({
    topic: args.topic,
    competitorHook: hookTitle,
    totalSlides: args.slideCount,
    brandHandle: args.brandHandle,
  });

  console.log(`🎯 Hook Headline: "${copyPackage.hookHeadline}"`);
  console.log(`📝 Generated ${copyPackage.slides.length} structured slides.`);
  copyPackage.slides.forEach((slide) => {
    console.log(`   [Slide ${slide.slideIndex} (${slide.slideType})]: ${slide.header}`);
  });

  // Step 3: Build Nano Banana 2 Generation Batch with project\ciel Tokens
  console.log('\n--- [Step 3: Nano Banana 2 Generation Batch (project\\ciel Doctrine)] ---');
  const generationBatch = buildCarouselGenerationBatch({
    slides: copyPackage.slides,
    referenceImages: selectedStyle.referenceImages,
    styleName: selectedStyle.styleName,
    aspectRatio: '4:5',
  });

  console.log(`🎨 Built ${generationBatch.length} slide generation prompts.`);
  generationBatch.forEach((job) => {
    console.log(`\n🔹 Slide ${job.slideIndex} (${job.aspectRatio}):`);
    console.log(`   Output: ${job.outputFileName}`);
    if (job.referenceImagePath) {
      console.log(`   Reference Image: ${path.basename(job.referenceImagePath)}`);
    } else {
      console.log(`   Reference Image: None (Defaulting to Abyss Black luxury tokens)`);
    }
    console.log(`   Prompt Sample: "${job.prompt.slice(0, 140)}..."`);
  });

  // Step 4: Digital Product / Lead Magnet Generation
  console.log('\n--- [Step 4: Digital Lead Magnet Generation (Trigger Word)] ---');
  const leadMagnet = generateDigitalLeadMagnet({
    carouselCopy: copyPackage,
    triggerWord: args.triggerWord,
    brandHandle: args.brandHandle,
  });
  console.log(`🎁 Generated Digital Product: "${leadMagnet.productTitle}"`);
  console.log(`📄 Lead Magnet HTML Saved: ${leadMagnet.htmlDocPath}`);
  console.log(`💬 DM Delivery Script Ready for trigger word: "${leadMagnet.triggerWord}"`);

  // Step 5: OpenReply Auto-DM & Comment Automation Config
  console.log('\n--- [Step 5: OpenReply Comment-to-DM Setup] ---');
  const openReplyConfig = buildOpenReplyCampaignConfig({
    product: leadMagnet,
    brandHandle: args.brandHandle,
    enableFollowGate: true,
  });
  console.log(`🤖 OpenReply Campaign: "${openReplyConfig.campaignName}"`);
  console.log(`🔑 Keywords: ${openReplyConfig.triggerKeywords.join(', ')}`);
  console.log(`🔒 Follow Gate: ${openReplyConfig.enableFollowGate ? 'Enabled (Requires follow to unlock)' : 'Disabled'}`);
  console.log(`💬 Public Comment Replies: ${openReplyConfig.publicCommentReplies.length} variations`);

  // Step 6: Instagram Caption & Buffer Payload
  console.log('\n--- [Step 6: Instagram Caption & Buffer Payload] ---');
  const captionWithCta = `${copyPackage.instagramCaption}\n\n👇 Drop "${leadMagnet.triggerWord}" in the comments and I will DM you the complete actionable playbook & checklist for free! 🚀\n\n${copyPackage.hashtags.join(' ')}`;

  const bufferPayload = buildBufferInstagramCarouselPayload({
    caption: captionWithCta,
    imageUrls: generationBatch.map((j) => `https://open-design.local/assets/generated/${j.outputFileName}`),
    channelId: INSTAGRAM_DEFAULT_CHANNEL_ID,
    mode: args.postNow ? 'shareNow' : 'addToQueue',
  });

  console.log(`📋 Formatted Caption with Trigger CTA (${bufferPayload.text.length} chars):`);
  console.log('----------------------------------------------------');
  console.log(bufferPayload.text);
  console.log('----------------------------------------------------');

  // Step 7: Commit Style Usage State
  commitStyleUsage(selectedStyle.styleName, copyPackage.slides.length);
  console.log(`\n💾 Updated state in carousel_automation_state.json. Next run will use the next style in sequence.`);

  console.log('\n====================================================');
  console.log('✅ PROJECT\\CIEL CAROUSEL & AUTOMATION PIPELINE READY');
  console.log('====================================================');

  return {
    selectedStyle,
    copyPackage,
    generationBatch,
    leadMagnet,
    openReplyConfig,
    bufferPayload,
  };
}

// Auto-run on execution
runCarouselAutomation().catch((err) => {
  console.error('Automation Error:', err);
  process.exit(1);
});

