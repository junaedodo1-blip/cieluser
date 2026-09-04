import fs from 'node:fs';
import path from 'node:path';
import { SINGLE_TOPIC_CAROUSEL_BLUEPRINTS, type SingleTopicKey } from './copy_extractor.js';

export interface OpenReplyCampaignConfig {
  topicKey: string;
  topicTitle: string;
  triggerKeyword: string;
  publicCommentReply: string;
  privateDmMessage: string;
  leadMagnetUrl: string;
}

export function generateOpenReplyCampaigns(): OpenReplyCampaignConfig[] {
  const telegramUrl = 'https://t.me/projectciel';
  const topicKeys = Object.keys(SINGLE_TOPIC_CAROUSEL_BLUEPRINTS) as SingleTopicKey[];

  return topicKeys.map((key) => {
    const blueprint = SINGLE_TOPIC_CAROUSEL_BLUEPRINTS[key];

    return {
      topicKey: key,
      topicTitle: blueprint.topicTitle,
      triggerKeyword: blueprint.triggerWord.toUpperCase(),
      publicCommentReply: 'Done! Check your DM for direct VIP access to our Telegram prompt channel!',
      privateDmMessage: 'Hey! Here is your instant access to the raw prompt files, Figma templates & daily drops for ' + blueprint.topicTitle + ':\n\n👉 Join ' + telegramUrl + '\n\nTap the link above to join @projectciel on Telegram!',
      leadMagnetUrl: telegramUrl,
    };
  });
}

export function exportOpenReplyManifest(): string {
  const campaigns = generateOpenReplyCampaigns();
  const outPath = path.resolve(process.cwd(), 'out/openreply_campaigns_manifest.json');
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outPath, JSON.stringify(campaigns, null, 2), 'utf8');
  console.log('OpenReply Exported ' + campaigns.length + ' campaigns manifest pointing to Telegram: ' + outPath);
  return outPath;
}

exportOpenReplyManifest();
