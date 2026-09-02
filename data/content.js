/* =============================================================================
   SITE CONTENT — edit this file to update the portfolio.
   Everything on the page is rendered from this object. No HTML edits needed
   for a new job, project, skill, or link.

   HOW TO ADD A JOB
     Copy an object in `experience`, paste it at the top of the array
     (newest first). Fill company, title, start/end, bullets, tags.
     Use end: null for a current role.
     If one company has two titles (promotion / team change), add a `roles`
     array instead of a single `title` — see the I-TRACING entry.

   HOW TO ADD A PROJECT
     Copy an object in `projects`. Set category to "work" or "open".
     Put GitHub / demo URLs in `links`. Leave a link out (or "") to hide
     that button. Set featured: true to pin it near the top.

   DATES
     Use "YYYY-MM". The page formats them as "Mon YYYY".
     end: null  →  "Present"
   ============================================================================= */

window.SITE = {
  profile: {
    name: "Henry Au-Yeung",
    legalName: "Au-Yeung Ho Nam",
    headline: "Security engineer building SOAR, SIEM, and AI tooling",
    tagline: "Dev + Sec + Ops + Data Analysis",
    location: "Hong Kong",
    summary:
      "I build the tooling that lets SOC teams move faster — modular SOAR playbooks, SIEM pipelines, and AI that turns messy incident data into something an analyst can act on. Currently at I-TRACING in Hong Kong, in charge of AI development for APAC after a year on a global SOAR tooling team.",
    email: "pyc05079@gmail.com",
    phone: "+852 5537 2574",
    github: "https://github.com/Sphynx-HenryAY",
    linkedin: "https://www.linkedin.com/in/henry-au-yeung-18122815b/",
    company: "I-TRACING",
    availability: null,
  },

  nav: [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
  ],

  /* Newest first. */
  experience: [
    {
      /* Confirm start month if it was not July 2025. AI-team date is ~1 year later. */
      company: "I-TRACING",
      location: "Hong Kong",
      url: "https://i-tracing.com",
      start: "2025-07",
      end: null,
      summary: "French cybersecurity group. SOAR tooling and AI for SOC operations.",
      tags: ["SOAR", "AI", "APAC"],
      roles: [
        {
          title: "AI Developer, APAC",
          start: "2026-07",
          end: null,
          bullets: [
            "Joined the AI team after a year in tooling; in charge of AI development for APAC.",
          ],
        },
        {
          title: "Developer, Tooling",
          start: "2025-07",
          end: "2026-07",
          bullets: [
            "Member of a ~15-person global tooling team working on SOAR R&D and maintenance.",
            "Solid development progress using AI to improve day-to-day operations.",
          ],
        },
      ],
    },
    {
      company: "PwC Hong Kong",
      title: "Information Security Engineer, Senior Associate",
      location: "Hong Kong",
      url: "https://www.pwchk.com",
      start: "2022-06",
      end: "2025-06",
      summary: "Drive continuous improvement with data analysis.",
      tags: ["SOAR", "SIEM", "AI", "Data analysis"],
      bullets: [
        "Refactored SOAR development by modularizing handling actions and decoupling handling criteria, reducing dependency on a single platform.",
        "Visualized SOAR data to monitor incident trending.",
        "Improved SIEM data quality by analyzing completeness and alerting rate, and identified low-value data. Enhanced SIEM stability by analyzing ingestion statistics and storage usage.",
        "Streamlined daily operations with AI summaries, lowering the barrier of traditional playbooks for human-readable cases such as potential phishing emails and malicious websites.",
        "Coordinated resources and aligned development strategy with a cross-regional team to keep deliverables on track.",
      ],
    },
    {
      company: "Hong Kong Telecom",
      title: "Information Security Engineer",
      location: "Hong Kong",
      url: "https://www.hkt.com",
      start: "2019-04",
      end: "2022-05",
      summary: "Operation-centric development for SOC.",
      tags: ["SOAR", "SIEM", "Kubernetes", "ML detection"],
      bullets: [
        "Led digital transformation of SOC daily operations. Raised SOP quality with automation standards, clear conditions, and descriptive runbooks.",
        "Researched and designed a SOAR development framework, organized with modular design in a cyber-security sense.",
        "Built a high-availability SIEM on a self-deployed Kubernetes cluster.",
        "Developed across multiple SIEM platforms, including data ingestion and machine-learning-based detection.",
      ],
    },
    {
      company: "FringeBacker",
      title: "Full Stack Developer",
      location: "Hong Kong",
      start: "2017-05",
      end: "2019-03",
      summary: "High-concurrency website development.",
      tags: ["Full stack", "High concurrency", "Mobile"],
      bullets: [
        "Developed an online event-registration site that handled up to 10k concurrent sessions, including Standard Chartered Marathon registration without stress.",
        "Designed an event check-in mobile application, collaborated with a vendor on development, and owned device setup and on-site support.",
      ],
    },
    {
      company: "Jinan University Network Center",
      title: "Researcher",
      location: "Guangzhou, China",
      start: "2014-05",
      end: "2016-04",
      summary: "Software plagiarism detection.",
      tags: ["Research", "Algorithms"],
      bullets: [
        "Researched and implemented a plagiarism-detection algorithm with 99× performance while keeping 85% accuracy, making real-time detection practical.",
      ],
    },
  ],

  /* featured: true pins a card higher. category is "work" or "open". */
  projects: [
    {
      title: "AI for operations improvement",
      category: "work",
      featured: true,
      year: "2025",
      org: "I-TRACING",
      description:
        "Solid development progress on using AI to improve SOC and SOAR day-to-day operations.",
      tags: ["SOAR", "AI"],
      links: {},
    },
    {
      title: "Modular SOAR platform",
      category: "work",
      featured: true,
      year: "2022–2025",
      org: "PwC Hong Kong",
      description:
        "Refactored SOAR development by splitting handling actions from handling criteria, so playbooks were no longer locked to a single platform. Added SOAR data visualization for incident trending and AI summaries for phishing and malicious-site cases.",
      tags: ["SOAR", "XSOAR", "Phantom", "AI"],
      links: {},
    },
    {
      title: "High-availability SIEM on Kubernetes",
      category: "work",
      featured: true,
      year: "2019–2022",
      org: "Hong Kong Telecom",
      description:
        "Self-deployed Kubernetes cluster running a high-availability SIEM, plus ingestion and machine-learning detection across multiple SIEM platforms. Designed a modular SOAR framework for SOC operations.",
      tags: ["SIEM", "Kubernetes", "Elastic", "Splunk"],
      links: {},
    },
    {
      title: "PromptClick",
      category: "open",
      featured: true,
      year: "2026",
      description:
        "Vision-driven Android agent. Describe a goal; it screenshots the screen, a model decides the next tap or swipe, and an accessibility service performs it. Supports OpenRouter vision models or on-device Gemma 3n, plus recorded macros.",
      tags: ["Kotlin", "Android", "AI agent"],
      links: {
        github: "https://github.com/Sphynx-HenryAY/PromptClick",
      },
    },
    {
      title: "High-concurrency event registration",
      category: "work",
      featured: false,
      year: "2017–2019",
      org: "FringeBacker",
      description:
        "Online event-registration website that handled up to 10k concurrent sessions, including Standard Chartered Marathon. Designed a check-in mobile app and ran on-site device support.",
      tags: ["Full stack", "Concurrency"],
      links: {},
    },
    {
      title: "scrapy-compose",
      category: "open",
      featured: false,
      year: "2018",
      description:
        "Scrapy extension for defining crawlers in YAML so spider projects can be described without writing Python for every site.",
      tags: ["Python", "Scrapy", "YAML"],
      links: {
        github: "https://github.com/Sphynx-HenryAY/scrapy-compose",
      },
    },
    {
      title: "Crystal of Atlan — dungeon planner",
      category: "open",
      featured: false,
      year: "2026",
      description: "Weekly dungeon gold planner for Crystal of Atlan.",
      tags: ["TypeScript"],
      links: {
        github: "https://github.com/Sphynx-HenryAY/coa-dungeon-planner",
        demo: "https://sphynx-henryay.github.io/coa-dungeon-planner/",
      },
    },
    {
      title: "Crystal of Atlan — damage calculator",
      category: "open",
      featured: false,
      year: "2026",
      description: "Damage calculator for Crystal of Atlan builds.",
      tags: ["TypeScript"],
      links: {
        github: "https://github.com/Sphynx-HenryAY/coa-dmg-calc",
        demo: "https://sphynx-henryay.github.io/coa-dmg-calc/",
      },
    },
    {
      title: "HdSim — fast malware detection",
      category: "work",
      featured: false,
      year: "2015",
      org: "Jinan University FYP",
      description:
        "Final-year project: fast malware detection. Provincial research project.",
      tags: ["Research", "Malware"],
      links: {},
    },
    {
      title: "Real-time plagiarism detection",
      category: "work",
      featured: false,
      year: "2014–2016",
      org: "Jinan University Network Center",
      description:
        "Plagiarism algorithm with 99× performance at 85% accuracy, making real-time detection practical.",
      tags: ["Research", "Algorithms"],
      links: {},
    },
  ],

  /* Domain mapping from the CV. Add a string to an array to show a new chip. */
  skills: {
    Dev: [
      "Python",
      "JavaScript",
      "Kotlin",
      "Java",
      "HTML",
      "CSS",
      "Django",
      "FastAPI",
      "MongoDB",
      "Postgres",
      "Scrapy",
      "Selenium",
      "Git",
    ],
    Sec: [
      "XSOAR",
      "Phantom",
      "MITRE ATT&CK",
      "PICERL",
      "Elastic Security",
      "Splunk ES",
      "Wazuh",
      "Microsoft Sentinel",
    ],
    Ops: ["Docker", "Kubernetes", "Ansible", "Logic Apps", "n8n", "UiPath"],
    Data: ["ELKB", "Splunk", "Grafana", "KNIME"],
  },

  education: [
    {
      school: "Jinan University",
      location: "Guangzhou, China",
      degree: "Bachelor of Science, Computer Science & Technology",
      start: "2011-09",
      end: "2015-07",
      note: "FYP: HdSim — Fast Malware Detection (provincial research project)",
    },
  ],

  certifications: [
    { name: "PCSAE", detail: "Palo Alto Networks Certified Security Automation Engineer" },
    { name: "GSEC", detail: "GIAC Security Essentials" },
    { name: "Elastic Engineer", detail: "Elastic" },
    { name: "Splunk User", detail: "Splunk" },
    { name: "AZ-900", detail: "Microsoft Azure Fundamentals" },
  ],

  languages: [
    { name: "Cantonese", level: "Native" },
    { name: "Mandarin", level: "Native" },
    { name: "English", level: "Proficient" },
  ],

  hobbies: ["3D printing", "Investing", "Spanish", "Basketball"],
};
