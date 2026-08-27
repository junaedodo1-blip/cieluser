import fs from 'node:fs';
import path from 'node:path';
import type { CarouselCopyPackage } from './copy_extractor.js';
import type { DeconstructedReferenceStyle } from './reference_deconstructor.js';

export const TELEGRAM_CHANNEL_USERNAME = '@projectciel';
export const TELEGRAM_COMMUNITY_LINK = 'https://t.me/projectciel';

export interface TelegramBroadcastResult {
  channel: string;
  link: string;
  markdownPath: string;
  formattedText: string;
  status: 'sent' | 'staged_for_manual_or_bot';
}

/**
 * Formats and prepares a VIP broadcast package for the @projectciel Telegram group.
 */
export async function dispatchToTelegramGroup(params: {
  copyPackage: CarouselCopyPackage;
  referenceStyle?: DeconstructedReferenceStyle;
  slideImagePaths?: string[];
  pdfPath?: string;
  outputDir?: string;
}): Promise<TelegramBroadcastResult> {
  const { copyPackage, referenceStyle, slideImagePaths = [], pdfPath, outputDir = 'out/telegram' } = params;

  const resolvedDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  const sanitizedTitle = copyPackage.topicTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const mdPath = path.join(resolvedDir, `telegram-broadcast-${sanitizedTitle}.md`);

  const styleName = referenceStyle?.referenceName || 'Swiss Acid Stepped-Polygon Cutout';
  const bgDesc = referenceStyle?.backgroundDescription || 'Neutral light warm-grey canvas (#E3E3E3)';

  const formattedText = `🏛️ **PROJECT\\CIEL — VIP DAILY BREAKDOWN**

🔥 **${copyPackage.topicTitle}**
🎨 **Visual Style Blueprint:** ${styleName}

---
📖 **Core 8-Slide Breakdown:**
${copyPackage.slides
  .slice(0, 7)
  .map((s) => `• **Slide 0${s.slideIndex} (${s.slideType.toUpperCase()}):** ${s.header}\n  _${s.subhead || ''}_`)
  .join('\n\n')}

---
⚡ **Exact Prompt Recipe for Nano Banana 2:**
\`\`\`text
${copyPackage.slides[3]?.keyCallout || 'Use reference style, razor-sharp vector typography, 4:5 vertical portrait.'}
\`\`\`

---
📌 **Saveable Production Blueprint:**
• Ratio: 1080 x 1350 (4:5)
• Canvas: ${bgDesc}
• Style Spec: ${styleName}
• Zero plastic sheen, pure 2D vector print finish

🎁 **All raw Figma templates & 8K high-res slides are pinned in this group!**

💬 _Discussion / Q&A:_ Drop your generations and questions below! 👇
🔗 Group: ${TELEGRAM_COMMUNITY_LINK}`;

  fs.writeFileSync(mdPath, formattedText, 'utf8');
  console.log(`📲 [Telegram Broadcast Package] Created: ${mdPath}`);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  let status: 'sent' | 'staged_for_manual_or_bot' = 'staged_for_manual_or_bot';

  if (botToken) {
    try {
      console.log(`📲 [Telegram API] Dispatching post to ${TELEGRAM_CHANNEL_USERNAME}...`);
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHANNEL_USERNAME,
          text: formattedText,
          parse_mode: 'Markdown',
        }),
      });
      const json: any = await res.json();
      if (json.ok) {
        console.log(`✅ [Telegram API] Successfully published to ${TELEGRAM_CHANNEL_USERNAME}!`);
        status = 'sent';
      } else {
        console.warn(`⚠️ [Telegram API Error]: ${json.description}`);
      }
    } catch (e: any) {
      console.warn(`⚠️ [Telegram Dispatch Failed]: ${e?.message}`);
    }
  } else {
    console.log(`ℹ️ [Telegram] Ready in "${mdPath}" to post to ${TELEGRAM_COMMUNITY_LINK}`);
  }

  return {
    channel: TELEGRAM_CHANNEL_USERNAME,
    link: TELEGRAM_COMMUNITY_LINK,
    markdownPath: mdPath,
    formattedText,
    status,
  };
}
