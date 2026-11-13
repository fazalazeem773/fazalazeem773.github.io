// Theme toggle. The initial theme is set inline in <head> to avoid a flash.
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'dark') {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
    }
    try {
        localStorage.setItem('theme', next);
    } catch (e) {
        // Storage unavailable: the choice just lasts for this visit.
    }
});

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open) {
    nav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

// Mark the section currently in view in the nav
const navLinks = new Map(
    [...nav.querySelectorAll('a')].map(link => [link.getAttribute('href').slice(1), link])
);

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.removeAttribute('aria-current'));
            const link = navLinks.get(entry.target.id);
            if (link) link.setAttribute('aria-current', 'true');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    navLinks.forEach((_, id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}
