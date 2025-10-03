const {setRefreshToken, setAccessToken} = require('../config/token-config.js');
const db = require('../config/mysql-config.js');
const Op = db.Op;
const {tabs} = require('../models/tabs.js');
const {verifyToken, getAccessToken} = require("../config/token-config");

const userCtl = {
    login: async (req, res, next) => {
        try {
            let {username, password} = req.body; //参数
            let accessToken = await setAccessToken({user_id: 1});
            let refreshToken = await setRefreshToken({user_id: 1});
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({code: 200, msg: "登录成功", accessToken});
        } catch (err) {
            next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return res.status(200).json({code: 401, msg: "刷新失败"});
            const {user_id} = verifyToken(refreshToken);
            let accessToken = getAccessToken(user_id);
            res.status(200).json({code: 200, msg: "刷新成功", accessToken});
        } catch (err) {
            next(err);
        }
    },
    getInfo: async (req, res, next) => {
        try {
            let {page, pageNum, id} = req.query; //参数
            let startPage = (+page - 1) * pageNum;
            let where = {id};
            const data = await tabs.findAndCountAll({
                offset: startPage, limit: +pageNum, where
            });
            res.status(200).json({code: 200, msg: "获取成功", data});
        } catch (err) {
            next(err);
        }
    },
    setInfo: async (req, res, next) => {
        try {
            let {id} = req.body; //参数
            let where = {id};
            await tabs.update({where}, {});
            res.status(200).json({code: 200, msg: "修改成功", data});
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userCtl;