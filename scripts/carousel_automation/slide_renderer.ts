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

export type SlideRendererStyle =
  | 'brand_world_minimalist' // Matching Folder 6 reference ("How to build a Brand World")
  | 'luxury_brand_book'      // Matching Folder 2 reference ("Obsession Worthy Brands")
  | 'tech_ai_darkmode'       // Matching Folder 7 reference ("How We Use AI")
  | 'notebook_graph_paper';  // Graph paper grid with stickers

export function generateSlideHtml(
  slide: CarouselSlideCopy,
  copyPackage: CarouselCopyPackage,
  styleKey: SlideRendererStyle = 'brand_world_minimalist'
): string {
  const isSlide1 = slide.slideIndex === 1;

  if (styleKey === 'brand_world_minimalist') {
    // FOLDER 6 REFERENCE STYLE: Clean Swiss Minimalist & Concentric Layer Design
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Syne:wght@700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1350px;
      background-color: #0E0F12;
      color: #F4F4F6;
      font-family: 'Archivo', -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px;
      overflow: hidden;
      position: relative;
    }

    /* Architectural Header Navigation */
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 24px;
      z-index: 10;
    }
    .brand-logo {
      font-family: 'Syne', sans-serif;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-logo span {
      color: #8E8D9A;
      font-size: 20px;
      font-weight: 600;
    }
    .nav-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: #8E8D9A;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* Content Stage */
    .stage {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 40px 0;
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #E2E1E8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
      padding: 8px 18px;
      border-radius: 100px;
      margin-bottom: 32px;
      align-self: flex-start;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      background: #6366F1;
      border-radius: 50%;
    }

    .headline-main {
      font-family: 'Syne', sans-serif;
      font-size: ${isSlide1 ? '64px' : '48px'};
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      margin-bottom: 24px;
      text-transform: lowercase;
    }

    .subhead-text {
      font-size: 24px;
      line-height: 1.5;
      color: #A1A0AE;
      font-weight: 400;
      margin-bottom: 36px;
      max-width: 900px;
    }

    /* Cards / Diagram Structure */
    .card-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }
    .list-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px 30px;
      display: flex;
      align-items: flex-start;
      gap: 20px;
      transition: all 0.2s ease;
    }
    .card-icon {
      font-family: 'JetBrains Mono', monospace;
      font-size: 18px;
      color: #6366F1;
      font-weight: 700;
      margin-top: 2px;
    }
    .card-content {
      font-size: 22px;
      line-height: 1.4;
      color: #E2E1E8;
      font-weight: 500;
    }

    /* Formula Box */
    .callout-box {
      margin-top: 28px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 16px;
      padding: 24px 30px;
    }
    .callout-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #818CF8;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .callout-body {
      font-family: 'JetBrains Mono', monospace;
      font-size: 18px;
      color: #FFFFFF;
      font-weight: 600;
      line-height: 1.4;
    }

    /* Footer */
    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: #8E8D9A;
    }
    .footer-left {
      color: #FFFFFF;
      font-weight: 700;
    }
    .footer-right {
      color: #818CF8;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="top-nav">
    <div class="brand-logo">project<span>\\</span>ciel</div>
    <div class="nav-meta">${slide.cardIndexText}</div>
  </div>

  <div class="stage">
    <div class="badge-pill">
      <span class="badge-dot"></span>
      ${slide.badgeText || 'BRAND WORLDBUILDING'}
    </div>

    <h1 class="headline-main">${slide.header}</h1>

    ${slide.subhead ? `<p class="subhead-text">${slide.subhead}</p>` : ''}

    ${
      slide.bodyBullets && slide.bodyBullets.length > 0
        ? `
      <div class="card-list">
        ${slide.bodyBullets
          .map(
            (b) => `
          <div class="list-card">
            <span class="card-icon">↗</span>
            <div class="card-content">${b}</div>
          </div>`
          )
          .join('')}
      </div>`
        : ''
    }

    ${
      slide.keyCallout
        ? `
      <div class="callout-box">
        <div class="callout-header">⚡ ACTIONABLE FORMULA</div>
        <div class="callout-body">${slide.keyCallout}</div>
      </div>`
        : ''
    }
  </div>

  <div class="bottom-bar">
    <div class="footer-left">@JUNNBUILDS // AUTEUR SPEC</div>
    <div class="footer-right">SWIPE FOR NEXT ACT →</div>
  </div>
</body>
</html>`;
  }

  // Fallback to legacy graph paper style if explicitly requested
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
    .top-nav { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; }
    .nav-left { font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 900; color: #0A0A0C; }
    .nav-right { display: flex; gap: 20px; font-size: 22px; font-weight: 700; }
    .poster-stage { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .pink-highlighter { background: #FCE7F3; padding: 0px 24px; border-radius: 6px; display: inline-block; }
    .headline-stack { font-size: 58px; font-weight: 900; line-height: 1.1; margin-bottom: 24px; }
    .subhead-editorial { font-size: 24px; line-height: 1.45; color: #4A4A52; margin-bottom: 20px; }
    .step-card-container { display: flex; flex-direction: column; gap: 16px; margin: 24px 0; }
    .step-card { background: #FFFFFF; border: 1px solid #0A0A0C; border-radius: 14px; padding: 22px 26px; display: flex; gap: 18px; box-shadow: 3px 4px 0px #0A0A0C; }
    .code-box { background: #FFFFFF; border: 2px solid #0A0A0C; border-radius: 14px; padding: 22px 26px; margin-top: 14px; box-shadow: 4px 5px 0px #0A0A0C; }
    .code-box-header { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 800; }
    .code-box-content { font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 600; }
    .bottom-bar { display: flex; justify-content: space-between; border-top: 1px solid rgba(10,10,12,0.15); padding-top: 18px; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
    .bottom-tag { background: #0A0A0C; color: #FFFFFF; padding: 6px 14px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="top-nav">
    <div class="nav-left"><span>‹</span> project\\ciel.</div>
    <div class="nav-right"><span>☰</span><span>🔍</span><span>+</span></div>
  </div>
  <div class="poster-stage">
    ${
      isSlide1
        ? `<div class="headline-stack"><div>${firstHalf}</div><div class="pink-highlighter">${secondHalf}</div></div>${slide.subhead ? `<p class="subhead-editorial">${slide.subhead}</p>` : ''}`
        : `<div class="headline-stack"><div class="pink-highlighter" style="font-size: 48px;">${slide.header}</div></div>${slide.subhead ? `<p class="subhead-editorial">${slide.subhead}</p>` : ''}<div class="step-card-container">${(slide.bodyBullets || []).map(b => `<div class="step-card"><span>✦</span><span>${b}</span></div>`).join('')}</div>${slide.keyCallout ? `<div class="code-box"><div class="code-box-header">⚡ ACTIONABLE FORMULA</div><div class="code-box-content">${slide.keyCallout}</div></div>` : ''}`
    }
  </div>
  <div class="bottom-bar">
    <div class="bottom-tag">@JUNNBUILDS // CIEL SPEC</div>
    <div>${slide.swipePrompt || 'SWIPE NEXT →'}</div>
  </div>
</body>
</html>`;
}

export async function renderCarouselSlidesToImages(params: {
  copyPackage: CarouselCopyPackage;
  outputDir?: string;
  styleKey?: SlideRendererStyle;
}): Promise<RenderedSlideResult[]> {
  const { copyPackage, outputDir = 'out/carousel_runs', styleKey = 'brand_world_minimalist' } = params;

  const timestamp = Date.now();
  const runDir = path.resolve(process.cwd(), outputDir, `run_${timestamp}`);
  if (!fs.existsSync(runDir)) {
    fs.mkdirSync(runDir, { recursive: true });
  }

  console.log(`🎨 Launching Chromium renderer for 1080x1350 [${styleKey}] styled slides...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  const results: RenderedSlideResult[] = [];

  for (const slide of copyPackage.slides) {
    const html = generateSlideHtml(slide, copyPackage, styleKey);
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
