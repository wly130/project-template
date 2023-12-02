import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routers';

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((_to, _from, next) => {
    next();
})

export default router;