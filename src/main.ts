import {
  portfolio,
  type Article,
  type Capability,
  type Project,
  type SpeakingEvent
} from './data/portfolio';
import './styles.css';

type IconName =
  | 'arrow'
  | 'arrowUpRight'
  | 'menu'
  | 'close'
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'arrowUp'
  | 'fileText'
  | 'mapPin';

const icon = (name: IconName, className = ''): string => {
  const attrs = `class="icon ${className}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"`;
  const paths: Record<IconName, string> = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M7 7h10v10"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    mapPin: '<path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/>',
    github:
      '<path d="M15 22v-3.9c.04-1.1-.42-1.86-1.2-2.4 3.86-.43 7.92-1.9 7.92-8.56a6.68 6.68 0 0 0-1.78-4.64 6.2 6.2 0 0 0-.12-4.58S18.36-.1 15 2.14a15.1 15.1 0 0 0-6 0C5.64-.1 4.18-.08 4.18-.08a6.2 6.2 0 0 0-.12 4.58 6.68 6.68 0 0 0-1.78 4.64c0 6.64 4.06 8.13 7.9 8.57-.74.5-1.16 1.38-1.16 2.43V22"/><path d="M8 18c-3.5 1.5-3.5-1.5-4.9-1.5"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><path d="M4 4.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>'
  };
  return `<svg ${attrs}>${paths[name]}</svg>`;
};

const sectionLink = (id: string, label: string) =>
  `<a class="nav-link" href="#${id}" data-section-link="${id}">${label}</a>`;

const hasSpeakingEvents = portfolio.speakingEvents.length > 0;
const hasArticles = portfolio.articles.length > 0;

type NavItem = { id: string; label: string };

const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'what-i-do', label: 'What I Do' },
  ...(hasSpeakingEvents ? [{ id: 'speaking', label: 'Speaking' }] : []),
  { id: 'projects', label: 'Projects' },
  ...(hasArticles ? [{ id: 'articles', label: 'Articles' }] : []),
  { id: 'contact', label: 'Contact' }
];

type SectionKey = 'about' | 'skills' | 'what-i-do' | 'speaking' | 'projects' | 'articles' | 'contact';

const activeSections: SectionKey[] = [
  'about',
  'skills',
  'what-i-do',
  ...(hasSpeakingEvents ? (['speaking'] as const) : []),
  'projects',
  ...(hasArticles ? (['articles'] as const) : []),
  'contact'
];

const getSectionMeta = (key: SectionKey) => {
  const index = activeSections.indexOf(key);
  return {
    number: String(index + 1).padStart(2, '0'),
    tintClass: index % 2 === 0 ? 'section-tint' : ''
  };
};

const renderCapability = (capability: Capability) => `
  <article class="capability-item reveal-on-scroll">
    <span class="capability-index">${capability.index}</span>
    <div class="capability-content">
      <h3>${capability.title}</h3>
      <p>${capability.description}</p>
    </div>
  </article>
`;

const renderSpeakingEvent = (event: SpeakingEvent) => `
  <article class="speaking-item reveal-on-scroll">
    <div class="speaking-meta">
      <time class="speaking-date">${event.date}</time>
      <span class="speaking-venue">${event.venue}</span>
    </div>
    <div class="speaking-body">
      <h3>${event.title}</h3>
      <p>${event.description}</p>
    </div>
  </article>
`;

