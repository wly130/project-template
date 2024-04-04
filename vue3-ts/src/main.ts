import {createApp} from 'vue';
import '@/style.css';
import router from './router/index';
import App from '@/App.vue';

let {use, mount} = createApp(App);

use(router);
mount('#app');
