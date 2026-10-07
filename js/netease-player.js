/* Keep Meting's playlist metadata, but use NetEase's official audio URLs. */
(function () {
  const container = document.getElementById('music-player');
  if (!container) return;

  let assets;
  function loadAssets() {
    if (assets) return assets;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css';
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js';
    script.integrity = 'sha512-RWosNnDNw8FxHibJqdFRySIswOUgYhFxnmYO3fp+BgCU7gfo4z0oS7mYFBvaa8qu+axY39BmQOrhW3Tp70XbaQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    assets = Promise.all([css, script].map(element => new Promise((resolve, reject) => {
      element.onload = resolve;
      element.onerror = () => reject(new Error('Player asset failed: ' + (element.src || element.href)));
      document.head.appendChild(element);
    }))).catch(error => {
      css.remove();
      script.remove();
      assets = null;
      throw error;
    });
    return assets;
  }

  async function loadPlaylist() {
    container.textContent = '正在加载歌单…';
    try {
      const playlist = fetch(
        'https://api.i-meto.com/meting/api?server=netease&type=playlist&id=' +
        encodeURIComponent(container.dataset.id),
        { signal: AbortSignal.timeout(20000) }
      ).then(response => {
        if (!response.ok) throw new Error('Playlist HTTP ' + response.status);
        return response.json();
      });
      const [tracks] = await Promise.all([playlist, loadAssets()]);
      const audio = tracks.map(track => {
        const id = new URL(track.url).searchParams.get('id');
        if (!id || !/^\d+$/.test(id)) throw new Error('Invalid NetEase song ID');
        return {
          name: track.title,
          artist: track.author,
          url: 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3',
          cover: track.pic,
          lrc: track.lrc
        };
      });
      if (!audio.length) throw new Error('Empty playlist');
      container.textContent = '';
      new APlayer({
        container,
        audio,
        fixed: true,
        autoplay: container.dataset.autoplay === 'true',
        order: container.dataset.order,
        volume: Number(container.dataset.volume),
        theme: container.dataset.theme,
        preload: container.dataset.preload,
        lrcType: 3
      });
    } catch (error) {
      console.error('网易云歌单加载失败', error);
      container.textContent = '歌单暂时加载失败。';
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.textContent = '重试';
      retry.addEventListener('click', loadPlaylist, { once: true });
      container.appendChild(retry);
    }
  }

  // Let NexT reveal the article and the browser paint before starting music work.
  function schedulePlayer() {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadPlaylist, { timeout: 1500 });
      } else {
        setTimeout(loadPlaylist, 0);
      }
    }));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedulePlayer, { once: true });
  } else {
    schedulePlayer();
  }
})();
