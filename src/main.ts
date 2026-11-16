import { portfolio, type Project } from './data/portfolio';
import './styles.css';

type IconName = 'arrow' | 'arrowUpRight' | 'chevron' | 'menu' | 'close' | 'mouse' | 'mail' | 'github' | 'linkedin';

const icon = (name: IconName, className = ''): string => {
  const attrs = `class="icon ${className}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"`;
  const paths: Record<IconName, string> = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M7 7h10v10"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    mouse: '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 7v4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M15 22v-3.9c.04-1.1-.42-1.86-1.2-2.4 3.86-.43 7.92-1.9 7.92-8.56a6.68 6.68 0 0 0-1.78-4.64 6.2 6.2 0 0 0-.12-4.58S18.36-.1 15 2.14a15.1 15.1 0 0 0-6 0C5.64-.1 4.18-.08 4.18-.08a6.2 6.2 0 0 0-.12 4.58 6.68 6.68 0 0 0-1.78 4.64c0 6.64 4.06 8.13 7.9 8.57-.74.5-1.16 1.38-1.16 2.43V22"/><path d="M8 18c-3.5 1.5-3.5-1.5-4.9-1.5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><path d="M4 4.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>'
  };
  return `<svg ${attrs}>${paths[name]}</svg>`;
};

const sectionLink = (id: string, label: string) => `<a class="nav-link" href="#${id}" data-section-link="${id}">${label}</a>`;

const renderProject = (project: Project) => {
  const hasImage = Boolean(project.screenshot);
  const links = [
    project.liveUrl ? `<a class="text-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live website ${icon('arrowUpRight')}</a>` : '',
    project.githubUrl ? `<a class="text-link" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub ${icon('arrowUpRight')}</a>` : ''
  ].filter(Boolean).join('');

  return `<article class="project-card reveal-on-scroll">
    <div class="project-media ${hasImage ? 'has-image' : ''}">
      ${hasImage ? `<img src="${project.screenshot}" alt="${project.name} project preview" loading="lazy" />` : `<div class="project-media-placeholder"><span>Project preview</span><span class="placeholder-line"></span><span class="placeholder-line short"></span></div>`}
      <span class="media-index">01</span>
    </div>
    <div class="project-copy">
      <div>
        <p class="eyebrow">Selected project</p>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-meta">
        <div class="tag-list">${project.stack.map((item) => `<span>${item}</span>`).join('')}</div>
        ${links ? `<div class="project-links">${links}</div>` : ''}
      </div>
    </div>
  </article>`;
};

const renderContactLink = (label: string, value: string | null, iconName: IconName, hrefPrefix = '') => {
  if (!value) {
    return `<span class="contact-link is-unavailable"><span class="contact-link-icon">${icon(iconName)}</span><span><strong>${label}</strong><small>Details coming soon</small></span></span>`;
  }
  const href = hrefPrefix ? `${hrefPrefix}${value}` : value;
  return `<a class="contact-link" href="${href}" target="_blank" rel="noreferrer"><span class="contact-link-icon">${icon(iconName)}</span><span><strong>${label}</strong><small>${value}</small></span>${icon('arrowUpRight', 'contact-arrow')}</a>`;
};

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root not found');

