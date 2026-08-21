import type { DigitalProductPackage } from './lead_magnet_generator.js';

export interface OpenReplyCampaignConfig {
  campaignName: string;
  triggerKeywords: string[];
  matchType: 'exact' | 'contains';
  dmMessage: string;
  publicCommentReplies: string[];
  enableFollowGate: boolean;
  linkButtonUrl: string;
  linkButtonTitle: string;
}

/**
 * Builds an OpenReply campaign configuration matching the carousel and generated lead magnet.
 */
export function buildOpenReplyCampaignConfig(params: {
  product: DigitalProductPackage;
  leadMagnetUrl?: string;
  brandHandle?: string;
  enableFollowGate?: boolean;
}): OpenReplyCampaignConfig {
  const {
    product,
    leadMagnetUrl = 'https://junnbuilds.com/resources/' + product.triggerWord.toLowerCase(),
    brandHandle = '@junnbuilds',
    enableFollowGate = true,
  } = params;

  const trigger = product.triggerWord.toUpperCase();
  const triggerLower = product.triggerWord.toLowerCase();
  const triggerCapitalized = product.triggerWord.charAt(0).toUpperCase() + product.triggerWord.slice(1).toLowerCase();

  return {
    campaignName: `Auto-DM: ${product.productTitle} [${trigger}]`,
    triggerKeywords: [trigger, triggerLower, triggerCapitalized],
    matchType: 'contains',
    dmMessage: `Hey {username}! 👋 Thanks for commenting on our carousel.\n\nHere is your free access to the *${product.productTitle}* 👇`,
    publicCommentReplies: product.commentReplyVariations,
    enableFollowGate,
    linkButtonUrl: leadMagnetUrl,
    linkButtonTitle: `Access ${product.triggerWord} Guide 🚀`,
  };
}
