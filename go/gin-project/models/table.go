package models

import (
	"time"
)

type Table struct {
	ID         uint      `gorm:"primaryKey;column:id;type:int;autoIncrement" json:"id"`
	Name       string    `gorm:"column:name;type:varchar(50);not null;unique" json:"name"`
	CreateDate time.Time `gorm:"column:create_date;type:datetime;not null" json:"create_date"`
	UpdateDate time.Time `gorm:"column:update_date;type:datetime;not null" json:"update_date"`
}

func (Table) TableName() string {
	return "table"
}
