const jwt = require("jsonwebtoken");

const SECRET_KEY = 'MY_KEY';

const setToken = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(
                data,
                SECRET_KEY, {
                expiresIn: '3h' //过期时间
            });
            resolve(token);
        } catch (err) {
            reject(null);
        }
    });
};

const getToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({
                code: 404,
                error: 'token空'
            })
        } else {
            let info = jwt.verify(token.split(' ')[1], SECRET_KEY);
            resolve(info);//解析返回值
        }
    })
}
module.exports = {
    setToken,
    getToken
}