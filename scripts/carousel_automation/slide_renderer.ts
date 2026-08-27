import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import type { CarouselCopyPackage, CarouselSlideCopy } from './copy_extractor.js';

const require = createRequire(import.meta.url);
const { chromium } = require('../../node_modules/.pnpm/@playwright+test@1.60.0/node_modules/@playwright/test');

export interface RenderedSlideResult {
  slideIndex: number;
  filePath: string;
  fileName: string;
}

export function generateSlideHtml(
  slide: CarouselSlideCopy,
  copyPackage: CarouselCopyPackage,
  isStrictBrandDay = false
): string {
  // Reference Visual Elements extracted from media_1787326388208.jpg:
  // 1. Off-white Notebook / Graph Grid Paper background (#F9F9F7, grid: #E5E5DE)
  // 2. Minimalist App Navigation Header: "< project\\ciel" and "☰ 🔍 +"
  // 3. Large, stacked, high-contrast, editorial serif headline with tight leading
  // 4. Pastel pink / lime highlight rectangles behind keywords
  // 5. Playful floating stickers & speech bubbles (Courses, Resources... / Community pill / This Month's Trends)
  // 6. 3D micro icons (🍒, ⚡, 🪩, 💸, 🖱️ cursor pointer)

  const isSlide1 = slide.slideIndex === 1;
  const isCtaSlide = slide.slideIndex === 8;

  // Split headline for graphic layout
  const words = slide.header.split(' ');
  const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const secondHalf = words.slice(Math.ceil(words.length / 2)).join(' ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700;1,900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1350px;
      background-color: #F8F8F5;
      background-image: 
        linear-gradient(rgba(210, 210, 205, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(210, 210, 205, 0.4) 1px, transparent 1px);
      background-size: 32px 32px;
      color: #0A0A0C;
      font-family: 'Archivo', -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 64px 48px 64px;
      overflow: hidden;
      position: relative;
    }

    /* Top Minimalist App Header (matching "< plm." and "☰ 🔍 +") */
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      padding-bottom: 20px;
    }
    .nav-left {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 32px;
      font-weight: 900;
      color: #0A0A0C;
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: -0.03em;
    }
    .nav-left span {
      font-family: 'Archivo', sans-serif;
      font-weight: 400;
      font-size: 26px;
      margin-right: 4px;
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 22px;
      color: #0A0A0C;
      font-weight: 700;
    }

    /* Main Poster Stage */
    .poster-stage {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 10;
      margin: 10px 0;
    }

    /* Floating Stickers & Badges (from reference media_1787326388208.jpg) */
    .speech-bubble-green {
      position: absolute;
      top: -30px;
      left: 120px;
      background: #B4DCA4;
      border: 1px solid #0A0A0C;
      border-radius: 12px;
      padding: 10px 16px;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15px;
      font-weight: 700;
      line-height: 1.2;
      color: #0A0A0C;
      text-align: center;
      box-shadow: 2px 3px 0px #0A0A0C;
      z-index: 15;
      transform: rotate(-3deg);
    }
    .speech-bubble-blue {
      position: absolute;
      bottom: -30px;
      left: 360px;
      background: #BAE6FD;
      border: 1px solid #0A0A0C;
      border-radius: 12px;
      padding: 8px 18px;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      font-weight: 900;
      color: #0A0A0C;
      box-shadow: 2px 3px 0px #0A0A0C;
      z-index: 15;
    }
    .pill-community {
      position: absolute;
      top: 140px;
      right: 40px;
      background: #FFFFFF;
      border: 1px solid #0A0A0C;
      border-radius: 20px;
      padding: 6px 18px;
      font-size: 14px;
      font-weight: 800;
      color: #0A0A0C;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 2px 3px 0px #0A0A0C;
      z-index: 15;
    }
    .pill-community .dot {
      width: 10px;
      height: 10px;
      background: #F472B6;
      border-radius: 50%;
    }
    .pill-trends {
      position: absolute;
      bottom: 120px;
      left: 10px;
      background: #FFFFFF;
      border: 1px solid #0A0A0C;
      border-radius: 20px;
      padding: 6px 16px;
      font-size: 14px;
      font-weight: 800;
      color: #0A0A0C;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 2px 3px 0px #0A0A0C;
      z-index: 15;
    }
    .pill-trends .dot {
      width: 10px;
      height: 10px;
      background: #F472B6;
      border-radius: 50%;
    }

    /* Floating 3D Micro Icons */
    .icon-cherry {
      position: absolute;
      top: -20px;
      right: 280px;
      font-size: 40px;
      z-index: 20;
      filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15));
    }
    .icon-discoball {
      position: absolute;
      top: 120px;
      left: 20px;
      font-size: 34px;
      z-index: 20;
      filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15));
    }
    .icon-lightning {
      position: absolute;
      bottom: 240px;
      right: 140px;
      font-size: 34px;
      z-index: 20;
      filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15));
    }
    .icon-money {
      position: absolute;
      bottom: 20px;
      left: 30px;
      font-size: 36px;
      z-index: 20;
      filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15));
    }
    .icon-cursor {
      position: absolute;
      bottom: -45px;
      left: 450px;
      font-size: 28px;
      z-index: 25;
      filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.3));
    }
    .icon-cursor-top {
      position: absolute;
      top: 165px;
      right: 70px;
      font-size: 26px;
      z-index: 25;
      filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.3));
    }

    /* Massive Editorial Headline & Stacked Typography */
    .headline-stack {
      position: relative;
      z-index: 10;
      text-align: center;
      margin: 30px 0;
    }
    .headline-line {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 78px;
      line-height: 1.05;
      font-weight: 900;
      color: #0A0A0C;
      letter-spacing: -0.03em;
      position: relative;
      display: inline-block;
    }

    /* Pastel Pink Highlighter Bar (from reference) */
    .pink-highlighter {
      background: #FCE7F3;
      padding: 0px 24px;
      border-radius: 6px;
      display: inline-block;
      position: relative;
      z-index: 1;
    }

    .subhead-editorial {
      font-size: 24px;
      line-height: 1.45;
      color: #4A4A52;
      font-weight: 500;
      text-align: center;
      max-width: 820px;
      margin: 20px auto 0 auto;
    }

    /* Bullet List Cards (for Step Slides) */
    .step-card-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 24px 0;
    }
    .step-card {
      background: #FFFFFF;
      border: 1px solid #0A0A0C;
      border-radius: 14px;
      padding: 22px 26px;
      display: flex;
      align-items: flex-start;
      gap: 18px;
      box-shadow: 3px 4px 0px #0A0A0C;
    }
    .step-card-bullet {
      font-size: 22px;
      line-height: 1.2;
    }
    .step-card-text {
      font-size: 21px;
      line-height: 1.45;
      color: #0A0A0C;
      font-weight: 600;
    }

    /* Actionable Prompt Code Box */
    .code-box {
      background: #FFFFFF;
      border: 2px solid #0A0A0C;
      border-radius: 14px;
      padding: 22px 26px;
      margin-top: 14px;
      box-shadow: 4px 5px 0px #0A0A0C;
    }
    .code-box-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 800;
      color: #0A0A0C;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .code-box-content {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      color: #0A0A0C;
      line-height: 1.5;
      font-weight: 600;
    }

    /* Bottom HUD Bar */
    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(10, 10, 12, 0.15);
      padding-top: 18px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: #4A4A52;
      font-weight: 700;
      z-index: 10;
    }
    .bottom-tag {
      background: #0A0A0C;
      color: #FFFFFF;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      letter-spacing: 0.05em;
    }
    .bottom-swipe {
      color: #0A0A0C;
      font-weight: 800;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <!-- Top App Navigation (matching "< project\\ciel" and "☰ 🔍 +") -->
  <div class="top-nav">
    <div class="nav-left">
      <span>‹</span> project\\ciel.
    </div>
    <div class="nav-right">
      <span>☰</span>
      <span>🔍</span>
      <span>+</span>
    </div>
  </div>

  <!-- Main Poster Canvas Stage -->
  <div class="poster-stage">
    <!-- Floating Micro Stickers (from media_1787326388208.jpg) -->
    <div class="speech-bubble-green">
      Simple Strategy<br>& Prompt Pack
    </div>
    
    <div class="pill-community">
      <span class="dot"></span> ${slide.badgeText || 'Auteur Design'}
    </div>
    <div class="icon-cursor-top">🖱️</div>

    <div class="pill-trends">
      <span class="dot"></span> ${slide.cardIndexText}
    </div>

    <div class="speech-bubble-blue">
      project\\ciel
    </div>
    <div class="icon-cursor">🖱️</div>

    <!-- 3D Scattered Emojis -->
    <div class="icon-cherry">🍒</div>
    <div class="icon-discoball">🪩</div>
    <div class="icon-lightning">⚡</div>
    <div class="icon-money">💸</div>

    ${
      isSlide1
        ? `
      <div class="headline-stack">
        <div class="headline-line">${firstHalf}</div><br>
        <div class="headline-line pink-highlighter">${secondHalf}</div>
      </div>
      ${slide.subhead ? `<p class="subhead-editorial">${slide.subhead}</p>` : ''}
    `
        : `
      <div class="headline-stack" style="margin-bottom: 20px;">
        <div class="headline-line pink-highlighter" style="font-size: 52px;">${slide.header}</div>
      </div>
      ${slide.subhead ? `<p class="subhead-editorial" style="margin-bottom: 20px;">${slide.subhead}</p>` : ''}

      <div class="step-card-container">
        ${(slide.bodyBullets || [])
          .map(
            (b) => `
          <div class="step-card">
            <span class="step-card-bullet">✦</span>
            <span class="step-card-text">${b}</span>
          </div>`
          )
          .join('')}
      </div>

      ${
        slide.keyCallout
          ? `
        <div class="code-box">
          <div class="code-box-header">⚡ ACTIONABLE CODE // FORMULA</div>
          <div class="code-box-content">${slide.keyCallout}</div>
        </div>`
          : ''
      }
    `
    }
  </div>

  <!-- Bottom Bar -->
  <div class="bottom-bar">
    <div class="bottom-tag">@JUNNBUILDS // CIEL SPEC 2026</div>
    <div class="bottom-swipe">${slide.swipePrompt || 'SWIPE NEXT →'}</div>
  </div>
</body>
</html>`;
}

/**
 * Renders all slides into high-res (1080x1350) JPG files matching reference style.
 */
export async function renderCarouselSlidesToImages(params: {
  copyPackage: CarouselCopyPackage;
  outputDir?: string;
  isStrictBrandDay?: boolean;
}): Promise<RenderedSlideResult[]> {
  const { copyPackage, outputDir = 'out/carousel_runs', isStrictBrandDay = false } = params;

  const timestamp = Date.now();
  const runDir = path.resolve(process.cwd(), outputDir, `run_${timestamp}`);
  if (!fs.existsSync(runDir)) {
    fs.mkdirSync(runDir, { recursive: true });
  }

  console.log(`🎨 Launching Chromium renderer for 1080x1350 reference-styled slides...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  const results: RenderedSlideResult[] = [];

  for (const slide of copyPackage.slides) {
    const html = generateSlideHtml(slide, copyPackage, isStrictBrandDay);
    const fileName = `slide_0${slide.slideIndex}.jpg`;
    const filePath = path.join(runDir, fileName);

    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: filePath, type: 'jpeg', quality: 95 });

    console.log(`   ✅ Rendered Slide ${slide.slideIndex}: ${fileName}`);
    results.push({
      slideIndex: slide.slideIndex,
      filePath,
      fileName,
    });
  }

  await browser.close();
  console.log(`🎉 All ${results.length} slides rendered in ${runDir}`);
  return results;
}
