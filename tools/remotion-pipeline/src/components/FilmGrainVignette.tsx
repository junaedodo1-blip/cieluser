import React from "react";

export const FilmGrainVignette: React.FC = () => {
  return (
    <>
      {/* Vignette Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(circle, transparent 55%, rgba(0, 0, 0, 0.65) 100%)",
          zIndex: 998,
        }}
      />
      {/* Film Border Accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          margin: "16px",
          borderRadius: "32px",
          zIndex: 999,
        }}
      />
    </>
  );
};
