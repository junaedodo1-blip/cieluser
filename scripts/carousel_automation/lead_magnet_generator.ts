import fs from 'node:fs';
import path from 'node:path';
import type { CarouselCopyPackage } from './copy_extractor.js';

export interface DigitalProductPackage {
  triggerWord: string;
  productTitle: string;
  productType: 'cheatsheet' | 'checklist' | 'blueprint' | 'prompt_pack' | 'roadmap';
  htmlDocPath: string;
  htmlContent: string;
  instagramDmScript: string;
  commentReplyVariations: string[];
}

export function generateDigitalLeadMagnet(params: {
  carouselCopy: CarouselCopyPackage;
  triggerWord?: string;
  brandHandle?: string;
  outputDir?: string;
}): DigitalProductPackage {
  const {
    carouselCopy,
    triggerWord = 'CIEL',
    brandHandle = 'project\\ciel',
    outputDir = 'out/digital_products',
  } = params;

  const productTitle = `${carouselCopy.topic} — Free Auteur Directing & Prompt Playbook`;
  const sanitizedTitle = carouselCopy.topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const resolvedOutputDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(resolvedOutputDir)) {
    fs.mkdirSync(resolvedOutputDir, { recursive: true });
  }

  const fileName = `lead-magnet-${sanitizedTitle}.html`;
  const htmlDocPath = path.join(resolvedOutputDir, fileName);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${productTitle} // project\\ciel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,600;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --abyss: #0A0A0C;
      --slate: #141418;
      --white: #FFFFFF;
      --platinum: #E2E2E8;
      --muted: #8E8E96;
      --border: rgba(226, 226, 232, 0.12);
      --accent-green: #10B981;
      --font-display: 'Playfair Display', Georgia, serif;
      --font-body: 'Archivo', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--abyss);
      color: var(--platinum);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 60px 20px;
      line-height: 1.6;
      position: relative;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0);
      background-size: 24px 24px;
      pointer-events: none;
      z-index: 0;
    }
    .container {
      width: 100%;
      max-width: 820px;
      position: relative;
      z-index: 1;
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 16px;
      margin-bottom: 36px;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.15em;
      color: var(--muted);
      text-transform: uppercase;
    }
    .brand-mark {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 18px;
      letter-spacing: -0.03em;
      color: var(--white);
    }
    .tagline {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.25em;
      color: var(--muted);
      margin-top: 4px;
      text-transform: uppercase;
    }
    .manifesto-quote {
      font-family: var(--font-display);
      font-size: 20px;
      font-style: italic;
      line-height: 1.4;
      color: var(--white);
      border-left: 2px solid var(--white);
      padding-left: 20px;
      margin: 32px 0 40px 0;
    }
    h1 {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 800;
      color: var(--white);
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 16px;
      color: var(--muted);
      margin-bottom: 40px;
    }
    .hud-section-title {
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.15em;
      color: var(--white);
      margin: 44px 0 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
      text-transform: uppercase;
    }
    .hud-section-title::after {
      content: "";
      flex: 1;
      height: 1px;
      background: var(--border);
    }
    .card {
      background: var(--slate);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 20px;
      position: relative;
    }
    .card-meta {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .card h3 {
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--white);
      margin-bottom: 10px;
    }
    .card p {
      font-size: 14px;
      font-weight: 300;
      color: var(--platinum);
      margin-bottom: 16px;
    }
    .checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(226, 226, 232, 0.06);
      font-size: 14px;
    }
    .checklist-item:last-child { border-bottom: none; }
    .checklist-item input[type="checkbox"] {
      margin-top: 4px;
      accent-color: var(--white);
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    
    /* Code / Prompt Box */
    .prompt-box {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      padding: 16px;
      margin-top: 16px;
      position: relative;
    }
    .prompt-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
    }
    .prompt-code {
      font-family: var(--font-mono);
      font-size: 13px;
      color: #E2E2E8;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--white);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .copy-btn:hover {
      background: var(--white);
      color: var(--abyss);
    }
    .hud-callout {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 14px 18px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--white);
      margin-top: 16px;
    }
    .cta-container {
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      margin-top: 60px;
      background: linear-gradient(180deg, var(--slate) 0%, var(--abyss) 100%);
    }
    .cta-container h3 {
      font-family: var(--font-display);
      font-size: 26px;
      color: var(--white);
      margin-bottom: 12px;
    }
    .cta-container p {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 24px;
    }
    .cta-button {
      display: inline-block;
      background: var(--white);
      color: var(--abyss);
      text-decoration: none;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 14px 36px;
      border-radius: 6px;
      transition: opacity 0.2s;
    }
    .cta-button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="hud-header">
      <span>PROJECT\\CIEL // FREE CREATOR PLAYBOOK</span>
      <span>SPEC: 2026</span>
      <span>KEYWORD: [${triggerWord}]</span>
    </div>

    <div class="brand-mark">project\\ciel</div>
    <div class="tagline">BEYOND THE FRAME, INTO FEELING</div>

    <div class="manifesto-quote">
      "Anyone can make an AI video in 5 seconds. But story is what makes people stop, feel, and buy."
    </div>

    <h1>${productTitle}</h1>
    <p class="subtitle">Complete step-by-step masterclass with copy-paste Nano Banana & Higgsfield prompt codes.</p>

    <!-- SECTION 1: PROMPT PACK -->
    <div class="hud-section-title">01 // FREE COPY-PASTE PROMPTS (NANO BANANA & HIGGSFIELD)</div>

    <div class="card">
      <div class="card-meta">PROMPT 01 // NANO BANANA LUXURY POSTER FORMULA</div>
      <h3>How to Make a $5,000 Luxury Poster in 3 Minutes</h3>
      <p>Upload your reference image to Nano Banana and paste this exact prompt formula:</p>
      
      <div class="prompt-box">
        <div class="prompt-header">
          <span>NANO BANANA 2 PROMPT</span>
          <button class="copy-btn" onclick="copyText('p1')">📋 COPY PROMPT</button>
        </div>
        <div class="prompt-code" id="p1">Use this image as reference but add my copy and branding to it.
