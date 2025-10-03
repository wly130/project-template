package router

import (
	"gin-project/repo"

	"github.com/gin-gonic/gin"

	"gin-project/config"
	"gin-project/controller"
)

func RegisterAllRoutes(r *gin.Engine) {
	api := r.Group("/api")

	authRepo := repo.NewAuthRepo(config.DB)
	controller.RegisterAuth(api, authRepo)

	appRepo := repo.NewAppRepo(config.DB)
	controller.RegisterApp(api, appRepo)
}
