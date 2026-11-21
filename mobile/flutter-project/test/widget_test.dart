import 'package:flutter_test/flutter_test.dart';
import 'package:fluttertest/main.dart';

void main() {
  testWidgets('opens the test page and returns home', (tester) async {
    await tester.pumpWidget(const MyApp());
    expect(find.text('首页'), findsOneWidget);

    await tester.tap(find.text('打开测试页'));
    await tester.pumpAndSettle();
    expect(find.text('测试页'), findsOneWidget);

    await tester.tap(find.text('返回首页'));
    await tester.pumpAndSettle();
    expect(find.text('首页'), findsOneWidget);
  });
}
