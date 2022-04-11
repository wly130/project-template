import 'package:flutter/material.dart';
import '../api/api.dart'; //引入

class Index extends StatelessWidget {
  const Index({Key? key}) : super(key: key);

  void getinfo() {
    //调用接口
    Api.test({
      'name': 'value' //参数
    }).then((res) => {
          // ignore: avoid_print
          print(res['data']) //打印 data 数据
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('首页'),
      ),
      body: SingleChildScrollView(
        child: Column(children: [
          ElevatedButton(
            child: const Text('网络请求'),
            onPressed: () {
              getinfo();
            },
          ),
        ]),
      ),
    );
  }
}
