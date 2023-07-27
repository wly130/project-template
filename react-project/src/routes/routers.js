//引入自定义组件
import Index from "../pages/index";

import KeepAlive from 'react-activation'; //路由缓存

const routes = [{
    name: '',
    path: "/",
    element: <KeepAlive cacheKey="index"><Index /></KeepAlive>,
    exact: true
}];

export default routes;