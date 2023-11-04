import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Index',
    meta: {
        title: '首页'
    },
    component: () => import('@/pages/index.vue')
}];

export default routes;