package repo

import (
	"<%= projectName %>/interfaces"
	"<%= projectName %>/models"

	"gorm.io/gorm"
)

type AppRepo interface {
	GetApp(startPage int, pageSize int, searchText string) ([]interfaces.List, int64, error)
}

type appRepo struct {
	DB *gorm.DB
}

func NewAppRepo(db *gorm.DB) *appRepo {
	return &appRepo{DB: db}
}

func (r *appRepo) GetApp(startPage int, pageSize int, searchText string) ([]interfaces.List, int64, error) {
	var (
		rows  []interfaces.List
		total int64
		where string = "name LIKE ?"
	)

	if err := r.DB.Debug().Model(&models.Table{}).Where(where, "%"+searchText+"%").Count(&total).Error; err != nil {
		return nil, 0, err
	}
	if err := r.DB.Debug().Model(&models.Table{}).Where(where, "%"+searchText+"%").
		Offset(startPage).Limit(pageSize).Find(&rows).Error; err != nil {
		return nil, 0, err
	}

	return rows, total, nil
}
