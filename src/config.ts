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
    subject?: string;
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
    "Rasel Hasan — Software Engineer at Optimizely building customer-facing demos of Optimizely One, the AI-powered platform behind 10,000+ brands like Nike & Zoom.",
  profileImage: "/images/profile.jpg",
  location: "Dhaka, Bangladesh",
  availability: "Engineering customer-facing product demos",
  timezone: "GMT+6",
  social: {
    email: "raselhasan.cse11@gmail.com",
    linkedin: "https://linkedin.com/in/raselhasan11",
    github: "https://github.com/raselhasan111",
  },
  resume: "/files/Rasel_Hasan_Resume_Exp_3yrs+.pdf",
  heroAboutMe:
    "I engineer customer-facing demos of **Optimizely One** — the AI-powered platform behind **10,000+ brands** like Nike, PayPal, and Zoom — turning real customer use cases into working software.",
  aboutMe:
    "At Vivasoft I built frontend that had to hold up in production — schema-based form architecture, PDF pipelines on web workers, micro front-ends serving **500+ companies**. Now I'm a Demo Engineer at Optimizely, where the customer is in the room: I turn real use cases into working demos of **Optimizely One**, partnering daily with Product, Engineering, and GTM. That seat is deliberate — I'm building a product mindset from the engineering side, growing toward leadership by owning outcomes, not just code.",
  stats: [
    { value: "3", unit: "+", label: "Years Experience" },
    { value: "10", unit: "k+", label: "Brands on Optimizely One" },
    { value: "500", unit: "+", label: "Companies on Pi-HR" },
    { value: "FE", unit: "", label: "Frontend Specialist" },
  ],
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Astro",
    "Svelte",
    "GraphQL",
    "Tailwind CSS",
    "Redux Toolkit",
    "Node.js",
    "REST APIs",
    "Micro Frontends",
  ],
  projects: [
    {
      name: "Xsolla",
      year: "2025",
      impact: "Live gaming data → downloadable PDF reports",
      category: "fintech",
      description:
        "Dynamic PDF generation module rendering real-time, country-specific gaming data into multi-page exportable reports — custom charts, Unicode and rich-text support, optimized with **web workers** and caching to match the Figma design system.",
      link: "https://xsolla.com",
      skills: ["TypeScript", "React", "React-PDF", "Web Workers", "CSS"],
    },
    {
      name: "Pi-HR",
      year: "2024",
      impact: "HRM SaaS for **500+ companies**",
      category: "saas",
      description:
        "HRM platform on a **micro front-end** architecture — searchable, sortable data tables, complex forms with layered validation, and REST API integrations across the product.",
      link: "https://mypihr.com",
      skills: ["React", "TypeScript", "Micro Frontends", "REST APIs"],
    },
    {
      name: "Poptrigg",
      year: "2024",
      impact: "Shopify popups & discounts, from scratch",
      category: "commerce",
      description:
        "Popup and discount platform built from scratch — live-preview popup editors, complex forms with React Hook Form and Zod, Shopify and custom APIs via RTK Query, and **Apex-charts** analytics dashboards.",
      link: "https://app.poptrigg.com",
      skills: ["TypeScript", "React", "Tailwind", "Shadcn", "RTK Query"],
    },
  ],
  experience: [
    {
      company: "Optimizely",
      title: "Demo Engineer II",
      dateRange: "May 2026 — Present",
      current: true,
      bullets: [
        "Engineer customer-facing demos of **Optimizely One**, the AI-powered digital experience platform used by **10,000+ brands** including Nike, PayPal, and Zoom.",
        "Build and maintain demo environments in React, Next.js, Astro, and Svelte — translating real customer use cases into interactive, technically accurate experiences.",
        "Configure agentic marketing workflows with **Opal** — personalization, experimentation, generative AI — to demonstrate measurable business outcomes in live and recorded demos.",
        "Partner with Product, Engineering, and GTM teams across global locations to keep demos aligned with product roadmap and sales strategy.",
      ],
    },
    {
      company: "Vivasoft Limited",
      title: "Software Engineer L-II",
      dateRange: "Jan 2025 — Feb 2026",
      bullets: [
        "Built the frontend for **Novara**, an AI recruitment platform — schema-based resume builder with real-time preview, AI resume evaluation, multi-criteria job discovery.",
        "Shipped **Xsolla World Map**'s PDF module — live, country-specific gaming data rendered into multi-page reports with custom charts and Unicode support.",
        "Optimized report generation with caching, reusable hooks, and **web workers**, aligning the output with the Figma design system.",
        "Refactored Xsolla's customization demo — mobile-friendly stepper, auto-scroll hero carousel, and an accessible, theme-aware header and footer with API integration.",
      ],
    },
    {
      company: "Vivasoft Limited",
      title: "Software Engineer L-I",
      dateRange: "Jul 2023 — Dec 2024",
      bullets: [
        "Built searchable tables and complex validated forms for **Pi-HR**, an HRM SaaS serving **500+ companies** on a micro front-end architecture.",
        "Boosted Resume Builder's PDF rendering by **60%** with web workers and React-PDF; shipped a Quill-to-PDF parser and Next-Auth roles.",
        "Built **Poptrigg** from scratch — Shopify popups and discount flows with live previews, popup editors, and Apex-charts analytics dashboards.",
      ],
    },
    {
      company: "Samsung R&D Institute Bangladesh",
      title: "Software Engineering Intern",
      dateRange: "Oct 2022 — Feb 2023",
      bullets: [
        "Worked on **Samsung Notes** app to enhance performance.",
        "Passed Samsung's global **SWC Advanced Level** coding test.",
        "Contributed to **Samsung Smart Ring** research.",
      ],
    },
  ],
  education: [
    {
      school: "Sylhet Engineering College",
      degree: "BSc (Engg)",
      subject: "Computer Science & Engineering",
      dateRange: "2018 — 2022",
      coursework: ["Algorithms", "Web Engineering", "Distributed Systems", "DBMS"],
      achievements: [
        "Champion, **NSU Inter-University Hackathon 2020**",
        "ICPC Asia Dhaka Regionals, **2020 & 2021**",
        "**1600+** problems solved; CodeChef max rating **1907**",
        "Published at **ICERIE 2023** — contest rating prediction, **90%** accuracy",
      ],
    },
  ],
};
