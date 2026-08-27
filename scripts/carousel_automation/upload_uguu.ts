import fs from 'fs';
import path from 'path';

const SLIDE_FILES = [
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_striking_slide_01_v2_1787413507472.jpg',
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_striking_slide_02_v2_1787413540654.jpg',
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_story_slide_03_anecdote_1787412966593.jpg',
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_story_slide_04_macro_1787412991028.jpg',
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_story_slide_05_tension_1787413015865.jpg',
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_story_slide_06_climax_1787413033580.jpg',
  'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44/ciel_story_slide_07_cta_1787413054986.jpg',
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
