import path from 'node:path';
import type { CarouselSlideCopy } from './copy_extractor.js';

export interface SlideGenerationJob {
  slideIndex: number;
  slideType: string;
  referenceImagePath: string | null;
  prompt: string;
  aspectRatio: '4:5' | '1:1';
  outputFileName: string;
  isStrictBrandDay: boolean;
}

export interface BrandOutline {
  brandName?: string;
  handle?: string;
  tagline?: string;
  colors?: {
    abyssBlack?: string;
    crispWhite?: string;
    mutedPlatinum?: string;
    studioSlate?: string;
  };
  typography?: {
    displaySerif?: string;
    bodyAndHud?: string;
  };
  visualDoctrine?: string;
}

export const PROJECT_CIEL_BRAND: BrandOutline = {
  brandName: 'project\\ciel',
  handle: '@junnbuilds',
  tagline: 'BEYOND THE FRAME, INTO FEELING',
  colors: {
    abyssBlack: '#0A0A0C',
    crispWhite: '#FFFFFF',
    mutedPlatinum: '#E2E2E8',
    studioSlate: '#141418',
  },
  typography: {
    displaySerif: 'Playfair / High-Contrast Editorial Luxury Serif',
    bodyAndHud: 'Archivo 300 Light / Archivo 900 Bold with Swiss HUD framing',
  },
  visualDoctrine:
    'Deep Abyss Black background (#0A0A0C), subtle tactile stipple dither noise gradient, razor-sharp crisp white typography (#FFFFFF), muted platinum accents (#E2E2E8), 7-block pixel constellation monogram, Swiss HUD metadata tags (e.g. 01 // MANIFESTO, SPEC: 2026.01), high-fashion auteur cinema aesthetic.',
};

/**
 * Builds the Nano Banana 2 image generation prompt for a given carousel slide.
 * Supports weekly policy:
 * - 1 day a week (Strict Brand Day): Uses strict project\ciel Abyss Black & Playfair luxury system.
 * - 6 days a week (Reference Style Days): Derives text styling, color palette, graphic containers, and visual texture directly from the reference image!
 */
