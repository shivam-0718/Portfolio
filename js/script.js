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