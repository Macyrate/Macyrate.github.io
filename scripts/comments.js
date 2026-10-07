/* global hexo */
'use strict';

hexo.extend.helper.register('garrul_frame_url', function(page) {
  const base = hexo.config.garrul.server;
  const canonical = new URL(page.path, hexo.config.url + '/');
  const slug = canonical.pathname.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  const url = new URL('/embed/' + encodeURIComponent(slug), base);
  url.searchParams.set('url', canonical.href);
  url.searchParams.set('title', page.title || '');
  url.searchParams.set('parent_origin', new URL(hexo.config.url).origin);
  url.searchParams.set('lang', 'zh-Hans');
  return url.href;
});

hexo.extend.filter.register('theme_inject', injects => {
  const server = hexo.config.garrul?.server;
  if (!server) return;
  if (new URL(server).protocol !== 'https:') throw new Error('Garrul requires HTTPS');
  // An iframe owns the widget lifecycle and is replaced naturally by NexT PJAX.
  injects.comment.raw('garrul', `
    <div class="comments">
      <iframe id="garrul-comments" title="评论" loading="lazy"
        src="{{ garrul_frame_url(page) | escape }}"
        style="width:100%;border:0;min-height:400px;display:block;color-scheme:light dark"></iframe>
    </div>
  `, {}, {cache: false});
  injects.bodyEnd.raw('garrul-resize',
    '<script src="{{ url_for("/js/comments-frame.js") }}"></script>');
});
