const express = require('express'); //导入框架
const path = require('path');
const cors = require('cors');
const log4js = require('log4js');
const logConfig = require('./config/log-config');
const cookieParser = require('cookie-parser');
const errorConfig = require('./config/error-config');
const profile = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: [path.join(__dirname, '.env.local'), path.join(__dirname, '.env.' + profile), path.join(__dirname, '.env')],
});

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

log4js.configure(logConfig);
const loggerOfConsole = log4js.getLogger();
app.use(log4js.connectLogger(loggerOfConsole, {level: 'debug'}));
app.use(express.static(path.join(__dirname, 'public')));

// 配置请求体解析
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS配置（只需要一种方式）
app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    }),
);
app.use(cookieParser(SECRET_KEY));
//挂载路由表
app.use('/api', require('./routes/index'));
//错误处理中间件
app.use(errorConfig());

module.exports = app;
