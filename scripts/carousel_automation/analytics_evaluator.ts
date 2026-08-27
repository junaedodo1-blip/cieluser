import fs from 'node:fs';
import path from 'node:path';

export interface PostPerformanceMetrics {
  saves: number;
  shares: number;
  comments: number;
  likes: number;
  reach?: number;
  impressions?: number;
  profileVisits?: number;
  linkClicks?: number;
}

export interface PostHistoryRecord {
  postId: string;
  topicKey: string;
  topicTitle: string;
  styleKey: string;
  styleName: string;
  publishedAt: string;
  metrics?: PostPerformanceMetrics;
  engagementScore?: number;
  isWinner?: boolean;
}

export interface AnalyticsState {
  usedStyles: string[];
  usedTopics: string[];
  winningStyles: string[];
  winningTopics: string[];
  styleWeights: Record<string, number>;
  topicWeights: Record<string, number>;
  history: PostHistoryRecord[];
}

const STATE_FILE = 'carousel_automation_state.json';

export function loadAnalyticsState(): AnalyticsState {
  const p = path.resolve(process.cwd(), STATE_FILE);
  if (!fs.existsSync(p)) {
    return {
      usedStyles: [],
      usedTopics: [],
      winningStyles: [],
      winningTopics: [],
      styleWeights: {},
      topicWeights: {},
      history: [],
    };
  }
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
    return {
      usedStyles: Array.isArray(raw.usedStyles) ? raw.usedStyles : [],
      usedTopics: Array.isArray(raw.usedTopics) ? raw.usedTopics : [],
      winningStyles: Array.isArray(raw.winningStyles) ? raw.winningStyles : [],
      winningTopics: Array.isArray(raw.winningTopics) ? raw.winningTopics : [],
      styleWeights: raw.styleWeights && typeof raw.styleWeights === 'object' ? raw.styleWeights : {},
      topicWeights: raw.topicWeights && typeof raw.topicWeights === 'object' ? raw.topicWeights : {},
      history: Array.isArray(raw.history) ? raw.history : [],
    };
  } catch {
    return {
      usedStyles: [],
      usedTopics: [],
      winningStyles: [],
      winningTopics: [],
      styleWeights: {},
      topicWeights: {},
      history: [],
    };
  }
}

export function saveAnalyticsState(state: AnalyticsState) {
  const p = path.resolve(process.cwd(), STATE_FILE);
  fs.writeFileSync(p, JSON.stringify(state, null, 2), 'utf8');
}

/**
 * Calculates algorithmic engagement score weighted by Instagram's signal hierarchy:
 * Saves (3.0x) > Shares (2.5x) > Comments (2.0x) > Clicks (1.5x) > Likes (0.5x).
 */
export function calculateEngagementScore(metrics: PostPerformanceMetrics): number {
  return (
    (metrics.saves || 0) * 3.0 +
    (metrics.shares || 0) * 2.5 +
    (metrics.comments || 0) * 2.0 +
    (metrics.linkClicks || 0) * 1.5 +
    (metrics.likes || 0) * 0.5
  );
}

/**
 * Records a new published post into history.
 */
export function recordPublishedPost(record: Omit<PostHistoryRecord, 'publishedAt'>) {
  const state = loadAnalyticsState();
  const fullRecord: PostHistoryRecord = {
    ...record,
    publishedAt: new Date().toISOString(),
  };
  state.history.push(fullRecord);
  saveAnalyticsState(state);
  console.log(`📊 [Analytics] Recorded published post "${record.topicTitle}" (${record.postId})`);
}

/**
 * Ingests metrics for a post, computes the engagement score, and detects if it is a "WINNER".
 */
export function ingestPostMetrics(params: {
  postId: string;
  metrics: PostPerformanceMetrics;
}): { record: PostHistoryRecord; isWinner: boolean; averageScore: number } {
  const state = loadAnalyticsState();
  const record = state.history.find((h) => h.postId === params.postId);

  if (!record) {
    throw new Error(`Post ID "${params.postId}" not found in analytics history.`);
  }

  record.metrics = params.metrics;
  record.engagementScore = calculateEngagementScore(params.metrics);

  // Compute baseline average score of all past posts with metrics
  const scoredPosts = state.history.filter((h) => typeof h.engagementScore === 'number');
  const totalScore = scoredPosts.reduce((acc, curr) => acc + (curr.engagementScore || 0), 0);
  const averageScore = scoredPosts.length > 0 ? totalScore / scoredPosts.length : 10;

  // A post is tagged as a WINNER if its score is >= 2.0x the average
  const isWinner = record.engagementScore >= averageScore * 2.0 || (record.metrics.saves >= 25 && record.metrics.shares >= 15);
  record.isWinner = isWinner;

  if (isWinner) {
    if (!state.winningStyles.includes(record.styleKey)) {
      state.winningStyles.push(record.styleKey);
    }
    if (!state.winningTopics.includes(record.topicKey)) {
      state.winningTopics.push(record.topicKey);
    }
    // Boost rotation weights
    state.styleWeights[record.styleKey] = (state.styleWeights[record.styleKey] || 1.0) + 1.5;
    state.topicWeights[record.topicKey] = (state.topicWeights[record.topicKey] || 1.0) + 1.5;
    console.log(`🏆 [WINNER DETECTED] Post "${record.topicTitle}" scored ${record.engagementScore.toFixed(1)} (Avg: ${averageScore.toFixed(1)})! Boosted style "${record.styleKey}".`);
  }

  saveAnalyticsState(state);
  return { record, isWinner, averageScore };
}
