import axios from 'axios';
import router from '../router/index.js';

/**
 * 创建axios实例
 */
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 15000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

// 用于刷新令牌时的等待队列，防止多个请求并发刷新
let isRefreshing = false;
let refreshSubscribers = [];

/**
 * 订阅刷新令牌完成的回调
 */
const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

/**
 * 通知所有等待的请求刷新令牌完成
 */
const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        const publicUrls = ['/login', '/register', '/refreshToken'];

        // 非公开接口必须有token
        if (!publicUrls.includes(config.url) && !accessToken) {
            localStorage.removeItem('accessToken');
            router.push({path: '/login'});
            return Promise.reject({code: 401, message: '未授权，请登录'});
        }

        // 添加token到请求头
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
    (response) => {
        // 直接返回响应数据
        return Promise.resolve(response.data);
    },
    async (error) => {
        const originalRequest = error.config;

        // 处理401错误（token过期）
        if (error.response?.status === 401 && !originalRequest._retry) {
            // 已经在刷新token，不要再发起刷新请求
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(instance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const {data} = await instance.post('/refreshToken', {});
                const newToken = data.accessToken || data.token;
                localStorage.setItem('accessToken', newToken);
                isRefreshing = false;
                onRefreshed(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                localStorage.removeItem('accessToken');
                await router.push({path: '/login'});
                return Promise.reject(refreshError);
            }
        }

        // 处理403错误（禁止访问）
        if (error.response?.status === 403) {
            localStorage.removeItem('accessToken');
            await router.push({path: '/login'});
        }

        return Promise.reject(error.response || error);
    },
);

/**
 * GET请求
 */
export function get(url, params = {}) {
    return instance.get(url, {params});
}

/**
 * POST请求
 */
export function post(url, data = {}) {
    return instance.post(url, data);
}

/**
 * PUT请求
 */
export function put(url, data = {}) {
    return instance.put(url, data);
}

/**
 * PATCH请求
 */
export function patch(url, data = {}) {
    return instance.patch(url, data);
}

/**
 * DELETE请求
 */
export function del(url, params = {}) {
    return instance.delete(url, {params});
}

/**
 * 上传文件
 */
export function upload(url, formData) {
    return instance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export default instance;
