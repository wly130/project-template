package controller

import (
	"gin-project/config"
	"gin-project/repo"
	service "gin-project/service"
	"gin-project/validators"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AppController struct {
	Service service.AppService
}

func NewAppController(s service.AppService) *AppController {
	return &AppController{Service: s}
}

func (c *AppController) RegisterRoutes(rg *gin.RouterGroup) {
	rg.GET("/getApp", c.GetApp)
}

func (ctl *AppController) GetApp(c *gin.Context) {
	var req validators.GetAppDto

	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	startPage := (req.Page - 1) * req.PageSize

	data, err := ctl.Service.GetApp(startPage, req.PageSize, req.SearchText)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, data)
}

func RegisterApp(api *gin.RouterGroup, repo repo.AppRepo) {
	svc := service.NewAppService(repo)
	ctrl := NewAppController(svc)
	grp := api.Group("/app")
	grp.Use(config.JWTAuth())
	ctrl.RegisterRoutes(grp)
}
