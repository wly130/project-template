import axios, {InternalAxiosRequestConfig, AxiosInstance, AxiosResponse} from 'axios';

const axiosInstance: AxiosInstance = axios.defaults({
    timeout: 5000,
    headers: {
        post: {
            "Content-Type": "application/json;charset=utf-8"
        }
    }
});
// 请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 每次发送请求之前判断是否存在token
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: any) => (Promise.reject(error))
);

//响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) return Promise.resolve(response);
        else return Promise.reject(response);
    },
    (error: any) => (Promise.reject(error))
);

// 封装get请求
export function get(url: string, params: object) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {params: params,}).then((res: any) => resolve(res.data)).catch((err: any) => reject(err.data));
    });
}

// 封装post请求
export function post(url: string, params: object) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, params).then((res: any) => resolve(res.data)).catch((err: any) => reject(err.data));
    });
}

export default axiosInstance;