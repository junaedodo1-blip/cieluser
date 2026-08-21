import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

async function run() {
  console.log('Starting Glossary PDF generation...');
  
  // Image paths
  const coverImgPath = 'file:///C:/Users/High Tech/.gemini/antigravity/brain/dac44a01-79a1-4369-a8c8-fa7c1379dd8d/cinematic_cover_1786349223502.jpg';
  const movementsImgPath = 'file:///C:/Users/High Tech/.gemini/antigravity/brain/dac44a01-79a1-4369-a8c8-fa7c1379dd8d/camera_movements_1786349235737.jpg';
  const lightingImgPath = 'file:///C:/Users/High Tech/.gemini/antigravity/brain/dac44a01-79a1-4369-a8c8-fa7c1379dd8d/lighting_styles_1786349249461.jpg';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Veo Video Generation Glossary</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1e293b;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
          -webkit-print-color-adjust: exact;
        }

        h1, h2, h3, h4 {
          font-family: 'Outfit', sans-serif;
          color: #0f172a;
        }

        /* Cover Page */
        .cover-page {
          page-break-after: always;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px;
          box-sizing: border-box;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          color: #ffffff;
        }

        .cover-header {
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a5b4fc;
          font-weight: 600;
        }

        .cover-title-group {
          margin-top: 40px;
        }

        .cover-title {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 15px 0;
          background: linear-gradient(to right, #ffffff, #c7d2fe, #fde047);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cover-subtitle {
          font-size: 18px;
          font-weight: 300;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0;
        }

        .cover-image-container {
          flex-grow: 1;
          margin: 40px 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cover-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cover-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          font-size: 12px;
          color: #94a3b8;
        }

        /* Content Pages */
        .content-container {
          padding: 60px;
          box-sizing: border-box;
        }

        .content-section {
          padding: 20px 0 40px 0;
          page-break-after: always;
        }

        .content-section:last-child {
          page-break-after: avoid;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 8px;
          margin-bottom: 20px;
          color: #1e1b4b;
        }

        .section-description {
          font-size: 15px;
          color: #475569;
          margin-bottom: 24px;
        }

        .section-illustration {
          width: 100%;
          height: 240px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .section-illustration img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Custom Styles for diagrams */
        .camera-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        /* Tables styling */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
          page-break-inside: avoid;
        }

        th {
          background-color: #f8fafc;
          color: #1e1b4b;
          font-weight: 600;
          text-align: left;
          padding: 12px 16px;
          border-bottom: 2px solid #cbd5e1;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        td {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 13.5px;
          vertical-align: top;
        }

        tr:nth-child(even) {
          background-color: #f8fafc;
        }

        .term-name {
          font-weight: 700;
          color: #4f46e5;
          width: 25%;
        }

        .term-desc {
          color: #334155;
          width: 35%;
        }

        .prompt-box {
          background-color: #f1f5f9;
          border-left: 3px solid #6366f1;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12.5px;
          color: #334155;
          white-space: pre-wrap;
          width: 40%;
        }

        /* Callout Box */
        .callout-box {
          background-color: #eff6ff;
          border-left: 4px solid #3b82f6;
          padding: 16px;
          border-radius: 6px;
          margin-bottom: 24px;
          font-size: 14.5px;
        }
        
        .callout-title {
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 5px;
        }

        .tip-box {
          background-color: #f0fdf4;
          border-left: 4px solid #22c55e;
          padding: 16px;
          border-radius: 6px;
          margin-bottom: 24px;
          font-size: 14.5px;
        }

        .tip-title {
          font-weight: 700;
          color: #166534;
          margin-bottom: 5px;
        }

        /* Recipes Grid */
        .recipes-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .recipe-card {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          page-break-inside: avoid;
        }

        .recipe-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e1b4b;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .recipe-prompt-container {
          background-color: #0f172a;
          color: #e2e8f0;
          padding: 14px 18px;
          border-radius: 6px;
          font-family: monospace;
          font-size: 13px;
          line-height: 1.5;
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background-color: #ffffff;
          }
          .cover-page {
            height: 100vh;
            padding: 60px;
          }
        }
      </style>
    </head>
    <body>
      
      <!-- COVER PAGE -->
      <div class="cover-page">
        <div class="cover-header">Google Veo Production Resource</div>
        <div class="cover-title-group">
          <h1 class="cover-title">The Ultimate Veo Prompting Glossary</h1>
          <p class="cover-subtitle">A highly organized guide to shot types, camera movements, angles, lighting, focus mechanics, and sound design for cinematic AI video generation.</p>
        </div>
        <div class="cover-image-container">
          <img src="${coverImgPath}" alt="Cover Artwork">
        </div>
        <div class="cover-footer">
          <div>Version 1.0.0</div>
          <div>© 2026 Open Design Initiative</div>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="content-container">

        <!-- SECTION 1: SHOT TYPES -->
        <div class="content-section">
          <h2 class="section-title">1. Shot Types & Framing</h2>
          <p class="section-description">Shot types determine the relative size of the subject in the frame and establish scale, emotion, and focus within the scene.</p>
          
          <table>
            <thead>
              <tr>
                <th>Shot Type</th>
                <th>Description</th>
                <th>Veo Prompt Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="term-name">Extreme Close-Up (ECU)</td>
                <td class="term-desc">Focuses on a single detail (e.g. eyes, lips, product textures). Generates high macro detail.</td>
                <td class="prompt-box">"ECU on a luxury fragrance bottle, showing the intricate textured engraving on the metallic gold cap as a single water droplet slides down."</td>
              </tr>
              <tr>
                <td class="term-name">Close-Up (CU)</td>
                <td class="term-desc">The subject fills the frame. Ideal for capturing details, textures, or facial expressions.</td>
                <td class="prompt-box">"CU of a weathered fisherman's face, details of sea-salt on skin, soft wind rustling his grey beard, warm sunset light."</td>
              </tr>
              <tr>
                <td class="term-name">Medium Close-Up (MCU)</td>
                <td class="term-desc">Framed from the chest up. Balances subject detail and background ambiance.</td>
                <td class="prompt-box">"MCU of a young astronaut looking through a visor, reflection of the distant blue Earth visible on the glass, intense gaze."</td>
              </tr>
              <tr>
                <td class="term-name">Medium Shot (MS)</td>
                <td class="term-desc">Waist up. Standard framing for capturing body language and physical actions.</td>
                <td class="prompt-box">"MS of a chef tossing fresh pasta in a pan, steam rising, warm restaurant kitchen in the background, active and dynamic."</td>
              </tr>
              <tr>
                <td class="term-name">Cowboy Shot</td>
                <td class="term-desc">Mid-thigh up. Creates strong posture lines; extremely common in fashion campaigns.</td>
                <td class="prompt-box">"Cowboy shot of a model in a structured wool coat standing on a windy cliff, looking out into the misty sea, editorial fashion style."</td>
              </tr>
              <tr>
                <td class="term-name">Full Shot (FS)</td>
                <td class="term-desc">Entire body, head to toe. Emphasizes character stance, outfit, and environment context.</td>
                <td class="prompt-box">"FS of a street dancer performing an acrobatic move on a neon-lit wet pavement in Tokyo, reflections dancing on the ground."</td>
              </tr>
              <tr>
                <td class="term-name">Wide Shot / Long Shot (WS)</td>
                <td class="term-desc">Subject is small, giving weight to the environment. Establishes context and scale.</td>
                <td class="prompt-box">"WS of a lone hiker standing at the edge of a vast canyon, red rock formations stretching to the horizon, scale of nature."</td>
              </tr>
              <tr>
                <td class="term-name">Extreme Wide Shot (EWS)</td>
                <td class="term-desc">Subject is tiny; the landscape dominates. Used for vast cinematic scenery.</td>
                <td class="prompt-box">"EWS of an ancient castle perched on a snowy mountain peak, tiny lights glowing in the windows, vast snowfield below."</td>
              </tr>
              <tr>
                <td class="term-name">Establishing Shot</td>
                <td class="term-desc">Sets the scene/location at the start of a sequence to give immediate context.</td>
                <td class="prompt-box">"Establishing shot of a futuristic cyberpunk city at night, flying vehicles gliding between towering skyscrapers, neon advertisements."</td>
              </tr>
              <tr>
                <td class="term-name">Two-Shot</td>
                <td class="term-desc">Two subjects framed together. Used for relationships or interactions.</td>
                <td class="prompt-box">"Two-shot of two scientists discussing a glowing holographic map in a dark laboratory, blue light reflecting on their faces."</td>
              </tr>
              <tr>
                <td class="term-name">Over-the-Shoulder (OTS)</td>
                <td class="term-desc">Framed from behind one subject looking at another. Builds conversational depth.</td>
                <td class="prompt-box">"OTS shot of a detective questioning a suspect, looking over the detective’s dark trench-coat shoulder at the nervous suspect."</td>
              </tr>
              <tr>
                <td class="term-name">Insert Shot</td>
                <td class="term-desc">Tight cutaway to a detail (hands, product, text) that is vital to the story.</td>
                <td class="prompt-box">"Insert shot of hands typing code on a mechanical keyboard, fingers moving rapidly, shallow depth of field, glowing keycaps."</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SECTION 2: CAMERA ANGLES -->
        <div class="content-section">
          <h2 class="section-title">2. Camera Angles</h2>
          <p class="section-description">Camera angles manipulate spatial geometry to empower or weaken a subject, creating underlying emotional subtext.</p>

          <table>
            <thead>
              <tr>
                <th>Camera Angle</th>
                <th>Psychological Impact / Use Case</th>
                <th>Veo Prompt Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="term-name">Eye-Level</td>
                <td class="term-desc">Neutral, natural perspective. Places the audience on equal footing with the subject.</td>
                <td class="prompt-box">"Eye-level shot of an artist painting on canvas, natural daytime studio lighting, candid and authentic style."</td>
              </tr>
              <tr>
                <td class="term-name">Low Angle</td>
                <td class="term-desc">Camera is below, looking up. Makes the subject appear strong, imposing, or monumental.</td>
                <td class="prompt-box">"Low angle shot of a towering skyscraper, shot from the street, dramatic clouds rushing overhead, monumental feel."</td>
              </tr>
              <tr>
                <td class="term-name">High Angle</td>
                <td class="term-desc">Camera is above, looking down. Makes the subject look vulnerable, isolated, or small.</td>
                <td class="prompt-box">"High angle shot of a child sitting in the middle of a colorful playground maze, looking up curiously."</td>
              </tr>
              <tr>
                <td class="term-name">Bird's-Eye / Overhead</td>
                <td class="term-desc">Directly from above (90°). Emphasizes geometry, patterns, and maps out landscape paths.</td>
                <td class="prompt-box">"Overhead bird’s-eye view of a classic red convertible driving along a winding coastal highway, deep blue sea waves crashing."</td>
              </tr>
              <tr>
                <td class="term-name">Worm's-Eye View</td>
                <td class="term-desc">Directly from below on ground level. Exaggerates scale, height, and towering structures.</td>
                <td class="prompt-box">"Worm’s-eye view from the forest floor looking straight up at towering redwood trees, sunlight piercing the dense canopy."</td>
              </tr>
              <tr>
                <td class="term-name">Dutch / Canted Angle</td>
                <td class="term-desc">Tilted horizon. Instantly generates psychological tension, unease, or instability.</td>
                <td class="prompt-box">"Dutch angle shot of a character running down a narrow corridor, flickering fluorescent lights, suspenseful energy."</td>
              </tr>
              <tr>
                <td class="term-name">Point-of-View (POV)</td>
                <td class="term-desc">The camera acts as the eyes of a character, putting the viewer directly in their shoes.</td>
                <td class="prompt-box">"First-person POV of skiing down a steep mountain slope, white snow spray flying up on the sides, high velocity."</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SECTION 3: CAMERA MOVEMENT -->
        <div class="content-section">
          <h2 class="section-title">3. Camera Movement</h2>
          <p class="section-description">Camera movement creates physical dynamics, tracking action and moving the viewer through space dynamically.</p>
          
          <div class="section-illustration">
            <img src="${movementsImgPath}" alt="Camera Movement Diagram">
          </div>

          <table>
            <thead>
              <tr>
                <th>Movement</th>
                <th>Description</th>
                <th>Veo Prompt Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="term-name">Pan</td>
                <td class="term-desc">Horizontal pivot from a fixed point. Useful for scanning landscapes.</td>
                <td class="prompt-box">"Slow pan across a library with floor-to-ceiling wooden bookshelves, sunlight filtering through windows."</td>
              </tr>
              <tr>
                <td class="term-name">Tilt</td>
                <td class="term-desc">Vertical pivot from a fixed point. Great for revealing scale.</td>
                <td class="prompt-box">"Slow camera tilt up from a pair of muddy boots to a rugged explorer looking over a mountain ridge."</td>
              </tr>
              <tr>
                <td class="term-name">Dolly In/Out</td>
                <td class="term-desc">Camera physically moves closer to or further away from the subject.</td>
                <td class="prompt-box">"Dolly in on a vintage gramophone player as the brass needle touches the vinyl record, dust motes floating."</td>
              </tr>
              <tr>
                <td class="term-name">Truck Left/Right</td>
                <td class="term-desc">Camera moves sideways parallel to the subject's movement.</td>
                <td class="prompt-box">"Truck left alongside a vintage train moving through a scenic valley, steam blowing backward, lush green fields."</td>
              </tr>
              <tr>
                <td class="term-name">Pedestal Up/Down</td>
                <td class="term-desc">Camera moves vertically up/down without changing its tilt angle.</td>
                <td class="prompt-box">"Pedestal down from the starry night sky to a cozy log cabin in the woods with golden light spilling from windows."</td>
              </tr>
              <tr>
                <td class="term-name">Crane / Jib Shot</td>
                <td class="term-desc">Sweeping vertical movements rising high above a scene. Adds production value.</td>
                <td class="prompt-box">"Crane shot rising above a bustling open-air market, revealing the vibrant pattern of umbrellas and dense crowds."</td>
              </tr>
              <tr>
                <td class="term-name">Tracking / Follow</td>
                <td class="term-desc">Camera moves alongside a moving subject to keep pace with the action.</td>
                <td class="prompt-box">"Tracking shot behind a runner sprinting through a misty forest road, smooth motion, cinematic tracking."</td>
              </tr>
              <tr>
                <td class="term-name">Steadicam Shot</td>
                <td class="term-desc">Smooth, floating movement that keeps the camera stabilized but preserves human touch.</td>
                <td class="prompt-box">"Steadicam shot gliding through a lively masquerade ball, weaving seamlessly between dancing guests."</td>
              </tr>
              <tr>
                <td class="term-name">Arc Shot</td>
                <td class="term-desc">Camera orbits or circles around the subject to capture a 360° perspective.</td>
                <td class="prompt-box">"Slow 360-degree arc shot around a sculptor polishing a marble statue, marble dust suspended in the spotlight."</td>
              </tr>
              <tr>
                <td class="term-name">Zoom In/Out</td>
                <td class="term-desc">Adjustment of lens focal length. Draws focal focus instantly without moving.</td>
                <td class="prompt-box">"Rapid zoom in on a target board, capturing the exact moment an arrow pierces the bullseye."</td>
              </tr>
              <tr>
                <td class="term-name">Dolly Zoom</td>
                <td class="term-desc">Dolly and zoom occur simultaneously in opposite directions (Vertigo effect).</td>
                <td class="prompt-box">"Dramatic dolly zoom on a character standing in a crowded street as they realize they are lost, background warping."</td>
              </tr>
              <tr>
                <td class="term-name">Whip Pan</td>
                <td class="term-desc">Extremely fast pan causing motion blur. Used as a dynamic transition.</td>
                <td class="prompt-box">"Whip pan from a high-speed sports car racing past to the cheering crowd in the grandstands, high energy."</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SECTION 4: LENS, FOCUS & LIGHTING -->
        <div class="content-section">
          <h2 class="section-title">4. Lens, Focus & Lighting</h2>
          <p class="section-description">Lens parameters control the visual depth and clarity, while lighting sets the mood, style, and contrast of the scene.</p>
          
          <div class="section-illustration">
            <img src="${lightingImgPath}" alt="Lighting Diagram">
          </div>

          <div class="callout-box">
            <div class="callout-title">💡 Pro Tip for Veo Lights</div>
            To create highly polished, commercial-grade product videos, combine <strong>"shallow depth of field"</strong> with <strong>"practical lights"</strong> and <strong>"rim lighting"</strong>. This helps separate the product from the background and highlights its edges with a premium glow.
          </div>

          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>Category</th>
                <th>Visual Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="term-name">Shallow Depth of Field</td>
                <td>Lens/Focus</td>
                <td class="term-desc">Sharp focus on subject with a blurred background ("creamy bokeh"). Separates subject from surrounding noise.</td>
              </tr>
              <tr>
                <td class="term-name">Deep Focus</td>
                <td>Lens/Focus</td>
                <td class="term-desc">All elements in the frame are sharp. Excellent for architectural shots and wide landscapes.</td>
              </tr>
              <tr>
                <td class="term-name">Macro Shot</td>
                <td>Lens/Focus</td>
                <td class="term-desc">Extreme close focus on microscopic details (water droplets, fabric weave, product engraving).</td>
              </tr>
              <tr>
                <td class="term-name">Anamorphic Lens</td>
                <td>Lens/Focus</td>
                <td class="term-desc">Wide aspect ratio, oval bokeh, and characteristic horizontal blue flares. Classic cinema look.</td>
              </tr>
              <tr>
                <td class="term-name">Rack Focus</td>
                <td>Lens/Focus</td>
                <td class="term-desc">Focus physically shifts from one plane to another mid-shot to redirect attention.</td>
              </tr>
              <tr>
                <td class="term-name">Three-Point Lighting</td>
                <td>Lighting</td>
                <td class="term-desc">Standard studio light formula using a Key light, Fill light, and Backlight for balanced depth.</td>
              </tr>
              <tr>
                <td class="term-name">Rim Light / Backlight</td>
                <td>Lighting</td>
                <td class="term-desc">Light source behind the subject, outlining their edges with a glowing, separating halo.</td>
              </tr>
              <tr>
                <td class="term-name">Silhouette Lighting</td>
                <td>Lighting</td>
                <td class="term-desc">Subject is in shadow, framed against a bright backlight. Emphasizes shape and outline.</td>
              </tr>
              <tr>
                <td class="term-name">Soft / Diffused Light</td>
                <td>Lighting</td>
                <td class="term-desc">Gentle, wrap-around lighting with soft shadows. Great for realistic skin tones.</td>
              </tr>
              <tr>
                <td class="term-name">Hard Light</td>
                <td>Lighting</td>
                <td class="term-desc">High-contrast, sharp-edged shadows. Dramatic, graphic, and intense.</td>
              </tr>
              <tr>
                <td class="term-name">Practical Lighting</td>
                <td>Lighting</td>
                <td class="term-desc">The light source is visible in-scene (lamps, candles, neon signs, computer screens).</td>
              </tr>
              <tr>
                <td class="term-name">Chiaroscuro</td>
                <td>Lighting</td>
                <td class="term-desc">Classic high-contrast technique with dark shadows and localized bright pools of light.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SECTION 5: PACING, AUDIO & RECIPES -->
        <div class="content-section">
          <h2 class="section-title">5. Pacing, Sound & Recipes</h2>
          <p class="section-description">Veo generates native high-fidelity audio. Directing sound elements alongside movement recipes completes the sensory experience.</p>
          
          <div class="tip-box">
            <div class="tip-title">🏃‍♂️ The "Run-and-Gun" Camera Suite</div>
            For intense action, combine <strong>"shaky tracking shot"</strong>, <strong>"handheld camera"</strong>, <strong>"camera bounce"</strong>, and <strong>"motion blur"</strong>. This directs the AI model to introduce physical, human-operator imperfection and momentum.
          </div>

          <h3 style="margin-top: 30px; margin-bottom: 15px; color: #1e1b4b;">Production Prompt Recipes</h3>
          <div class="recipes-container">
            <div class="recipe-card">
              <div class="recipe-card-title">🕶️ Style 1: Cyberpunk Editorial Spot</div>
              <div class="recipe-prompt-container">
                "Editorial fashion film. Anamorphic lens. Tracking shot following a model in a reflective silver jacket walking down a wet alley in neo-Seoul. Practical neon lighting, split lighting, warm pink and cool cyan tones. Shallow depth of field with creamy bokeh. Sync sound of heels clicking on wet pavement, distant city hum, and a low pulsing synth drone."
              </div>
            </div>

            <div class="recipe-card">
              <div class="recipe-card-title">🏃‍♂️ Style 2: High-Intensity Pursuit</div>
              <div class="recipe-prompt-container">
                "Run-and-gun style chase cam. Extreme close-up of a runner's boots striking muddy earth, followed immediately by a whip pan to a tracking shot following the runner from behind. Shaky handheld camera, camera bounce synced to footsteps. Heavy motion blur, occasional focus hunting. Ambient sound of heavy breathing, squelching mud, and rushing wind."
              </div>
            </div>

            <div class="recipe-card">
              <div class="recipe-card-title">🕯️ Style 3: Vintage Narrative Portrait</div>
              <div class="recipe-prompt-container">
                "A24-style indie film aesthetic. Medium shot of an elderly woman holding a steaming mug by a rainy window. Practical lighting from a table lamp, soft diffused daylight coming through the window. Shallow depth of field, warm color grading, 35mm film grain. Diegetic sound of rain tapping on glass, clock ticking in the background."
              </div>
            </div>
          </div>
        </div>

      </div>
    </body>
    </html>
  `;

  // Write temporary HTML file
  const htmlPath = path.resolve('C:/Users/High Tech/.gemini/antigravity/brain/dac44a01-79a1-4369-a8c8-fa7c1379dd8d/scratch/temp_pdf.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('HTML written to:', htmlPath);

  // Launch Playwright and generate PDF
  console.log('Launching Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set view size to avoid image layout quirks
  await page.setViewportSize({ width: 1200, height: 1600 });
  
  // Load the HTML with file:// protocol
  console.log('Loading local HTML page...');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  
  // Extra wait to guarantee Google Fonts are fully loaded and rendered
  await page.waitForTimeout(3000);

  const brainPdfPath = 'C:/Users/High Tech/.gemini/antigravity/brain/dac44a01-79a1-4369-a8c8-fa7c1379dd8d/veo_prompting_glossary.pdf';
  const workspacePdfPath = 'c:/Users/High Tech/.gemini/antigravity/scratch/open-design/veo_prompting_glossary.pdf';

  console.log('Generating PDF...');
  await page.pdf({
    path: brainPdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  console.log('PDF generated at brain folder:', brainPdfPath);

  // Copy to workspace
  fs.copyFileSync(brainPdfPath, workspacePdfPath);
  console.log('PDF copied to workspace:', workspacePdfPath);

  // Clean up temp HTML
  try {
    fs.unlinkSync(htmlPath);
    console.log('Cleaned up temporary HTML file.');
  } catch (e) {
    console.warn('Failed to clean up temporary HTML:', e.message);
  }

  await browser.close();
  console.log('All done! PDF successfully generated.');
}

run().catch(err => {
  console.error('Fatal error during PDF generation:', err);
  process.exit(1);
});
