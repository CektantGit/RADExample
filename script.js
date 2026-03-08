(() => {
  const snippets = {
    redirect: `<a href="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45" target="_blank" rel="noopener noreferrer">Open Configurator</a>`,
    'iframe-overlay': `<button id="open-configurator">Open Configurator</button>\n<div id="vizbl-overlay" hidden>\n  <button id="close-configurator" aria-label="Close configurator">×</button>\n  <iframe src="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45" title="Vizbl Configurator"></iframe>\n</div>\n<script>\n  const overlay = document.getElementById('vizbl-overlay');\n  document.getElementById('open-configurator').addEventListener('click', () => overlay.hidden = false);\n  document.getElementById('close-configurator').addEventListener('click', () => overlay.hidden = true);\n<\/script>`,
    embedded: `<iframe\n  src="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45"\n  title="Embedded Vizbl Configurator"\n  loading="lazy"\n  referrerpolicy="strict-origin-when-cross-origin"\n  style="width:100%;min-height:700px;border:0;"\n></iframe>`,
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
