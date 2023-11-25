const validate = require("../config/validate-config");
const { query, body } = require('express-validator');

const userValid = {
    login: validate([
        body("username").exists().notEmpty().withMessage('请输入用户名'),
        body("password").exists().notEmpty().withMessage('请输入密码')
    ]),
    getInfo: validate([]),
    setInfo: validate([])
}

module.exports = userValid;