package items

import (
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v3"
)

func Register(router fiber.Router) {
	store := NewStore()
	router.Get("", func(c fiber.Ctx) error {
		return c.Status(200).JSON(store.List())
	})
	router.Get("/:id", func(c fiber.Ctx) error {
		id, _ := strconv.Atoi(c.Params("id"))
		item, ok := store.Get(id)
		if !ok {
			return c.Status(404).JSON(map[string]string{"message": "Item not found"})
		}
		return c.Status(200).JSON(item)
	})
	router.Post("", func(c fiber.Ctx) error {
		var input struct {
			Name string `json:"name"`
		}
		if err := c.Bind().JSON(&input); err != nil || strings.TrimSpace(input.Name) == "" {
			return c.Status(400).JSON(map[string]string{"message": "name is required"})
		}
		return c.Status(201).JSON(store.Create(input.Name))
	})
	router.Put("/:id", func(c fiber.Ctx) error {
		id, _ := strconv.Atoi(c.Params("id"))
		var input struct {
			Name string `json:"name"`
		}
		if err := c.Bind().JSON(&input); err != nil || strings.TrimSpace(input.Name) == "" {
			return c.Status(400).JSON(map[string]string{"message": "name is required"})
		}
		item, ok := store.Update(id, input.Name)
		if !ok {
			return c.Status(404).JSON(map[string]string{"message": "Item not found"})
		}
		return c.Status(200).JSON(item)
	})
	router.Delete("/:id", func(c fiber.Ctx) error {
		id, _ := strconv.Atoi(c.Params("id"))
		if !store.Delete(id) {
			return c.Status(404).JSON(map[string]string{"message": "Item not found"})
		}
		return c.SendStatus(204)
	})
}
