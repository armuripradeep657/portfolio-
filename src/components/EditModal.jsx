import { useState, useEffect } from "react";
import {
  X,
  Lock,
  Unlock,
  Save,
  Download,
  Copy,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Eye,
  Key,
  User,
  Globe,
  FileText,
  FolderGit2,
  Cpu,
  Award,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function EditModal() {
  const {
    personalInfo,
    socialLinks,
    aboutText,
    skills,
    projects,
    certifications,
    achievements,
    isEditorOpen,
    setIsEditorOpen,
    isAuthenticated,
    verifyPin,
    changePin,
    saveAllData,
    resetToDefaults,
    downloadDataFile,
    generateCodeString,
  } = usePortfolio();

  // Local state for form editing before committing save
  const [activeTab, setActiveTab] = useState("personal");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [saveToast, setSaveToast] = useState(null);

  // Form states
  const [formPersonal, setFormPersonal] = useState(personalInfo);
  const [formSocial, setFormSocial] = useState(socialLinks);
  const [formAbout, setFormAbout] = useState(aboutText);
  const [formProjects, setFormProjects] = useState(projects);
  const [formSkills, setFormSkills] = useState(skills);
  const [formCerts, setFormCerts] = useState(certifications);

  // New PIN settings
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");

  // Sync state when modal opens or context changes
  useEffect(() => {
    if (isEditorOpen) {
      setFormPersonal(personalInfo);
      setFormSocial(socialLinks);
      setFormAbout(aboutText);
      setFormProjects(projects);
      setFormSkills(skills);
      setFormCerts(certifications);
      setPinError("");
      setPinInput("");
    }
  }, [isEditorOpen, personalInfo, socialLinks, aboutText, projects, skills, certifications]);

  if (!isEditorOpen) return null;

  const handleUnlock = (e) => {
    e?.preventDefault();
    if (verifyPin(pinInput)) {
      setPinError("");
    } else {
      setPinError("Incorrect PIN. Please try again (Default PIN: 1234)");
    }
  };

  const triggerToast = (message) => {
    setSaveToast(message);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveAll = () => {
    saveAllData({
      personalInfo: formPersonal,
      socialLinks: formSocial,
      aboutText: formAbout,
      projects: formProjects,
      skills: formSkills,
      certifications: formCerts,
    });
    triggerToast("Changes saved successfully to your website!");
  };

  const handleCopyCode = () => {
    const code = generateCodeString();
    navigator.clipboard.writeText(code).then(() => {
      triggerToast("Code copied to clipboard! You can paste it into portfolioData.js");
    });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data to original defaults?")) {
      resetToDefaults();
      triggerToast("Reset to default portfolio data.");
      setIsEditorOpen(false);
    }
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinMessage("PIN must be at least 4 digits");
      return;
    }
    if (newPin !== confirmPin) {
      setPinMessage("PINs do not match");
      return;
    }
    changePin(newPin);
    setPinMessage("PIN changed successfully!");
    setNewPin("");
    setConfirmPin("");
    setTimeout(() => setPinMessage(""), 3000);
  };

  // Helper to add/remove projects
  const addProject = () => {
    const newId = Date.now();
    setFormProjects([
      ...formProjects,
      {
        id: newId,
        title: "New Project",
        description: "Description of your innovative project.",
        technologies: ["Python", "AI"],
        github: formSocial.github + "/new-project",
        liveDemo: "#",
        color: "blue",
      },
    ]);
  };

  const removeProject = (id) => {
    setFormProjects(formProjects.filter((p) => p.id !== id));
  };

  const updateProjectField = (index, field, value) => {
    const updated = [...formProjects];
    if (field === "technologies") {
      updated[index][field] = value.split(",").map((t) => t.trim()).filter(Boolean);
    } else {
      updated[index][field] = value;
    }
    setFormProjects(updated);
  };

  // Helper to add/remove certifications
  const addCert = () => {
    setFormCerts([
      ...formCerts,
      {
        name: "New Certificate",
        issuer: "Issuing Organization",
        link: "#",
        placeholder: false,
      },
    ]);
  };

  const removeCert = (index) => {
    setFormCerts(formCerts.filter((_, i) => i !== index));
  };

  const updateCertField = (index, field, value) => {
    const updated = [...formCerts];
    updated[index][field] = value;
    setFormCerts(updated);
  };

  // Common input styles
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid var(--border-glass)",
    background: "rgba(15, 23, 42, 0.6)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: 6,
    letterSpacing: "0.02em",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(3, 7, 18, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsEditorOpen(false);
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-glass)",
          borderRadius: 20,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px var(--glow-blue)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
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
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {isAuthenticated ? <Unlock size={20} /> : <Lock size={20} />}
            </div>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                Portfolio Admin Editor
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                {isAuthenticated
                  ? "Customize and save your portfolio details live"
                  : "Protected: Enter your PIN to edit details"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditorOpen(false)}
            aria-label="Close editor"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: 8,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <X size={22} />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div
            style={{
              padding: "60px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(59, 130, 246, 0.1)",
                border: "2px solid rgba(59, 130, 246, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-blue)",
                marginBottom: 20,
              }}
            >
              <Lock size={36} />
            </div>

            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
              Admin Verification
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                maxWidth: 420,
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              To protect your details from visitor edits, please enter your Admin PIN.
              <br />
              <span style={{ fontSize: "0.85rem", color: "var(--accent-cyan)" }}>
                (Default Master PIN: <strong>1234</strong>)
              </span>
            </p>

            <form
              onSubmit={handleUnlock}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                width: "100%",
                maxWidth: 320,
              }}
            >
              <input
                type="password"
                placeholder="Enter PIN..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                style={{
                  ...inputStyle,
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "0.4em",
                  padding: "12px",
                }}
              />

              {pinError && (
                <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0 }}>
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              >
                <Unlock size={18} /> Unlock Editor
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <>
            {/* Navigation Tabs */}
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                borderBottom: "1px solid var(--border-glass)",
                background: "rgba(10, 16, 32, 0.5)",
                padding: "0 16px",
                gap: 4,
              }}
            >
              {[
                { id: "personal", label: "Profile & Bio", icon: <User size={16} /> },
                { id: "social", label: "Social Links", icon: <Globe size={16} /> },
                { id: "about", label: "About Me", icon: <FileText size={16} /> },
                { id: "projects", label: "Projects", icon: <FolderGit2 size={16} /> },
                { id: "skills", label: "Skills", icon: <Cpu size={16} /> },
                { id: "certs", label: "Certificates", icon: <Award size={16} /> },
                { id: "export", label: "Export & PIN", icon: <Key size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 16px",
                    border: "none",
                    borderBottom:
                      activeTab === tab.id
                        ? "2px solid var(--accent-blue)"
                        : "2px solid transparent",
                    background: "transparent",
                    color:
                      activeTab === tab.id
                        ? "var(--accent-blue)"
                        : "var(--text-secondary)",
                    fontSize: "0.9rem",
                    fontWeight: activeTab === tab.id ? 600 : 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Tab 1: Profile & Bio */}
              {activeTab === "personal" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.name || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>First Name (Navbar Display)</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.firstName || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, firstName: e.target.value })}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Headline / Professional Title</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.title || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, title: e.target.value })}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Hero Brief Description</label>
                    <textarea
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={formPersonal.description || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      style={inputStyle}
                      type="email"
                      value={formPersonal.email || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.phone || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Location (City, Country)</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.location || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Education Degree & College</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.education || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, education: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Career Focus</label>
                    <input
                      style={inputStyle}
                      value={formPersonal.careerInterest || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, careerInterest: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Profile Image URL (leave empty for avatar)</label>
                    <input
                      style={inputStyle}
                      placeholder="/profile.jpg or image URL"
                      value={formPersonal.profileImage || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, profileImage: e.target.value || null })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Resume File Path / Link</label>
                    <input
                      style={inputStyle}
                      placeholder="/resume.pdf"
                      value={formPersonal.resumeFile || ""}
                      onChange={(e) => setFormPersonal({ ...formPersonal, resumeFile: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Social Links */}
              {activeTab === "social" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>GitHub Profile URL</label>
                    <input
                      style={inputStyle}
                      value={formSocial.github || ""}
                      onChange={(e) => setFormSocial({ ...formSocial, github: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>LinkedIn Profile URL</label>
                    <input
                      style={inputStyle}
                      value={formSocial.linkedin || ""}
                      onChange={(e) => setFormSocial({ ...formSocial, linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Contact Email (mailto: link)</label>
                    <input
                      style={inputStyle}
                      value={formSocial.email || ""}
                      onChange={(e) => setFormSocial({ ...formSocial, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Instagram Profile URL</label>
                    <input
                      style={inputStyle}
                      value={formSocial.instagram || ""}
                      onChange={(e) => setFormSocial({ ...formSocial, instagram: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: About Me */}
              {activeTab === "about" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>About Paragraph 1</label>
                    <textarea
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={formAbout[0] || ""}
                      onChange={(e) => {
                        const updated = [...formAbout];
                        updated[0] = e.target.value;
                        setFormAbout(updated);
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>About Paragraph 2</label>
                    <textarea
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={formAbout[1] || ""}
                      onChange={(e) => {
                        const updated = [...formAbout];
                        updated[1] = e.target.value;
                        setFormAbout(updated);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Tab 4: Projects */}
              {activeTab === "projects" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                      Total Projects: <strong>{formProjects.length}</strong>
                    </span>
                    <button
                      onClick={addProject}
                      className="btn-secondary"
                      style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                    >
                      <Plus size={16} /> Add Project
                    </button>
                  </div>

                  {formProjects.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        border: "1px solid var(--border-glass)",
                        background: "rgba(15, 23, 42, 0.4)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, color: "var(--accent-cyan)" }}>
                          Project #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeProject(p.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            padding: 4,
                          }}
                          title="Delete project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={labelStyle}>Title</label>
                          <input
                            style={inputStyle}
                            value={p.title}
                            onChange={(e) => updateProjectField(idx, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Technologies (comma separated)</label>
                          <input
                            style={inputStyle}
                            value={p.technologies?.join(", ") || ""}
                            onChange={(e) => updateProjectField(idx, "technologies", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Description</label>
                        <textarea
                          rows={2}
                          style={{ ...inputStyle, resize: "vertical" }}
                          value={p.description}
                          onChange={(e) => updateProjectField(idx, "description", e.target.value)}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={labelStyle}>GitHub Repo URL</label>
                          <input
                            style={inputStyle}
                            value={p.github || ""}
                            onChange={(e) => updateProjectField(idx, "github", e.target.value)}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Live Demo URL (or #)</label>
                          <input
                            style={inputStyle}
                            value={p.liveDemo || "#"}
                            onChange={(e) => updateProjectField(idx, "liveDemo", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Skills */}
              {activeTab === "skills" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {Object.entries(formSkills).map(([cat, skillList]) => (
                    <div
                      key={cat}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        border: "1px solid var(--border-glass)",
                        background: "rgba(15, 23, 42, 0.4)",
                      }}
                    >
                      <label style={{ ...labelStyle, fontSize: "1rem", color: "var(--accent-blue)" }}>
                        {cat} (comma-separated names)
                      </label>
                      <input
                        style={inputStyle}
                        value={skillList.map((s) => s.name).join(", ")}
                        onChange={(e) => {
                          const names = e.target.value.split(",").map((n) => n.trim()).filter(Boolean);
                          setFormSkills({
                            ...formSkills,
                            [cat]: names.map((name) => {
                              const existing = skillList.find((s) => s.name === name);
                              return existing || { name, icon: "Code" };
                            }),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 6: Certifications */}
              {activeTab === "certs" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                      Certifications ({formCerts.length})
                    </span>
                    <button
                      onClick={addCert}
                      className="btn-secondary"
                      style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                    >
                      <Plus size={16} /> Add Certificate
                    </button>
                  </div>

                  {formCerts.map((c, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        border: "1px solid var(--border-glass)",
                        background: "rgba(15, 23, 42, 0.4)",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr auto",
                        gap: 12,
                        alignItems: "end",
                      }}
                    >
                      <div>
                        <label style={labelStyle}>Certificate Name</label>
                        <input
                          style={inputStyle}
                          value={c.name}
                          onChange={(e) => updateCertField(idx, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Issuer / Org</label>
                        <input
                          style={inputStyle}
                          value={c.issuer}
                          onChange={(e) => updateCertField(idx, "issuer", e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Link / Verification URL</label>
                        <input
                          style={inputStyle}
                          value={c.link}
                          onChange={(e) => updateCertField(idx, "link", e.target.value)}
                        />
                      </div>
                      <button
                        onClick={() => removeCert(idx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                          padding: "10px 8px",
                        }}
                        title="Delete certification"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 7: Export & Admin PIN */}
              {activeTab === "export" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {/* Export / Download Section */}
                  <div
                    style={{
                      padding: 20,
                      borderRadius: 12,
                      border: "1px solid var(--border-glass)",
                      background: "rgba(15, 23, 42, 0.5)",
                    }}
                  >
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8 }}>
                      Permanent Deployment / GitHub Export
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
                      When you save your changes, they are instantly stored in your browser. To make sure all visitors
                      see your latest updates across the internet on GitHub and Vercel, you can download the updated file
                      or copy the code and push to GitHub.
                    </p>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <button onClick={downloadDataFile} className="btn-primary" style={{ padding: "10px 18px" }}>
                        <Download size={18} /> Download portfolioData.js
                      </button>
                      <button onClick={handleCopyCode} className="btn-secondary" style={{ padding: "10px 18px" }}>
                        <Copy size={18} /> Copy Code to Clipboard
                      </button>
                    </div>
                  </div>

                  {/* Change PIN Section */}
                  <div
                    style={{
                      padding: 20,
                      borderRadius: 12,
                      border: "1px solid var(--border-glass)",
                      background: "rgba(15, 23, 42, 0.5)",
                    }}
                  >
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8 }}>
                      Change Admin PIN
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: 16 }}>
                      Protect your admin editor with your own personalized PIN code.
                    </p>

                    <form onSubmit={handleChangePin} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                      <div>
                        <label style={labelStyle}>New PIN (min 4 digits)</label>
                        <input
                          type="password"
                          style={{ ...inputStyle, width: 160 }}
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Confirm PIN</label>
                        <input
                          type="password"
                          style={{ ...inputStyle, width: 160 }}
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn-secondary" style={{ padding: "10px 16px" }}>
                        Update PIN
                      </button>
                    </form>

                    {pinMessage && (
                      <p style={{ color: "var(--accent-cyan)", fontSize: "0.85rem", marginTop: 10 }}>
                        {pinMessage}
                      </p>
                    )}
                  </div>

                  {/* Reset Defaults */}
                  <div
                    style={{
                      padding: 20,
                      borderRadius: 12,
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      background: "rgba(239, 68, 68, 0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 16,
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#f87171", margin: 0 }}>
                        Reset to Original Defaults
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                        Clear all custom edits and restore original template data.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      style={{
                        padding: "8px 16px",
                        background: "rgba(239, 68, 68, 0.2)",
                        border: "1px solid rgba(239, 68, 68, 0.4)",
                        color: "#fca5a5",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      <RotateCcw size={16} /> Reset Everything
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid var(--border-glass)",
                background: "rgba(15, 23, 42, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {saveToast ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--accent-cyan)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  <Check size={18} /> {saveToast}
                </div>
              ) : (
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  💡 Remember to click <strong>Save & Apply</strong> to update your portfolio
                </div>
              )}

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="btn-secondary"
                  style={{ padding: "10px 20px" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="btn-primary"
                  style={{ padding: "10px 24px" }}
                >
                  <Save size={18} /> Save & Apply
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
