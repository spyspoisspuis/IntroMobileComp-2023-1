package db

import "web-api/internal/util"

func GetUserList(user *[]util.User) error {
	if err := database.Find(user).Error ; err != nil {
		return err 
	}
	return nil
}
func GetUserByUsername(user *util.User,username string) error {
	if err := database.Where("username=?",username).First(user).Error ; err != nil {
		return err 
	}
	return nil
}

func InsertUser(user util.User) error {
	if err := database.Create(&user).Error ; err != nil {
		return err 
	}
	return nil
}

func DeleteUser(user util.User,id string) error {
	if err := database.Where("id=?",id).Delete(user).Error; err != nil {
		return err
	}
	return nil
}
