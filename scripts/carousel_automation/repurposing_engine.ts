import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import type { CarouselCopyPackage } from './copy_extractor.js';
import type { DeconstructedReferenceStyle } from './reference_deconstructor.js';

const require = createRequire(import.meta.url);

export const TELEGRAM_COMMUNITY_URL = 'https://t.me/projectciel';

function getPdfLib() {
  try {
    return require('pdf-lib');
  } catch {
    try {
      return require('../../apps/daemon/node_modules/pdf-lib');
    } catch {
      return require('../../node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib');
    }
  }
}

export interface RepurposedPackage {
  topicKey: string;
  topicTitle: string;
  linkedInPdfPath: string;
  linkedInPostPath: string;
  linkedInPostText: string;
  twitterThreadPath: string;
  twitterThreadJsonPath: string;
  tweetCount: number;
}

/**
 * Creates a high-resolution LinkedIn PDF Document Carousel from 8 slide image files.
 */
export async function generateLinkedInCarouselPdf(params: {
  imagePaths: string[];
  copyPackage: CarouselCopyPackage;
  outputDir?: string;
}): Promise<string> {
  const { imagePaths, copyPackage, outputDir = 'out/repurposed/linkedin' } = params;
  const { PDFDocument } = getPdfLib();

  const resolvedDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  const sanitizedTitle = copyPackage.topicTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const pdfPath = path.join(resolvedDir, `linkedin-carousel-${sanitizedTitle}.pdf`);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(copyPackage.topicTitle);
  pdfDoc.setAuthor('project\\ciel (@junnbuilds)');
  pdfDoc.setSubject('Visual Directing & High-Converting Carousel Playbook');
  pdfDoc.setKeywords(['projectciel', 'nanobanana', 'graphicdesign', 'contentcreator', 'viralhooks']);

  for (const imgPath of imagePaths) {
    if (!fs.existsSync(imgPath)) continue;
    const imgBytes = fs.readFileSync(imgPath);
    const isJpg = imgPath.endsWith('.jpg') || imgPath.endsWith('.jpeg');
    const image = isJpg ? await pdfDoc.embedJpg(imgBytes) : await pdfDoc.embedPng(imgBytes);

    // 4:5 aspect ratio page (540 x 675 points for optimal mobile & desktop reading)
    const page = pdfDoc.addPage([540, 675]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: 540,
      height: 675,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytes);
  console.log(`📄 [LinkedIn PDF Carousel] Created: ${pdfPath}`);
  return pdfPath;
}

/**
 * Generates an Anti-AI, High-Dwell-Time LinkedIn Post using the linkedin-post-writing-skill methodology.
 * Designed for 2026 LinkedIn 360 Brew algorithm (Saves, Hook Processing Weight & Discussion Depth).
 * Dynamically tailored to the selected reference style.
 */
export function generateLinkedInPostText(params: {
  copyPackage: CarouselCopyPackage;
  referenceStyle?: DeconstructedReferenceStyle;
}): string {
  const { copyPackage, referenceStyle } = params;
  const s4 = copyPackage.slides[3];

  const styleName = referenceStyle?.referenceName || 'Swiss Acid Stepped-Polygon';
  const bgDesc = referenceStyle?.backgroundDescription || 'Neutral light warm-grey canvas (#E3E3E3)';
  const typography = referenceStyle?.typographySystem || 'Geometric Sans layered with Liquid Melting Script';

  const hookCuriosity = `There is a hidden shift in how top teams approach ${copyPackage.topicTitle.toLowerCase()} that nobody talks about.`;
  const hookBoldClaim = `Most developers are building ${copyPackage.topicTitle.toLowerCase()} completely wrong.`;
  const hookStory = `Most AI visuals look like cheap plastic toys.`;

  return `[A/B HOOK OPTIONS]
* Option 1 (Curiosity Gap): ${hookCuriosity}
* Option 2 (Bold Claim - RECOMMENDED): ${hookBoldClaim}
* Option 3 (Specific Story - Default): ${hookStory}
[END HOOK OPTIONS]

${hookStory}

Here is the brutal truth why:
People open Nano Banana, type 50 random buzzwords, and wonder why the layout is cluttered.

Design agencies do not work that way.
They lock the layout with a reference image first, then swap the assets.

Here is the exact 3-minute production workflow for "${copyPackage.topicTitle}":

1. Pick a reference image (${styleName}).
2. Let the model lock the font weights and grid spacing.
3. Apply the exact design rules:
   • ${bgDesc}
   • ${typography}
4. Layer signature color blocks and micro-accents.

The exact prompt formula:
"${s4?.keyCallout || 'Use reference style, razor-sharp typography, flat 2D graphic design, 4:5 vertical.'}"

📌 4 rules to bookmark for your next run:
• 1080 x 1350 vertical ratio (4:5)
• Layout style: ${styleName}
• Typography: ${typography.slice(0, 70)}...
• 2D vector print finish, zero plastic AI sheen

Swipe through the document carousel above for the full 8-slide breakdown.

💾 Save this post so you have the cheat sheet ready when you generate.

📲 All raw prompt files, editable Figma templates, and asset breakdowns are shared inside our private Telegram group.

👇 Drop "${copyPackage.triggerWord}" in the comments (or join directly via Telegram: ${TELEGRAM_COMMUNITY_URL}) to grab the full pack for free.`;
}

export interface TweetContent {
  tweetNumber: number;
  text: string;
  attachedSlideIndex?: number;
  isCallToAction?: boolean;
}

/**
 * Generates a 9-Tweet Twitter/X Mega-Thread formatted with character limits (<= 240 chars)
 * using the twitter-algorithm-optimizer skill insights.
 * Tailored dynamically to the reference style.
 */
export function generateTwitterThread(params: {
  copyPackage: CarouselCopyPackage;
  referenceStyle?: DeconstructedReferenceStyle;
  imageUrls?: string[];
  outputDir?: string;
}): { mdPath: string; jsonPath: string; tweets: TweetContent[] } {
  const { copyPackage, referenceStyle, imageUrls = [], outputDir = 'out/repurposed/twitter' } = params;

  const resolvedDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  const sanitizedTitle = copyPackage.topicTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const mdPath = path.join(resolvedDir, `twitter-thread-${sanitizedTitle}.md`);
  const jsonPath = path.join(resolvedDir, `twitter-thread-${sanitizedTitle}.json`);

  const tweets: TweetContent[] = [];

  // Tweet 1: The Hook
  tweets.push({
    tweetNumber: 1,
    text: `${copyPackage.slides[0]?.header || copyPackage.topicTitle}\n\nNo Photoshop needed. Just this 3-minute formula with copy-paste prompts 🧵👇`,
    attachedSlideIndex: 1,
  });

  // Tweet 2: The Mistake
  tweets.push({
    tweetNumber: 2,
    text: `1/ Why 90% of AI visuals look messy:\n\n• Starting with a blank prompt\n• Too many elements (clutter)\n• Zero grid structure\n\nRule: Lock your layout with a reference image first.`,
    attachedSlideIndex: 2,
  });

  // Tweet 3: Step 1
  tweets.push({
    tweetNumber: 3,
    text: `2/ Step 1: Pick a Visual Blueprint (${referenceStyle?.referenceName || 'Swiss Acid'})\n\nNever start from scratch. Upload a reference and let Nano Banana copy the container grid and typography.`,
    attachedSlideIndex: 3,
  });

  // Tweet 4: Step 2 (The Prompt Code)
  tweets.push({
    tweetNumber: 4,
    text: `3/ Step 2: The Exact Prompt Formula\n\n"Use reference style for layout. Swap headline to: [YOUR HEADLINE]. Razor-sharp vector typography, 4:5 vertical."`,
    attachedSlideIndex: 4,
  });

  // Tweet 5: Step 3 (Stickers & Accents)
  tweets.push({
    tweetNumber: 5,
    text: `4/ Step 3: Layer Micro-Accents\n\n• Stepped polygon color blocks\n• Rotated vertical margin tags\n• Top timestamp header ("05 NOV // 8:37 PM")`,
    attachedSlideIndex: 5,
  });

  // Tweet 6: Cheat Sheet
  tweets.push({
    tweetNumber: 6,
    text: `5/ 💾 The Saveable Cheat Sheet:\n\n• Ratio: 1080x1350 (4:5)\n• Background: ${referenceStyle?.colorPalette.background || 'Neutral light grey (#E3E3E3)'}\n• Style: ${referenceStyle?.referenceName || 'Swiss Acid Stepped-Polygon'}\n• Zero plastic sheen`,
    attachedSlideIndex: 6,
  });

  // Tweet 7: Workflow
  tweets.push({
    tweetNumber: 7,
    text: `6/ The 3-Minute Routine:\n\n1. Save reference image\n2. Feed into Nano Banana with structured prompt\n3. Deliver free asset pack via automated DM keyword`,
    attachedSlideIndex: 7,
  });

  // Tweet 8: Summary
  tweets.push({
    tweetNumber: 8,
    text: `7/ Golden Rules:\n\n✦ Stop the scroll on Slide 1\n✦ Explain with diagrams on Slides 2-7\n✦ Give away free prompts on every post`,
  });

  // Tweet 9: Telegram Community CTA
  tweets.push({
    tweetNumber: 9,
    text: `Want all the raw prompt templates & Figma files?\n\n1. Join our private Telegram: ${TELEGRAM_COMMUNITY_URL}\n2. Follow @vontoliver for daily design breakdowns\n\nAll raw assets are pinned inside! 🚀`,
    isCallToAction: true,
  });

  // Write Markdown File
  let mdContent = `# Twitter/X Mega-Thread: ${copyPackage.topicTitle}\n\n`;
  tweets.forEach((t) => {
    mdContent += `### Tweet ${t.tweetNumber} / 9\n${t.text}\n\n`;
    if (t.attachedSlideIndex && imageUrls[t.attachedSlideIndex - 1]) {
      mdContent += `*Attached Media: ${imageUrls[t.attachedSlideIndex - 1]}*\n\n`;
    }
    mdContent += `---\n\n`;
  });
  fs.writeFileSync(mdPath, mdContent, 'utf8');

  // Write JSON
  fs.writeFileSync(jsonPath, JSON.stringify(tweets, null, 2), 'utf8');
  console.log(`🐦 [Twitter/X Mega-Thread] Created: ${mdPath}`);

  return { mdPath, jsonPath, tweets };
}

export interface RepurposedPackage {
  topicKey: string;
  topicTitle: string;
  linkedInPdfPath: string;
  linkedInPostPath: string;
  linkedInPostText: string;
  instagramPostPath: string;
  instagramPostText: string;
  twitterThreadPath: string;
  twitterThreadJsonPath: string;
  tweetCount: number;
}

/**
 * Generates a Visual-First, High-Engagement Instagram Caption tailored for feed consumption.
 * Uses native Instagram formatting, visual emojis, DM keyword trigger, and hashtag discovery block.
 */
export function generateInstagramPostText(params: {
  copyPackage: CarouselCopyPackage;
  referenceStyle?: DeconstructedReferenceStyle;
}): string {
  const { copyPackage, referenceStyle } = params;
  const s4 = copyPackage.slides[3];

  const styleName = referenceStyle?.referenceName || 'Swiss Acid Stepped-Polygon';
  const typography = referenceStyle?.typographySystem || 'Geometric Sans layered with Liquid Melting Script';

  const hook = `${copyPackage.slides[0]?.header || copyPackage.topicTitle}\n\nSwipe through the slides 👈 for the exact breakdown.`;

  return `${hook}

Here is the exact visual directing breakdown for "${copyPackage.topicTitle}":

1. Blueprint Reference: ${styleName}
2. Grid Rules: Razor-sharp Swiss typography & flat 2D print texture.
3. Color Stack: Abyss Black (#0A0A0C) contrast with Muted Platinum accents.
4. Core Prompt Formula:
"${s4?.keyCallout || 'Use reference style, 2D vector print finish, 4:5 vertical ratio.'}"

📌 Swipe through all 8 slides for the step-by-step visual guide.

💾 Save this post for your next prompt run.

📩 Comment "${copyPackage.triggerWord}" below to get the raw prompt files & Figma templates sent directly to your DM!

#VisualDirecting #BrandStrategy #CreativeDirection #DesignSystem #LuxuryBranding #ProjectCiel #ArtDirection #GraphicDesign #NanoBanana #PromptEngineering`;
}

/**
 * Runs full multi-platform repurposing.
 */
export async function runMultiPlatformRepurposing(params: {
  imagePaths: string[];
  copyPackage: CarouselCopyPackage;
  referenceStyle?: DeconstructedReferenceStyle;
  imageUrls?: string[];
}): Promise<RepurposedPackage> {
  const { imagePaths, copyPackage, referenceStyle, imageUrls = [] } = params;

  const linkedInPdfPath = await generateLinkedInCarouselPdf({
    imagePaths,
    copyPackage,
  });

  const linkedInPostText = generateLinkedInPostText({
    copyPackage,
    ...(referenceStyle ? { referenceStyle } : {}),
  });
  const sanitizedTitle = copyPackage.topicTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const linkedInPostPath = path.resolve(process.cwd(), 'out/repurposed/linkedin', `linkedin-post-${sanitizedTitle}.md`);
  fs.writeFileSync(linkedInPostPath, linkedInPostText, 'utf8');

  // Instagram-Specific Post Generation
  const instagramPostText = generateInstagramPostText({
    copyPackage,
    ...(referenceStyle ? { referenceStyle } : {}),
  });
  const instaDir = path.resolve(process.cwd(), 'out/repurposed/instagram');
  if (!fs.existsSync(instaDir)) {
    fs.mkdirSync(instaDir, { recursive: true });
  }
  const instagramPostPath = path.join(instaDir, `instagram-post-${sanitizedTitle}.md`);
  fs.writeFileSync(instagramPostPath, instagramPostText, 'utf8');
  console.log(`📸 [Instagram Post] Created: ${instagramPostPath}`);

  const { mdPath, jsonPath, tweets } = generateTwitterThread({
    copyPackage,
    ...(referenceStyle ? { referenceStyle } : {}),
    ...(imageUrls.length > 0 ? { imageUrls } : {}),
  });

  return {
    topicKey: copyPackage.topicKey,
    topicTitle: copyPackage.topicTitle,
    linkedInPdfPath,
    linkedInPostPath,
    linkedInPostText,
    instagramPostPath,
    instagramPostText,
    twitterThreadPath: mdPath,
    twitterThreadJsonPath: jsonPath,
    tweetCount: tweets.length,
  };
}
