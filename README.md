# 项目模板集合

本仓库收集不同技术栈的基础项目模板和 HTML 示例，供新项目搭建时参考或复制使用。各模板位于独立目录中，依赖安装、环境配置和启动命令以对应项目的文件为准。

## 模板目录

| 类型         | 目录                                              | 说明                                      |
| ------------ | ------------------------------------------------- | ----------------------------------------- |
| Web 前端     | [vite-vue3](./vite-vue3/)                         | Vue 3 + Vite 模板（JavaScript）           |
| Web 前端     | [vite-vue3-ts](./vite-vue3-ts/)                   | Vue 3 + Vite + TypeScript 模板            |
| Web 前端     | [vite-react](./vite-react/)                       | React + Vite 模板                         |
| 桌面应用     | [electron-vite-project](./electron-vite-project/) | Electron + Vue 3 + Vite + TypeScript 模板 |
| Flutter 应用 | [flutter-project](./flutter-project/)             | Flutter 模板                              |
| 后端服务     | [express-project](./express-project/)             | Node.js + Express 模板                    |
| 后端服务     | [nest-project](./nest-project/)                   | Node.js + NestJS + TypeScript 模板        |
| 后端服务     | [gin-project](./gin-project/)                     | Go + Gin 模板                             |
| 后端服务     | [springBoot-Project](./springBoot-Project/)       | Java + Spring Boot 模板                   |
| HTML 示例    | [example](./example/)                             | 加载动画、日历等独立 HTML 示例            |

## 使用方式

1. 选择需要的模板，进入对应目录，或将该目录复制到新项目中。
2. 阅读模板内的 `README.md`（如有），核对依赖声明、环境变量和构建配置。
3. 使用对应技术栈的工具安装依赖，并在模板目录内执行启动或构建命令。
4. 根据实际项目调整名称、接口地址和环境配置，再添加业务功能。

Node.js 模板的可用命令见各自的 `package.json`

Go、Flutter 和 Java 模板分别查看 `go.mod`、`pubspec.yaml` 和 `pom.xml`。根目录没有统一的依赖安装或启动脚本。

`example` 中的 HTML 文件可直接在浏览器中打开查看。
