import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface PosterHeadlineProps {
  text: string;
  delay?: number;
  highlightWords?: string[];
  fontSize?: number;
  align?: "left" | "center" | "right";
}

export const PosterHeadline: React.FC<PosterHeadlineProps> = ({
  text,
  delay = 0,
  highlightWords = [],
  fontSize = 72,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: "0.26em",
        fontFamily: theme.fonts.display,
        fontSize: `${fontSize}px`,
        fontWeight: 800,
        letterSpacing: theme.tracking.display,
        lineHeight: 1.05,
        textAlign: align,
        padding: "0 20px",
        width: "100%",
        maxWidth: "1000px",
        zIndex: 50,
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * 2.5; // Fast 2.5 frame stagger for snappy pacing
        const spr = spring({
          frame: frame - wordDelay,
          fps,
          config: theme.springs.snappy,
        });

        const translateY = interpolate(spr, [0, 1], [45, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const scale = interpolate(spr, [0, 1], [0.82, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const isHighlight = highlightWords.some(
          (h) => word.toLowerCase().includes(h.toLowerCase())
        );

        // Highlight Gradient & Glow Color mapping
        let color = theme.colors.textDisplay;
        let glowColor = "transparent";

        if (isHighlight) {
          if (word.includes("$10,000")) {
            color = theme.colors.neonMagenta;
            glowColor = `${theme.colors.neonMagenta}66`;
          } else if (word.includes("$0")) {
            color = theme.colors.acidYellow;
            glowColor = `${theme.colors.acidYellow}66`;
          } else if (word.toLowerCase().includes("google") || word.toLowerCase().includes("omni")) {
            color = theme.colors.electricCyan;
            glowColor = `${theme.colors.electricCyan}66`;
          } else {
            color = theme.colors.electricCyan;
            glowColor = `${theme.colors.electricCyan}66`;
          }
        }

        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              opacity: spr,
              transform: `translateY(${translateY}px) scale(${scale})`,
              color,
              textShadow: isHighlight
                ? `0 0 35px ${glowColor}, 0 4px 15px rgba(0,0,0,0.8)`
                : "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
