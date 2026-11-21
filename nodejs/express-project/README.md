[启动与示例说明](docs/README.md)

# Express 项目 - 优化版本

## 📖 项目描述

这是一个优化后的Express.js后端项目，包含以下功能：

- ✅ 用户认证与授权 (JWT Token)
- ✅ 数据库集成 (Sequelize + MySQL)
- ✅ 日志管理 (log4js)
- ✅ 错误处理与恢复
- ✅ 请求验证与响应统一格式
- ✅ CORS跨域支持

## 🚀 快速开始

### 1. 下载依赖包

```bash
npm install
```

### 2. 配置环境变量

复制`.env.example`为`.env`并填写相关配置：

```bash
cp .env.example .env
```

编辑`.env`文件，配置以下内容：

```env
IP_ADDRESS=localhost
PORT=3000
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_TIME=1h
REFRESH_TOKEN_TIME=7d
DB_TYPE=mysql
DB_DATE_BASE_NAME=project
DB_HOST_NAME=root
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB_PORT=3306
```

### 3. 运行项目

```bash
npm run start
```

服务器将在 `http://localhost:3000` 启动

## 📁 目录结构

```
express-project/
├── bin/
│   └── www                      # 启动脚本
├── config/
│   ├── constants.js             # 常量配置
│   ├── error-config.js          # 错误处理配置
│   ├── log-config.js            # 日志配置
│   ├── mysql-config.js          # MySQL数据库配置
│   ├── token-config.js          # JWT Token配置
│   └── validate-config.js       # 验证器中间件配置
├── controller/
│   └── user.js                  # 用户控制器（业务逻辑）
├── middleware/
│   └── auth.js                  # 认证中间件
├── models/
│   └── tabs.js                  # 数据表模型
├── routes/
│   ├── index.js                 # 路由入口
│   └── user.js                  # 用户路由
├── utils/
│   └── response.js              # 统一响应格式
├── validator/
│   └── user.js                  # 验证规则
├── log/                         # 日志输出目录
├── .env                         # 环境配置（不上传到Git）
├── .env.example                 # 环境配置模板
├── app.js                       # 应用主入口
├── package.json                 # 项目配置与依赖
└── README.md                    # 项目文档
```

## 📚 API 文档

### 用户相关接口

#### 1. 用户登录

**请求**

```http
POST /api/user/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

**响应 (成功)**

```json
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**响应 (失败)**

```json
{
    "code": 400,
    "msg": "请求参数错误",
    "data": null,
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

#### 2. 刷新Token

**请求**

```http
POST /api/user/refresh-token
Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应**

```json
{
    "code": 200,
    "msg": "刷新成功",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

#### 3. 获取用户信息 (需要认证)

**请求**

```http
GET /api/user/getInfo?page=1&pageNum=10&id=1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "count": 10,
        "rows": [
            {
                "id": 1,
                "name": "用户1"
            }
        ]
    },
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

#### 4. 更新用户信息 (需要认证)

**请求**

```http
PUT /api/user/setInfo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "id": 1,
  "name": "新用户名"
}
```

**响应**

```json
{
    "code": 200,
    "msg": "修改成功",
    "data": null,
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🔑 身份认证

### Token认证流程

1. **登录**：使用用户名和密码登录获取`accessToken`和`refreshToken`
2. **请求**：在请求头中添加`Authorization: Bearer <accessToken>`
3. **刷新**：当`accessToken`过期时，使用`refreshToken`获取新的`accessToken`

### 在请求中使用Token

```javascript
// 使用 Fetch API
fetch('http://localhost:3000/api/user/getInfo', {
    method: 'GET',
    headers: {
        Authorization: 'Bearer your-access-token-here',
        'Content-Type': 'application/json',
    },
})
    .then((res) => res.json())
    .then((data) => console.log(data));

// 使用 Axios
axios
    .get('http://localhost:3000/api/user/getInfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((res) => console.log(res.data));
```

## 🛡️ 错误处理

项目统一处理以下错误类型：

| 错误类型   | HTTP状态码 | 响应码 | 说明                 |
| ---------- | ---------- | ------ | -------------------- |
| 成功       | 200        | 200    | 请求成功             |
| 参数错误   | 400        | 400    | 请求参数验证失败     |
| 未授权     | 401        | 401    | 缺少Token或Token无效 |
| Token过期  | 401        | 401    | Token已过期          |
| 禁止访问   | 403        | 403    | 权限不足             |
| 资源不存在 | 404        | 404    | 请求的资源不存在     |
| 服务器错误 | 500        | 500    | 服务器内部错误       |

## 📝 环境变量

详见 `.env.example` 文件：

```env
# 服务器配置
IP_ADDRESS=localhost
PORT=3000

# JWT Token配置
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_TIME=1h
REFRESH_TOKEN_TIME=7d

# 数据库配置
DB_TYPE=mysql
DB_DATE_BASE_NAME=project
DB_HOST_NAME=root
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB_PORT=3306
```

## 📊 日志文件

日志文件存储在 `log/` 目录中：

- **access.log**: 所有请求日志
- **error.log**: 错误日志

## 🔧 依赖包

| 包名              | 版本    | 说明                 |
| ----------------- | ------- | -------------------- |
| express           | ^4.18.1 | Web框架              |
| sequelize         | ^6.25.4 | ORM框架              |
| mysql2            | ^2.3.3  | MySQL驱动            |
| jsonwebtoken      | ^8.5.1  | JWT认证              |
| log4js            | ^6.9.1  | 日志管理             |
| express-validator | ^7.0.1  | 请求验证             |
| dotenv            | ^16.4.7 | 环境变量             |
| cors              | ^2.8.5  | 跨域支持             |
| nodemon           | ^2.0.19 | 开发工具（自动重启） |

## 📈 最佳实践

### 1. 环境变量管理

- 不要将`.env`提交到Git仓库
- 使用`.env.example`作为模板
- 在生产环境中修改敏感信息（SECRET_KEY等）

### 2. 错误处理

- 所有异步操作使用try-catch
- 使用统一的错误响应格式
- 不要在响应中泄露敏感信息

### 3. 安全性

- 使用HTTPS在生产环境
- 定期更新依赖包
- 验证所有用户输入
- 使用强密钥生成SECRET_KEY

### 4. 性能优化

- 合理使用中间件
- 数据库查询优化
- 添加缓存机制
- 使用连接池

### 5. 日志管理

- 记录所有错误
- 使用合适的日志级别
- 定期清理日志文件

## 🐛 常见问题

### Q: 如何修改端口?

A: 修改`.env`文件中的`PORT`环境变量

### Q: 如何修改数据库配置?

A: 修改`.env`文件中的`DB_*`环境变量

### Q: 如何禁用某个功能?

A: 检查对应的中间件或路由配置

### Q: Token过期了怎么办?

A: 调用`/api/user/refresh-token`接口刷新Token

## 📞 支持

如有问题，请查看项目日志或提交Issue

## 📄 许可证

MIT License
