---
name: instagram-carousel-automation
zh_name: "Instagram 轮播图全自动发布"
en_name: "Instagram Carousel Automation"
description: "End-to-end Instagram carousel pipeline: scrapes competitor copy with Apify, cycles through reference style folders round-robin, generates customized slides with Nano Banana 2, and schedules/publishes to Instagram via Buffer."
category: marketing
tags: ["instagram", "carousel", "automation", "buffer", "apify", "nanobanana"]
od:
  mode: prototype
  surface: web
  platform: desktop
  scenario: marketing
---

# Instagram Carousel Automation Skill

This skill executes an autonomous, multi-step pipeline to research, generate, and publish high-retention Instagram carousels:

## Weekly Style Rotation & Reference Doctrine

- **Sunday (1x/week: Strict Brand Day)**:
  - Strict `project\ciel` master brand system: Abyss Black (`#0A0A0C`), Crisp White (`#FFFFFF`), Muted Platinum (`#E2E2E8`), Studio Slate (`#141418`), Playfair editorial serif, Archivo Swiss HUD metadata, and 7-block constellation monogram.
- **Monday – Saturday (6x/week: Reference-Derived Style Days)**:
  - **Visual Style Direction**: Strictly derive color palette, lighting, background textures (paper grids, brutalist concrete, obsidian dither), and depth of field from the reference image in `Downloads/insta references/<style_folder>`.
  - **Typography Direction**: Replicate the exact typography hierarchy, font weights, casing, and lettering style from the reference image.
  - **Asset Creation Direction**: Replicate graphic containers, speech bubble pills, highlight tape strips, street stickers, and geometric borders from the reference image.
  - **Prompt Spine**: `"Use this image as reference but add my copy and branding to it. ADOPT VISUAL STYLE, TYPOGRAPHY, AND ASSET CREATION DIRECTION DIRECTLY FROM THE REFERENCE IMAGE."`

## Conversion Funnel & Lead Magnet

- Every carousel links to an automated **interactive HTML lead magnet** generated in `out/digital_products/`.
- OpenReply automatically sends direct messages with the playbook link when users comment **`CIEL`** on `@junnbuilds`.

