import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface CarouselStyleSelection {
  styleName: string;
  folderPath: string;
  referenceImages: string[];
  cycle: number;
  remainingInCycle: number;
}

export interface AutomationState {
  currentCycle: number;
  usedStyles: string[];
  lastUsedStyle: string | null;
  lastRunAt: string | null;
  history: Array<{
    timestamp: string;
    style: string;
    slideCount: number;
    bufferPostId?: string;
  }>;
}

const DEFAULT_STATE_FILE = 'carousel_automation_state.json';

export function getDefaultReferencesDir(): string {
  // Check user's Downloads/insta references folder first
  const userHome = os.homedir();
  const downloadsInstaRef = path.join(userHome, 'Downloads', 'insta references');
  if (fs.existsSync(downloadsInstaRef)) {
    return downloadsInstaRef;
  }
  return path.resolve(process.cwd(), 'carousel_references');
}

export function loadState(stateFilePath = DEFAULT_STATE_FILE): AutomationState {
  const resolvedPath = path.resolve(process.cwd(), stateFilePath);
  if (!fs.existsSync(resolvedPath)) {
    return {
      currentCycle: 1,
      usedStyles: [],
      lastUsedStyle: null,
      lastRunAt: null,
      history: [],
    };
  }
  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {
      currentCycle: 1,
      usedStyles: [],
      lastUsedStyle: null,
      lastRunAt: null,
      history: [],
    };
  }
}

export function saveState(state: AutomationState, stateFilePath = DEFAULT_STATE_FILE): void {
  const resolvedPath = path.resolve(process.cwd(), stateFilePath);
  fs.writeFileSync(resolvedPath, JSON.stringify(state, null, 2), 'utf8');
}

export function getAvailableStyleFolders(referencesDir?: string): string[] {
  const resolvedDir = referencesDir ? path.resolve(referencesDir) : getDefaultReferencesDir();
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
    return [];
  }

  const entries = fs.readdirSync(resolvedDir, { withFileTypes: true });
  const subDirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  // If there are subdirectories, return them as style packs
  if (subDirs.length > 0) {
    return subDirs;
  }

  // If there are direct images in the folder, treat the root folder itself as a single style pack
  const validExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);
  const hasDirectImages = entries.some(
    (e) => e.isFile() && validExts.has(path.extname(e.name).toLowerCase())
  );

  if (hasDirectImages) {
    return ['.'];
  }

  return [];
}

export function getReferenceImagesInFolder(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) return [];
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  const validExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);

  return entries
    .filter((e) => e.isFile() && validExts.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.join(folderPath, e.name))
    .sort((a, b) => {
      // Natural alphanumeric sort so slide_01 comes before slide_02, etc.
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
}

/**
 * Selects the next style folder using round-robin rotation.
 * Ensures every style folder is used once before any folder repeats.
 */
export function selectNextStyleFolder(
  referencesDir?: string,
  stateFilePath = DEFAULT_STATE_FILE
): CarouselStyleSelection {
  const targetDir = referencesDir ? path.resolve(referencesDir) : getDefaultReferencesDir();
  const availableStyles = getAvailableStyleFolders(targetDir);

  if (availableStyles.length === 0) {
    throw new Error(
      `No style subfolders or reference images found in '${targetDir}'. Please drop your style folders or reference images there.`
    );
  }

  const state = loadState(stateFilePath);
  let unusedStyles = availableStyles.filter((s) => !state.usedStyles.includes(s));

  // If all styles have been used, start a new cycle
  let currentCycle = state.currentCycle;
  if (unusedStyles.length === 0) {
    currentCycle += 1;
    state.usedStyles = [];
    unusedStyles = [...availableStyles];
  }

  const selectedStyle = unusedStyles[0] || '.';
  const folderPath = selectedStyle === '.' ? targetDir : path.resolve(targetDir, selectedStyle);
  const referenceImages = getReferenceImagesInFolder(folderPath);

  return {
    styleName: selectedStyle === '.' ? path.basename(targetDir) : selectedStyle,
    folderPath,
    referenceImages,
    cycle: currentCycle,
    remainingInCycle: Math.max(0, unusedStyles.length - 1),
  };
}

/**
 * Records that a style was used in the state file.
 */
export function commitStyleUsage(
  styleName: string,
  slideCount: number,
  bufferPostId?: string,
  stateFilePath = DEFAULT_STATE_FILE
): void {
  const state = loadState(stateFilePath);
  if (!state.usedStyles.includes(styleName)) {
    state.usedStyles.push(styleName);
  }
  state.lastUsedStyle = styleName;
  state.lastRunAt = new Date().toISOString();
  state.history.push({
    timestamp: state.lastRunAt,
    style: styleName,
    slideCount,
    ...(bufferPostId ? { bufferPostId } : {}),
  });

  saveState(state, stateFilePath);
}
