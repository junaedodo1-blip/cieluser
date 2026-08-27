import { executeSubagentPipeline, type PipelineExecutionReport } from './subagent_pipeline_orchestrator.js';
import type { SingleTopicKey } from './copy_extractor.js';

export interface CliArgs {
  topicKey?: SingleTopicKey;
  referenceStyleKey?: string;
  triggerWord?: string;
}

export function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  let topicKey: SingleTopicKey | undefined;
  let referenceStyleKey: string | undefined;
  let triggerWord: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--topic-key' && args[i + 1]) {
      topicKey = args[++i] as SingleTopicKey;
    } else if (arg === '--style-key' && args[i + 1]) {
      referenceStyleKey = args[++i];
    } else if (arg === '--trigger-word' && args[i + 1]) {
      triggerWord = args[++i];
    }
  }

  return {
    ...(topicKey ? { topicKey } : {}),
    ...(referenceStyleKey ? { referenceStyleKey } : {}),
    ...(triggerWord ? { triggerWord } : {}),
  };
}

export async function runCarouselAutomation(options?: Partial<CliArgs>): Promise<PipelineExecutionReport> {
  const parsed = parseArgs();
  const merged: CliArgs = {
    ...parsed,
    ...options,
  };

  return executeSubagentPipeline({
    ...(merged.topicKey ? { topicKey: merged.topicKey } : {}),
    ...(merged.referenceStyleKey ? { referenceStyleKey: merged.referenceStyleKey } : {}),
    ...(merged.triggerWord ? { triggerWord: merged.triggerWord } : {}),
  });
}

if (process.argv[1]?.endsWith('index.ts') || process.argv[1]?.endsWith('index.js')) {
  runCarouselAutomation()
    .then((res) => {
      console.log(`\n🎉 Carousel Automation Complete!`);
      console.log(`📁 Prompts: ${res.promptsDir}`);
    })
    .catch((err) => {
      console.error('Carousel Automation Failed:', err);
      process.exit(1);
    });
}
