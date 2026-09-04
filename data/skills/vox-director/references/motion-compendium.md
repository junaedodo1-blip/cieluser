# The Ultimate Motion Design & After Effects Compendium

This document compiles the complete findings, mathematical formulas, expressions, composting rigs, and procedural animation workflows required to build high-end, premium commercial motion graphics.

---

## 1. Speed Graph Mathematics & Easing Profiles

Linear motion feels computerized and cheap. To create snappy, responsive transitions, use custom KeyframeEase influence settings in After Effects or Cubic-Bézier curves in CSS/web frameworks.

| Motion Profile | AE Influence In/Out | Cubic-Bézier Equivalents | Cinematic Use Case |
| :--- | :--- | :--- | :--- |
| **The Snappy Snap (UI Reveal)** | Out: `88%` / In: `16%` | `cubic-bezier(0.88, 0, 0.84, 1)` | Bursting reveals, rapid UI pop-ins, responsive menu draws. |
| **The Cinematic Morph** | Out: `66%` / In: `66%` | `cubic-bezier(0.66, 0, 0.34, 1)` | Elegant morphs, camera pans, smooth transitions between scenes. |
| **Heavy Object Settling** | Out: `90%` / In: `90%` | `cubic-bezier(0.9, 0, 0.1, 1)` | Massive panels, physical drops, and landing UI blocks that decelerate over a long tail. |
| **Fluid Elastic (No overshoot)** | Out: `75%` / In: `15%` | `cubic-bezier(0.75, 0, 0.85, 1)` | Organic list reveals, stagger-start transitions. |

### ExtendScript Keyframe Ease Setup
```javascript
// Applies "The Snappy Snap" profile (88% Outgoing, 16% Incoming)
var easeOut = new KeyframeEase(0, 88);
var easeIn = new KeyframeEase(0, 16);
myProperty.setTemporalEaseAtKey(1, [easeOut], [easeOut]);
myProperty.setTemporalEaseAtKey(2, [easeIn], [easeIn]);
```

---

## 2. Physics-Based Expressions: Dan Ebberts' Inertial Bounce

This expression calculates physical momentum overshoot at the end of keyframed transitions.

### JavaScript Expression
```javascript
amp = 0.1;     // Amplitude: height/scale of overshoot (range: 0.05 - 0.25)
freq = 2.0;    // Frequency: speed of oscillations (range: 1.0 - 5.0)
decay = 3.0;   // Decay: how quickly it settles (range: 1.5 - 6.0)

n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time){
    n--;
  }
}
if (n == 0){
  t = 0;
}else{
  t = time - key(n).time;
}
if (n > 0 && t < 1){
  v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
  value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}else{
  value;
}
```

### JSON-Safe Escaped String
```json
"expression": "amp = 0.1;\nfreq = 2.0;\ndecay = 3.0;\nn = 0;\nif (numKeys > 0){\n  n = nearestKey(time).index;\n  if (key(n).time > time){\n    n--;\n  }\n}\nif (n == 0){\n  t = 0;\n}else{\n  t = time - key(n).time;\n}\nif (n > 0 && t < 1){\n  v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\n  value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n}else{\n  value;\n}"
```

---

## 3. Overlapping Action (The Marriott Stagger)

Fluid cascading reveals on typography elements and UI list structures:
- **The 2-4 Frame Rule:** Stagger offsets must fall strictly between 2 to 4 frames (at 24fps or 30fps) depending on visual weight.
- **Typography/Characters:** 2 frames offset.
- **UI List Rows / Grid Cards:** 3 to 4 frames offset.

### ExtendScript Auto-Stagger Formula:
```javascript
var staggerFrames = 3;
var staggerTime = staggerFrames * app.project.activeItem.frameDuration;
for (var i = 1; i <= myLayers.length; i++) {
    myLayers[i].startTime = (i - 1) * staggerTime;
}
```

---

## 4. Cinematic Shutter Physics (Motion Blur)

- **The 180-Degree Rule:** Native composition motion blur must simulate a physical cinema camera shutter at `180` degrees (`shutterAngle = 180`).
- **Centering Motion Blur (The Shutter Phase Rule):** To prevent visual displacement or lag in fast-moving shapes, the Shutter Phase must be locked to `-half of the Shutter Angle`.
  - **Formula:** $$\text{Shutter Phase} = -\frac{\text{Shutter Angle}}{2}$$
  - **Standard Setup:** `shutterAngle = 180` ➡️ `shutterPhase = -90`
  - **High-Energy Motion:** `shutterAngle = 360` ➡️ `shutterPhase = -180`

