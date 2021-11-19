const mysql = require('mysql');

/**
 * @method 建立连接
 * @param {string} sql SQL语句
 * @param {Array} params 变量数组
 * @param {function} callback 成功回调函数
 */
function exec(sql, params, callback) {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: '数据库名'
    })
    conn.connect((err) => {
        if (err) {
            throw err;
        }
        //数据操作
        conn.query(sql, params, (err, res) => {
            if (err) {
                throw err;
            }
            //查询数据返回给回调函数
            callback && callback(res);
            //关闭连接
            conn.end((err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });
}

module.exports = exec;