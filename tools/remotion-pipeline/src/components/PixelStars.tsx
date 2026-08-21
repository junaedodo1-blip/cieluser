import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const PixelStars: React.FC = () => {
  const frame = useCurrentFrame();

  // Create 12 floating pixel stars with varied positions and flicker frequencies
  const stars = [
    { x: 10, y: 15, size: 12, speed: 25 },
    { x: 85, y: 10, size: 16, speed: 20 },
    { x: 25, y: 35, size: 8, speed: 30 },
    { x: 75, y: 40, size: 14, speed: 18 },
    { x: 15, y: 65, size: 10, speed: 22 },
    { x: 80, y: 70, size: 12, speed: 28 },
    { x: 45, y: 12, size: 14, speed: 15 },
    { x: 90, y: 85, size: 10, speed: 32 },
    { x: 8, y: 88, size: 16, speed: 19 },
    { x: 50, y: 82, size: 8, speed: 24 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {stars.map((star, idx) => {
        const opacity = interpolate(
          Math.sin((frame + idx * 10) / (star.speed / 5)),
          [-1, 1],
          [0.2, 0.95]
        );
        const floatY = Math.sin((frame + idx * 7) / 18) * 6;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: idx % 2 === 0 ? "#FACC15" : "#38BDF8", // Pixel Gold / Cyan
              boxShadow: "3px 3px 0px #000000",
              opacity,
              transform: `translateY(${floatY}px) rotate(45deg)`,
              imageRendering: "pixelated",
            }}
          />
        );
      })}
    </div>
  );
};
