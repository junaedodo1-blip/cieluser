import fs from 'node:fs';
import path from 'node:path';

export interface UploadedImageResult {
  slideIndex: number;
  fileName: string;
  url: string;
}

export async function uploadSingleImageToUguu(filePath: string): Promise<string> {
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

export async function uploadSlideImages(
  slides: { slideIndex: number; filePath: string; fileName: string }[]
): Promise<UploadedImageResult[]> {
  console.log(`🌐 Uploading ${slides.length} fresh slide images to public hosting...`);
  const uploadedResults: UploadedImageResult[] = [];

  for (const slide of slides) {
    console.log(`   Uploading ${slide.fileName}...`);
    const url = await uploadSingleImageToUguu(slide.filePath);
    console.log(`   ✅ ${slide.fileName} -> ${url}`);
    uploadedResults.push({
      slideIndex: slide.slideIndex,
      fileName: slide.fileName,
      url,
    });
  }

  return uploadedResults;
}
