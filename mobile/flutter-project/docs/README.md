# Flutter 模板

需要 Flutter 3.47+、Chrome。

```sh
flutter pub get
flutter run -d chrome --dart-define-from-file=config/development.json
```

首页可打开测试页，测试页可返回首页。

`flutter test --no-pub` 检查页面导航。示例启动目标为 Web，Android/iOS 还需平台工具链。

Android 构建适配 AGP 9，需 JDK 17+。仅在配置发布签名时需要填写本地 key.properties。
