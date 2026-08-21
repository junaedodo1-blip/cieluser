export interface BufferPostPayload {
  channelId: string;
  text: string;
  schedulingType: 'automatic' | 'notification';
  mode: 'addToQueue' | 'shareNow' | 'shareNext' | 'customScheduled';
  assets?: Array<{
    image: {
      url: string;
      thumbnailUrl?: string;
      metadata: {
        altText: string;
      };
    };
  }>;
  metadata: {
    instagram: {
      type: 'post';
      shouldShareToFeed: boolean;
      isAiGenerated?: boolean;
    };
  };
}

export const INSTAGRAM_DEFAULT_CHANNEL_ID = '6a74577299afb4434910ba18'; // junnbuilds

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
}): BufferPostPayload {
  const {
    caption,
    imageUrls,
    channelId = INSTAGRAM_DEFAULT_CHANNEL_ID,
    mode = 'addToQueue',
    schedulingType = 'automatic',
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
    schedulingType,
    mode,
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

