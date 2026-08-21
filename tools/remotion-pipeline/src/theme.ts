import { loadFont as loadBungee } from "@remotion/google-fonts/Bungee";
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: bungeeFont } = loadBungee("normal", {
  weights: ["400"],
});

const { fontFamily: syneFont } = loadSyne("normal", {
  weights: ["800"],
});

const { fontFamily: jetBrainsMonoFont } = loadJetBrainsMono("normal", {
  weights: ["700"],
});

export const theme = {
  colors: {
    bgCanvas: "#05060A",
    bgCardSolid: "#0F131D",
    cardBg: "#0F131D",
    electricCyan: "#00F0FF",
    neonPink: "#FF007A",
    neonMagenta: "#FF007A",
    acidYellow: "#FFE600",
    pureWhite: "#FFFFFF",
    textPrimary: "#FFFFFF",
    textDisplay: "#FFFFFF",
    textMuted: "#8E8E96",
    primaryAccent: "#00F0FF",
    secondaryAccent: "#FF007A",
    highlight: "#FFE600",
    terminalHeader: "#1A1F2C",
    cardBorder: "rgba(0, 240, 255, 0.4)",
    glassShadow: "0 20px 60px rgba(0, 240, 255, 0.35)",
  },
  fonts: {
    explosive: `${bungeeFont}, sans-serif`,
    display: `${syneFont}, sans-serif`,
    heading: `${syneFont}, sans-serif`,
    mono: `${jetBrainsMonoFont}, monospace`,
  },
  springs: {
    snappy: { damping: 9, mass: 0.3, stiffness: 280 },
    wobbly: { damping: 6, mass: 0.35, stiffness: 320 },
    bounce: { damping: 7, mass: 0.4, stiffness: 240 },
    smooth: { damping: 14, mass: 0.8, stiffness: 120 },
  },
  tracking: {
    display: "-0.02em",
    tighter: "-0.05em",
    tight: "-0.02em",
    normal: "0em",
    wide: "0.05em",
    wider: "0.1em",
  },
};
