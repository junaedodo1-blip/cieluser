import fs from 'node:fs';
import path from 'node:path';

const slideFiles = [
  'ciel_campaign_slide_01_1787342131869.jpg',
  'ciel_campaign_slide_02_1787342166534.jpg',
  'ciel_campaign_slide_03_1787342206661.jpg',
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

async function uploadCampaign() {
  const urls = [];
  for (let i = 0; i < slideFiles.length; i++) {
    const f = slideFiles[i];
    const fullPath = path.join(brainDir, f);
    const url = await uploadToUguu(fullPath);
    console.log('Campaign Slide ' + (i + 1) + ' uploaded: ' + url);
    urls.push(url);
  }
  fs.writeFileSync('out/uploaded_campaign_urls.json', JSON.stringify(urls, null, 2));
  console.log('CAMPAIGN_SLIDES_UPLOADED_SUCCESSFULLY');
}

uploadCampaign().catch(console.error);
