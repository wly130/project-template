const mysql = require('mysql');

/**
 * @method 建立连接
 * @param {string} sql SQL语句
 * @param {function} callback 成功回调函数
 */
function exec(sql, callback) {
	const conn = mysql.createConnection({
		host: 'localhost', //数据库地址
		user: 'root', //用户名
		password: '000000', //密码
		port: '3306', //端口号
		database: 'my_project' //数据库名称
	})
	conn.connect((err) => {
		if (err) {
			throw err;
		}
		//开始数据操作
		conn.query(sql, [], (err, res) => {
			if (err) {
				throw err;
			}
			//查询数据返回给回调函数
			callback && callback(res);
			conn.end((err) => {
				if (err) {
					throw err;
				}
			});
		});
	});
}

module.exports = exec;
