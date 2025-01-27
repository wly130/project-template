const {Sequelize, DataTypes, Op, literal, QueryTypes} = require("sequelize");
require('dotenv').config();

const {DB_DATE_BASE_NAME, DB_HOST_NAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_TYPE} = process.env;
const seq = new Sequelize(DB_DATE_BASE_NAME, DB_HOST_NAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_TYPE,
    pool: {max: 10, min: 0, acquire: 60000},
    timezone: '+08:00',
    dialectOptions: {dateStrings: true, typeCast: true}
});
seq.authenticate().then(() => console.log('データベースを接続しました')).catch((err) => console.log('データベースを接続しません', err));
const db = {DataTypes, sequelize: seq, Op: Op, literal, QueryTypes};

module.exports = db;