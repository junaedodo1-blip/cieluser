import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface ExplosiveHeadlineProps {
  text: string;
  delay?: number;
  highlightWords?: string[];
  fontSize?: number;
}

export const ExplosiveHeadline: React.FC<ExplosiveHeadlineProps> = ({
  text,
  delay = 0,
  highlightWords = [],
  fontSize = 68,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.22em",
        fontFamily: theme.fonts.explosive,
        fontSize: `${fontSize}px`,
        lineHeight: 1.05,
        textAlign: "center",
        padding: "0 20px",
        width: "100%",
        maxWidth: "1020px",
        zIndex: 100,
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * 2; // Ultra fast 2 frame stagger
        const spr = spring({
          frame: frame - wordDelay,
          fps,
          config: theme.springs.wobbly,
        });

        // Wobbly Spring Pop-In Physics
        const scale = interpolate(spr, [0, 1], [0.4, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const rotate = interpolate(spr, [0, 1], [18, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const isHighlight = highlightWords.some(
          (h) => word.toLowerCase().includes(h.toLowerCase())
        );

        let color = theme.colors.pureWhite;
        let glowColor = "transparent";

        if (isHighlight) {
          if (word.includes("$10,000")) {
            color = theme.colors.neonPink;
            glowColor = `${theme.colors.neonPink}aa`;
          } else if (word.includes("$0")) {
            color = theme.colors.acidYellow;
            glowColor = `${theme.colors.acidYellow}aa`;
          } else {
            color = theme.colors.electricCyan;
            glowColor = `${theme.colors.electricCyan}aa`;
          }
        }

        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              opacity: spr,
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              color,
              WebkitTextStroke: "2px #000000",
              textShadow: isHighlight
                ? `0 0 35px ${glowColor}, 4px 4px 0px #000000`
                : "3px 3px 0px #000000",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
