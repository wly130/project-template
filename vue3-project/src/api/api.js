import {
	get,
	post
} from './request.js'

const baseUrl = '/api';
const api = {
	getInfo(params) {
		return get(baseUrl + '/getInfo', params);
	}
};

export default api;
