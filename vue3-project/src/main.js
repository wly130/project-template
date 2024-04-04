import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router/index';
import api from './api/api.js';

const {config, mount, use} = createApp(App);

config.globalProperties.$api = api;

use(router);
mount('#app');
