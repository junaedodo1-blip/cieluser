import fs from 'node:fs';
import path from 'node:path';
import type { CarouselCopyPackage, CarouselSlideCopy } from './copy_extractor.js';
import {
  getDeconstructedReference,
  type DeconstructedReferenceStyle,
} from './reference_deconstructor.js';
import { auditBatchFidelity, type BatchFidelityAuditReport } from './fidelity_self_checker.js';

export interface NanoBananaSlidePromptJob {
  slideIndex: number;
  slideType: string;
  referenceImagePath: string;
  prompt: string;
  aspectRatio: string;
  outputFileName: string;
}

export interface NanoBananaBatchResult {
  batch: NanoBananaSlidePromptJob[];
  promptsDir: string;
  summaryPath: string;
  fidelityReport: BatchFidelityAuditReport;
}

/**
 * Builds a precise slide variation prompt for Nano Banana 2 based on the deconstructed reference picture.
 */
export function generateSlideVariationPrompt(params: {
  slide: CarouselSlideCopy;
  referenceStyle: DeconstructedReferenceStyle;
  outputFileName: string;
  totalSlides?: number;
  aspectRatio?: string;
  cookbookStyle?: { name: string; prompt?: string; rawJson?: any };
}): NanoBananaSlidePromptJob {
  const { slide, referenceStyle, outputFileName, totalSlides = 8, aspectRatio = '4:5', cookbookStyle } = params;
  const isFinalSlide = slide.slideIndex === totalSlides;

  let prompt = '';
  if (cookbookStyle && cookbookStyle.rawJson) {
    const json = cookbookStyle.rawJson;
    const deconstruct = json.visual_deconstruction || {};
    
    prompt = `Create a high-fidelity visual poster for this carousel slide based on the official AI Visual Prompt Cookbook specification: "${cookbookStyle.name}".

=== [1. BRAND ANCHOR] ===
• BRAND LOGO / MARK: "project\\ciel" (lowercase with signature forward slash). Always keep the brand logo consistent.

=== [2. DAY'S COOKBOOK VISUAL STYLE SPECIFICATION: ${cookbookStyle.name.toUpperCase()}] ===
• STYLE SUMMARY: ${json.style_summary || 'Visual style from AI Visual Prompt Cookbook.'}
• VISUAL GENRE: ${deconstruct.style_category || 'Haute-couture visual style'}
• COMPOSITION LOGIC: ${deconstruct.composition_logic || 'Strict visual hierarchy'}
• SUBJECT PLACEMENT: ${deconstruct.subject_placement || 'Central hero placement'}
• CAMERA & PERSPECTIVE: ${deconstruct.camera_angle_or_perspective || 'Professional focal length'}
• TYPOGRAPHY SYSTEM: ${deconstruct.typography_style || 'Bold graphic typography'}
• COLOR PALETTE: ${deconstruct.color_palette_behavior || 'Disciplined color palette'}
• GRAPHIC ELEMENTS: ${deconstruct.graphic_elements || 'Sticker badges, labels and stamps'}
• TEXTURE & FINISH: ${deconstruct.texture_and_finish || 'High-fidelity finish'}
• LIGHTING: ${deconstruct.lighting || 'Studio lighting'}

=== [3. MANDATORY STYLE FIDELITY ANCHORS] ===
${json.style_fidelity_anchors && Array.isArray(json.style_fidelity_anchors) 
  ? json.style_fidelity_anchors.map((a: string) => `• ${a}`).join('\n')
  : '• Maintain strict visual fidelity to the cookbook specification.'}

=== [4. TOPIC & SLIDE COPY] ===
• HEADLINE (MAIN_TEXT): "${slide.header.toUpperCase()}"
${slide.subhead ? `• SUBHEAD (SECONDARY_TEXT): "${slide.subhead}"\n` : ''}${slide.bodyBullets && slide.bodyBullets.length > 0 ? `• BODY COPY:\n${slide.bodyBullets.map(b => `  - ${b}`).join('\n')}\n` : ''}${slide.badgeText ? `• BADGE STAMP: "${slide.badgeText}"\n` : ''}• FORMAT: 1080 x 1350 vertical ratio (4:5)\n\n`;
  }

  if (isFinalSlide) {
    prompt += `=== [FINAL SLIDE: HIGH-CONVERTING CALL-TO-ACTION (CTA) DIRECTIVE] ===\n`;
    prompt += `• PURPOSE: Final slide of the carousel (${slide.slideIndex} of ${totalSlides}). Must drive high-converting DM keyword leads, saves, and Telegram community joins.\n`;
    prompt += `• PROMINENT DM TRIGGER WORD: Display massive high-contrast headline: "COMMENT ${slide.badgeText || 'KEYWORD'} TO GET THE RAW PACK"\n`;
    prompt += `• VALUE OFFER: "Get all raw prompt files, editable Figma templates, and asset breakdowns sent directly to your DM."\n`;
    prompt += `• COMMUNITY & SAVE CALLOUT: Include community tag "join @projectciel on Telegram" and bookmark prompt "💾 Save this post for your next prompt run | ↗️ Share with a founder".\n`;
    prompt += `• VISUAL STRUCTURE: Full-bleed campaign finish matching Cookbook style "${cookbookStyle?.name || 'Cookbook Style'}". Integrated logo "project\\ciel" and CTA text directly in the AI image.\n\n`;
  } else if (slide.slideIndex > 1) {
    prompt += `=== [MIDDLE SLIDES 2-${totalSlides - 1}: NEGATIVE SPACE DIRECTIVE FOR TEXT OVERLAY] ===\n`;
    prompt += `• AESTHETIC VISUAL BACKGROUND: Generate an evocative visual background matching Cookbook style "${cookbookStyle?.name || 'Cookbook Style'}".\n`;
    prompt += `• CRITICAL NEGATIVE SPACE REQUIREMENT: Leave 70% generous uncluttered central negative space / clean background area in the center and lower frame for programmatic text overlay.\n`;
    prompt += `• MARGIN FRAMING: Push all graphic textures, subject framing, lighting caustics, and decorative elements to the outer edges so central text is 100% legible.\n`;
    prompt += `• NO CENTRAL TEXT: Do NOT render small messy text inside the middle 70% area; leave clean open space.\n\n`;
  }

  if (referenceStyle.id === 'stepped_pixel_acid_poster') {
    prompt += `=== [SWISS ACID STEPPED-POLYGON DIRECTIVE] ===\n`;
    prompt += `• Top Island: 1 stepped/pixelated contour polygon cutout with thin 1px black outline filled with Bubblegum Pastel Pink (#FF9EE2). Contains primary headline word in clean geometric sans layered with liquid melted black script.\n`;
    prompt += `• Bottom Island: 1 stepped/pixelated contour polygon cutout with thin 1px black outline filled with Electric Cobalt Blue (#5C7CFA). Contains secondary words in clean geometric sans & liquid black cursive script.\n`;
    prompt += `• Peripheral Metadata: Top header timestamp ("05 NOV // SLIDE 0${slide.slideIndex}"), vertical rotated 90-degree margin tags ("PROJECT", "CIEL"), and floating tiny micro-copy paragraphs in negative space.\n\n`;
  } else if (referenceStyle.id === 'green_amoeba_museum_poster') {
    prompt += `=== [GREEN AMOEBA BLOB DIRECTIVE] ===\n`;
    prompt += `• Center: Giant vibrant green 8-point amoeboid starburst blob (#22C55E) dominating the layout.\n`;
    prompt += `• Typography: Heavy bold condensed black grotesque headline on top-left, and beaded chain-link numbers ("0${slide.slideIndex}") on bottom-left.\n`;
    prompt += `• Metadata: Tilted oval badge with arrow, BMOP pill, and typewriter definition paragraph with smiley stamp.\n\n`;
  } else if (referenceStyle.id === 'brand_agency_graph_paper') {
    prompt += `=== [BRAND AGENCY GRAPH PAPER DIRECTIVE] ===\n`;
    prompt += `• Background: Light fine graph paper with soft neon lime-green ambient glow in corners.\n`;
    prompt += `• Badges: Tilted neon lime pill stickers with drop shadows, green target bullseye icons 🎯, and triangle crop marks on highlighted text.\n\n`;
  } else if (referenceStyle.id === 'blue_basket_notebook_sheet') {
    prompt += `=== [BLUE BASKET FLATLAY DIRECTIVE] ===\n`;
    prompt += `• Composition: Top-down photographic perspective looking into a vibrant cobalt-blue plastic grid basket with white 3-hole punched graph paper resting inside.\n`;
    prompt += `• Badges: Tilted orange/purple speech bubble sticker and handwritten blue ink script at bottom.\n\n`;
  } else if (referenceStyle.id === 'scaffolding_neon_billboard') {
    prompt += `=== [SCAFFOLDING BILLBOARD DIRECTIVE] ===\n`;
    prompt += `• Scene: Giant vertical neon lime-green billboard banner mounted on industrial metal construction scaffolding in front of classical stone building.\n`;
    prompt += `• Typography: Massive hand-drawn brutalist condensed black display typography filling the banner.\n\n`;
  } else if (referenceStyle.id === 'editorial_photo_storytelling') {
    prompt += `=== [EDITORIAL CINEMATIC PHOTO-NARRATIVE DIRECTIVE] ===\n`;
    prompt += `• Background: Full-bleed authentic 4:5 cinematic photography (evocative, atmospheric, rich materials, 35mm film grain, natural light).\n`;
    prompt += `• Typography: Pure crisp white (#FFFFFF) text placed directly over the photograph. Massive stacked luxury editorial serif (Didot/Ogg/Playfair) with tight line height for punchlines, and clean modern white sans-serif for story paragraphs.\n`;
    prompt += `• Composition: Clean negative space placement, zero artificial stickers, zero clip art, high-status auteur editorial magazine art direction.\n\n`;
  } else if (referenceStyle.id === 'ciel_cinematic_storytelling') {
    prompt += `=== [HIGH-FASHION EDITORIAL DIRECTING DIRECTIVE (VOGUE / PRADA / JACQUEMUS / BALENCIAGA STANDARD)] ===\n`;
    prompt += `• STRICT ZERO-REPETITION RULE: Every slide MUST feature a completely unique, bespoke setting, camera angle, and physical fashion/architectural prop. BANNED: Cluttered desks, reused fur/cowhide macros, generic sofas, everyday subway cars, or simple domestic scenes.\n`;
    prompt += `• Auteur High-Fashion Art Direction: Treat every single image as a cover shoot for Vogue Italia, Prada, Jacquemus, or Balenciaga campaign. Integrate extreme dramatic angles (18mm ultra-wide low-angle worm's-eye, steep Dutch tilts, high-angle bird's-eye geometry, cinematic silhouette lighting) and avant-garde physical materiality (knurled brushed sterling silver, sculpted travertine marble, translucent molten glass, oversized structured tailoring, monolithic chrome mirrors, volcanic black sand, Mediterranean salt flats).\n\n`;

    if (slide.slideIndex === 1) {
      prompt += `• Slide 1 (The High-Status Editorial Hook): Visually arresting haute-couture campaign shoot. An avant-garde figure in an oversized structured Abyss Black cocoon coat and sculptural sunglasses standing on a cantilevered brutalist travertine ledge over a misty sunrise fjord, or a monolithic chrome mirror monolith rising from a dramatic pink Mediterranean salt flat with low golden sun flare. Extreme low-angle worm's-eye view with Dutch tilt.\n`;
      prompt += `• Slide 1 Typography: High-contrast mixed typography with varied weights, italics, and discrete architectural annotations: top-left small discrete caption '// 01 · CIEL NARRATIVE CORE', main headline in heavy bold serif 'Your brand' paired with delicate elegant italic serif 'needs to tell' and massive bold punch 'a STORY.', bottom-right small metadata '[DISCOVERY · 2026]'. Pure crisp white (#FFFFFF) text floating over negative space. Zero boxes, zero badges, zero stickers.\n\n`;
    } else if (slide.slideIndex === 2) {
      prompt += `• Slide 2 (The Anti-Pattern & High-Fashion Contrast): Auteur surrealist high-fashion campaign (Jacquemus / Balenciaga aesthetic): An elegant model in a razor-sharp tailored charcoal coat sitting inside a minimalist brutalist glass pavilion or vintage retro chrome diner with a sculptural chrome art piece beside them. Asymmetrical dynamic typography: top-left small label '[THE COMMON MISTAKE]' with bold sans and delicate italic subheaders, bottom-right offset bold punchline.\n\n`;
    } else if (slide.slideIndex === 3) {
      prompt += `• Slide 3 (The Parable & Intellectual Luxury): Prada-level intellectual luxury portrait: A stylish model in tailored monochrome outerwear draped across a sculpted stainless steel chaise lounge inside a modernist gallery, or reading a vintage financial newspaper on a sun-drenched architectural limestone terrace in Southern France. Clean, left-aligned white typography with natural editorial rhythm.\n\n`;
    } else if (slide.slideIndex === 4) {
      prompt += `• Slide 4 (Tactile Physical Luxury Macro): Extreme macro photograph of authentic luxury physical craftsmanship (Prada / Cartier campaign standard): Molten sculpted fluted crystal glass with brushed titanium hardware catching sharp morning caustics, or fingers feeling the fine weave of raw cashmere against a polished black obsidian block, or a knurled titanium dial reflecting golden amber caustics. Rich physical resistance, micro-texture, authentic 35mm film grain.\n\n`;
    } else if (slide.slideIndex === 5) {
      prompt += `• Slide 5 (Creative Tension & Auteur Minimalism): A high-fashion tension shoot: A lone creative director standing in a vast empty concrete hangar with dramatic cinematic spotlight cutting through atmospheric haze, or an avant-garde figure adjusting a giant architectural prototype scale model in a midnight glass studio with city lights below. High-contrast typography: clean body copy resolving into a massive Playfair Display serif punchline.\n\n`;
    } else if (slide.slideIndex === 6) {
      prompt += `• Slide 6 (The Climax / Sculptural Authority): Monumental architectural material texture or high-fashion sculptural landscape: Rich polished black Portoro marble with golden veins catching raking side-light, or a monolithic sculpted brushed aluminum surface with micro-reflections. Massive stacked Playfair Display serif headline in pure crisp white (#FFFFFF) with tight leading centered directly over the high-status texture.\n\n`;
    } else {
      prompt += `• Slide ${slide.slideIndex} (The Organic CTA & High-Status Runway): High-fashion campaign conclusion: Creative directors in sharp minimalist tailoring on an architectural rooftop pavilion overlooking a misty metropolitan skyline at dusk, with warm golden rim light and atmospheric wind movement. Minimalist 2-line white call-to-action placed cleanly at the bottom-left over negative space.\n\n`;
    }
  }

  prompt += `=== [SLIDE ${slide.slideIndex} VARIATION CONTENT] ===\n`;
  prompt += `Slide Purpose: Slide ${slide.slideIndex} of 8 (${slide.slideType.toUpperCase()})\n`;
  prompt += `Card Counter Tag: "${slide.cardIndexText}"\n`;
  if (slide.badgeText) {
    prompt += `Top Pill Badge: "${slide.badgeText}"\n`;
  }
  prompt += `Main Headline: "${slide.header}"\n`;
  if (slide.highlightWords && slide.highlightWords.length > 0) {
    prompt += `Highlight Focus: Emphasize keywords "${slide.highlightWords.join(', ')}" in the reference style container\n`;
  }
  if (slide.subhead) {
    prompt += `Subtitle / Description: "${slide.subhead}"\n`;
  }
  if (slide.bodyBullets && slide.bodyBullets.length > 0) {
    prompt += `Body Points:\n`;
    slide.bodyBullets.forEach((bullet, idx) => {
      prompt += `  ${idx + 1}. "${bullet}"\n`;
    });
  }
  if (slide.keyCallout) {
    prompt += `Callout Box: "${slide.keyCallout}"\n`;
  }
  if (slide.swipePrompt) {
    prompt += `Bottom Prompt: "${slide.swipePrompt}"\n`;
  }

  prompt += `\n=== [OUTPUT SPECIFICATIONS] ===\n`;
  prompt += `Aspect Ratio: 4:5 vertical portrait (1080x1350) for Instagram Carousel.\n`;
  prompt += `Quality: Ultra-sharp typography, perfect spelling, crisp vector edges, flat 2D graphic poster aesthetic, zero AI blur, zero CGI sheen.`;

  return {
    slideIndex: slide.slideIndex,
    slideType: slide.slideType,
    referenceImagePath: referenceStyle.referencePath,
    prompt,
    aspectRatio,
    outputFileName,
  };
}

