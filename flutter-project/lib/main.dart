import './pages/index.dart';
import 'package:flutter/material.dart';
import './routes/routes.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Index(),
      ),
      //初始化路由
      initialRoute: '/',
      //配置命名路由
      onGenerateRoute: onGenerateRoute,
    );
  }
}
