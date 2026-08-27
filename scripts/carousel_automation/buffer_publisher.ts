import type { CarouselCopyPackage } from './copy_extractor.js';
import { generateLinkedInPostText, type TweetContent } from './repurposing_engine.js';

export const BUFFER_CHANNELS = {
  INSTAGRAM: '6a74577299afb4434910ba18', // @junnbuilds
  TWITTER_X: '6a8866c5ccaf649a67ec320e', // @vontoliver
  LINKEDIN: '6a88672fccaf649a67ec3385',  // junaed rahman
};

export const INSTAGRAM_DEFAULT_CHANNEL_ID = BUFFER_CHANNELS.INSTAGRAM;
export const TWITTER_DEFAULT_CHANNEL_ID = BUFFER_CHANNELS.TWITTER_X;
export const LINKEDIN_DEFAULT_CHANNEL_ID = BUFFER_CHANNELS.LINKEDIN;

/**
 * Builds the Buffer API payload for an Instagram Carousel post.
 */
export function buildBufferInstagramCarouselPayload(params: {
  caption: string;
  imageUrls: string[];
  channelId?: string;
  mode?: 'addToQueue' | 'shareNow';
  schedulingType?: 'automatic' | 'notification';
  musicRecommendation?: string;
  isAiGenerated?: boolean;
}) {
  const {
    caption,
    imageUrls,
    channelId = BUFFER_CHANNELS.INSTAGRAM,
    mode = 'shareNow',
    schedulingType = 'notification',
    musicRecommendation,
    isAiGenerated = true,
  } = params;

  let finalCaption = caption;
  if (musicRecommendation && !finalCaption.includes('🎵')) {
    finalCaption += `\n\n🎵 Suggested Audio: ${musicRecommendation}`;
  }

  const assets = imageUrls.map((url, idx) => ({
    image: {
      url,
      metadata: {
        altText: `Slide ${idx + 1} of Instagram Carousel`,
      },
    },
  }));

  return {
    channelId,
    text: finalCaption,
    mode,
    schedulingType,
    assets,
    metadata: {
      instagram: {
        type: 'post',
        shouldShareToFeed: true,
        isAiGenerated,
      },
    },
  };
}

/**
 * Builds the Buffer API payload for a Twitter/X 9-Tweet Thread.
 */
export function buildBufferTwitterThreadPayload(params: {
  tweets: TweetContent[];
  imageUrls?: string[];
  channelId?: string;
  mode?: 'addToQueue' | 'shareNow';
  schedulingType?: 'automatic' | 'notification';
}) {
  const {
    tweets,
    imageUrls = [],
    channelId = BUFFER_CHANNELS.TWITTER_X,
    mode = 'addToQueue',
    schedulingType = 'automatic',
  } = params;

  const firstTweet = tweets[0]?.text || 'New thread from project\\ciel';

  // Thread items (tweets 2 through N)
  const threadItems = tweets.slice(1).map((t) => {
    const item: any = { text: t.text };
    if (t.attachedSlideIndex && imageUrls[t.attachedSlideIndex - 1]) {
      item.assets = [
        {
          image: {
            url: imageUrls[t.attachedSlideIndex - 1],
            metadata: { altText: `Slide ${t.attachedSlideIndex}` },
          },
        },
      ];
    }
    return item;
  });

  const firstTweetAssets = imageUrls[0]
    ? [
        {
          image: {
            url: imageUrls[0],
            metadata: { altText: 'Slide 1' },
          },
        },
      ]
    : undefined;

  return {
    channelId,
    text: firstTweet,
    mode,
    schedulingType,
    assets: firstTweetAssets,
    metadata: {
      twitter: {
        thread: threadItems.length > 0 ? threadItems : undefined,
      },
    },
  };
}

/**
 * Builds the Buffer API payload for a LinkedIn Post using linkedin-post-writing-skill.
 */
export function buildBufferLinkedInPayload(params: {
  copyPackage: CarouselCopyPackage;
  documentUrl?: string;
  imageUrls?: string[];
  channelId?: string;
  mode?: 'addToQueue' | 'shareNow';
  schedulingType?: 'automatic' | 'notification';
}) {
  const {
    copyPackage,
    documentUrl,
    imageUrls = [],
    channelId = BUFFER_CHANNELS.LINKEDIN,
    mode = 'addToQueue',
    schedulingType = 'automatic',
  } = params;

  const text = generateLinkedInPostText({ copyPackage });

  const assets = imageUrls.slice(0, 8).map((url, idx) => ({
    image: {
      url,
      metadata: {
        altText: `Slide ${idx + 1}`,
      },
    },
  }));

  return {
    channelId,
    text,
    mode,
    schedulingType,
    assets: assets.length > 0 ? assets : undefined,
    metadata: {
      linkedin: {},
    },
  };
}
