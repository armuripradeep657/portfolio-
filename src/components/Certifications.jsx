import { ExternalLink, Award } from "lucide-react";
import { certifications } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const issuerColors = {
  Oracle: "#f80000",
  "NPTEL / IIT": "#0066cc",
  Google: "#4285f4",
  IBM: "#0530ad",
  HackerRank: "#00ea0cff",
};

export default function Certifications() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="certifications" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <h2 className="section-title">
          <span className="gradient-text">Certifications</span>
        </h2>
        <p className="section-subtitle">
          Professional certifications and credentials
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {certifications.map((cert, i) => {
            const color = issuerColors[cert.issuer] || "#3b82f6";
            return (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                style={{
                  padding: "28px 24px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 14,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {cert.placeholder && (
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

                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: color,
                  }}
                >
                  <Award size={24} />
                </div>

                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                  }}
                >
                  {cert.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {cert.issuer}
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.78rem",
                    color: "var(--accent-blue)",
                    fontWeight: 500,
                    marginTop: "auto",
                  }}
                >
                  View Certificate <ExternalLink size={12} />
                </span>
              </a>
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
          * Certification details will be updated with verified credentials.
        </p>
      </div>
    </section>
  );
}
