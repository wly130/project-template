const express = require('express'); //导入框架
const exec = require('../config/mysql'); //SQL操作函数
const bodyParser = require('body-parser');
const router = express.Router().use(bodyParser.json());

/**
 * @method 方法名
 * @param {number} id 参数
 * @param {number} page 当前页
 * @param {number} pageNum 每页页数
 */
router.get("/getInfo", (req, res, next) => {
	let query = req.query; //参数
	let startPage = (query.page - 1) * query.pageNum;

	let where = `WHERE id=${query.id}`; //查询条件
	let limit = `LIMIT ${startPage},${query.pageNum}`; //分页查询条件

	let sql = `SELECT * FROM 表名 ${where} ${limit}`; //SQL语句

	exec(sql, (data) => {
		res.json({
			data
		});
	})
});

/**
 * @method 方法名
 * @param {number}  id 参数
 * @param {string}  name 参数
 */
router.post("/setInfo", (req, res, next) => {
	let body = req.body; //参数
	/**
	 * 参数为String类型时,需要加''
	 */
	let sql = `INSERT INTO 表名 (id, name) VALUES (${id}, '${name}')`; //SQL语句

	exec(sql, (data) => {
		res.json({
			data
		});
	})
});

module.exports = router;
