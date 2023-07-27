import {
	get,
	post
} from './request.js'

const baseUrl = "/api";
const api = {
	//params  所传参数
	apiGet(params) {
		return get(baseUrl + '/api/url', params);
	},
	apiPost(params) {
		return post(baseUrl + '/api/url', params);
	},
}

export default api
