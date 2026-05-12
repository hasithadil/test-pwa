// data/portfolio.ts
// Central source of truth for the portfolio website.
// Edit this file to update content across all sections.

export const personalInfo = {
  name: "Hasitha Dilshan",
  title: "Full Stack Software Engineer",
  tagline: "Building enterprise-grade applications with Java, Spring Boot, and modern web technologies.",
  location: "Colombo, Sri Lanka",
  email: "hasithadilshan15706@gmail.com",
  phone: "+94 70 421 4960",
  resumeUrl: "/cv.pdf",
  profileImage: "/profile.png",
  socials: {
    github: "https://github.com/hasithadil",
    linkedin: "https://linkedin.com/in/hasitha-dilshan-971b191bb",
    email: "mailto:hasithadilshan15706@gmail.com",
  },
};

export const profileSummary =
  "Full Stack Software Engineer with professional experience building enterprise-grade applications in a FinTech domain. Strong foundation in backend engineering, RESTful API design, and scalable system development. Experienced in applying object-oriented principles, design patterns, and clean coding practices.";

export const typingPhrases = [
  "Full Stack Software Engineer",
  "Backend Specialist",
];

export const education = [
  {
    institution: "University of Colombo School of Computing (UCSC)",
    degree: "BSc in Computer Science",
    details: "GPA: 3.1 / 4.0",
    location: "Sri Lanka",
    period: "2023 — 2026",
  },
  {
    institution: "Embilipitiya President College",
    degree: "GCE Advanced Level (Physical Science)",
    details: "Combined Mathematics — A, Chemistry — A, Physics — A",
    location: "Sri Lanka",
    period: "2021",
  },
];

export const experience = [
  {
    company: "IronOne Technologies Pvt Ltd",
    role: "Software Engineer Intern",
    project: "Atrad — Wealth Management Platform",
    location: "On Site, Sri Lanka",
    period: "Nov 2025 — Present",
    description:
      "Working on an enterprise wealth management platform serving the FinTech domain.",
    highlights: [
      "Developed and maintained backend services for an enterprise wealth management platform using Java and Quarkus following clean architecture and modular design principles.",
      "Designed and implemented RESTful APIs focusing on scalability, maintainability, and secure data handling.",
      "Optimized SQL queries and improved API responsiveness by reducing unnecessary data retrieval and enhancing query efficiency by 30%.",
      "Integrated Keycloak-based authentication and authorization for secure user access management and role-based access control.",
      "Built responsive frontend components using React.js and TypeScript integrated with backend services.",
      "Managed database schema versioning and migrations using Flyway to support reliable and maintainable deployments.",
      "Collaborated with cross-functional teams in an Agile (Scrum) environment to deliver production-ready features.",
      "Participated in code reviews, debugging, and technical discussions to improve code quality and development standards.",
    ],
  },
];

export const projects = [
  {
    id: "healthcare-microservices",
    title: "Healthcare Microservices Platform",
    year: "2026",
    description:
      "Microservices-based healthcare system with independent services for patient management, billing, authentication, and analytics. Integrated Apache Kafka for event-driven communication and deployed on AWS.",
    highlights: [
      // "Architected microservices with independent bounded contexts",
      // "Event-driven async communication via Apache Kafka",
      // "Centralized routing & security with API Gateway",
      // "Containerized deployment on AWS with Docker",
    ],
    technologies: [
      "Spring Boot",
      "Apache Kafka",
      "Docker",
      "AWS",
      "Spring Security",
      "JWT",
      "PostgreSQL",
    ],
    githubUrl:
      "https://github.com/hasithadil/patient-management-microservice-BE",
    demoUrl: null,
    featured: true,
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    year: "2025",
    description:
      "Full-stack inventory and order management system for a chemical distribution company. Supports product tracking, stock management, and role-based operational workflows.",
    highlights: [
      // "Scalable RESTful APIs for inventory & order management",
      // "Optimized PostgreSQL schema for transactional consistency",
      // "Role-based access control (admin, sales, warehouse)",
      // "Responsive React frontend with real-time updates",
    ],
    technologies: ["Spring Boot", "React", "PostgreSQL", "REST APIs", "RBAC"],
    githubUrl: "https://github.com/dimuthuh28/LoraChemicals-Backend",
    demoUrl: null,
    featured: true,
  },
  {
    id: "farmlink",
    title: "FarmLink — Agricultural Marketplace",
    year: "2024",
    description:
      "Web-based agricultural marketplace platform connecting farmers, buyers, consultants, and delivery partners. Built with MVC architecture and integrated payment processing.",
    highlights: [
      // "MVC architecture for modularity and maintainability",
      // "Multi-role dashboards for diverse stakeholders",
      // "Google Maps API for location-based services",
      // "PayHere payment gateway integration",
    ],
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "Google Maps API",
      "PayHere",
    ],
    githubUrl: null,
    demoUrl: null,
    featured: false,
  },
];

export const skills = {
  Languages: ["Java", "JavaScript", "TypeScript", "Python"],
  Backend: [
    "Spring Boot",
    "Quarkus",
    "REST APIs",
    "Microservices",
    "Apache Kafka",
    "Node.js",
  ],
  Frontend: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  Databases: ["PostgreSQL", "MySQL", "SQL"],
  "Cloud & DevOps": [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "GitHub Actions",
    "Linux",
  ],
  "Tools & Testing": ["Git", "Maven", "Postman", "JUnit", "IntelliJ IDEA"],
  Concepts: [
    "OOP",
    "Design Patterns",
    "Clean Architecture",
    "Data Structures",
    "Agile (Scrum)",
  ],
};

export const softSkills = [
  {
    category: "Communication & Collaboration",
    skills: [
      "Cross-functional teamwork",
      "Technical discussions",
      "Code reviews",
      "Knowledge sharing",
    ],
  },
  {
    category: "Problem Solving",
    skills: [
      "Analytical thinking",
      "Debugging",
      "Root cause analysis",
      "Attention to detail",
    ],
  },
  {
    category: "Ownership & Delivery",
    skills: [
      "Accountability",
      "Time management",
      "Meeting deadlines",
      "Production-ready development",
    ],
  },
  {
    category: "Growth Mindset",
    skills: [
      "Fast learning",
      "Adaptability",
      "Continuous improvement",
      "Openness to feedback",
    ],
  },
];

export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: "aws",
  },
  {
    name: "Docker for Beginners",
    issuer: "KodeKloud",
    icon: "docker",
  },
];

export const activities = [
  {
    organization: "CompSoc — UCSC",
    role: "Member, Web Team",
  },
  {
    organization: "IEEE Student Branch",
    role: "Member",
  },
];

// Theme constants used by components
export const theme = {
  accent: "#00d9ff",
  accentSecondary: "#0066ff",
  background: "#0a0e1a",
  foreground: "#ffffff",
  muted: "#8b949e",
};