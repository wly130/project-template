const express = require('express'); //导入框架

const indexRouter = require('./routes/index'); //导入路由表

const app = express();

app.use('/index', indexRouter); //引用

module.exports = app;
