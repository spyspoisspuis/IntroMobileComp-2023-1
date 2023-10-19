package models

import "time"

type Activity struct {
	ID     int
	UserID int       `gorm:"column:userID"`
	Name   string    `json:"name"`
	When   time.Time `json:"when"`
}

func (Activity) TableName() string {
	return "todo"
}

func (a *Activity) DemoData() {
	a.UserID = 1
	a.Name = "test add name"
	a.When = time.Now()
}
