import { createApp } from 'vue';
import '@/style.css';
import router from './router/index';
import App from '@/App.vue';

var app = createApp(App);

app.use(router);
app.mount('#app');
