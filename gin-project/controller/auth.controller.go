package controller

import (
	"gin-project/config"
	"gin-project/repo"
	service "<%= projectName %>/service"
	"gin-project/validators"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	Service service.AuthService
}

type TokenInfo struct {
	AccessToken string `json:"access_token"`
}

func NewAuthController(s service.AuthService) *AuthController {
	return &AuthController{Service: s}
}

func (c *AuthController) RegisterRoutes(rg *gin.RouterGroup) {
	rg.POST("/login", c.Login)
}

func (ctl *AuthController) Login(c *gin.Context) {
	var req validators.LoginDto

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info, err := ctl.Service.Login(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	c.SetCookie("refresh_token", info.RefreshToken, int(time.Hour*24*7), "/", "localhost", false, true)
	c.JSON(http.StatusOK, config.Success("登录成功", TokenInfo{AccessToken: info.AccessToken}))
}

func RegisterAuth(api *gin.RouterGroup, repo repo.AuthRepo) {
	svc := service.NewAuthService(repo)
	ctrl := NewAuthController(svc)
	grp := api.Group("/anth")
	ctrl.RegisterRoutes(grp)
}
