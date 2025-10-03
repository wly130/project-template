package interfaces

import (
	"time"
)

type List struct {
	ID         uint      `json:"id"`
	Name       string    `json:"name"`
	UpdateDate time.Time `json:"update_date"`
}
