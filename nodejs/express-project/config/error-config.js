const log4js = require('log4js');
const logger = log4js.getLogger();

/**
 * Express错误处理中间件
 * 必须有4个参数 (err, req, res, next) 才能被识别为错误处理中间件
 */
module.exports = () => {
    return (err, req, res, next) => {
        // 记录错误日志
        logger.error(`Error: ${err.message}`, err);

        // 处理特定的错误类型
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({
                code: 401,
                msg: '无效的token',
                data: null,
            });
        }

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                code: 401,
                msg: 'token已过期',
                data: null,
            });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                code: 401,
                msg: 'token无效',
                data: null,
            });
        }

        // 处理验证错误
        if (err.status === 400 || err.message === 'Bad Request') {
            return res.status(400).json({
                code: 400,
                msg: '请求参数错误',
                data: null,
            });
        }

        // 默认错误响应
        res.status(err.status || 500).json({
            code: err.status || 500,
            msg: err.message || '服务器内部错误',
            data: null,
        });
    };
};
