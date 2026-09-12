import { Download, FileText } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Resume() {
  const { personalInfo } = usePortfolio();
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="resume" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <div
          className="glass-card"
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "60px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative gradient orbs */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(59,130,246,0.06)",
              top: -60,
              right: -60,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(139,92,246,0.06)",
              bottom: -40,
              left: -40,
              filter: "blur(40px)",
            }}
          />

          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-blue)",
              margin: "0 auto 24px",
            }}
          >
            <FileText size={32} />
          </div>

          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Want to know more about my{" "}
            <span className="gradient-text">experience</span>?
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 500,
              margin: "0 auto 36px",
            }}
          >
            Download my resume to see my full education, skills, projects, and
            experience details.
          </p>

          <a
            href={personalInfo.resumeFile}
            download
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "16px 40px" }}
          >
            <Download size={20} /> Download Resume
          </a>

          <p
            style={{
              marginTop: 20,
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            PDF format • Updated regularly
          </p>
        </div>
      </div>
    </section>
  );
}
