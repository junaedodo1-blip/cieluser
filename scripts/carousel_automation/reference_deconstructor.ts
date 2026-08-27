import fs from 'node:fs';
import path from 'node:path';

/**
 * ============================================================================
 * 🔒 STRICT HARD RULES FOR ALL VISUAL GENERATIONS & POSTS:
 * 1. FAITHFUL REFERENCE ADAPTATION: Follow the exact scene concept, framing,
 *    lighting, and layout structure of the reference image.
 * 2. BRAND COLOR CALIBRATION: Apply the official project\ciel color architecture:
 *    - Abyss Black (#0A0A0C) deep shadow wells & clean contrast
 *    - Crisp White (#FFFFFF) & Muted Platinum (#E2E2E8) typography
 *    - Studio Slate (#141418) container surfaces & Brushed Titanium hardware
 *    - Warm Golden Amber (#F59E0B) caustics & natural lighting
 * 3. RELATABLE CASTING & EVERYDAY STYLISH WARDROBE:
 *    - Model: Authentic, approachable, diverse young creative founders, designers,
 *      and creators with natural warmth, genuine expressions, and real-world charm.
 *    - Wardrobe: Effortlessly stylish, relatable everyday creator fashion — clean
 *      heavyweight cotton tees (black/white), minimalist zip overshirts, relaxed
 *      cashmere crewnecks, clean tailored black blazers with relaxed trousers,
 *      or clean hoodies under a modern jacket. Relatable, grounded, high-taste.
 * 4. MANDATORY BRANDING & COPY:
 *    - Featured wordmarks/lettering adapted to "project\ciel" / "CIEL"
 *    - Swiss HUD metadata stamps: "// project\ciel · AUTEUR DIRECTING", "[CIEL · 2026]"
 *    - Tagline: "BEYOND THE FRAME, INTO FEELING."
 * ============================================================================
 */

export interface DeconstructedReferenceStyle {
  id: string;
  referenceName: string;
  referencePath: string;
  visualGenre: string;
  backgroundDescription: string;
  headerNavigationStyle: string;
  typographySystem: string;
  colorPalette: {
    background: string;
    text: string;
    highlighters: string[];
    badges: string[];
  };
  stickerAndDecalStyle: string;
  cinemaLightingStack: string;
  corePromptTemplate: string;
  requiredKeywords: string[];
  forbiddenKeywords: string[];
}

/**
 * 100% Visually Verified Registry of all 7 Reference Styles in carousel_references/insta_downloads_style/.
 * Each entry is visually audited against the actual source image to prevent hallucination.
 */
