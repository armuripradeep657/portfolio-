import { Trophy, Calendar, Presentation, Code, GraduationCap } from "lucide-react";
import { achievements } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const iconMap = {
  Trophy: Trophy,
  Calendar: Calendar,
  Presentation: Presentation,
  Code: Code,
  GraduationCap: GraduationCap,
};

const colors = [
  { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", text: "#3b82f6" },
  { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", text: "#8b5cf6" },
  { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)", text: "#06b6d4" },
  { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", text: "#10b981" },
  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#f59e0b" },
];

export default function Achievements() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="achievements" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <h2 className="section-title">
          <span className="gradient-text">Achievements</span>
        </h2>
        <p className="section-subtitle">Milestones and accomplishments along the way</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {achievements.map((item, i) => {
            const color = colors[i % colors.length];
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: "28px 24px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {item.placeholder && (
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontSize: "0.65rem",
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: "rgba(251,191,36,0.15)",
                      color: "#fbbf24",
                      fontWeight: 600,
                    }}
                  >
                    Placeholder
                  </span>
                )}

                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: color.bg,
                    border: `1px solid ${color.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: color.text,
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon size={26} />
                </div>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          * Achievement details will be updated with specific information.
        </p>
      </div>
    </section>
  );
}
