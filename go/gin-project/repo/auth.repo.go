package repo

import (
	"gorm.io/gorm"
)

type AuthRepo interface {
	Login(username string, password string) (int, error)
}

type authRepo struct {
	DB *gorm.DB
}

func NewAuthRepo(db *gorm.DB) *authRepo {
	return &authRepo{DB: db}
}

func (r *authRepo) Login(username string, password string) (int, error) {
	var user_id int = 1

	return user_id, nil
}
