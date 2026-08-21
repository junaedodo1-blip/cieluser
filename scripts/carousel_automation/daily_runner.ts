import { selectNextStyleFolder, commitStyleUsage, getAvailableStyleFolders, getDefaultReferencesDir } from './style_manager.js';
import { generateCarouselCopy, extractSlidesFromText, type HookAngleType } from './copy_extractor.js';
import { buildCarouselGenerationBatch } from './nano_banana_generator.js';
import { generateDigitalLeadMagnet } from './lead_magnet_generator.js';
import { buildOpenReplyCampaignConfig } from './openreply_integration.js';
import { buildBufferInstagramCarouselPayload, INSTAGRAM_DEFAULT_CHANNEL_ID } from './buffer_publisher.js';
import { recordPendingNotification } from './fallback_checker.js';

export interface DailyAutomationOptions {
  topic?: string;
  hookAngle?: HookAngleType;
  triggerWord?: string;
  forceStrictBrand?: boolean;
  notificationMode?: boolean;
  dryRun?: boolean;
  referencesDir?: string;
}

const AUTEUR_TOPIC_POOL = [
  "Auteur Directing & Remotion Spring Physics for Physical Luxury Brands",
  "The 3-Act Narrative Architecture in 15-Second Commercials",
  "Directing AI Video Like Jonathan Glazer: Mythic Weight & Deep Shadows",
  "Scale Disruption & Surreal Street Art: The Jacquemus Strategy",
  "Olfactory Visual Cinema: How to Translate Scent Notes into Fluid Viscosity",
  "Why Traditional Product Ads Die in 3 Seconds (The Level 2 Trap)",
  "How We Turn Reel Comments into Tracked Shopify Conversions 24/7",
];

export async function runDailyCarouselAutomation(options: DailyAutomationOptions = {}) {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];

  // Weekly rule: Sunday (0) is Strict Brand Day; other 6 days are Reference-Derived Style Days
  const isStrictBrandDay = options.forceStrictBrand ?? (dayOfWeek === 0);

  const referencesDir = options.referencesDir || getDefaultReferencesDir();
  const triggerWord = options.triggerWord || 'CIEL';

  // Select topic
  const topic = options.topic || AUTEUR_TOPIC_POOL[Math.floor(Math.random() * AUTEUR_TOPIC_POOL.length)];

  console.log('====================================================');
  console.log('🕒 DAILY CAROUSEL AUTOMATION RUNNER');
  console.log('====================================================');
  console.log(`📅 Date: ${date.toISOString().split('T')[0]} (${dayName})`);
  console.log(`🎨 Mode: ${isStrictBrandDay ? '🌟 STRICT BRAND GUIDELINES DAY (1x/week)' : '🎭 REFERENCE-DERIVED STYLE DAY (6x/week)'}`);
  console.log(`📌 Topic: "${topic}"`);
  console.log(`🎯 Trigger Word: "${triggerWord}"`);

  // Step 1: Select Style Folder (Round-Robin)
  const selectedStyle = selectNextStyleFolder(referencesDir);
  console.log(`\n📁 Style Pack: "${selectedStyle.styleName}" (${selectedStyle.referenceImages.length} references)`);

  // Step 2: Generate 8-Slide Visual Literature Copy (Testing Multiple Angles)
  const copyPackage = generateCarouselCopy({ topic, hookAngle: options.hookAngle });
  console.log(`\n📐 Hook Angle Tested: "${copyPackage.hookAngle}"`);
  console.log(`📝 Slide 1 Hook: "${copyPackage.slides[0]?.header}"`);

  // Step 3: Build Nano Banana 2 Prompts (Weekly Style Policy Applied)
  const generationBatch = buildCarouselGenerationBatch({
    slides: copyPackage.slides,
    referenceImages: selectedStyle.referenceImages,
    styleName: selectedStyle.styleName,
    isStrictBrandDay,
  });

  console.log(`\n🎨 Prompts built for ${generationBatch.length} slides:`);
  generationBatch.forEach((job) => {
    console.log(`   [Slide ${job.slideIndex}] Mode: ${job.isStrictBrandDay ? 'Strict Brand' : 'Reference Colors/Fonts'}`);
  });

  // Step 4: Generate Lead Magnet
  const leadMagnet = generateDigitalLeadMagnet({
    carouselCopy: copyPackage,
    triggerWord,
  });
  console.log(`\n🎁 Digital Product HTML: ${leadMagnet.htmlDocPath}`);

  // Step 5: OpenReply Config
  const openReplyConfig = buildOpenReplyCampaignConfig({
    product: leadMagnet,
    enableFollowGate: true,
  });

  // Step 6: Buffer Caption with Music Recommendation & CTA
  const musicRec = isStrictBrandDay
    ? "Hans Zimmer — 'Time' (Sub-bass Ambient Mix)"
    : "BICEP — 'Glue' / Fred again.. — 'adore u'";

  const captionWithCta = `${copyPackage.instagramCaption}\n\n🎵 Suggested Audio: ${musicRec}\n\n👇 Drop "${triggerWord}" in the comments and I will DM you the complete actionable playbook & checklist for free! 🚀\n\n${copyPackage.hashtags.join(' ')}`;
  
  const bufferPayload = buildBufferInstagramCarouselPayload({
    caption: captionWithCta,
    imageUrls: generationBatch.map((j) => `https://open-design.local/assets/generated/${j.outputFileName}`),
    channelId: INSTAGRAM_DEFAULT_CHANNEL_ID,
    mode: 'addToQueue',
    schedulingType: 'notification',
  });

  // Step 7: Record 2-Hour Fail-Safe Fallback
  const fallbackDueAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  recordPendingNotification({
    postId: 'pending_daily_run',
    channelId: INSTAGRAM_DEFAULT_CHANNEL_ID,
    createdAt: date.toISOString(),
    fallbackDueAt,
    caption: captionWithCta,
    imageUrls: generationBatch.map((j) => `https://open-design.local/assets/generated/${j.outputFileName}`),
    topic,
  });
  console.log(`⏱️ 2-Hour Fail-Safe Armed: If not published with music via mobile notification by ${fallbackDueAt}, system will auto-post without music.`);

  // Commit Style Usage
  commitStyleUsage(selectedStyle.styleName, copyPackage.slides.length);

  console.log('\n====================================================');
  console.log('✅ DAILY AUTOMATION JOB READY');
  console.log('====================================================');

  return {
    date: date.toISOString(),
    dayName,
    isStrictBrandDay,
    selectedStyle,
    copyPackage,
    generationBatch,
    leadMagnet,
    openReplyConfig,
    bufferPayload,
  };
}

// Auto-run if executed directly
if (process.argv[1]?.endsWith('daily_runner.ts') || process.argv[1]?.endsWith('daily_runner.js')) {
  const forceStrict = process.argv.includes('--force-strict-brand');
  const notification = process.argv.includes('--notification');
  const dryRun = process.argv.includes('--dry-run');
  const topicArgIdx = process.argv.indexOf('--topic');
  const topic = topicArgIdx !== -1 ? process.argv[topicArgIdx + 1] : undefined;
  const angleArgIdx = process.argv.indexOf('--angle');
  const hookAngle = angleArgIdx !== -1 ? (process.argv[angleArgIdx + 1] as HookAngleType) : undefined;

  runDailyCarouselAutomation({ forceStrictBrand: forceStrict, notificationMode: notification, dryRun, topic, hookAngle }).catch((err) => {
    console.error('Daily Automation Error:', err);
    process.exit(1);
  });
}

