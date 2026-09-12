import { GraduationCap, MapPin, Mail, Briefcase } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const { personalInfo, aboutText } = usePortfolio();
  const [ref, isVisible] = useScrollReveal();

  const infoCards = [
    { icon: <GraduationCap size={20} />, label: "Education", value: personalInfo.education },
    { icon: <MapPin size={20} />, label: "Location", value: personalInfo.location },
    { icon: <Mail size={20} />, label: "Email", value: personalInfo.email },
    { icon: <Briefcase size={20} />, label: "Career Interest", value: personalInfo.careerInterest },
  ];

  return (
    <section id="about" className="section-container">
      <div
        ref={ref}
        className={`animate-fade-in ${isVisible ? "visible" : ""}`}
      >
        <h2 className="section-title">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="section-subtitle">Get to know me a little better</p>

        <div
          className="glass-card"
          style={{
            padding: "40px",
            maxWidth: 900,
            margin: "0 auto 48px",
          }}
          onMouseEnter={() => {}}
        >
          {aboutText.map((text, i) => (
            <p
              key={i}
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: i < aboutText.length - 1 ? 20 : 0,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Info cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="glass-card"
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-blue)",
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
