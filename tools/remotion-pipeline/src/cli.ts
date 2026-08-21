import { execSync } from "child_process";
import path from "path";
import fs from "fs";

export function runPipelineQA(compositionId: string = "ViralPromoVertical", outputDir: string = "out") {
  console.log(`\n🎬 [Remotion Pipeline] Starting Automated Verification QA for '${compositionId}'...`);
  
  const absoluteOut = path.resolve(outputDir);
  if (!fs.existsSync(absoluteOut)) {
    fs.mkdirSync(absoluteOut, { recursive: true });
  }

  const framesToTest = [15, 120, 300, 500]; // 0.5s, 4.0s, 10.0s, 16.6s
  
  for (const frame of framesToTest) {
    const framePath = path.join(absoluteOut, `qa_check_frame_${frame}.png`);
    const cmd = `npx remotion still tools/remotion-pipeline/src/index.ts ${compositionId} "${framePath}" --frame ${frame} --overwrite`;
    console.log(`📸 Extracting Still Frame ${frame}...`);
    try {
      execSync(cmd, { stdio: "inherit" });
      console.log(`✅ Frame ${frame} extracted -> ${framePath}`);
    } catch (err) {
      console.error(`❌ Frame extraction failed for frame ${frame}:`, err);
    }
  }

  console.log(`\n🎉 [Remotion Pipeline QA] Still frame extraction completed! Check '${outputDir}' for visual verification.`);
}

if (require.main === module) {
  const comp = process.argv[2] || "ViralPromoVertical";
  runPipelineQA(comp);
}

