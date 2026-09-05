import fs from 'node:fs';
import path from 'node:path';
import { generateCarouselCopyFromCalendar } from './carousel_automation/copy_extractor.js';
import { generateSlideVariationPrompt } from './carousel_automation/nano_banana_generator.js';
import { getDeconstructedReference } from './carousel_automation/reference_deconstructor.js';

async function run() {
  console.log('🎨 Generating Day 2 copy package from 30-Day Content Calendar...');
  const copyPackage = generateCarouselCopyFromCalendar(2);

  console.log(`   📌 Day 2 Topic: "${copyPackage.topicTitle}"`);
  console.log(`   📌 Day 2 Hook: "${copyPackage.hookHeadline}"`);
  console.log(`   🎯 Trigger Word: "${copyPackage.triggerWord}"`);

  // Load Cookbook Style #002 (Acid Lime 3D Streetwear Type Poster Style)
  const cookbookDir = path.resolve(process.cwd(), 'data/ai_visual_prompt_cookbook');
  const stylePath = path.join(cookbookDir, 'acid-lime-3d-streetwear-type-poster-style.json');
  let rawJson = undefined;
  if (fs.existsSync(stylePath)) {
    rawJson = JSON.parse(fs.readFileSync(stylePath, 'utf8'));
  }

  const cookbookStyle = {
    name: rawJson?.name || 'Acid Lime 3D Streetwear Type Poster Style',
    prompt: rawJson?.prompt_template || '',
    rawJson,
  };

  console.log(`   📖 Active Cookbook Style #002: "${cookbookStyle.name}"`);

  const referenceStyle = getDeconstructedReference('ciel_cinematic_storytelling');

  const jobs = copyPackage.slides.map((slide) => {
    return generateSlideVariationPrompt({
      slide,
      referenceStyle,
      outputFileName: `slide_0${slide.slideIndex}.png`,
      totalSlides: copyPackage.slides.length,
      aspectRatio: '4:5',
      cookbookStyle,
    });
  });

  const outDir = path.resolve(process.cwd(), 'out/nano_banana_prompts/day_2');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'prompts_batch.json'), JSON.stringify(jobs, null, 2), 'utf8');

  console.log(`✅ Generated ${jobs.length} Nano Banana 2 prompts for Day 2 in ${outDir}`);
  console.log(`\n--- Slide 1 Prompt (Option A - Integrated) ---\n${jobs[0]?.prompt.slice(0, 450)}...\n`);
  console.log(`--- Slide 2 Prompt (Option B - Negative Space Background) ---\n${jobs[1]?.prompt.slice(0, 450)}...\n`);
}

run().catch(console.error);
