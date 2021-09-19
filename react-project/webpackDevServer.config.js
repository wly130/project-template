module.exports = {
    devServer: {
        host: 'localhost', //本地IP
        port: 8080, //端口号
        https: false, //是否启用 https
        hotOnly: false,
        proxy: { //配置跨域
            '/api': {
                target: "http://xxx.xxx.xxx.xxx", //接口地址
                changeOrigin: true, //是否跨域
                secure: false,
                pathRewrite: { //重写路径
                    "^/api": ""
                }
            }
        }
    }
}