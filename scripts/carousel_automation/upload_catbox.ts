import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const SLIDE_FILES = [
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan (7).jpg',
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan (6).jpg',
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan (5).jpg',
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan (4).jpg',
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan (2).jpg',
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan (1).jpg',
  'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan.jpg',
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
