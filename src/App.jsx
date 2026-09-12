import { useState, useEffect } from "react";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EditModal from "./components/EditModal";
import { Lock, Edit3 } from "lucide-react";

function PortfolioContent({ theme, toggleTheme }) {
  const { setIsEditorOpen, isAuthenticated } = usePortfolio();

  return (
    <>
      {/* Ambient background */}
      <div className="bg-particles" aria-hidden="true" />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating quick edit button */}
      <button
        onClick={() => setIsEditorOpen(true)}
        aria-label="Edit portfolio details"
        title="Admin: Edit Details"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 9999,
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(59, 130, 246, 0.35)",
          color: "var(--accent-blue)",
          fontSize: "0.85rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 15px var(--glow-blue)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
          e.currentTarget.style.borderColor = "var(--accent-blue)";
          e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(0, 0, 0, 0.5), 0 0 25px var(--glow-blue)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.35)";
          e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 15px var(--glow-blue)";
        }}
      >
        {isAuthenticated ? <Edit3 size={15} /> : <Lock size={15} />}
        <span>Edit Portfolio</span>
      </button>

      {/* Admin Edit Modal */}
      <EditModal />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <PortfolioProvider>
      <PortfolioContent theme={theme} toggleTheme={toggleTheme} />
    </PortfolioProvider>
  );
}

export default App;
