package config

import (
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	profile := os.Getenv("APP_ENV")
	if profile == "" {
		profile = "development"
	}
	_ = godotenv.Load(".env.local")
	_ = godotenv.Load(".env." + profile)
	_ = godotenv.Load(".env")
}
