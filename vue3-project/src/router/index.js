import {
    createRouter,
    createWebHashHistory
} from "vue-router";
import routes from './routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    scrollBehavior() {
        return {top: 0}
    }
});

//路由守卫
router.beforeEach((to, from, next) => {
    next();
});

export default router;