export function buildNanoBananaSlidePrompt(params: {
  slide: CarouselSlideCopy;
  referenceImagePath: string | null;
  styleName: string;
  isStrictBrandDay?: boolean;
  brandOutline?: BrandOutline;
  aspectRatio?: '4:5' | '1:1';
}): SlideGenerationJob {
  const {
    slide,
    referenceImagePath,
    styleName,
    isStrictBrandDay = false,
    brandOutline = PROJECT_CIEL_BRAND,
    aspectRatio = '4:5',
  } = params;

  const padNum = slide.slideIndex < 10 ? `0${slide.slideIndex}` : `${slide.slideIndex}`;
  const outputFileName = `slide_${padNum}.png`;

  let prompt = `Use this image as reference but add my copy and branding to it.\n\n`;

  if (referenceImagePath) {
    prompt += `Reference image style source: ${path.basename(referenceImagePath)}\n\n`;
  }

  if (isStrictBrandDay) {
    // 1x/week: Strict Brand Guidelines Day
    prompt += `=== [STRICT BRAND DAY: project\\ciel MASTER DOCTRINE] ===\n`;
    prompt += `Brand Mark: "project\\ciel" (@junnbuilds)\n`;
    prompt += `Tagline: "BEYOND THE FRAME, INTO FEELING"\n`;
    prompt += `Color Architecture: Strict Abyss Black (#0A0A0C) background, Studio Slate (#141418) cards, Crisp White (#FFFFFF) primary text, Muted Platinum (#E2E2E8) secondary accents.\n`;
    prompt += `Typography: High-contrast Editorial Serif (Playfair style) for titles; Swiss Archivo (300/900) for body and technical stamps.\n`;
    prompt += `Aesthetics: Tactile stipple dither gradient over deep obsidian, Swiss HUD metadata, 7-block pixel constellation monogram, 8K auteur commercial cinema look.\n\n`;
  } else {
    // 6x/week: Reference-Derived Style Days (Adopting colors, typography, stickers, textures, and asset styling from reference image)
    prompt += `=== [REFERENCE-DERIVED STYLE: STYLE, TYPOGRAPHY & ASSET DIRECTION] ===\n`;
    prompt += `Directive: ADOPT VISUAL STYLE, TYPOGRAPHY, AND ASSET CREATION DIRECTION DIRECTLY FROM THE REFERENCE IMAGE!\n`;
    prompt += `• Visual Style Direction: Match the lighting, background texture (e.g. grid paper, brutalist concrete, obsidian dither, seamless gradient), depth of field, and color palette from the reference image.\n`;
    prompt += `• Typography Direction: Replicate the exact typography hierarchy, font styles (bold brutalist sans, luxury editorial serif, distressed typewriter, or handwritten accent notes), uppercase/lowercase styling, and letter-spacing from the reference image.\n`;
    prompt += `• Asset Creation Direction: Replicate the graphic container geometry (stepped pixel borders, speech bubble pills, highlight tape strips, street sticker stamps, Swiss HUD metadata boxes, and physical object staging) from the reference image.\n`;
    prompt += `• Content Insertion: Cleanly render our slide copy into this exact aesthetic layout with crisp, high-resolution graphic design.\n`;
    prompt += `• Brand Signature: Include a subtle "@junnbuilds" or "project\\ciel" micro-label in the typography style of the reference image.\n\n`;
  }

  prompt += `=== SLIDE ${slide.slideIndex} (${slide.slideType.toUpperCase()}) CONTENT ===\n`;
  if (slide.swissHudMetadata) {
    prompt += `Top Metadata / Header: "${slide.swissHudMetadata}"\n`;
  }
  if (slide.badgeText) {
    prompt += `Top Tag / Badge: "${slide.badgeText}"\n`;
  }
  prompt += `Card Index: "${slide.cardIndexText}"\n`;
  prompt += `Main Headline: "${slide.header}"\n`;
  if (slide.subhead) {
    prompt += `Subtitle: "${slide.subhead}"\n`;
  }
  if (slide.bodyBullets && slide.bodyBullets.length > 0) {
    prompt += `Body Points:\n${slide.bodyBullets.map((b) => `• ${b}`).join('\n')}\n`;
  }
  if (slide.keyCallout) {
    prompt += `Key Takeaway Callout Box: "${slide.keyCallout}"\n`;
  }
  if (slide.swipePrompt) {
    prompt += `Bottom Swipe Prompt: "${slide.swipePrompt}"\n`;
  }

  prompt += `\nOutput format: 4:5 vertical portrait for Instagram Carousel. Razor-sharp typography, ultra-high resolution, zero blur, no typos.`;

  return {
    slideIndex: slide.slideIndex,
    slideType: slide.slideType,
    referenceImagePath,
    prompt,
    aspectRatio,
    outputFileName,
    isStrictBrandDay,
  };
}

export function buildCarouselGenerationBatch(params: {
  slides: CarouselSlideCopy[];
  referenceImages: string[];
  styleName: string;
  isStrictBrandDay?: boolean;
  brandOutline?: BrandOutline;
  aspectRatio?: '4:5' | '1:1';
}): SlideGenerationJob[] {
  const {
    slides,
    referenceImages,
    styleName,
    isStrictBrandDay = false,
    brandOutline = PROJECT_CIEL_BRAND,
    aspectRatio = '4:5',
  } = params;

  return slides.map((slide, idx) => {
    const refImage =
      referenceImages.length > 0
        ? referenceImages[idx % referenceImages.length]
        : null;

    return buildNanoBananaSlidePrompt({
      slide,
      referenceImagePath: refImage,
      styleName,
      isStrictBrandDay,
      brandOutline,
      aspectRatio,
    });
  });
}
