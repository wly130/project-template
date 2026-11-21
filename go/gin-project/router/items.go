package router

import (
	"gin-project/internal/items"

	"github.com/gin-gonic/gin"
)

func RegisterItems(engine *gin.Engine) {
	items.Register(engine.Group("/api/items"))
}
