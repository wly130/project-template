package items

import (
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func Register(router *gin.RouterGroup) {
	store := NewStore()
	router.GET("", func(c *gin.Context) {
		c.JSON(200, store.List())
	})
	router.GET("/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		item, ok := store.Get(id)
		if !ok {
			c.JSON(404, map[string]string{"message": "Item not found"})
			return
		}
		c.JSON(200, item)
	})
	router.POST("", func(c *gin.Context) {
		var input struct {
			Name string `json:"name"`
		}
		if err := c.ShouldBindJSON(&input); err != nil || strings.TrimSpace(input.Name) == "" {
			c.JSON(400, map[string]string{"message": "name is required"})
			return
		}
		c.JSON(201, store.Create(input.Name))
	})
	router.PUT("/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		var input struct {
			Name string `json:"name"`
		}
		if err := c.ShouldBindJSON(&input); err != nil || strings.TrimSpace(input.Name) == "" {
			c.JSON(400, map[string]string{"message": "name is required"})
			return
		}
		item, ok := store.Update(id, input.Name)
		if !ok {
			c.JSON(404, map[string]string{"message": "Item not found"})
			return
		}
		c.JSON(200, item)
	})
	router.DELETE("/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		if !store.Delete(id) {
			c.JSON(404, map[string]string{"message": "Item not found"})
			return
		}
		c.Status(204)
	})
}