---

## 5. The Triple-Null Camera Rig

To prevent Anchor-Point Drift and Gimbal Lock, parent the 3D Camera layer to a hierarchical null structure:
1. `Camera_Master_Null` (3D): Global scaling, centering, and major layout pans.
2. `Camera_Orbit_Null` (3D): Handles pitch (X-Rotation), yaw (Y-Rotation), and roll (Z-Rotation).
3. `Camera_Dolly_Null` (3D): Fine Z-depth translation (dolly zooms).

### Rigging Parent Chain:
$$\text{Active Camera} \longrightarrow \text{Dolly Null} \longrightarrow \text{Orbit Null} \longrightarrow \text{Master Null}$$

---

## 6. Native 32-bpc Volumetric Glow (Bloom Rig)

To replicate premium third-party plugins like "Deep Glow" natively:
1. Set the Composition bit-depth to **32-bpc (Float)** for linear, unclipped light values.
2. Duplicate the source layer 5 times to form a stack. Set all duplicated layers to the **Screen** or **Add** blend modes.
3. Configure the stacked Gaussian Blurs with exponentially scaling radii:
   - **Layer 1 (Tight core):** Blur Radius = `10` | Opacity = `100%`
   - **Layer 2 (Inner glow):** Blur Radius = `20` | Opacity = `80%`
   - **Layer 3 (Mid bloom):** Blur Radius = `40` | Opacity = `60%`
   - **Layer 4 (Outer wash):** Blur Radius = `80` | Opacity = `45%`
   - **Layer 5 (Volumetric atmosphere):** Blur Radius = `160` (or `320`) | Opacity = `25%`
4. Use a Curves or Levels effect prior to the blurs on each layer to restrict the glow threshold to highlights.

---

## 7. Procedural Analog Cel-Simulation Stack

To bypass flat, computerized vector looks, apply this effect stack on an Adjustment Layer at the very top of your composition:
1. **Turbulent Displace:** Amount: `3`, Size: `4`, Evolution expression: `time * 150`.
2. **Roughen Edges:** Border: `1.5`, Edge Sharpness: `1.2`, Evolution: `time * 120`.
3. **Posterize Time:** Frame Rate: Locked to `12` or `15` fps.

---

## 8. Advanced Glass Refraction & Specular Highlights

Create dynamic refraction where background elements warp organically around glass layers:
- **Displacement Noise Pre-comp:** Create a noise solid in a composition 2x your main composition's dimensions. Apply Fractal Noise (Contrast: `150`, Complexity: `6.0`) and a Fast Box Blur (Radius: `15`).
- **Displacement Mapping:** Apply the Displacement Map effect to an Adjustment Layer over the background, target the noise pre-comp, and set horizontal/vertical sources to Luminance.
- **Chromatic Aberration:** Separate the background into RGB channels (using `Shift Channels` on duplicates) and offset positions by `2-3px` at refraction boundaries.
- **Edge Specular catching:** Add a semi-transparent shape layer with a soft white gradient (Opacity: `15%`, Blend Mode: `Screen`) to match glass reflections.

---

## 9. Trigonometric Wave Propagation Expressions

Use mathematics to animate complex structures procedurally:

### Organic Pendulum Swing (Dampened)
```javascript
frequency = 1.5;   // Swings per second
amplitude = 45;    // Peak rotation angle (degrees)
decay = 0.8;       // Higher values dampen swing faster
amplitude * Math.sin(frequency * time * 2 * Math.PI) / Math.exp(decay * time)
```

### Grid Ripple
```javascript
target = thisComp.layer("Ripple_Control_Null");
maxDistance = 500;
maxScale = 150;
frequency = 2.0;

d = length(toWorld(anchorPoint), target.toWorld(target.anchorPoint));
if (d < maxDistance) {
    wave = Math.sin((d/maxDistance) * Math.PI * 2 * frequency - time * 5);
    easeWave = ease(wave, -1, 1, 100, maxScale);
    [easeWave, easeWave]
} else {
    [100, 100]
}
```

---

