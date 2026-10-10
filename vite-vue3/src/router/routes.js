const Index = () => import("../pages/index.vue");

const routes = [{
    title: '首页',
    path: "/index",
    name: "Index",
    component: Index,
    meta: {
        keepAlive: false
    }
}, {
    path: "/",
    redirect: "/index"
}, {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login.vue")
}];

export default routes;