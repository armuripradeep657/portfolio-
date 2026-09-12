import {
  FileCode, FileCode2, Coffee, Terminal, Database,
  Brain, Cpu, Layers, FlaskConical, Table, Calculator,
  Code, Palette, Braces, Atom, Globe,
  GitBranch, MonitorSmartphone, Flame, Cloud,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Map icon string names to Lucide components (or custom)
const iconMap = {
  FileCode, FileCode2, Coffee, Terminal, Database,
  Brain, Cpu, Layers, FlaskConical, Table, Calculator,
  Code, Palette, Braces, Atom, Globe,
  GitBranch, Github: GithubIcon, MonitorSmartphone, Flame, Cloud,
};

const categoryColors = {
  "Programming Languages": { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", text: "#3b82f6" },
  "AI / Machine Learning": { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", text: "#8b5cf6" },
  "Web Technologies": { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)", text: "#06b6d4" },
  "Tools & Platforms": { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", text: "#10b981" },
};

export default function Skills() {
  const { skills } = usePortfolio();
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="skills" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <h2 className="section-title">
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {Object.entries(skills).map(([category, items]) => {
            const colors = categoryColors[category] || categoryColors["Programming Languages"];
            return (
              <div key={category} className="glass-card" style={{ padding: 28 }}>
                {/* Category header */}
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: colors.text,
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: colors.text,
                      display: "inline-block",
                    }}
                  />
                  {category}
                </h3>

                {/* Skill badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {items.map((skill) => {
                    const Icon = iconMap[skill.icon];
                    return (
                      <div
                        key={skill.name}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 14px",
                          borderRadius: 10,
                          background: colors.bg,
                          border: `1px solid ${colors.border}`,
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          transition: "all 0.25s ease",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = `0 4px 15px ${colors.border}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {Icon && <Icon size={16} style={{ color: colors.text }} />}
                        {skill.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