Main Headline: "${carouselCopy.hookHeadline}"
Visual Style: Match the lighting, background texture, and color palette from the reference image.
Aesthetics: 50mm clean prime portrait, raking side key light, soft highlight roll-off, lifted open shadows, fine 35mm film grain. No plastic skin, no CGI sheen. Razor-sharp typography. 4:5 vertical portrait.</div>
      </div>
    </div>

    <div class="card">
      <div class="card-meta">PROMPT 02 // HIGGSFIELD 4K VIDEO CAMERA FORMULA</div>
      <h3>How to Animate Physical Objects with Real Physics</h3>
      <p>Feed your generated poster into Higgsfield Seedance / Soul Cinema with this camera move:</p>
      
      <div class="prompt-box">
        <div class="prompt-header">
          <span>HIGGSFIELD VIDEO CODE</span>
          <button class="copy-btn" onclick="copyText('p2')">📋 COPY PROMPT</button>
        </div>
        <div class="prompt-code" id="p2">Medium shot, cinematic slow dolly in on hero physical object, 50mm FOV, shallow depth of field. Natural gravity and inertia, macro liquid viscosity splash at 1/10,000s shutter. Volumetric raking light, deep open shadows, fine 35mm motion-picture film grain, zero CGI sheen. Photographed on real cinema camera.</div>
      </div>
    </div>

    <!-- SECTION 2: SLIDE BREAKDOWN -->
    <div class="hud-section-title">02 // THE 8-STEP VISUAL LITERATURE BREAKDOWN</div>

    ${carouselCopy.slides
      .filter((s) => s.slideType !== 'ciel_cta')
      .map(
        (slide) => `
    <div class="card">
      <div class="card-meta">${slide.swissHudMetadata || `STEP 0${slide.slideIndex} // BREAKDOWN`}</div>
      <h3>${slide.header}</h3>
      ${slide.subhead ? `<p>${slide.subhead}</p>` : ''}
      <div class="checklist">
        ${(slide.bodyBullets || [
          'Pick a reference image you love',
          'Use the 9-year-old clarity formula',
          'Export in 4:5 high-res portrait',
        ])
          .map(
            (b) => `
        <label class="checklist-item">
          <input type="checkbox" checked>
          <span>${b}</span>
        </label>`
          )
          .join('')}
      </div>
      ${
        slide.keyCallout
          ? `<div class="hud-callout">
              <span>⚡ TAKEAWAY: ${slide.keyCallout}</span>
             </div>`
          : ''
      }
    </div>`
      )
      .join('\n')}

    <div class="cta-container">
      <h3>Ready to Build Auteur Brand Stories?</h3>
      <p>Follow @junnbuilds / project\\ciel on Instagram for daily Cannes-grade visual directing breakdowns.</p>
      <a href="https://instagram.com/junnbuilds" target="_blank" class="cta-button">Follow @junnbuilds</a>
    </div>
  </div>

  <script>
    function copyText(id) {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert('Prompt copied to clipboard! Paste it into Nano Banana or Higgsfield.');
      });
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(htmlDocPath, htmlContent, 'utf8');

  // Instagram DM Auto-Reply Script
  const dmScript = `Welcome to project\\ciel. ✨

Here is your free *${productTitle}*:
🔗 [Link to Free Auteur Playbook & Prompt Pack]

Inside:
🎁 1-Click Copy-Paste Nano Banana Poster Prompts
🎬 Higgsfield 4K Camera & Physics Codes
📖 Step-by-Step 3-Minute Poster Recipe

"Beyond the frame, into feeling."
— project\\ciel (@junnbuilds)`;

  const commentReplies = [
    `Sent the full free prompt pack to your DMs! 🎁 Check your inbox!`,
    `Delivered to your DMs! ⚡ Free Nano Banana & Higgsfield prompts inside.`,
    `Sent! Check your DMs for the free playbook and prompt codes. 🚀`,
    `Free prompt pack is in your inbox right now. 🔥`,
  ];

  return {
    triggerWord,
    productTitle,
    productType: 'prompt_pack',
    htmlDocPath,
    htmlContent,
    instagramDmScript: dmScript,
    commentReplyVariations: commentReplies,
  };
}
