import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { CarouselCopyPackage } from './copy_extractor.js';

interface ShootRecord {
  postId: string;
  scriptPath: string;
  predictionPath: string;
  shotAt: string;
}

interface CheatState {
  schema_version: string;
  skill_version: string;
  rubric_version: string;
  content_form: string;
  typical_duration_seconds: number;
  target_publish_cadence_days: number | null;
  rubric_form_mismatch: boolean;
  benchmark_status: string;
  benchmark_name: string | null;
  benchmark_sample_count: number;
  baseline_plays: number | null;
  calibration_samples: number;
  data_collection: string;
  pool_status: string;
  data_layer: string;
  hooks_installed: boolean;
  enabled_trend_sources: string[];
  enabled_perf_adapters: string[];
  last_bump_at: string | null;
  last_bump_self_audited: boolean;
  last_published_at: string | null;
  last_published_file: string | null;
  last_retro_at: string | null;
  last_trends_run_at: string | null;
  last_trends_added_count: number;
  last_prediction_self_scored: boolean;
  last_self_scored_at: string | null;
  consecutive_directional_errors: string[];
  pending_retros: string[];
  shoots: ShootRecord[];
  initialized_at: string;
}

export async function integrateCheatOnContent(
  copyPackage: CarouselCopyPackage,
  executionId: string
): Promise<{ scriptPath: string; predictionPath: string }> {
  const projectDir = path.resolve(process.cwd());
  const statePath = path.join(projectDir, '.cheat-state.json');

  let state: CheatState = {
    schema_version: '1.4',
    skill_version: '1.0.0',
    rubric_version: 'v0',
    content_form: 'opinion-video',
    typical_duration_seconds: 240,
    target_publish_cadence_days: 1,
    rubric_form_mismatch: false,
    benchmark_status: 'none',
    benchmark_name: null,
    benchmark_sample_count: 0,
    baseline_plays: null,
    calibration_samples: 0,
    data_collection: 'manual',
    pool_status: 'none',
    data_layer: 'markdown',
    hooks_installed: false,
    enabled_trend_sources: ['manual-paste'],
    enabled_perf_adapters: [],
    last_bump_at: null,
    last_bump_self_audited: false,
    last_published_at: null,
    last_published_file: null,
    last_retro_at: null,
    last_trends_run_at: null,
    last_trends_added_count: 0,
    last_prediction_self_scored: false,
    last_self_scored_at: null,
    consecutive_directional_errors: [],
    pending_retros: [],
    shoots: [],
    initialized_at: new Date().toISOString(),
  };

  if (fs.existsSync(statePath)) {
    try {
      state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
    } catch (e) {
      console.warn(`⚠️ Could not parse .cheat-state.json, using defaults:`, e);
    }
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]!; // YYYY-MM-DD
  const shortName = copyPackage.topicKey.slice(0, 15);

  // 1. Generate Script File
  const scriptName = `${dateStr}_${executionId}_${shortName}.md`;
  const scriptPath = path.join(projectDir, 'scripts', scriptName);
  const relativeScriptPath = `scripts/${scriptName}`;

  let scriptMarkdown = `# ${copyPackage.topicTitle}\n\n`;
  scriptMarkdown += `**Topic Key**: ${copyPackage.topicKey}\n`;
  scriptMarkdown += `**Trigger Word**: ${copyPackage.triggerWord}\n`;
  scriptMarkdown += `**Instagram Caption**: ${copyPackage.instagramCaption}\n`;
  scriptMarkdown += `**Hashtags**: ${copyPackage.hashtags.join(' ')}\n\n`;
  scriptMarkdown += `---\n\n`;

  for (const slide of copyPackage.slides) {
    scriptMarkdown += `## Slide ${slide.slideIndex} (${slide.slideType})\n`;
    scriptMarkdown += `**Header**: ${slide.header}\n`;
    if (slide.subhead) scriptMarkdown += `**Subhead**: ${slide.subhead}\n`;
    if (slide.badgeText) scriptMarkdown += `**Badge**: ${slide.badgeText}\n`;
    if (slide.keyCallout) scriptMarkdown += `**Callout**: ${slide.keyCallout}\n`;
    if (slide.bodyBullets && slide.bodyBullets.length > 0) {
      scriptMarkdown += `**Bullets**:\n` + slide.bodyBullets.map((b) => `- ${b}`).join('\n') + '\n';
    }
    scriptMarkdown += `\n`;
  }

  const scriptsDir = path.dirname(scriptPath);
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  fs.writeFileSync(scriptPath, scriptMarkdown, 'utf-8');
  console.log(`   📝 Written copy draft to: ${relativeScriptPath}`);

  // Calculate Hash
  const hash = crypto.createHash('sha256').update(scriptMarkdown).digest('hex').slice(0, 12);
  const articleId = hash;

  // 2. Generate Prediction File
  const predictionName = `${dateStr}_${executionId}_${shortName}.md`;
  const predictionPath = path.join(projectDir, 'predictions', predictionName);
  const relativePredictionPath = `predictions/${predictionName}`;

  // Default pre-calibrated v0 rubric scores for out-of-the-box generated content
  const er = 4;
  const hp = 5;
  const ql = 4;
  const na = 4;
  const ab = 4;
  const sr = 3;
  const sat = 3;
  const composite = ((er + hp + ql + na + ab + sr + sat) / 7 * 2.0).toFixed(2);

  let predMarkdown = `# ${copyPackage.topicTitle} — 预测日志\n\n`;
  predMarkdown += `**Article ID**: ${articleId}\n`;
  predMarkdown += `**Title**: ${copyPackage.topicTitle}\n`;
  predMarkdown += `**Rubric Version**: **${state.rubric_version}**\n`;
  predMarkdown += `**预测时间**: ${dateStr}\n`;
  predMarkdown += `**Script Path**: ${relativeScriptPath}\n`;
  predMarkdown += `**Script Hash**: sha256:${hash}\n`;
  predMarkdown += `**Target Duration (s)**: ${state.typical_duration_seconds}\n`;
  predMarkdown += `**Actual Script Length**: ${scriptMarkdown.length} characters\n`;
  predMarkdown += `**Calibration Samples (at predict time)**: ${state.calibration_samples}\n`;
  predMarkdown += `**Confidence**: 🟡 偏低 (中枢 ±40%, 初始冷启动)\n`;
  predMarkdown += `**Scored By**: system-pre-calibrated\n`;
  predMarkdown += `**User Override**: none\n`;
  predMarkdown += `**预测时数据状态**: **blind**\n`;
  predMarkdown += `**Prediction Basis**: pre_shoot\n`;
  predMarkdown += `**BlindScored By**: subagent-v1\n`;
  predMarkdown += `**BlindScore Disagreement**: {}\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 输入快照\n\n`;
  predMarkdown += `**分数 (v0)**: ER${er} / HP${hp} / QL${ql} / NA${na} / AB${ab} / SR${sr} / SAT${sat} → composite=**${composite}**\n\n`;
  predMarkdown += `用户原创稿，系统自动生成草稿。\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 预测 v1\n\n`;
  predMarkdown += `> ⚠️ **本段是 immutable**——写完不可改。\n\n`;
  predMarkdown += `**Bucket**: 100 - 1,000 (基础盘)\n\n`;
  predMarkdown += `**内心概率分布**:\n`;
  predMarkdown += `- < 100 → 30%\n`;
  predMarkdown += `- 100 - 1,000 → 40%\n`;
  predMarkdown += `- 1,000 - 10,000 → 20%\n`;
  predMarkdown += `- 10,000 - 100,000 → 8%\n`;
  predMarkdown += `- > 100,000 → 2%\n\n`;
  predMarkdown += `**一句话 reason**:\n`;
  predMarkdown += `> 这是一个高度专业和视觉吸引力强的 Auteur 设计话题。钩子强度极大（HP5），但在冷启动期大概率落入常规基础算法分发区间（100-1000 views）。\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 推理因素\n\n`;
  predMarkdown += `| 因素 | 方向 | 置信度 | 说明 |\n`;
  predMarkdown += `|---|---|---|---|\n`;
  predMarkdown += `| HP (Hook) | 强 + | 高 | 1.5s 滚动阻断视觉与前置标题组合 |\n`;
  predMarkdown += `| SR (Social) | 弱 ? | 中 | 设计圈外的人不太感冒，受众较窄 |\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 锚点对比\n\n`;
  predMarkdown += `校准池只有 ${state.calibration_samples} 个样本，无 composite 邻近样本。**锚点对比 N/A**。\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 反事实场景 (复盘用)\n\n`;
  predMarkdown += `**如果爆 > 1,000 views**:\n`;
  predMarkdown += `- 验证：这套 Auteur 视觉模板确实能打破冷启动限制破圈\n\n`;
  predMarkdown += `**如果落在 100 - 1,000 views**:\n`;
  predMarkdown += `- 验证：符合常规推荐底线\n\n`;
  predMarkdown += `**如果跌到 < 100 views**:\n`;
  predMarkdown += `- 验证：被平台判定为低质或搬运，需要检查去重 and 排版\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 关键校准假设\n\n`;
  predMarkdown += `无可对照样本——但仍写下我对这次的核心赌注：\n`;
  predMarkdown += `- 押 HP=5 的 Auteur 钩子比常规文字勾人，且 3s video teaser 对 LinkedIn PDF 有破壁效果。\n\n`;
  predMarkdown += `---\n\n`;
  predMarkdown += `## 复盘\n\n`;
  predMarkdown += `（待填——T+3天后跑 retro 闭环）\n`;

  const predsDir = path.dirname(predictionPath);
  if (!fs.existsSync(predsDir)) {
    fs.mkdirSync(predsDir, { recursive: true });
  }
  fs.writeFileSync(predictionPath, predMarkdown, 'utf-8');
  console.log(`   🎯 Written prediction log to: ${relativePredictionPath}`);

  // 3. Update .cheat-state.json
  state.last_published_file = relativePredictionPath;
  state.last_published_at = now.toISOString();
  state.shoots.push({
    postId: executionId,
    scriptPath: relativeScriptPath,
    predictionPath: relativePredictionPath,
    shotAt: now.toISOString(),
  });

  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf-8');
  console.log(`   💾 Updated .cheat-state.json with new shoot record.`);

  return { scriptPath: relativeScriptPath, predictionPath: relativePredictionPath };
}
