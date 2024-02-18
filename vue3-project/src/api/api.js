import {
	get,
	post
} from './request.js'

const baseUrl = import.meta.env.VITE_API_URL;
const api = {
	getInfo(params) {
		return get(baseUrl + '/getInfo', params);
	}
};

export default api;
