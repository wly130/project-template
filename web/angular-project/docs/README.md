# Angular standalone 模板

需要 Node.js 22.22.3+ 或 24.15+、pnpm。

```sh
pnpm install
pnpm dev
```

首页链接到测试页，测试页可返回首页。普通 Web 路由为 `/` 和 `/test`，使用 hash 路由的模板见下方说明。

测试页显示当前环境。运行 `pnpm dev --configuration test` 或 `pnpm build --configuration production` 可验证配置替换。
