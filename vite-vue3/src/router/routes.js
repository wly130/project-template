const Index = () => import("../pages/index.vue");

const routes = [{
    title: '首页',
    path: "index",
    name: "Index",
    component: Index,
    meta: {
        keepAlive: false
    }
}];

export default routes;