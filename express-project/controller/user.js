const {setRefreshToken, setAccessToken} = require('../config/token-config.js');
const db = require('../config/mysql-config.js');
const Op = db.Op;
const {tabs} = require('../models/tabs.js');
const {verifyToken} = require("../config/token-config");

const userCtl = {
    login: async (req, res, next) => {
        try {
            let body = req.body; //参数
            let access_token = await setAccessToken({user_id: 1});
            let refresh_token = await setRefreshToken({user_id: 1});
            res.status(200).json({code: 200, msg: "登录成功", access_token, refresh_token});
        } catch (err) {
            next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            let body = req.body; //参数
            let access_token = await verifyToken(body.refresh_token, 'refresh', req.data);
            res.status(200).json({code: 200, msg: "刷新成功", access_token});
        } catch (err) {
            next(err);
        }
    },
    getInfo: async (req, res, next) => {
        try {
            let query = req.query; //参数
            let startPage = +(query.page - 1) * query.pageNum;
            let where = {
                id: query.id
            };
            const data = await tabs.findAndCountAll({
                offset: startPage,
                limit: +query.pageNum,
                where: where
            });
            res.status(200).json({code: 200, data});
        } catch (err) {
            next(err);
        }
    },
    setInfo: async (req, res, next) => {
        try {
            let body = req.body; //参数
            let where = {
                id: body.id
            };
            const data = await tabs.findAndCountAll({
                where: where
            });
            res.status(200).json({code: 200, data});
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userCtl;