export const REFERENCE_DECONSTRUCTION_REGISTRY: Record<string, DeconstructedReferenceStyle> = {
  // Style 1: Community Graph Grid Collage (47682beae2eaca13fedf18527dbef244.jpg)
  'community_grid_collage': {
    id: 'community_grid_collage',
    referenceName: 'Community Graph Grid Collage',
    referencePath: 'carousel_references/insta_downloads_style/47682beae2eaca13fedf18527dbef244.jpg',
    visualGenre: 'Playful Y2K Editorial Grid Collage',
    backgroundDescription: 'Clean white graph grid notebook paper with subtle technical grey grid lines.',
    headerNavigationStyle: 'Minimalist top app navigation: "< project\\ciel." on top-left, "☰ 🔍 +" icons on top-right in black.',
    typographySystem: 'Large stacked high-contrast editorial serif headline with tight leading and bold lowercase contrast.',
    colorPalette: {
      background: '#F8F8F5 off-white cream graph paper',
      text: '#0A0A0C obsidian black',
      highlighters: ['#FCE7F3 pastel pink highlighter bar', '#DCFCE7 pastel lime green', '#BAE6FD pastel blue'],
      badges: ['#FFFFFF pill tags with pink dot', '#B4DCA4 green speech bubble', '#BAE6FD blue speech bubble'],
    },
    stickerAndDecalStyle: 'Playful floating 3D micro-stickers and icons: glossy red cherries 🍒, disco ball 🪩, lightning bolt ⚡, flying cash 💸, retro pixel mouse cursors 🖱️, and speech bubble cards.',
    cinemaLightingStack: 'Clean flat even studio lighting, subtle soft drop shadows under stickers and text, razor-sharp vector typography, zero blur.',
    corePromptTemplate: `Use this image as reference to create a graphic carousel slide in the exact same visual style:
• Background: Clean white graph grid notebook paper with subtle grey grid lines.
• Header: Top app bar "< project\\ciel." on top-left and "☰ 🔍 +" on top-right.
• Typography: Massive bold stacked high-contrast editorial serif headline.
• Highlighters: Soft pastel pink highlighter rectangle behind highlighted keywords.
• Stickers & Badges: Floating 3D glossy cherries 🍒, disco ball 🪩, lightning bolt ⚡, flying cash 💸, retro pixel cursor 🖱️, and pill tag with pink dot.
• Quality: Razor-sharp graphic design, ultra-clean typography, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['graph grid', 'cherries', 'highlighter', 'serif', 'pill tag'],
    forbiddenKeywords: ['scaffolding', 'wax seal', 'plastic basket', 'concrete sculpture'],
  },

  // Style 2: Streetwear Decal Banana Object (1df4921e54ec27062eea030fd76b32b0.jpg)
  'street_decal_object': {
    id: 'street_decal_object',
    referenceName: 'Streetwear Decal Banana Object',
    referencePath: 'carousel_references/insta_downloads_style/1df4921e54ec27062eea030fd76b32b0.jpg',
    visualGenre: 'Streetwear Product Concept / Physical Hero Object',
    backgroundDescription: 'Pure solid white studio backdrop with zero background clutter.',
    headerNavigationStyle: 'Stacked bold grotesque headline in background ("Hungry(O\'Clock) Packaging Concept") with fine copyright stamps ("©2025 Blender (mdr)").',
    typographySystem: 'Heavy condensed grotesque sans-serif in solid black, layered behind and in front of the central physical object.',
    colorPalette: {
      background: '#FFFFFF crisp white seamless',
      text: '#000000 pure black',
      highlighters: ['#A3E635 neon lime recycling badge', '#C084FC purple monster decal'],
      badges: ['Skate and streetwear decal stickers, circular black-and-white logos, barcode stamps'],
    },
    stickerAndDecalStyle: 'Central physical hero object completely covered in graphic streetwear decals, circular brand stamps, purple monster cartoon sticker, and green recycling icon.',
    cinemaLightingStack: 'Studio macro photography lighting, soft natural contact shadow, authentic physical skin texture, razor-sharp 50mm clean prime.',
    corePromptTemplate: `Use this image as reference to create a graphic carousel slide in the exact same visual style:
• Background: Solid pure white studio background with soft natural contact shadow.
• Hero Object: Central physical object completely covered in graphic streetwear decals, skate stickers, and circular brand emblems.
• Typography: Bold grotesque typography stacked in black behind and around the hero object.
• Quality: Macro studio photography, razor-sharp vector stickers, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['white background', 'physical hero object', 'streetwear decals', 'skate stickers', 'grotesque typography'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'wax seal', 'split background'],
  },

  // Style 3: Green Amoeba Museum Poster (1436e1a05901172598d39a538ffb0c28.jpg)
  'green_amoeba_museum_poster': {
    id: 'green_amoeba_museum_poster',
    referenceName: 'Green Amoeba Starburst Museum Poster',
    referencePath: 'carousel_references/insta_downloads_style/1436e1a05901172598d39a538ffb0c28.jpg',
    visualGenre: 'Swiss Brutalist Museum Exhibition Poster',
    backgroundDescription: 'Clean off-white gallery paper canvas with flat 2D graphic layout.',
    headerNavigationStyle: 'Massive bold condensed grotesque headline on top-left with asterisk icon ("THE BOMBAY MUSEUM OF * PARASITES").',
    typographySystem: 'Brutalist heavy condensed sans-serif in solid black, paired with beaded/dotted chain-link numbers ("20-21") and Swiss typewriter body metadata.',
    colorPalette: {
      background: '#F5F5F0 off-white gallery paper',
      text: '#000000 pure black',
      highlighters: ['#22C55E vibrant green amoeba blob', '#2EBD6E emerald'],
      badges: ['Tilted oval badge with arrow ("PARASITES.COM")', 'BMOP pill badge', 'Smiley circular museum stamp with diagonal arrow'],
    },
    stickerAndDecalStyle: 'Giant green 8-point amoeboid starburst blob dominating the center, beaded chain-link numbers, and typewriter museum metadata cards with directional arrows.',
    cinemaLightingStack: 'Flat 2D graphic vector print design, razor-sharp typography, zero 3D rendering, zero realistic drop shadows.',
    corePromptTemplate: `Use this image as reference to create a 2D graphic poster in the exact same Swiss Brutalist style:
• Background: Off-white flat paper canvas.
• Central Shape: Giant vibrant green 8-point amoeboid starburst blob (#22C55E) dominating the layout.
• Typography: Massive bold condensed black grotesque headline on top-left, and beaded/dotted chain-link numbers on bottom-left.
• Badges & Details: Tilted oval badge with arrow, pill stamps, and small typewriter metadata paragraph with smiley stamp and arrow on bottom-right.
• Quality: Flat 2D vector print design, razor-sharp typography, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['green amoeba', 'starburst blob', 'off-white', 'beaded chain-link', 'oval badge'],
    forbiddenKeywords: ['graph paper', 'scaffolding', 'wax seal', 'plastic basket'],
  },

  // Style 4: Swiss Acid Stepped-Polygon Cutout (4b7cdcff38fc3e7931e62a761c9d2022.jpg / media_1787348160773.jpg)
  'stepped_pixel_acid_poster': {
    id: 'stepped_pixel_acid_poster',
    referenceName: 'Swiss Acid Stepped-Polygon Cutout Poster',
    referencePath: 'carousel_references/insta_downloads_style/4b7cdcff38fc3e7931e62a761c9d2022.jpg',
    visualGenre: 'Swiss Acid / Neo-Brutalist Vector Print',
    backgroundDescription: 'Flat, clean, neutral light warm-grey / off-white poster canvas (#E3E3E3) with zero 3D lighting, completely flat 2D graphic design.',
    headerNavigationStyle: 'Minimalist top metadata bar: "05 NOV OF 25TH" on top-left, "WEDNESDAY" in center, "8.37 PM" on top-right in crisp uppercase sans-serif.',
    typographySystem: 'Hybrid dual-font layering: Clean modern geometric sans-serif in lowercase (Futura/Helvetica style, e.g. "things", "they seem") layered with dramatic, melted psychedelic ink-drip liquid cursive calligraphy in solid black (e.g. "aren\'t", "what").',
    colorPalette: {
      background: '#E3E3E3 neutral light warm-grey canvas',
      text: '#000000 pure black',
      highlighters: ['#FF9EE2 bubblegum pastel pink', '#5C7CFA electric periwinkle cobalt blue'],
      badges: ['Thin 1px black outline on stepped polygon containers', 'Micro-copy definition paragraphs scattered in negative space'],
    },
    stickerAndDecalStyle: '2 large stepped/pixelated contour polygon cutout containers with thin 1px black outline borders framing the text. 90-degree rotated vertical margin labels ("PLACEBO", "BURGER QUEEN"), and micro-type definition blocks.',
    cinemaLightingStack: 'Pure flat 2D graphic vector poster, razor-sharp typography, zero 3D bevels, zero realistic lighting, pure Swiss acid graphic design print look.',
    corePromptTemplate: `Use this image as reference to create a 2D graphic poster in the EXACT same Swiss Acid / Neo-Brutalist visual style:
• Background: Flat neutral light warm-grey canvas (#E3E3E3), pure 2D graphic poster layout.
• Stepped Polygon Containers: 2 large stepped/pixelated contour color-block cutout shapes with thin 1px black outlines (one bubblegum pink, one vibrant cobalt blue).
• Dual-Typeface Layering: Clean geometric lowercase sans-serif text layered together with extreme melted psychedelic ink-trap liquid black calligraphy.
• Metadata & Details: Top header timestamp ('05 NOV OF 25TH', 'WEDNESDAY', '8.37 PM'), 90-degree rotated vertical margin text ('PLACEBO' on left, 'BURGER QUEEN' on right), and tiny micro-type body paragraphs floating in empty space.
• Quality: Razor-sharp graphic design, zero 3D rendering, flat print aesthetic, 4:5 vertical portrait.`,
    requiredKeywords: ['stepped polygon', 'pixelated contour', 'bubblegum pink', 'cobalt blue', 'melted liquid calligraphy', 'warm-grey canvas'],
    forbiddenKeywords: ['3D drop shadow', 'wax seal', 'scaffolding', 'plastic basket'],
  },

  // Style 5: Brand Agency Graph Paper & Neon Target Decals (a2194f65a318c5de32470affecc64064.jpg)
  'brand_agency_graph_paper': {
    id: 'brand_agency_graph_paper',
    referenceName: 'Brand Agency Graph Paper & Target Decals',
    referencePath: 'carousel_references/insta_downloads_style/a2194f65a318c5de32470affecc64064.jpg',
    visualGenre: 'Modern Minimalist Agency Brand Sheet',
    backgroundDescription: 'Light textured graph paper canvas with soft neon lime-green spray ambient glow in top-right and bottom-left corners.',
    headerNavigationStyle: 'Clean brand header: "Who We Are:" + "Chazon" logo + "Plain vision. Bold brands" badge on top right.',
    typographySystem: 'Modern geometric grotesque sans-serif ("We build brands that feel intentional. From identity to execution.") in dark charcoal.',
    colorPalette: {
      background: '#FAFAFA fine graph paper with soft lime spray glow',
      text: '#111827 dark charcoal',
      highlighters: ['#A3E635 vibrant neon lime highlighter with triangle crop marks', '#BEF264 light lime'],
      badges: ['Tilted bright neon lime-green 3D pill tags with drop shadows', 'Green target / bullseye icons 🎯', 'Bottom social media pill bar'],
    },
    stickerAndDecalStyle: 'Tilted neon lime pill stickers with drop shadows ("Strategy first", "Design with meaning", "Built to scale"), green target icons 🎯, and triangle crop marks on highlighted text.',
    cinemaLightingStack: 'Clean flat editorial lighting with subtle soft drop shadows under pill badges and neon spray ambient corner glow.',
    corePromptTemplate: `Use this image as reference to create a graphic carousel slide in the exact same visual style:
• Background: Light fine graph paper with soft neon lime-green ambient glow in corners.
• Header: Clean header "Who We Are:" and brand pill badge on top.
• Typography: Crisp geometric grotesque typography in dark charcoal.
• Highlighters: Neon lime highlighter block behind main keyword with green triangle crop marks.
• Badges: Tilted neon lime pill stickers ("Strategy first", "Design with meaning"), target icons 🎯, and rounded footer social pill.
• Quality: Ultra-clean agency design, razor-sharp vector edges, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['graph paper', 'neon lime', 'target icon', 'tilted pill sticker', 'triangle crop marks'],
    forbiddenKeywords: ['scaffolding', 'wax seal', 'plastic basket', 'starburst blob'],
  },

  // Style 6: Scaffolding Neon Billboard (c1349ae39d28db7587b0f882027f3d2b.jpg)
  'scaffolding_neon_billboard': {
    id: 'scaffolding_neon_billboard',
    referenceName: 'Scaffolding Neon Lime Billboard',
    referencePath: 'carousel_references/insta_downloads_style/c1349ae39d28db7587b0f882027f3d2b.jpg',
    visualGenre: 'Architectural Outdoor Scaffolding Billboard',
    backgroundDescription: 'Metal industrial construction scaffolding frame mounted against a historic European stone building facade under natural daylight.',
    headerNavigationStyle: 'Massive hand-drawn brutalist condensed black display typography filling the vertical banner ("THERE IS NO NEW NORMAL").',
    typographySystem: 'Hand-drawn condensed brutalist typography in heavy black ink, paired with bold geometric footer text ("TRANSFORM 21-22").',
    colorPalette: {
      background: '#84CC16 vivid neon lime-green billboard banner',
      text: '#000000 heavy black display ink',
      highlighters: ['#84CC16 neon lime', '#A3E635 chartreuse'],
      badges: ['Industrial metal spotlights mounted on scaffolding poles', 'Explanatory festival metadata block at base'],
    },
    stickerAndDecalStyle: 'Industrial scaffolding metal grid tubes, clamps, mounting spotlights, and architectural stonework.',
    cinemaLightingStack: 'Authentic outdoor natural sunlight, crisp metal scaffolding shadows, 50mm architectural perspective, 35mm film grain.',
    corePromptTemplate: `Use this image as reference to create an architectural billboard poster in the exact same visual style:
• Scene: Giant vertical neon lime-green billboard banner (#84CC16) mounted on industrial metal construction scaffolding in front of a classical stone building.
• Typography: Massive hand-drawn brutalist condensed black typography filling the banner.
• Footer: Bold black headline "TRANSFORM 21-22" and small editorial paragraph text at the base of the banner.
• Lighting & Detail: Natural sunlight, metal spotlights on scaffolding, crisp architectural depth, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['neon lime billboard', 'metal scaffolding', 'brutalist typography', 'outdoor architecture'],
    forbiddenKeywords: ['graph paper', 'wax seal', 'cherries', 'plastic basket'],
  },

  // Style 7: Blue Laundry Basket & Graph Notebook (dc60fad891d9e74d7cf10d10fdb79ee5.jpg)
  'blue_basket_notebook_sheet': {
    id: 'blue_basket_notebook_sheet',
    referenceName: 'Blue Laundry Basket & Graph Notebook Sheet',
    referencePath: 'carousel_references/insta_downloads_style/dc60fad891d9e74d7cf10d10fdb79ee5.jpg',
    visualGenre: 'Top-Down Physical Everyday Object Collage',
    backgroundDescription: 'Top-down photographic view looking into a vibrant cobalt-blue plastic grid laundry/storage crate basket.',
    headerNavigationStyle: 'Top-left logo "VOIX STUDIO" on 3-hole punched graph notebook sheet.',
    typographySystem: 'Heavy cut-paper grotesque uppercase sans-serif in charcoal black ("BRANDING IS NOT ONE SIZE-FITS-ALL") paired with blue handwritten script.',
    colorPalette: {
      background: '#2563EB vibrant cobalt-blue plastic grid basket & #FFFFFF white graph paper sheet',
      text: '#1F2937 charcoal black and #1D4ED8 blue handwritten ink',
      highlighters: ['#FB923C orange/red speech bubble outline', '#C084FC purple speech bubble interior'],
      badges: ['Tilted speech bubble sticker ("Your brand matters!!!")', '3-hole punch holes on notebook sheet'],
    },
    stickerAndDecalStyle: '3-hole punched lined graph paper, tilted orange-and-purple speech bubble sticker, and handwritten blue pen notes.',
    cinemaLightingStack: 'Direct top-down physical flatlay photography, natural soft plastic shadows inside basket grid, tactile paper grain.',
    corePromptTemplate: `Use this image as reference to create a flatlay graphic carousel slide in the exact same visual style:
• Composition: Top-down photographic perspective looking into a vibrant cobalt-blue plastic grid basket.
• Center Object: A white 3-hole punched graph notebook page resting inside the basket.
• Typography: Bold cut-paper grotesque uppercase sans-serif headline, and handwritten blue ink script at the bottom.
• Sticker: Tilted orange/purple speech bubble sticker ("Your brand matters!!!").
• Quality: Tactile physical photography, razor-sharp paper grid texture, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['blue plastic basket', 'graph notebook sheet', '3-hole punch', 'cut-paper typography', 'speech bubble'],
    forbiddenKeywords: ['scaffolding', 'wax seal', 'starburst blob', 'concrete sculpture'],
  },

  // Style 8: Editorial Cinematic Photo-Narrative Storytelling (Downloads/story)
  'editorial_photo_storytelling': {
    id: 'editorial_photo_storytelling',
    referenceName: 'Editorial Cinematic Photo-Narrative Storytelling',
    referencePath: 'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan.jpg',
    visualGenre: 'Cinematic High-Aesthetic Photo Narrative / Storytelling',
    backgroundDescription: 'Full-bleed high-aesthetic cinematic photography with natural lighting, rich textures (retro striped resort umbrellas, misty rain-streaked window, luxury bathrobe, crocodile leather briefcase, brown cowhide fur, warm amber window city reflections), and 35mm film grain.',
    headerNavigationStyle: 'Clean negative space framing with pure white (#FFFFFF) typography placed directly over the cinematic photograph.',
    typographySystem: 'Hybrid Storytelling Typography: Massive stacked luxury editorial serif (Didot/Ogg/GT Super) with tight leading for punchline thesis statements, paired with clean, crisp, modern white grotesque sans-serif (Inter/Archivo) for narrative storytelling paragraphs.',
    colorPalette: {
      background: 'Full-bleed cinematic color photography (warm terracotta, deep subway teal, emerald green newspaper, bronze rain coat, amber glow)',
      text: '#FFFFFF pure crisp white',
      highlighters: ['Crisp white contrast overlay', 'Natural depth plane separation'],
      badges: ['Zero artificial stickers or badges', 'Pure cinematic narrative clarity'],
    },
    stickerAndDecalStyle: 'Zero artificial stickers or badges. Clean unadorned cinematic photography with pure white typography floating in atmospheric negative space.',
    cinemaLightingStack: '35mm prime cinematic capture, natural volumetric light, authentic rich tactile material textures, organic shallow depth of field, subtle film grain.',
  },

  // Style 9: Ciel Auteur Cinematic Storytelling (Vogue / Prada / Jacquemus / Balenciaga Campaign Standard)
  'ciel_cinematic_storytelling': {
    id: 'ciel_cinematic_storytelling',
    referenceName: 'Ciel Auteur High-Fashion Storytelling',
    referencePath: 'carousel_references/story_photo_narrative/Nobody remembers your founding story.They remember the transformation they got to be part of.Wan.jpg',
    visualGenre: 'Auteur High-Fashion Photographic Storytelling (Vogue / Prada / Jacquemus Standard)',
    backgroundDescription: 'Full-bleed 4:5 authentic 35mm / medium-format Hasselblad high-fashion editorial campaigns: cantilevered travertine platforms over mist-shrouded fjords, monolithic chrome mirrors on Mediterranean salt flats, minimalist brutalist glass pavilions, vast concrete hangars with cinematic spotlight shafts, black Portoro marble with golden veins, and architectural rooftop pavilions at dusk. ZERO domestic clutter, ZERO generic desks, ZERO reused fur textures.',
    headerNavigationStyle: 'Pure editorial minimalism: Zero fake UI frames, zero stickers, zero box containers. Discrete white architectural metadata stamps floating naturally over negative space.',
    typographySystem: 'Playfair Display + Lato High-Fashion Narrative Hierarchy:\n• Slide 1 (Hook): Mixed typography with bold serif ("Your brand") + delicate italic ("needs to tell") + massive bold punch ("a STORY.") with discrete metadata.\n• Slides 2, 3, 4: Clean, modern white Lato sans-serif with bold/italic emphasis placed top-left or bottom-right with natural editorial rhythm.\n• Slide 5 (Tension): High-contrast white typography resolving into a massive Playfair Display serif punchline.\n• Slide 6 (Climax): Massive stacked Playfair Display serif headline centered over monumental architectural texture (Portoro marble / brushed aluminum).\n• Slide 7 (CTA): Minimalist 2-line white call-to-action on rooftop runway setting.',
    colorPalette: {
      background: 'Abyss Black (#0A0A0C), travertine ivory, brushed sterling silver, golden sunrise rim light, deep Portoro marble, and dusk slate',
      text: '#FFFFFF pure crisp white text overlay',
      highlighters: ['Natural photographic chiaroscuro negative space contrast', 'High-contrast Playfair serif punchlines'],
      badges: ['Discrete technical metadata stamps (e.g. "// 01 · CIEL NARRATIVE CORE", "[DISCOVERY · 2026]")'],
    },
    stickerAndDecalStyle: 'Zero stickers, zero clip art, zero geometric blobs. Pure haute-couture fashion authority where the scene, light, and architecture carry the prestige.',
    cinemaLightingStack: 'Authentic 35mm film grain, Hasselblad prime optical falloff, chiaroscuro shadow wells (#0A0A0C), raking golden rim light, atmospheric mist.',
    corePromptTemplate: `Use this reference image to create a high-fashion editorial campaign slide (Vogue / Prada / Jacquemus standard):
• High-Fashion Art Direction: Complete unique setting and camera angle (18mm low-angle worm's-eye, steep Dutch tilt, monumental brutalist architecture, or Mediterranean surrealism).
• Physical Materiality: Sculpted travertine marble, knurled sterling silver, molten crystal glass caustics, Portoro marble, or tailored cocoon silhouette.
• Typography: Dynamic Playfair Display + Lato multi-weight typography in pure crisp white (#FFFFFF) placed directly over photographic negative space.
• Banned Clichés: Zero cluttered desks, zero generic coffee mugs, zero reused cowhide fur, zero generic domestic couches.
• Quality: 35mm film capture, ultra-sharp typography, 4:5 vertical portrait (1080x1350).`,
    requiredKeywords: ['high-fashion editorial', 'vogue campaign standard', '35mm film', 'playfair display', 'lato', 'full-bleed photo', 'white typography', 'chiaroscuro'],
    forbiddenKeywords: ['cluttered desk', 'coffee mug', 'reused fur', 'cowhide texture', 'generic couch', 'graph paper', 'stickers', 'wax seal', 'neon lime badge', 'starburst blob', 'plastic sheen', 'cgi 3d', 'container box', 'fake hud'],
  },

  // Style 8: Biotech Luxury & 0.5px HUD Data Graphs (From Klickpin.com- 866802259548952733)
  'biotech_hud_luxury': {
    id: 'biotech_hud_luxury',
    referenceName: 'Biotech Luxury & HUD Data Overlays',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 866802259548952733-pin-id-866802259548952733.jpg',
    visualGenre: 'Clinical Biotech Luxury & Fine-Line HUD Graphs',
    backgroundDescription: 'Clean macro skin textures (sun freckles, collarbone, water ripples) and gradient green-to-deep-blue atmospheric studio backdrops.',
    headerNavigationStyle: 'Minimalist top brand logo ("BioSource Health") with clean left-aligned typography.',
    typographySystem: 'High-contrast editorial serif headlines ("Benefits That Build You", "it\'s a biological necessity.") paired with 0.5px Swiss technical sans-serif data labels.',
    colorPalette: {
      background: '#0D2824 deep forest sage to #0F172A slate navy',
      text: '#FFFFFF pure crisp white',
      highlighters: ['#10B981 emerald dot nodes', '#38BDF8 sky blue concentric circles'],
      badges: ['Frosted data pills with connected vector lines ("14-hour wearable delivery system", "400mg NAD+")'],
    },
    stickerAndDecalStyle: 'Fine 0.5px vector line HUD charts: concentric circle progression maps, constellation dot graphs, multi-ring Venn diagrams, and sculpted matte black wearable patches.',
    cinemaLightingStack: 'Macro skin photography, fine caustics, soft atmospheric rim light, razor-sharp vector line overlays.',
    corePromptTemplate: `Use this reference image to create a clinical luxury biotech carousel slide:
• Background & Texture: Macro photography of sun-freckled skin or clear water ripples with soft sage/navy studio lighting.
• HUD Data Overlay: Delicate 0.5px white vector line graphs, concentric progression circles, and constellation dot data nodes.
• Typography: Elegant high-fashion serif headline paired with clean technical Swiss sans-serif data labels.
• Quality: High-end biotech aesthetic, razor-sharp vector HUD graphics, 4:5 vertical portrait.`,
    requiredKeywords: ['skin macro', 'HUD lines', 'concentric circles', 'biotech luxury', 'serif headline'],
    forbiddenKeywords: ['scaffolding', 'streetwear decals', 'comic stickers', 'chalkboard'],
  },

  // Style 9: Cosmic Aura Gradient & Black Brushstroke (From Klickpin.com- 339669996918299359)
  'cosmic_aura_brushstroke': {
    id: 'cosmic_aura_brushstroke',
    referenceName: 'Cosmic Aura Gradient & Dynamic Brushstroke',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 339669996918299359-pin-id-339669996918299359.jpg',
    visualGenre: 'Modern Cosmic Aura & Expressive Calligraphic Slash',
    backgroundDescription: 'Alternating between glowing ember dusk horizons with black dunes and clean off-white canvases with warm amber-orange Gaussian light leaks.',
    headerNavigationStyle: 'Small discrete author watermark on top-left with fine diagonal corner arrow on top-right.',
    typographySystem: 'Modern high-contrast grotesque sans-serif with tight leading and em-dashes ("Motivation fades fast — it\'s just a feeling.").',
    colorPalette: {
      background: '#FFFFFF crisp white with #FB923C amber aura glow and #0A0A0C obsidian black',
      text: '#FFFFFF on dark slides / #0A0A0C on white slides',
      highlighters: ['#F97316 warm sunset orange', '#EF4444 ember red'],
      badges: ['Translucent glassmorphic pill button ("why? ➔")'],
    },
    stickerAndDecalStyle: 'Thick energetic black calligraphic brushstroke slash cutting dynamically across white slides; glassmorphic pill buttons.',
    cinemaLightingStack: 'Sci-fi atmospheric sunset lighting, deep obsidian blacks, warm Gaussian aura blooms.',
    corePromptTemplate: `Use this reference image to create an aura gradient graphic slide:
• Background: Clean white canvas with warm amber-orange Gaussian light leaks and chromatic heatmaps.
• Graphic Slash: Dynamic thick black calligraphic brushstroke line cutting across the negative space.
• Typography: Modern geometric grotesque sans-serif with tight line-height.
• Interactive Element: Glassmorphic translucent pill button with orange arrow.
• Quality: High-contrast modern graphic design, razor-sharp typography, 4:5 vertical portrait.`,
    requiredKeywords: ['aura gradient', 'brushstroke slash', 'glassmorphic pill', 'amber glow'],
    forbiddenKeywords: ['scaffolding', 'plastic basket', 'graffiti wall'],
  },

  // Style 10: Glassmorphic Folder Tab & Motion-Blur Agency (From Klickpin.com- 1142014418039789176)
  'glassmorphism_motion_agency': {
    id: 'glassmorphism_motion_agency',
    referenceName: 'Glassmorphic Folder Tabs & Motion Agency',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 1142014418039789176-pin-id-1142014418039789176.jpg',
    visualGenre: 'Futuristic Digital Agency & Glassmorphic UI',
    backgroundDescription: 'Moody twilight slate blue and fiery gradient backgrounds with surreal portals and natural textures.',
    headerNavigationStyle: 'Top discrete branding: "VISUAL DIGITAL AGENCY" with micro-line coordinate stamps.',
    typographySystem: 'Clean modern uppercase grotesque sans-serif ("OPEN NEW DOORS.", "DIGITAL MARKETING ISN\'T JUST POSTING").',
    colorPalette: {
      background: '#1E293B slate dusk and #EA580C glowing ember orange',
      text: '#FFFFFF pure white',
      highlighters: ['#F97316 glowing fiery orange', '#38BDF8 icy cyan'],
      badges: ['Frosted glassmorphic acrylic folder tab cards with soft drop shadows'],
    },
    stickerAndDecalStyle: 'Translucent frosted acrylic folder tab overlays, speed trail motion blur streaks across faces, open door surreal portals, circular radial target auras.',
    cinemaLightingStack: 'High-speed shutter motion blur, cinematic studio rim lighting, frosted acrylic refraction.',
    corePromptTemplate: `Use this reference image to create a futuristic digital agency slide:
• Visual Hero: Model portrait with high-speed horizontal motion blur streak or surreal glowing open doorway in twilight landscape.
• UI Elements: Floating translucent frosted glass acrylic folder tab cards with crisp white sans-serif typography.
• Typography: Bold modern uppercase sans-serif with tight line-height.
• Quality: High-end agency art direction, razor-sharp acrylic glass refraction, 4:5 vertical portrait.`,
    requiredKeywords: ['motion blur', 'frosted glass folder', 'agency aesthetic', 'portal doorway'],
    forbiddenKeywords: ['chalkboard', 'comic sticker', 'plastic basket'],
  },

  // Style 11: Acid Chartreuse & Obsidian Geometry (From Klickpin.com- 381539399694899133)
  'acid_geometric_branding': {
    id: 'acid_geometric_branding',
    referenceName: 'Acid Chartreuse & Obsidian Geometric Profile',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 381539399694899133-pin-id-381539399694899133.jpg',
    visualGenre: 'Acid Modernist Brand Strategy & Geometric Contrast',
    backgroundDescription: 'High-contrast split between deep obsidian black voids (#0A0A0C) and electric acid chartreuse lime (#A3E635).',
    headerNavigationStyle: 'Top brand tag "@juju.branding" with swipe indicator cards.',
    typographySystem: 'Heavy condensed grotesque sans-serif in high-contrast white and black.',
    colorPalette: {
      background: '#0A0A0C deep obsidian black and #A3E635 electric acid lime',
      text: '#FFFFFF on black / #0A0A0C on lime',
      highlighters: ['#A3E635 electric lime', '#22C55E vivid green'],
      badges: ['Curved organic wave cutouts, 3D white mannequin busts, layered concrete 3D question marks, concentric tunnel voids'],
    },
    stickerAndDecalStyle: 'Surrealist 3D props: white mannequin bust rising from lime circle, concentric 3D tunnel void, layered concrete sculptures, speech bubble overlays, glowing keyhole portals.',
    cinemaLightingStack: 'Flat 2D graphic vectors colliding with 3D studio architectural sculptures and keyhole rim light.',
    corePromptTemplate: `Use this reference image to create a high-contrast acid chartreuse & obsidian brand slide:
• Palette: Deep obsidian black (#0A0A0C) contrasting sharply with electric acid lime (#A3E635).
• Central Element: Surreal 3D sculpture (white mannequin bust, architectural concrete question mark, concentric tunnel void, or glowing keyhole portal).
• Typography: Bold modern grotesque sans-serif with tight leading.
• Quality: Striking graphic contrast, razor-sharp geometric lines, 4:5 vertical portrait.`,
    requiredKeywords: ['acid lime', 'obsidian black', 'mannequin bust', 'concentric tunnel', 'geometric branding'],
    forbiddenKeywords: ['pastel pink', 'scaffolding', 'plastic basket'],
  },

  // Style 12: Editorial AI Commercial Fashion (From Klickpin.com- 462252349281621380)
  'editorial_ai_commercials': {
    id: 'editorial_ai_commercials',
    referenceName: 'Editorial AI Fashion Shoots & Monolithic Type',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 462252349281621380-pin-id-462252349281621380.jpg',
    visualGenre: 'High-Fashion Commercial Campaign & Mixed Typography',
    backgroundDescription: 'Warm terracotta clay tones, open sunny cobalt sky, and desert landscapes with architectural furniture.',
    headerNavigationStyle: 'Top discrete label: "MOBILE EDITING CLUB" in crisp white sans-serif.',
    typographySystem: 'Massive bold condensed white sans ("Generate", "Claude", "Nano Banana Hacks") overlapping tightly with elegant high-fashion italic serif ("AI Product Shoots", "for Brands").',
    colorPalette: {
      background: '#C2593F terracotta clay, #38BDF8 bright sky, and #E2E8F0 sand',
      text: '#FFFFFF pure crisp white',
      highlighters: ['#EA580C warm clay', '#F59E0B golden amber'],
      badges: ['Rounded white pill tags ("GENERATE SHOOTS WITH AI", "HIGHEST ROI WORKFLOWS ➔")'],
    },
    stickerAndDecalStyle: 'Oversized physical commercial products held by models (giant terracotta can, gold electric toothbrush, leather phone case, low-angle sneaker kick).',
    cinemaLightingStack: 'Bright directional commercial studio sun, sharp natural shadows, rich skin tones, authentic texture.',
    corePromptTemplate: `Use this reference image to create a high-fashion commercial campaign slide:
• Scene & Staging: Stylish fashion model holding an oversized luxury branded product (terracotta drink can, sleek tech device, or low-angle sneaker sole) under open bright sky.
• Typography Layering: Massive bold condensed white sans headline overlapping with high-fashion italic serif subheaders.
• Pill Badge: Rounded white pill tag with directional arrow at bottom.
• Quality: High-end fashion commercial photography, razor-sharp typography overlap, 4:5 vertical portrait.`,
    requiredKeywords: ['terracotta', 'oversized product', 'italic serif overlap', 'commercial fashion', 'pill badge'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'dark comic'],
  },

  // Style 13: Urban POV Notes App & Censored Pixel Face (From Klickpin.com- 799389002652197521)
  'urban_pov_notes_censor': {
    id: 'urban_pov_notes_censor',
    referenceName: 'Urban Street POV & Censored Notes App',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 799389002652197521-pin-id-799389002652197521.jpg',
    visualGenre: 'Raw Urban Fashion POV & Digital App Mockup',
    backgroundDescription: 'Moody London asphalt street with yellow road lines and retro storefronts.',
    headerNavigationStyle: 'Authentic Apple Notes app top bar inside the phone screen: "< Back", timestamp, share icons.',
    typographySystem: 'Apple system font inside the Dark Mode Notes app screen on the phone.',
    colorPalette: {
      background: '#27272A asphalt dark grey, #78350F striped knit brown, #DC2626 red manicure',
      text: '#FFFFFF pure white text on dark phone screen',
      highlighters: ['#EF4444 red nail polish accent', '#F59E0B yellow curb lines'],
      badges: ['Digital mosaic pixelation censor box over face and luxury handbag'],
    },
    stickerAndDecalStyle: 'Digital mosaic pixel blur over model\'s face and bag; real landscape iPhone held directly into the camera displaying Dark Mode Notes app.',
    cinemaLightingStack: 'Natural overcast daylight, gritty film grain, authentic street depth.',
    corePromptTemplate: `Use this reference image to create an urban streetwear POV slide:
• Staging: Fashion model on asphalt street holding an iPhone horizontally towards camera.
• Phone Screen: Exact Dark Mode Apple Notes app interface with statement headline in white.
• Censor Effect: Authentic pixelated mosaic blur covering the model's face and luxury handbag.
• Quality: Gritty candid fashion photography, razor-sharp digital phone screen, 4:5 vertical portrait.`,
    requiredKeywords: ['notes app', 'pixelated face blur', 'urban street POV', 'horizontal iPhone'],
    forbiddenKeywords: ['graph grid', 'scaffolding', '3D balloon'],
  },

  // Style 14: Inflatable Foil 3D Letter Balloons (From Klickpin.com- 970525788475403918)
  'inflatable_foil_balloons': {
    id: 'inflatable_foil_balloons',
    referenceName: 'Inflatable Foil 3D Letter Balloons in Elevator',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 970525788475403918-pin-id-970525788475403918.jpg',
    visualGenre: 'Surrealist 3D Physical Installation & Mirror Selfie',
    backgroundDescription: 'Compact metallic elevator / studio interior with overhead lighting.',
    headerNavigationStyle: 'Top brand label: "Nano Banana Pro" in bold white sans-serif.',
    typographySystem: 'Lower-third prompt overlay: bold white "PROMPT" with full detailed technical prompt paragraph in clean monospace text.',
    colorPalette: {
      background: '#64748B steel elevator grey and #FACC15 bright glossy yellow',
      text: '#FFFFFF crisp white prompt text',
      highlighters: ['#FACC15 glossy yellow foil reflections'],
      badges: ['Lower third semi-transparent prompt breakdown container'],
    },
    stickerAndDecalStyle: 'Gigantic 3D glossy inflatable foil letter balloons jammed tightly into the elevator, deforming against ceiling and walls with realistic seams and creases.',
    cinemaLightingStack: 'Realistic interior elevator lighting with intense specular foil highlights.',
    corePromptTemplate: `Use this reference image to create an inflatable 3D foil balloon installation slide:
• Staging: Mirror selfie in compact elevator jammed completely full of gigantic glossy yellow inflatable foil letter balloons.
• Balloon Physics: Balloons pressing and deforming realistically against walls and ceiling with visible seams and folds.
• Typography: Bold white "PROMPT" headline with structured prompt breakdown text overlay on bottom-left.
• Quality: Hyper-realistic 3D foil reflections, clean typography, 4:5 vertical portrait.`,
    requiredKeywords: ['inflatable foil letters', 'elevator selfie', 'yellow foil balloons', 'prompt breakdown'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'cowhide'],
  },

  // Style 15: Fisheye 0.5x Tech Commercial (From Klickpin.com- 725501821271696137)
  'fisheye_tech_commercial': {
    id: 'fisheye_tech_commercial',
    referenceName: 'Fisheye 0.5x Distortion Tech Commercial',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 725501821271696137-pin-id-725501821271696137.jpg',
    visualGenre: '0.5x Ultra-Wide Fisheye Commercial Tech Campaign',
    backgroundDescription: 'Pure clean high-key white studio background with soft floor contact shadows.',
    headerNavigationStyle: 'Top brand header: "janado" + massive full-width bold sans "BLACK WEEKS".',
    typographySystem: 'Massive full-bleed bold condensed sans-serif header spanning the entire width of the frame.',
    colorPalette: {
      background: '#FFFFFF pure white studio',
      text: '#000000 pure black',
      highlighters: ['#FACC15 bright yellow circular badge', '#EC4899 magenta tracksuit', '#3B82F6 cobalt blue suit'],
      badges: ['Bright yellow circular sticker with rotated repeating text ("SALE. SALE. SALE. SALE.")'],
    },
    stickerAndDecalStyle: 'Rotating circular sale badges; gadgets held in enormous distorted perspective right into the camera lens.',
    cinemaLightingStack: 'Ultra-wide 0.5x fisheye lens distortion, bright even commercial studio strobe lighting.',
    corePromptTemplate: `Use this reference image to create a fisheye commercial tech slide:
• Camera & Lens: Extreme 0.5x fisheye perspective with model\'s hand holding a tech gadget (phone, watch, laptop) pushed giant into the camera lens.
• Background: Clean high-key white studio background with soft natural shadow.
• Typography & Badges: Massive bold black "BLACK WEEKS" header on top, bright yellow circular "SALE. SALE." badge.
• Quality: High-energy commercial photography, razor-sharp product details, 4:5 vertical portrait.`,
    requiredKeywords: ['fisheye 0.5x', 'distorted perspective', 'yellow sale sticker', 'white studio background'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'dark mood'],
  },

  // Style 16: Gen-Z Editorial Narrative Conflict (From Klickpin.com- 1121959326084814209)
  'genz_editorial_narrative': {
    id: 'genz_editorial_narrative',
    referenceName: 'Gen-Z High-Fashion Conflict & Editorial Staging',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 1121959326084814209-pin-id-1121959326084814209.jpg',
    visualGenre: 'Gen-Z High-Fashion Editorial Narrative & Conflict Staging',
    backgroundDescription: 'Minimalist warm studio grey/off-white background with cinematic group staging.',
    headerNavigationStyle: 'Small discrete 3D cube badge ("Ctrl plusZ") with corner directional arrows.',
    typographySystem: 'Clean modern sans-serif with glowing red Gaussian blur accents ("Pause. What if the goal isn\'t to win") and sharp white narrative punchlines.',
    colorPalette: {
      background: '#E5E5E5 studio light grey',
      text: '#FFFFFF pure white and #0A0A0C obsidian black',
      highlighters: ['#EF4444 glowing red neon blur', '#DC2626 crimson dot pointers'],
      badges: ['3D black cube logo badge', 'Red circular pin markers ("• Different backgrounds", "• Same direction")'],
    },
    stickerAndDecalStyle: 'Dynamic physical group interaction: models in tailored pinstripe suits pulling neckties, group sprinting in streetwear, close-up macro hand-clasps.',
    cinemaLightingStack: 'High-fashion directional strobe, crisp shadows, sharp fabric weave detail.',
    corePromptTemplate: `Use this reference image to create a Gen-Z high-fashion editorial narrative slide:
• Staging & Fashion: Creative youth group in tailored pinstripe suits, blazers, and glasses in dynamic dramatic physical interaction.
• Typography & Effects: Clean sans-serif with glowing red Gaussian blur typography on headline words, and discrete 3D cube logo badge.
• Quality: High-fashion editorial photography, authentic motion, 4:5 vertical portrait.`,
    requiredKeywords: ['pinstripe suits', 'editorial conflict', 'glowing red text', 'cube badge', 'group staging'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'inflatable balloon'],
  },

  // Style 17: Y2K Direct Flash Nightlife Prompt (From Klickpin.com- 587719820168290710)
  'y2k_direct_flash_nightlife': {
    id: 'y2k_direct_flash_nightlife',
    referenceName: 'Y2K Direct Flash Nightlife & Cocktail Prompt',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 587719820168290710-pin-id-587719820168290710.jpg',
    visualGenre: '2000s Gritty Direct-Flash Nightlife & Prompt Overlay',
    backgroundDescription: 'Dark gritty club/afterparty interior with wet concrete floor and neon green designer plastic chairs.',
    headerNavigationStyle: 'Top discrete username: "@kseniyaIpromt" in crisp white sans-serif.',
    typographySystem: 'Lower-third prompt overlay: bold white "prompt" headline with raw monospace prompt text block.',
    colorPalette: {
      background: '#09090B pitch black club with #22C55E lime chair accents',
      text: '#FFFFFF crisp white prompt text',
      highlighters: ['#DC2626 glossy red latex glove reflections', '#22C55E lime green chairs'],
      badges: ['Lower-third prompt breakdown container block'],
    },
    stickerAndDecalStyle: 'Glossy red latex gloves, ultra-wide distorted crystal cocktail coupe glass thrust into direct camera flash, narrow black Y2K sunglasses.',
    cinemaLightingStack: 'Harsh on-camera direct flash, intense vignetting, specular highlights on wet surfaces and glass.',
    corePromptTemplate: `Use this reference image to create a Y2K direct-flash prompt breakdown slide:
• Staging: High-angle direct-flash photo of model in strapless white dress and red latex gloves holding a giant distorted cocktail glass into the lens.
• Atmosphere: Dark gritty afterparty floor with lime plastic chairs and intense camera flash reflection.
• Typography: Bold white "prompt" with technical prompt block overlay in clean monospace font.
• Quality: 2000s disposable camera direct flash aesthetic, razor-sharp glass caustics, 4:5 vertical portrait.`,
    requiredKeywords: ['direct flash', 'red latex glove', 'distorted cocktail glass', 'Y2K sunglasses', 'prompt overlay'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'cowhide texture'],
  },

  // Style 18: Monumental Art Museum Installation (From Klickpin.com- 702280135685682509)
  'monumental_museum_sculpture': {
    id: 'monumental_museum_sculpture',
    referenceName: 'Monumental Art Museum Head Sculpture',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 702280135685682509-pin-id-702280135685682509.jpg',
    visualGenre: 'Monumental Contemporary Art Installation & Scale Juxtaposition',
    backgroundDescription: 'Vast soaring contemporary art museum gallery with high white walls, linear strip lighting, and polished concrete floors.',
    headerNavigationStyle: 'Zero fake UI; real physical 3D embroidered lettering on the sculpture\'s hat.',
    typographySystem: 'Real physical 3D white embroidered block letters on the navy corduroy cap: "SHIT HAPPENS" / "CREATE OR DIE".',
    colorPalette: {
      background: '#FFFFFF gallery white and #E2E8F0 polished concrete grey',
      text: '#FFFFFF 3D embroidered text',
      highlighters: ['#1E3A8A navy blue corduroy cap', '#F59E0B ambient gallery tones'],
      badges: ['Gallery safety stanchion rope perimeter around pedestal'],
    },
    stickerAndDecalStyle: 'Three-story tall hyper-realistic human head sculpture on an exhibition plinth wearing a navy corduroy trucker hat; realistic gallery visitors walking around.',
    cinemaLightingStack: 'Architectural gallery daylight and linear ceiling diffuse LED strip lights, soft realistic floor contact shadows.',
    corePromptTemplate: `Use this reference image to create a monumental art museum installation slide:
• Scene & Staging: Gigantic 3-story tall hyper-realistic human head sculpture on a gallery plinth inside a soaring contemporary museum.
• Hero Detail: The monumental head wears a navy corduroy trucker hat with bold white 3D embroidered lettering.
• Scale Context: Tiny gallery visitors, safety stanchions, and framed wall art in the background establishing colossal scale.
• Quality: Hyper-realistic architectural photography, fine texture, 4:5 vertical portrait.`,
    requiredKeywords: ['monumental sculpture', 'art museum gallery', 'trucker hat embroidery', 'scale juxtaposition'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'notes app'],
  },

  // Style 19: Surrealist Doppelgänger Scale & Scribble Meme (From Klickpin.com- 1150106823621116617)
  'surreal_doppelganger_scale': {
    id: 'surreal_doppelganger_scale',
    referenceName: 'Surrealist Doppelgänger Scale & Scribble Typography',
    referencePath: 'carousel_references/insta_downloads_style/From Klickpin.com- 1150106823621116617-pin-id-1150106823621116617.jpg',
    visualGenre: 'Surrealist Physical Doppelgänger & Hand-Drawn Scribble Poster',
    backgroundDescription: 'Clean studio warm ivory/beige seamless backdrop with natural contact shadow.',
    headerNavigationStyle: 'Playful hand-drawn marker header: "QUE LOCURA / PENSANDO SOBRE MI CABEZA".',
    typographySystem: 'Massive energetic hand-drawn black pen scribble word "CRAZY" across the background + circular warped stamp "IDEAS FRESH".',
    colorPalette: {
      background: '#F5F2EB warm ivory beige',
      text: '#0A0A0C pure black ink marker and pen scribbles',
      highlighters: ['#FACC15 vibrant yellow-tinted sunglasses lenses', '#3B82F6 denim blue jeans'],
      badges: ['Circular warped rubber stamp logo ("IDEAS FRESH") on bottom-left'],
    },
    stickerAndDecalStyle: 'Young creator in yellow sunglasses sitting on top of his own giant disembodied head on the studio floor; energetic pen scribbles in background.',
    cinemaLightingStack: 'Clean studio softbox lighting, authentic skin texture, playful hand-drawn overlay graphics.',
    corePromptTemplate: `Use this reference image to create a surrealist doppelganger graphic slide:
• Staging: Young creator with yellow-tinted sunglasses sitting nonchalantly on top of his own giant disembodied head on a studio floor.
• Typography: Hand-drawn marker title at top and massive black pen scribble "CRAZY" lettering across the background.
• Stamp: Warped circular black logo stamp on bottom-left.
• Quality: Surrealist creative direction, razor-sharp hand-drawn graphic overlays, 4:5 vertical portrait.`,
    requiredKeywords: ['doppelganger scale', 'yellow sunglasses', 'scribble typography', 'sitting on head', 'ivory backdrop'],
    forbiddenKeywords: ['graph grid', 'scaffolding', 'dark mood'],
  },
};

// Aliases for compatibility
export const LEGACY_STYLE_ALIASES: Record<string, string> = {
  'editorial_luxury_split': 'stepped_pixel_acid_poster',
  'brutalist_photostat': 'green_amoeba_museum_poster',
  'monolithic_sculpture': 'brand_agency_graph_paper',
  'retro_magazine_collage': 'scaffolding_neon_billboard',
  'holographic_chrome_liquid': 'blue_basket_notebook_sheet',
};

/**
 * Returns all available reference style keys.
 */
export function listAvailableReferenceStyles(): string[] {
  return Object.keys(REFERENCE_DECONSTRUCTION_REGISTRY);
}

/**
 * Gets a deconstructed style specification by key.
 */
export function getDeconstructedReference(styleKey: string): DeconstructedReferenceStyle {
  const resolvedKey = LEGACY_STYLE_ALIASES[styleKey] || styleKey;
  const style = REFERENCE_DECONSTRUCTION_REGISTRY[resolvedKey];
  if (!style) {
    console.warn(`⚠️ Reference style "${styleKey}" not found. Defaulting to "stepped_pixel_acid_poster".`);
    return REFERENCE_DECONSTRUCTION_REGISTRY['stepped_pixel_acid_poster']!;
  }
  return style;
}

/**
 * Selects the next style in rotation.
 */
export function getNextRotatingReferenceStyle(usedStyleKeys: string[]): DeconstructedReferenceStyle {
  const allKeys = Object.keys(REFERENCE_DECONSTRUCTION_REGISTRY);
  const available = allKeys.filter((k) => !usedStyleKeys.includes(k));
  const pool = available.length > 0 ? available : allKeys;

  // Attempt to load styleWeights from carousel_automation_state.json
  let styleWeights: Record<string, number> = {};
  try {
    const p = path.resolve(process.cwd(), 'carousel_automation_state.json');
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      styleWeights = raw.styleWeights || {};
    }
  } catch {}

  // Sort pool by weight descending (default weight = 1.0)
  pool.sort((a, b) => {
    const wA = styleWeights[a] !== undefined ? styleWeights[a]! : 1.0;
    const wB = styleWeights[b] !== undefined ? styleWeights[b]! : 1.0;
    return wB - wA;
  });

  const chosenKey = pool[0]!;
  return REFERENCE_DECONSTRUCTION_REGISTRY[chosenKey]!;
}
