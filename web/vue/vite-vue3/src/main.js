import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index';
import api from './api/api.js';

const app = createApp(App);

// 注册全局API对象
app.config.globalProperties.$api = api;

// 使用路由
app.use(router);

// 挂载到DOM
app.mount('#app');
