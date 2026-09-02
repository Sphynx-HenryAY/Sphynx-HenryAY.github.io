(() => {
  const site = window.SITE;
  if (!site) return;

  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const DOMAIN_CLASS = { Dev: "dev", Sec: "sec", Ops: "ops", Data: "data", AI: "ai" };

  function formatMonth(value) {
    if (!value) return "Present";
    const [year, month] = value.split("-");
    const m = Number(month);
    return `${MONTHS[m - 1] || month} ${year}`;
  }

  function formatRange(start, end) {
    return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value == null || value === false) return;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on") && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else node.setAttribute(key, value);
    });
    children.flat().filter(Boolean).forEach((child) => {
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function linkButtons() {
    const { email, phone, github, linkedin } = site.profile;
    return [
      el("a", { class: "btn primary", href: `mailto:${email}`, text: "Email" }),
      phone ? el("a", { class: "btn", href: `tel:${phone.replace(/\s+/g, "")}`, text: phone }) : null,
      el("a", { class: "btn", href: linkedin, target: "_blank", rel: "noopener noreferrer", text: "LinkedIn" }),
      el("a", { class: "btn", href: github, target: "_blank", rel: "noopener noreferrer", text: "GitHub" }),
    ].filter(Boolean);
  }

  function tags(list) {
    if (!list || !list.length) return null;
    return el("div", { class: "tags" }, list.map((t) => el("span", { class: "tag", text: t })));
  }

  function bullets(items) {
    if (!items || !items.length) return null;
    return el("ul", {}, items.map((item) => el("li", { text: item })));
  }

  function renderNav() {
    const nav = document.getElementById("site-nav");
    site.nav.forEach((item) => {
      nav.appendChild(el("a", { href: `#${item.id}`, text: item.label }));
    });
    nav.appendChild(el("a", { href: "#contact", text: "Contact" }));
  }

  function renderHero() {
    const p = site.profile;
    document.getElementById("hero-eyebrow").textContent =
      `${p.location}  ·  ${p.company}`;
    document.getElementById("hero-name").textContent = p.name;
    document.getElementById("hero-legal").textContent = p.legalName;
    document.getElementById("hero-headline").textContent = p.headline;
    document.getElementById("hero-summary").textContent = p.summary;
    const actions = document.getElementById("hero-actions");
    linkButtons().forEach((btn) => actions.appendChild(btn));

    const grid = document.getElementById("domain-grid");
    Object.entries(site.skills).forEach(([domain, items]) => {
      const cls = DOMAIN_CLASS[domain] || "dev";
      grid.appendChild(
        el("div", { class: `domain-card ${cls}` }, [
          el("div", { class: "count", text: String(items.length) }),
          el("div", { class: "label", text: domain }),
          el("div", { class: "preview", text: items.slice(0, 3).join(" · ") }),
        ])
      );
    });
  }

  function renderJob(job) {
    const companyHeading = job.url
      ? el("h3", {}, [el("a", { href: job.url, target: "_blank", rel: "noopener noreferrer", text: job.company })])
      : el("h3", { text: job.company });

    const node = el("article", { class: "job" }, [
      el("div", { class: "job-top" }, [
        companyHeading,
        el("span", { class: "job-dates", text: formatRange(job.start, job.end) }),
      ]),
    ]);

    if (job.roles && job.roles.length) {
      if (job.summary) node.appendChild(el("p", { class: "job-summary", text: job.summary }));
      job.roles.forEach((role) => {
        node.appendChild(
          el("div", { class: "role" }, [
            el("div", { class: "job-top" }, [
              el("h4", { text: role.title }),
              el("span", { class: "job-dates", text: formatRange(role.start, role.end) }),
            ]),
            bullets(role.bullets),
          ])
        );
      });
    } else {
      if (job.title) node.appendChild(el("p", { class: "job-title", text: job.title }));
      if (job.summary) node.appendChild(el("p", { class: "job-summary", text: job.summary }));
      const list = bullets(job.bullets);
      if (list) node.appendChild(list);
    }

    const tagRow = tags(job.tags);
    if (tagRow) node.appendChild(tagRow);
    return node;
  }

  function renderExperience() {
    const root = document.getElementById("experience-list");
    site.experience.forEach((job) => root.appendChild(renderJob(job)));
  }

  function projectLinks(links) {
    if (!links) return null;
    const items = [];
    if (links.github) {
      items.push(el("a", { href: links.github, target: "_blank", rel: "noopener noreferrer", text: "GitHub" }));
    }
    if (links.demo) {
      items.push(el("a", { href: links.demo, target: "_blank", rel: "noopener noreferrer", text: "Live demo" }));
    }
    if (links.url) {
      items.push(el("a", { href: links.url, target: "_blank", rel: "noopener noreferrer", text: "Link" }));
    }
    return items.length ? el("div", { class: "project-links" }, items) : null;
  }

  function renderProject(project) {
    const categoryLabel = project.category === "open" ? "Open source" : "Work";
    const node = el("article", { class: `project${project.featured ? " featured" : ""}` }, [
      el("div", { class: "project-meta" }, [
        el("span", { text: categoryLabel }),
        el("span", { text: [project.year, project.org].filter(Boolean).join(" · ") }),
      ]),
      el("h3", { text: project.title }),
      el("p", { text: project.description }),
    ]);
    const tagRow = tags(project.tags);
    if (tagRow) node.appendChild(tagRow);
    const links = projectLinks(project.links);
    if (links) node.appendChild(links);
    return node;
  }

  function sortedProjects() {
    return [...site.projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  function renderProjects(filter = "all") {
    const root = document.getElementById("project-list");
    root.innerHTML = "";
    sortedProjects()
      .filter((p) => filter === "all" || p.category === filter)
      .forEach((p) => root.appendChild(renderProject(p)));
  }

  function renderFilters() {
    const root = document.getElementById("project-filters");
    const options = [
      { id: "all", label: "All" },
      { id: "work", label: "Work" },
      { id: "open", label: "Open source" },
    ];
    options.forEach((opt, i) => {
      root.appendChild(
        el("button", {
          class: "filter-btn",
          type: "button",
          role: "tab",
          "aria-selected": i === 0 ? "true" : "false",
          text: opt.label,
          onClick: (event) => {
            root.querySelectorAll(".filter-btn").forEach((btn) => btn.setAttribute("aria-selected", "false"));
            event.currentTarget.setAttribute("aria-selected", "true");
            renderProjects(opt.id);
          },
        })
      );
    });
  }

  function renderSkills() {
    const root = document.getElementById("skill-list");
    Object.entries(site.skills).forEach(([domain, items]) => {
      const cls = DOMAIN_CLASS[domain] || "dev";
      root.appendChild(
        el("div", { class: `skill-col ${cls}` }, [
          el("h3", { text: domain }),
          el("ul", {}, items.map((item) => el("li", { text: item }))),
        ])
      );
    });
  }

  function renderAbout() {
    const edu = document.getElementById("education-list");
    site.education.forEach((item) => {
      edu.appendChild(
        el("div", { class: "edu-item" }, [
          el("h4", { text: item.school }),
          el("p", { class: "job-title", text: item.degree }),
          el("p", { class: "meta", text: `${item.location} · ${formatRange(item.start, item.end)}` }),
          item.note ? el("p", { class: "job-summary", text: item.note }) : null,
        ])
      );
    });

    const certs = document.getElementById("cert-list");
    site.certifications.forEach((c) => {
      certs.appendChild(
        el("li", {}, [
          el("strong", { text: c.name }),
          document.createTextNode(` — ${c.detail}`),
        ])
      );
    });

    const langs = document.getElementById("lang-list");
    site.languages.forEach((l) => {
      langs.appendChild(el("li", { text: `${l.name} · ${l.level}` }));
    });

    document.getElementById("hobby-list").textContent = site.hobbies.join(" · ");
  }

  function renderContact() {
    const root = document.getElementById("contact-actions");
    linkButtons().forEach((btn) => root.appendChild(btn.cloneNode(true)));
    document.getElementById("footer-copy").textContent =
      `© ${new Date().getFullYear()} ${site.profile.name}`;
    document.title = `${site.profile.name} — Security Engineer`;
  }

  function bindNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  renderNav();
  renderHero();
  renderExperience();
  renderFilters();
  renderProjects();
  renderSkills();
  renderAbout();
  renderContact();
  bindNav();
})();
