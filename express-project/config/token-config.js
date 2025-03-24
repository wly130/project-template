const jwt = require("jsonwebtoken");
require('dotenv').config();

const setAccessToken = (data) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.sign(data, process.env.TOKEN_ACCESS_KEY, {expiresIn: process.env.TOKEN_ACCESS_TIME}));
        } catch (err) {
            reject(null);
        }
    });
};
const setRefreshToken = (data) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.sign(data, process.env.TOKEN_REFRESH_KEY, {expiresIn: process.env.TOKEN_REFRESH_TIME}));
        } catch (err) {
            reject(null);
        }
    });
};
const verifyToken = (token, type = 'access', data = null) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({code: 404, error: 'token空'})
        } else {
            let key = process.env.TOKEN_ACCESS_KEY;
            if (type === 'refresh') key = process.env.TOKEN_REFRESH_KEY;
            jwt.verify(token.split(' ')[1], key, (err, user) => {
                if (err) reject(err);
                let info = {code: 200, msg: '有效token'};
                if (type === 'refresh') info.newtoken = setAccessToken(data);
                resolve(info);
            });
        }
    })
}
module.exports = {
    setAccessToken,
    setRefreshToken,
    verifyToken
}