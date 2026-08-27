import fs from 'node:fs';
import path from 'node:path';

const slideFiles = [
  'ciel_story_slide_01_1787341190713.jpg',
  'ciel_story_slide_02_1787341213919.jpg',
  'ciel_story_slide_03_1787341234019.jpg',
  'ciel_story_slide_04_1787341257677.jpg',
  'ciel_story_slide_05_1787341279719.jpg',
  'ciel_story_slide_06_1787341308615.jpg',
  'ciel_story_slide_07_1787341339878.jpg',
  'ciel_story_slide_08_1787341365718.jpg',
];

const brainDir = 'C:/Users/High Tech/.gemini/antigravity/brain/deaf1aed-fb85-4db8-b42f-601db774fa44';

async function uploadToUguu(filePath) {
  const formData = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  formData.append('files[]', blob, path.basename(filePath));

  const res = await fetch('https://uguu.se/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (data.success && data.files && data.files[0]) {
    return data.files[0].url;
  }
  throw new Error(JSON.stringify(data));
}

async function uploadAll() {
  const urls = [];
  for (let i = 0; i < slideFiles.length; i++) {
    const f = slideFiles[i];
    const fullPath = path.join(brainDir, f);
    const url = await uploadToUguu(fullPath);
    console.log('Slide ' + (i + 1) + ' uploaded: ' + url);
    urls.push(url);
  }
  fs.writeFileSync('out/uploaded_slide_urls.json', JSON.stringify(urls, null, 2));
  console.log('ALL_SLIDES_UPLOADED_SUCCESSFULLY');
}

uploadAll().catch(console.error);
