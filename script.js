'use strict';

const CONFIG = {
  menuBreakpoint: 960,
  backToTopThreshold: 400,
  fakeSubmitDelayMs: 900,
  swipeThreshold: 48,
  toastVisibleMs: 2600,
  scrollHeaderThreshold: 12
};

const STORAGE_KEYS = {
  language: 'nordline-language'
};

const SUPPORTED_LANGUAGES = ['ru', 'en'];

const caseData = {
  ru: {
    edtech: {
      title: 'Платформа онлайн-курсов',
      description: 'Обновили информационную архитектуру и визуальный стиль, сократили путь до заявки с 6 до 3 шагов.',
      metrics: [
        { value: '+42%', label: 'рост заявок за 2 месяца' },
        { value: '1.8 c', label: 'скорость LCP на мобильных' },
        { value: '3 недели', label: 'срок запуска новой версии' }
      ]
    },
    clinic: {
      title: 'Сайт сети частных клиник',
      description: 'Сделали акцент на поиске врача, расписании и быстрой онлайн-записи без лишних шагов.',
      metrics: [
        { value: '+31%', label: 'рост записей через сайт' },
        { value: '-27%', label: 'снижение отказов на мобильных' },
        { value: '4 недели', label: 'полный цикл проекта' }
      ]
    },
    retail: {
      title: 'Интернет-магазин аксессуаров',
      description: 'Пересобрали карточки товаров и checkout-сценарий, чтобы повысить доверие и упростить покупку.',
      metrics: [
        { value: '+19%', label: 'рост конверсии в оплату' },
        { value: '+24%', label: 'увеличение среднего чека' },
        { value: '2.1 c', label: 'скорость загрузки каталога' }
      ]
    },
    b2b: {
      title: 'Корпоративный B2B-портал',
      description: 'Разработали модульный сайт с детальной услугой, кейсами и формами квалификации лидов.',
      metrics: [
        { value: '43', label: 'квалифицированных лида за 2 месяца' },
        { value: '+36%', label: 'рост глубины просмотра' },
        { value: '5 недель', label: 'проектирование и запуск' }
      ]
    }
  },
  en: {
    edtech: {
      title: 'Online Course Platform',
      description: 'We rebuilt information architecture and visual language, cutting the path to lead submission from 6 to 3 steps.',
      metrics: [
        { value: '+42%', label: 'more leads in 2 months' },
        { value: '1.8 s', label: 'mobile LCP speed' },
        { value: '3 weeks', label: 'time to launch' }
      ]
    },
    clinic: {
      title: 'Private Clinic Network Website',
      description: 'Focused on doctor search, schedule visibility, and frictionless online booking.',
      metrics: [
        { value: '+31%', label: 'more appointments via website' },
        { value: '-27%', label: 'lower mobile bounce rate' },
        { value: '4 weeks', label: 'end-to-end delivery' }
      ]
    },
    retail: {
      title: 'Accessories E-commerce Store',
      description: 'Redesigned product cards and checkout flow to improve trust and simplify purchase.',
      metrics: [
        { value: '+19%', label: 'checkout conversion growth' },
        { value: '+24%', label: 'higher average order value' },
        { value: '2.1 s', label: 'catalog load speed' }
      ]
    },
    b2b: {
      title: 'Corporate B2B Portal',
      description: 'Built a modular website with service pages, case studies, and lead qualification forms.',
      metrics: [
        { value: '43', label: 'qualified leads in 2 months' },
        { value: '+36%', label: 'deeper session engagement' },
        { value: '5 weeks', label: 'design and launch cycle' }
      ]
    }
  }
};

const localeUi = {
  ru: {
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    switchLanguageLabel: 'Switch to English',
    switchLanguageButton: 'EN',
    carouselOf: 'из',
    slideRoleDescription: 'слайд',
    formNameError: 'Введите имя (минимум 2 символа).',
    formEmailError: 'Введите корректный email.',
    formMessageError: 'Сообщение должно содержать минимум 12 символов.',
    formInvalidStatus: 'Проверьте поля формы и попробуйте снова.',
    formSending: 'Отправляем...',
    formSubmit: 'Отправить сообщение',
    formSuccessStatus: 'Сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
    formSuccessToast: 'Заявка отправлена успешно'
  },
  en: {
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    switchLanguageLabel: 'Switch to Russian',
    switchLanguageButton: 'RU',
    carouselOf: 'of',
    slideRoleDescription: 'slide',
    formNameError: 'Enter your name (at least 2 characters).',
    formEmailError: 'Enter a valid email address.',
    formMessageError: 'Message must contain at least 12 characters.',
    formInvalidStatus: 'Please check the form fields and try again.',
    formSending: 'Sending...',
    formSubmit: 'Send message',
    formSuccessStatus: 'Message sent. We will contact you shortly.',
    formSuccessToast: 'Your request has been sent'
  }
};