## 10. Super Fluid 3D Morphing & 60 FPS Transitions

To design liquid morphs, fuse traditional mesh calculations with high frame-rate timing structures:
- **The "Matte Gooey" Liquid Stack (2D-to-3D Morphing):**
  1. Create separate shape layers animate their paths using Bezier points.
  2. Pre-compose the layers and add an Adjustment Layer over the stack.
  3. Apply Fast Box Blur (Radius: `30` to `50`).
  4. Apply Simple Choker (Choke Matte: `35` to `55`).
  5. Apply Turbulent Displace (Amount: `5`, Size: `8`, Complexity: `1.0`, Evolution: `time * 200`).
- **High-End Mesh Morphing via Cinema 4D (Pose Morph):**
  - **Pose Morph Tag:** In Cinema 4D, link two independent 3D meshes (e.g., a sphere morphing into a complex typography glyph) using the Pose Morph module.
  - **Cineware Integration:** Import the native `.c4d` scene into After Effects and render using the Cineware pipeline.
  - **Composite in AE:** Add volume by layering Inner Glow layer styles, chromatic aberrations, and ambient 32-bpc glow passes.
- **60 FPS Fluidity Protocols:**
  - **Double the Precision:** Render strictly in 60 fps (or higher) comps.
  - **The Velocity Curve rule for Morphing:** Fluid morphs require highly asymmetrical velocity curves (snappy start, long slow settling tail).

---

## 11. Advanced Expression Selectors (Text Rigging)

By substituting Range Selectors with Expression Selectors, characters are manipulated individually using JavaScript logic based on `textIndex`.

### Per-Character Floating Sine Wave
Apply to a Text Animator's Position or Scale parameter:
```javascript
// Expression Selector -> Amount
freq = 3.0; // Oscillations per second
waveOffset = 0.5; // Stagger factor between letters
delay = textIndex * waveOffset;
Math.sin(time * freq - delay) * 100
```

---

## 12. Character Animation Rigging Pipelines

High-end character rigs rely on three industry-standard tools:
- **Duik Angela:** Rig bones and set up full-body Inverse Kinematics (IK) for torso, arm, and leg skeletons.
- **Limber:** Generate vector-based limb layers that bend organically with real-time scaling and styling.
- **Joysticks 'n Sliders:** Create slider controls to interpolate smoothly between distinct angles/poses (perfect for head turns and facial lip syncs).

---

## 13. 2.5D Lighting & "Shadow Catcher" Rendering

To render complex shadows in 3D compositions without rendering delays:
- Enable Casts Shadows on active elements and Accepts Shadows on background planes.
- Set up Spot/Point light layers with soft Shadow Diffusion values for realistic edges.
- **Shadow Catchers:** Place a solid plane exactly where shadows fall. Under Material Options, set Accepts Shadows to Only. This renders the shadow details on a transparent channel, allowing you to blend them over complex footage with zero render overhead.

---

## 14. High-Performance Expression Coding

Because After Effects re-evaluates expressions on every frame, poorly written code causes render bottlenecks. Use these guidelines to keep timelines responsive:
- **Avoid Repeated Object Lookups:** Store complex references in variables rather than looking them up repeatedly in loops.
  ```javascript
  // BAD (Slow)
  thisComp.layer("Control").effect("Slider")("Value") * thisComp.layer("Control").effect("Slider")("Multiplier")

  // GOOD (Fast)
  const ctrl = thisComp.layer("Control").effect("Slider");
  const val = ctrl("Value").value;
  const mult = ctrl("Multiplier").value;
  val * mult;
  ```
- **Limit time loops and `valueAtTime()`:** Sampling multiple frames (e.g., using loop functions to scan back in time) scales exponentially in render cost. Limit lookback frames to a small window or bake calculations.
- **Baking Expressions:** When finalizing scenes for delivery, select properties and go to Animation > Keyframe Assistant > Convert Expression to Keyframes to freeze the values and eliminate execution overhead entirely.

---

## 15. Sound-to-Keyframe Optimization & Linear Mapping

To link audio peaks cleanly to motion paths without jitter:
1. Convert Audio to Keyframes using the keyframe assistant.
2. Assign the amplitude slider to a variable to avoid lookup lag.
3. Use the `linear()` or `ease()` functions to remap the noisy input range to a smooth output range:
   ```javascript
   const audio = thisComp.layer("Audio Amplitude").effect("Both Channels")("Slider").value;
   // Map input range (0 to 25 dB) to output scale (100% to 150%)
   ease(audio, 0, 25, 100, 150)
   ```

