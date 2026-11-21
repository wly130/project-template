# API 模块说明

## 📁 目录结构

```
api/
├── request.js              # HTTP请求核心模块
├── api.js                  # API接口定义
├── API_OPTIMIZATION.md     # 优化详细说明文档
├── useExample.js           # 使用示例代码
└── README.md               # 本文件
```

---

## 📄 文件说明

### 1. **request.js** - HTTP请求核心模块

**职责：**

- 创建和配置axios实例
- 实现请��/响应拦截器
- 处理token自动刷新（防止并发）
- 提供通用的HTTP方法

**导出的方法：**

```javascript
// 基础HTTP方法
export function get(url, params)        // GET请求
export function post(url, data)         // POST请求
export function put(url, data)          // PUT请求（完全替换）
export function patch(url, data)        // PATCH请求（部分更新）
export function del(url, params)        // DELETE请求
export function upload(url, formData)   // 文件上传

// 导出axios实例（高级用法）
export default instance
```

**关键特性：**

- ✅ **自动Token管理**：在请求头中自动添加Authorization
- ✅ **Token刷新队列**：防止token过期时多个请求并发刷新
- ✅ **自动重试**：401错误自动刷新token后重试
- ✅ **自动重定向**：401/403错误自动跳转到登录页
- ✅ **公开接口白名单**：/login, /register, /refreshToken 无需token
- ✅ **文件上传支持**：自动处理multipart/form-data

---

### 2. **api.js** - API接口定义

**职责：**

- 统一管理所有业务API
- 按功能模块分组
- 提供易于扩展的结构

**模块划分：**

```javascript
export default {
  // 认证相关
  auth: {
    login(params)
    register(params)
    refreshToken()
    logout()
  },

  // 用户信息相关
  user: {
    getUserInfo()
    updateUserInfo(params)
    getUserList(params)        // 管理员
    getUserById(id)            // 管理员
    deleteUser(id)             // 管理员
    updateUserRole(id, params) // 管理员
  },

  // 文件相关
  file: {
    uploadAvatar(formData)
    uploadFile(formData)
    deleteFile(fileId)
  },

  // 通用数据操作（CRUD）
  data: {
    getList(type, params)
    getDetail(type, id)
    create(type, params)
    update(type, id, params)
    delete(type, id)
  }
}
```

**设计优势：**

- 📦 模块化分离，职责清晰
- 🔧 易于添加新��块
- 📝 统一的调用方式
- 🎯 易于维护和测试

---

## 🚀 快速开始

### 在Vue3组件中使用

```javascript
<script setup>
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const api = instance?.proxy?.$api

const handleLogin = async () => {
  try {
    const response = await api.auth.login({
      username: 'admin',
      password: '123456'
    })
    console.log('登录成功:', response)
  } catch (error) {
    console.error('登录失败:', error.message)
  }
}

const handleGetUserInfo = async () => {
  try {
    const userInfo = await api.user.getUserInfo()
    console.log('用户信息:', userInfo)
  } catch (error) {
    console.error('获取用户信息失败:', error.message)
  }
}
</script>

<template>
  <div>
    <button @click="handleLogin">登录</button>
    <button @click="handleGetUserInfo">获取用户信息</button>
  </div>
</template>
```

### 在Options API中使用

```javascript
export default {
    methods: {
        async login() {
            const response = await this.$api.auth.login({
                username: 'admin',
                password: '123456',
            });
            console.log('登录成功:', response);
        },

        async getUserInfo() {
            const userInfo = await this.$api.user.getUserInfo();
            console.log('用户信息:', userInfo);
        },
    },
};
```

---

## 🔄 工作流程

### 请求流程

```
Vue组件
  ↓
调用 this.$api.auth.login({ ... })
  ↓
api.js（api接口定义）
  ↓
调用 post('/login', params)
  ↓
request.js（request拦截器）
  ↓
1. 请求拦截器：添加Authorization头，验证token
2. axios发送HTTP请求
3. 响应拦截器：处理响应数据
4. 如果401错误：
   - 队列等待 → 刷新token → 重试原请求
5. 如果403错误：
   - 清除token → 跳转登录页
  ↓
返回Promise<response.data>
  ↓
Vue组件接收数据
```

