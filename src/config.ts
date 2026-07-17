interface SiteConfig {
  name: string;
  title: string;
  currentCompany: string;
  currentCompanyUrl: string;
  description: string;
  profileImage: string;
  location: string;
  availability: string;
  timezone: string;
  social: {
    email: string;
    linkedin: string;
    github: string;
    twitter?: string;
  };
  resume: string;
  heroAboutMe: string;
  aboutMe: string;
  stats: { value: string; unit: string; label: string }[];
  skills: string[];
  projects: {
    name: string;
    year: string;
    impact: string;
    category: string;
    description: string;
    link: string;
    sourceLink?: string;
    skills: string[];
  }[];
  experience: {
    company: string;
    title: string;
    dateRange: string;
    current?: boolean;
    bullets: string[];
  }[];
  education: {
    school: string;
    degree: string;
    dateRange: string;
    gpa?: string;
    gpaOf?: string;
    gpaPct?: number;
    coursework?: string[];
    achievements: string[];
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Rasel Hasan",
  title: "Software Engineer",
  currentCompany: "Optimizely",
  currentCompanyUrl: "https://optimizely.com",
  description:
    "Rasel Hasan — Software Engineer focused on front-end, building scalable products and delightful user experiences with React, Next.js, and TypeScript.",
  profileImage: "/images/profile.jpg",
  location: "Dhaka, Bangladesh",
  availability: "Building modern web experiences",
  timezone: "GMT+6",
  social: {
    email: "raselhasan.cse11@gmail.com",
    linkedin: "https://linkedin.com/in/raselhasan11",
    github: "https://github.com/raselhasan111",
  },
  resume: "/files/Rasel_Hasan_Resume_Exp_2.5yrs+.pdf",
  heroAboutMe:
    "Focused on front-end — shipping production React, Next.js & TypeScript at scale for products used by **500+ companies**.",
  aboutMe:
    "I'm a Software Engineer with strong focus on **front-end development**, experienced in building scalable and maintainable web applications. I've a proven track record of delivering high-quality software products using modern technologies like React, Next.js, and TypeScript. I'm passionate about solving complex real-world problems.",
  stats: [
    { value: "3", unit: "+", label: "Years Experience" },
    { value: "500", unit: "+", label: "Companies Impacted" },
    { value: "12", unit: "+", label: "Products Delivered" },
    { value: "FE", unit: "", label: "Frontend Specialist" },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "CSS",
    "TailwindCSS",
    "Micro Front-ends",
    "AWS",
    "Git",
  ],
  projects: [
    {
      name: "Xsolla",
      year: "2025",
      impact: "Powering real-time gaming PDFs",
      category: "fintech",
      description:
        "Built a **dynamic PDF generation module** for real-time, country-specific gaming data, featuring custom visualizations and rich content rendering.",
      link: "https://xsolla.com",
      skills: ["TypeScript", "React", "React-PDF", "CSS"],
    },
    {
      name: "Pi-HR",
      year: "2024",
      impact: "Used by 500+ companies",
      category: "saas",
      description:
        "Developed features that are used by over 500 companies within a micro front-end architecture, including searchable tables and complex forms.",
      link: "https://mypihr.com",
      skills: ["React", "JavaScript", "TypeScript", "TailwindCSS", "Micro Front-ends"],
    },
    {
      name: "Poptrigg",
      year: "2024",
      impact: "Shopify app — popups & discount flows",
      category: "commerce",
      description:
        "Built a Shopify app from scratch to handle popups and discount flows, featuring a popup editor, analytics dashboards, and Shopify API integration.",
      link: "https://app.poptrigg.com",
      skills: ["TypeScript", "React", "Redux Toolkit", "TailwindCSS", "Next.js"],
    },
  ],
  experience: [
    {
      company: "Vivasoft Limited",
      title: "Software Engineer L-II",
      dateRange: "Jan 2025 — Present",
      current: true,
      bullets: [
        "Built dynamic PDF generation module for Xsolla — real-time, country-specific gaming data.",
        "Developed custom visualizations and rich content rendering with HTML tags and Unicode font support.",
        "Optimized rendering using caching, reusable hooks, and web-workers.",
      ],
    },
    {
      company: "Vivasoft Limited",
      title: "Software Engineer L-I",
      dateRange: "Jul 2023 — Dec 2024",
      bullets: [
        "Built HRM SaaS used by **500+ companies** in micro front-end architecture (Pi-HR).",
        "Boosted PDF rendering by 60% using web workers with React-PDF for Resume Builder.",
        "Built Poptrigg app from scratch with TypeScript, React, Tailwind and Shadcn.",
        "Managed state with Redux Toolkit and integrated Shopify APIs.",
      ],
    },
    {
      company: "Samsung R&D Institute Bangladesh",
      title: "Software Engineering Intern",
      dateRange: "Oct 2022 — Feb 2023",
      bullets: [
        "Worked on Samsung Notes app to enhance performance.",
        "Contributed to Samsung Smart Ring research.",
      ],
    },
  ],
  education: [
    {
      school: "Sylhet Engineering College",
      degree: "BSc (Engg) in Computer Science & Engineering",
      dateRange: "2018 — 2022",
      gpa: "3.56",
      gpaOf: "4.00",
      gpaPct: 89,
      coursework: ["Algorithms", "Web Engineering", "Distributed Systems", "DBMS"],
      achievements: [
        "**Champion** at NSU Inter-University Hackathon 2020",
        "ICPC Asia Dhaka Regional Contestant (2020, 2021)",
        "Active member of programming & robotics clubs",
      ],
    },
  ],
};