const I18N_BINDINGS = {
  title: { type: 'text', selector: 'title' },
  metaDescription: { type: 'attr', selector: 'meta[name="description"]', attr: 'content' },
  ogLocale: { type: 'attr', selector: 'meta[property="og:locale"]', attr: 'content' },
  ogTitle: { type: 'attr', selector: 'meta[property="og:title"]', attr: 'content' },
  ogDescription: { type: 'attr', selector: 'meta[property="og:description"]', attr: 'content' },
  twitterTitle: { type: 'attr', selector: 'meta[name="twitter:title"]', attr: 'content' },
  twitterDescription: { type: 'attr', selector: 'meta[name="twitter:description"]', attr: 'content' },
  skipLink: { type: 'text', selector: '.skip-link' },
  menuOverlayAria: { type: 'attr', selector: '[data-js="menu-overlay"]', attr: 'aria-label' },
  navAria: { type: 'attr', selector: '[data-js="main-nav"]', attr: 'aria-label' },
  navLinks: { type: 'textList', selector: '[data-nav-link]' },
  navCta: { type: 'text', selector: '.nav-cta' },
  heroEyebrow: { type: 'text', selector: '#hero .hero-copy .eyebrow' },
  heroTitle: { type: 'text', selector: '#hero h1' },
  heroLead: { type: 'text', selector: '.hero-lead' },
  heroButtons: { type: 'textList', selector: '#hero .hero-actions .btn' },
  heroMetricsAria: { type: 'attr', selector: '.hero-metrics', attr: 'aria-label' },
  heroMetricValues: { type: 'textList', selector: '.hero-metrics strong' },
  heroMetricLabels: { type: 'textList', selector: '.hero-metrics span' },
  heroPanelAria: { type: 'attr', selector: '.hero-panel', attr: 'aria-label' },
  heroPanelTitle: { type: 'text', selector: '.hero-panel h2' },
  heroPanelItems: { type: 'textList', selector: '.hero-panel ul li' },
  heroPanelNote: { type: 'text', selector: '.hero-panel-note' },
  benefitsEyebrow: { type: 'text', selector: '#benefits .section-head .eyebrow' },
  benefitsTitle: { type: 'text', selector: '#benefits .section-head h2' },
  benefitTitles: { type: 'textList', selector: '#benefits .tile h3' },
  benefitTexts: { type: 'textList', selector: '#benefits .tile p' },
  portfolioEyebrow: { type: 'text', selector: '#portfolio .section-head .eyebrow' },
  portfolioTitle: { type: 'text', selector: '#portfolio .section-head h2' },
  portfolioFilterAria: { type: 'attr', selector: '[data-js="portfolio-filters"]', attr: 'aria-label' },
  portfolioFilters: { type: 'textList', selector: '[data-filter-button]' },
  caseCardTitles: { type: 'textList', selector: '[data-case-card] h3' },
  caseCardTexts: { type: 'textList', selector: '[data-case-card] p' },
  caseDetailEyebrow: { type: 'text', selector: '.case-detail-eyebrow' },
  processEyebrow: { type: 'text', selector: '#process .section-head .eyebrow' },
  processTitle: { type: 'text', selector: '#process .section-head h2' },
  processTitles: { type: 'textList', selector: '#process .process-step h3' },
  processTexts: { type: 'textList', selector: '#process .process-step p' },
  reviewsEyebrow: { type: 'text', selector: '#reviews .section-head .eyebrow' },
  reviewsTitle: { type: 'text', selector: '#reviews .section-head h2' },
  carouselAria: { type: 'attr', selector: '[data-js="carousel"]', attr: 'aria-label' },
  reviewQuotes: { type: 'textList', selector: '.review-slide p' },
  reviewRoles: { type: 'textList', selector: '.review-slide footer span' },
  carouselPrevText: { type: 'text', selector: '[data-carousel="prev"]' },
  carouselPrevAria: { type: 'attr', selector: '[data-carousel="prev"]', attr: 'aria-label' },
  carouselNextText: { type: 'text', selector: '[data-carousel="next"]' },
  carouselNextAria: { type: 'attr', selector: '[data-carousel="next"]', attr: 'aria-label' },
  carouselDotsAria: { type: 'attr', selector: '.carousel-dots', attr: 'aria-label' },
  carouselDotLabels: { type: 'attrList', selector: '[data-slide-dot]', attr: 'aria-label' },
  slideRoleDescriptions: { type: 'attrList', selector: '.review-slide', attr: 'aria-roledescription' },
  faqEyebrow: { type: 'text', selector: '#faq .section-head .eyebrow' },
  faqTitle: { type: 'text', selector: '#faq .section-head h2' },
  faqQuestions: { type: 'textList', selector: '#faq .faq-trigger' },
  faqAnswers: { type: 'textList', selector: '#faq .faq-panel p' },
  contactEyebrow: { type: 'text', selector: '#contact .section-head .eyebrow' },
  contactTitle: { type: 'text', selector: '#contact .section-head h2' },
  contactCopy: { type: 'text', selector: '.contact-copy' },
  socialAria: { type: 'attr', selector: '.social-list', attr: 'aria-label' },
  formLabels: { type: 'textList', selector: '#contact-form label' },
  formSubmitText: { type: 'text', selector: '[data-js="form-submit"]' },
  footerRights: { type: 'html', selector: '[data-js="footer-rights"]' },
  footerLinks: { type: 'textList', selector: '.footer-inner ul a' },
  toTopText: { type: 'text', selector: '[data-js="to-top"]' },
  toTopAria: { type: 'attr', selector: '[data-js="to-top"]', attr: 'aria-label' }
};

