import Vue from 'vue'
import App from './App.vue'
import api from '../api/api.js' //api接口
import router from './router/index.js' //路由
import store from './store/index.js' //vuex

Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
