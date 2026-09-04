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
  const cdnBase = 'https://junaedodo1-blip.github.io/cieluser/';
  const topicKeys = Object.keys(SINGLE_TOPIC_CAROUSEL_BLUEPRINTS) as SingleTopicKey[];

  return topicKeys.map((key) => {
    const blueprint = SINGLE_TOPIC_CAROUSEL_BLUEPRINTS[key];
    const sanitizedTitle = blueprint.topicTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const leadMagnetPath = 'out/digital_products/lead-magnet-' + sanitizedTitle + '.html';
    const leadMagnetUrl = cdnBase + leadMagnetPath;

    return {
      topicKey: key,
      topicTitle: blueprint.topicTitle,
      triggerKeyword: blueprint.triggerWord.toUpperCase(),
      publicCommentReply: 'Done! Check your inbox/DM for the raw prompt files & Figma templates!',
      privateDmMessage: 'Hey! Here is the raw prompt pack & interactive playbook for ' + blueprint.topicTitle + ':\n\n' + leadMagnetUrl + '\n\nSave this link! It includes 1-click copy buttons for all prompts.',
      leadMagnetUrl,
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
  console.log('OpenReply Exported ' + campaigns.length + ' campaigns manifest: ' + outPath);
  return outPath;
}

exportOpenReplyManifest();
