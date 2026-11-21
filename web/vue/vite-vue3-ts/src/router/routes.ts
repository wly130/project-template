import type {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {path: '/', name: 'Index', component: () => import('../pages/index.vue')},
    {path: '/test', name: 'Test', component: () => import('../pages/test.vue')},
];

export default routes;