app.innerHTML = `
  <header class="site-header" data-header>
    <div class="container nav-shell">
      <a class="wordmark" href="#hero" aria-label="Muhammed Musthafa home">MUHAMMED MUSTHAFA<span>.</span></a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        ${sectionLink('about', 'About')}
        ${sectionLink('skills', 'Skills')}
        ${sectionLink('projects', 'Projects')}
        ${sectionLink('journey', 'Journey')}
        ${sectionLink('contact', 'Contact')}
        <a class="nav-cta" href="#contact">Let’s Talk ${icon('arrowUpRight')}</a>
      </nav>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation menu">${icon('menu')}</button>
    </div>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="container mobile-menu-inner">
        <div class="mobile-menu-top"><span>Navigate</span><button class="menu-close" type="button" aria-label="Close navigation menu">${icon('close')}</button></div>
        <nav aria-label="Mobile navigation">
          ${sectionLink('about', 'About')}
          ${sectionLink('skills', 'Skills')}
          ${sectionLink('projects', 'Projects')}
          ${sectionLink('journey', 'Journey')}
          ${sectionLink('contact', 'Contact')}
        </nav>
        <a class="mobile-menu-cta" href="#contact">Let’s Talk ${icon('arrowUpRight')}</a>
      </div>
    </div>
  </header>

  <main id="main-content">
    <section class="hero section-pad" id="hero" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow reveal-on-scroll"><span class="eyebrow-dot"></span>AI FULL-STACK DEVELOPER <span class="eyebrow-divider">·</span> KERALA, INDIA</p>
          <h1 id="hero-title" class="hero-title reveal-on-scroll">Building ideas into <span>real digital products.</span></h1>
          <p class="hero-description reveal-on-scroll">${portfolio.heroDescription}</p>
          <div class="hero-actions reveal-on-scroll">
            <a class="button button-primary" href="#projects">Explore My Projects ${icon('arrow')}</a>
            <a class="button button-secondary" href="#contact">Get in Touch ${icon('arrowUpRight')}</a>
          </div>
          <div class="availability reveal-on-scroll"><span class="availability-pulse"></span>${portfolio.availability}</div>
        </div>
        <div class="hero-side reveal-on-scroll" aria-hidden="true">
          <div class="hero-side-rule"></div>
          <p>Learning by building.<br />Building with intention.</p>
          <span class="hero-side-number">01 — 06</span>
        </div>
      </div>
      <div class="container hero-footer reveal-on-scroll">
        <span class="hero-note">Independent project builder<br />&amp; continuous learner</span>
        <a class="scroll-cue" href="#about" aria-label="Scroll to About section"><span>Scroll to explore</span>${icon('mouse')}</a>
      </div>
    </section>

    <section class="about section-pad section-tint" id="about" aria-labelledby="about-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll"><span class="section-number">01</span><p class="eyebrow">A little context</p></div>
        <div class="about-layout">
          <h2 id="about-title" class="section-title reveal-on-scroll">A little<br /><em>about me.</em></h2>
          <div class="about-body reveal-on-scroll">
            ${portfolio.about.map((paragraph) => `<p>${paragraph}</p>`).join('')}
          </div>
        </div>
        <div class="focus-grid">
          ${portfolio.focusAreas.map((area) => `<article class="focus-item reveal-on-scroll"><span class="focus-index">${area.index}</span><div><h3>${area.title}</h3><p>${area.description}</p></div></article>`).join('')}
        </div>
      </div>
    </section>

    <section class="skills section-pad" id="skills" aria-labelledby="skills-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll"><span class="section-number">02</span><p class="eyebrow">The working toolkit</p></div>
        <div class="section-heading-row">
          <h2 id="skills-title" class="section-title reveal-on-scroll">Tools I<br /><em>work with.</em></h2>
          <p class="section-lede reveal-on-scroll">A growing toolkit shaped by practical experimentation, product building, and a willingness to learn what a problem needs.</p>
        </div>
        <div class="skill-list">
          ${portfolio.skills.map((group) => `<div class="skill-row reveal-on-scroll"><h3>${group.title}</h3><div class="skill-items">${group.items.map((skill) => `<span>${skill}</span>`).join('')}</div></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="projects section-pad section-tint" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll"><span class="section-number">03</span><p class="eyebrow">Work in progress</p></div>
        <div class="section-heading-row projects-heading">
          <div><h2 id="projects-title" class="section-title reveal-on-scroll">Things I’ve<br /><em>been building.</em></h2><p class="section-lede reveal-on-scroll">A selection of projects where I turn ideas into working products.</p></div>
          <span class="project-count reveal-on-scroll">${String(portfolio.projects.length).padStart(2, '0')} verified projects</span>
        </div>
        <div class="project-list">
          ${portfolio.projects.length ? portfolio.projects.map(renderProject).join('') : `<div class="project-empty reveal-on-scroll"><div class="empty-mark">—</div><div><p class="eyebrow">Portfolio in progress</p><h3>Projects are being prepared.<br /><em>Check back soon.</em></h3><p>Verified project details and screenshots will be added here as they’re ready.</p></div></div>`}
        </div>
      </div>
    </section>

    <section class="journey section-pad" id="journey" aria-labelledby="journey-title">
      <div class="container">
        <div class="section-intro reveal-on-scroll"><span class="section-number">04</span><p class="eyebrow">Learning in motion</p></div>
        <div class="section-heading-row">
          <h2 id="journey-title" class="section-title reveal-on-scroll">My journey<br /><em>so far.</em></h2>
          <p class="section-lede reveal-on-scroll">There’s no shortcut to becoming a better developer. Just curiosity, consistency, and the next thing worth building.</p>
        </div>
        <div class="timeline" aria-label="Journey milestones">
          ${portfolio.journey.map((milestone, index) => `<div class="timeline-item reveal-on-scroll"><div class="timeline-marker"><span>${String(index + 1).padStart(2, '0')}</span></div><p>${milestone}</p></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div class="container contact-shell">
        <div class="section-intro reveal-on-scroll"><span class="section-number">05</span><p class="eyebrow">Start a conversation</p></div>
        <div class="contact-layout">
          <div>
            <h2 id="contact-title" class="contact-title reveal-on-scroll">Have an idea<br />or <em>opportunity?</em></h2>
            <p class="contact-description reveal-on-scroll">I’m always interested in connecting with developers, teams, and people building interesting products.</p>
            <a class="button button-primary reveal-on-scroll" href="#contact-details">Let’s Talk ${icon('arrow')}</a>
          </div>
          <div class="contact-details reveal-on-scroll" id="contact-details">
            ${renderContactLink('Email', portfolio.contact.email, 'mail', 'mailto:')}
            ${renderContactLink('GitHub', portfolio.contact.github, 'github')}
            ${renderContactLink('LinkedIn', portfolio.contact.linkedin, 'linkedin')}
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner"><span>© ${new Date().getFullYear()} Muhammed Musthafa</span><span>Built by learning, one project at a time.</span><a href="#hero" class="back-to-top">Back to top ${icon('arrowUpRight')}</a></div>
  </footer>
`;

const header = document.querySelector<HTMLElement>('[data-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menuClose = document.querySelector<HTMLButtonElement>('.menu-close');
const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
const mobileLinks = [...document.querySelectorAll<HTMLAnchorElement>('.mobile-menu a')];

const setMenu = (open: boolean) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};

menuToggle?.addEventListener('click', () => setMenu(mobileMenu?.classList.contains('is-open') !== true));
menuClose?.addEventListener('click', () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const sectionIds = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-section-link]')];
const setActiveSection = (id: string) => {
  navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.sectionLink === id));
};

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveSection((visible.target as HTMLElement).id);
}, { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] });
sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

const revealElements = [...document.querySelectorAll<HTMLElement>('.reveal-on-scroll')];
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach((element) => revealObserver.observe(element));

const handleScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();
