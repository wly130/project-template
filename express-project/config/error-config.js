const utils = require("util");

module.exports = () => {
    return (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                code: 401,
                err: "无效的token"
            });
        }
        res.status(500).json({
            code: 500,
            err: utils.format(err)
        });
    }
};