import { executeSubagentPipeline, type PipelineExecutionOptions, type PipelineExecutionReport } from './subagent_pipeline_orchestrator.js';
import { type SingleTopicKey } from './copy_extractor.js';

export interface DayScheduleConfig {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  isStorytelling: boolean;
  topicKey: SingleTopicKey;
  referenceStyleKey: string;
  themeDescription: string;
}

/**
 * Master Publishing Schedule:
 * • 1 Photographic Narrative Post per week (Tuesday) using `ciel_cinematic_storytelling`
 * • 1 Viral Prompt Breakdown Post per week (Saturday) using `inflatable_foil_balloons` / `y2k_direct_flash_nightlife`
 * • 5 Diverse High-Converting Design Formats per week from `insta references`
 */
export const WEEKLY_SCHEDULE: Record<number, DayScheduleConfig> = {
  // Monday: 🎨 1. Auteur Cultural Moat Story
  1: {
    dayOfWeek: 1,
    dayName: 'Monday',
    isStorytelling: true,
    topicKey: 'auteur_cultural_moat_story',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '🎨 AUTEUR CULTURAL MOAT: Why Story is the Only True Commercial Moat for Luxury Brands',
  },
  // Tuesday: 📸 2. Brand Transformation Arc
  2: {
    dayOfWeek: 2,
    dayName: 'Tuesday',
    isStorytelling: true,
    topicKey: 'brand_transformation_story',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '📸 PHOTOGRAPHIC NARRATIVE: Nobody Remembers Your Founding Story, They Remember the Transformation',
  },
  // Wednesday: 🔬 3. Cinema Lighting & Negative Space
  3: {
    dayOfWeek: 3,
    dayName: 'Wednesday',
    isStorytelling: true,
    topicKey: 'visual_directing_cinema_story',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '🔬 CINEMA LIGHTING: Deep Shadow Wells & Subconscious Luxury Value Creation',
  },
  // Thursday: 🐟 4. Uncanny Luxury Juxtaposition
  4: {
    dayOfWeek: 4,
    dayName: 'Thursday',
    isStorytelling: true,
    topicKey: 'ciel_uncanny_luxury_story',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '🐟 UNCANNY JUXTAPOSITION: Placing High-Fashion Luxury in Raw Brutalist Environments',
  },
  // Friday: 📱 5. The Invisible Craft of Auteur Directors
  5: {
    dayOfWeek: 5,
    dayName: 'Friday',
    isStorytelling: true,
    topicKey: 'ciel_invisible_craft_story',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '📱 THE INVISIBLE CRAFT: Why Great Visual Directing Feels Frictionless and Unforgettable',
  },
  // Saturday: 🎈 6. The Transformation Framework
  6: {
    dayOfWeek: 6,
    dayName: 'Saturday',
    isStorytelling: true,
    topicKey: 'transformation_framework_story',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '🎈 TRANSFORMATION FRAMEWORK: The 3-Act Narrative Spine for High-Ticket Products',
  },
  // Sunday: 🍌 7. Founder Vision & Psychology
  0: {
    dayOfWeek: 0,
    dayName: 'Sunday',
    isStorytelling: true,
    topicKey: 'founder_origin_reframe',
    referenceStyleKey: 'ciel_cinematic_storytelling',
    themeDescription: '🍌 VISIONARY FOUNDER ARC: Why Great Founders Never Pitch What They Built',
  },
};

/**
 * Master 30-Day Rotational Content Calendar integrating all 20 reference styles:
 */
