package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func MySQLConfig() *gorm.DB {
	user := os.Getenv("DB_HOST_NAME")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_DATE_BASE_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", user, password, host, port, name)
	db, err := gorm.Open(mysql.New(mysql.Config{DSN: dsn, DefaultStringSize: 255}), &gorm.Config{})

	if err != nil {
		log.Fatalf("❌ 数据库连接失败,%v", err)
	}
	log.Println("✅ 数据库已连接")
	DB = db

	return db
}
