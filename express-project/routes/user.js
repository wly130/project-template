const express = require('express'); //导入框架
const bodyParser = require('body-parser');
const router = express.Router().use(bodyParser.json());
const userCtl = require("../controller/user.js");
const userValid = require("../validator/user.js");

/**
 * @method 登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
router.get("/login", userCtl.login, userCtl.login);
/**
 * @method 方法名
 * @param {number} id 参数
 * @param {number} page 当前页
 * @param {number} pageNum 每页页数
 */
router.get("/getInfo", userValid.getInfo, userCtl.getInfo);

/**
 * @method 方法名
 * @param {number}  id 参数
 * @param {string}  name 参数
 */
router.post("/setInfo", userValid.setInfo, userCtl.setInfo);

module.exports = router;
