const express = require('express'); //导入框架
const exec = require('./public/mysql/config');  //SQL操作函数
const app = express();
app.use(express.json());

//请求访问接口
app.get("/getWord", (req, res, next) => {
    let body = req.body; //请求参数
    let params = []; //sql参数
    const sql = 'sql语句';
    exec(sql, params, (data) => {
        res.json({ data });
    })
});

module.exports = app;
