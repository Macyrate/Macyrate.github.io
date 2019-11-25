---
title: 为Hexo博客添加全局APlayer播放器
date: 2019-11-25 21:57:48
tags:
- Hexo
- 音乐
- 前端
---
# 早期尝试

今天，我试图解决一个遗留问题。

之前我博客上的音乐播放器一直都是网易云的外链iframe，就这个样式的：

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1384318412&auto=0&height=66"></iframe>

我一直把这个玩意放在sidebar里。但是问题是，移动版视图下sidebar是不展示的，只有header能够显示出来，而且还需要用toggle展开。我使用的主题是`NexT`，试验了一下，需要修改的地方是`\themes\next\layout\_partials\header\index.swig`。由于toggle展开的是`site-nav`，将源码修改如下：

```html
{{ partial('_partials/header/brand.swig', {}, {cache: theme.cache.enable}) }}

<nav class="site-nav">
  {{ partial('_partials/header/menu.swig', {}, {cache: theme.cache.enable}) }}
  <!--在此插入iframe-->
  <iframe frameborder="no" border="0" marginwidth="0" 
        marginheight="0" width=330 height=86 
        src="//music.163.com/outchain/player?type=2&id=1384318412&auto=0&height=66">
  </iframe>
</nav>

{%- if theme.algolia_search.enable or theme.local_search.enable %}
  <div class="site-search">
    {{ partial('_partials/search/index.swig', {}, {cache: theme.cache.enable}) }}
  </div>
{%- endif %}

{{- next_inject('header') }}
```

![site-nav中的iframe.jpg](https://raw.githubusercontent.com/Macyrate/Macyrate.github.io/photo/site-nav%E4%B8%AD%E7%9A%84iframe.jpg)

这个效果属实🍔🍔。并且在桌面版视图下还会把sidebar压下去，不太理想。

有没有悬浮式的播放器呢？有的。随便查一查就看到了这篇文章：[一款炫丽的网页播放器插件](https://leafjame.github.io/posts/2636059693.html)，这里介绍了`绚丽彩虹播放器`，确实是够绚丽的，点进去一看还是个东方二次元，连域名都叫`badapple.top`，爱了。

一阵操作之后，预览的效果确实挺理想的，可是到我网站上就只能播放第一首曲子了，和上面那篇文章的评论区里一位老哥说的一模一样：

![出现了绚丽的问题](https://raw.githubusercontent.com/Macyrate/Macyrate.github.io/photo/%E5%87%BA%E7%8E%B0%E4%BA%86%E7%BB%9A%E4%B8%BD%E7%9A%84%E9%97%AE%E9%A2%98.jpg)

在我试图解决这个问题的时候，`badapple.top`突然就503了，回想起上面最后的更新日期是2018年，我就感到一阵不妙。不一会儿我就发现了和这绚丽播放器几乎`  完 全 一 致  `的替代品，[AIP播放器](https://music.ain19.com/)，并且找出了前面问题的解决方案。可是，这两个东西相似度怎么能够这么高？？

原来它们都是从[明月浩空音乐](https://player.lmih.cn/)改来的，而这个原版是需要收费的。这明月浩空又是何许人也？传闻其名乃“李明浩”，这里有他不知真假的黑历史：[关于Colorful2.6(明月浩空模板)后门剖析](https://www.chinasuc.cn/?thread-151.htm)。

本来如果我不太在意这个插件的安全性，折腾播放器的经历到这里就应该结束了。可是AIP播放器它不能自由修改主题色，而默认的颜色偏偏还是绿的，强迫症让我不能忍。看了看它的加载方式，是用`\theme\next\layout\_layout.swig`中插入的JS脚本加载远端服务器上的CSS，JS、CSS、播放列表都在远端，这可没法随便改了。

当然，也许我可以自己写一个CSS（在Hexo里用的是Stylus）来覆盖它的设定——可是显然我不会。

那咋办嘛，只能再看看有没有其他选择了。

# APlayer
> To Be Continue...   
> ——191125