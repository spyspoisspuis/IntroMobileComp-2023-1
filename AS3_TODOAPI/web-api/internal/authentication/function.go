package authentication

import (
	"web-api/internal/db"
)

func checkUsernameExists(username string) (bool, error) {
	users, err := GetUserList(db.GetDB())
	if err != nil {
		return false, err
	}
	for _, user := range users {
		if username == user.Username {
			return true, nil
		}
	}
	return false, nil
}
