package main

import (
	"log"

	"fiber-project/internal/config"
	"fiber-project/internal/items"

	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()
	items.Register(app.Group("/api/items"))
	if err := app.Listen("127.0.0.1:" + config.Port()); err != nil {
		log.Fatal(err)
	}
}
