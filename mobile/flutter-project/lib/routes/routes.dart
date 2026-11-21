import 'package:flutter/material.dart';

import '../pages/index.dart';
import '../pages/test.dart';

final routes = <String, WidgetBuilder>{
  '/': (context) => const Index(),
  '/test': (context) => const TestPage(),
};
