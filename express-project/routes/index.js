const express = require('express'); //导入框架
const router = express.Router();

const userRouter = require("./user");

//用户
router.use("/user", userRouter);

module.exports = router;