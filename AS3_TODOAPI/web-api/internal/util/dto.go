package util

import "time"

type Activity struct {
	ID   int
	Name string    `json:"name"`
	When time.Time `json:"when"`
}

func (Activity) TableName() string {
	return "todo"
}

type User struct {
	ID       int
	Username string `json:"username"`
	Password string `json:"password"`
	Salt     string
}

func (User) TableName() string {
	return "user"
}
