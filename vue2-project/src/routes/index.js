import Vue from 'vue'
import Router from 'vue-router'

//自定义页面
import index from '../components/index.vue'

Vue.use(Router);

//页面路径
const routes = [{
	path: '/',	//首页
	name: 'index',
	component: index
}]

const router = new Router({
	mode: 'hash', //默认hash模式,hash模式有#;history模式，没有#符号;
	routes
});

//路由守卫
router.beforeEach((to, from, next) => {
	// to	  下一页面
	// from	  当前页面
	next();
})

export default router