const renderProject = (project: Project, index: number) => {
  const hasImage = Boolean(project.screenshot);
  const links = [
    project.liveUrl
      ? `<a class="text-link" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live project ${icon('arrowUpRight')}</a>`
      : '',
    project.githubUrl
      ? `<a class="text-link" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub repository ${icon('arrowUpRight')}</a>`
      : ''
  ]
    .filter(Boolean)
    .join('');

  return `<article class="project-card reveal-on-scroll">
    <div class="project-media ${hasImage ? 'has-image' : ''}">
      ${
        hasImage
          ? `<img src="${project.screenshot}" alt="${project.name} project preview" loading="lazy" referrerpolicy="no-referrer" />`
          : `<div class="project-media-placeholder"><span>${project.name}</span></div>`
      }
      <span class="media-index">${String(index + 1).padStart(2, '0')}</span>
    </div>
    <div class="project-copy">
      <div class="project-header">
        <p class="eyebrow">Featured project</p>
        <h3>${project.name}</h3>
        <p class="project-description">${project.description}</p>
      </div>
      ${
        project.problemSolved
          ? `<div class="project-detail-block">
              <h4>Problem it solves</h4>
              <p>${project.problemSolved}</p>
            </div>`
          : ''
      }
      ${
        project.features.length
          ? `<div class="project-detail-block">
              <h4>Key features</h4>
              <ul class="project-features">${project.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
            </div>`
          : ''
      }
      <div class="project-meta">
        <ul class="tag-list" aria-label="Technologies used">${project.stack.map((item) => `<li>${item}</li>`).join('')}</ul>
        ${links ? `<div class="project-links">${links}</div>` : ''}
      </div>
    </div>
  </article>`;
};

const renderArticle = (article: Article) => `
  <article class="article-card reveal-on-scroll">
    <time class="article-date">${article.date}</time>
    <h3>${article.title}</h3>
    <p>${article.description}</p>
    <a class="text-link" href="${article.url}" target="_blank" rel="noopener noreferrer">
      Read More ${icon('arrowUpRight')}
    </a>
  </article>
`;

type VerifiedContactItem = {
  label: string;
  value: string;
  href: string;
  iconName: IconName;
  external: boolean;
};

const getVerifiedContacts = (): VerifiedContactItem[] => {
  const items: VerifiedContactItem[] = [];
  if (portfolio.contact.email) {
    items.push({
      label: 'Email',
      value: portfolio.contact.email,
      href: `mailto:${portfolio.contact.email}`,
      iconName: 'mail',
      external: false
    });
  }
  if (portfolio.contact.github) {
    items.push({
      label: 'GitHub',
      value: portfolio.contact.github,
      href: portfolio.contact.github,
      iconName: 'github',
      external: true
    });
  }
  if (portfolio.contact.linkedin) {
    items.push({
      label: 'LinkedIn',
      value: portfolio.contact.linkedin,
      href: portfolio.contact.linkedin,
      iconName: 'linkedin',
      external: true
    });
  }
  return items;
};

const renderContactSectionRight = () => {
  const verified = getVerifiedContacts();

  return `<div class="contact-right reveal-on-scroll">
    <div class="contact-meta-grid">
      <div class="contact-meta-item">
        <span class="contact-meta-label">Location</span>
        <p class="contact-meta-value">${icon('mapPin', 'inline-icon')} ${portfolio.contact.location}</p>
      </div>
      <div class="contact-meta-item">
        <span class="contact-meta-label">Collaboration &amp; Opportunities</span>
        <p class="contact-meta-value">${portfolio.contact.collaboration}</p>
      </div>
    </div>

    ${
      verified.length > 0
        ? `<div class="contact-details" id="contact-details">
            ${verified
              .map(
                (item) => `<a class="contact-link" href="${item.href}"${
                  item.external ? ' target="_blank" rel="noopener noreferrer"' : ''
                }>
                  <span class="contact-link-icon">${icon(item.iconName)}</span>
                  <span class="contact-link-text">
                    <strong>${item.label}</strong>
                    <small>${item.value}</small>
                  </span>
                  ${icon('arrowUpRight', 'contact-arrow')}
                </a>`
              )
              .join('')}
          </div>`
        : `<div class="contact-notice">
            <p class="contact-notice-title">Direct contact links are being finalized</p>
            <p class="contact-notice-copy">Verified email, GitHub, and LinkedIn links will be published here once confirmed.</p>
          </div>`
    }
  </div>`;
};

const aboutMeta = getSectionMeta('about');
const skillsMeta = getSectionMeta('skills');
const whatIDoMeta = getSectionMeta('what-i-do');
const speakingMeta = hasSpeakingEvents ? getSectionMeta('speaking') : null;
const projectsMeta = getSectionMeta('projects');
const articlesMeta = hasArticles ? getSectionMeta('articles') : null;
const contactMeta = getSectionMeta('contact');

const verifiedContacts = getVerifiedContacts();

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root not found');

app.innerHTML = `
  <header class="site-header" data-header>
    <div class="container nav-shell">
      <a class="wordmark" href="#hero" aria-label="Muhammed Musthafa — Home">Muhammed Musthafa<span aria-hidden="true">.</span></a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        ${navItems.map((item) => sectionLink(item.id, item.label)).join('')}
      </nav>
      <div class="header-actions">
        <a class="nav-cta" href="#contact">Let’s Talk ${icon('arrowUpRight')}</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation menu">
          ${icon('menu')}
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-backdrop" data-mobile-backdrop aria-hidden="true"></div>
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden="true">
    <div class="container mobile-menu-inner">
      <div class="mobile-menu-top">
        <span class="mobile-menu-label">Navigation</span>
        <button class="menu-close" type="button" aria-label="Close navigation menu">${icon('close')}</button>
      </div>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        ${navItems.map((item) => sectionLink(item.id, item.label)).join('')}
      </nav>
      <a class="mobile-menu-cta" href="#contact">Let’s Talk ${icon('arrowUpRight')}</a>
    </div>
  </div>

  <main id="main-content">
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow hero-greeting">${portfolio.greeting}</p>
          <h1 id="hero-title" class="hero-title">${portfolio.name}</h1>
          <p class="hero-role">${portfolio.role}</p>
          <p class="hero-description">${portfolio.heroDescription}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#projects">View My Work ${icon('arrow')}</a>
            <a class="button button-secondary" href="#contact">Contact Me ${icon('arrowUpRight')}</a>
            ${
              portfolio.resumeUrl
                ? `<a class="button button-secondary" href="${portfolio.resumeUrl}" target="_blank" rel="noopener noreferrer">Resume ${icon('fileText')}</a>`
                : ''
            }
          </div>
          <p class="availability">${portfolio.availability} <span class="eyebrow-divider" aria-hidden="true">·</span> ${portfolio.location}</p>
        </div>
        <aside class="hero-side" aria-label="Working approach">
          <div class="hero-side-rule" aria-hidden="true"></div>
          <p>Learning by building.<br />Building with intention.</p>
        </aside>
      </div>
    </section>

    <section class="about section-pad ${aboutMeta.tintClass}" id="about" aria-labelledby="about-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll">
          <span class="section-number">${aboutMeta.number}</span>
          <p class="eyebrow">About Me</p>
        </div>
        <div class="about-layout">
          <div class="about-heading">
            <h2 id="about-title" class="section-title reveal-on-scroll">About <em>Me.</em></h2>
            <h3 class="subsection-title reveal-on-scroll">${portfolio.about.subsectionTitle}</h3>
          </div>
          <div class="about-body reveal-on-scroll">
            ${portfolio.about.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
          </div>
        </div>
        <div class="focus-grid">
          ${portfolio.about.focusAreas
            .map(
              (area) => `<article class="focus-item reveal-on-scroll">
                <span class="focus-index">${area.index}</span>
                <div class="focus-content">
                  <h4>${area.title}</h4>
                  <p>${area.description}</p>
                </div>
              </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="skills section-pad ${skillsMeta.tintClass}" id="skills" aria-labelledby="skills-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll">
          <span class="section-number">${skillsMeta.number}</span>
          <p class="eyebrow">Skills &amp; Expertise</p>
        </div>
        <div class="section-heading-row">
          <h2 id="skills-title" class="section-title reveal-on-scroll">Skills &amp; <em>Expertise.</em></h2>
          <p class="section-lede reveal-on-scroll">Verified technologies and workflows I have worked with across web, mobile, and AI-assisted development.</p>
        </div>
        <div class="skill-list">
          ${portfolio.skills
            .map(
              (group) => `<div class="skill-row reveal-on-scroll">
                <h3>${group.title}</h3>
                <ul class="skill-items">${group.items.map((skill) => `<li>${skill}</li>`).join('')}</ul>
              </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="capabilities section-pad ${whatIDoMeta.tintClass}" id="what-i-do" aria-labelledby="what-i-do-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll">
          <span class="section-number">${whatIDoMeta.number}</span>
          <p class="eyebrow">What I Do</p>
        </div>
        <div class="section-heading-row">
          <h2 id="what-i-do-title" class="section-title reveal-on-scroll">What I <em>Do.</em></h2>
          <p class="section-lede reveal-on-scroll">Practical development capabilities shaped by independent project building and continuous experimentation.</p>
        </div>
        <div class="capabilities-grid">
          ${portfolio.capabilities.map(renderCapability).join('')}
        </div>
      </div>
    </section>

    ${
      hasSpeakingEvents && speakingMeta
        ? `<section class="speaking section-pad ${speakingMeta.tintClass}" id="speaking" aria-labelledby="speaking-title">
            <div class="container">
              <div class="section-intro reveal-on-scroll">
                <span class="section-number">${speakingMeta.number}</span>
                <p class="eyebrow">Public Speaking &amp; Events</p>
              </div>
              <div class="section-heading-row">
                <h2 id="speaking-title" class="section-title reveal-on-scroll">Public Speaking &amp; <em>Events.</em></h2>
                <p class="section-lede reveal-on-scroll">Talks, workshops, and community sessions shared with fellow developers and learners.</p>
              </div>
              <div class="speaking-list">
                ${portfolio.speakingEvents.map(renderSpeakingEvent).join('')}
              </div>
            </div>
          </section>`
        : ''
    }

    <section class="projects section-pad ${projectsMeta.tintClass}" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll">
          <span class="section-number">${projectsMeta.number}</span>
          <p class="eyebrow">Featured Projects</p>
        </div>
        <div class="section-heading-row projects-heading">
          <h2 id="projects-title" class="section-title reveal-on-scroll">Featured <em>Projects.</em></h2>
          <p class="section-lede reveal-on-scroll">A selection of independent projects where I turn practical ideas into working software.</p>
        </div>
        <div class="project-list">
          ${
            portfolio.projects.length
              ? portfolio.projects.map((project, index) => renderProject(project, index)).join('')
              : `<div class="project-empty reveal-on-scroll">
                  <p class="eyebrow">Portfolio in progress</p>
                  <h3>Projects are being prepared. <em>Check back soon.</em></h3>
                  <p class="project-empty-copy">Verified project details, problem statements, key features, and repository links will be added here once finalized.</p>
                </div>`
          }
        </div>
      </div>
    </section>

    ${
      hasArticles && articlesMeta
        ? `<section class="articles section-pad ${articlesMeta.tintClass}" id="articles" aria-labelledby="articles-title">
            <div class="container">
              <div class="section-intro reveal-on-scroll">
                <span class="section-number">${articlesMeta.number}</span>
                <p class="eyebrow">Latest Articles</p>
              </div>
              <div class="section-heading-row">
                <h2 id="articles-title" class="section-title reveal-on-scroll">Latest <em>Articles.</em></h2>
                <p class="section-lede reveal-on-scroll">Technical notes and write-ups from building and learning in public.</p>
              </div>
              <div class="articles-grid">
                ${portfolio.articles.map(renderArticle).join('')}
              </div>
            </div>
          </section>`
        : ''
    }

    <section class="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div class="container contact-shell">
        <div class="section-intro reveal-on-scroll">
          <span class="section-number">${contactMeta.number}</span>
          <p class="eyebrow">Get In Touch</p>
        </div>
        <div class="contact-layout">
          <div class="contact-intro">
            <h2 id="contact-title" class="contact-title reveal-on-scroll">Get In <em>Touch.</em></h2>
            <h3 class="contact-subsection reveal-on-scroll">${portfolio.contact.subsectionTitle}</h3>
            <p class="contact-description reveal-on-scroll">${portfolio.contact.introduction}</p>
            ${
              verifiedContacts.length > 0
                ? `<a class="button button-light reveal-on-scroll" href="${verifiedContacts[0].href}"${
                    verifiedContacts[0].external ? ' target="_blank" rel="noopener noreferrer"' : ''
                  }>Let’s Talk ${icon('arrow')}</a>`
                : ''
            }
          </div>
          ${renderContactSectionRight()}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <span>© ${new Date().getFullYear()} Muhammed Musthafa</span>
      <span>Built by learning, one project at a time.</span>
      <a href="#hero" class="back-to-top">Back to top ${icon('arrowUp')}</a>
    </div>
  </footer>
`;

const header = document.querySelector<HTMLElement>('[data-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menuClose = document.querySelector<HTMLButtonElement>('.menu-close');
const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
const mobileBackdrop = document.querySelector<HTMLElement>('[data-mobile-backdrop]');
const mobileLinks = [...document.querySelectorAll<HTMLAnchorElement>('.mobile-menu a')];

const setMenu = (open: boolean) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('is-open', open);
  mobileBackdrop?.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);

  if (open) {
    menuClose?.focus();
  }
};

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.contains('is-open') === true;
  setMenu(!isOpen);
});
menuClose?.addEventListener('click', () => {
  setMenu(false);
  menuToggle?.focus();
});
mobileBackdrop?.addEventListener('click', () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
    setMenu(false);
    menuToggle?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && mobileMenu?.classList.contains('is-open')) {
    setMenu(false);
  }
});

const observedSectionIds = ['hero', ...activeSections];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-section-link]')];
const setActiveSection = (id: string) => {
  navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.sectionLink === id));
};

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection((visible.target as HTMLElement).id);
    },
    { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] }
  );

  observedSectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = [...document.querySelectorAll<HTMLElement>('.reveal-on-scroll')];

  if (!prefersReducedMotion) {
    document.documentElement.classList.add('has-reveal');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  }
}

const handleScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();
