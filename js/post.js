document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // TOC: smooth scroll on click + active link tracking
    const tocLinks = document.querySelectorAll('.toc-link');

    tocLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const postSections = document.querySelectorAll('.post-section[id]');
    if (tocLinks.length && postSections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tocLinks.forEach(l => l.classList.remove('active'));
                    const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
                    if (active) active.classList.add('active');
                }
            });
        }, { rootMargin: '-10% 0% -80% 0%' });

        postSections.forEach(s => observer.observe(s));
    }

    // Mobile sidebar
    const swipeHint = document.getElementById('swipeHint');
    if (swipeHint) {
        swipeHint.addEventListener('click', () => document.body.classList.add('sidebar-open'));
    }

    document.addEventListener('click', e => {
        if (document.body.classList.contains('sidebar-open')) {
            const sidebar = document.querySelector('.sidebar');
            const hint = document.getElementById('swipeHint');
            if (sidebar && !sidebar.contains(e.target) && e.target !== hint) {
                document.body.classList.remove('sidebar-open');
            }
        }
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (dx > 60 && touchStartX < 40) document.body.classList.add('sidebar-open');
        else if (dx < -60) document.body.classList.remove('sidebar-open');
    }, { passive: true });
});
