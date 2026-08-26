import { useState } from "react";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo, socialLinks } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect this to a backend/Formspree/EmailJS
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid var(--border-glass)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "all 0.25s ease",
    backdropFilter: "blur(8px)",
  };

  return (
    <section id="contact" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <h2 className="section-title">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className="section-subtitle">
          Have a project idea, internship opportunity, or just want to connect?
          Feel free to reach out.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            maxWidth: 900,
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="glass-card"
            style={{ padding: 32 }}
            onMouseEnter={() => {}}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 300,
                  gap: 16,
                }}
              >
                <CheckCircle size={48} style={{ color: "var(--accent-green)" }} />
                <p style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Message Sent!
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                    }}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  <Send size={18} /> Send Message
                </button>
              </div>
            )}
          </form>

          {/* Contact info side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="glass-card" style={{ padding: 28 }} onMouseEnter={() => {}}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "var(--text-primary)",
                }}
              >
                Contact Information
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <a
                  href={socialLinks.email}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                    color: "var(--text-secondary)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-blue)",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      EMAIL
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>{personalInfo.email}</p>
                  </div>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                    color: "var(--text-secondary)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-blue)",
                      flexShrink: 0,
                    }}
                  >
                    <LinkedinIcon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      LINKEDIN
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>LinkedIn Profile</p>
                  </div>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                    color: "var(--text-secondary)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-blue)",
                      flexShrink: 0,
                    }}
                  >
                    <GithubIcon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      GITHUB
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>GitHub Profile</p>
                  </div>
                </a>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    color: "var(--text-secondary)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-blue)",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      LOCATION
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick note */}
            <div
              className="glass-card"
              style={{ padding: "20px 24px" }}
              onMouseEnter={() => {}}
            >
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                💡 <strong style={{ color: "var(--text-primary)" }}>Open to opportunities</strong> —
                I'm actively looking for internships, project collaborations, and full-time roles
                in AI/ML and software development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
