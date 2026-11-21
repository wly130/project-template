package main

import (
	"log"

	"echo-project/internal/config"
	"echo-project/internal/items"

	"github.com/labstack/echo/v5"
)

func main() {
	app := echo.New()
	items.Register(app.Group("/api/items"))
	if err := app.Start("127.0.0.1:" + config.Port()); err != nil {
		log.Fatal(err)
	}
}
