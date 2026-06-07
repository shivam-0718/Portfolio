// loading animations and controlling the loading screen lifecycle
window.addEventListener('load', () => {
      const loaderWrapper = document.querySelector('.loader-wrapper');
      if (!loaderWrapper) return;
      setTimeout(() => {
          loaderWrapper.style.opacity = '0';
          setTimeout(() => {
              loaderWrapper.style.display = 'none';
          }, 500);
      }, 1500);
  });

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('section[id]');

    window.showSection = function showSection(sectionId) {
        allSections.forEach(s => s.classList.remove('section-active'));
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        const target = document.getElementById(sectionId);
        if (target) target.classList.add('section-active');
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    const hashSection = window.location.hash.replace('#', '');
    if (hashSection && document.getElementById(hashSection)) {
        showSection(hashSection);
    } else {
        showSection('about');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.dataset.section) return;
            e.preventDefault();
            showSection(link.dataset.section);
            document.body.classList.remove('sidebar-open');
        });
    });

    const swipeHint = document.getElementById('swipeHint');
    if (swipeHint) {
        swipeHint.addEventListener('click', () => {
            document.body.classList.add('sidebar-open');
        });
    }

    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('sidebar-open')) {
            const sidebar = document.querySelector('.sidebar');
            const hint = document.getElementById('swipeHint');
            if (!sidebar.contains(e.target) && e.target !== hint) {
                document.body.classList.remove('sidebar-open');
            }
        }
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (dx > 60 && touchStartX < 40) {
            document.body.classList.add('sidebar-open');
        } else if (dx < -60) {
            document.body.classList.remove('sidebar-open');
        }
    }, { passive: true });
});