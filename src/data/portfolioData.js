// ============================================================
// PORTFOLIO DATA — Edit this file to customize your portfolio
// Replace all YOUR_* placeholders with your actual information
// ============================================================

export const personalInfo = {
  name: "ARMURI PRADEEP",
  firstName: "PRADEEP",
  title: "CSE AI Student | Developer | AI Enthusiast",
  description:
    "Passionate about building intelligent systems and solving real-world problems using code and AI.",
  email: "YOUR_EMAIL@example.com",
  phone: "YOUR_PHONE",
  location: "YOUR_CITY, India",
  education: "B.Tech CSE (AI), YOUR_UNIVERSITY",
  careerInterest: "AI/ML Engineer & Full-Stack Developer",
  profileImage: null, // Replace with "/profile.jpg" after adding your photo to /public
  resumeFile: "/resume.pdf",
};

export const socialLinks = {
  github: "https://github.com/YOUR_GITHUB_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_LINKEDIN_USERNAME",
  email: "mailto:YOUR_EMAIL@example.com",
  instagram: "https://instagram.com/YOUR_INSTAGRAM_USERNAME",
};

export const aboutText = [
  "I am a Computer Science and Engineering student specializing in Artificial Intelligence. I enjoy working on projects that combine programming, machine learning, data structures, and web technologies.",
  "I am interested in developing practical software solutions and intelligent systems that solve real-world problems.",
];

export const skills = {
  "Programming Languages": [
    { name: "C", icon: "FileCode" },
    { name: "C++", icon: "FileCode2" },
    { name: "Java", icon: "Coffee" },
    { name: "Python", icon: "Terminal" },
    { name: "SQL", icon: "Database" },
  ],
  "AI / Machine Learning": [
    { name: "Machine Learning", icon: "Brain" },
    { name: "Deep Learning", icon: "Cpu" },
    { name: "TensorFlow", icon: "Layers" },
    { name: "Scikit-learn", icon: "FlaskConical" },
    { name: "Pandas", icon: "Table" },
    { name: "NumPy", icon: "Calculator" },
  ],
  "Web Technologies": [
    { name: "HTML", icon: "Code" },
    { name: "CSS", icon: "Palette" },
    { name: "JavaScript", icon: "Braces" },
    { name: "React", icon: "Atom" },
    { name: "REST APIs", icon: "Globe" },
  ],
  "Tools & Platforms": [
    { name: "Git", icon: "GitBranch" },
    { name: "GitHub", icon: "Github" },
    { name: "VS Code", icon: "MonitorSmartphone" },
    { name: "Firebase", icon: "Flame" },
    { name: "MySQL", icon: "Database" },
    { name: "Google Colab", icon: "Cloud" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Lung Cancer Classification Using SVM and KNN",
    description:
      "A machine-learning project comparing SVM and KNN algorithms for classification of lung cancer data with high accuracy.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "SVM", "KNN"],
    github: "https://github.com/YOUR_GITHUB_USERNAME/lung-cancer-classification",
    liveDemo: "#",
    color: "blue",
  },
  {
    id: 2,
    title: "Smart Irrigation System",
    description:
      "An IoT-based smart irrigation system designed to monitor soil conditions and automate irrigation for efficient water usage.",
    technologies: ["Python", "IoT", "Sensors", "Firebase"],
    github: "https://github.com/YOUR_GITHUB_USERNAME/smart-irrigation",
    liveDemo: "#",
    color: "green",
  },
  {
    id: 3,
    title: "Campus Placement Management System",
    description:
      "A Java-based system for managing student records, recruitment information, resumes, skills, and placement activities.",
    technologies: ["Java", "OOP", "MySQL"],
    github: "https://github.com/YOUR_GITHUB_USERNAME/placement-management",
    liveDemo: "#",
    color: "purple",
  },
  {
    id: 4,
    title: "AI Assistant",
    description:
      "An intelligent assistant designed to answer user queries using NLP and AI/LLM technologies with conversational abilities.",
    technologies: ["Python", "NLP", "LLM", "APIs"],
    github: "https://github.com/YOUR_GITHUB_USERNAME/ai-assistant",
    liveDemo: "#",
    color: "cyan",
  },
];

export const certifications = [
  {
    name: "Oracle Certification",
    issuer: "Oracle",
    link: "#YOUR_CERTIFICATE_LINK",
    placeholder: true,
  },
  {
    name: "NPTEL Certification",
    issuer: "NPTEL / IIT",
    link: "#YOUR_CERTIFICATE_LINK",
    placeholder: true,
  },
  {
    name: "Google AI Certification",
    issuer: "Google",
    link: "#YOUR_CERTIFICATE_LINK",
    placeholder: true,
  },
  {
    name: "IBM Certification",
    issuer: "IBM",
    link: "#YOUR_CERTIFICATE_LINK",
    placeholder: true,
  },
  {
    name: "HackerRank Certification",
    issuer: "HackerRank",
    link: "#YOUR_CERTIFICATE_LINK",
    placeholder: true,
  },
];

export const achievements = [
  {
    title: "Hackathon Participation",
    description: "Participated in hackathons and built innovative projects under time constraints.",
    icon: "Trophy",
    placeholder: true,
  },
  {
    title: "Technical Events",
    description: "Engaged in various technical events and workshops in college and beyond.",
    icon: "Calendar",
    placeholder: true,
  },
  {
    title: "Project Presentations",
    description: "Presented AI and software development projects at academic and technical forums.",
    icon: "Presentation",
    placeholder: true,
  },
  {
    title: "Coding Activities",
    description: "Active in competitive programming and coding challenges on online platforms.",
    icon: "Code",
    placeholder: true,
  },
  {
    title: "Academic Achievements",
    description: "Maintained strong academic performance throughout the program.",
    icon: "GraduationCap",
    placeholder: true,
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];
