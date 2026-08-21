import fs from 'fs';
import path from 'path';

const SLIDE_FILES = [
  'out/carousel_ciel/ciel_slide_01_hook_1787320154825.jpg',
  'out/carousel_ciel/ciel_slide_02_trap_1787320176582.jpg',
  'out/carousel_ciel/ciel_slide_03_sensory_1787320199509.jpg',
  'out/carousel_ciel/ciel_slide_04_remotion_1787320223575.jpg',
  'out/carousel_ciel/ciel_slide_05_cannes_1787320246459.jpg',
  'out/carousel_ciel/ciel_slide_06_narrative_spine_1787320269458.jpg',
  'out/carousel_ciel/ciel_slide_07_architecture_1787320300910.jpg',
];

async function uploadToUguu(filePath: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  const formData = new FormData();
  formData.append('files[]', blob, path.basename(filePath));

  const res = await fetch('https://uguu.se/upload.php', {
    method: 'POST',
    body: formData,
  });

  const json = (await res.json()) as any;
  if (json.success && json.files && json.files[0]?.url) {
    return json.files[0].url as string;
  }
  throw new Error(`Uguu upload failed: ${JSON.stringify(json)}`);
}

async function main() {
  console.log('🚀 Uploading slides to uguu.se...');
  const uploadedUrls: { file: string; url: string }[] = [];

  for (const relPath of SLIDE_FILES) {
    const fullPath = path.resolve(relPath);
    console.log(`Uploading ${path.basename(relPath)}...`);
    const url = await uploadToUguu(fullPath);
    console.log(`✅ ${url}`);
    uploadedUrls.push({ file: path.basename(relPath), url });
  }

  console.log('\n--- UPLOADED TO UGUU ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  fs.writeFileSync('out/carousel_ciel/uguu_urls.json', JSON.stringify(uploadedUrls, null, 2));
}

main().catch(console.error);
