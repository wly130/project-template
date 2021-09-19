import {get, post} from './request.js';

const api = {
	apiTest(params){
		return get('/api/url', params);
	}
}
export default api;