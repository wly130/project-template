const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const getAccessToken = (user_id) => {
    return jwt.sign({user_id}, SECRET_KEY, {expiresIn: process.env.ACCESS_TOKEN_TIME});
};

const getRefreshToken = (user_id) => {
    return jwt.sign({user_id}, SECRET_KEY, {expiresIn: process.env.RRFRESH_TOKEN_TIME});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error(err.message);
    }
};

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(200).json({code: 401, msg: '无Token'});
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(200).json({code: 401, msg: '无Token'});
    const token = parts[1];
    const user = verifyToken(token);
    if (!user) return res.status(200).json({code: 403, msg: '无效Token'});
    req.user = user;
    next();
}

module.exports = {getAccessToken, getRefreshToken, verifyToken, authMiddleware};