---

## 16. Generative Math-Based Pathing (`createPath()`)

Create dynamic procedural paths (e.g., spirographs, fractals, or grid meshes) using code instead of drawing points manually. Apply to a Shape Layer's Path property:
```javascript
// Generates a parametric star wave
var points = [];
var numPoints = 64;
var center = [0, 0];

for (var i = 0; i < numPoints; i++) {
    var angle = (i / numPoints) * Math.PI * 2;
    var wave = Math.sin(angle * 8 + time * 4) * 20;
    var r = 120 + wave;
    var x = center[0] + Math.cos(angle) * r;
    var y = center[1] + Math.sin(angle) * r;
    points.push([x, y]);
}

createPath(points, [], [], true);
```
Add `seedRandom(index, true)` inside the loop when duplicating layers to generate unique, deterministic noise variants.

---

## 17. Master System Prompt Template

```markdown
You are "Worker B," an elite Motion Design Director, VFX Pipeline Engineer, and After Effects ExtendScript developer. Your objective is to build mathematically perfect, premium-tier commercial motion graphics, generating clean ExtendScript (.jsx) and `aftr` JSON payloads. 

Your creations must feel organic, snappy, and physically grounded. Obey the following directives strictly:

### 1. ACTIONABLE EASING DIRECTIVES
*   🚫 Banned Curve: Linear keyframes (linear) are strictly prohibited. Default "Easy Ease" (33% influence) is banned for UI/Commercial motion.
*   📈 Approved Easing Profiles: Use these exact velocity metrics:
    *   The Snappy Snap (UI Reveal): Outgoing: 88% / Incoming: 16% | CSS: cubic-bezier(0.88, 0, 0.84, 1).
    *   The Cinematic Morph: Outgoing: 66% / Incoming: 66% | CSS: cubic-bezier(0.66, 0, 0.34, 1).
    *   Heavy Settling: Outgoing: 90% / Incoming: 90% | CSS: cubic-bezier(0.9, 0, 0.1, 1).
*   ExtendScript Syntax:
    ```javascript
    var easeOut = new KeyframeEase(0, 88);
    var easeIn = new KeyframeEase(0, 16);
    property.setTemporalEaseAtKey(1, [easeOut], [easeOut]);
    ```

### 2. PHYSICS-BASED DYNAMICS: INERTIAL BOUNCE
For dynamic overshoot, apply Dan Ebberts' physics-based decay formula to scale/rotation/position.
*   Variables: amp (0.08 - 0.15), freq (2.0 - 3.5), decay (2.5 - 5.0).
*   Expression Code:
    ```javascript
    amp = 0.1; freq = 2.0; decay = 3.0;
    n = 0; if (numKeys > 0){ n = nearestKey(time).index; if (key(n).time > time){ n--; } }
    t = (n == 0) ? 0 : time - key(n).time;
    if (n > 0 && t < 1){
      v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
      value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
    } else { value; }
    ```

### 3. COMPOSITION PHYSICS & CINEMA SIMULATION
*   The 180-Degree Rule: Force comp-level motion blur: shutterAngle = 180.
*   Shutter Phase Centering: Force shutterPhase = -90 (Phase must always equal -shutterAngle / 2).
*   The Marriott Stagger: Stagger cascading items (UI grids, typography characters) by precisely 2 to 4 frames. Use startTime = (index - 1) * (staggerFrames * frameDuration).

### 4. THE TRIPLE-NULL CAMERA RIG
Never animate the camera layer directly. Parent the 3D Camera to a hierarchical null structure:
1. Camera_Master_Null (3D): Global pans, scaling, offsets.
2. Camera_Orbit_Null (3D): Handles pitch (X), yaw (Y), roll (Z) rotations.
3. Camera_Dolly_Null (3D): Fine Z-depth translation.
* Parent Chain: Active Camera ➡️ Dolly Null ➡️ Orbit Null ➡️ Master Null.

### 5. NATIVE 32-BPC VOLUMETRIC GLOW
Replicate "Deep Glow" falloff natively:
1. Set project color space to 32-bpc Float for linear luminance.
2. Duplicate target layer 5 times, set all duplicates to Screen or Add blending modes.
3. Apply Gaussian Blur to duplicates with exponential radii: 10px (Opacity 100%), 20px (Opacity 80%), 40px (Opacity 60%), 80px (Opacity 40%), 160px (Opacity 20%).
4. Apply a Curves threshold modifier on duplicates to isolate highlights.

### 6. PROCEDURAL TEXTURING & CEL-SIMULATION
To bypass flat digital vector looks, add a cel-animation aesthetic:
*   Apply to an Adjustment Layer at the top of the comp:
    1. Turbulent Displace: Amount 3, Size 4, Evolution expression: time * 150.
    2. Roughen Edges: Border 1.5, Edge Sharpness 1.2, Evolution: time * 120.
    3. Posterize Time: Frame Rate locked to 12 or 15 fps.

### 7. TRIGONOMETRIC WAVE PROPAGATION
For grid layouts, make layers react organically to a controller Null's position:
```javascript
target = thisComp.layer("Controller");
d = length(toWorld(anchorPoint), target.toWorld(target.anchorPoint));
wave = Math.sin((d/500) * Math.PI * 2 * 2.0 - time * 5);
ease(wave, -1, 1, 100, 150)
```

### 8. FLUID 3D MORPHS & 60 FPS TRANSITIONS
Use the Simple Choker + Fast Box Blur technique (Blur: 40px, Simple Choker: 45px) to dynamically merge and split vector shapes like liquid mercury. Setup Pose Morph tags in Cinema 4D for 3D mesh morphs and import via Cineware. Render transitions at native 60 FPS utilizing asymmetrical ease curves.

### 9. EXPRESSION SELECTORS (TEXT PHYSICS)
Use character-index arrays to drive procedural kinetic animations (e.g. Math.sin(time * freq - textIndex * offset)).

### 10. CHARACTER RIGGING & LIGHTING PANS
Apply Duik Angela, Limber, and Joysticks 'n Sliders for character rigs. Construct shadow catchers (Accepts Shadows: Only) to optimize 2.5D lighting.

### 11. HIGH-PERFORMANCE EXPRESSION OPTIMIZATION
Cache complex layer lookups (thisComp.layer(...)) in variables. Avoid valueAtTime() loops. Bake expressions to keyframes before delivery. Link audio amplitudes efficiently using ease() or linear() mapping functions. Programmatically draw vector shapes using createPath().

### 12. OUTPUT PROTOCOL
When generating aftr JSON payloads, output valid schemas enclosing comps, shapes, cameras, parenting chains, keyframe ease arrays (e.g. [0, 88]), and escaped single-line expressions.
```

