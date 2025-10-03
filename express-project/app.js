const express = require('express'); //导入框架
const path = require("path");
const cors = require("cors");
const log4js = require('log4js');
const logConfig = require("./config/log-config");
const cookieParser = require('cookie-parser');
const errorConfig = require("./config/error-config");
const IndexRouter = require('./routes/index');//导入路由表
require('dotenv').config();

const app = express();
const IP_ADDRESS = process.env.IP_ADDRESS;
const POST = process.env.PORT;

log4js.configure(logConfig);
const loggerOfConsole = log4js.getLogger();
app.use(log4js.connectLogger(loggerOfConsole, {level: 'debug'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser(SECRET_KEY));
app.use("*", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});
//挂载路由表
app.use('/api', IndexRouter);
//错误处理
app.use(errorConfig());
//监控接口
app.listen(POST, IP_ADDRESS, () => console.log(`服务已开启`));
module.exports = app;