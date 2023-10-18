package models

import "time"

type Activity struct {
	ID   int
	Name string    `json:"name"`
	When time.Time `json:"when"`
}

func (Activity) TableName() string {
	return "todo"
}
