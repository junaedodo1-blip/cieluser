import fs from 'node:fs';
import path from 'node:path';
import { generateCarouselCopyFromCalendar } from './carousel_automation/copy_extractor.js';
import { renderCarouselSlidesToImages, type SlideRendererStyle } from './carousel_automation/slide_renderer.js';

async function run() {
  const dayArg = process.argv[2] ? parseInt(process.argv[2], 10) : 1;
  const styleArg = (process.argv[3] as SlideRendererStyle) || 'brand_world_minimalist';

  console.log(`🎨 Generating Day ${dayArg} copy package from 30-Day Content Calendar...`);
  const copyPackage = generateCarouselCopyFromCalendar(dayArg);

  console.log(`   📌 Day ${dayArg} Hook: "${copyPackage.hookHeadline}"`);
  console.log(`   🎯 Trigger Word: "${copyPackage.triggerWord}"`);
  console.log(`   👑 Visual Design Style: "${styleArg}"`);

  console.log('📸 Rendering slide JPG images (1080x1350 vertical)...');
  const slideResults = await renderCarouselSlidesToImages({
    copyPackage,
    outputDir: 'out/carousel_runs',
    styleKey: styleArg,
  });

  const instaDir = 'out/repurposed/instagram';
  fs.mkdirSync(instaDir, { recursive: true });
  const instaPath = path.join(instaDir, `instagram-post-day-${dayArg}.md`);
  fs.writeFileSync(instaPath, copyPackage.instagramCaption, 'utf8');

  const linkedinDir = 'out/repurposed/linkedin';
  fs.mkdirSync(linkedinDir, { recursive: true });
  const linkedinPostPath = path.join(linkedinDir, `linkedin-post-day-${dayArg}.md`);
  const linkedinPdfPath = path.join(linkedinDir, `linkedin-carousel-day-${dayArg}.pdf`);
  fs.writeFileSync(linkedinPostPath, copyPackage.instagramCaption, 'utf8');
  
  const latestPdf = fs.readdirSync(linkedinDir).find(f => f.endsWith('.pdf'));
  if (latestPdf && !fs.existsSync(linkedinPdfPath)) {
    fs.copyFileSync(path.join(linkedinDir, latestPdf), linkedinPdfPath);
  }

  console.log(`✅ Rendered ${slideResults.length} slides successfully for Day ${dayArg} with style [${styleArg}].`);
}

run().catch(err => {
  console.error('Error rendering slides:', err);
  process.exit(1);
});
