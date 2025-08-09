import axios from 'axios';
import router from '../router/index.js';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000, withCredentials: true,
    headers: {post: {'Content-Type': 'application/json;charset=utf-8'}}
});
// 请求拦截器
instance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (!['/login', '/register'].includes(config.url) && !accessToken) {
            const controller = new AbortController();
            controller.abort();
            localStorage.removeItem('accessToken');
            router.push({path: '/login'}).then(res => console.log(res));
            return Promise.reject({code: 500});
        }
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    error => (Promise.error(error))
);
// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200) return Promise.resolve(response);
        else return Promise.reject(response);
    },
    // 服务器状态码不是200的情况
    async error => {
        const originalRequest = error.config;
        if (error.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const {data} = await instance.post('/refreshToken', {});
            localStorage.setItem('accessToken', data.accessToken || null);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return instance(originalRequest);
        }
        if (error.status === 403) {
            localStorage.removeItem('accessToken');
            await router.push({path: '/login'});
        }
        return Promise.reject(error.response);
    }
);
const pending = new Set();

export function get(url, params) {
    if (pending.has(url)) return Promise.resolve({});
    pending.add(url);
    return new Promise((resolve, reject) => {
        instance.get(url, {params}).then(res => {
            pending.delete(url);
            resolve(res.data);
        }).catch(err => {
            pending.delete(url);
            reject(err);
        });
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => resolve(res.data)).catch(err => reject(err));
    });
}

export default instance;
