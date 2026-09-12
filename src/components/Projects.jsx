import { ExternalLink, Brain, Droplets, Users, Bot, Code2 } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projectIcons = {
  1: <Brain size={32} />,
  2: <Droplets size={32} />,
  3: <Users size={32} />,
  4: <Bot size={32} />,
};

const colorAccents = {
  blue: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.15)", text: "#3b82f6" },
  green: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", glow: "rgba(16,185,129,0.15)", text: "#10b981" },
  purple: { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.15)", text: "#8b5cf6" },
  cyan: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)", glow: "rgba(6,182,212,0.15)", text: "#06b6d4" },
};

export default function Projects() {
  const { projects, socialLinks } = usePortfolio();
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="projects" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle">
          A selection of projects I've built to explore AI, software, and IoT
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {projects.map((project) => {
            const colors = colorAccents[project.color] || colorAccents.blue;
            const Icon = projectIcons[project.id] || <Code2 size={32} />;

            return (
              <div
                key={project.id}
                className="glass-card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Project header with icon */}
                <div
                  style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${colors.bg}, ${colors.glow})`,
                    borderBottom: `1px solid ${colors.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative circles */}
                  <div
                    style={{
                      position: "absolute",
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: colors.glow,
                      top: -30,
                      right: -30,
                      filter: "blur(30px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: colors.glow,
                      bottom: -20,
                      left: -20,
                      filter: "blur(20px)",
                    }}
                  />
                  <div style={{ color: colors.text, position: "relative", zIndex: 1 }}>
                    {Icon}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: 10,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 20,
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: 10 }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 16px",
                        borderRadius: 8,
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "var(--accent-blue)",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(59,130,246,0.2)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <GithubIcon size={16} /> GitHub
                    </a>
                    {project.liveDemo !== "#" && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 16px",
                          borderRadius: 8,
                          background: "rgba(139,92,246,0.1)",
                          border: "1px solid rgba(139,92,246,0.2)",
                          color: "var(--accent-purple)",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          textDecoration: "none",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(139,92,246,0.2)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div style={{ textAlign: "center" }}>
          <a
            href={socialLinks?.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All Projects <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
