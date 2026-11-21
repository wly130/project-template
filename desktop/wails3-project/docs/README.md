# Wails 3 / Vite 模板

需要 Go 1.26+、wails3 3.1.0、Node.js 24+、pnpm、系统 WebView。

```sh
wails3 task dev
```

桌面版首页可打开测试页，测试页可返回首页。

打开测试页点击“读取记录”验证 Go 绑定。绑定提供 `List()`、`Get(id)`、`Create(name)`、`Update(id, name)`、`Delete(id)`。Taskfile 使用 pnpm 安装前端依赖并生成绑定。

可选 Android 构建需要 Android SDK 37 和 JDK 17+，应用最低支持 API 24。
