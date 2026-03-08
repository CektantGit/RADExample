(() => {
  const CONFIGURATOR_URL = 'https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45';

  const guides = {
    redirect: {
      title: 'Redirect Integration Guide (Shopify)',
      description: 'This method opens the configurator in a new tab from a product-page button.',
      steps: [
        'Step 1: Add the Custom Liquid snippet on the product template where the CTA should appear.',
        'Step 2: Save and publish. No global theme.liquid script is required for this method.',
      ],
      sections: [
        {
          label: 'Part 1 — Custom Liquid block (product page)',
          code: `<a href="${CONFIGURATOR_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#000;color:#fff;padding:16px 32px;font-size:16px;font-weight:600;border-radius:8px;text-decoration:none;">Open Configurator</a>`,
        },
      ],
    },
    'iframe-overlay': {
      title: 'iFrame Overlay Integration Guide (Shopify)',
      description: 'This method keeps users on the same page and opens the configurator in a full-screen overlay modal.',
      steps: [
        'Step 1: Add Part 2 once in theme.liquid before </body>.',
        'Step 2: Add Part 1 via Custom Liquid block on any product page where you need the CTA.',
        'Step 3: Save both files and test on storefront.',
      ],
      sections: [
        {
          label: 'Part 1 — Custom Liquid block (product page button)',
          code: `<button type="button" id="vizbl-open-configurator" style="background-color:#000;color:#fff;padding:16px 32px;font-size:16px;font-weight:600;border:none;border-radius:8px;cursor:pointer;transition:all .3s ease;width:100%;margin:10px 0;">Open Configurator</button>\n<style>\n#vizbl-open-configurator:hover{background-color:#333;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.2);}\n#vizbl-open-configurator:active{transform:translateY(0);}\n<\/style>`,
        },
        {
          label: 'Part 2 — theme.liquid (add once before </body>)',
          code: `<div id="vizbl-configurator-overlay" aria-hidden="true" role="dialog" aria-label="Configurator overlay">\n  <div data-vizbl-close-overlay></div>\n  <div>\n    <button type="button" aria-label="Close configurator" data-vizbl-close-overlay>×</button>\n    <iframe title="Vizbl Configurator" src="${CONFIGURATOR_URL}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>\n  </div>\n</div>\n\n<style>\n#vizbl-configurator-overlay{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .25s ease;}\n#vizbl-configurator-overlay.is-open{opacity:1;pointer-events:auto;}\n#vizbl-configurator-overlay>[data-vizbl-close-overlay]{position:absolute;inset:0;background:rgba(14,14,16,.72);}\n#vizbl-configurator-overlay>div:last-child{position:relative;width:min(1280px,96vw);height:min(88vh,920px);border-radius:16px;overflow:hidden;border:1px solid #2f2f34;box-shadow:0 28px 50px rgba(0,0,0,.35);background:#121316;}\n#vizbl-configurator-overlay iframe{width:100%;height:100%;border:0;}\n#vizbl-configurator-overlay button[data-vizbl-close-overlay]{position:absolute;top:.8rem;right:.8rem;z-index:2;border:1px solid rgba(255,255,255,.3);width:38px;height:38px;border-radius:50%;background:rgba(15,15,16,.7);color:#fff;font-size:1.4rem;line-height:1;cursor:pointer;}\n@media (max-width:640px){#vizbl-configurator-overlay>div:last-child{width:98vw;height:90vh;border-radius:10px;}}\n<\/style>\n\n<script>\n(() => {\n  if (window.__vizblOverlayInit) return;\n  window.__vizblOverlayInit = true;\n  const overlay = document.getElementById('vizbl-configurator-overlay');\n  const openButton = document.getElementById('vizbl-open-configurator');\n  const closeButtons = overlay?.querySelectorAll('[data-vizbl-close-overlay]') || [];\n  const openOverlay = () => { overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };\n  const closeOverlay = () => { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };\n  openButton?.addEventListener('click', openOverlay);\n  closeButtons.forEach((button) => button.addEventListener('click', closeOverlay));\n  window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeOverlay(); });\n})();\n<\/script>`,
        },
      ],
    },
    embedded: {
      title: 'Embedded Integration Guide (Shopify)',
      description: 'This method renders the configurator directly inside your product layout.',
      steps: [
        'Step 1: Add the Custom Liquid snippet where the embedded configurator should be displayed.',
        'Step 2: Save and publish. No global theme.liquid script is required for this method.',
      ],
      sections: [
        {
          label: 'Part 1 — Custom Liquid block (product page)',
          code: `<iframe src="${CONFIGURATOR_URL}" title="Embedded Vizbl Configurator" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" style="width:100%;min-height:700px;border:0;"></iframe>`,
        },
      ],
    },
  };

  const escapeHtml = (value) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');

  const buildGuideDocument = (guide) => {
    const sections = guide.sections
      .map(
        (section, index) => `
          <section class="card">
            <h3>${escapeHtml(section.label)}</h3>
            <button class="copy-btn" type="button" data-copy-target="code-${index}">Copy this part</button>
            <pre id="code-${index}"><code>${escapeHtml(section.code)}</code></pre>
          </section>
        `
      )
      .join('');

    const steps = guide.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('');

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(guide.title)}</title>
    <style>
      body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #f7f7f5; color: #1d1d1f; }
      .wrap { padding: 20px; max-width: 980px; margin: 0 auto; }
      h1 { margin: 0 0 10px; font-size: 28px; }
      p { margin: 0 0 14px; color: #52545a; }
      .note { background: #fff; border: 1px solid #e6e5e2; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; }
      .note ol { margin: 10px 0 0 20px; }
      .card { background: #fff; border: 1px solid #e6e5e2; border-radius: 14px; padding: 14px; margin-bottom: 14px; }
      .card h3 { margin: 0 0 10px; font-size: 16px; }
      .copy-btn { background: #111; color: #fff; border: 0; border-radius: 8px; padding: 8px 12px; font-weight: 600; cursor: pointer; margin-bottom: 10px; }
      pre { margin: 0; background: #111; color: #f2f2f2; border-radius: 10px; padding: 12px; overflow: auto; font-size: 12px; line-height: 1.45; }
      .status { min-height: 1.2em; color: #52545a; font-size: 13px; margin-top: 10px; }
      a { color: #1d1d1f; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>${escapeHtml(guide.title)}</h1>
      <p>${escapeHtml(guide.description)}</p>
      <div class="note">
        <strong>Client instructions</strong>
        <ol>${steps}</ol>
        <p style="margin-top:10px;">Configurator URL: <a href="${CONFIGURATOR_URL}" target="_blank" rel="noopener noreferrer">${CONFIGURATOR_URL}</a></p>
      </div>
      ${sections}
      <p class="status" id="copy-status"></p>
    </div>

    <script>
      const setStatus = (text) => { document.getElementById('copy-status').textContent = text; };
      const copyText = async (text) => {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          return;
        }
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      };
      document.querySelectorAll('[data-copy-target]').forEach((button) => {
        button.addEventListener('click', async () => {
          const code = document.querySelector('#' + button.getAttribute('data-copy-target') + ' code')?.textContent || '';
          try {
            await copyText(code);
            setStatus('Copied to clipboard.');
          } catch {
            setStatus('Copy failed. Please copy manually from the code block.');
          }
        });
      });
    <\/script>
  </body>
</html>`;
  };

  const ensureGuideOverlay = () => {
    let overlay = document.getElementById('integration-guide-overlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'integration-guide-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="guide-backdrop" data-close-guide></div>
      <div class="guide-panel">
        <button class="guide-close" type="button" aria-label="Close guide" data-close-guide>×</button>
        <iframe id="integration-guide-frame" title="Integration Guide"></iframe>
      </div>
    `;
    document.body.appendChild(overlay);

    if (!document.getElementById('integration-guide-style')) {
      const style = document.createElement('style');
      style.id = 'integration-guide-style';
      style.textContent = `
        #integration-guide-overlay { position: fixed; inset: 0; z-index: 2147483647; display: grid; place-items: center; opacity: 0; pointer-events: none; transition: opacity .2s ease; }
        #integration-guide-overlay.is-open { opacity: 1; pointer-events: auto; }
        #integration-guide-overlay .guide-backdrop { position: absolute; inset: 0; background: rgba(14,14,16,.74); }
        #integration-guide-overlay .guide-panel { position: relative; width: min(1200px, 96vw); height: min(92vh, 960px); background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.35); }
        #integration-guide-overlay iframe { width: 100%; height: 100%; border: 0; background: #fff; }
        #integration-guide-overlay .guide-close { position: absolute; right: 10px; top: 10px; z-index: 2; width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,.45); background: rgba(0,0,0,.62); color: #fff; font-size: 22px; cursor: pointer; }
      `;
      document.head.appendChild(style);
    }

    const closeGuide = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    overlay.querySelectorAll('[data-close-guide]').forEach((el) => {
      el.addEventListener('click', closeGuide);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeGuide();
    });

    return overlay;
  };

  const openGuide = (key) => {
    const guide = guides[key];
    if (!guide) return;
    const overlay = ensureGuideOverlay();
    const frame = document.getElementById('integration-guide-frame');
    frame.srcdoc = buildGuideDocument(guide);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('[data-copy-code]').forEach((button) => {
    button.addEventListener('click', () => {
      openGuide(button.getAttribute('data-copy-code'));
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
