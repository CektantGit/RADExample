(() => {
  const overlay = document.getElementById('configurator-overlay');
  if (!overlay) return;

  const openButton = document.querySelector('[data-open-overlay]');
  const closeButtons = overlay.querySelectorAll('[data-close-overlay]');

  const openOverlay = () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButton?.addEventListener('click', openOverlay);
  closeButtons.forEach((button) => button.addEventListener('click', closeOverlay));

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeOverlay();
  });
})();
