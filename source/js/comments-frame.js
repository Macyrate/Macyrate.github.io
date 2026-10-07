(() => {
  'use strict';
  if (window.garrulResizeInstalled) return;
  window.garrulResizeInstalled = true;
  window.addEventListener('message', event => {
    const frame = document.getElementById('garrul-comments');
    if (!frame || event.source !== frame.contentWindow ||
        event.origin !== new URL(frame.src).origin) return;
    const data = event.data;
    if (data?.type !== 'garrul:height' || !Number.isFinite(data.height) || data.height <= 0) return;
    frame.style.height = Math.max(400, Math.min(data.height, 100000)) + 'px';
  });
})();
