const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * 生成Access Token
 * @param {Object} payload - Token载荷信息
 * @returns {string} Access Token
 */
const setAccessToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: process.env.ACCESS_TOKEN_TIME || '1h'});
};

/**
 * 生成Refresh Token
 * @param {Object} payload - Token载荷信息
 * @returns {string} Refresh Token
 */
const setRefreshToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_TIME || '7d'});
};

/**
 * 获取Access Token（别名）
 */
const getAccessToken = (payload) => {
    return setAccessToken(payload);
};

/**
 * 获取Refresh Token（别名）
 */
const getRefreshToken = (payload) => {
    return setRefreshToken(payload);
};

/**
 * 验证Token
 * @param {string} token - Token字符串
 * @returns {Object} 解析后的Token载荷
 * @throws {Error} Token无效或过期
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error(`Token验证失败: ${err.message}`);
    }
};

/**
 * 认证中间件
 */
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({code: 401, msg: '无Token', data: null});
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({code: 401, msg: 'Token格式错误', data: null});
    }

    const token = parts[1];
    try {
        const user = verifyToken(token);
        if (!user) {
            return res.status(403).json({code: 403, msg: '无效Token', data: null});
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({code: 401, msg: err.message, data: null});
    }
};

module.exports = {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    verifyToken,
    authMiddleware,
};
