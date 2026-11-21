const express = require('express');
const router = express.Router();
const userCtl = require('../controller/user.js');
const userValid = require('../validator/user.js');
const {authMiddleware} = require('../config/token-config');

/**
 * @method POST /api/user/login
 * @desc 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 */
router.post('/login', userValid.loginDto, userCtl.login);

/**
 * @method POST /api/user/refresh-token
 * @desc 刷新Access Token
 * @param {string} refreshToken - Refresh Token (在cookie中)
 */
router.post('/refresh-token', userCtl.refreshToken);

/**
 * @method GET /api/user/getInfo
 * @desc 获取用户信息 (需要认证)
 * @param {number} id - 用户ID (可选)
 * @param {number} page - 当前页码
 * @param {number} pageNum - 每页数量
 */
router.get('/getInfo', authMiddleware, userValid.getInfoDto, userCtl.getInfo);

/**
 * @method PUT /api/user/setInfo
 * @desc 更新用户信息 (需要认证)
 * @param {number} id - 用户ID
 * @param {string} name - 用户名
 */
router.put('/setInfo', authMiddleware, userValid.setInfoDto, userCtl.setInfo);

module.exports = router;
