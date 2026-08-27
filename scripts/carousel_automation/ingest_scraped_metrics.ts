import fs from 'node:fs';
import path from 'node:path';
import {
  loadAnalyticsState,
  saveAnalyticsState,
  ingestPostMetrics,
  type PostHistoryRecord,
  type PostPerformanceMetrics
} from './analytics_evaluator.js';

interface ScrapedPost {
  activity_id: string;
  meta: {
    author: string;
    age: string;
    text: string;
  };
  metrics: {
    impressions?: number;
    reach?: number;
    profile_views_from_post?: number;
    followers_from_post?: number;
    social_engagement?: number;
    reactions?: number;
    comments?: number;
    reposts?: number;
    saves?: number;
    sends?: number;
  };
}

async function main() {
  const scrapedFilePath = path.join(
    'C:', 'Users', 'High Tech', '.gemini', 'antigravity', 'brain',
    '21189a1f-f7bf-4d37-b25a-03f7f2f0b063', 'scratch', 'cheat-on-content',
    'adapters', 'perf-data', 'linkedin-session', 'linkedin_scraped_history.json'
  );

  if (!fs.existsSync(scrapedFilePath)) {
    console.error(`❌ Scraped history file not found at: ${scrapedFilePath}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(scrapedFilePath, 'utf-8');
  let posts: ScrapedPost[];
  try {
    posts = JSON.parse(rawJson);
  } catch (e) {
    console.error(`❌ Failed to parse scraped history JSON:`, e);
    process.exit(1);
  }

  const state = loadAnalyticsState();
  console.log(`📊 Loaded state. Current history count: ${state.history.length}`);

  let ingestedCount = 0;

  for (const post of posts) {
    const text = post.meta.text || '';
    let topicKey = 'nano_banana_posters';
    let topicTitle = 'Nano Banana Posters';
    let styleKey = 'editorial_photo_storytelling';
    let styleName = 'Editorial Photo Storytelling';

    // Content-based mapping heuristics
    if (text.includes('Stop posting random pixels') || text.includes('5-step visual strategy')) {
      topicKey = 'brand_transformation_story';
      topicTitle = 'Stop Posting Random Pixels';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    } else if (text.includes('inflatable typography') || text.includes('CIEL')) {
      topicKey = 'nano_banana_posters';
      topicTitle = 'Inflatable Typography Scale';
      styleKey = 'street_decal_object';
      styleName = 'Street Decal Object';
    } else if (text.includes('forget-table') || text.includes('forget table') || text.includes('forgetable') || text.includes('narrative tension') || text.includes('forgettable')) {
      topicKey = 'ciel_invisible_craft_story';
      topicTitle = 'Narrative Tension vs Clean';
      styleKey = 'ciel_cinematic_storytelling';
      styleName = 'Ciel Cinematic Storytelling';
    } else if (text.includes('tell a story about themselves') || text.includes('founding story')) {
      topicKey = 'founder_origin_reframe';
      topicTitle = 'Founder Journey Reframe';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    } else if (text.includes('cheap plastic toys') && text.includes('High-Fashion Editorial Campaign')) {
      topicKey = 'auteur_cultural_moat_story';
      topicTitle = 'Cheap Plastic vs Auteur';
      styleKey = 'ciel_cinematic_storytelling';
      styleName = 'Ciel Cinematic Storytelling';
    } else if (text.includes('cheap plastic toys') && text.includes('Why We Spent 3 Months Obsessed')) {
      topicKey = 'ciel_invisible_craft_story';
      topicTitle = 'Obsession with Micro-Details';
      styleKey = 'ciel_cinematic_storytelling';
      styleName = 'Ciel Cinematic Storytelling';
    } else if (text.includes('robotic') || text.includes('AI-speak')) {
      topicKey = 'viral_hook_secrets';
      topicTitle = 'Humanizing AI Copy';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    } else if (text.includes('Building AI agents used to take weeks')) {
      topicKey = 'higgsfield_video_directing';
      topicTitle = 'Paradigm Shift in AI Agents';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    } else if (text.includes('new project') || text.includes('Lineage')) {
      topicKey = 'brand_transformation_story';
      topicTitle = 'Project Ciel Architecture';
      styleKey = 'community_grid_collage';
      styleName = 'Community Grid Collage';
    } else if (text.includes('Photoshop is dead')) {
      topicKey = 'visual_directing_cinema_story';
      topicTitle = 'Photoshop is Dead';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    }

    const performance: PostPerformanceMetrics = {
      likes: post.metrics.reactions || 0,
      shares: post.metrics.reposts || 0,
      comments: post.metrics.comments || 0,
      reach: post.metrics.reach || 0,
      impressions: post.metrics.impressions || 0,
      saves: post.metrics.saves || 0,
    };

    // Check if post already exists in history
    const existingIndex = state.history.findIndex((h) => h.postId === post.activity_id);

    if (existingIndex !== -1) {
      console.log(`ℹ️ Post ${post.activity_id} already exists in history. Updating metrics...`);
      state.history[existingIndex]!.metrics = performance;
    } else {
      const historyRec: PostHistoryRecord = {
        postId: post.activity_id,
        topicKey,
        topicTitle,
        styleKey,
        styleName,
        publishedAt: new Date().toISOString(), // Since age is relative, use now or rough date
        metrics: performance,
      };
      state.history.push(historyRec);
    }

    ingestedCount++;
  }

  saveAnalyticsState(state);

  // Re-run evaluation to update winner logic and weight boosting
  const updatedState = loadAnalyticsState();
  for (const h of updatedState.history) {
    if (h.metrics) {
      try {
        ingestPostMetrics({
          postId: h.postId,
          metrics: h.metrics,
        });
      } catch (e) {
        console.error(`❌ Failed to ingest metrics for post ${h.postId}:`, e);
      }
    }
  }

  console.log(`🏁 Successfully backfilled and evaluated ${ingestedCount} scraped posts from LinkedIn.`);
}

main().catch(console.error);
