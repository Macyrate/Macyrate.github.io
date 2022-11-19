---
title: metaGBA开发手记之壹：Unity VR入门
tags:
- 笔记
- 游戏
- Unity
- C Sharp
- XR
---

# 随笔的部分

2014年，Google Cardboard着实火了一把，我也借此从红米1s的那块720P屏幕里看到了未来“元宇宙”的一角。之后数年，Magic Leap、Microsoft HoloLens、Google DayDream等等产品的消息在cnBeta上层出不穷，16年还到广埠屯去体验了一把HTC Vive。但彼时VR设备高昂的价格、对高性能显卡的依赖、对现实空间的需求，都不是一个在校大学生所能承受的。

也许是拜所谓的“元宇宙”热潮所赐，曾经高不可攀的VR头显现在“飞入寻常百姓家”，有了性价比超高的产品：Meta Oculus Quest 2。在B站给我推送到Quest 2评测视频的第二天，我就兴冲冲地以1700元的价格入手。玩了一段时间Blade and Sorcery和VR女友之后，我觉得自己也可以试着用Unity做点东西，顺便复习下相关知识，为跳槽进行准备。

可以做点什么呢？当时，因为在3DS上用mGBA模拟器玩GBA游戏无法达到全屏点对点的效果，我干脆组了一部高亮GBA。这下，我已经收集了Switch、3DS、NDS、GBA、Game & Watch这五个世代的任天堂掌机，择日再弄上一部GBC就可称得上完满了。

那么，就试着将mGBA模拟器移植到VR上吧——[metaGBA](https://github.com/Macyrate/metagba)，这就是我准备实现的小东西。当然，里面现在一行代码都没有。

GBA的按键并不多，Quest 2那简单的手柄也可以完全覆盖到。用分辨率一般的VR头显看GBA的大像素屏幕也许会是一种折磨，但在VR世界中我可以让GBA“连接电视”，将画面转播到大屏，这是现实世界里很难做到的。

第一步就是学习用Unity开发VR应用的基础操作。

# 
