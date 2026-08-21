import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const dir = 'C:\\Users\\High Tech\\.gemini\\antigravity\\brain\\ebaeacc9-c681-420c-ae6b-b6e8e0ffd9ce';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });

  for (let i = 1; i <= 7; i++) {
    const fileUrl = `file://${path.join(dir, `slide_${i}.html`).replace(/\\/g, '/')}`;
    console.log(`Loading ${fileUrl}...`);
    await page.goto(fileUrl);
    
    // Wait for video/layout/render
    await page.waitForTimeout(1000);
    
    const outputPath = path.join(dir, `slide_${i}.png`);
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Saved screenshot to ${outputPath}`);
  }

  await browser.close();
  console.log('Done screenshotting all slides!');
}

run().catch(console.error);
