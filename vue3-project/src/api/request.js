import axios from 'axios';

// 请求超时时间
axios.defaults.timeout = 15000;
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断是否存在token
		const token = localStorage.getItem('token');
		if (token) config.headers.Token = token;
		return config;
	},
	error => {
		return Promise.error(error);
	});
// 响应拦截器
axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况
	error => {
		if (error.response.status) console.log(error);
		return Promise.reject(error.response);
	}
);
// 封装get请求
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}
// 封装post请求
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err.data)
			})
	});
}
export default axios;
