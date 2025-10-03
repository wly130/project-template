package main

import (
	config "gin-project/config"
	router "gin-project/router"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()     //初始化环境变量
	config.MySQLConfig() //初始化连接MySQL

	r := gin.Default()
	r.Use(config.CORS())
	router.RegisterAllRoutes(r) //注册接口

	r.Run(":8080")
}
