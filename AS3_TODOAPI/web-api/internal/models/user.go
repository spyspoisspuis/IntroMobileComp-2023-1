package models

import "fmt"

type User struct {
	ID       int
	Username string `json:"username"`
	Password string `json:"password"`
	Salt     string
}

func (User) TableName() string {
	return "user"
}

func (u *User) ToString() string {
	return fmt.Sprintf("id: %d, username: %s, password: %s, salt: %s", u.ID, u.Username, u.Password, u.Salt)
}
