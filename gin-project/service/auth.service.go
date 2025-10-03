package services

import (
	"gin-project/config"
	"gin-project/interfaces"
	"gin-project/repo"
)

type AuthService interface {
	Login(username string, password string) (interfaces.LoginInfo, error)
}

type authService struct {
	Repo repo.AuthRepo
}

func NewAuthService(r repo.AuthRepo) AuthService {
	return &authService{Repo: r}
}

func (s *authService) Login(username, password string) (interfaces.LoginInfo, error) {
	user_id, error := s.Repo.Login(username, password)
	config.CheckError(500, error, "错误")
	access_token, error := config.GetAccessToken(user_id)
	config.CheckError(500, error, "错误")
	refresh_token, error := config.GetRefreshToken(user_id)
	config.CheckError(500, error, "错误")

	return interfaces.LoginInfo{AccessToken: access_token, RefreshToken: refresh_token}, error
}
