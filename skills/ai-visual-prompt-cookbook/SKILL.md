---
name: ai-visual-prompt-cookbook
description: Comprehensive guide, reference catalog, and generator for all 126 AI Visual Prompt Cookbook styles across Nano Banana, Midjourney, Flux, and Seedance. Use whenever selecting, generating, auditing, or rotating visual prompt styles for Instagram carousels, ads, or brand posters.
---

# AI Visual Prompt Cookbook Skill

This skill encodes the complete **AI Visual Prompt Cookbook**—a library of **126 industry-grade visual prompt style specifications** for generating high-converting, visual-fidelity AI posters, carousels, and ad creative.

Each style specification resides in data/ai_visual_prompt_cookbook/<style-slug>.json.

---

## 1. Core Workflow: Using a Cookbook Style

When creating or refining a visual prompt for a carousel, ad, or poster:

1. **Select a Style**: Choose a style by slug from data/ai_visual_prompt_cookbook/catalog.json (or rotate via selectNextCookbookStyle in scripts/carousel_automation/style_manager.ts).
2. **Read the Style Spec**: Load data/ai_visual_prompt_cookbook/<style-slug>.json.
3. **Fill Environment Variables**:
   - SUBJECT: Primary subject / mascot / hero product
   - SUBJECT_ACTION: Staged pose, camera angle, motion
   - MAIN_TEXT: Stacked headline typography
   - SECONDARY_TEXT: Subhead / Swiss HUD metadata / sticker text
   - LOCATION: Studio set / urban backdrop / brutalist setting
   - ACCENT_SYMBOL: 🪩 ⚡ 🍒 💸 🖱️ 🎯 sticker icons
4. **Enforce Style Fidelity Anchors**: Apply all 10–12 style_fidelity_anchors listed in the JSON spec.
5. **Enforce Negative Directives (source_content_to_avoid)**: Exclude generic plastic AI sheen, unrequested elements, or direct reference clones.

---

## 2. Style Index (126 Styles)

The 126 visual styles cover diverse aesthetic categories:

### A. Streetwear & Youth Fashion
- cid-lime-3d-streetwear-type-poster-style: Glossy C4D, acid-lime accents, heavy block type, sticker badges.
- y2k-streetwear-sticker-collage-style: Y2K stickers, chrome badges, fisheye lens, distressed print.
- 	eenage-skate-scribble-screenprint-poster-style: Raw screenprint, skate scribbles, bold halftone.
- kinetic-luxury-street-fashion-cover-style: High-fashion streetwear, kinetic motion blur, Playfair/Lato contrast.

### B. Cinematic Auteur & Luxury Storytelling
- quiet-luxury-furniture-nameplate-poster-style: Minimalist luxury, serif nameplates, 50mm macro lighting.
- cobalt-torn-didone-portrait-editorial-style: High-contrast Didone serif, torn paper edges, cobalt shadows.
- sunlit-architectural-fashion-editorial: Mediterranean sun, architectural shadows, editorial linen texture.
- 
etro-future-chrome-portrait-dossier: Chrome surfaces, neon HUD lines, futuristic dossier layout.

### C. Technical & Data HUD
- lue-hud-macro-product-poster: Clinical 0.5px Swiss HUD metadata, macro textures, concentric circles.
- motorsport-technical-editorial: High-speed telemetry grids, carbon fiber textures, bold red accents.
- monochrome-grid-sneaker-tech-spec: Technical graph paper grid, exploded material anatomy, wireframe HUD.

### D. Pop, Manga & Graphic Zine
- 
ed-black-manga-tabloid-poster-style: High-impact manga speed lines, tabloid headers, halftones.
- k-pop-apocalypse-ransom-zine-style: Cutout ransom letters, neon spray paint, Y2K glitch aesthetics.
- yellow-graffiti-fisheye-manga-street-poster-style: 0.5x fisheye distortion, yellow graffiti tags, street poster layering.

---

## 3. Automation Integration

In TypeScript / Node pipelines (scripts/carousel_automation/):

`	ypescript
import { selectNextCookbookStyle } from './style_manager.js';

// Select next style in round-robin order
const styleSpec = selectNextCookbookStyle();
console.log(📖 Active Style:  ());
`

---

## 4. Verification & Fidelity Audit

Always run the **Visual Fidelity Self-Checker** after generating prompts to confirm:
- **Header Readability**: 100% clear typography contrast
- **Fidelity Anchor Match**: ≥ 90% alignment with style JSON
- **Zero Hallucination**: No random artifacts or unintended plastic textures
