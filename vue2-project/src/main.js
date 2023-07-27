import Vue from 'vue'
import App from './App.vue'
import api from './api/api.js' //api接口
import test from './utils/test.js'
import routes from './routes/index.js' //路由
import store from './store/index.js' //vuex

Vue.prototype.$api = api;
Vue.prototype.$test = test;

Vue.config.productionTip = false;

new Vue({
    routes,
    store,
    render: h => h(App),
}).$mount('#app')
