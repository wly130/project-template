# Gin / GORM 模板

需要 Go 1.26+。

```sh
go mod tidy
go run .
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

本地配置读取 `.env.local`、`.env.<APP_ENV>`、`.env`。旧接口需设置 `ENABLE_MYSQL=true` 并配置自己的 MySQL、表结构及 `SECRET_KEY`。可选用已安装的 Air 监听源文件。
