package main

import (
	"log"
	"os"

	"gin-project/config"
	"gin-project/router"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	r := gin.Default()
	r.Use(config.CORS())
	router.RegisterItems(r)
	if os.Getenv("ENABLE_MYSQL") == "true" {
		config.MySQLConfig()
		router.RegisterAllRoutes(r)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
