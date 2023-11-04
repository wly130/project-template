//引入自定义组件
import Index from "../pages/index";

import KeepAlive from 'react-activation';

const routes = [{
    name: 'ホーム',
    path: "/",
    element: <KeepAlive cacheKey="index"><Index /></KeepAlive>
}];

export default routes;