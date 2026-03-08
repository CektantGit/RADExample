(() => {
  const snippets = {
    redirect: `<a href="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45" target="_blank" rel="noopener noreferrer">Open Configurator</a>`,
    'iframe-overlay': `<button type="button" data-open-overlay>Open Configurator</button>

<div class="overlay" id="configurator-overlay" aria-hidden="true" role="dialog" aria-label="Configurator overlay">
  <div class="overlay-backdrop" data-close-overlay></div>
  <div class="overlay-panel">
    <button class="overlay-close" type="button" aria-label="Close configurator" data-close-overlay>×</button>
    <iframe
      title="Vizbl Configurator"
      src="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

<script>
  const overlay = document.getElementById('configurator-overlay');
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
<\/script>`,
    embedded: `<iframe
  src="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45"
  title="Embedded Vizbl Configurator"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  style="width:100%;min-height:700px;border:0;"
></iframe>`,
  };

  const statusEl = document.querySelector('[data-copy-status]');
  const copyButtons = document.querySelectorAll('[data-copy-code]');

  const setStatus = (message) => {
    if (!statusEl) return;
    statusEl.textContent = message;
  };

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'absolute';
    fallback.style.left = '-9999px';
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand('copy');
    document.body.removeChild(fallback);
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const key = button.getAttribute('data-copy-code');
      const snippet = snippets[key];
      if (!snippet) return;
      try {
        await copyText(snippet);
        setStatus('Code copied. You can paste it into Shopify.');
      } catch {
        setStatus('Copy failed. Please try again.');
      }
    });
  });

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