const EN_PAGE_COPY = {
  title: 'Nordline Studio - Premium Turnkey Web Development',
  metaDescription: 'Nordline Studio designs and builds turnkey websites: strategy, UX/UI, development, animation and SEO foundation. Fast launch, clear process, real leads.',
  ogLocale: 'en_US',
  ogTitle: 'Nordline Studio - Premium Websites for Business',
  ogDescription: 'Landing pages, corporate websites and online stores with strong UX and fast front-end performance.',
  twitterTitle: 'Nordline Studio - Website Development',
  twitterDescription: 'Turnkey websites: UX, UI, front-end development, animation and SEO preparation.',
  skipLink: 'Skip to content',
  menuOverlayAria: 'Close menu',
  navAria: 'Primary navigation',
  navLinks: ['Home', 'Benefits', 'Cases', 'Process', 'Reviews', 'FAQ', 'Contact'],
  navCta: 'Contact us',
  heroEyebrow: 'Websites built for lead growth',
  heroTitle: 'We build premium digital products focused on measurable business outcomes',
  heroLead: 'We deliver the full cycle: from structure and visual direction to launch and optimization. Every screen is designed for conversion and clarity.',
  heroButtons: ['Discuss project', 'View cases'],
  heroMetricsAria: 'Key metrics',
  heroMetricValues: ['80+', '14 days', '4.9/5'],
  heroMetricLabels: ['completed projects', 'average landing launch', 'client rating'],
  heroPanelAria: 'Key value points',
  heroPanelTitle: 'What you get',
  heroPanelItems: [
    'Clear UX structure built for your target audience',
    'Responsive interface for mobile and desktop screens',
    'SEO-ready foundation and fast page loading',
    'Post-launch support and growth recommendations'
  ],
  heroPanelNote: 'We work in sprints. You see progress every week.',
  benefitsEyebrow: 'Benefits',
  benefitsTitle: 'Focused on business goals, not just visuals',
  benefitTitles: ['Strategy before design', 'Clean code architecture', 'Performance', 'Accessibility'],
  benefitTexts: [
    'First we define page goals and user flows, then craft the interface around them.',
    'Framework-free markup, structured styles and maintainable JavaScript for future updates.',
    'We optimize rendering and animation so the site stays fast on mid-range devices.',
    'Semantic structure, keyboard support, visible focus states and reduced-motion support.'
  ],
  portfolioEyebrow: 'Portfolio',
  portfolioTitle: 'Cases with measurable impact',
  portfolioFilterAria: 'Case filters',
  portfolioFilters: ['All', 'Landing pages', 'Stores', 'Design'],
  caseCardTitles: [
    'Online Course Platform',
    'Private Clinic Network',
    'Accessories Online Store',
    'Engineering Company Website'
  ],
  caseCardTexts: [
    'Landing page and account redesign focused on lead growth.',
    'A new website with service filters and fast appointment flow.',
    'Product card and checkout redesign to increase completed purchases.',
    'A corporate multi-page website for complex technical services.'
  ],
  caseDetailEyebrow: 'Case details',
  processEyebrow: 'Process',
  processTitle: 'Clear workflow from idea to release',
  processTitles: ['Brief and analysis', 'Prototype and content', 'UI and development', 'QA and launch'],
  processTexts: [
    'We dive into your product, competitors and audience, then lock project KPIs.',
    'We define page structure, copy and user scenarios, then validate the flow.',
    'We build the design system, implement components and add purposeful animation.',
    'We validate accessibility and performance, then launch with final SEO setup.'
  ],
  reviewsEyebrow: 'Reviews',
  reviewsTitle: 'Clients value speed, transparency and outcomes',
  carouselAria: 'Client reviews',
  reviewQuotes: [
    '"The team relaunched our site and service packaging in three weeks. We saw more leads in the first month."',
    '"Process discipline stood out: clear stages, fast replies and accurate timelines. Work without chaos."',
    '"After the e-commerce redesign, checkout conversion increased. Their UX hypothesis detail was especially valuable."'
  ],
  reviewRoles: ['Founder, English school', 'CEO, B2B service', 'Head of e-commerce brand'],
  carouselPrevText: 'Back',
  carouselPrevAria: 'Previous review',
  carouselNextText: 'Next',
  carouselNextAria: 'Next review',
  carouselDotsAria: 'Choose review',
  carouselDotLabels: ['Review 1', 'Review 2', 'Review 3'],
  slideRoleDescriptions: ['slide', 'slide', 'slide'],
  faqEyebrow: 'FAQ',
  faqTitle: 'Common questions before project kickoff',
  faqQuestions: [
    'How long does a website launch usually take?',
    'Can we start without a ready technical brief?',
    'What support do you provide after launch?'
  ],
  faqAnswers: [
    'A landing page usually takes 10-14 days. A corporate or complex multi-page website takes 3-6 weeks depending on content scope.',
    'Yes. We help shape the technical brief during discovery: goals, structure and quality criteria are defined before design and development.',
    'We track metrics, fix minor issues and help with content updates. Extended SLA support is available when needed.'
  ],
  contactEyebrow: 'Contact',
  contactTitle: 'Let us review your project and suggest the best launch format',
  contactCopy: 'We reply within one business day. Briefly describe goals, timeline and expected result.',
  socialAria: 'Social links',
  formLabels: ['Name', 'Email', 'Message'],
  formSubmitText: 'Send message',
  footerRights: '© <span id="year"></span> Nordline Studio. All rights reserved.',
  footerLinks: ['Privacy Policy', 'Request a quote'],
  toTopText: 'Top',
  toTopAria: 'Back to top'
};

