const {
	Sequelize,
	DataTypes,
	Op
} = require("sequelize");

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
	}
});

const db = {
	DataTypes: DataTypes,
	sequelize: seq,
	Op: Op
};

module.exports = db;
