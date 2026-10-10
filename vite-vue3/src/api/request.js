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
    error => (Promise.reject(error))
);
// 响应拦截器
instance.interceptors.response.use(
    response => response,
    // 请求失败的情况
    async error => {
        const originalRequest = error.config;
        if (error.status === 401 && originalRequest && originalRequest.url !== '/refreshToken' && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const {data} = await instance.post('/refreshToken', {});
                if (typeof data?.accessToken !== 'string' || !data.accessToken.trim()) {
                    throw new Error('刷新接口未返回有效的 accessToken');
                }
                localStorage.setItem('accessToken', data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                await router.push({path: '/login'});
                return Promise.reject(refreshError);
            }
        }
        if (error.status === 403) {
            localStorage.removeItem('accessToken');
            await router.push({path: '/login'});
        }
        return Promise.reject(error);
    }
);
export function get(url, params) {
    return instance.get(url, {params}).then(res => res.data);
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => resolve(res.data)).catch(err => reject(err));
    });
}

export default instance;
