const {setRefreshToken, setAccessToken, verifyToken} = require('../config/token-config.js');
const db = require('../config/mysql-config.js');
const Op = db.Op;
const {tabs} = require('../models/tabs.js');

/**
 * 用户控制器
 */
const userCtl = {
    /**
     * 登录接口
     * @param {Object} req - 请求对象
     * @param {Object} req.body - 请求体
     * @param {string} req.body.username - 用户名
     * @param {string} req.body.password - 密码
     * @param {Object} res - 响应对象
     * @param {Function} next - 下一个中间件
     */
    login: async (req, res, next) => {
        try {
            const {username, password} = req.body;

            // TODO: 验证用户名和密码（这里应该查询数据库）
            // const user = await tabs.findOne({where: {username}});
            // if (!user || user.password !== password) {
            //     return res.status(401).json({code: 401, msg: "用户名或密码错误", data: null});
            // }

            // 暂时使用硬编码的user_id为1
            const user_id = 1;

            const accessToken = setAccessToken({user_id});
            const refreshToken = setRefreshToken({user_id});

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                code: 200,
                msg: '登录成功',
                data: {accessToken},
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * 刷新Token接口
     */
    refreshToken: async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                return res.status(401).json({code: 401, msg: '刷新失败，无有效Token', data: null});
            }

            const {user_id} = verifyToken(refreshToken);
            const accessToken = setAccessToken({user_id});

            res.status(200).json({
                code: 200,
                msg: '刷新成功',
                data: {accessToken},
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * 获取用户信息接口
     * @param {Object} req - 请求对象
     * @param {Object} req.query - 查询参数
     * @param {number} req.query.page - 当前页码
     * @param {number} req.query.pageNum - 每页数量
     * @param {number} req.query.id - 用户ID
     */
    getInfo: async (req, res, next) => {
        try {
            const {page = 1, pageNum = 10, id} = req.query;
            const startPage = (parseInt(page) - 1) * parseInt(pageNum);

            const where = id ? {id} : {};
            const data = await tabs.findAndCountAll({
                offset: startPage,
                limit: parseInt(pageNum),
                where,
            });

            res.status(200).json({
                code: 200,
                msg: '获取成功',
                data,
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * 更新用户信息接口
     * @param {Object} req - 请求对象
     * @param {Object} req.body - 请求体
     * @param {number} req.body.id - 用户ID
     * @param {string} req.body.name - 用户名
     */
    setInfo: async (req, res, next) => {
        try {
            const {id, name} = req.body;

            if (!id) {
                return res.status(400).json({code: 400, msg: 'ID不能为空', data: null});
            }

            // 检查记录是否存在
            const record = await tabs.findByPk(id);
            if (!record) {
                return res.status(404).json({code: 404, msg: '记录不存在', data: null});
            }

            // 更新记录
            const updateData = {name};
            await tabs.update(updateData, {where: {id}});

            res.status(200).json({
                code: 200,
                msg: '修改成功',
                data: null,
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = userCtl;
