// Retro Mac blog: menu-bar clock, decorative scroll thumb, window boxes.
(function () {
  function tick() {
    var d = new Date();
    var day = d.toLocaleDateString('en-US', { weekday: 'short' });
    var time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    document.querySelectorAll('[data-clock]').forEach(function (el) { el.textContent = day + ' ' + time; });
  }
  tick();
  setInterval(tick, 30000);

  // Post pages: move the scroll-bar thumb with reading progress.
  var thumb = document.querySelector('.m-scroll__thumb');
  var article = document.querySelector('.m-post-body');
  if (thumb && article) {
    var queued = false;
    var update = function () {
      queued = false;
      var rect = article.getBoundingClientRect();
      var range = rect.height - window.innerHeight;
      var p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      thumb.style.top = 'calc(' + (p * 100) + '% - ' + (p * 16) + 'px)';
    };
    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Home: close box hides a window until reload, zoom box widens it.
  document.querySelectorAll('button.m-box--close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var win = btn.closest('.m-win');
      if (win) win.hidden = true;
    });
  });
  document.querySelectorAll('button.m-box--zoom').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var win = btn.closest('.m-win');
      if (!win) return;
      var on = win.classList.toggle('m-win--zoomed');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  });
})();
