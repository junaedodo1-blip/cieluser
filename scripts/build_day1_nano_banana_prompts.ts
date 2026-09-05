import fs from 'node:fs';
import path from 'node:path';
import { generateCarouselCopyFromCalendar } from './carousel_automation/copy_extractor.js';
import { generateSlideVariationPrompt } from './carousel_automation/nano_banana_generator.js';
import { getDeconstructedReference } from './carousel_automation/reference_deconstructor.js';

async function run() {
  console.log('🎨 Loading Day 1 copy package...');
  const copyPackage = generateCarouselCopyFromCalendar(1);

  // Load Cookbook Style #001 (High-End Luxury Brand Book)
  const cookbookDir = path.resolve(process.cwd(), 'data/ai_visual_prompt_cookbook');
  const stylePath = path.join(cookbookDir, 'high-end-luxury-brand-book-poster-style.json');
  let rawJson = undefined;
  if (fs.existsSync(stylePath)) {
    rawJson = JSON.parse(fs.readFileSync(stylePath, 'utf8'));
  }

  const cookbookStyle = {
    name: rawJson?.name || 'High-End Luxury Brand Book Poster Style',
    prompt: rawJson?.prompt_template || '',
    rawJson,
  };

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

  const outDir = path.resolve(process.cwd(), 'out/nano_banana_prompts/day_1');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'prompts_batch.json'), JSON.stringify(jobs, null, 2), 'utf8');

  console.log(`✅ Generated ${jobs.length} Nano Banana 2 prompts for Day 1 in ${outDir}`);
  console.log(`\n--- Sample Slide 1 Prompt ---\n${jobs[0]?.prompt}\n--- End Sample ---`);
}

run().catch(console.error);
