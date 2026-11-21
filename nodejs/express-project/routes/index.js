const express = require('express'); //导入框架
const router = express.Router();

router.use('/items', require('./items'));
if (process.env.ENABLE_MYSQL === 'true') {
    if (!process.env.SECRET_KEY) throw new Error('SECRET_KEY is required when ENABLE_MYSQL=true');
    router.use('/user', require('./user'));
}

module.exports = router;