const refs = {
  root: document.documentElement,
  body: document.body,
  header: document.querySelector('[data-js="site-header"]'),
  langToggle: document.querySelector('[data-js="lang-toggle"]'),
  menuToggle: document.querySelector('[data-js="menu-toggle"]'),
  mainNav: document.querySelector('[data-js="main-nav"]'),
  menuOverlay: document.querySelector('[data-js="menu-overlay"]'),
  navLinks: Array.from(document.querySelectorAll('[data-nav-link]')),
  toTopButton: document.querySelector('[data-js="to-top"]'),
  toast: document.querySelector('[data-js="toast"]')
};

const media = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
};

const state = {
  menuOpen: false,
  menuFocusables: [],
  menuLastFocus: null,
  toastTimer: 0,
  language: 'ru',
  defaultCopy: null
};

function isDevEnvironment() {
  return ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
}

function prefersReducedMotion() {
  return media.reducedMotion.matches;
}

function rafThrottle(callback) {
  let rafId = 0;

  return (...args) => {
    if (rafId) return;

    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      callback(...args);
    });
  };
}

function isMobileMenuViewport() {
  return window.innerWidth <= CONFIG.menuBreakpoint;
}

function getHeaderOffset() {
  if (!refs.header) return 0;
  return refs.header.offsetHeight + 14;
}

function setHeaderHeightVar() {
  if (!refs.header) return;
  refs.root.style.setProperty('--header-h', `${refs.header.offsetHeight}px`);
}

function setCurrentYear() {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function isSupportedLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language);
}

function getLocaleStrings() {
  return localeUi[state.language] || localeUi.ru;
}

function getStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.language);
    return isSupportedLanguage(stored || '') ? stored : 'ru';
  } catch {
    return 'ru';
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.language, language);
  } catch {
    // Silent fallback for private mode or blocked storage.
  }
}

function readBinding(binding) {
  if (binding.type === 'text') {
    const node = document.querySelector(binding.selector);
    return node ? node.textContent || '' : '';
  }

  if (binding.type === 'html') {
    const node = document.querySelector(binding.selector);
    return node ? node.innerHTML : '';
  }

  if (binding.type === 'attr') {
    const node = document.querySelector(binding.selector);
    if (!node || !binding.attr) return '';
    return node.getAttribute(binding.attr) || '';
  }

  if (binding.type === 'textList') {
    return Array.from(document.querySelectorAll(binding.selector)).map((node) => node.textContent || '');
  }

  if (binding.type === 'attrList') {
    return Array.from(document.querySelectorAll(binding.selector)).map((node) => {
      if (!binding.attr) return '';
      return node.getAttribute(binding.attr) || '';
    });
  }

  return '';
}

function writeBinding(binding, value) {
  if (value === undefined) return;

  if (binding.type === 'text') {
    const node = document.querySelector(binding.selector);
    if (node) node.textContent = String(value);
    return;
  }

  if (binding.type === 'html') {
    const node = document.querySelector(binding.selector);
    if (node) node.innerHTML = String(value);
    return;
  }

  if (binding.type === 'attr') {
    const node = document.querySelector(binding.selector);
    if (!node || !binding.attr) return;
    node.setAttribute(binding.attr, String(value));
    return;
  }

  if (binding.type === 'textList') {
    const nodes = Array.from(document.querySelectorAll(binding.selector));
    if (!Array.isArray(value)) return;

    nodes.forEach((node, index) => {
      if (value[index] !== undefined) {
        node.textContent = String(value[index]);
      }
    });
    return;
  }

  if (binding.type === 'attrList') {
    const nodes = Array.from(document.querySelectorAll(binding.selector));
    if (!Array.isArray(value) || !binding.attr) return;

    nodes.forEach((node, index) => {
      if (value[index] !== undefined) {
        node.setAttribute(binding.attr, String(value[index]));
      }
    });
  }
}

function captureDefaultCopy() {
  return Object.entries(I18N_BINDINGS).reduce((acc, [key, binding]) => {
    acc[key] = readBinding(binding);
    return acc;
  }, {});
}

function applyPageCopy(copy) {
  if (!copy) return;

  Object.entries(I18N_BINDINGS).forEach(([key, binding]) => {
    if (copy[key] === undefined) return;
    writeBinding(binding, copy[key]);
  });
}

function updateMenuToggleLabel() {
  if (!refs.menuToggle) return;
  const locale = getLocaleStrings();
  refs.menuToggle.setAttribute('aria-label', state.menuOpen ? locale.menuClose : locale.menuOpen);
}

