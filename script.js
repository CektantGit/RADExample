(() => {
  const CONFIGURATOR_URL = 'https://configurator.vizbl.com/0affd758-2fd5-423c-b628-b9b726965c45';

  const redirectButtonCode = `<a href="${CONFIGURATOR_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#000;color:#fff;padding:16px 32px;font-size:16px;font-weight:600;border-radius:8px;text-decoration:none;">Open Configurator</a>`;

  const iframeButtonCode = `<button type="button" id="vizbl-open-configurator" style="background-color:#000;color:#fff;padding:16px 32px;font-size:16px;font-weight:600;border:none;border-radius:8px;cursor:pointer;transition:all .3s ease;width:100%;margin:10px 0;">Open Configurator</button>
<style>
#vizbl-open-configurator:hover{background-color:#333;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.2);}
#vizbl-open-configurator:active{transform:translateY(0);}
<\/style>`;

  const iframeOverlayContainerCode = `<div id="vizbl-configurator-overlay" aria-hidden="true" role="dialog" aria-label="Configurator overlay">
  <div data-vizbl-close-overlay></div>
  <div>
    <button type="button" aria-label="Close configurator" data-vizbl-close-overlay>×</button>
    <iframe title="Vizbl Configurator" src="${CONFIGURATOR_URL}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>
</div>

<style>
#vizbl-configurator-overlay{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .25s ease;}
#vizbl-configurator-overlay.is-open{opacity:1;pointer-events:auto;}
#vizbl-configurator-overlay>[data-vizbl-close-overlay]{position:absolute;inset:0;background:rgba(14,14,16,.72);}
#vizbl-configurator-overlay>div:last-child{position:relative;width:min(1280px,96vw);height:min(88vh,920px);border-radius:16px;overflow:hidden;border:1px solid #2f2f34;box-shadow:0 28px 50px rgba(0,0,0,.35);background:#121316;}
#vizbl-configurator-overlay iframe{width:100%;height:100%;border:0;}
#vizbl-configurator-overlay button[data-vizbl-close-overlay]{position:absolute;top:.8rem;right:.8rem;z-index:2;border:1px solid rgba(255,255,255,.3);width:38px;height:38px;border-radius:50%;background:rgba(15,15,16,.7);color:#fff;font-size:1.4rem;line-height:1;cursor:pointer;}
@media (max-width:640px){#vizbl-configurator-overlay>div:last-child{width:98vw;height:90vh;border-radius:10px;}}
<\/style>`;

  const iframeOverlayScriptCode = `<script>
(() => {
  if (window.__vizblOverlayInit) return;
  window.__vizblOverlayInit = true;
  const overlay = document.getElementById('vizbl-configurator-overlay');
  const openButton = document.getElementById('vizbl-open-configurator');
  const closeButtons = overlay?.querySelectorAll('[data-vizbl-close-overlay]') || [];
  const openOverlay = () => { overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
  const closeOverlay = () => { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
  openButton?.addEventListener('click', openOverlay);
  closeButtons.forEach((button) => button.addEventListener('click', closeOverlay));
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeOverlay(); });
})();
<\/script>`;

  const embeddedCode = `<iframe src="${CONFIGURATOR_URL}" title="Embedded Vizbl Configurator" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" style="width:100%;min-height:700px;border:0;"></iframe>`;

  const iframeThemeLiquidCode = `${iframeOverlayContainerCode}\n\n${iframeOverlayScriptCode}`;

  const guides = {
    redirect: {
      title: 'Redirect Integration Guide (Shopify)',
      description: 'Follow these steps from top to bottom.',
      steps: [
        {
          title: 'Step 1 — Add the product-page button',
          description: 'Open the product template in Shopify Theme Editor, add a Custom Liquid block, and paste this code.',
          code: redirectButtonCode,
        },
        {
          title: 'Step 2 — Save and test',
          description: 'Save the template and open the product page to verify the button opens the configurator in a new tab.',
        },
      ],
    },
    'iframe-overlay': {
      title: 'iFrame Overlay Integration Guide (Shopify)',
      description: 'Follow these steps in order. Each step matches one code block.',
      steps: [
        {
          title: 'Step 1 — Add button code',
          description: 'In a product Custom Liquid block, paste this button code.',
          code: iframeButtonCode,
        },
        {
          title: 'Step 2 — Add overlay code to theme.liquid',
          description: 'In theme.liquid, right before </body>, paste this full overlay block (container, styles, and script).',
          code: iframeThemeLiquidCode,
        },
        {
          title: 'Step 3 — Save and test',
          description: 'Save theme files and test open/close behavior using button click, close icon, backdrop click, and Escape key.',
        },
      ],
    },
    embedded: {
      title: 'Embedded Integration Guide (Shopify)',
      description: 'Follow these steps from top to bottom.',
      steps: [
        {
          title: 'Step 1 — Add embedded iframe block',
          description: 'Open the product template, add a Custom Liquid block, and paste this iframe code.',
          code: embeddedCode,
        },
        {
          title: 'Step 2 — Save and test',
          description: 'Save the template and verify the iframe loads correctly on the product page.',
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
    const stepCards = guide.steps
      .map((step, index) => {
        const codeHtml = step.code
          ? `<button class="copy-btn" type="button" data-copy-target="code-${index}">Copy this code</button>
            <pre id="code-${index}"><code>${escapeHtml(step.code)}</code></pre>`
          : `<p class="no-code">No code needed for this step.</p>`;

        return `
          <section class="card">
            <div class="step-head">
              <span class="step-badge">${index + 1}</span>
              <h3>${escapeHtml(step.title)}</h3>
            </div>
            <p class="step-description">${escapeHtml(step.description)}</p>
            ${codeHtml}
          </section>
        `;
      })
      .join('');

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(guide.title)}</title>
    <style>
      body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #f7f7f5; color: #1d1d1f; }
      .wrap { padding: 24px; max-width: 980px; margin: 0 auto; }
      h1 { margin: 0 0 8px; font-size: 28px; }
      .desc { margin: 0 0 14px; color: #52545a; }
      .meta { background: #fff; border: 1px solid #e6e5e2; border-radius: 12px; padding: 12px 14px; margin-bottom: 14px; color: #47494f; }
      .card { background: #fff; border: 1px solid #e6e5e2; border-radius: 14px; padding: 16px; margin-bottom: 14px; }
      .step-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
      .step-badge { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: #111; color: #fff; font-weight: 700; font-size: 13px; }
      .card h3 { margin: 0; font-size: 16px; }
      .step-description { margin: 0 0 12px; color: #555860; line-height: 1.5; }
      .copy-btn { background: #111; color: #fff; border: 0; border-radius: 8px; padding: 8px 12px; font-weight: 600; cursor: pointer; margin-bottom: 10px; }
      pre { margin: 0; background: #111; color: #f2f2f2; border-radius: 10px; padding: 12px; overflow: auto; max-height: min(46vh, 420px); font-size: 12px; line-height: 1.45; border: 1px solid #2c2c2c; }
      pre code { display: block; min-width: max-content; }
      pre::-webkit-scrollbar { height: 10px; width: 10px; }
      pre::-webkit-scrollbar-thumb { background: #4b4b4b; border-radius: 999px; }
      pre::-webkit-scrollbar-track { background: #1b1b1b; border-radius: 999px; }
      .status { min-height: 1.2em; color: #52545a; font-size: 13px; margin-top: 10px; }
      .no-code { margin: 0; padding: 10px 12px; border-radius: 8px; background: #f3f3f2; color: #4f5258; font-size: 13px; }
      a { color: #1d1d1f; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>${escapeHtml(guide.title)}</h1>
      <p class="desc">${escapeHtml(guide.description)}</p>
      <div class="meta">Configurator URL: <a href="${CONFIGURATOR_URL}" target="_blank" rel="noopener noreferrer">${CONFIGURATOR_URL}</a></div>
      ${stepCards}
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
        #integration-guide-overlay .guide-panel { position: relative; width: min(1200px, 96vw); height: min(94vh, 980px); background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.35); }
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
