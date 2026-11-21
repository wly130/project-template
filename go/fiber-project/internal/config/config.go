package config

import (
	"bufio"
	"os"
	"strings"
)

func Port() string {
	if value := os.Getenv("PORT"); value != "" {
		return value
	}
	profile := os.Getenv("APP_ENV")
	if profile == "" {
		profile = "development"
	}
	file, err := os.Open(".env." + profile)
	if err == nil {
		defer file.Close()
		lines := bufio.NewScanner(file)
		for lines.Scan() {
			key, value, ok := strings.Cut(lines.Text(), "=")
			if ok && strings.TrimSpace(key) == "PORT" && strings.TrimSpace(value) != "" {
				return strings.TrimSpace(value)
			}
		}
	}
	return "8080"
}
