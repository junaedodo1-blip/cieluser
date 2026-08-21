import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface WordRevealProps {
  text: string;
  delay?: number;
  highlightWords?: string[];
  fontSize?: number;
  color?: string;
  highlightColor?: string;
  align?: "left" | "center" | "right";
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  delay = 0,
  highlightWords = [],
  fontSize = 64, // Large bold typography
  color = theme.colors.textPrimary,
  highlightColor = theme.colors.primaryAccent,
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
        gap: "0.28em",
        fontFamily: theme.fonts.heading,
        fontSize: `${fontSize}px`,
        fontWeight: 900,
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
        textAlign: align,
        padding: "0 30px",
        width: "100%",
        maxWidth: "980px",
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * 3;
        const spr = spring({
          frame: frame - wordDelay,
          fps,
          config: theme.springs.snappy,
        });

        const translateY = interpolate(spr, [0, 1], [35, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const scale = interpolate(spr, [0, 1], [0.8, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const isHighlight = highlightWords.some(
          (h) => word.toLowerCase().includes(h.toLowerCase())
        );

        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              opacity: spr,
              transform: `translateY(${translateY}px) scale(${scale})`,
              color: isHighlight ? highlightColor : color,
              textShadow: isHighlight
                ? `0 4px 20px ${highlightColor}33`
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
