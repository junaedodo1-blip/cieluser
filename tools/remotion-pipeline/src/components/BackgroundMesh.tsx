import React from "react";

export const BackgroundMesh: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#07080A", // Minimalist Midnight Obsidian Canvas
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Single Soft Subtle Ambient Spotlight Glow */}
      <div
        style={{
          position: "absolute",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
          top: "10%",
          filter: "blur(120px)",
        }}
      />

      {children}
    </div>
  );
};