function updateLanguageToggle() {
  if (!refs.langToggle) return;
  const locale = getLocaleStrings();
  refs.langToggle.textContent = locale.switchLanguageButton;
  refs.langToggle.setAttribute('aria-label', locale.switchLanguageLabel);
}

function getActiveCaseKey() {
  const current = document.querySelector('[data-case-card].is-active:not([hidden])');
  if (current instanceof HTMLElement && current.dataset.case) {
    return current.dataset.case;
  }

  const firstVisible = Array.from(document.querySelectorAll('[data-case-card]')).find((card) => !card.hidden);
  if (firstVisible instanceof HTMLElement && firstVisible.dataset.case) {
    return firstVisible.dataset.case;
  }

  return 'edtech';
}

function syncCarouselA11yLabels() {
  const slides = Array.from(document.querySelectorAll('.review-slide'));
  if (!slides.length) return;

  const locale = getLocaleStrings();
  slides.forEach((slide, index) => {
    slide.setAttribute('aria-label', `${index + 1} ${locale.carouselOf} ${slides.length}`);
    slide.setAttribute('aria-roledescription', locale.slideRoleDescription);
  });
}

function setLanguage(language, options = {}) {
  const { persist = true } = options;
  const nextLanguage = isSupportedLanguage(language) ? language : 'ru';
  const targetCopy = nextLanguage === 'en' ? EN_PAGE_COPY : state.defaultCopy;

  state.language = nextLanguage;
  refs.root.lang = nextLanguage;
  applyPageCopy(targetCopy);
  updateLanguageToggle();
  updateMenuToggleLabel();
  setCurrentYear();
  updateCaseDetails(getActiveCaseKey());
  syncCarouselA11yLabels();

  if (persist) {
    storeLanguage(nextLanguage);
  }
}

function initLanguage() {
  state.defaultCopy = captureDefaultCopy();

  const initialLanguage = getStoredLanguage();
  setLanguage(initialLanguage, { persist: false });

  refs.langToggle?.addEventListener('click', () => {
    const next = state.language === 'ru' ? 'en' : 'ru';
    setLanguage(next);
  });
}

function showToast(message) {
  if (!refs.toast) return;

  refs.toast.textContent = message;
  refs.toast.classList.add('is-visible');
  window.clearTimeout(state.toastTimer);

  state.toastTimer = window.setTimeout(() => {
    refs.toast?.classList.remove('is-visible');
  }, CONFIG.toastVisibleMs);
}

function getMenuFocusableElements() {
  if (!refs.mainNav) return [];

  return Array.from(
    refs.mainNav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  ).filter((el) => {
    if (!(el instanceof HTMLElement)) return false;
    if (el.hasAttribute('disabled')) return false;
    return el.getClientRects().length > 0;
  });
}

function setMenuA11yState() {
  if (!refs.mainNav) return;

  if (!isMobileMenuViewport()) {
    refs.mainNav.removeAttribute('aria-hidden');
    if ('inert' in refs.mainNav) refs.mainNav.inert = false;
    return;
  }

  const hidden = !state.menuOpen;
  refs.mainNav.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  if ('inert' in refs.mainNav) refs.mainNav.inert = hidden;
}

function openMenu() {
  if (!refs.menuToggle || !refs.mainNav || !isMobileMenuViewport()) return;

  state.menuLastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : refs.menuToggle;
  state.menuOpen = true;
  refs.body.classList.add('menu-open');
  refs.menuToggle.setAttribute('aria-expanded', 'true');
  updateMenuToggleLabel();

  state.menuFocusables = getMenuFocusableElements();
  setMenuA11yState();

  if (state.menuFocusables[0]) {
    state.menuFocusables[0].focus();
  }
}

function closeMenu(options = {}) {
  if (!refs.menuToggle || !refs.mainNav) return;

  const { restoreFocus = false } = options;

  state.menuOpen = false;
  refs.body.classList.remove('menu-open');
  refs.menuToggle.setAttribute('aria-expanded', 'false');
  updateMenuToggleLabel();
  setMenuA11yState();

  if (restoreFocus && state.menuLastFocus instanceof HTMLElement) {
    state.menuLastFocus.focus();
  }
}

function syncMenuViewportState() {
  if (!refs.menuToggle || !refs.mainNav) return;

  if (!isMobileMenuViewport()) {
    state.menuOpen = false;
    refs.body.classList.remove('menu-open');
    refs.menuToggle.setAttribute('aria-expanded', 'false');
    updateMenuToggleLabel();
  }

  setMenuA11yState();
}

