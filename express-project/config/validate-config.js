const {validationResult} = require('express-validator');

module.exports = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) await validation.run(req);
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        res.status(400).json({
            code: 400,
            err: errors.array()
        });
    };
};