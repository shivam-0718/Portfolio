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
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('section[id]');

    function showSection(sectionId) {
        allSections.forEach(s => s.classList.remove('section-active'));
        navLinks.forEach(l => l.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) target.classList.add('section-active');
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    showSection('about');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
            document.body.classList.remove('sidebar-open');
        });
    });

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }
});