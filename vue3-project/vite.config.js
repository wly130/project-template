import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    base: './',
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: "http://localhost:3000", //接口地址
                changeOrigin: true, //是否跨域
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
