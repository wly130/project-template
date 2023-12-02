import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';

var app = createApp(App);

app.use(router);
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