function trapMenuFocus(event) {
  if (!state.menuOpen || event.key !== 'Tab') return;

  state.menuFocusables = getMenuFocusableElements();
  if (!state.menuFocusables.length) {
    event.preventDefault();
    refs.menuToggle?.focus();
    return;
  }

  const first = state.menuFocusables[0];
  const last = state.menuFocusables[state.menuFocusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initMenu() {
  if (!refs.menuToggle || !refs.mainNav) {
    return {
      close: () => {},
      isOpen: () => false,
      sync: () => {}
    };
  }

  syncMenuViewportState();

  refs.menuToggle.addEventListener('click', () => {
    if (state.menuOpen) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  });

  refs.menuOverlay?.addEventListener('click', () => {
    closeMenu({ restoreFocus: true });
  });

  document.addEventListener('keydown', (event) => {
    if (!state.menuOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    trapMenuFocus(event);
  });

  refs.mainNav.addEventListener('click', (event) => {
    const link = event.target instanceof HTMLElement ? event.target.closest('a[href^="#"]') : null;
    if (!link) return;
    closeMenu();
  });

  return {
    close: closeMenu,
    isOpen: () => state.menuOpen,
    sync: syncMenuViewportState
  };
}

function initSmoothAnchorScroll(menuApi) {
  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof HTMLElement ? event.target.closest('a[href^="#"]') : null;
    if (!trigger) return;

    const href = trigger.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    if (menuApi.isOpen()) {
      menuApi.close();
    }

    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}

function initHeaderScrollState() {
  if (!refs.header) return;

  const update = () => {
    refs.header.classList.toggle('is-scrolled', window.scrollY > CONFIG.scrollHeaderThreshold);
  };

  const onScroll = rafThrottle(update);
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

function setActiveNavById(id) {
  refs.navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initScrollSpy() {
  const sections = refs.navLinks
    .map((link) => link.getAttribute('href'))
    .filter((href) => typeof href === 'string' && href.startsWith('#'))
    .map((href) => document.querySelector(href))
    .filter((section) => section && section.id);

  if (!sections.length) {
    return { sync: () => {} };
  }

  const ratioMap = new Map(sections.map((section) => [section.id, 0]));

  const resolveActiveId = () => {
    let activeId = '';
    let bestRatio = 0;

    sections.forEach((section) => {
      const ratio = ratioMap.get(section.id) || 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        activeId = section.id;
      }
    });

    if (activeId) return activeId;

    const anchorY = window.scrollY + getHeaderOffset() + 120;
    let fallback = sections[0].id;
    sections.forEach((section) => {
      if (section.offsetTop <= anchorY) fallback = section.id;
    });

    return fallback;
  };

  const sync = () => {
    const id = resolveActiveId();
    if (id) setActiveNavById(id);
  };

  if (!('IntersectionObserver' in window)) {
    const onScroll = rafThrottle(sync);
    window.addEventListener('scroll', onScroll, { passive: true });
    sync();
    return { sync };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        ratioMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      sync();
    },
    {
      threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      rootMargin: '-45% 0px -45% 0px'
    }
  );

  sections.forEach((section) => observer.observe(section));
  sync();

  return { sync };
}

function initReveal() {
  const items = Array.from(document.querySelectorAll('.reveal'));
  if (!items.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  items.forEach((item) => observer.observe(item));
}

function updateCaseDetails(caseKey) {
  const titleNode = document.getElementById('case-title');
  const descriptionNode = document.getElementById('case-description');
  const metricsNode = document.getElementById('case-metrics');

  const currentCaseMap = caseData[state.language] || caseData.ru;
  const data = currentCaseMap[caseKey];
  if (!titleNode || !descriptionNode || !metricsNode || !data) return;

  titleNode.textContent = data.title;
  descriptionNode.textContent = data.description;
  metricsNode.innerHTML = data.metrics
    .map((item) => `<li><strong>${item.value}</strong><span>${item.label}</span></li>`)
    .join('');
}

function activateCaseCard(cards, cardToActivate) {
  cards.forEach((card) => {
    const active = card === cardToActivate;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  if (cardToActivate) {
    updateCaseDetails(cardToActivate.dataset.case || 'edtech');
  }
}

function initPortfolio() {
  const grid = document.querySelector('[data-js="portfolio-grid"]');
  const cards = Array.from(document.querySelectorAll('[data-case-card]'));
  const filterButtons = Array.from(document.querySelectorAll('[data-filter-button]'));

  if (!grid || !cards.length) return;

  cards.forEach((card) => {
    card.setAttribute('aria-pressed', card.classList.contains('is-active') ? 'true' : 'false');
  });

  const applyFilter = (filter) => {
    grid.classList.add('is-filtering');

    cards.forEach((card) => {
      const rawCategory = card.dataset.category || '';
      const categories = rawCategory.split(',').map((item) => item.trim()).filter(Boolean);
      const visible = filter === 'all' || categories.includes(filter);
      card.hidden = !visible;
    });

    const visibleCards = cards.filter((card) => !card.hidden);

    const activeVisible = visibleCards.find((card) => card.classList.contains('is-active'));
    if (!activeVisible && visibleCards[0]) {
      activateCaseCard(cards, visibleCards[0]);
    } else if (activeVisible) {
      updateCaseDetails(activeVisible.dataset.case || 'edtech');
    }

    window.setTimeout(() => {
      grid.classList.remove('is-filtering');
    }, 180);
  };

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';

        filterButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        applyFilter(filter);
      });
    });
  }

  grid.addEventListener('click', (event) => {
    const card = event.target instanceof HTMLElement ? event.target.closest('[data-case-card]') : null;
    if (!card || card.hidden) return;

    activateCaseCard(cards, card);
  });
}

function initCarousel() {
  const carousel = document.querySelector('[data-js="carousel"]');
  const viewport = document.querySelector('[data-js="carousel-viewport"]');
  const track = document.querySelector('[data-js="carousel-track"]');
  const prevBtn = document.querySelector('[data-carousel="prev"]');
  const nextBtn = document.querySelector('[data-carousel="next"]');

  if (!carousel || !viewport || !track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll('.review-slide'));
  const dots = Array.from(document.querySelectorAll('[data-slide-dot]')).slice(0, slides.length);

  if (!slides.length) return;

  let current = 0;
  let startX = 0;
  let deltaX = 0;
  let dragging = false;
  let pointerId = null;

  const setLoading = (loading) => {
    carousel.classList.toggle('is-loading', loading);
    carousel.setAttribute('aria-busy', loading ? 'true' : 'false');
  };

  const update = () => {
    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide, index) => {
      const active = index === current;
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      slide.setAttribute('aria-label', `${index + 1} ${getLocaleStrings().carouselOf} ${slides.length}`);
    });

    dots.forEach((dot, index) => {
      const active = index === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
  };

  const goTo = (index) => {
    const max = slides.length - 1;

    if (index < 0) {
      current = max;
    } else if (index > max) {
      current = 0;
    } else {
      current = index;
    }

    update();
  };

  const finishDrag = (event) => {
    if (!dragging) return;
    if (pointerId !== null && event.pointerId !== pointerId) return;

    if (Math.abs(deltaX) > CONFIG.swipeThreshold) {
      goTo(deltaX > 0 ? current - 1 : current + 1);
    }

    if (
      pointerId !== null &&
      typeof viewport.releasePointerCapture === 'function' &&
      viewport.hasPointerCapture(pointerId)
    ) {
      viewport.releasePointerCapture(pointerId);
    }

    dragging = false;
    pointerId = null;
    deltaX = 0;
  };

  setLoading(true);

  if (slides.length < 2) {
    carousel.classList.add('is-static');
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    dots.forEach((dot) => {
      dot.hidden = true;
      dot.tabIndex = -1;
    });
    update();
    window.requestAnimationFrame(() => setLoading(false));
    return;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goTo(index));
  });

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    }
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragging = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    deltaX = 0;

    if (typeof viewport.setPointerCapture === 'function') {
      viewport.setPointerCapture(pointerId);
    }
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    if (pointerId !== null && event.pointerId !== pointerId) return;

    deltaX = event.clientX - startX;
  });

  viewport.addEventListener('pointerup', finishDrag);
  viewport.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('pointerleave', finishDrag);

  update();
  window.requestAnimationFrame(() => setLoading(false));
}

