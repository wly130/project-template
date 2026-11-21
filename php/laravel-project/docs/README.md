# Laravel 13 模板

需要 PHP 8.3+、Composer、PDO SQLite（SQLite 3.35+）。

```sh
composer install
php artisan serve
```

## CRUD 示例

地址为 `http://localhost:8000/api/items`。请求体使用 JSON，例如 `{"name":"示例"}`。

| 方法   | 路径              | 用途           |
| ------ | ----------------- | -------------- |
| GET    | `/api/items`      | 查询列表       |
| GET    | `/api/items/{id}` | 查询单条       |
| POST   | `/api/items`      | 新增，返回 201 |
| PUT    | `/api/items/{id}` | 更新           |
| DELETE | `/api/items/{id}` | 删除，返回 204 |

示例数据保存在项目本地的 SQLite 文件。

`php artisan serve --env=test` 可显式选择测试配置。SQLite 文件首次请求时在 `storage/` 中创建。