import { selectNextCookbookStyle, type CookbookStyleDefinition } from './style_manager.js';

/**
 * Builds the complete 8-slide Nano Banana 2 prompt batch, runs the Visual Fidelity Self-Checker,
 * and saves the verified output to out/nano_banana_prompts/.
 */
export function buildNanoBananaVariationBatch(params: {
  copyPackage: CarouselCopyPackage;
  referenceStyleKey?: string;
  outputDir?: string;
}): NanoBananaBatchResult {
  const { copyPackage, referenceStyleKey = 'stepped_pixel_acid_poster', outputDir } = params;
  const referenceStyle = getDeconstructedReference(referenceStyleKey);

  let cookbookStyle: CookbookStyleDefinition | undefined = undefined;
  try {
    cookbookStyle = selectNextCookbookStyle();
    console.log(`📖 [AI Visual Prompt Cookbook] Active Style: "${cookbookStyle.name}" (${cookbookStyle.slug})`);
  } catch (e) {
    console.warn(`⚠️ Could not load cookbook style:`, e);
  }

  const resolvedOutputDir = outputDir
    ? path.resolve(process.cwd(), outputDir)
    : path.resolve(process.cwd(), 'out/nano_banana_prompts', copyPackage.topicKey);

  if (!fs.existsSync(resolvedOutputDir)) {
    fs.mkdirSync(resolvedOutputDir, { recursive: true });
  }

  const totalSlides = copyPackage.slides.length;

  // 1. Initial Prompt Generation
  const initialBatch: NanoBananaSlidePromptJob[] = copyPackage.slides.map((slide) => {
    const fileName = `slide_0${slide.slideIndex}.png`;
    return generateSlideVariationPrompt({
      slide,
      referenceStyle,
      outputFileName: fileName,
      totalSlides,
      aspectRatio: '4:5',
      cookbookStyle,
    });
  });

  // 2. Visual Fidelity Self-Checker Pass (Audit & Auto-Repair)
  const { verifiedBatch, auditReport } = auditBatchFidelity({
    batch: initialBatch,
    referenceStyle,
  });

  // 3. Write verified slide prompt files to disk
  verifiedBatch.forEach((job) => {
    const promptPath = path.join(resolvedOutputDir, `prompt_slide_0${job.slideIndex}.txt`);
    fs.writeFileSync(promptPath, job.prompt, 'utf8');
  });

  // 4. Write master batch JSON
  const summaryPath = path.join(resolvedOutputDir, 'prompts_batch.json');
  fs.writeFileSync(summaryPath, JSON.stringify(verifiedBatch, null, 2), 'utf8');

  return {
    batch: verifiedBatch,
    promptsDir: resolvedOutputDir,
    summaryPath,
    fidelityReport: auditReport,
  };
}

export const buildCarouselGenerationBatch = buildNanoBananaVariationBatch;
