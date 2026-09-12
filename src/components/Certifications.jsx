import { useState } from "react";
import { ExternalLink, Award, X, Download, Eye, FileText } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

const issuerColors = {
  Oracle: "#f80000",
  "NPTEL / IIT": "#0066cc",
  Google: "#4285f4",
  IBM: "#0530ad",
  HackerRank: "#00ea0cff",
};

export default function Certifications() {
  const { certifications } = usePortfolio();
  const [ref, isVisible] = useScrollReveal();
  const [selectedCert, setSelectedCert] = useState(null);

  const handleCertClick = (e, cert) => {
    e.preventDefault();
    const hasData = cert.fileData || (cert.link && cert.link.startsWith("data:"));
    const isWebLink = cert.link && (cert.link.startsWith("http://") || cert.link.startsWith("https://"));

    if (hasData) {
      setSelectedCert(cert);
    } else if (isWebLink) {
      window.open(cert.link, "_blank", "noopener,noreferrer");
    } else {
      setSelectedCert(cert);
    }
  };

  const isImage = (cert) => {
    const data = cert.fileData || cert.link || "";
    return data.startsWith("data:image/") || /\.(jpg|jpeg|png|webp|gif)$/i.test(data);
  };

  const isPdf = (cert) => {
    const data = cert.fileData || cert.link || "";
    return data.startsWith("data:application/pdf") || /\.pdf$/i.test(data);
  };

  return (
    <section id="certifications" className="section-container">
      <div ref={ref} className={`animate-fade-in ${isVisible ? "visible" : ""}`}>
        <h2 className="section-title">
          <span className="gradient-text">Certifications</span>
        </h2>
        <p className="section-subtitle">
          Professional certifications and credentials (click to view or download)
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {certifications.map((cert, i) => {
            const color = issuerColors[cert.issuer] || "var(--accent-blue)";
            const hasUploadedFile = cert.fileData || (cert.link && cert.link.startsWith("data:"));

            return (
              <div
                key={cert.name + i}
                onClick={(e) => handleCertClick(e, cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCertClick(e, cert);
                }}
                className="glass-card"
                style={{
                  padding: "28px 24px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 14,
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Uploaded badge or placeholder */}
                {hasUploadedFile ? (
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontSize: "0.65rem",
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      fontWeight: 600,
                    }}
                  >
                    Uploaded
                  </span>
                ) : cert.placeholder ? (
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
                    Pending
                  </span>
                ) : null}

                {/* Icon or mini thumbnail */}
                {hasUploadedFile && isImage(cert) ? (
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "2px solid rgba(59, 130, 246, 0.4)",
                      boxShadow: "0 4px 12px var(--glow-blue)",
                    }}
                  >
                    <img
                      src={cert.fileData || cert.link}
                      alt={cert.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ) : (
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
                )}

                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {cert.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    margin: 0,
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
                  {hasUploadedFile ? (
                    <>
                      <Eye size={13} /> View Certificate
                    </>
                  ) : (
                    <>
                      View Details <ExternalLink size={12} />
                    </>
                  )}
                </span>
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
          * Certificates can be uploaded directly from your computer via the <strong>Edit</strong> button.
        </p>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(3, 7, 18, 0.88)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            animation: "fadeIn 0.25s ease",
          }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            style={{
              maxWidth: 750,
              width: "100%",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-glass)",
              borderRadius: 20,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px var(--glow-blue)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--border-glass)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(15, 23, 42, 0.7)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                    {selectedCert.name}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                    Issued by {selectedCert.issuer}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Viewer Content */}
            <div
              style={{
                padding: 24,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                minHeight: 280,
              }}
            >
              {isImage(selectedCert) ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border-glass)",
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: 8,
                  }}
                >
                  <img
                    src={selectedCert.fileData || selectedCert.link}
                    alt={selectedCert.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "65vh",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                </div>
              ) : isPdf(selectedCert) ? (
                <div
                  style={{
                    width: "100%",
                    height: "60vh",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border-glass)",
                  }}
                >
                  <iframe
                    src={selectedCert.fileData || selectedCert.link}
                    title={selectedCert.name}
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <Award size={48} style={{ color: "var(--text-muted)", marginBottom: 12, opacity: 0.6 }} />
                  <h4 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Certificate Not Yet Uploaded</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: 400, margin: "0 auto 20px" }}>
                    ARMURI PRADEEP can upload the verified certificate file directly from their laptop using the Admin <strong>Edit</strong> button.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid var(--border-glass)",
                background: "rgba(15, 23, 42, 0.7)",
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              {(selectedCert.fileData || (selectedCert.link && selectedCert.link.startsWith("data:"))) && (
                <a
                  href={selectedCert.fileData || selectedCert.link}
                  download={`${selectedCert.name.replace(/\s+/g, "_")}_certificate`}
                  className="btn-primary"
                  style={{ padding: "8px 16px", fontSize: "0.85rem", textDecoration: "none" }}
                >
                  <Download size={16} /> Download Certificate
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="btn-secondary"
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
