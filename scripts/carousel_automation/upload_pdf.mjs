import fs from 'node:fs';
import path from 'node:path';

async function uploadPdf() {
  const filePath = path.resolve('out/repurposed/linkedin/ciel_invisible_craft_story_carousel.pdf');
  const formData = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'application/pdf' });
  formData.append('files[]', blob, path.basename(filePath));

  const res = await fetch('https://uguu.se/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (data.success && data.files && data.files[0]) {
    console.log('PDF_UPLOADED_URL: ' + data.files[0].url);
  }
}

uploadPdf().catch(console.error);
