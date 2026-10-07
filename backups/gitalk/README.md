# Gitalk 迁移备份

`export.json` 保存 GitHub 返回的完整 issue 和评论数据，不在 Hexo 的 `source/` 内，不会随网站生成发布。
`export.sha256` 是原始备份校验值。`pages.json` 是迁移时 Hexo 解析出的文章路径快照。
`migration-report.json` 记录旧 URL 到当前文章路径的映射及缺口。

当前快照：90 个 Gitalk issues，36 条实际可读取评论。

- 32 条评论对应当前 9 篇文章。当前文章路径相比历史 URL 增加了日期文件名前缀。
- issue #3 的 4 条评论属于已不存在的 2019-10-18 Hello World 测试文章；保留原路径，不误配给其他 Hello World 文章。
- issue #40 的 REST issue 元数据报告 3 条评论，但 REST 评论列表与 GraphQL `comments.totalCount` 均只有 1 条。缺失的 2 条未恢复，不能宣称已经迁移。
- Gitalk 的回复是 Markdown 引用，没有可靠的父评论 ID；迁移保留原文，不猜测回复层级。
- GitHub 没有提供评论者邮箱，不构造虚假邮箱，也不将迁移作者绑定为新系统登录账号。

`tools/migrate-gitalk.py` 可重新生成路径报告；`--refresh` 会重新读取 GitHub 并覆盖当前备份。清理 issues 前应再导出一次并核对新增内容。

只有在新服务导入、线上显示和备份核验通过后，才能清理旧 issues。优先关闭已迁移 issues，以保留可追溯的原始评论；本目录中的脚本不会删除或关闭 GitHub issues。
