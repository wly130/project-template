import 'dart:convert';
import 'package:dio/dio.dart';

//请求地址
const baseUrl = "http://localhost";

class Request {
  static BaseOptions options = BaseOptions(
    baseUrl: baseUrl,
    connectTimeout: 15000, //请求时间
    receiveTimeout: 10000, //响应时间
  );
  static Dio dio = Dio(options);

  static Future request<T>(String url, String method,
      {Map? params, data}) async {
    if (params != null) {
      url = url + '?';
      params.forEach((key, value) {
        url = url + '$key=' + '$value&';
      });
      url = url.substring(0, url.length - 1);
    }

    try {
      Response res =
          await dio.request(url, data: data, options: Options(method: method));
      if (res.statusCode == 200 || res.statusCode == 201) {
        try {
          if (res.data['status'] != 200) {
            return Future.error(res.data['msg']);
          } else {
            if (res.data is Map) {
              return res.data;
            } else {
              return json.decode(res.data);
            }
          }
        } catch (e) {
          return Future.error('解析响应数据异常');
        }
      } else {
        return Future.error('HTTP错误');
      }
    } catch (e) {
      return Future.error('服务器无法连接');
    }
  }

  //封装GET请求
  static Future get<T>(String url, {Map? params}) {
    return request(url, 'get', params: params);
  }

  //封装POST请求
  static Future post<T>(String url, {Map? params, data}) {
    return request(url, 'post', params: params, data: data);
  }
}
