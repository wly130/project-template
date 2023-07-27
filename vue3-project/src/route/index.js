import {
	createRouter,
	createWebHashHistory
} from "vue-router";

const index = () => import("../pages/index.vue");

const routes = [{
	path: "/",
	name: "index",
	component: index
}];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
});

//路由守卫
router.beforeEach((to, from, next) => {
	next();
});

export default router;
