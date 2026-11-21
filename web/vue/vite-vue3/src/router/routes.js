const routes = [
    {path: '/', name: 'Index', component: () => import('../pages/index.vue')},
    {path: '/login', name: 'Login', component: () => import('../pages/login.vue')},
    {path: '/test', name: 'Test', component: () => import('../pages/test.vue')},
];

export default routes;
