import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routers';

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;