const { setToken } = require('../config/token-config.js');
const db = require('../config/mysql-config.js');
const Op = db.Op;
const { tabs } = require('../models/tabs.js');

const userCtl = {
    login: async (req, res, next) => {
        try {
            let body = req.body; //参数
            let token = await setToken({ user_id: 1 });
            res.status(200).json({
                code: 200,
                token: token
            });
        } catch (err) {
            next(err);
        }
    },
    getInfo: async (req, res, next) => {
        try {
            let query = req.query; //参数
            let startPage = (query.page - 1) * query.pageNum;
            let where = {
                id: query.id
            };
            const data = await tabs.findAndCountAll({
                offset: startPage,
                limit: parseInt(query.pageNum),
                where: where
            });
            res.status(200).json({
                code: 200,
                query
            });
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
            res.status(200).json({
                code: 200,
                body
            });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userCtl;