import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const SLIDE_FILES = [
  'out/carousel_ciel/ciel_slide_01_hook_1787320154825.jpg',
  'out/carousel_ciel/ciel_slide_02_trap_1787320176582.jpg',
  'out/carousel_ciel/ciel_slide_03_sensory_1787320199509.jpg',
  'out/carousel_ciel/ciel_slide_04_remotion_1787320223575.jpg',
  'out/carousel_ciel/ciel_slide_05_cannes_1787320246459.jpg',
  'out/carousel_ciel/ciel_slide_06_narrative_spine_1787320269458.jpg',
  'out/carousel_ciel/ciel_slide_07_architecture_1787320300910.jpg',
];

async function main() {
  console.log('🚀 Uploading slides to litter.catbox.moe...');
  const uploadedUrls: { file: string; url: string }[] = [];

  for (const relPath of SLIDE_FILES) {
    const fullPath = path.resolve(relPath);
    const cmd = `curl.exe -s -F "reqtype=fileupload" -F "time=72h" -F "fileToUpload=@${fullPath}" https://litter.catbox.moe/resources/internals/api.php`;
    const res = execSync(cmd).toString().trim();
    console.log(`✅ ${path.basename(relPath)} -> ${res}`);
    uploadedUrls.push({ file: path.basename(relPath), url: res });
  }

  console.log('\n--- UPLOADED TO CATBOX ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  fs.writeFileSync('out/carousel_ciel/catbox_urls.json', JSON.stringify(uploadedUrls, null, 2));
}

main().catch(console.error);
