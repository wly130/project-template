const {Sequelize, DataTypes, Op} = require("sequelize");

const databaseName = 'my_project';
const hostName = 'root';
const password = '000000';
const host = '127.0.0.1';
const port = 3306;

const seq = new Sequelize(
    databaseName,
    hostName,
    password, {
        host: host,
        port: port,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 3000
        },
        timezone: '+09:00',
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        }
    });
seq.authenticate().then(() => console.log('データベースを接続しました')).catch((err) => console.log('データベースを接続しません', err));
const db = {
    DataTypes: DataTypes,
    sequelize: seq,
    Op: Op
};

module.exports = db;
