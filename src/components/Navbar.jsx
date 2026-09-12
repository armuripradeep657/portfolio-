import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Code, Lock, Edit3 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Navbar({ theme, toggleTheme }) {
  const { navLinks, personalInfo, setIsEditorOpen, isAuthenticated } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Track scroll for sticky bg blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [navLinks]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-glass)" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "var(--text-primary)",
            fontWeight: 800,
            fontSize: "1.25rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          <Code size={22} style={{ color: "var(--accent-blue)" }} />
          <span>&lt;/&gt;</span>
          <span className="gradient-text">{personalInfo.firstName || "PRADEEP"}</span>
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: "0.88rem",
                fontWeight: 500,
                color: activeSection === link.href ? "var(--accent-blue)" : "var(--text-secondary)",
                background: activeSection === link.href ? "rgba(59,130,246,0.1)" : "transparent",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== link.href) {
                  e.target.style.color = "var(--text-primary)";
                  e.target.style.background = "rgba(59,130,246,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.href) {
                  e.target.style.color = "var(--text-secondary)";
                  e.target.style.background = "transparent";
                }
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1px solid var(--border-glass)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Edit Button */}
          <button
            onClick={() => setIsEditorOpen(true)}
            aria-label="Edit portfolio details"
            title="Edit Portfolio Details"
            style={{
              marginLeft: 4,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 12px",
              height: 40,
              borderRadius: 10,
              border: "1px solid rgba(59,130,246,0.3)",
              background: "rgba(59,130,246,0.1)",
              color: "var(--accent-blue)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59,130,246,0.2)";
              e.currentTarget.style.borderColor = "var(--accent-blue)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(59,130,246,0.1)";
              e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
            }}
          >
            {isAuthenticated ? <Edit3 size={16} /> : <Lock size={15} />}
            <span>Edit</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="nav-mobile-controls" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setIsEditorOpen(true)}
            aria-label="Edit details"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1px solid rgba(59,130,246,0.3)",
              background: "rgba(59,130,246,0.1)",
              color: "var(--accent-blue)",
              cursor: "pointer",
            }}
          >
            {isAuthenticated ? <Edit3 size={18} /> : <Lock size={18} />}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
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
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1px solid var(--border-glass)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="nav-mobile-drawer"
        style={{
          maxHeight: isOpen ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div style={{ padding: "8px 24px 16px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                display: "block",
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: 10,
                fontSize: "0.95rem",
                fontWeight: 500,
                color: activeSection === link.href ? "var(--accent-blue)" : "var(--text-secondary)",
                background: activeSection === link.href ? "rgba(59,130,246,0.1)" : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .nav-mobile-controls { display: none !important; }
        .nav-mobile-drawer { display: none; }

        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-controls { display: flex !important; }
          .nav-mobile-drawer { display: block; }
        }
      `}</style>
    </nav>
  );
}
