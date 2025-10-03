package services

import (
	"gin-project/config"
	"gin-project/interfaces"
	"gin-project/repo"
)

type AppService interface {
	GetApp(startPage int, pageSize int, searchText string) (config.Response[config.ListInfo[[]interfaces.List]], error)
}

type appService struct {
	Repo repo.AppRepo
}

func NewAppService(r repo.AppRepo) AppService {
	return &appService{Repo: r}
}

func (s *appService) GetApp(startPage int, pageSize int, searchText string) (config.Response[config.ListInfo[[]interfaces.List]], error) {
	rows, total, error := s.Repo.GetApp(startPage, pageSize, searchText)
	listInfo := config.ListInfo[[]interfaces.List]{Rows: rows, Total: total}
	return config.Success("查询成功", listInfo), error
}
