// ==========================================
// LOADER
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ==========================================
// NAVBAR SCROLL EFFECT & ACTIVE SECTION
// ==========================================
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Highlight active section in navbar
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// ==========================================
// TYPING EFFECT
// ==========================================
const typingText = document.querySelector('.typing-text');
const roles = ['Full Stack Java Developer', 'Backend Specialist', 'Problem Solver', 'Code Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ==========================================
// CODE EDITOR TYPING EFFECT
// ==========================================
const codeLines = [
    'const developer = {',
    '  name: "Passionate Coder",',
    '  skills: ["Java", "Spring Boot", "React"],',
    '  passion: "Building Solutions",',
    '  status: "Always Learning"',
    '};'
];

const codeContainer = document.querySelector('.code-lines');
let lineIndex = 0;

function typeCodeLine() {
    if (lineIndex < codeLines.length) {
        const line = document.createElement('div');
        line.className = 'code-line';
        line.style.opacity = '0';
        line.textContent = codeLines[lineIndex];
        codeContainer.appendChild(line);

        setTimeout(() => {
            line.style.opacity = '1';
        }, 50);

        lineIndex++;
        setTimeout(typeCodeLine, 400);
    }
}

// Start code typing after loader
setTimeout(typeCodeLine, 2000);

// ==========================================
// RENDER PROJECTS
// ==========================================
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>` : ''}
                        ${project.live ? `<a href="${project.live}" target="_blank" class="project-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

// ==========================================
// RENDER EXPERIENCE
// ==========================================
function renderExperience() {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';

    experience.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.1}s`;

        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${item.period}</div>
                <h3>${item.title}</h3>
                <h4>${item.company}</h4>
                <p>${item.description}</p>
                ${item.achievements ? `
                    <ul class="achievements">
                        ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;

        timeline.appendChild(timelineItem);
    });
}

// ==========================================
// RENDER SKILLS
// ==========================================
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = '';

    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.style.animationDelay = `${index * 0.05}s`;

        skillCard.innerHTML = `
            <div class="skill-icon">
                <img src="${skill.icon}" alt="${skill.name}">
            </div>
            <div class="skill-name">${skill.name}</div>
        `;

        skillsGrid.appendChild(skillCard);
    });
}

// ==========================================
// RENDER CONTACT INFO
// ==========================================
function renderContact() {
    const contactGrid = document.querySelector('.contact-grid');
    contactGrid.innerHTML = '';

    const contactItems = [
        {
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>`,
            title: 'Email',
            value: contactInfo.email,
            link: `mailto:${contactInfo.email}`
        },
        {
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>`,
            title: 'Phone',
            value: contactInfo.phone,
            link: `tel:${contactInfo.phone}`
        },
        {
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>`,
            title: 'Location',
            value: contactInfo.location,
            link: null
        }
    ];

    contactItems.forEach((item, index) => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.style.animationDelay = `${index * 0.1}s`;

        const content = `
            <div class="contact-icon">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.value}</p>
        `;

        if (item.link) {
            contactCard.innerHTML = `<a href="${item.link}">${content}</a>`;
        } else {
            contactCard.innerHTML = content;
        }

        contactGrid.appendChild(contactCard);
    });

    // Render social links
    const socialLinks = document.querySelector('.social-links');
    socialLinks.innerHTML = '';

    const socials = [
        {
            name: 'GitHub',
            url: contactInfo.social.github,
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>`
        },
        {
            name: 'LinkedIn',
            url: contactInfo.social.linkedin,
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>`
        },
        {
            name: 'Twitter',
            url: contactInfo.social.twitter,
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>`
        }
    ];

    socials.forEach(social => {
        if (social.url) {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.className = 'social-link';
            link.setAttribute('aria-label', social.name);
            link.innerHTML = social.icon;
            socialLinks.appendChild(link);
        }
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize all dynamic content
    renderProjects();
    renderExperience();
    renderSkills();
    renderContact();
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// PARALLAX EFFECT FOR DEVELOPER SECTION
// ==========================================
window.addEventListener('scroll', () => {
    const developerSection = document.querySelector('.developer');
    const scrolled = window.scrollY;
    if (developerSection && scrolled < window.innerHeight) {
        developerSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        developerSection.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});
