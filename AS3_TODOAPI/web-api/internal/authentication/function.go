package authentication

import (
	"web-api/internal/db"
	"web-api/internal/util"
)

func checkUsernameExists(username string) (bool, error) {
	var users []util.User
	err := db.GetUserList(&users)
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
