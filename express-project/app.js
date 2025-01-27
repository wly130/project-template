const express = require('express'); //导入框架
const path = require("path");
const log4js = require('log4js');
const logConfig = require("./config/log-config");
const {expressjwt: expressJwt} = require("express-jwt");
const errorConfig = require("./config/error-config");
const {getToken} = require('./config/token-config');
const IndexRouter = require('./routes/index');//导入路由表
require('dotenv').config();

const app = express();
const IP_ADDRESS = process.env.IP_ADDRESS;
const POST = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

log4js.configure(logConfig);
const loggerOfConsole = log4js.getLogger();
app.use(log4js.connectLogger(loggerOfConsole, {level: 'debug'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("*", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});
//Token验证
app.use((req, res, next) => {
    let token = req.headers.authorization;
    if (!(!!token)) return next();
    else getToken(token).then((data) => {
        req.data = data;
        return next();
    }).catch((err) => (next(err)));
});
app.use(expressJwt({
    secret: SECRET_KEY,
    algorithms: ["HS256"]
}).unless({
    path: [/^\/api\//]
}));
//挂载路由表
app.use('/api', IndexRouter);
//错误处理
app.use(errorConfig());
//监控接口
app.listen(POST, IP_ADDRESS, () => console.log(`服务已开启,地址:http://${IP_ADDRESS}:${POST}`));
module.exports = app;