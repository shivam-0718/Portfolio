document.addEventListener('DOMContentLoaded', function () {
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  var swipeHint = document.getElementById('swipeHint');
  if (swipeHint) {
    swipeHint.addEventListener('click', function () {
      document.body.classList.add('sidebar-open');
    });
  }

  document.addEventListener('click', function (e) {
    if (document.body.classList.contains('sidebar-open')) {
      var sidebar = document.querySelector('.sidebar');
      var hint = document.getElementById('swipeHint');
      if (!sidebar.contains(e.target) && e.target !== hint) {
        document.body.classList.remove('sidebar-open');
      }
    }
  });

  var touchStartX = 0;
  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 60 && touchStartX < 40) {
      document.body.classList.add('sidebar-open');
    } else if (dx < -60) {
      document.body.classList.remove('sidebar-open');
    }
  }, { passive: true });
});
