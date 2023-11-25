const express = require('express'); //导入框架
const path = require("path");
const fs = require('fs');//文件操作
const log4js = require('log4js');
const logConfig = require("./config/log-config");
const { expressjwt: expressJwt } = require("express-jwt");
const errorConfig = require("./config/error-config");
const { getToken } = require('./config/token-config');
//导入路由表
const IndexRouter = require('./routes/index');

const app = express();
const baseUrl = "localhost";
const port = 3000;
const SECRET_KEY = "MY_KEY";
log4js.configure(logConfig);
const loggerOfConsole = log4js.getLogger();

app.use(log4js.connectLogger(loggerOfConsole, { level: 'debug' }));
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
    if (token === undefined) {
        return next();
    } else {
        getToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch((err) => {
            return next();
        });
    }
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
app.listen(port, 'localhost', () => {
    console.log(`服务已开启,地址:https://${baseUrl}:${port}`);
});
module.exports = app;