---

## 18. Valid `aftr` JSON Payload Example

```json
{
  "version": "3.2.0",
  "composition": {
    "width": 1920,
    "height": 1080,
    "fps": 30,
    "duration": 5.0,
    "shutterAngle": 180,
    "shutterPhase": -90
  },
  "layers": [
    {
      "name": "Camera_Master_Null",
      "type": "null",
      "threeD": true,
      "properties": {
        "position": {
          "keyframes": [
            {
              "time": 0.0,
              "value": [960, 540, 0],
              "easeOut": [0, 88]
            },
            {
              "time": 1.0,
              "value": [960, 440, -200],
              "easeIn": [0, 16]
            }
          ]
        }
      }
    },
    {
      "name": "UI_Card_01",
      "type": "shape",
      "parent": "Camera_Master_Null",
      "startTime": 0.1,
      "properties": {
        "scale": {
          "keyframes": [
            {
              "time": 0.1,
              "value": [0, 0, 100],
              "easeOut": [0, 88]
            },
            {
              "time": 0.6,
              "value": [100, 100, 100],
              "easeIn": [0, 16]
            }
          ],
          "expression": "amp = 0.08;\nfreq = 2.5;\ndecay = 4.0;\nn = 0;\nif (numKeys > 0){\n  n = nearestKey(time).index;\n  if (key(n).time > time){\n    n--;\n  }\n}\nif (n == 0){\n  t = 0;\n}else{\n  t = time - key(n).time;\n}\nif (n > 0 && t < 1){\n  v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\n  value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n}else{\n  value;\n}"
        }
      }
    }
  ]
}
```
