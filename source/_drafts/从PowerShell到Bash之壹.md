---
title: 从PowerShell到Bash之壹
tags:
- 笔记
- PowerShell
---
作为坚定不移的Windows拥护者，虽然因为各种原因在Linux里折腾了许多次，但在面对运指如飞的真Linux用户时，说不心虚肯定是假的。好在Windows如今其实也有优秀的命令行工具，那就是PowerShell。因此，学习PowerShell，在Windows下装逼，也是我由来已久的愿望了。

Windows 10 2004中`WSL2`的存在，让运行Linux不再需要单独开什么虚拟机了。在基本了解PowerShell之后，我还会再转向Linux Bash的学习。

最近弄到一本《Windows PowerShell实战指南》，就从这里入手吧。

# 环境

无论学啥，第一步都是配环境。

Windows 10自带了一个PowerShell，你可能用`Win + X`就能看到它的存在。不过它比较古老，用`$PSVersionTable`查看之后可以得知版本是`5.1`，而当前的最新版本是`7.1`。另外，比起老版PowerShell的控制台窗口和集成脚本环境ISE，现在使用整合一切的Windows Terminal和VS Code才是正道。

知乎上有篇很是详细的[配置指南]()，只要严格按照步骤走，绝不会出什么差错。
