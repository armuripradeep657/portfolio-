import { createContext, useContext, useState, useEffect } from "react";
import * as defaultData from "../data/portfolioData";

const PortfolioContext = createContext(null);

const STORAGE_KEY = "armuri_portfolio_custom_data";
const PIN_KEY = "armuri_portfolio_admin_pin";
const DEFAULT_PIN = "1234";

export function PortfolioProvider({ children }) {
  // Load initial data from localStorage if present, otherwise default
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            personalInfo: { ...defaultData.personalInfo, ...(parsed.personalInfo || {}) },
            socialLinks: { ...defaultData.socialLinks, ...(parsed.socialLinks || {}) },
            aboutText: Array.isArray(parsed.aboutText) ? parsed.aboutText : defaultData.aboutText,
            skills: parsed.skills || defaultData.skills,
            projects: parsed.projects || defaultData.projects,
            certifications: parsed.certifications || defaultData.certifications,
            achievements: parsed.achievements || defaultData.achievements,
            navLinks: defaultData.navLinks,
          };
        }
      } catch (err) {
        console.error("Failed to load custom data from localStorage", err);
      }
    }
    return {
      personalInfo: defaultData.personalInfo,
      socialLinks: defaultData.socialLinks,
      aboutText: defaultData.aboutText,
      skills: defaultData.skills,
      projects: defaultData.projects,
      certifications: defaultData.certifications,
      achievements: defaultData.achievements,
      navLinks: defaultData.navLinks,
    };
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
    }
    return DEFAULT_PIN;
  });

  // Verify PIN
  const verifyPin = (pinToTest) => {
    if (pinToTest === adminPin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Change PIN
  const changePin = (newPin) => {
    if (!newPin || newPin.trim().length < 4) {
      throw new Error("PIN must be at least 4 characters long");
    }
    setAdminPin(newPin.trim());
    localStorage.setItem(PIN_KEY, newPin.trim());
  };

  // Save changes to state & localStorage
  const saveAllData = (updatedData) => {
    const nextState = {
      personalInfo: updatedData.personalInfo || data.personalInfo,
      socialLinks: updatedData.socialLinks || data.socialLinks,
      aboutText: updatedData.aboutText || data.aboutText,
      skills: updatedData.skills || data.skills,
      projects: updatedData.projects || data.projects,
      certifications: updatedData.certifications || data.certifications,
      achievements: updatedData.achievements || data.achievements,
      navLinks: data.navLinks,
    };
    setData(nextState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (e) {
      console.error("Error saving data to localStorage", e);
    }
  };

  // Reset to original default portfolioData
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setData({
      personalInfo: defaultData.personalInfo,
      socialLinks: defaultData.socialLinks,
      aboutText: defaultData.aboutText,
      skills: defaultData.skills,
      projects: defaultData.projects,
      certifications: defaultData.certifications,
      achievements: defaultData.achievements,
      navLinks: defaultData.navLinks,
    });
  };

  // Generate clean JavaScript code string for portfolioData.js
  const generateCodeString = () => {
    return `// ============================================================
// PORTFOLIO DATA — Generated from Admin Dashboard
// ARMURI PRADEEP Portfolio
// ============================================================

export const personalInfo = ${JSON.stringify(data.personalInfo, null, 2)};

export const socialLinks = ${JSON.stringify(data.socialLinks, null, 2)};

export const aboutText = ${JSON.stringify(data.aboutText, null, 2)};

export const skills = ${JSON.stringify(data.skills, null, 2)};

export const projects = ${JSON.stringify(data.projects, null, 2)};

export const certifications = ${JSON.stringify(data.certifications, null, 2)};

export const achievements = ${JSON.stringify(data.achievements, null, 2)};

export const navLinks = ${JSON.stringify(data.navLinks, null, 2)};
`;
  };

  // Download portfolioData.js file
  const downloadDataFile = () => {
    const code = generateCodeString();
    const blob = new Blob([code], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolioData.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo: data.personalInfo,
        socialLinks: data.socialLinks,
        aboutText: data.aboutText,
        skills: data.skills,
        projects: data.projects,
        certifications: data.certifications,
        achievements: data.achievements,
        navLinks: data.navLinks,
        isEditorOpen,
        setIsEditorOpen,
        isAuthenticated,
        setIsAuthenticated,
        verifyPin,
        changePin,
        saveAllData,
        resetToDefaults,
        generateCodeString,
        downloadDataFile,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
