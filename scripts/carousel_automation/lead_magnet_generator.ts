import fs from 'node:fs';
import path from 'node:path';
import type { CarouselCopyPackage } from './copy_extractor.js';

export const TELEGRAM_COMMUNITY_URL = 'https://t.me/projectciel';

export interface DigitalProductPackage {
  triggerWord: string;
  productTitle: string;
  productType: 'cheatsheet' | 'checklist' | 'blueprint' | 'prompt_pack' | 'roadmap';
  htmlDocPath: string;
  htmlContent: string;
  instagramDmScript: string;
  commentReplyVariations: string[];
}

/**
 * Open Design Interactive Lead Magnet Generator:
 * Renders an official Open Design two-spread luxury interactive e-guide & prompt playbook
 * following design-systems/project-ciel/DESIGN.md and design-templates/digital-eguide.
 * Fully integrated with Telegram Community redirects.
 */
export function generateDigitalLeadMagnet(params: {
  carouselCopy: CarouselCopyPackage;
  triggerWord?: string;
  brandHandle?: string;
  telegramUrl?: string;
  outputDir?: string;
}): DigitalProductPackage {
  const {
    carouselCopy,
    triggerWord = 'CIEL',
    brandHandle = 'project\\ciel (@junnbuilds)',
    telegramUrl = TELEGRAM_COMMUNITY_URL,
    outputDir = 'out/digital_products',
  } = params;

  const rawTitle = carouselCopy.topicTitle || (carouselCopy as any).topic || 'Auteur Directing Playbook';
  const productTitle = `${rawTitle} — Interactive Playbook`;
  const sanitizedTitle = rawTitle
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
  <title>${productTitle} // open design</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,600;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --abyss: #070709;
      --slate: #111115;
      --slate-card: #18181E;
      --white: #FFFFFF;
      --platinum: #E4E4EB;
      --muted: #82828C;
      --border: rgba(228, 228, 235, 0.12);
      --border-focus: rgba(228, 228, 235, 0.3);
      --accent-lime: #10B981;
      --accent-pink: #F472B6;
      --accent-telegram: #229ED9;
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
      flex-direction: column;
      align-items: center;
      padding: 40px 20px 80px;
      line-height: 1.6;
      position: relative;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 0);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 0;
    }
    .wrapper {
      width: 100%;
      max-width: 960px;
      position: relative;
      z-index: 1;
    }
    
    /* Open Design Glass HUD Header */
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(17, 17, 21, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 24px;
      margin-bottom: 32px;
      font-family: var(--font-mono);
      font-size: 11.5px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .hud-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.12);
      color: var(--accent-lime);
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid rgba(16, 185, 129, 0.25);
      font-weight: 600;
    }
    .status-badge::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-lime);
      box-shadow: 0 0 8px var(--accent-lime);
    }
    .hud-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn-action {
      background: var(--platinum);
      color: var(--abyss);
      border: none;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .btn-action:hover {
      background: var(--white);
      transform: translateY(-1px);
    }
    .btn-telegram {
      background: rgba(34, 158, 217, 0.15);
      color: #38BDF8;
      border: 1px solid rgba(34, 158, 217, 0.35);
    }
    .btn-telegram:hover {
      background: #229ED9;
      color: #FFFFFF;
      border-color: #229ED9;
    }

    /* Double Spread Container */
    .spread-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
    }
    @media (min-width: 900px) {
      .spread-container {
        grid-template-columns: 360px 1fr;
      }
    }

    /* Left Cover Card (Open Design Editorial Style) */
    .cover-card {
      background: var(--slate);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px;
      position: sticky;
      top: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cover-eyebrow {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 18px;
    }
    .cover-title {
      font-family: var(--font-display);
      font-size: 28px;
      line-height: 1.15;
      font-weight: 800;
      color: var(--white);
      margin-bottom: 14px;
    }
    .cover-title em {
      font-style: italic;
      color: var(--accent-pink);
    }
    .cover-author {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .cover-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }
    .stat-box {
      background: var(--slate-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
    }
    .stat-num {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 700;
      color: var(--platinum);
    }
    .stat-lbl {
      font-family: var(--font-mono);
      font-size: 9px;
      color: var(--muted);
      text-transform: uppercase;
      margin-top: 2px;
    }
    .cover-toc {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      margin-top: 12px;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px dashed rgba(255,255,255,0.06);
    }
    .cover-telegram-box {
      margin-top: 24px;
      background: rgba(34, 158, 217, 0.08);
      border: 1px solid rgba(34, 158, 217, 0.25);
      padding: 16px;
      border-radius: 12px;
      text-align: center;
    }
    .cover-telegram-title {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: #38BDF8;
      margin-bottom: 6px;
    }
    .cover-telegram-sub {
      font-size: 11.5px;
      color: var(--muted);
      margin-bottom: 12px;
    }

    /* Right Playbook Content Spread */
    .playbook-card {
      background: var(--slate);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 36px 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    .playbook-header {
      margin-bottom: 28px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }
    .playbook-header h2 {
      font-family: var(--font-display);
      font-size: 24px;
      color: var(--white);
      margin-bottom: 6px;
    }
    .playbook-header p {
      font-size: 13.5px;
      color: var(--muted);
    }

    /* Step / Slide Card */
    .module-card {
      background: var(--slate-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      transition: border-color 0.2s ease;
    }
    .module-card:hover {
      border-color: var(--border-focus);
    }
    .module-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .module-tag {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-lime);
      font-weight: 700;
    }
    .module-num {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
    }
    .module-title {
      font-family: var(--font-body);
      font-weight: 700;
      font-size: 17px;
      color: var(--white);
      margin-bottom: 8px;
    }
    .module-desc {
      font-size: 13.5px;
      color: var(--platinum);
      margin-bottom: 14px;
      line-height: 1.5;
    }
    .module-bullets {
      list-style: none;
      margin-bottom: 16px;
    }
    .module-bullets li {
      font-size: 12.5px;
      color: var(--muted);
      padding: 3px 0;
      padding-left: 16px;
      position: relative;
    }
    .module-bullets li::before {
      content: "✦";
      position: absolute;
      left: 0;
      color: var(--accent-lime);
      font-size: 10px;
    }

    /* 1-Click Copy Box */
    .copy-box {
      background: var(--abyss);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .copy-text {
      font-family: var(--font-mono);
      font-size: 11.5px;
      color: var(--platinum);
      white-space: pre-wrap;
      word-break: break-all;
      flex: 1;
    }
    .btn-copy {
      background: rgba(228, 228, 235, 0.1);
      border: 1px solid var(--border);
      color: var(--white);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-copy:hover {
      background: var(--accent-lime);
      color: var(--abyss);
      border-color: var(--accent-lime);
    }

    /* Big Telegram Bottom Banner */
    .telegram-banner {
      background: linear-gradient(135deg, rgba(34, 158, 217, 0.15) 0%, rgba(17, 17, 21, 0.9) 100%);
      border: 1px solid rgba(34, 158, 217, 0.35);
      border-radius: 16px;
      padding: 28px;
      margin-top: 28px;
      text-align: center;
    }
    .telegram-banner h3 {
      font-family: var(--font-display);
      font-size: 20px;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .telegram-banner p {
      font-size: 13px;
      color: var(--platinum);
      max-width: 480px;
      margin: 0 auto 18px;
    }

    /* Toast Notification */
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--white);
      color: var(--abyss);
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      padding: 10px 18px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1000;
    }
    #toast.show {
      transform: translateY(0);
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Open Design Top HUD -->
    <div class="hud-header">
      <div class="hud-left">
        <div class="status-badge">OPEN DESIGN LIVE ARTIFACT</div>
        <span>${brandHandle}</span>
      </div>
      <div class="hud-right">
        <button class="btn-action" onclick="copyAllPrompts()">📋 COPY ALL PROMPTS</button>
        <a href="${telegramUrl}" target="_blank" class="btn-action btn-telegram">📲 TELEGRAM GROUP</a>
      </div>
    </div>

    <!-- Double Spread Layout -->
    <div class="spread-container">
      
      <!-- Left Column: Editorial Cover -->
      <div class="cover-card">
        <div>
          <div class="cover-eyebrow">Interactive Digital Guide // 2026</div>
          <h1 class="cover-title">${rawTitle.split('(')[0]}</h1>
          <div class="cover-author">By <b>${brandHandle}</b> · Open Design Engine</div>
          
          <div class="cover-stats">
            <div class="stat-box">
              <div class="stat-num">8</div>
              <div class="stat-lbl">Modules</div>
            </div>
            <div class="stat-box">
              <div class="stat-num">100%</div>
              <div class="stat-lbl">Free</div>
            </div>
            <div class="stat-box">
              <div class="stat-num">1-Click</div>
              <div class="stat-lbl">Copy</div>
            </div>
          </div>

          <div class="cover-toc">
            <div class="toc-item"><span>01. Scroll-Stopping Hook</span><span>p. 01</span></div>
            <div class="toc-item"><span>02. The Core Mistake</span><span>p. 02</span></div>
            <div class="toc-item"><span>03. Reference Blueprint</span><span>p. 03</span></div>
            <div class="toc-item"><span>04. Prompt Recipe</span><span>p. 04</span></div>
            <div class="toc-item"><span>05. Saveable Cheat Sheet</span><span>p. 05</span></div>
          </div>
        </div>

        <div class="cover-telegram-box">
          <div class="cover-telegram-title">📲 PRIVATE TELEGRAM COMMUNITY</div>
          <div class="cover-telegram-sub">Raw assets, prompt drops & editable Figma files are posted daily.</div>
          <a href="${telegramUrl}" target="_blank" class="btn-action btn-telegram" style="width:100%; justify-content:center;">JOIN TELEGRAM GROUP</a>
        </div>
      </div>

      <!-- Right Column: Interactive Playbook -->
      <div class="playbook-card">
        <div class="playbook-header">
          <h2>The Step-by-Step Playbook</h2>
          <p>Click any prompt box to instantly copy the exact formula to your clipboard.</p>
        </div>

        ${carouselCopy.slides
          .map((slide, idx) => {
            const promptCode =
              slide.keyCallout ||
              `Use reference style, 50mm clean lighting, razor-sharp typography for: "${slide.header}".`;
            return `
          <div class="module-card">
            <div class="module-meta">
              <span class="module-tag">Module ${String(idx + 1).padStart(2, '0')}</span>
              <span class="module-num">Slide ${idx + 1}/8</span>
            </div>
            <div class="module-title">${slide.header}</div>
            <div class="module-desc">${slide.subhead || ''}</div>
            <ul class="module-bullets">
              ${(slide.bodyBullets || []).map((b) => `<li>${b}</li>`).join('')}
            </ul>
            <div class="copy-box">
              <div class="copy-text" id="prompt-${idx}">${promptCode}</div>
              <button class="btn-copy" onclick="copyPrompt('prompt-${idx}')">📋 COPY</button>
            </div>
          </div>
        `;
          })
          .join('')}

        <!-- Big Telegram Community Card -->
        <div class="telegram-banner">
          <h3>Join the VIP Telegram Creator Community 🚀</h3>
          <p>Get instant access to all raw 8K prompt files, editable Figma templates, and weekly breakdown sessions.</p>
          <a href="${telegramUrl}" target="_blank" class="btn-action btn-telegram" style="font-size:12px; padding:10px 24px;">📲 JOIN TELEGRAM GROUP (FREE)</a>
        </div>

      </div>
    </div>
  </div>

  <div id="toast">Prompt copied to clipboard! ✅</div>

  <script>
    function copyPrompt(id) {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Prompt copied to clipboard! ✅');
      });
    }

    function copyAllPrompts() {
      const texts = Array.from(document.querySelectorAll('.copy-text'))
        .map((el, idx) => \`--- Module \${idx + 1} ---\\n\${el.innerText}\`)
        .join('\\n\\n');
      navigator.clipboard.writeText(texts).then(() => {
        showToast('All 8 prompts copied to clipboard! ✅');
      });
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(htmlDocPath, htmlContent, 'utf8');
  console.log(`📦 [Open Design Lead Magnet] Created: ${htmlDocPath}`);

  const instagramDmScript = `Hey there! 🎁 Here is the private Telegram group invite link for "${rawTitle}":\n\n📲 Join Telegram: ${telegramUrl}\n\nAll raw prompt files, editable Figma templates, and the interactive playbook are pinned inside the group. See you inside! 🚀`;

  const commentReplyVariations = [
    `Sent the Telegram invite link to your DMs! 📲`,
    `Just DMed you the private Telegram link! 🎁`,
    `Delivered to your inbox! Check your DMs for the Telegram group link ✨`,
    `Invite sent! All prompt templates are pinned in the Telegram group 🚀`,
  ];

  return {
    triggerWord,
    productTitle,
    productType: 'blueprint',
    htmlDocPath,
    htmlContent,
    instagramDmScript,
    commentReplyVariations,
  };
}
