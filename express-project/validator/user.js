const validate = require("../config/validate-config");
const {query, body} = require('express-validator');

const userValid = {
    loginDto: validate([
        body("username").exists().notEmpty().withMessage('请输入用户名'),
        body("password").exists().notEmpty().withMessage('请输入密码')
    ]),
    getInfoDto: validate([]),
    setInfoDto: validate([])
}

module.exports = userValid;