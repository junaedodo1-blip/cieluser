import React from "react";
import { BrandBadge } from "./BrandBadge";

export const TopBrandHeader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: "10px",
        zIndex: 50,
      }}
    >
      <BrandBadge
        src="omni-logo.png"
        delay={0}
        size={110}
        label="Google Omni"
        sublabel="AI Engine"
      />
      <span style={{ color: "#2563EB", fontSize: "36px", fontWeight: 900 }}>✦</span>
      <BrandBadge
        src="nothing-headphones.jpg"
        delay={4}
        size={110}
        label="Nothing Ciel"
        sublabel="Product Ad"
      />
    </div>
  );
};
