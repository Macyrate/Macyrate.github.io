# Cloudflare 评论服务

选用 [Garrul](https://github.com/KingPin/Garrul) 的 `v2.35.0` 版本。
服务运行于自己的 Cloudflare Workers、D1、KV，匿名评论使用 Turnstile。
域名为 `comments.hakurei.red`；不依赖访客 GitHub 登录。

后端已部署，36 条历史评论已导入远程 D1，并逐条比对作者、时间、原始 Markdown 和文章路径。
博客端已切换至 Garrul；旧 issues 的关闭结果见 `backups/gitalk/cleanup-report.json`。关闭保留原文，可重新打开。

## 登录

在本机终端运行 `npx wrangler@latest login`，登录管理 `hakurei.red` 的账号。
密钥不要写进仓库或聊天。

## 维护

- `sh tools/comments-service.sh` 可恢复固定版本的后端源码与本项目的 iframe 同源读取补丁。
- 配置在 `deployment/comments/wrangler.toml`，资源 ID 在 `resources.json`。
- `.comments-service/` 被 Git 忽略。该目录的 `secrets.json` 保存本次生成的密钥（文件权限 600），应安全备份；不要提交或发布该文件。
- 发布后端：在 `.comments-service` 中运行 `WRANGLER_SEND_METRICS=false npm run deploy`。
- 获取管理员一次性登录链接：在 `.comments-service` 中运行 `WRANGLER_SEND_METRICS=false npm run owner-link`。链接有效十分钟，不需要创建 GitHub OAuth 应用。
- 升级前检查 `patches/iframe-same-origin.patch` 是否仍然必要。它只允许带浏览器 `Sec-Fetch-Site: same-origin` 的无 Origin GET；写请求仍要求明确的允许来源。
- 访客界面使用本项目补充的简体中文 `zh-Hans`（包括错误信息），管理员界面为英文。
- `site-theme-and-zh-hans.patch` 保留简体语言包和站点配色：霞鹜文楷、暗红按钮、细边框、明暗自适应。iframe 显式允许明暗两种色彩方案，覆盖 NexT 对 iframe 强制浅色的默认规则；字体复用站点现有的 cdnjs 字体资源，加载失败时使用本地字体。
- `url-path-slugs.patch` 统一评论、订阅、管理、feed、iframe 和导入的文章标识规则，支持中文路径的百分号编码及较长路径；保留原编码，不改迁移数据。加载接口失败时也使用简体中文提示。相关 199 项回归测试及类型检查通过。
- 旧测试文章的 4 条评论可直接查看：<https://comments.hakurei.red/embed/2019%2F10%2F18%2Fhello-world?lang=zh-Hant>。

## 验收记录

本地及远程 D1 均导入 36 条评论，原文等字段与 GitHub 最新导出完全一致；具体校验记录见 `backups/gitalk/remote-verification.json`。
上游 Remark42/Turnstile 相关 69 个测试通过；另验证了 iframe 同源 GET、本站 POST、无来源请求和恶意跨域来源共 5 个 CORS 场景。
2026-10-07 在 Safari 完成真实匿名提交，用户手动通过 Turnstile，确认中文和 Markdown 评论发布成功；测试留言随后移除，历史评论仍为 36 条。正式站点已验证历史评论显示及站内切页后评论归属切换。语言包和 iframe 的 57 个测试通过，后端类型检查通过。
广州、上海、桂林联通探测点对后端健康接口均返回 HTTP 200，结果见 `china-connectivity.json`。这不是所有大陆网络的可用性保证，也不是浏览器匿名提交测试的替代品。

## 发布前检查

1. 确认 `hakurei.red` 的 Cloudflare DNS 管理权限及新子域名未被占用。
2. 按上游 `INSTALL.md` 创建独立的 D1/KV 资源，启用正式 Turnstile 密钥。
3. 允许的网站来源为 `https://hakurei.red` 和承载 iframe 的 `https://comments.hakurei.red`，不开启开发模式或通配跨域。
4. 本地试导入 Gitalk 备份；核对 36 条评论的作者、时间、原文及文章映射。
5. 线上验证匿名提交、读取、管理登录和 NexT PJAX 切页。
6. 从中国大陆网络验证自定义域名和 Turnstile；Cloudflare 托管本身不等于大陆可用性保证。
7. 刷新旧评论备份并确认没有遗漏，之后再关闭旧 Gitalk issues。

旧版 Hello World 的 4 条测试评论和 issue #40 的计数缺口详见 `backups/gitalk/README.md`。
