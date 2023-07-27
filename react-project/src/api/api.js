import { get, post } from './request.js';

const baseUrl = "/api";
const api = {
	apiTest(params) {
		return get(baseUrl + '/api/url', params);
	}
}
export default api;