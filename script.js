document.addEventListener('DOMContentLoaded', () => {
    // Grid Trail Effect
    const gridContainer = document.getElementById('gridContainer');
    const dotSize = 50; // Distance between dots in pixels

    function createGrid() {
        gridContainer.innerHTML = '';
        const gridBackground = document.createElement('div');
        gridBackground.className = 'grid-background';

        const cols = Math.ceil(window.innerWidth / dotSize);
        const rows = Math.ceil(window.innerHeight / dotSize);

        gridBackground.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridBackground.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        const totalDots = cols * rows;
        const dots = [];

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'grid-dot';
            gridBackground.appendChild(dot);
            dots.push(dot);
        }

        gridContainer.appendChild(gridBackground);
        return dots;
    }

    let dots = createGrid();
    window.addEventListener('resize', () => {
        dots = createGrid();
    });

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const dotX = rect.left + rect.width / 2;
            const dotY = rect.top + rect.height / 2;

            const dist = Math.hypot(mouseX - dotX, mouseY - dotY);

            if (dist < 100) {
                dot.classList.add('active');
                // Calculate scale based on distance
                const scale = 1 + (1.5 * (1 - dist / 100));
                dot.style.transform = `scale(${scale})`;
            } else {
                dot.classList.remove('active');
                dot.style.transform = 'scale(1)';
            }
        });
    });

    // Theme Logic
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            themeIcon.className = 'fa-regular fa-sun';
        } else {
            themeIcon.className = 'fa-regular fa-moon';
        }
    };

    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });

    // Tool Card Hover Micro-interactions (Optional)
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Potential for more complex animations if needed
        });
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});