export const MASTER_30_DAY_CALENDAR: Array<{
  dayIndex: number;
  title: string;
  topicKey: SingleTopicKey;
  referenceStyleKey: string;
  isStorytelling: boolean;
}> = [
  { dayIndex: 1, title: 'Tactical Strategy Grid', topicKey: 'nano_banana_posters', referenceStyleKey: 'community_grid_collage', isStorytelling: false },
  { dayIndex: 2, title: 'Hero Photographic Narrative', topicKey: 'brand_transformation_story', referenceStyleKey: 'ciel_cinematic_storytelling', isStorytelling: true },
  { dayIndex: 3, title: 'Biotech Luxury & HUD Teardown', topicKey: 'higgsfield_video_directing', referenceStyleKey: 'biotech_hud_luxury', isStorytelling: false },
  { dayIndex: 4, title: '0.5x Fisheye Tech Drop', topicKey: 'automated_dm_sales', referenceStyleKey: 'fisheye_tech_commercial', isStorytelling: false },
  { dayIndex: 5, title: 'Raw Street POV & Notes App', topicKey: 'ciel_invisible_craft_story', referenceStyleKey: 'urban_pov_notes_censor', isStorytelling: false },
  { dayIndex: 6, title: 'Viral AI Foil Prompt Post', topicKey: 'ciel_uncanny_luxury_story', referenceStyleKey: 'inflatable_foil_balloons', isStorytelling: false },
  { dayIndex: 7, title: 'Physical Streetwear Decal Drop', topicKey: 'spring_physics_video', referenceStyleKey: 'street_decal_object', isStorytelling: false },
  { dayIndex: 8, title: 'Brand Agency Graph & Target Pins', topicKey: 'automated_dm_sales', referenceStyleKey: 'brand_agency_graph_paper', isStorytelling: false },
  { dayIndex: 9, title: 'Auteur Conflict & Stakes Story', topicKey: 'founder_origin_reframe', referenceStyleKey: 'ciel_cinematic_storytelling', isStorytelling: true },
  { dayIndex: 10, title: 'Acid Geometry & Obsidian Void', topicKey: 'nano_banana_posters', referenceStyleKey: 'acid_geometric_branding', isStorytelling: false },
  { dayIndex: 11, title: 'Gen-Z Pinstripe Conflict Story', topicKey: 'visual_directing_cinema_story', referenceStyleKey: 'genz_editorial_narrative', isStorytelling: false },
  { dayIndex: 12, title: 'Scaffolding Neon Billboard Banner', topicKey: 'transformation_framework_story', referenceStyleKey: 'scaffolding_neon_billboard', isStorytelling: false },
  { dayIndex: 13, title: 'Y2K Direct-Flash Nightlife Prompt', topicKey: 'ciel_uncanny_luxury_story', referenceStyleKey: 'y2k_direct_flash_nightlife', isStorytelling: false },
  { dayIndex: 14, title: 'Blue Basket Graph Notebook Sheet', topicKey: 'auteur_cultural_moat_story', referenceStyleKey: 'blue_basket_notebook_sheet', isStorytelling: false },
  { dayIndex: 15, title: 'Editorial AI Fashion Commercials', topicKey: 'nano_banana_posters', referenceStyleKey: 'editorial_ai_commercials', isStorytelling: false },
  { dayIndex: 16, title: 'The Soul of Physical Luxury Objects', topicKey: 'ciel_invisible_craft_story', referenceStyleKey: 'ciel_cinematic_storytelling', isStorytelling: true },
  { dayIndex: 17, title: 'Monumental Museum Art Installation', topicKey: 'auteur_cultural_moat_story', referenceStyleKey: 'monumental_museum_sculpture', isStorytelling: false },
  { dayIndex: 18, title: 'Swiss Acid Stepped-Polygon Cutouts', topicKey: 'higgsfield_video_directing', referenceStyleKey: 'stepped_pixel_acid_poster', isStorytelling: false },
  { dayIndex: 19, title: 'Raw Street POV & Conversion Hot Take', topicKey: 'automated_dm_sales', referenceStyleKey: 'urban_pov_notes_censor', isStorytelling: false },
  { dayIndex: 20, title: 'Chrome Liquid Fluidity Prompt Drop', topicKey: 'ciel_uncanny_luxury_story', referenceStyleKey: 'inflatable_foil_balloons', isStorytelling: false },
  { dayIndex: 21, title: 'Green Amoeba Starburst Museum Poster', topicKey: 'transformation_framework_story', referenceStyleKey: 'green_amoeba_museum_poster', isStorytelling: false },
  { dayIndex: 22, title: 'Glassmorphic Folder Tabs & Motion Blur', topicKey: 'visual_directing_cinema_story', referenceStyleKey: 'glassmorphism_motion_agency', isStorytelling: false },
  { dayIndex: 23, title: 'The Hero\'s True Dilemma Cinema Story', topicKey: 'brand_transformation_story', referenceStyleKey: 'ciel_cinematic_storytelling', isStorytelling: true },
  { dayIndex: 24, title: 'Surrealist Doppelgänger & Scribble Meme', topicKey: 'spring_physics_video', referenceStyleKey: 'surreal_doppelganger_scale', isStorytelling: false },
  { dayIndex: 25, title: 'Cosmic Aura Gradient & Black Slash', topicKey: 'nano_banana_posters', referenceStyleKey: 'cosmic_aura_brushstroke', isStorytelling: false },
  { dayIndex: 26, title: '0.5x Fisheye Creative Director Toolkit', topicKey: 'automated_dm_sales', referenceStyleKey: 'fisheye_tech_commercial', isStorytelling: false },
  { dayIndex: 27, title: 'Subway Inflatable Lettering Prompt Drop', topicKey: 'ciel_uncanny_luxury_story', referenceStyleKey: 'inflatable_foil_balloons', isStorytelling: false },
  { dayIndex: 28, title: 'Hardware Aesthetics & Streetwear Decals', topicKey: 'ciel_invisible_craft_story', referenceStyleKey: 'street_decal_object', isStorytelling: false },
  { dayIndex: 29, title: 'Tactical Strategy 30-Day Retrospective', topicKey: 'transformation_framework_story', referenceStyleKey: 'community_grid_collage', isStorytelling: false },
  { dayIndex: 30, title: 'The Defensible Moat Master Storytelling', topicKey: 'auteur_cultural_moat_story', referenceStyleKey: 'ciel_cinematic_storytelling', isStorytelling: true },
];