function syncOpenAccordionHeight() {
  const openPanel = document.querySelector('.faq-item.is-open .faq-panel');
  if (openPanel instanceof HTMLElement) {
    openPanel.style.maxHeight = `${openPanel.scrollHeight}px`;
  }
}

function initAccordion() {
  const container = document.querySelector('[data-accordion]');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.faq-item'));
  if (!items.length) return;

  const entries = items
    .map((item, index) => {
      const heading = item.querySelector('h3');
      const button = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');
      if (!button || !panel) return null;

      if (!button.id) button.id = `faq-trigger-auto-${index + 1}`;
      if (!panel.id) panel.id = `faq-panel-auto-${index + 1}`;

      button.setAttribute('aria-controls', panel.id);
      button.setAttribute('aria-expanded', 'false');
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', button.id);
      panel.setAttribute('aria-hidden', 'true');
      panel.style.maxHeight = '0px';

      return { item, heading, button, panel };
    })
    .filter(Boolean);

  if (!entries.length) return;

  const closeEntry = (entry) => {
    entry.item.classList.remove('is-open');
    entry.button.setAttribute('aria-expanded', 'false');
    entry.panel.setAttribute('aria-hidden', 'true');
    entry.panel.style.maxHeight = '0px';
  };

  const openEntry = (entry) => {
    entry.item.classList.add('is-open');
    entry.button.setAttribute('aria-expanded', 'true');
    entry.panel.setAttribute('aria-hidden', 'false');
    entry.panel.style.maxHeight = `${entry.panel.scrollHeight}px`;
  };

  const toggle = (entry) => {
    const open = entry.item.classList.contains('is-open');
    entries.forEach((item) => closeEntry(item));
    if (!open) openEntry(entry);
  };

  entries.forEach((entry) => {
    entry.button.addEventListener('click', () => toggle(entry));

    if (entry.heading) {
      entry.heading.addEventListener('click', (event) => {
        const fromButton = event.target instanceof HTMLElement && event.target.closest('button');
        if (fromButton) return;
        toggle(entry);
      });
    }
  });

  openEntry(entries[0]);
}

function validateField(name, value) {
  const locale = getLocaleStrings();

  if (name === 'name' && value.length < 2) {
    return locale.formNameError;
  }

  if (name === 'email') {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) return locale.formEmailError;
  }

  if (name === 'message' && value.length < 12) {
    return locale.formMessageError;
  }

  return '';
}

