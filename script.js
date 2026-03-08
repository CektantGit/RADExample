(() => {
  const snippets = {
    redirect: `<a href="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45" target="_blank" rel="noopener noreferrer">Open Configurator</a>`,
    'iframe-overlay': `<button type="button" id="vizbl-open-configurator">Open Configurator</button>

<div id="vizbl-configurator-overlay" aria-hidden="true" role="dialog" aria-label="Configurator overlay">
  <div data-vizbl-close-overlay></div>
  <div>
    <button type="button" aria-label="Close configurator" data-vizbl-close-overlay>×</button>
    <iframe
      title="Vizbl Configurator"
      src="https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

<style>
  #vizbl-configurator-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    display: grid;
    place-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  #vizbl-configurator-overlay.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  #vizbl-configurator-overlay > [data-vizbl-close-overlay] {
    position: absolute;
    inset: 0;
    background: rgba(14, 14, 16, 0.72);
  }

  #vizbl-configurator-overlay > div:last-child {
    position: relative;
    width: min(1280px, 96vw);
    height: min(88vh, 920px);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #2f2f34;
    box-shadow: 0 28px 50px rgba(0, 0, 0, 0.35);
    background: #121316;
  }

  #vizbl-configurator-overlay iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  #vizbl-configurator-overlay button[data-vizbl-close-overlay] {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(15, 15, 16, 0.7);
    color: #fff;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    #vizbl-configurator-overlay > div:last-child {
      width: 98vw;
      height: 90vh;
      border-radius: 10px;
    }
  }
</style>

<script>
  (() => {
    if (window.__vizblOverlayInit) return;
    window.__vizblOverlayInit = true;

    const overlay = document.getElementById('vizbl-configurator-overlay');
    const openButton = document.getElementById('vizbl-open-configurator');
    const closeButtons = overlay?.querySelectorAll('[data-vizbl-close-overlay]') || [];

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
