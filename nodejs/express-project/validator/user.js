const validate = require('../config/validate-config');
const {query, body} = require('express-validator');

const userValid = {
    /**
     * 登录验证规则
     */
    loginDto: validate([
        body('username')
            .trim()
            .notEmpty()
            .withMessage('用户名不能为空')
            .isLength({min: 3})
            .withMessage('用户名至少3个字符'),
        body('password').notEmpty().withMessage('密码不能为空').isLength({min: 6}).withMessage('密码至少6个字符'),
    ]),

    /**
     * 获取用户信息验证规则
     */
    getInfoDto: validate([
        query('page').optional().isInt({min: 1}).withMessage('页码必须是正整数'),
        query('pageNum').optional().isInt({min: 1, max: 100}).withMessage('每页数量必须在1-100之间'),
        query('id').optional().isInt({min: 1}).withMessage('ID必须是正整数'),
    ]),

    /**
     * 设置用户信息验证规则
     */
    setInfoDto: validate([
        body('id').notEmpty().withMessage('ID不能为空').isInt({min: 1}).withMessage('ID必须是正整数'),
        body('name').optional().trim().isLength({min: 1, max: 50}).withMessage('名字长度必须在1-50之间'),
    ]),
};

module.exports = userValid;