function setFieldError(fieldWrap, input, errorNode, message) {
  if (!fieldWrap || !input || !errorNode) return;

  const invalid = Boolean(message);
  fieldWrap.classList.toggle('invalid', invalid);

  if (invalid) {
    input.setAttribute('aria-invalid', 'true');
    errorNode.textContent = message;
  } else {
    input.removeAttribute('aria-invalid');
    errorNode.textContent = '';
  }
}

function initForm() {
  const form = document.querySelector('[data-js="contact-form"]');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const fields = {
    name: {
      input: form.querySelector('#name'),
      wrap: form.querySelector('#name')?.closest('.field'),
      error: document.getElementById('name-error')
    },
    email: {
      input: form.querySelector('#email'),
      wrap: form.querySelector('#email')?.closest('.field'),
      error: document.getElementById('email-error')
    },
    message: {
      input: form.querySelector('#message'),
      wrap: form.querySelector('#message')?.closest('.field'),
      error: document.getElementById('message-error')
    }
  };

  Object.entries(fields).forEach(([name, field]) => {
    field.input?.addEventListener('input', () => {
      const message = validateField(name, field.input.value.trim());
      setFieldError(field.wrap, field.input, field.error, message);
      status.textContent = '';
      status.className = 'form-status';
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let hasError = false;
    let firstInvalid = null;

    Object.entries(fields).forEach(([name, field]) => {
      if (!field.input) return;

      const message = validateField(name, field.input.value.trim());
      setFieldError(field.wrap, field.input, field.error, message);

      if (message) {
        hasError = true;
        if (!firstInvalid) firstInvalid = field.input;
      }
    });

    if (hasError) {
      status.textContent = getLocaleStrings().formInvalidStatus;
      status.className = 'form-status error';
      firstInvalid?.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn instanceof HTMLButtonElement) {
      submitBtn.disabled = true;
      submitBtn.textContent = getLocaleStrings().formSending;
    }

    await new Promise((resolve) => setTimeout(resolve, CONFIG.fakeSubmitDelayMs));

    form.reset();
    Object.values(fields).forEach((field) => {
      if (!field.input) return;
      setFieldError(field.wrap, field.input, field.error, '');
    });

    status.textContent = getLocaleStrings().formSuccessStatus;
    status.className = 'form-status success';
    showToast(getLocaleStrings().formSuccessToast);

    if (submitBtn instanceof HTMLButtonElement) {
      submitBtn.disabled = false;
      submitBtn.textContent = getLocaleStrings().formSubmit;
    }
  });
}

function initBackToTop() {
  if (!refs.toTopButton) return;

  const update = () => {
    refs.toTopButton?.classList.toggle('is-visible', window.scrollY > CONFIG.backToTopThreshold);
  };

  const onScroll = rafThrottle(update);
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  refs.toTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}

function initButtonsMicroInteractions() {
  if (prefersReducedMotion()) return;

  document.addEventListener('pointerdown', (event) => {
    const button = event.target instanceof HTMLElement ? event.target.closest('.btn') : null;
    if (!button) return;

    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty('--ripple-x', `${x}px`);
    button.style.setProperty('--ripple-y', `${y}px`);
    button.classList.remove('is-rippling');

    window.requestAnimationFrame(() => {
      button.classList.add('is-rippling');
    });
  });

  document.addEventListener('animationend', (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (!event.target.classList.contains('btn')) return;
    event.target.classList.remove('is-rippling');
  });
}

function initDevSelfCheck() {
  if (!isDevEnvironment()) return;

  const checks = [
    ['[data-js="site-header"]', refs.header],
    ['[data-js="lang-toggle"]', refs.langToggle],
    ['[data-js="menu-toggle"]', refs.menuToggle],
    ['[data-js="main-nav"]', refs.mainNav],
    ['[data-js="to-top"]', refs.toTopButton],
    ['[data-js="contact-form"]', document.querySelector('[data-js="contact-form"]')],
    ['[data-js="carousel"]', document.querySelector('[data-js="carousel"]')],
    ['[data-accordion]', document.querySelector('[data-accordion]')]
  ];

  checks.forEach(([selector, node]) => {
    if (!node) {
      console.warn(`[self-check] Элемент не найден: ${selector}`);
    }
  });

  refs.navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    if (!document.querySelector(href)) {
      console.warn(`[self-check] Целевая секция для ссылки не найдена: ${href}`);
    }
  });
}

function initViewportSync(menuApi, spyApi) {
  const onResize = rafThrottle(() => {
    setHeaderHeightVar();
    menuApi.sync();
    spyApi.sync();
    syncOpenAccordionHeight();
  });

  window.addEventListener('resize', onResize);
}

function init() {
  setCurrentYear();
  setHeaderHeightVar();
  initLanguage();

  const menuApi = initMenu();
  const spyApi = initScrollSpy();

  initSmoothAnchorScroll(menuApi);
  initHeaderScrollState();
  initReveal();
  initPortfolio();
  initCarousel();
  initAccordion();
  initForm();
  initBackToTop();
  initButtonsMicroInteractions();
  initViewportSync(menuApi, spyApi);
  initDevSelfCheck();
}

document.addEventListener('DOMContentLoaded', init);
