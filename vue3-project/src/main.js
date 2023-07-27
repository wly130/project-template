import {
	createApp
} from 'vue';
import App from './App.vue';
import router from './route/index.js';
import api from './api/api.js';
const app = createApp(App);

app.config.globalProperties.$api = api;

app.use(router);
app.mount('#app');