export function getCalendarEntryForDay(dayNumber: number) {
  const normalizedIndex = ((dayNumber - 1) % 30) + 1;
  return MASTER_30_DAY_CALENDAR.find((e) => e.dayIndex === normalizedIndex) || MASTER_30_DAY_CALENDAR[0]!;
}

export function getScheduleForDate(date: Date = new Date()): DayScheduleConfig {
  return WEEKLY_SCHEDULE[date.getDay()] || WEEKLY_SCHEDULE[1]!;
}

export async function runDailyCarouselAutomation(options: {
  topicKey?: SingleTopicKey;
  referenceStyleKey?: string;
  date?: Date;
  forceStrictBrand?: boolean;
  dynamic?: boolean;
} = {}): Promise<PipelineExecutionReport> {
  const targetDate = options.date || new Date();
  const schedule = getScheduleForDate(targetDate);
  const isDynamic = options.dynamic !== false; // Hard Rule: Default to dynamic round-robin cookbook style rotation
  const selectedTopic = !isDynamic ? (options.topicKey || schedule.topicKey) : undefined;
  const selectedStyle = !isDynamic ? (options.referenceStyleKey || schedule.referenceStyleKey) : undefined;

  console.log(`\n================================================================`);
  console.log(`📅 AUTOMATION SCHEDULER: [${schedule.dayName.toUpperCase()}]`);
  console.log(`🎯 Theme: ${schedule.themeDescription}`);
  console.log(`📖 Storytelling Slot: ${schedule.isStorytelling ? 'YES (Active Story Arc)' : 'No (Technical Breakdown)'}`);
  console.log(`🎨 Topic: ${selectedTopic || 'DYNAMIC WEIGHTED SELECTION'}`);
  console.log(`👑 Style: ${selectedStyle || 'DYNAMIC WEIGHTED SELECTION'}`);
  console.log(`================================================================\n`);

  return executeSubagentPipeline({
    topicKey: selectedTopic,
    referenceStyleKey: selectedStyle,
    ...(options.forceStrictBrand !== undefined ? { forceStrictBrand: options.forceStrictBrand } : {}),
  });
}

// Auto-run if executed directly
if (process.argv[1]?.endsWith('daily_runner.ts') || process.argv[1]?.endsWith('daily_runner.js')) {
  const forceStrict = process.argv.includes('--force-strict-brand');
  const dynamic = process.argv.includes('--dynamic');
  const topicArgIdx = process.argv.indexOf('--topic-key');
  const topicKey = topicArgIdx !== -1 ? (process.argv[topicArgIdx + 1] as SingleTopicKey) : undefined;
  const dayArgIdx = process.argv.indexOf('--day');

  let targetDate = new Date();
  if (dayArgIdx !== -1) {
    const dayName = process.argv[dayArgIdx + 1]?.toLowerCase();
    const dayMap: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
    if (dayName && dayMap[dayName] !== undefined) {
      const targetDay = dayMap[dayName]!;
      const diff = targetDay - targetDate.getDay();
      targetDate.setDate(targetDate.getDate() + diff);
    }
  }

  runDailyCarouselAutomation({
    ...(topicKey ? { topicKey } : {}),
    date: targetDate,
    forceStrictBrand: forceStrict,
    dynamic,
  })
    .then((res) => {
      console.log(`\n🎉 Carousel Automation Complete for ${getScheduleForDate(targetDate).dayName}!`);
      console.log(`📁 Prompts: ${res.promptsDir}`);
    })
    .catch((err) => {
      console.error('Daily Automation Error:', err);
      process.exit(1);
    });
}
