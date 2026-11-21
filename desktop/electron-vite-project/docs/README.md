# Electron / Vue 3 + Vite 模板

需要 Node.js 24+、pnpm 10。

```sh
pnpm install
pnpm dev
```

首页可打开测试页，测试页可返回首页。

打开测试页点击“读取记录”验证 IPC。`window.items` 提供 `list()`、`get(id)`、`create(name)`、`update(id, name)`、`remove(id)`。
