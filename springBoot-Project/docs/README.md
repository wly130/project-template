# Spring Boot 4.2 / MyBatis 模板

需要 Java 17+、Maven。

```sh
mvn spring-boot:run
```

## CRUD 示例

地址为 `http://localhost:8080/api/items`。请求体使用 JSON，例如 `{"name":"示例"}`。

| 方法   | 路径              | 用途           |
| ------ | ----------------- | -------------- |
| GET    | `/api/items`      | 查询列表       |
| GET    | `/api/items/{id}` | 查询单条       |
| POST   | `/api/items`      | 新增，返回 201 |
| PUT    | `/api/items/{id}` | 更新           |
| DELETE | `/api/items/{id}` | 删除，返回 204 |

示例数据保存在内存中，重启后清空。

使用 `-Dspring-boot.run.profiles=test`、`production` 或 `mysql` 显式选择配置。旧 `/word` 接口需激活 `mysql` 并注入 `DB_URL`、`DB_USERNAME`、`DB_PASSWORD`。源码重新编译后 DevTools 会重启应用。
