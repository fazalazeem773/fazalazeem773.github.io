// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
} else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add animation class
    themeToggle.classList.add('theme-toggled');
    setTimeout(() => themeToggle.classList.remove('theme-toggled'), 300);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// ============================================
// TYPING ANIMATION FOR HERO
// ============================================
const heroTitle = document.querySelector('.hero-title');
const roles = ['Cyber Security Student', 'App Developer', 'Problem Solver', 'Security Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        heroTitle.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        heroTitle.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
setTimeout(typeRole, 1000);

// ============================================
// MOBILE NAVIGATION
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll('.exp-card, .project-card, .skill-category, .section-title, .about-intro, .contact-btn');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

// ============================================
// PROGRESSIVE DISCLOSURE - Expand Buttons
// ============================================
document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const target = document.getElementById(targetId);

        btn.classList.toggle('expanded');
        target.classList.toggle('open');

        const span = btn.querySelector('span');
        if (btn.classList.contains('expanded')) {
            span.textContent = span.textContent.replace('More', 'Less');
        } else {
            span.textContent = span.textContent.replace('Less', 'More');
        }
    });
});

// ============================================
// PROGRESSIVE DISCLOSURE - Experience Cards
// ============================================
document.querySelectorAll('.exp-card').forEach(card => {
    const header = card.querySelector('.exp-header');

    header.addEventListener('click', () => {
        document.querySelectorAll('.exp-card').forEach(c => {
            if (c !== card) c.classList.remove('expanded');
        });
        card.classList.toggle('expanded');
    });
});

// ============================================
// PROGRESSIVE DISCLOSURE - Project Cards
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.project-card').forEach(c => {
            if (c !== card) c.classList.remove('expanded');
        });
        card.classList.toggle('expanded');
    });
});

// ============================================
// PROGRESSIVE DISCLOSURE - Skills Categories
// ============================================
const skillsDisplay = document.getElementById('skills-display');

document.querySelectorAll('.skill-category').forEach(btn => {
    btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('active');

        document.querySelectorAll('.skill-category').forEach(b => {
            b.classList.remove('active');
        });

        if (wasActive) {
            skillsDisplay.innerHTML = '';
            skillsDisplay.classList.remove('has-content');
        } else {
            btn.classList.add('active');
            const skills = btn.dataset.skills.split(',');

            skillsDisplay.innerHTML = `
                <div class="skill-pills">
                    ${skills.map((skill, i) => `<span class="skill-pill" style="animation-delay: ${i * 0.1}s">${skill.trim()}</span>`).join('')}
                </div>
            `;
            skillsDisplay.classList.add('has-content');
        }
    });
});

// ============================================
// ACTIVE NAVIGATION ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.querySelectorAll('.exp-card, .project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ============================================
// MOUSE PARALLAX ON HERO
// ============================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 50;
    const y = (e.clientY - rect.top - rect.height / 2) / 50;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;
});

hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0, 0)';
});

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
document.querySelectorAll('.contact-btn, .skill-category, .expand-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// TILT EFFECT ON CARDS
// ============================================
document.querySelectorAll('.project-card, .exp-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// FLOATING PARTICLES IN HERO
// ============================================
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    hero.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// COUNTER ANIMATION FOR SKILL COUNTS
// ============================================
const skillCategories = document.querySelectorAll('.skill-category');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            skillCategories.forEach(cat => {
                const countEl = cat.querySelector('.skill-count');
                const target = parseInt(countEl.textContent);
                let current = 0;

                const increment = () => {
                    if (current < target) {
                        current++;
                        countEl.textContent = current;
                        setTimeout(increment, 100);
                    }
                };

                setTimeout(increment, Math.random() * 500);
            });
        }
    });
}, { threshold: 0.5 });

if (skillCategories.length > 0) {
    counterObserver.observe(skillCategories[0].parentElement);
}

// ============================================
// NAVBAR HIDE/SHOW ON SCROLL
// ============================================
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// ============================================
// CURSOR GLOW EFFECT
// ============================================
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .exp-card, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});
