import { useState, useEffect } from "react";
import { Download, Send, Mail, User } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";

export default function Hero() {
  const { personalInfo, socialLinks } = usePortfolio();
  const subtitles = personalInfo?.title
    ? personalInfo.title.split("|").map((s) => s.trim()).filter(Boolean)
    : ["CSE AI Student", "Developer", "AI Enthusiast"];

  const [currentText, setCurrentText] = useState("");
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const current = subtitles[subtitleIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setSubtitleIndex((i) => (i + 1) % subtitles.length);
    }

    setCurrentText(current.substring(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, subtitleIndex]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 60,
          flexWrap: "wrap",
        }}
      >
        {/* Left — Text */}
        <div style={{ flex: "1 1 500px", minWidth: 300 }}>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              fontWeight: 500,
              marginBottom: 8,
              animation: "fadeInUp 0.6s ease both",
            }}
          >
            Hi, I'm
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              animation: "fadeInUp 0.6s ease 0.15s both",
            }}
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          {/* Typing subtitle */}
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--accent-blue)",
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
              minHeight: 32,
              animation: "fadeInUp 0.6s ease 0.3s both",
            }}
          >
            <span>{currentText}</span>
            <span
              style={{
                borderRight: "2px solid var(--accent-blue)",
                marginLeft: 2,
                animation: "typing-cursor 0.8s step-end infinite",
              }}
            >
              &nbsp;
            </span>
          </div>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 32,
              animation: "fadeInUp 0.6s ease 0.45s both",
            }}
          >
            {personalInfo.description}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 36,
              animation: "fadeInUp 0.6s ease 0.6s both",
            }}
          >
            <a href={personalInfo.resumeFile} download className="btn-primary">
              <Download size={18} /> Download Resume
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Send size={18} /> Contact Me
            </a>
          </div>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              animation: "fadeInUp 0.6s ease 0.75s both",
            }}
          >
            {[
              { icon: <GithubIcon size={20} />, href: socialLinks.github, label: "GitHub" },
              { icon: <LinkedinIcon size={20} />, href: socialLinks.linkedin, label: "LinkedIn" },
              { icon: <Mail size={20} />, href: socialLinks.email, label: "Email" },
              { icon: <InstagramIcon size={20} />, href: socialLinks.instagram, label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid var(--border-glass)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-blue)";
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px var(--glow-blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-glass)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Profile image */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeInUp 0.8s ease 0.4s both",
          }}
        >
          <div style={{ position: "relative" }}>
            {/* Outer pulse rings */}
            <div
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                border: "2px solid rgba(59,130,246,0.2)",
                animation: "ring-pulse 2.5s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                border: "2px solid rgba(139,92,246,0.15)",
                animation: "ring-pulse 2.5s ease-out 1.25s infinite",
              }}
            />

            {/* Glow background */}
            <div
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                background: "var(--gradient-primary)",
                filter: "blur(20px)",
                opacity: 0.35,
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            />

            {/* Gradient border ring */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                padding: 4,
                background: "var(--gradient-primary)",
                position: "relative",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {personalInfo.profileImage ? (
                  <img
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} profile`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <User
                    size={100}
                    strokeWidth={1}
                    style={{ color: "var(--text-muted)", opacity: 0.5 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #home > div {
            flex-direction: column-reverse !important;
            text-align: center;
          }
          #home > div > div:first-child {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          #home > div > div:last-child > div > div:last-child {
            width: 200px !important;
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}
