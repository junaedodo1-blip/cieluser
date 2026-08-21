import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

interface MetricItem {
  label: string;
  value: string;
  change?: string;
  color?: string;
}

interface ProofMetricsCardProps {
  delay?: number;
  metrics?: MetricItem[];
}

export const ProofMetricsCard: React.FC<ProofMetricsCardProps> = ({
  delay = 0,
  metrics = [
    { label: "Render Time", value: "48s", change: "⚡ Instant", color: "#2563EB" },
    { label: "Production Cost", value: "$0", change: "💰 Save $10k", color: "#10B981" },
    { label: "Social CTR", value: "+412%", change: "📈 3.4M Views", color: "#7C3AED" },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: theme.springs.snappy,
  });

  const scale = interpolate(spr, [0, 1], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        width: "100%",
        maxWidth: "860px",
        marginTop: "16px",
        opacity: spr,
        transform: `scale(${scale})`,
      }}
    >
      {metrics.map((item, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            border: "2px solid #E2E8F0",
            borderRadius: "20px",
            padding: "16px",
            boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: "32px",
              fontWeight: 900,
              color: item.color || theme.colors.textPrimary,
              lineHeight: 1.1,
            }}
          >
            {item.value}
          </span>
          <span
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: "14px",
              fontWeight: 700,
              color: "#475569",
              marginTop: "4px",
            }}
          >
            {item.label}
          </span>
          {item.change && (
            <span
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: "12px",
                fontWeight: 700,
                color: item.color || "#2563EB",
                marginTop: "6px",
                backgroundColor: "#F1F5F9",
                padding: "4px 10px",
                borderRadius: "12px",
              }}
            >
              {item.change}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
