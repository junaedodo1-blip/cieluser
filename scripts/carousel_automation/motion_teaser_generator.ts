import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export interface MotionTeaserResult {
  videoPath: string;
  durationSeconds: number;
  resolution: string;
  fps: number;
}

/**
 * Generates a 3-second cinematic vertical motion teaser for Slide 1 using FFmpeg.
 * Perfect for Instagram Reels, TikTok, and YouTube Shorts to drive traffic to the carousel.
 */
export async function generateSlide1MotionTeaser(params: {
  slide1ImagePath: string;
  topicTitle: string;
  outputDir?: string;
  aspectRatio?: '9:16' | '4:5';
}): Promise<MotionTeaserResult> {
  const {
    slide1ImagePath,
    topicTitle,
    outputDir = 'out/motion_teasers',
    aspectRatio = '9:16',
  } = params;

  if (!fs.existsSync(slide1ImagePath)) {
    throw new Error(`Slide 1 image not found at: ${slide1ImagePath}`);
  }

  const resolvedDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  const sanitizedTitle = topicTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const outputVideoPath = path.join(resolvedDir, `motion-teaser-${sanitizedTitle}.mp4`);

  const width = aspectRatio === '9:16' ? 1080 : 1080;
  const height = aspectRatio === '9:16' ? 1920 : 1350;
  const duration = 3.0; // 3 seconds
  const fps = 60;
  const totalFrames = Math.round(duration * fps); // 180 frames

  console.log(`🎬 Generating 3-Second Motion Teaser for Slide 1 (${width}x${height} @ ${fps}fps)...`);

  // FFmpeg filter:
  // 1. Scales input image to fit center stage with subtle zoom-in (1.00 -> 1.06)
  // 2. Applies subtle raking light gradient shimmer
  // 3. Pads to 9:16 vertical canvas (1080x1920) with off-white matching background
  const zoomFilter = `zoompan=z='min(zoom+0.00035,1.06)':d=${totalFrames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${width}x${height}:fps=${fps}`;
  
  // Pad filter to place the 4:5 image cleanly inside a 9:16 canvas with letterbox matching the #F8F8F5 background
  const filterComplex = `[0:v]scale=1080:1350,pad=1080:1920:0:(1920-1350)/2:color=0xF8F8F5,${zoomFilter},format=yuv420p[v]`;

  const cmd = `ffmpeg -y -loop 1 -i "${slide1ImagePath}" -filter_complex "${filterComplex}" -map "[v]" -t ${duration} -r ${fps} -c:v libx264 -pix_fmt yuv420p -preset fast -crf 18 "${outputVideoPath}"`;

  try {
    await execAsync(cmd);
    console.log(`✅ [Motion Teaser Video] Rendered: ${outputVideoPath}`);
    return {
      videoPath: outputVideoPath,
      durationSeconds: duration,
      resolution: `${width}x${height}`,
      fps,
    };
  } catch (error: any) {
    console.error(`FFmpeg motion teaser failed:`, error?.message);
    throw error;
  }
}
