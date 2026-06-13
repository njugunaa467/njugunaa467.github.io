/* ── MOBILE NAV ──────────────────────────────────────────── */
const burger    = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  const setMenu = (open) => {
    mobileNav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
  };

  burger.addEventListener('click', () => setMenu(!mobileNav.classList.contains('open')));

  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => setMenu(false))
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
  });
}

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── ACTIVE NAV LINK ─────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── REVEAL ON SCROLL ────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -56px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── GITHUB PROFILE ──────────────────────────────────────── */
const GITHUB_USER = 'njugunaa467';

const FALLBACK_REPOS = [
  {
    name: 'flow-ops-systems',
    language: 'TypeScript',
    description: 'FlowOps Systems — SaaS platform and marketing site built with Next.js.',
    html_url: 'https://github.com/njugunaa467',
    updated_at: new Date().toISOString(),
    stargazers_count: 0
  },
  {
    name: 'weather-app',
    language: 'JavaScript',
    description: 'Weather dashboard with OpenWeather API integration.',
    html_url: 'https://github.com/njugunaa467',
    updated_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    stargazers_count: 0
  },
  {
    name: 'quick-quiz',
    language: 'JavaScript',
    description: 'React quiz app with categories, timers, and score tracking.',
    html_url: 'https://github.com/njugunaa467',
    updated_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    stargazers_count: 0
  },
  {
    name: 'portfolio',
    language: 'HTML',
    description: 'Personal portfolio site — this repository.',
    html_url: 'https://github.com/njugunaa467/njugunaa467.github.io',
    updated_at: new Date().toISOString(),
    stargazers_count: 0
  }
];

const formatRelative = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
};

const renderRepos = (repos) => {
  const container = document.getElementById('githubRepos');
  if (!container) return;

  const featured = repos
    .filter(r => !r.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 4);

  container.innerHTML = featured.map(repo => `
    <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-card">
      <div class="repo-name">
        ${repo.name}
        ${repo.language ? `<span class="repo-lang">${repo.language}</span>` : ''}
      </div>
      <p class="repo-desc">${repo.description || 'No description provided.'}</p>
      <div class="repo-meta">Updated ${formatRelative(repo.updated_at)}${repo.stargazers_count ? ` · ★ ${repo.stargazers_count}` : ''}</div>
    </a>
  `).join('');
};

const renderActivity = (repos) => {
  const barsEl = document.getElementById('activityBars');
  const subEl  = document.getElementById('ghActivitySub');
  if (!barsEl) return;

  const weeks = Array.from({ length: 12 }, (_, i) => {
    const weekStart = Date.now() - (11 - i) * 7 * 86400000;
    const weekEnd   = weekStart + 7 * 86400000;
    const count = repos.filter(r => {
      const t = new Date(r.updated_at).getTime();
      return t >= weekStart && t < weekEnd;
    }).length;
    return count;
  });

  const max = Math.max(...weeks, 1);

  barsEl.innerHTML = weeks.map((count, i) => {
    const h = Math.max(12, (count / max) * 100);
    const active = i === weeks.length - 1 && count > 0;
    return `<div class="activity-bar${active ? ' active' : ''}" style="height:${h}%" title="${count} repo update${count !== 1 ? 's' : ''}"></div>`;
  }).join('');

  if (subEl) subEl.textContent = 'Last 12 weeks · repo updates';
};

const renderStats = (user, repos) => {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('ghRepos', user?.public_repos ?? repos.length);
  set('ghFollowers', user?.followers ?? '—');

  const latest = repos.reduce((a, b) =>
    new Date(a.updated_at) > new Date(b.updated_at) ? a : b
  );
  set('ghUpdated', formatRelative(latest.updated_at));

  const langs = {};
  repos.forEach(r => {
    if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
  });
  const primary = Object.entries(langs).sort((a, b) => b[1] - a[1])[0];
  set('ghPrimary', primary ? primary[0] : 'JavaScript');
};

const loadGitHub = async () => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`)
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');

    const user  = await userRes.json();
    const repos = await reposRes.json();

    renderStats(user, repos);
    renderRepos(repos);
    renderActivity(repos);
  } catch {
    renderStats(null, FALLBACK_REPOS);
    renderRepos(FALLBACK_REPOS);
    renderActivity(FALLBACK_REPOS);

    const subEl = document.getElementById('ghActivitySub');
    if (subEl) subEl.textContent = 'Cached profile data';
  }
};

const githubSection = document.getElementById('github');
if (githubSection) {
  const ghObs = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) {
      loadGitHub();
      ghObs.disconnect();
    }
  }, { rootMargin: '200px' });
  ghObs.observe(githubSection);
}

/* ── CONTACT FORM ────────────────────────────────────────── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg   = document.getElementById('formMsg');

if (form && submitBtn && formMsg) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    formMsg.className     = 'form-msg';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        formMsg.textContent = "Message sent — I'll reply within 24 hours.";
        formMsg.className   = 'form-msg ok';
        form.reset();
      } else {
        const d = await res.json().catch(() => ({}));
        formMsg.textContent = d.error || 'Something went wrong — please email me directly.';
        formMsg.className   = 'form-msg err';
      }
    } catch {
      formMsg.textContent = 'Network error. Please email njugunaa467@gmail.com directly.';
      formMsg.className   = 'form-msg err';
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
