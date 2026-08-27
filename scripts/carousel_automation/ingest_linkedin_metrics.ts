import fs from 'node:fs';
import path from 'node:path';
import {
  loadAnalyticsState,
  saveAnalyticsState,
  ingestPostMetrics,
  type PostHistoryRecord,
  type PostPerformanceMetrics
} from './analytics_evaluator.js';

interface BufferPostNode {
  id: string;
  status: string;
  text: string;
  sentAt?: string;
  dueAt?: string;
  metrics: { type: string; name: string; value: number }[];
}

interface BufferResponse {
  edges: { node: BufferPostNode }[];
}

async function main() {
  const projectDir = path.resolve(process.cwd());
  const bufferOutputFilePath = path.join(
    'C:', 'Users', 'High Tech', '.gemini', 'antigravity', 'brain',
    '21189a1f-f7bf-4d37-b25a-03f7f2f0b063', '.system_generated', 'steps', '238', 'output.txt'
  );

  if (!fs.existsSync(bufferOutputFilePath)) {
    console.error(`❌ Buffer output file not found at: ${bufferOutputFilePath}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(bufferOutputFilePath, 'utf-8');
  let bufferData: BufferResponse;
  try {
    bufferData = JSON.parse(rawJson);
  } catch (e) {
    console.error(`❌ Failed to parse Buffer output JSON:`, e);
    process.exit(1);
  }

  const state = loadAnalyticsState();
  console.log(`📊 Loaded state. Current history count: ${state.history.length}`);

  let ingestedCount = 0;

  for (const edge of bufferData.edges) {
    const node = edge.node;
    if (node.status !== 'sent') continue;

    const text = node.text || '';
    let topicKey = 'nano_banana_posters';
    let topicTitle = 'Nano Banana Posters';
    let styleKey = 'editorial_photo_storytelling';
    let styleName = 'Editorial Photo Storytelling';

    // 1. Content-based mapping heuristics
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
    } else if (text.includes('Building AI agents used to take weeks') || text.includes('AI sales army') || text.includes('AI agents') || text.includes('AI agent')) {
      topicKey = 'automated_dm_sales';
      topicTitle = 'Autonomous AI Agent Architecture';
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
    } else if (text.includes('Google Veo') || text.includes('Veo is set to redefine') || text.includes('DP.')) {
      topicKey = 'higgsfield_video_directing';
      topicTitle = 'Google Veo Cinematic Directing';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    } else if (text.includes('Vibe Coders') || text.includes('AI Tools')) {
      topicKey = 'viral_hook_secrets';
      topicTitle = 'Vibe Coding and AI Toolkits';
      styleKey = 'editorial_photo_storytelling';
      styleName = 'Editorial Photo Storytelling';
    }

    // 2. Extract metrics values
    const metricsMap: Record<string, number> = {};
    if (Array.isArray(node.metrics)) {
      for (const m of node.metrics) {
        metricsMap[m.type] = m.value;
      }
    }

    const performance: PostPerformanceMetrics = {
      likes: metricsMap['reactions'] || 0,
      shares: metricsMap['shares'] || 0,
      comments: metricsMap['comments'] || 0,
      reach: metricsMap['reach'] || 0,
      impressions: metricsMap['impressions'] || 0,
      saves: 0, // LinkedIn API doesn't expose saves cleanly via Buffer
    };

    // Check if post already exists in history
    const existingIndex = state.history.findIndex((h) => h.postId === node.id);

    if (existingIndex !== -1) {
      console.log(`ℹ️ Post ${node.id} already exists in history. Updating metrics...`);
      state.history[existingIndex]!.metrics = performance;
    } else {
      const historyRec: PostHistoryRecord = {
        postId: node.id,
        topicKey,
        topicTitle,
        styleKey,
        styleName,
        publishedAt: node.sentAt || node.dueAt || new Date().toISOString(),
        metrics: performance,
      };
      state.history.push(historyRec);
    }

    ingestedCount++;
  }

  // Save the backfilled history records first
  state.winningStyles = [];
  state.winningTopics = [];
  state.styleWeights = {};
  state.topicWeights = {};
  saveAnalyticsState(state);

  // Now, run ingestPostMetrics loop for each to trigger engagement score, winner logic, and weight boosting
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

  console.log(`🏁 Successfully backfilled and evaluated ${ingestedCount} posts from LinkedIn.`);
}

main().catch(console.error);