### Token刷新的并发控制

```
请求1(需要token) → 发现token过期 → 开始刷新token
请求2(需要token) → 发现token过期 → 加入刷新队列，等待
请求3(需要token) → 发现token过期 → 加入刷新队列，等待
                    ↓
            刷新token完成
                    ↓
        所有队列中的请求获得新token
        使用新token重试原请求
                    ↓
返回数据给各自的组件
```

---

## 🛡️ 错误处理

### 自动处理的错误

| 状态码 | 处理方式                | 结果         |
| ------ | ----------------------- | ------------ |
| 401    | 自动刷新token，重试请求 | 用户透明     |
| 403    | 清除token，跳转登录页   | 用户重新登录 |
| 其他   | 返回error到调用处       | 组件自行处理 |

### 在组件中处理错误

```javascript
try {
    const data = await this.$api.user.getUserInfo();
} catch (error) {
    // error.status: HTTP状态码
    // error.message: 错误信息
    // error.data: 服务器返回的错误数据

    if (error.status === 404) {
        console.error('用户不存在');
    } else {
        console.error('获取用户信息失败:', error.message);
    }
}
```

---

## 📝 环境配置

```dotenv
# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.example.com
```

---

## 🔧 扩展指南

### 添加新的API模块

在 `api.js` 中添加新模块：

```javascript
/**
 * 产品相关API
 */
const productAPI = {
    getList: (params) => get('/products', params),
    getDetail: (id) => get(`/products/${id}`),
    search: (keyword) => get('/products/search', {keyword}),
    create: (params) => post('/products', params),
    update: (id, params) => put(`/products/${id}`, params),
    delete: (id) => del(`/products/${id}`),
};

export default {
    // ...existing modules...
    product: productAPI, // 新增模块
};
```

### 添加自定义拦截器

在 `request.js` 中添加额外的拦截器：

```javascript
// 添加日志拦截器
instance.interceptors.request.use((config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

instance.interceptors.response.use((response) => {
    console.log(`[API Response] Success:`, response.data);
    return Promise.resolve(response.data);
});
```

---

## ✨ 优化对比

| 功能          | 优化前 | 优化后     |
| ------------- | ------ | ---------- |
| HTTP方法支持  | 2个    | 6个+       |
| 并发控制      | ❌     | ✅         |
| Token自动刷新 | ❌     | ✅         |
| 模块化设计    | ❌     | ✅         |
| 文件上传      | ❌     | ✅         |
| 错误处理      | 基础   | 完善       |
| 代码质量      | 有错误 | 无错误     |
| 可维护性      | ⭐⭐   | ⭐⭐⭐⭐⭐ |

---

## 📚 参考文档

- [详细优化说明](./API_OPTIMIZATION.md)
- [使用示例代码](./useExample.js)
- [Vue 3 官方文档](https://vuejs.org/)
- [Axios 文档](https://axios-http.com/)

---

## 💡 最佳实践

1. **始终使用 try-catch 处理异步请求**

    ```javascript
    try {
        const data = await this.$api.user.getUserInfo();
    } catch (error) {
        // 处理错误
    }
    ```

2. **分离业务逻辑和UI逻辑**

    ```javascript
    // 创建独立的服务层
    export const userService = {
        async getUser() {
            return await this.$api.user.getUserInfo();
        },
    };
    ```

3. **使用加载状态**

    ```javascript
    data() {
      return { loading: false }
    },
    methods: {
      async handleGetUser() {
        this.loading = true
        try {
          // ...
        } finally {
          this.loading = false
        }
      }
    }
    ```

4. **避免重复请求**
    - 使用防抖/节流
    - 缓存结果
    - 使用loading状态

---

如有问题或建议，请参考 [API_OPTIMIZATION.md](./API_OPTIMIZATION.md) 获取更详细的信息。
