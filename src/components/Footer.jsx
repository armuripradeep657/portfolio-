import { Mail, ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { socialLinks, personalInfo } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { icon: <GithubIcon size={18} />, href: socialLinks.github, label: "GitHub" },
    { icon: <LinkedinIcon size={18} />, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: <Mail size={18} />, href: socialLinks.email, label: "Email" },
    { icon: <InstagramIcon size={18} />, href: socialLinks.instagram, label: "Instagram" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-glass)",
        background: "var(--bg-secondary)",
        padding: "48px 24px 32px",
        position: "relative",
      }}
    >
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: "absolute",
          top: -24,
          left: "50%",
          transform: "translateX(-50%)",
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "var(--gradient-primary)",
          border: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px var(--glow-blue)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-50%) translateY(-4px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(-50%) translateY(0)")}
      >
        <ArrowUp size={22} />
      </button>

      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        {/* Social icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {socials.map((s) => (
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
                width: 40,
                height: 40,
                borderRadius: 10,
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border-glass)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            marginBottom: 8,
          }}
        >
          © 2026 {personalInfo.name || "ARMURI PRADEEP"}. All Rights Reserved.
        </p>

        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          Built with <Heart size={14} style={{ color: "#ef4444" }} /> using HTML, CSS, JavaScript
          and modern web technologies.
        </p>
      </div>
    </footer>
  );
}
