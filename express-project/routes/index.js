const express = require('express'); //导入框架
const bodyParser = require('body-parser');
const router = express.Router().use(bodyParser.json());
const db = require('../config/mysql-config.js');
const Op = db.Op;

const { tabs } = require('../models/tabs.js');

/**
 * @method 方法名
 * @param {number} id 参数
 * @param {number} page 当前页
 * @param {number} pageNum 每页页数
 */
router.get("/getInfo", (req, res, next) => {
	let query = req.query; //参数

	let startPage = (query.page - 1) * query.pageNum;
	let where = {
		id: query.id
	};

	(async () => {
		const data = await tabs.findAndCountAll({
			offset: startPage,
			limit: parseInt(query.pageNum),
			where: where
		});
		res.json({
			data
		});
	})();
});

/**
 * @method 方法名
 * @param {number}  id 参数
 * @param {string}  name 参数
 */
router.post("/setInfo", (req, res, next) => {
	let body = req.body; //参数

	let where = {
		id: body.id
	};

	(async () => {
		const data = await tabs.findAndCountAll({
			where: where
		});
		res.json({
			data
		});
	})();
});

module.exports = router;
