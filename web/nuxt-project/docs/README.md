# Nuxt 4 模板

需要 Node.js 22.22.3+ 或 24.15+、pnpm。

```sh
pnpm install
pnpm dev
```

首页链接到测试页，测试页可返回首页。普通 Web 路由为 `/` 和 `/test`，使用 hash 路由的模板见下方说明。

需要指定配置时可运行 `pnpm dev --dotenv .env.development`。`pnpm build` 后用 `pnpm start` 启动，生产配置由运行环境注入。
