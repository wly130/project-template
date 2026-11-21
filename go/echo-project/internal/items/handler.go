package items

import (
	"strconv"
	"strings"

	"github.com/labstack/echo/v5"
)

func Register(router *echo.Group) {
	store := NewStore()
	router.GET("", func(c *echo.Context) error {
		return c.JSON(200, store.List())
	})
	router.GET("/:id", func(c *echo.Context) error {
		id, _ := strconv.Atoi(c.Param("id"))
		item, ok := store.Get(id)
		if !ok {
			return c.JSON(404, map[string]string{"message": "Item not found"})
		}
		return c.JSON(200, item)
	})
	router.POST("", func(c *echo.Context) error {
		var input struct {
			Name string `json:"name"`
		}
		if err := c.Bind(&input); err != nil || strings.TrimSpace(input.Name) == "" {
			return c.JSON(400, map[string]string{"message": "name is required"})
		}
		return c.JSON(201, store.Create(input.Name))
	})
	router.PUT("/:id", func(c *echo.Context) error {
		id, _ := strconv.Atoi(c.Param("id"))
		var input struct {
			Name string `json:"name"`
		}
		if err := c.Bind(&input); err != nil || strings.TrimSpace(input.Name) == "" {
			return c.JSON(400, map[string]string{"message": "name is required"})
		}
		item, ok := store.Update(id, input.Name)
		if !ok {
			return c.JSON(404, map[string]string{"message": "Item not found"})
		}
		return c.JSON(200, item)
	})
	router.DELETE("/:id", func(c *echo.Context) error {
		id, _ := strconv.Atoi(c.Param("id"))
		if !store.Delete(id) {
			return c.JSON(404, map[string]string{"message": "Item not found"})
		}
		return c.NoContent(204)
	})
}
