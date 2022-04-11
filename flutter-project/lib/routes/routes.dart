import 'package:flutter/material.dart';
//引入页面
import '../pages/index.dart';

var routes = {
  //配置路由路径
  '/': (context) => Index(),
};

// ignore: prefer_function_declarations_over_variables
var onGenerateRoute = (RouteSettings settings) {
  //onGenerateRoute配置
  final String? name = settings.name;
  final Function pageContentBuilder = routes[name] as Function;
  if (settings.arguments != null) {
    final Route route = MaterialPageRoute(
      builder: (context) => pageContentBuilder(
        context,
        arguments: settings.arguments,
      ),
    );
    return route;
  } else {
    final Route route =
        MaterialPageRoute(builder: (context) => pageContentBuilder(context));
    return route;
  }
};
