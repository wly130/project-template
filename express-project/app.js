const express = require('express'); //导入框架
const path = require("path");
const morgan = require('morgan');
const fs = require('fs');

const indexRouter = require('./routes/index'); //导入路由表

const app = express();
const port = 3000;
//打印日志
const accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' });
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/index', indexRouter); //引用

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

module.exports = app;

app.listen(port, 'localhost', () => {
    console.log(`服务已开启,端口号:${port}`);
});
