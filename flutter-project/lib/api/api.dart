import './request.dart';

class Api {
  static test(params) {
    return Request.get("/test", params: params);
  }

  static test2(data) {
    return Request.post("/test2", data: data);
  }
}
