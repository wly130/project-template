# Koa 3 模板

需要 Node.js 24+、pnpm。

```sh
pnpm install
pnpm dev
```

## CRUD 示例

地址为 `http://localhost:3000/api/items`。请求体使用 JSON，例如 `{"name":"示例"}`。

| 方法   | 路径              | 用途           |
| ------ | ----------------- | -------------- |
| GET    | `/api/items`      | 查询列表       |
| GET    | `/api/items/{id}` | 查询单条       |
| POST   | `/api/items`      | 新增，返回 201 |
| PUT    | `/api/items/{id}` | 更新           |
| DELETE | `/api/items/{id}` | 删除，返回 204 |

示例数据保存在内存中，重启后清空。

`NODE_ENV` 选择 `.env.development`、`.env.test` 或 `.env.production`。`pnpm check` 检查类型。
