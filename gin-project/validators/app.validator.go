package validators

import (
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

type GetAppDto struct {
	Page       int    `form:"page" binding:"required,min=1"`
	PageSize   int    `form:"pageSize" binding:"required,min=10,max=20"`
	SearchText string `form:"searchText"`
}
