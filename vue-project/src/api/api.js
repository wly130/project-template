import {
	get,
	post
} from './request.js'

const api = {
	//params  所传参数
	apiGet(params) {
		return get('/api/url', params);
	},
	apiPost(params) {
		return post('/api/url', params);
	},
}

export default api
