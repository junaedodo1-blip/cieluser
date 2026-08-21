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

  const productTitle = `${carouselCopy.topic} — project\\ciel Auteur Directing Playbook`;
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

  // Generate an ultra-luxury, Swiss HUD styled lead magnet HTML document
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
      padding: 60px 24px;
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
      margin-bottom: 40px;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.15em;
      color: var(--muted);
      text-transform: uppercase;
    }
    .brand-mark {
      font-family: var(--font-display);
      font-size: 24px;
      color: var(--white);
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    .tagline {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.2em;
      color: var(--muted);
      text-transform: uppercase;
      margin-bottom: 32px;
    }
    .manifesto-quote {
      border-left: 2px solid var(--white);
      padding-left: 24px;
      margin-bottom: 48px;
      font-family: var(--font-display);
      font-style: italic;
      font-size: 20px;
      color: var(--white);
      line-height: 1.5;
    }
    h1 {
      font-family: var(--font-display);
      font-size: clamp(32px, 5vw, 46px);
      font-weight: 800;
      color: var(--white);
      line-height: 1.15;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 16px;
      font-weight: 300;
      color: var(--muted);
      margin-bottom: 48px;
    }
    .hud-section-title {
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.15em;
      color: var(--white);
      text-transform: uppercase;
      margin: 40px 0 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
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
      padding: 32px;
      margin-bottom: 24px;
      position: relative;
    }
    .card-meta {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .card h3 {
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--white);
      margin-bottom: 12px;
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
      gap: 14px;
      padding: 12px 0;
      border-bottom: 1px solid rgba(226, 226, 232, 0.06);
      font-size: 14px;
      font-weight: 400;
    }
    .checklist-item:last-child { border-bottom: none; }
    .checklist-item input[type="checkbox"] {
      margin-top: 4px;
      accent-color: var(--white);
      width: 16px;
      height: 16px;
      cursor: pointer;
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
      display: flex;
      align-items: center;
      gap: 10px;
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
      margin-bottom: 28px;
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
      <span>PROJECT\\CIEL // MASTER RELEASE</span>
      <span>SPEC: 2026.01</span>
      <span>TRIGGER: [${triggerWord}]</span>
    </div>

    <div class="brand-mark">project\\ciel</div>
    <div class="tagline">BEYOND THE FRAME, INTO FEELING</div>

    <div class="manifesto-quote">
      "Anyone can generate pixels. Today, AI makes spectacle easy. But spectacle without soul is forgotten in three seconds. Story is what makes physical objects immortal."
    </div>

    <h1>${productTitle}</h1>
    <p class="subtitle">Tactical Auteur Directing Framework & Remotion Physics Execution Guide.</p>

    <div class="hud-section-title">01 // THE 3-ACT NARRATIVE SPINE & CHECKLIST</div>

    ${carouselCopy.slides
      .filter((s) => s.slideType !== 'ciel_cta')
      .map(
        (slide) => `
    <div class="card">
      <div class="card-meta">${slide.swissHudMetadata || `SLIDE 0${slide.slideIndex} // SPEC`}</div>
      <h3>${slide.header}</h3>
      ${slide.subhead ? `<p>${slide.subhead}</p>` : ''}
      <div class="checklist">
        ${(slide.bodyBullets || [
          'Sensory Physics First: Prioritize material visco-elasticity',
          'Uncanny Juxtaposition: Place luxury in brutalist architecture',
          'Non-Uniform Pacing: Sprint tension resolving to zero-G float',
        ])
          .map(
            (b) => `
        <label class="checklist-item">
          <input type="checkbox">
          <span>${b}</span>
        </label>`
          )
          .join('')}
      </div>
      ${
        slide.keyCallout
          ? `<div class="hud-callout">
              <span>⚡ RULE: ${slide.keyCallout}</span>
             </div>`
          : ''
      }
    </div>`
      )
      .join('\n')}

    <div class="cta-container">
      <h3>Ready to Build Auteur Brand Stories?</h3>
      <p>Follow @junnbuilds / project\\ciel on Instagram for daily Cannes-grade AI directing breakdowns.</p>
      <a href="https://instagram.com/junnbuilds" target="_blank" class="cta-button">Follow project\\ciel</a>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(htmlDocPath, htmlContent, 'utf8');

  // Generate Instagram DM Auto-Reply Script matching project\ciel tone
  const dmScript = `Welcome to project\\ciel. ✨

Here is your private access to the *${productTitle}*:
🔗 [Link to Auteur Playbook & Interactive Guide]

Inside:
▫️ The 3-Act Narrative Spine (Truth → Tension → Resolve)
▫️ 8-Slide Visual Literature Architecture
▫️ Remotion Spring Physics & Macro Cinematography Tokens

"Beyond the frame, into feeling."
— project\\ciel (@junnbuilds)`;

  // Comment Reply Variations
  const commentReplies = [
    `Sent the master Auteur Playbook to your DMs! ✨ Check your requests!`,
    `Delivered to your DMs. ⚡ Welcome to project\\ciel.`,
    `Sent! Check your DMs for the full story formula. 🚀`,
    `The complete framework is in your inbox. 🔥`,
  ];

  return {
    triggerWord,
    productTitle,
    productType: 'blueprint',
    htmlDocPath,
    htmlContent,
    instagramDmScript: dmScript,
    commentReplyVariations: commentReplies,
  };
}
